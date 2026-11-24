/*
  Regression test for AI Infrastructure Value Navigator.
  Run: npm i -D playwright (or use a global install), then: node tests/regression.js
  The experiment data below exists only inside this test to exercise the math.
  It is not shipped in the app and is not research data.
*/
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const os = require("os");

const URL = "file://" + path.resolve(__dirname, "..", "index.html");
let pass = 0, fail = 0;
const ok = (cond, name, info = "") => { if (cond) { pass++; console.log("  ok   " + name); } else { fail++; console.log("  FAIL " + name + (info ? "  (" + info + ")" : "")); } };
const near = (a, b, tol) => Math.abs(a - b) <= tol;
const tmp = (name, text) => { const f = path.join(os.tmpdir(), "aivn-" + name); fs.writeFileSync(f, text); return f; };

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("dialog", d => { errors.push("native dialog: " + d.message()); d.dismiss(); });
  const go = async v => { await page.evaluate(id => { location.hash = "#/" + id; }, v); await page.waitForTimeout(250); };

  await page.goto(URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(400);

  console.log("Views");
  const views = await page.$$eval("#nav button[data-view]", b => b.map(x => x.dataset.view));
  ok(views.length === 15, "15 views in navigation", views.length);
  for (const v of views) {
    await go(v);
    const len = await page.$eval("#view-" + v, el => el.innerText.length);
    const failed = await page.$("#view-" + v + " .callout.amber b:text('This section could not load')");
    ok(len > 200 && !failed, "view renders: " + v);
  }

  console.log("Calculations");
  const c = await page.evaluate(() => window.__aivn.calc({ acq: 1000, impl: 0, gpus: 1, watts: 1000, util: 50, hours: 1000, price: 0.1, pue: 1, maint: 0, soft: 0, benefit: 1000, life: 2, rate: 0 }, "base"));
  ok(c.elec === 100 && c.opex === 100 && c.tcoNom === 1200 && c.npv === 800, "TCO, OPEX and NPV", JSON.stringify([c.elec, c.opex, c.tcoNom, c.npv]));
  ok(near(c.payback, 1.11, 0.01) && near(c.roi, 0.667, 0.001) && near(c.cph, 1.2, 0.001), "payback, ROI, cost per productive GPU-hour", JSON.stringify([c.payback, c.roi, c.cph]));
  const w = await page.evaluate(() => window.__aivn.Stat.welch([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]));
  ok(near(w.diff, 3, 1e-9) && near(Math.abs(w.t), 1.897, 0.002) && near(w.df, 5.882, 0.002), "Welch t and df", JSON.stringify([w.diff, w.t, w.df]));
  ok(w.p > 0.10 && w.p < 0.115, "Welch two-sided p", w.p);
  const h = await page.evaluate(() => window.__aivn.Stat.holm([0.01, 0.04, 0.03]));
  ok(near(h[0], 0.03, 1e-9) && near(h[1], 0.06, 1e-9) && near(h[2], 0.06, 1e-9), "Holm correction", JSON.stringify(h));
  const csv = await page.evaluate(() => window.__aivn.toCsvRows(["a", "b"], [{ a: "=SUM(1)", b: 'x, "y"' }]));
  ok(csv.includes("'=SUM(1)") && csv.includes('"x, ""y"""'), "CSV export guards formulas and quotes", csv);
  const rt = await page.evaluate(() => { const p = window.__aivn.parseCsv('h1,h2\n"a,b","c ""d"""\n'); return p; });
  ok(rt[1][0] === "a,b" && rt[1][1] === 'c "d"', "CSV parse handles quotes and commas", JSON.stringify(rt));

  console.log("Content audit");
  await go("content");
  ok((await page.textContent("#caCount")).startsWith("19 of 19"), "19 audited records");
  await page.selectOption("#caFFmt", "Press release");
  await page.waitForTimeout(150);
  ok((await page.textContent("#caCount")).startsWith("3 of 19"), "format filter", await page.textContent("#caCount"));
  await page.click("#caClear");
  await page.click("#caAdd");
  await page.click("#modal [data-save]");
  ok(await page.isVisible("#f-err.show"), "add record rejects an empty title");
  await page.fill("#f-title", "Test record");
  await page.click("#modal [data-save]");
  await page.waitForTimeout(150);
  ok((await page.textContent("#caCount")).startsWith("20 of 20"), "record added");
  await page.fill("#caFQ", "Test record");
  await page.waitForTimeout(150);
  await page.click("#caTbl [data-del]");
  await page.click("#modal [data-ok]");
  await page.fill("#caFQ", "");
  await page.waitForTimeout(150);
  ok((await page.textContent("#caCount")).startsWith("19 of 19"), "record deleted");
  const CA_FIELDS = await page.evaluate(() => CA_FIELDS);
  const header = CA_FIELDS.join(",");
  const bad = tmp("audit.csv", header + "\n" + CA_FIELDS.map(f => f === "title" ? "Imported page" : f === "format" ? "Product page" : f === "audience" ? "CTO" : f === "product" ? "Software" : ["complexity", "bizClarity", "clarity", "relevance", "bizValue", "techCred", "evidence", "compDiff", "action"].includes(f) ? "3" : "").join(",") + "\n" + CA_FIELDS.map(f => f === "title" ? "Bad page" : f === "clarity" ? "9" : "").join(",") + "\n");
  await page.setInputFiles("#caImport", bad);
  await page.waitForTimeout(200);
  const im = await page.textContent("#modal");
  ok(/1 valid row\(s\), 1 skipped/.test(im), "audit import validates rows", im.slice(0, 120));
  await page.click("#modal [data-append]");
  await page.waitForTimeout(150);
  ok((await page.textContent("#caCount")).startsWith("20 of 20"), "valid row appended");
  await page.click("#caReset");
  await page.click("#modal [data-ok]");
  await page.waitForTimeout(150);
  ok((await page.textContent("#caCount")).startsWith("19 of 19"), "audited dataset restored");
  const firstTitle = () => page.$eval("#caTbl tbody tr td:nth-child(2)", e => e.textContent);
  const t0 = await firstTitle();
  await page.click("#caTbl thead th[data-sort='title']");
  await page.waitForTimeout(100);
  const t1 = await firstTitle();
  await page.click("#caTbl thead th[data-sort='title']");
  await page.waitForTimeout(100);
  ok(t1 !== (await firstTitle()) || t0 !== t1, "table sorts by column");

  console.log("Strategy");
  await go("strategy");
  const inp = await page.$("#oppTbl input[data-k='cv']");
  await inp.fill("1");
  await page.waitForTimeout(150);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("aivn.oppScores")));
  ok(saved && Object.values(saved)[0].cv === 1, "impact score edit persists");
  await inp.fill("9");
  ok(await inp.evaluate(e => e.classList.contains("invalid")), "out-of-range score flagged");
  await page.click("#oppReset"); await page.click("#modal [data-ok]").catch(() => {});

  console.log("Experiment Lab");
  await go("experiment");
  ok((await page.textContent("#expDash")).includes("No responses yet"), "empty state shown before data");
  const rows = ["participant_id,variant,role_group,comprehension,relevance,clarity,trust,value,confidence,intent"];
  [[1, 2, 3, 4, 5], [2, 4, 6, 7, 7]].forEach((vals, vi) => vals.forEach((v, i) => rows.push(`t${vi}${i},${vi ? "B" : "A"},Business,${v},${v},${v},${v},${v},${v},${v}`)));
  rows.push("tx,C,Business,1,1,1,1,1,1,1");
  await page.setInputFiles("#expImport", tmp("exp.csv", rows.join("\n")));
  await page.waitForTimeout(200);
  ok(/10 valid, 1 skipped/.test(await page.textContent("#modal")), "experiment import validates rows");
  await page.click("#modal [data-replace]");
  await page.waitForTimeout(300);
  const dash = await page.textContent("#expDash");
  ok(dash.includes("Exploratory sample") && /Holm/.test(dash), "results table with small-sample warning");
  await page.click("#expClear"); await page.click("#modal [data-ok]").catch(() => {});
  await page.waitForTimeout(200);
  ok((await page.textContent("#expDash")).includes("No responses yet"), "responses cleared");

  console.log("AI Workflow");
  await go("workflow");
  await page.click("#wfSample");
  await page.click("#wfRun");
  await page.waitForTimeout(2500);
  ok(await page.isDisabled("#apvBtn"), "approval locked until checks and name");
  for (const cb of await page.$$(".apv")) await cb.check();
  await page.fill("#apvName", "Test Reviewer");
  ok(!(await page.isDisabled("#apvBtn")), "approval enabled after checks");
  await page.click("#apvBtn");
  ok((await page.textContent("#wfApproval")).includes("Test Reviewer"), "approval recorded");
  const claim = await page.$("#claimTbl [data-ci]");
  await claim.fill("Edited by test");
  const ce = await page.evaluate(() => localStorage.getItem("aivn.claimEdits"));
  ok(ce && ce.includes("Edited by test"), "claim edit persists");
  const before = await page.$$eval("#logTbl tbody tr", r => r.length);
  await page.click("#logAdd");
  await page.fill("#lg-task", "Test task");
  await page.click("#modal [data-save]");
  ok((await page.$$eval("#logTbl tbody tr", r => r.length)) === before + 1, "AI log entry added");

  console.log("Keyboard, mobile and print");
  await go("overview");
  await page.keyboard.press("Tab");
  ok(await page.evaluate(() => document.activeElement && document.activeElement !== document.body), "keyboard focus moves");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.click("#menuBtn");
  ok(await page.evaluate(() => document.querySelector("#app").classList.contains("nav-open")), "mobile menu opens");
  await page.keyboard.press("Escape");
  ok(await page.evaluate(() => !document.querySelector("#app").classList.contains("nav-open")), "Escape closes menu");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(overflow <= 1, "no horizontal overflow on mobile", overflow);
  await page.emulateMedia({ media: "print" });
  ok(await page.evaluate(() => getComputedStyle(document.querySelector(".sidebar")).display === "none"), "sidebar hidden in print");

  ok(errors.length === 0, "no page or console errors", errors.join(" | "));
  await browser.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
