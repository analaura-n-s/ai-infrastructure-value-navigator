/*
  Regenerates docs/deliverables/ from the app's own export buttons, so the
  committed files always match what the app shows. Run: node tests/export-deliverables.js
*/
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs", "deliverables");
fs.mkdirSync(path.join(OUT, "asset-library"), { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  await page.goto("file://" + path.join(ROOT, "index.html"));
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  const go = async v => { await page.evaluate(id => { location.hash = "#/" + id; }, v); await page.waitForTimeout(400); };
  const save = async (sel, name) => {
    const [d] = await Promise.all([page.waitForEvent("download"), page.click(sel)]);
    await d.saveAs(path.join(OUT, name)); console.log("wrote", name);
  };

  await go("method");   await save("#srcCsv", "source-library.csv");
  await go("content");  await save("#caExport", "content-audit.csv");
  await go("strategy"); await save("#stMd", "strategic-recommendations.md");
  await go("framework");await save("#fwMd", "messaging-framework.md");
  await go("workflow"); await save("#claimMd", "ai-workflow-claim-verification.md");
  await save("#logCsv", "ai-activity-log.csv");
  await go("experiment"); await save("#expTemplate", "experiment-response-template.csv");

  await go("assets");
  const ids = await page.$$eval("#libList button[data-id]", b => b.map(x => x.dataset.id));
  for (const id of ids) {
    await page.click(`#libList button[data-id="${id}"]`); await page.waitForTimeout(150);
    const [d] = await Promise.all([page.waitForEvent("download"), page.click("#libMd")]);
    const name = "asset-library/" + d.suggestedFilename(); await d.saveAs(path.join(OUT, name)); console.log("wrote", name);
  }

  const kpi = await page.evaluate(() => {
    const opp = Object.fromEntries(OPPORTUNITIES.map(o => [o.id, o.t]));
    return toCsvRows(["stage", "kpi", "objective", "formula", "data_source", "frequency", "linked_initiative", "type"],
      KPI_FRAMEWORK.map(k => ({ stage: k.st, kpi: k.k, objective: k.o, formula: k.f, data_source: k.ds, frequency: k.fr, linked_initiative: opp[k.i] || k.i, type: k.li })));
  });
  fs.writeFileSync(path.join(OUT, "kpi-framework.csv"), kpi); console.log("wrote kpi-framework.csv");

  const exp = await page.evaluate(() => {
    const L = a => a.map(x => "- " + x).join("\n");
    return `# Messaging Experiment: study protocol\n_Study design only. The experiment has not been run, no participants have been recruited and no results exist._\n\n` +
      `## Stimuli\n**${EXP.variantA.label}.** ${EXP.variantA.headline}\n\n${EXP.variantA.body}\n\n**${EXP.variantB.label}.** ${EXP.variantB.headline}\n\n${EXP.variantB.body}\n\n` +
      `## Hypothesis\n${EXP.hypothesis}\n\n## Population\n${EXP.population}\n\n## Recruitment\n${EXP.recruitment}\n\n## Random assignment\n${EXP.assignment}\n\n` +
      `## Measures\n${EXP.questions.map(q => `- **${q[1]}** (\`${q[0]}\`): ${q[2]}`).join("\n")}\n\n## Analysis\nWelch two-sample t-tests (two-sided) per measure, Holm correction across measures, 95% confidence intervals and Cohen's d. Data columns: ${EXP_FIELDS.join(", ")}.\n\n` +
      `## Possible biases\n${L(EXP.biases)}\n\n## Sample size and limits\n${EXP.limits}\n`;
  });
  fs.writeFileSync(path.join(OUT, "experiment-protocol.md"), exp); console.log("wrote experiment-protocol.md");

  await browser.close();
})();
