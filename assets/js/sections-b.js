/* =========================================================
   Sections: Content Audit (real dataset), Strategic Recommendations
   ========================================================= */
let audit, caView;
const SCORE_KEYS = RUBRIC.map(r=>r.k);
const overall = r => avg(SCORE_KEYS.map(k=>+r[k]));
const scoreBadge = v => { const n=Math.round(+v)||0; return `<span class="score s${Math.min(5,Math.max(1,n))}">${esc(v)}</span>`; };
const splitList = s => String(s||"").split(/\s*[|;]\s*/).filter(Boolean);
const periodOf = d => { if(!d || d==="n.d.") return "Undated"; const [y,m] = String(d).split("-"); if(+y<2025) return "2024 or earlier"; if(+y===2025) return "2025"; return (+m||1)<=6 ? "2026 H1" : "2026 H2"; };
const qualityOf = r => { const o=overall(r); return o>=4 ? "High (4.0+)" : o>=3 ? "Medium (3.0 to 3.9)" : "Low (below 3.0)"; };
const PERIODS = ["2024 or earlier","2025","2026 H1","2026 H2","Undated"];
const QUALITIES = ["High (4.0+)","Medium (3.0 to 3.9)","Low (below 3.0)"];

function initContent(){
  audit = store.get("audit2", null) || realAudit();
  caView = store.get("caView", {prod:"all", aud:"all", fmt:"all", pain:"all", period:"all", qual:"all", q:"", sort:{k:"overall", dir:"desc"}, open:[]});
  $("#content-body").innerHTML = `
    <div class="callout amber"><b>Qualitative portfolio assessment.</b> These ${CA_REAL.length} records are real NVIDIA pages, opened on ${esc(VERIFIED_ON)}. Scores are an independent judgement against the rubric below, drafted with AI assistance and <b>pending validation by the author</b>. They are not NVIDIA metrics, do not measure marketing performance, and cover public web pages only (no gated, sales or event content).</div>
    <div class="btn-row no-print" style="margin-bottom:14px">
      <button class="btn primary" id="caAdd">${icon("plus")}Add record</button>
      <label class="btn" for="caImport" tabindex="0" id="caImportLbl">${icon("upload")}Import CSV</label><input type="file" id="caImport" accept=".csv,text/csv" class="sr-only">
      <button class="btn" id="caExport">${icon("download")}Export CSV</button>
      <button class="btn" id="caTemplate">${icon("download")}CSV template</button>
      <button class="btn ghost" id="caReset">${icon("rotate-ccw")}Restore audited dataset</button>
      <div class="spacer"></div><button class="btn ghost" id="caPrint">${icon("printer")}Print</button>
    </div>
    <div class="filters" role="group" aria-label="Audit filters">
      <div class="field"><label class="fl" for="caFProd">Product</label><select id="caFProd"></select></div>
      <div class="field"><label class="fl" for="caFAud">Audience</label><select id="caFAud"></select></div>
      <div class="field"><label class="fl" for="caFFmt">Format</label><select id="caFFmt"></select></div>
      <div class="field"><label class="fl" for="caFPain">Challenge addressed</label><select id="caFPain"></select></div>
      <div class="field"><label class="fl" for="caFPer">Publication period</label><select id="caFPer"></select></div>
      <div class="field"><label class="fl" for="caFQual">Messaging quality</label><select id="caFQual"></select></div>
      <div class="field" style="min-width:200px"><label class="fl" for="caFQ">Search</label><input type="search" id="caFQ" placeholder="Title, claim or observation"></div>
      <button class="btn ghost sm" id="caClear" style="margin-bottom:2px">Clear filters</button>
    </div>
    <div id="caSummary"></div>
    <div class="section"><div class="section-h"><h3>Key findings from the content audit</h3><span class="meta" id="caFindMeta"></span></div><div id="caFindings"></div></div>
    <div class="section grid g2">
      <div><div class="section-h"><h3>Which formats communicate best?</h3><span class="meta">Mean of seven scores</span></div><div class="chart-box short"><canvas id="chCaFmt" role="img" aria-label="Average score by format"></canvas></div></div>
      <div><div class="section-h"><h3>Who is the content written for?</h3><span class="meta">Primary audience (green) and secondary mentions</span></div><div class="chart-box short"><canvas id="chCaAud" role="img" aria-label="Audience coverage"></canvas></div></div>
      <div><div class="section-h"><h3>Is content technical or business-led?</h3><span class="meta">Each point is one asset</span></div><div class="chart-box"><canvas id="chCaTvB" role="img" aria-label="Scatter of technical complexity against business benefit clarity"></canvas></div></div>
      <div><div class="section-h"><h3>How is ROI supported?</h3><span class="meta">Strongest form of return evidence on the page</span></div><div class="chart-box"><canvas id="chCaRoi" role="img" aria-label="ROI evidence coverage"></canvas></div></div>
      <div><div class="section-h"><h3>Which adoption-gap problems does the content address?</h3><span class="meta">Assets can address several</span></div><div class="chart-box"><canvas id="chCaPain" role="img" aria-label="Pain point coverage"></canvas></div></div>
      <div><div class="section-h"><h3>Which products are covered?</h3></div><div class="chart-box"><canvas id="chCaProd" role="img" aria-label="Product coverage"></canvas></div></div>
    </div>
    <div class="section"><div class="section-h"><h3>Messaging-quality heatmap</h3><span class="meta">Rows sorted by overall score</span></div><div class="tbl-wrap heat" id="caHeat"></div></div>
    <div class="section grid g2">
      <div><div class="section-h"><h3>Coverage matrix: audience by product</h3><span class="meta">Primary audience counts</span></div><div class="tbl-wrap heat" id="caMatrix"></div></div>
      <div><div class="section-h"><h3>Competitive differentiation</h3><span class="meta">What each asset compares itself with</span></div><div class="chart-box short"><canvas id="chCaComp" role="img" aria-label="Differentiation score distribution"></canvas></div><div id="caCompNote" class="small muted" style="margin-top:8px"></div></div>
    </div>
    <div class="section"><div class="section-h"><h3>Prioritized improvement opportunities</h3><span class="meta">Priority = (5 − overall) + (5 − business value) ÷ 2 + 0.5 × issues found</span></div><div class="tbl-wrap" id="caOpps"></div></div>
    <div class="section"><div class="section-h"><h3>Audit records</h3><span class="meta" id="caCount"></span></div><div class="tbl-wrap" style="max-height:640px" id="caTblWrap"><table id="caTbl"></table></div></div>
    <div class="section grid g2">
      <div><div class="section-h"><h3>Scoring rubric (1 to 5)</h3></div><div class="tbl-wrap" id="rubric"></div></div>
      <div><div class="section-h"><h3>Scope and exclusions</h3></div>
        <h4 style="margin-top:0">Opened but not scored</h4><ul class="clean small">${CA_EXCLUDED.map(x=>`<li>${srcLink(x.src)}: ${esc(x.why)}</li>`).join("")}</ul>
        <h4>Linked but not opened (next to review)</h4><ul class="clean small">${CA_NOT_OPENED.map(x=>`<li>${x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.t)}</a>`:esc(x.t)}</li>`).join("")}</ul>
        <h4>Method</h4><p class="small muted">Each page was fetched on ${esc(VERIFIED_ON)}. Fields were recorded from the page text; quotes are verbatim. Two pages (DGX SuperPOD, Dynamo) and one program page (NPN) were partly summarized by the fetch tool and are flagged "partial". Dates are visible dates where shown, otherwise page metadata. One reviewer scored all records; a second reviewer is planned (see 90-day roadmap).</p>
        ${analystNote("audit","Where do you disagree with a score, and why? Note the record and dimension.")}
      </div>
    </div>`;
  const fill = (id, all, list, sel) => $(id).innerHTML = opts([["all",all],...list], sel);
  fill("#caFProd","All products",CA_PRODUCTS,caView.prod); fill("#caFAud","All audiences",CA_AUDIENCES,caView.aud); fill("#caFFmt","All formats",CA_FORMATS,caView.fmt);
  fill("#caFPain","All challenges",CA_PAINS,caView.pain); fill("#caFPer","All periods",PERIODS,caView.period); fill("#caFQual","All levels",QUALITIES,caView.qual); $("#caFQ").value=caView.q;
  const onF = ()=>{ Object.assign(caView,{prod:$("#caFProd").value, aud:$("#caFAud").value, fmt:$("#caFFmt").value, pain:$("#caFPain").value, period:$("#caFPer").value, qual:$("#caFQual").value, q:$("#caFQ").value.trim()}); renderContent(); };
  ["#caFProd","#caFAud","#caFFmt","#caFPain","#caFPer","#caFQual"].forEach(s=>$(s).addEventListener("change",onF)); $("#caFQ").addEventListener("input",onF);
  $("#caClear").onclick = ()=>{ Object.assign(caView,{prod:"all",aud:"all",fmt:"all",pain:"all",period:"all",qual:"all",q:""}); ["#caFProd","#caFAud","#caFFmt","#caFPain","#caFPer","#caFQual"].forEach(s=>$(s).value="all"); $("#caFQ").value=""; renderContent(); };
  $("#rubric").innerHTML = `<table><thead><tr><th>Dimension</th>${[1,2,3,4,5].map(n=>`<th>${n}</th>`).join("")}</tr></thead><tbody>${RUBRIC.map(r=>`<tr><td><b>${esc(r.n)}</b></td>${r.a.map(x=>`<td class="small">${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  $("#caAdd").onclick = ()=>editRecord(null);
  $("#caImport").addEventListener("change", e=>readCsvFile(e.target, importAuditRows));
  $("#caImportLbl").addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); $("#caImport").click(); } });
  $("#caExport").onclick = ()=>download("nvidia-content-audit.csv", toCsvRows(CA_FIELDS, audit), "text/csv");
  $("#caTemplate").onclick = ()=>download("content-audit-template.csv", CA_FIELDS.join(",")+"\r\n", "text/csv");
  $("#caReset").onclick = ()=>confirmModal("Restore the audited dataset?", "This replaces the current records, including any edits and validation marks, with the original 19 audited assets.", "Restore", ()=>{ audit=realAudit(); renderContent(); toast("Audited dataset restored"); });
  $("#caPrint").onclick = ()=>printWith("");
  renderContent();
}
function caFiltered(){
  const q = caView.q.toLowerCase();
  return audit.filter(r=>(caView.prod==="all"||r.product===caView.prod)
    &&(caView.aud==="all"||r.audience===caView.aud||splitList(r.audiences).includes(caView.aud))
    &&(caView.fmt==="all"||r.format===caView.fmt)
    &&(caView.pain==="all"||splitList(r.pains).includes(caView.pain))
    &&(caView.period==="all"||periodOf(r.date)===caView.period)
    &&(caView.qual==="all"||qualityOf(r)===caView.qual)
    &&(!q||[r.title,r.vp,r.excerpts,r.observations,r.compDiffNote].join(" ").toLowerCase().includes(q)));
}
function auditFindings(R){
  if(!R.length) return [];
  const F = [];
  const prim = Object.fromEntries(CA_AUDIENCES.map(a=>[a, R.filter(r=>r.audience===a).length]));
  const none = CA_AUDIENCES.filter(a=>prim[a]===0);
  if(none.length) F.push({t:`No asset in this set is written primarily for ${none.join(", ")}`, e:`Primary-audience counts: ${CA_AUDIENCES.map(a=>`${a} ${prim[a]}`).join(", ")}.`, imp:"Budget holders and buyers outside engineering may rely on technical teams to translate the value story.", ids:[]});
  const tc=avg(R.map(r=>+r.techCred)), bv=avg(R.map(r=>+r.bizValue));
  if(tc!==null && bv!==null && tc-bv>=0.5){ const top=R.slice().sort((a,b)=>(b.techCred-b.bizValue)-(a.techCred-a.bizValue)).slice(0,4); F.push({t:`Technical credibility (${f1(tc)}) outscores business value (${f1(bv)}) by ${f1(tc-bv)} points`, e:`Largest gaps: ${top.map(r=>`${r.title} (${r.techCred} vs ${r.bizValue})`).join("; ")}.`, imp:"Strong specifications are not yet translated into financial outcomes a CFO can check.", ids:top.map(r=>r.id)}); }
  const strong = R.filter(r=>["Quantified with stated basis","Customer or partner outcome"].includes(r.roiEvidence));
  F.push({t:`${strong.length} of ${R.length} assets (${Math.round(strong.length/R.length*100)}%) support business value with a stated basis or a customer outcome`, e: strong.length?`They are: ${strong.map(r=>`${r.title} (${r.roiEvidence.toLowerCase()})`).join("; ")}. No asset gives a dollar TCO or payback figure.`:"None in the current filter.", imp:"Return claims are mostly qualitative or relative multipliers.", ids:strong.map(r=>r.id)});
  const dimAvg = RUBRIC.map(d=>({n:d.n, v:avg(R.map(r=>+r[d.k]))})).sort((a,b)=>a.v-b.v);
  F.push({t:`Weakest dimension: ${dimAvg[0].n} (mean ${f1(dimAvg[0].v)})`, e:`All dimensions, lowest first: ${dimAvg.map(d=>`${d.n} ${f1(d.v)}`).join(", ")}.`, imp:"Improvement effort is best spent on the lowest-scoring dimension across many pages, not on one page.", ids:[]});
  const painN = Object.fromEntries(CA_PAINS.map(p=>[p, R.filter(r=>splitList(r.pains).includes(p)).length]));
  const unaddr = CA_PAINS.filter(p=>painN[p]===0);
  if(unaddr.length) F.push({t:`${unaddr.length} adoption-gap problem${unaddr.length>1?"s are":" is"} not addressed by any asset: ${unaddr.join(", ")}`, e:`Most addressed: ${Object.entries(painN).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([p,n])=>`${p} (${n})`).join(", ")}.`, imp:"The content answers 'is it fast?' more often than 'will it pay back?' or 'can we run it?'.", ids:[]});
  const inc = R.filter(r=>/inconsisten|mismatch|ambiguity/i.test(r.issues));
  if(inc.length) F.push({t:`${inc.length} asset${inc.length>1?"s show":" shows"} a naming, baseline, date or availability inconsistency`, e: inc.map(r=>`${r.title}: ${r.issues}`).join("; ")+".", imp:"Inconsistencies give skeptical evaluators an easy objection; a claim-governance standard would catch them.", ids:inc.map(r=>r.id)});
  const cd = R.filter(r=>+r.compDiff>=4);
  F.push({t:`${cd.length} of ${R.length} assets compare against a named alternative buyers consider`, e: cd.length?`${cd.map(r=>r.title).join("; ")}. Most other comparisons are against NVIDIA's own earlier products or unnamed 'traditional' baselines.`:"Comparisons are against NVIDIA's own earlier products or unnamed baselines.", imp:"Buyers comparing vendors get little help from the pages themselves; this is expected for vendor content but leaves room for neutral evaluation tools.", ids:cd.map(r=>r.id)});
  const best = R.slice().sort((a,b)=>overall(b)-overall(a))[0];
  F.push({t:`Highest-scoring asset: ${best.title} (${f1(overall(best))})`, e:`Scores: ${RUBRIC.map(d=>`${d.n} ${best[d.k]}`).join(", ")}.`, imp:"Use its structure as the template for new assets.", ids:[best.id]});
  return F;
}
function renderContent(){
  store.set("audit2", audit); store.set("caView", caView);
  const R = caFiltered();
  const validated = audit.filter(r=>r.validated==="yes").length;
  $("#caCount").textContent = `${R.length} of ${audit.length} records shown`;
  const strong = R.filter(r=>["Quantified with stated basis","Customer or partner outcome"].includes(r.roiEvidence)).length;
  const primCover = CA_AUDIENCES.filter(a=>R.some(r=>r.audience===a)).length;
  $("#caSummary").innerHTML = `<div class="res-grid">
    <div class="res"><div class="k">Assets in view</div><div class="v">${R.length}</div><div class="d">${audit.length} in dataset · ${CA_EXCLUDED.length} opened but not scorable</div></div>
    <div class="res"><div class="k">Mean overall score</div><div class="v">${f1(avg(R.map(overall)))}</div><div class="d">Seven dimensions, 1 to 5</div></div>
    <div class="res"><div class="k">Value backed by basis or customer</div><div class="v">${R.length?Math.round(strong/R.length*100):0}%</div><div class="d">${strong} of ${R.length} assets</div></div>
    <div class="res"><div class="k">Audiences with a primary asset</div><div class="v">${primCover} / ${CA_AUDIENCES.length}</div><div class="d">Validated by author: ${validated} of ${audit.length}</div></div></div>`;
  if(!R.length){ ["#caFindings","#caHeat","#caMatrix","#caOpps","#caCompNote"].forEach(s=>$(s).innerHTML=`<div class="empty">No records match these filters. Clear the filters to see the full audit.</div>`); $("#caFindMeta").textContent=""; Object.keys(charts).filter(k=>k.startsWith("chCa")).forEach(k=>{ charts[k].destroy(); delete charts[k]; }); renderCaTable(R); return; }
  const F = auditFindings(R);
  $("#caFindMeta").textContent = `Generated from the ${R.length} records in view · ${EV.qa.n}, ${EV.pv.n.toLowerCase()}`;
  $("#caFindings").innerHTML = F.map((f,i)=>`<div class="finding"><div class="n">${String(i+1).padStart(2,"0")}</div><div><h3>${esc(f.t)}</h3><dl><dt>Evidence</dt><dd>${esc(f.e)}</dd><dt>Why it matters</dt><dd>${esc(f.imp)}</dd><dt>Confidence</dt><dd class="small">Qualitative, single reviewer, public pages only. ${ev("qa")}</dd></dl></div></div>`).join("");
  // Charts
  const byFmt = CA_FORMATS.map(f=>({f, rs:R.filter(r=>r.format===f)})).filter(x=>x.rs.length).map(x=>({f:x.f, n:x.rs.length, v:avg(x.rs.map(overall))})).sort((a,b)=>b.v-a.v);
  chart("chCaFmt",{type:"bar",data:{labels:byFmt.map(x=>`${x.f} (n=${x.n})`),datasets:[{label:"Mean score",data:byFmt.map(x=>+x.v.toFixed(2)),backgroundColor:byFmt.map((x,i)=>i===0?C.green:C.gray)}]},options:{indexAxis:"y",layout:{padding:{right:36}},plugins:{legend:{display:false},valueLabels:{enabled:true,fmt:v=>v.toFixed(1)}},scales:{x:{min:0,max:5},y:{grid:{display:false}}}}});
  const audP = CA_AUDIENCES.map(a=>R.filter(r=>r.audience===a).length), audS = CA_AUDIENCES.map(a=>R.filter(r=>splitList(r.audiences).includes(a)).length);
  chart("chCaAud",{type:"bar",data:{labels:CA_AUDIENCES,datasets:[{label:"Primary audience",data:audP,backgroundColor:C.green},{label:"Secondary mention",data:audS,backgroundColor:C.gray2}]},options:{indexAxis:"y",plugins:{legend:{position:"bottom",align:"start"}},scales:{x:{stacked:true,beginAtZero:true,ticks:{precision:0}},y:{stacked:true,grid:{display:false},ticks:{color:c=>audP[c.index]===0?C.amber:"#A1A69F"}}}}});
  const pts = R.map((r,i)=>({x:+r.complexity+((i%5)-2)*0.07, y:+r.bizClarity+((Math.floor(i/5)%5)-2)*0.07, t:r.title}));
  chart("chCaTvB",{type:"scatter",data:{datasets:[{label:"Assets",data:pts,backgroundColor:"rgba(118,185,0,.75)",pointRadius:5}]},options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.raw.t}: technical ${Math.round(c.raw.x)}, business ${Math.round(c.raw.y)}`}}},scales:{x:{min:0.5,max:5.5,title:{display:true,text:"Technical complexity (1 to 5)"},ticks:{stepSize:1}},y:{min:0.5,max:5.5,title:{display:true,text:"Business benefit clarity (1 to 5)"},ticks:{stepSize:1}}}},plugins:[{id:"quad",beforeDatasetsDraw(ch){ const {ctx,chartArea:a,scales:{x,y}}=ch; ctx.save(); ctx.strokeStyle="#3A403A"; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(x.getPixelForValue(3),a.top); ctx.lineTo(x.getPixelForValue(3),a.bottom); ctx.moveTo(a.left,y.getPixelForValue(3)); ctx.lineTo(a.right,y.getPixelForValue(3)); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle="#7D837B"; ctx.font="11px IBM Plex Sans, sans-serif"; ctx.textAlign="right"; ctx.fillText("Technical, little business value", a.right-6, y.getPixelForValue(1)+4); ctx.textAlign="left"; ctx.fillText("Business-led", a.left+6, a.top+12); ctx.restore(); }}]});
  const roiN = CA_ROI.map(k=>R.filter(r=>r.roiEvidence===k).length);
  chart("chCaRoi",{type:"bar",data:{labels:CA_ROI,datasets:[{label:"Assets",data:roiN,backgroundColor:CA_ROI.map((k,i)=>i>=3?C.green:C.gray)}]},options:{indexAxis:"y",layout:{padding:{right:30}},plugins:{legend:{display:false},valueLabels:{enabled:true}},scales:{x:{beginAtZero:true,ticks:{precision:0}},y:{grid:{display:false}}}}});
  const painN = CA_PAINS.map(p=>R.filter(r=>splitList(r.pains).includes(p)).length);
  chart("chCaPain",{type:"bar",data:{labels:CA_PAINS,datasets:[{label:"Assets",data:painN,backgroundColor:painN.map(n=>n===0?C.amber:C.green)}]},options:{indexAxis:"y",layout:{padding:{right:30}},plugins:{legend:{display:false},valueLabels:{enabled:true}},scales:{x:{beginAtZero:true,ticks:{precision:0}},y:{grid:{display:false}}}}});
  const prodN = CA_PRODUCTS.map(p=>R.filter(r=>r.product===p).length);
  chart("chCaProd",{type:"bar",data:{labels:CA_PRODUCTS,datasets:[{label:"Assets",data:prodN,backgroundColor:C.gray}]},options:{indexAxis:"y",layout:{padding:{right:30}},plugins:{legend:{display:false},valueLabels:{enabled:true}},scales:{x:{beginAtZero:true,ticks:{precision:0}},y:{grid:{display:false}}}}});
  const sorted = R.slice().sort((a,b)=>overall(b)-overall(a));
  $("#caHeat").innerHTML = `<table><thead><tr><th>Asset</th>${RUBRIC.map(d=>`<th class="num" title="${esc(d.n)}">${esc(d.n.split(" ")[0])}</th>`).join("")}<th class="num">Overall</th></tr></thead><tbody>${sorted.map(r=>`<tr><td class="small">${esc(r.title)}<div class="tiny dim">${esc(r.format)} · ${esc(r.product)}</div></td>${SCORE_KEYS.map(k=>`<td>${scoreBadge(r[k])}</td>`).join("")}<td class="num"><b>${f1(overall(r))}</b></td></tr>`).join("")}<tr><td class="small dim">Mean</td>${SCORE_KEYS.map(k=>`<td class="mono small">${f1(avg(R.map(r=>+r[k])))}</td>`).join("")}<td class="num">${f1(avg(R.map(overall)))}</td></tr></tbody></table>`;
  const mx = Math.max(1,...CA_AUDIENCES.flatMap(a=>CA_PRODUCTS.map(p=>R.filter(r=>r.audience===a&&r.product===p).length)));
  $("#caMatrix").innerHTML = `<table><thead><tr><th>Audience</th>${CA_PRODUCTS.map(p=>`<th class="num">${esc(p)}</th>`).join("")}</tr></thead><tbody>${CA_AUDIENCES.map(a=>`<tr><td class="small">${esc(a)}</td>${CA_PRODUCTS.map(p=>{ const n=R.filter(r=>r.audience===a&&r.product===p).length; return `<td style="background:${n?`rgba(118,185,0,${0.12+0.5*n/mx})`:"transparent"}">${n||'<span class="dim">·</span>'}</td>`; }).join("")}</tr>`).join("")}</tbody></table><p class="tiny dim" style="margin-top:6px">Empty rows are audiences with no primary asset in view.</p>`;
  const cdN=[1,2,3,4,5].map(n=>R.filter(r=>+r.compDiff===n).length);
  chart("chCaComp",{type:"bar",data:{labels:["1 None","2 Generic","3 Own prior gen / unnamed","4 Named category","5 Named rivals"],datasets:[{label:"Assets",data:cdN,backgroundColor:[C.gray,C.gray,C.gray,C.green,C.green]}]},options:{layout:{padding:{top:16}},plugins:{legend:{display:false},valueLabels:{enabled:true}},scales:{y:{beginAtZero:true,ticks:{precision:0}},x:{grid:{display:false},ticks:{font:{size:10.5}}}}}});
  $("#caCompNote").innerHTML = `No reviewed page names a competing vendor. Comparisons are mostly against NVIDIA's earlier products (H100, Hopper, Blackwell, GB200, B200) or unnamed "traditional" systems. Expand a record below to see each asset's comparison wording.`;
  const opps = R.map(r=>{ const iss=splitList(r.issues).length; const pr=(5-overall(r))+(5-(+r.bizValue))/2+0.5*iss; const weak=RUBRIC.map(d=>({n:d.n,v:+r[d.k]})).sort((a,b)=>a.v-b.v)[0]; return {r, pr, weak, opp:splitList(r.opportunities)[0]||"", iss}; }).sort((a,b)=>b.pr-a.pr).slice(0,10);
  $("#caOpps").innerHTML = `<table><thead><tr><th class="num">#</th><th>Asset</th><th>Weakest dimension</th><th>Suggested improvement</th><th class="num">Issues</th><th class="num">Priority</th></tr></thead><tbody>${opps.map((o,i)=>`<tr><td class="num">${i+1}</td><td class="small">${esc(o.r.title)}<div class="tiny dim">${esc(o.r.audience)}</div></td><td class="small">${esc(o.weak.n)} ${scoreBadge(o.weak.v)}</td><td class="small">${esc(o.opp)}</td><td class="num">${o.iss}</td><td class="num"><b>${o.pr.toFixed(1)}</b></td></tr>`).join("")}</tbody></table><p class="tiny dim" style="margin-top:6px">The priority formula is the author's heuristic and is shown so it can be challenged.</p>`;
  renderCaTable(R);
}
const CA_COLS = [{k:"title",l:"Asset"},{k:"format",l:"Format"},{k:"audience",l:"Primary audience"},{k:"product",l:"Product"},{k:"date",l:"Date"},...RUBRIC.map(d=>({k:d.k,l:d.n.split(" ")[0],num:true})),{k:"overall",l:"Overall",num:true},{k:"roiEvidence",l:"ROI evidence"},{k:"validated",l:"Validated"}];
function renderCaTable(R){
  const open = new Set(caView.open||[]);
  const rows = sortRows(R.map(r=>({...r, overall:+overall(r).toFixed(2)})).map(r=>{ SCORE_KEYS.forEach(k=>r[k]=+r[k]); return r; }), caView.sort.k, caView.sort.dir);
  const arr = k => caView.sort.k===k ? `<span class="arr">${caView.sort.dir==="asc"?"▲":"▼"}</span>` : "";
  $("#caTbl").innerHTML = `<thead><tr>${CA_COLS.map(c=>`<th class="sortable ${c.num?"num":""}" data-sort="${c.k}" tabindex="0" aria-sort="${caView.sort.k===c.k?(caView.sort.dir==="asc"?"ascending":"descending"):"none"}">${esc(c.l)}${arr(c.k)}</th>`).join("")}<th class="no-print">Actions</th></tr></thead><tbody>${rows.length?rows.map(r=>{ const isO=open.has(r.id); return `<tr>
    <td style="min-width:220px"><button class="btn link" data-open="${esc(r.id)}" aria-expanded="${isO}" style="text-align:left">${isO?"−":"+"} ${esc(r.title)}</button>${r.partial==="yes"?' <span class="tag amber" data-tip="Part of this page was summarized by the fetch tool rather than read verbatim.">partial read</span>':""}<div class="tiny"><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.url.replace(/^https?:\/\//,"").slice(0,60))}</a></div></td>
    <td class="small">${esc(r.format)}</td><td class="small">${esc(r.audience)}</td><td class="small">${esc(r.product)}</td><td class="small mono" style="white-space:nowrap">${esc(fmtDate(r.date))}</td>
    ${SCORE_KEYS.map(k=>`<td class="num">${scoreBadge(r[k])}</td>`).join("")}<td class="num"><b>${f1(r.overall)}</b></td><td class="small">${esc(r.roiEvidence)}</td><td class="small">${r.validated==="yes"?'<span class="tag green">yes</span>':'<span class="tag">pending</span>'}</td>
    <td class="no-print" style="white-space:nowrap"><button class="btn sm" data-edit="${esc(r.id)}" aria-label="Edit ${esc(r.title)}">${icon("pencil")}</button> <button class="btn sm danger" data-del="${esc(r.id)}" aria-label="Delete ${esc(r.title)}">${icon("trash-2")}</button></td></tr>`
    + (isO ? `<tr class="expand"><td colspan="${CA_COLS.length+1}"><div class="grid g2" style="gap:24px">
      <div><h4 style="margin-top:0">Hero / value proposition</h4><p class="small">${esc(r.vp)}</p><h4>Verbatim excerpts</h4><ul class="clean small">${splitList(r.excerpts).map(x=>`<li>${esc(x)}</li>`).join("")}</ul><h4>Competitive comparison used</h4><p class="small">${esc(r.compDiffNote)}</p><h4>Call to action</h4><p class="small mono">${esc(r.cta)} <span class="dim">(${esc(r.ctaType)})</span></p></div>
      <div><h4 style="margin-top:0">Observations</h4><ul class="clean small">${splitList(r.observations).map(x=>`<li>${esc(x)}</li>`).join("")}</ul><h4>Improvement opportunities</h4><ul class="clean small">${splitList(r.opportunities).map(x=>`<li>${esc(x)}</li>`).join("")}</ul><h4>Challenges addressed · Issues</h4><p class="small">${esc(r.pains)}${r.issues?` · <span style="color:var(--amber)">${esc(r.issues)}</span>`:""}</p>
      <h4>Technical complexity · Business benefit clarity</h4><p class="small mono">${r.complexity} · ${r.bizClarity} · secondary audiences: ${esc(r.audiences||"none")} · date basis: ${esc(r.dateBasis)}</p>${r.analystNote?`<h4>Analyst note</h4><p class="small">${esc(r.analystNote)}</p>`:""}<p>${ev("qa")} ${r.validated==="yes"?ev("vp","validated by author"):ev("pv")}</p></div></div></td></tr>` : ""); }).join("") : `<tr><td colspan="${CA_COLS.length+1}" class="empty">No records match these filters.</td></tr>`}</tbody>`;
  const sortBy = k=>{ caView.sort = {k, dir: caView.sort.k===k && caView.sort.dir==="desc" ? "asc" : "desc"}; store.set("caView",caView); renderCaTable(caFiltered()); };
  $("#caTbl").onclick = e=>{
    const th=e.target.closest("th[data-sort]"); if(th){ sortBy(th.dataset.sort); return; }
    const o=e.target.closest("[data-open]"); if(o){ const id=o.dataset.open; open.has(id)?open.delete(id):open.add(id); caView.open=[...open]; store.set("caView",caView); renderCaTable(caFiltered()); return; }
    const ed=e.target.closest("[data-edit]"); if(ed){ editRecord(audit.find(r=>r.id===ed.dataset.edit)); return; }
    const d=e.target.closest("[data-del]"); if(d){ const r=audit.find(x=>x.id===d.dataset.del); confirmModal("Delete this record?", `"${esc(r.title)}" will be removed from the audit in this browser. Restore the audited dataset to undo.`, "Delete", ()=>{ audit=audit.filter(x=>x.id!==r.id); renderContent(); toast("Record deleted"); }); }
  };
  $("#caTbl").onkeydown = e=>{ const th=e.target.closest("th[data-sort]"); if(th && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); sortBy(th.dataset.sort); } };
}
function editRecord(r){
  const isNew = !r; const d = r || {id:"u"+Date.now().toString(36), title:"", url:"", date:"", dateBasis:"Visible date", format:CA_FORMATS[0], audience:CA_AUDIENCES[0], audiences:"", product:CA_PRODUCTS[0], pains:"", vp:"", complexity:3, bizClarity:3, roiEvidence:CA_ROI[0], compDiffNote:"", ctaType:CA_CTA[0], cta:"", excerpts:"", observations:"", opportunities:"", issues:"", partial:"no", clarity:3, relevance:3, bizValue:3, techCred:3, evidence:3, compDiff:3, action:3, validated:"no", analystNote:""};
  const sel = (k,l,list) => `<div class="field"><label class="fl" for="f-${k}">${esc(l)}</label><select id="f-${k}">${opts(list, d[k])}</select></div>`;
  const txt = (k,l,ph="") => `<div class="field"><label class="fl" for="f-${k}">${esc(l)}</label><input type="text" id="f-${k}" value="${esc(d[k])}" placeholder="${esc(ph)}"></div>`;
  const area = (k,l,ph="") => `<div class="field"><label class="fl" for="f-${k}">${esc(l)}</label><textarea id="f-${k}" style="min-height:58px" placeholder="${esc(ph)}">${esc(d[k])}</textarea></div>`;
  const num = (k,l) => `<div class="field"><label class="fl" for="f-${k}">${esc(l)} (1 to 5)</label><input type="number" id="f-${k}" min="1" max="5" step="1" value="${esc(d[k])}"></div>`;
  const pains = splitList(d.pains);
  openModal(`<h3 id="modalTitle">${isNew?"Add audit record":"Edit audit record"}</h3>
    <p class="small muted">Record only what you read on the page. Separate list items with " | ".</p>
    <div class="grid g2" style="gap:0 14px">${txt("title","Title")}${txt("url","URL","https://")}${txt("date","Publication or update date","YYYY-MM-DD or n.d.")}${sel("dateBasis","Date basis",["Visible date","Page metadata","Not stated"])}${sel("format","Format",CA_FORMATS)}${sel("product","Product focus",CA_PRODUCTS)}${sel("audience","Primary audience",CA_AUDIENCES)}${txt("audiences","Secondary audiences","separate with ;")}</div>
    <fieldset class="field" style="border:1px solid var(--line);padding:8px 10px"><legend class="fl">Challenges addressed</legend><div class="chips">${CA_PAINS.map(p=>`<label class="small" style="display:inline-flex;gap:5px;margin-right:10px"><input type="checkbox" class="f-pain" value="${esc(p)}" ${pains.includes(p)?"checked":""}>${esc(p)}</label>`).join("")}</div></fieldset>
    ${area("vp","Hero / value proposition (verbatim)")}
    <div class="grid g2" style="gap:0 14px">${num("complexity","Technical complexity")}${num("bizClarity","Business benefit clarity")}${sel("roiEvidence","ROI evidence",CA_ROI)}${sel("ctaType","CTA type",CA_CTA)}</div>
    ${txt("cta","CTA wording (exact)")}${area("compDiffNote","Competitive comparison used")}${area("excerpts","Verbatim excerpts")}${area("observations","Observations")}${area("opportunities","Improvement opportunities")}${txt("issues","Issues found","separate with ;")}
    <h4>Scores</h4><div class="grid g3" style="gap:0 14px">${RUBRIC.map(c=>num(c.k,c.n)).join("")}</div>
    <div class="grid g2" style="gap:0 14px">${sel("partial","Partial read",["no","yes"])}${sel("validated","Validated by author",["no","yes"])}</div>
    ${area("analystNote","Analyst note")}
    <div class="err" id="f-err" role="alert"></div>
    <div class="btn-row" style="justify-content:flex-end;margin-top:12px"><button class="btn" data-x>Cancel</button><button class="btn primary" data-save>${isNew?"Add record":"Save changes"}</button></div>`, m=>{
    m.querySelector("[data-x]").onclick = closeModal;
    m.querySelector("[data-save]").onclick = ()=>{
      const o = {...d}; ["title","url","date","dateBasis","format","product","audience","audiences","vp","roiEvidence","ctaType","cta","compDiffNote","excerpts","observations","opportunities","issues","partial","validated","analystNote"].forEach(k=>o[k]=$("#f-"+k).value.trim());
      o.pains = $$(".f-pain", m).filter(c=>c.checked).map(c=>c.value).join("; ");
      const errs=[]; if(!o.title) errs.push("Title is required."); if(o.url && !/^https?:\/\/\S+$/i.test(o.url)) errs.push("URL must start with http:// or https://."); if(o.date && o.date!=="n.d." && !/^\d{4}(-\d{2}){0,2}$/.test(o.date)) errs.push("Date must be YYYY, YYYY-MM, YYYY-MM-DD or n.d.");
      ["complexity","bizClarity",...SCORE_KEYS].forEach(k=>{ const v=Number($("#f-"+k).value); if(!Number.isInteger(v)||v<1||v>5) errs.push(`${k} must be a whole number from 1 to 5.`); else o[k]=v; });
      if(errs.length){ $("#f-err").innerHTML=errs.map(esc).join("<br>"); $("#f-err").classList.add("show"); return; }
      if(isNew) audit.push(o); else audit = audit.map(x=>x.id===o.id?o:x);
      closeModal(); renderContent(); toast(isNew?"Record added":"Record saved");
    };
  });
}
function importAuditRows(rows){
  if(rows.length<2){ infoModal("Import failed","The file has no data rows. Download the CSV template for the expected columns."); return; }
  const norm = s => s.toLowerCase().replace(/[^a-z]/g,"");
  const head = rows[0].map(norm); const idx = Object.fromEntries(CA_FIELDS.map(f=>[f, head.indexOf(norm(f))]));
  if(idx.title<0){ infoModal("Import failed", `Required column missing: title. Expected header: <code class="mono small">${esc(CA_FIELDS.join(","))}</code>`); return; }
  const good=[], bad=[];
  rows.slice(1).forEach((r,i)=>{ const o={}; const errs=[];
    CA_FIELDS.forEach(f=>{ o[f] = idx[f]>=0 ? unguard(r[idx[f]]) : ""; });
    if(!o.id) o.id="i"+Date.now().toString(36)+i;
    if(!o.title) errs.push("missing title");
    if(o.url && !/^https?:\/\/\S+$/i.test(o.url)) errs.push("invalid URL");
    ["complexity","bizClarity",...SCORE_KEYS].forEach(k=>{ if(o[k]===""){ errs.push(`${k} missing`); return; } const v=Number(o[k]); if(!Number.isInteger(v)||v<1||v>5) errs.push(`${k} not 1 to 5`); else o[k]=v; });
    if(!CA_FORMATS.includes(o.format)) errs.push(`unknown format "${o.format}"`);
    if(!CA_AUDIENCES.includes(o.audience)) errs.push(`unknown audience "${o.audience}"`);
    if(!CA_PRODUCTS.includes(o.product)) errs.push(`unknown product "${o.product}"`);
    if(!CA_ROI.includes(o.roiEvidence)) o.roiEvidence = "None";
    if(!CA_CTA.includes(o.ctaType)) o.ctaType = "Read more or datasheet";
    o.partial = o.partial==="yes"?"yes":"no"; o.validated = o.validated==="yes"?"yes":"no";
    errs.length ? bad.push(`Row ${i+2}: ${errs.join(", ")}`) : good.push(o); });
  openModal(`<h3 id="modalTitle">Import ${good.length} record(s)?</h3><p class="muted small">${good.length} valid row(s), ${bad.length} skipped. Format must be one of: ${esc(CA_FORMATS.join(", "))}. Audience: ${esc(CA_AUDIENCES.join(", "))}. Product: ${esc(CA_PRODUCTS.join(", "))}.</p>${bad.length?`<div class="callout amber small" style="max-height:160px;overflow:auto">${bad.slice(0,50).map(esc).join("<br>")}</div>`:""}<div class="btn-row" style="justify-content:flex-end"><button class="btn" data-x>Cancel</button><button class="btn" data-append ${good.length?"":"disabled"}>Append to current</button><button class="btn primary" data-replace ${good.length?"":"disabled"}>Replace current</button></div>`, m=>{
    m.querySelector("[data-x]").onclick=closeModal;
    m.querySelector("[data-append]").onclick=()=>{ const ids=new Set(audit.map(r=>r.id)); good.forEach(g=>{ if(ids.has(g.id)) g.id=g.id+"-"+Math.random().toString(36).slice(2,6); }); audit=audit.concat(good); closeModal(); renderContent(); toast(`Imported ${good.length} record(s)`); };
    m.querySelector("[data-replace]").onclick=()=>{ audit=good; closeModal(); renderContent(); toast(`Replaced with ${good.length} record(s)`); };
  });
}

/* ---------- Strategic Recommendations (editorial report) ---------- */
let oppScores;
function initStrategy(){
  oppScores = store.get("oppScores", null) || Object.fromEntries(OPPORTUNITIES.map(o=>[o.id,{...o.s}]));
  const A = store.get("audit2", null) || realAudit();
  const tc=avg(A.map(r=>+r.techCred)), bv=avg(A.map(r=>+r.bizValue));
  const prim = CA_AUDIENCES.map(a=>`${a} ${A.filter(r=>r.audience===a).length}`).join(", ");
  const dynE = {techVsBiz:`Across ${A.length} audited assets, technical credibility averages ${f1(tc)} and business value ${f1(bv)} on the 1 to 5 rubric.`, audienceGap:`Primary-audience counts: ${prim}. The AI Factories purchasing guide was linked but not read.`};
  $("#strategy-body").innerHTML = `
    <article class="prose" style="max-width:none">
      <div class="section-h"><h3>Executive summary</h3><div class="btn-row no-print"><button class="btn sm" id="stPrint">${icon("printer")}Print report</button><button class="btn sm" id="stMd">${icon("download")}Download .md</button></div></div>
      <div class="grid" style="grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:32px" id="stSummary">
        <div>
          <p class="lead" style="font-size:15px">Enterprise AI use is broad, but measured value is not: 44% of organizations report scaling AI across the enterprise and 37% a positive EBIT contribution ${cite("MCK26")}. The evidence points less to a capability problem than to a measurement and translation problem. Most organizations see their total AI bill but not their unit costs ${cite("DEL26")}, and in a self-selected survey a third of GPU operators do not measure utilization at all ${cite("VBP26")}.</p>
          <p>A review of ${A.length} public NVIDIA pages found strong technical content and weaker business translation: technical credibility averages ${f1(tc)} against ${f1(bv)} for business value, no reviewed page targets the CFO, and a few headline claims use different baselines on different pages. NVIDIA has started to lead with unit economics on the Vera Rubin page; the opportunity is to make that frame auditable and role-specific.</p>
          <p>The recommendations below are ranked only where evidence supports them. The causal links between complexity, understanding, financial justification and adoption are mostly hypotheses; two links have descriptive survey support. Buyer interviews and a message experiment are designed but not yet run.</p>
        </div>
        <div class="stat-list" style="border-top:0">
          <div class="stat" style="grid-template-columns:64px minmax(0,1fr)"><div class="v hl">7</div><div class="t">Opportunities, 2 recommended first<small>Auditable TCO kit; claim-governance standard</small></div></div>
          <div class="stat" style="grid-template-columns:64px minmax(0,1fr)"><div class="v">${FINDINGS.length}</div><div class="t">Key findings<small>${FINDINGS.filter(f=>f.conf==="High").length} high, ${FINDINGS.filter(f=>f.conf==="Medium").length} medium, ${FINDINGS.filter(f=>f.conf==="Low").length} low confidence</small></div></div>
          <div class="stat" style="grid-template-columns:64px minmax(0,1fr)"><div class="v">2 / 9</div><div class="t">Causal links with evidence<small>The rest are hypotheses to test</small></div></div>
        </div>
      </div>
    </article>
    <div class="section"><div class="section-h"><h3>Problem tree: how complexity may become slower adoption</h3><span class="meta">Select a box or an arrow</span></div>
      <div class="legend" style="margin-bottom:8px"><span><i style="background:var(--teal)"></i>Evidence-supported link (descriptive)</span><span><i style="background:var(--violet)"></i>Hypothesized link (dashed)</span><span>Box border shows the node's evidence status</span></div>
      <div class="grid" style="grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:20px" id="stCausalGrid"><div class="card flat" style="padding:8px">${causalSvg()}</div><div id="causalDetail" class="detail" aria-live="polite"></div></div>
    </div>
    <div class="section"><div class="section-h"><h3>Key findings</h3>${evLegend().replace('legend-ev','legend-ev" style="border:0;margin:0;padding:0')}</div>
      ${FINDINGS.map((f,i)=>`<div class="finding"><div class="n">F${i+1}</div><div><h3>${esc(f.t)}</h3><div class="row" style="margin-bottom:6px">${kindTag(f.kind)} ${ev(f.ev)} <span class="conf ${f.conf}">Confidence: ${f.conf}</span></div><dl>
        <dt>Evidence</dt><dd>${esc(f.dyn?dynE[f.dyn]+" "+(f.dyn==="audienceGap"?"":""):f.e)}${f.dyn==="audienceGap"?"":""} ${f.src.map(cite).join(" ")}${f.dyn?` <a href="#/content" class="small">See Content Audit</a>`:""}</dd>
        <dt>Business implication</dt><dd>${esc(f.biz)}</dd><dt>PMM implication</dt><dd>${esc(f.pmm)}</dd><dt>Limitation</dt><dd class="muted">${esc(f.lim)}</dd></dl></div></div>`).join("")}
    </div>
    <div class="section"><div class="section-h"><h3>Strategic opportunities</h3><span class="meta">Listed only where at least one finding supports them</span></div>
      <div class="tbl-wrap"><table><thead><tr><th>Opportunity</th><th>Supported by</th><th class="num">Evidence strength</th><th>Status</th></tr></thead><tbody>${OPPORTUNITIES.map(o=>`<tr><td><b>${esc(o.t)}</b><div class="small muted">${esc(o.d)}</div></td><td class="mono small">${o.f.map(n=>"F"+n).join(", ")}</td><td class="num" id="es-${o.id}">${oppScores[o.id].es}</td><td>${kindTag("rc")}</td></tr>`).join("")}</tbody></table></div>
    </div>
    <div class="section"><div class="section-h"><h3>Impact versus effort</h3>${ev("pv","proposed scores")}</div>
      <p class="small muted" style="max-width:var(--measure)">Scores are the author's proposed judgements on a 1 to 5 scale, not measurements. Impact is the mean of customer value, strategic relevance and commercial impact. Effort is implementation complexity. Point size shows evidence strength. Edit any score to see the matrix move.</p>
      <div class="grid" style="gap:20px" id="stMatrixGrid">
        <div class="chart-box tall"><canvas id="chImpact" role="img" aria-label="Impact versus effort matrix of seven opportunities"></canvas></div>
        <div class="tbl-wrap"><table id="oppTbl"></table></div>
      </div>
      <div class="btn-row no-print" style="margin-top:8px"><button class="btn sm ghost" id="oppReset">${icon("rotate-ccw")}Reset proposed scores</button></div>
    </div>
    <div class="section"><div class="section-h"><h3>90-day roadmap</h3><span class="meta">Proposed plan · select a bar for details</span></div>
      <div class="timeline" id="timeline"></div><div id="tlDetail" class="callout blue small" style="margin-top:10px">Select a bar to see owner, success measure and phase.</div>
    </div>
    <div class="section"><div class="section-h"><h3>KPI framework</h3><span class="meta">No NVIDIA figures are estimated; targets are set after a baseline</span></div>
      <div class="seg no-print" role="group" aria-label="Funnel stage" id="kpiSeg" style="margin-bottom:10px"><button aria-pressed="true" data-k="all" class="g">All stages</button>${["Awareness","Consideration","Evaluation","Adoption"].map(s=>`<button aria-pressed="false" data-k="${s}">${s}</button>`).join("")}</div>
      <div class="tbl-wrap" id="kpiTbl"></div>
    </div>
    ${analystNote("strategy","Which recommendation would you pitch first in an interview, and what evidence would you still want?")}`;
  bindCausal();
  renderImpact(); renderTimeline(); renderKpis("all");
  segBind("#kpiSeg","k",renderKpis);
  $("#oppReset").onclick = ()=>{ oppScores = Object.fromEntries(OPPORTUNITIES.map(o=>[o.id,{...o.s}])); renderImpact(); toast("Proposed scores reset"); };
  $("#stPrint").onclick = ()=>printWith("");
  $("#stMd").onclick = ()=>download("strategic-recommendations.md", strategyMd(dynE), "text/markdown");
}
function causalSvg(){
  const W=180, H=62;
  const N=Object.fromEntries(CAUSAL.nodes.map(n=>[n.id,n]));
  const col={vp:"var(--accent)",vs:"var(--teal)",hy:"var(--violet)",pv:"var(--muted)",qa:"var(--blue)",il:"var(--amber)"};
  const anchor=(a,b)=>{ const ax=a.x+W/2, ay=a.y+H/2, bx=b.x+W/2, by=b.y+H/2; let sx,sy,tx,ty; if(Math.abs(ay-by)<5 && Math.abs(ax-bx)>W+80){ return null; } if(Math.abs(ay-by)<5){ sx=ax<bx?a.x+W:a.x; sy=ay; tx=ax<bx?b.x:b.x+W; ty=by; } else if(Math.abs(ax-bx)<5){ sx=ax; sy=ay<by?a.y+H:a.y; tx=bx; ty=ay<by?b.y:b.y+H; } else { sx=ax+(bx>ax?W/4:-W/4); sy=ay<by?a.y+H:a.y; tx=bx+(ax>bx?W/4:-W/4); ty=ay<by?b.y:b.y+H; } return [sx,sy,tx,ty]; };
  let under=0; const edges = CAUSAL.edges.map((e,i)=>{ const a=N[e.f], b=N[e.t]; const an=anchor(a,b); let curve; if(!an){ const k=under++; const ry=296+k*12, ox=(k?16:-16); curve=`M${a.x+W/2+ox},${a.y+H} L${a.x+W/2+ox},${ry} L${b.x+W/2+ox},${ry} L${b.x+W/2+ox},${b.y+H}`; } else { const [sx,sy,tx,ty]=an; const my=(sy+ty)/2; curve = (Math.abs(sy-ty)>5&&Math.abs(sx-tx)>5)?`M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`:`M${sx},${sy} L${tx},${ty}`; }
    return `<g class="eg ${e.st==="ev"?"ev":"hy"}" data-e="${i}" tabindex="0" role="button" aria-label="Link from ${esc(N[e.f].t)} to ${esc(N[e.t].t)}: ${e.st==="ev"?"evidence-supported":"hypothesized"}"><path class="hit" d="${curve}"/><path class="ln" d="${curve}" marker-end="url(#arr-${e.st})"/></g>`; }).join("");
  const nodes = CAUSAL.nodes.map(n=>`<g class="nd" data-n="${n.id}" tabindex="0" role="button" aria-label="${esc(n.t)}: ${esc(EV[n.ev].n)}"><rect x="${n.x}" y="${n.y}" width="${W}" height="${H}" rx="2" style="stroke:${col[n.ev]}"/><text x="${n.x+10}" y="${n.y+24}">${esc(n.t)}</text><text class="sub" x="${n.x+10}" y="${n.y+43}">${esc(n.s.length>26?n.s.slice(0,25)+"…":n.s)}</text></g>`).join("");
  return `<svg class="causal" viewBox="0 0 900 322" role="group" aria-label="Problem tree diagram"><defs><marker id="arr-ev" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#5DB8AE"/></marker><marker id="arr-hy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#A894E0"/></marker></defs>${edges}${nodes}</svg>`;
}
function bindCausal(){
  const svg=$("#strategy-body .causal"); const N=Object.fromEntries(CAUSAL.nodes.map(n=>[n.id,n]));
  const showN = id=>{ const n=N[id]; $$(".nd",svg).forEach(g=>g.classList.toggle("sel",g.dataset.n===id)); $$(".eg",svg).forEach(g=>g.classList.remove("sel"));
    const ins=CAUSAL.edges.filter(e=>e.t===id), outs=CAUSAL.edges.filter(e=>e.f===id);
    $("#causalDetail").innerHTML = `<div class="kicker">Node</div><h3 style="font-size:16px">${esc(n.t)}</h3><p>${ev(n.ev)}</p><p class="small">${esc(n.d)}</p>${n.src.length?`<p class="small">${n.src.map(id=>srcLink(id,true)).join("<br>")}</p>`:""}<dl><dt>Driven by</dt><dd class="small">${ins.length?ins.map(e=>`${esc(N[e.f].t)} (${e.st==="ev"?"evidence":"hypothesis"})`).join("<br>"):"Root cause in this model"}</dd><dt>Leads to</dt><dd class="small">${outs.length?outs.map(e=>`${esc(N[e.t].t)} (${e.st==="ev"?"evidence":"hypothesis"})`).join("<br>"):"Outcome in this model"}</dd></dl>`; };
  const showE = i=>{ const e=CAUSAL.edges[i]; $$(".eg",svg).forEach(g=>g.classList.toggle("sel",+g.dataset.e===i)); $$(".nd",svg).forEach(g=>g.classList.remove("sel"));
    $("#causalDetail").innerHTML = `<div class="kicker">Link</div><h3 style="font-size:16px">${esc(N[e.f].t)} → ${esc(N[e.t].t)}</h3><p>${e.st==="ev"?ev("vp","evidence-supported (descriptive)"):ev("hy")}</p><p class="small">${esc(e.d)}</p><p class="tiny dim">Survey associations do not establish cause. Testing these links needs buyer interviews or longitudinal data.</p>`; };
  svg.addEventListener("click", e=>{ const g=e.target.closest(".nd"); if(g){ showN(g.dataset.n); return; } const ed=e.target.closest(".eg"); if(ed) showE(+ed.dataset.e); });
  svg.addEventListener("keydown", e=>{ if(e.key!=="Enter"&&e.key!==" ") return; const g=e.target.closest(".nd"); if(g){ e.preventDefault(); showN(g.dataset.n); return; } const ed=e.target.closest(".eg"); if(ed){ e.preventDefault(); showE(+ed.dataset.e); } });
  showN("n3");
}
const impactOf = s => (s.cv+s.sr+s.ci)/3;
function renderImpact(){
  store.set("oppScores", oppScores);
  const K=[["cv","Customer value"],["sr","Strategic relevance"],["cx","Complexity (effort)"],["es","Evidence strength"],["ci","Commercial impact"]];
  $("#oppTbl").innerHTML = `<thead><tr><th>Opportunity</th>${K.map(k=>`<th class="num" title="${k[1]}">${k[1].split(" ")[0]}</th>`).join("")}<th class="num">Impact</th></tr></thead><tbody>${OPPORTUNITIES.map((o,i)=>{ const s=oppScores[o.id]; return `<tr><td class="small"><span class="mono dim">${i+1}</span> ${esc(o.t)}</td>${K.map(k=>`<td class="num"><input type="number" min="1" max="5" step="1" value="${s[k[0]]}" data-o="${o.id}" data-k="${k[0]}" aria-label="${esc(o.t)}: ${k[1]}" style="width:52px;padding:3px 5px"></td>`).join("")}<td class="num"><b>${impactOf(s).toFixed(1)}</b></td></tr>`; }).join("")}</tbody>`;
  $("#oppTbl").oninput = e=>{ const t=e.target; if(!t.dataset.o) return; const v=Number(t.value); if(!Number.isInteger(v)||v<1||v>5){ t.classList.add("invalid"); return; } t.classList.remove("invalid"); oppScores[t.dataset.o][t.dataset.k]=v; store.set("oppScores",oppScores); drawImpact(); const row=t.closest("tr"); row.lastElementChild.innerHTML=`<b>${impactOf(oppScores[t.dataset.o]).toFixed(1)}</b>`; const es=$("#es-"+t.dataset.o); if(es) es.textContent=oppScores[t.dataset.o].es; };
  drawImpact();
}
function drawImpact(){
  const pts = OPPORTUNITIES.map((o,i)=>{ const s=oppScores[o.id]; return {x:s.cx, y:+impactOf(s).toFixed(2), r:4+s.es*2.2, t:o.t, n:i+1}; });
  chart("chImpact",{type:"bubble",data:{datasets:[{label:"Opportunities",data:pts,backgroundColor:pts.map(p=>p.y>=3.5&&p.x<=3?"rgba(118,185,0,.55)":"rgba(161,166,159,.35)"),borderColor:pts.map(p=>p.y>=3.5&&p.x<=3?C.green:C.dim),borderWidth:1}]},
    options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.raw.n}. ${c.raw.t} · impact ${c.raw.y.toFixed(1)}, effort ${c.raw.x}`}}},scales:{x:{min:0.5,max:5.5,title:{display:true,text:"Effort (implementation complexity)"},ticks:{stepSize:1}},y:{min:0.5,max:5.5,title:{display:true,text:"Impact"},ticks:{stepSize:1}}}},
    plugins:[{id:"quads",beforeDatasetsDraw(ch){ const {ctx,chartArea:a,scales:{x,y}}=ch; ctx.save(); ctx.strokeStyle="#3A403A"; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(x.getPixelForValue(3),a.top); ctx.lineTo(x.getPixelForValue(3),a.bottom); ctx.moveTo(a.left,y.getPixelForValue(3.5)); ctx.lineTo(a.right,y.getPixelForValue(3.5)); ctx.stroke(); ctx.setLineDash([]); ctx.font="11px IBM Plex Sans, sans-serif"; ctx.fillStyle="#7D837B";
      ctx.textAlign="left"; ctx.fillText("Do first: high impact, lower effort", a.left+6, a.top+12); ctx.textAlign="right"; ctx.fillText("Plan: high impact, higher effort", a.right-6, a.top+12); ctx.textAlign="left"; ctx.fillText("Fill in", a.left+6, a.bottom-6); ctx.textAlign="right"; ctx.fillText("Reconsider", a.right-6, a.bottom-6); ctx.restore(); },
      afterDatasetsDraw(ch){ const {ctx}=ch; const meta=ch.getDatasetMeta(0); ctx.save(); ctx.font='11px "IBM Plex Mono", monospace'; ctx.fillStyle="#F2F3F0"; ctx.textAlign="center"; ctx.textBaseline="middle"; meta.data.forEach((el,i)=>ctx.fillText(String(i+1), el.x, el.y)); ctx.restore(); }}]});
}
function renderTimeline(){
  const sel = store.get("tlSel", null);
  $("#timeline").innerHTML = `<div class="tl-axis"><div>Workstream</div>${PHASES.map(p=>`<div>${esc(p)}</div>`).join("")}</div>${ROADMAP.map((r,i)=>`<div class="tl-row"><div class="lbl">${esc(r.t)}</div><div class="tl-track"><button class="tl-bar ${r.p===2?"p2":r.p===3?"p3":""}" data-i="${i}" aria-pressed="${sel===i}" style="left:${((r.s-1)/90*100).toFixed(2)}%;width:${((r.e-r.s+1)/90*100).toFixed(2)}%" title="Days ${r.s} to ${r.e}">Days ${r.s} to ${r.e}</button></div></div>`).join("")}`;
  const showT = i=>{ const r=ROADMAP[i]; store.set("tlSel", i); $$("#timeline .tl-bar").forEach(b=>b.setAttribute("aria-pressed", +b.dataset.i===i)); $("#tlDetail").innerHTML = `<b>${esc(r.t)}</b> · ${esc(PHASES[r.p-1])} · Days ${r.s} to ${r.e}<br>Owner (proposed): ${esc(r.o)} · Success measure: ${esc(r.m)}`; };
  $("#timeline").onclick = e=>{ const b=e.target.closest(".tl-bar"); if(b) showT(+b.dataset.i); };
  if(sel!==null && ROADMAP[sel]) showT(sel);
}
function renderKpis(stage){
  const rows = KPI_FRAMEWORK.filter(k=>stage==="all"||k.st===stage);
  const oT = id => (OPPORTUNITIES.find(o=>o.id===id)||{}).t || "";
  $("#kpiTbl").innerHTML = `<table><thead><tr><th>Stage</th><th>KPI</th><th>Objective</th><th style="min-width:220px">Formula</th><th>Data source</th><th>Frequency</th><th>Initiative</th><th>Type</th></tr></thead><tbody>${rows.map(k=>`<tr><td class="small">${esc(k.st)}</td><td><b class="small">${esc(k.k)}</b></td><td class="small">${esc(k.o)}</td><td class="mono tiny">${esc(k.f)}</td><td class="small">${esc(k.ds)}</td><td class="small">${esc(k.fr)}</td><td class="small">${esc(oT(k.i))}</td><td class="small">${tip(k.li==="Leading"?"leading indicator":"lagging indicator", k.li)}</td></tr>`).join("")}</tbody></table>`;
}
function strategyMd(dynE){
  const l=a=>a.map(x=>"- "+x).join("\n");
  return `# Strategic Recommendations: The Enterprise AI Infrastructure Adoption Gap\n_Independent portfolio project by Ana Laura Nascimento Silva (2026). Not affiliated with NVIDIA._\n\n## Key findings\n${FINDINGS.map((f,i)=>`### F${i+1}. ${f.t}\n- Type: ${KINDS[f.kind]} · Evidence status: ${EV[f.ev].n} · Confidence: ${f.conf}\n- Evidence: ${f.dyn?dynE[f.dyn]:f.e} ${f.src.map(s=>`[${s}]`).join(" ")}\n- Business implication: ${f.biz}\n- PMM implication: ${f.pmm}\n- Limitation: ${f.lim}\n`).join("\n")}\n## Opportunities (proposed scores, 1 to 5)\n${OPPORTUNITIES.map((o,i)=>{ const s=oppScores[o.id]; return `${i+1}. **${o.t}**: ${o.d} (impact ${impactOf(s).toFixed(1)}, effort ${s.cx}, evidence ${s.es}; supported by ${o.f.map(n=>"F"+n).join(", ")})`; }).join("\n")}\n\n## 90-day roadmap\n${l(ROADMAP.map(r=>`Days ${r.s} to ${r.e}: ${r.t} (owner: ${r.o}; success: ${r.m})`))}\n\n## KPI framework\n${l(KPI_FRAMEWORK.map(k=>`${k.st}: ${k.k} = ${k.f} (${k.ds}; ${k.fr}; ${k.li})`))}\n\n## Sources\n${[...new Set(FINDINGS.flatMap(f=>f.src))].map(id=>`- [${id}] ${SRC[id].title}, ${SRC[id].pub}, ${fmtDate(SRC[id].date)}. ${SRC[id].url}`).join("\n")}\n`;
}

/* ---------- Messaging Framework ---------- */
function initFramework(){
  const st = store.get("fw", {a:"CFO"});
  $("#framework-body").innerHTML = `
    <div class="callout"><b>How to read this framework.</b> Value propositions and benefits are proposed messaging ${ev("hy")}. Proof points are verified facts with their source ${ev("vp")}; vendor projections are labeled. Nothing here is NVIDIA's own messaging.</div>
    <div class="lib" style="grid-template-columns:240px minmax(0,1fr)">
      <div class="lib-list" role="group" aria-label="Audiences" id="fwList">${FRAMEWORK.map(f=>`<button data-a="${esc(f.a)}" aria-pressed="${f.a===st.a}"><b>${esc(f.a)}</b><span>${esc(f.profile.split(";")[0].slice(0,60))}</span></button>`).join("")}</div>
      <div id="fwOut" aria-live="polite"></div>
    </div>
    <div class="section"><div class="section-h"><h3>Feature to benefit matrix: Vera Rubin and the full stack</h3><div class="btn-row no-print"><button class="btn sm" id="fwMd">${icon("download")}Download framework (.md)</button></div></div>
      <div class="tbl-wrap"><table><thead><tr><th>Feature</th><th>Functional benefit</th><th>Customer outcome</th><th>Business value</th><th>Evidence</th><th>Status</th></tr></thead><tbody>${F2B.map(r=>`<tr><td class="small"><b>${esc(r.f)}</b></td><td class="small">${esc(r.fb)}</td><td class="small">${esc(r.co)}</td><td class="small">${esc(r.bv)}</td><td class="small muted">${esc(r.ev)} ${cite(r.src)}</td><td>${ev(r.st)}</td></tr>`).join("")}</tbody></table></div>
      <p class="tiny dim" style="margin-top:6px">"Pending Validation" marks rows whose evidence is inconsistent or has no stated baseline on the source page. "Strategic Hypothesis" marks rows where the business value is the author's inference.</p>
    </div>
    ${analystNote("framework","Which audience's value proposition is weakest, and how would you test it?")}`;
  const render = a=>{ st.a=a; store.set("fw",st); const f=FRAMEWORK.find(x=>x.a===a)||FRAMEWORK[0];
    $$("#fwList button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.a===f.a));
    const li = arr=>`<ul class="clean small">${arr.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
    $("#fwOut").innerHTML = `<div class="doc"><div class="doc-head"><div><div class="kicker">Audience message map</div><h3>${esc(f.a)}</h3><p class="small muted" style="margin:0">${esc(f.profile)}</p></div></div>
      <div class="doc-sec"><h4>Core value proposition ${ev("hy")}</h4><p class="vp">${esc(f.vp)}</p></div>
      <div class="grid g3"><div class="doc-sec"><h4>Objectives</h4>${li(f.obj)}</div><div class="doc-sec"><h4>Pain points</h4>${li(f.pains)}</div><div class="doc-sec"><h4>Objections</h4>${li(f.objections)}</div></div>
      <div class="grid g3"><div class="doc-sec"><h4>Decision criteria</h4>${li(f.criteria)}</div><div class="doc-sec"><h4>Benefits</h4>${li(f.benefits)}</div><div class="doc-sec"><h4>Supporting capabilities</h4>${li(f.caps)}</div></div>
      <div class="doc-sec"><h4>Verified proof points</h4><ul class="clean small">${f.proof.map(p=>`<li style="margin:4px 0">${esc(p[0])} <span class="tiny">${srcLink(p[1],true)}</span></li>`).join("")}</ul></div>
      <div class="grid g2"><div class="doc-sec"><h4>Recommended assets</h4><p class="small">${f.assets.map(esc).join(" · ")}</p></div><div class="doc-sec"><h4>Call to action</h4><p class="small mono">${esc(f.cta)}</p></div></div></div>`; };
  $("#fwList").onclick = e=>{ const b=e.target.closest("[data-a]"); if(b) render(b.dataset.a); };
  $("#fwMd").onclick = ()=>download("messaging-framework.md", `# Messaging Framework\n_Independent concept. Value propositions are proposed messaging (hypotheses); proof points cite public sources._\n\n`+FRAMEWORK.map(f=>`## ${f.a}\n${f.profile}\n\n**Value proposition:** ${f.vp}\n\n**Objectives:** ${f.obj.join("; ")}\n\n**Pain points:** ${f.pains.join("; ")}\n\n**Objections:** ${f.objections.join("; ")}\n\n**Decision criteria:** ${f.criteria.join("; ")}\n\n**Benefits:** ${f.benefits.join("; ")}\n\n**Capabilities:** ${f.caps.join("; ")}\n\n**Proof points:**\n${f.proof.map(p=>`- ${p[0]} (${SRC[p[1]].pub}, ${fmtDate(SRC[p[1]].date)}: ${SRC[p[1]].url})`).join("\n")}\n\n**Assets:** ${f.assets.join("; ")}\n\n**CTA:** ${f.cta}\n`).join("\n")+`\n## Feature to benefit matrix\n| Feature | Functional benefit | Customer outcome | Business value | Evidence | Status |\n|---|---|---|---|---|---|\n`+F2B.map(r=>`| ${r.f} | ${r.fb} | ${r.co} | ${r.bv} | ${r.ev} [${r.src}] | ${EV[r.st].n} |`).join("\n")+"\n", "text/markdown");
  render(st.a);
}

/* ---------- Asset Library ---------- */
const refLinks = t => esc(t).replace(/\[([A-Z0-9]{2,8})\]/g, (m,id)=>SRC[id]?`<a class="mono tiny" href="${esc(SRC[id].url)}" target="_blank" rel="noopener noreferrer" title="${esc(SRC[id].title)}">[${id}]</a>`:m);
function assetMd(a){ const ids=[...new Set(a.sections.flatMap(s=>(s[1].match(/\[([A-Z0-9]{2,8})\]/g)||[]).map(x=>x.slice(1,-1))))].filter(id=>SRC[id]);
  return `# ${a.t}\n_Audience: ${a.aud} · Format: ${a.fmt}_\n\n> ${CONCEPT_NOTE}\n\n`+a.sections.map(s=>`## ${s[0]}\n${s[1]}\n`).join("\n")+(ids.length?`\n## Sources\n${ids.map(id=>`- [${id}] ${SRC[id].title}, ${SRC[id].pub}, ${fmtDate(SRC[id].date)}. ${SRC[id].url}`).join("\n")}\n`:"")+`\n---\nIndependent portfolio project by Ana Laura Nascimento Silva (2026). Not affiliated with NVIDIA.\n`; }
function initAssets(){
  const st = store.get("assets", {id:"onepager"});
  $("#assets-body").innerHTML = `<div class="lib">
      <div><div class="lib-list" role="group" aria-label="Documents" id="libList">${ASSETS.map(a=>`<button data-id="${a.id}" aria-pressed="${a.id===st.id}"><b>${esc(a.t)}</b><span>${esc(a.aud)} · ${esc(a.fmt)}</span></button>`).join("")}</div>
        <p class="tiny dim" style="margin-top:10px">Each document is an independent concept for this portfolio. None is NVIDIA material.</p></div>
      <div><div class="btn-row no-print" style="margin-bottom:10px"><button class="btn" id="libCopy">${icon("copy")}Copy text</button><button class="btn" id="libMd">${icon("download")}Download .md</button><button class="btn primary" id="libPrint">${icon("printer")}Print / Save PDF</button></div><div id="libDoc" class="print-keep" aria-live="polite"></div></div>
    </div>`;
  const render = id=>{ st.id=id; store.set("assets",st); const a=ASSETS.find(x=>x.id===id)||ASSETS[0];
    $$("#libList button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.id===a.id));
    $("#libDoc").innerHTML = `<article class="doc"><div class="doc-head"><div><div class="concept">Independent concept · not NVIDIA material</div><h3>${esc(a.t)}</h3><div class="small muted">Audience: ${esc(a.aud)} · Format: ${esc(a.fmt)}</div></div></div>
      ${a.sections.map(s=>`<div class="doc-sec"><h4>${esc(s[0])}</h4><div style="white-space:pre-wrap">${refLinks(s[1])}</div></div>`).join("")}
      <p class="tiny dim" style="margin-top:14px;border-top:1px solid var(--line);padding-top:10px">${esc(CONCEPT_NOTE)} Created by Ana Laura Nascimento Silva, 2026.</p></article>`; };
  $("#libList").onclick = e=>{ const b=e.target.closest("[data-id]"); if(b) render(b.dataset.id); };
  $("#libCopy").onclick = ()=>copyText(assetMd(ASSETS.find(x=>x.id===st.id)));
  $("#libMd").onclick = ()=>{ const a=ASSETS.find(x=>x.id===st.id); download(a.id+"-concept.md", assetMd(a), "text/markdown"); };
  $("#libPrint").onclick = ()=>printWith("print-doc");
  render(st.id);
}

/* ---------- Messaging Experiment Lab ---------- */
let expData;
function initExperiment(){
  expData = store.get("expData", []);
  const v = (x,k) => `<div class="doc"><div class="kicker">${esc(x.label)}</div><p style="font-size:16px;font-weight:600;margin:8px 0">${esc(x.headline)}</p><p class="small" style="margin:0">${esc(x.body)}</p><p class="tiny dim" style="margin:10px 0 0">Stimulus ${k}. Same proof point in both; only the framing differs. Source: ${srcLink("VR",true)}</p></div>`;
  $("#experiment-body").innerHTML = `
    <div class="callout amber"><b>No results are simulated.</b> This lab is a study design and an analysis tool. The dashboard stays empty until real responses are imported or entered. No participants have been recruited for this project yet.</div>
    <div class="section-h"><h3>Stimuli</h3><span class="meta">Between-subjects: each participant sees one variant</span></div>
    <div class="grid g2">${v(EXP.variantA,"A")}${v(EXP.variantB,"B")}</div>
    <div class="section grid g2">
      <div><div class="section-h"><h3>Methodology</h3>${ev("pv","pre-registration draft")}</div>
        <div class="detail"><dl><dt>Hypothesis</dt><dd class="small">${esc(EXP.hypothesis)}</dd><dt>Population</dt><dd class="small">${esc(EXP.population)}</dd><dt>Recruitment</dt><dd class="small">${esc(EXP.recruitment)}</dd><dt>Random assignment</dt><dd class="small">${esc(EXP.assignment)}</dd><dt>Analysis plan</dt><dd class="small">${tip("Welch t-test")} on each measure (B minus A), ${tip("95% CI")} for the difference, ${tip("Cohen's d")} as effect size, and ${tip("Holm correction")} across the seven measures. Primary outcome: perceived business value. Report all measures, including non-significant ones.</dd></dl></div></div>
      <div><div class="section-h"><h3>Survey measures</h3><span class="meta">${tip("Likert","7-point scales")}</span></div>
        <div class="tbl-wrap"><table><thead><tr><th>Measure</th><th>Item wording</th></tr></thead><tbody>${EXP.questions.map(q=>`<tr><td class="small"><b>${esc(q[1])}</b><div class="tiny mono dim">${esc(q[0])}</div></td><td class="small">${esc(q[2])}</td></tr>`).join("")}</tbody></table></div></div>
    </div>
    <div class="section grid g2">
      <div><div class="section-h"><h3>Biases and threats to validity</h3></div><ul class="clean small">${EXP.biases.map(b=>`<li style="margin:5px 0">${esc(b)}</li>`).join("")}</ul></div>
      <div><div class="section-h"><h3>Sample size</h3></div><p class="small muted">${esc(EXP.limits)}</p>
        <div class="row" style="align-items:flex-end"><div class="field" style="margin:0;width:120px"><label class="fl" for="pwD">Effect size d</label><input type="number" id="pwD" value="0.5" min="0.05" max="3" step="0.05"></div><div class="field" style="margin:0;width:100px"><label class="fl" for="pwA">α</label><input type="number" id="pwA" value="0.05" min="0.001" max="0.2" step="0.005"></div><div class="field" style="margin:0;width:100px"><label class="fl" for="pwP">Power</label><input type="number" id="pwP" value="0.8" min="0.5" max="0.99" step="0.05"></div><div class="res" style="border:1px solid var(--line);min-width:180px"><div class="k">Needed per variant</div><div class="v" id="pwN">n/a</div></div></div>
        <p class="tiny dim" style="margin-top:6px">Normal approximation for a two-sided, two-sample comparison: n = 2(z₁₋α/₂ + z₁₋β)² ÷ d². Add 10 to 20% for exclusions.</p></div>
    </div>
    <div class="section"><div class="section-h"><h3>Results dashboard</h3><span class="meta" id="expMeta"></span></div>
      <div class="btn-row no-print" style="margin-bottom:12px">
        <label class="btn primary" for="expImport" tabindex="0" id="expImportLbl">${icon("upload")}Import responses (CSV)</label><input type="file" id="expImport" accept=".csv,text/csv" class="sr-only">
        <button class="btn" id="expAdd">${icon("plus")}Enter a response</button>
        <button class="btn" id="expTemplate">${icon("download")}CSV template</button>
        <button class="btn" id="expExport">${icon("download")}Export data</button>
        <button class="btn ghost danger" id="expClear">${icon("trash-2")}Clear data</button>
      </div>
      <div id="expDash"></div>
    </div>
    ${analystNote("experiment","Before seeing data: what result do you expect, and what would make you change the recommended message?")}`;
  const pw = ()=>{ const d=+$("#pwD").value, a=+$("#pwA").value, p=+$("#pwP").value; const ok = d>0 && a>0 && a<0.5 && p>0.5 && p<1; $("#pwN").textContent = ok ? String(Stat.nPerGroup(d,a,p)) : "check inputs"; };
  ["#pwD","#pwA","#pwP"].forEach(s=>$(s).addEventListener("input",pw)); pw();
  $("#expTemplate").onclick = ()=>download("message-test-template.csv", EXP_FIELDS.join(",")+"\r\n", "text/csv");
  $("#expExport").onclick = ()=>{ if(!expData.length){ toast("No responses to export"); return; } download("message-test-responses.csv", toCsvRows(EXP_FIELDS, expData), "text/csv"); };
  $("#expClear").onclick = ()=>{ if(!expData.length){ toast("No responses to clear"); return; } confirmModal("Clear all responses?", `${expData.length} response(s) stored in this browser will be deleted.`, "Clear data", ()=>{ expData=[]; renderExp(); toast("Responses cleared"); }); };
  $("#expImport").addEventListener("change", e=>readCsvFile(e.target, importExpRows));
  $("#expImportLbl").addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); $("#expImport").click(); } });
  $("#expAdd").onclick = addExpResponse;
  renderExp();
}
function validExpRow(o){ const errs=[]; o.variant=String(o.variant||"").trim().toUpperCase(); if(!["A","B"].includes(o.variant)) errs.push("variant must be A or B");
  EXP_MEASURES.forEach(k=>{ const raw=String(o[k]??"").trim(); if(raw===""){ o[k]=null; return; } const v=Number(raw); if(!Number.isInteger(v)||v<1||v>7) errs.push(`${k} must be 1 to 7`); else o[k]=v; });
  if(EXP_MEASURES.every(k=>o[k]===null)) errs.push("no measures"); o.role_group = o.role_group ? String(o.role_group).trim() : ""; return errs; }
function importExpRows(rows){
  if(rows.length<2){ infoModal("Import failed","The file has no data rows. Download the CSV template for the expected columns."); return; }
  const head=rows[0].map(h=>h.trim().toLowerCase()); if(head.indexOf("variant")<0){ infoModal("Import failed", `Required column missing: variant. Expected header: <code class="mono small">${esc(EXP_FIELDS.join(","))}</code>`); return; }
  const good=[], bad=[];
  rows.slice(1).forEach((r,i)=>{ const o={}; EXP_FIELDS.forEach(f=>{ const j=head.indexOf(f); o[f]= j>=0 ? unguard(r[j]) : ""; }); if(!o.participant_id) o.participant_id="p"+(expData.length+i+1); const errs=validExpRow(o); errs.length?bad.push(`Row ${i+2}: ${errs.join(", ")}`):good.push(o); });
  openModal(`<h3 id="modalTitle">Import ${good.length} response(s)?</h3><p class="muted small">${good.length} valid, ${bad.length} skipped. Scores must be whole numbers from 1 to 7; blanks are treated as missing.</p>${bad.length?`<div class="callout amber small" style="max-height:160px;overflow:auto">${bad.slice(0,50).map(esc).join("<br>")}</div>`:""}<div class="btn-row" style="justify-content:flex-end"><button class="btn" data-x>Cancel</button><button class="btn" data-append ${good.length?"":"disabled"}>Append</button><button class="btn primary" data-replace ${good.length?"":"disabled"}>Replace</button></div>`, m=>{
    m.querySelector("[data-x]").onclick=closeModal;
    m.querySelector("[data-append]").onclick=()=>{ expData=expData.concat(good); closeModal(); renderExp(); toast(`Imported ${good.length} response(s)`); };
    m.querySelector("[data-replace]").onclick=()=>{ expData=good; closeModal(); renderExp(); toast(`Loaded ${good.length} response(s)`); };
  });
}
function addExpResponse(){
  openModal(`<h3 id="modalTitle">Enter a response</h3><p class="small muted">Enter one real participant's answers. Leave a measure blank if it was not answered.</p>
    <div class="grid g3" style="gap:0 12px"><div class="field"><label class="fl" for="x-id">Participant ID</label><input type="text" id="x-id" value="p${expData.length+1}"></div><div class="field"><label class="fl" for="x-variant">Variant</label><select id="x-variant"><option>A</option><option>B</option></select></div><div class="field"><label class="fl" for="x-role">Role group</label><select id="x-role"><option value="business">business</option><option value="technical">technical</option></select></div>
    ${EXP.questions.map(q=>`<div class="field"><label class="fl" for="x-${q[0]}">${esc(q[1])} (1 to 7)</label><input type="number" id="x-${q[0]}" min="1" max="7" step="1"></div>`).join("")}</div>
    <div class="err" id="x-err" role="alert"></div><div class="btn-row" style="justify-content:flex-end;margin-top:10px"><button class="btn" data-x>Cancel</button><button class="btn primary" data-save>Add response</button></div>`, m=>{
    m.querySelector("[data-x]").onclick=closeModal;
    m.querySelector("[data-save]").onclick=()=>{ const o={participant_id:$("#x-id").value.trim()||("p"+(expData.length+1)), variant:$("#x-variant").value, role_group:$("#x-role").value}; EXP_MEASURES.forEach(k=>o[k]=$("#x-"+k).value); const errs=validExpRow(o); if(errs.length){ $("#x-err").textContent=errs.join("; "); $("#x-err").classList.add("show"); return; } expData.push(o); closeModal(); renderExp(); toast("Response added"); };
  });
}
function renderExp(){
  store.set("expData", expData);
  const A=expData.filter(r=>r.variant==="A"), B=expData.filter(r=>r.variant==="B");
  $("#expMeta").textContent = `${expData.length} response(s): A ${A.length}, B ${B.length}`;
  if(!expData.length){ Object.keys(charts).filter(k=>k.startsWith("chExp")).forEach(k=>{ charts[k].destroy(); delete charts[k]; });
    $("#expDash").innerHTML = `<div class="empty" style="border:1px dashed var(--line-2)"><b style="color:var(--text)">Ready for data.</b><br>No responses yet. Import a CSV with the columns ${EXP_FIELDS.map(f=>`<code class="mono">${f}</code>`).join(", ")}, or enter responses one by one.<br>Means, differences, confidence intervals and significance tests appear here once each variant has at least two responses.</div>`; return; }
  const res = EXP.questions.map(q=>{ const k=q[0]; const a=A.map(r=>r[k]).filter(v=>v!==null&&v!==""), b=B.map(r=>r[k]).filter(v=>v!==null&&v!==""); const w=Stat.welch(a,b); return {k, n:q[1], a, b, ma:a.length?Stat.mean(a):null, mb:b.length?Stat.mean(b):null, sa:Stat.sd(a), sb:Stat.sd(b), w}; });
  const holm = Stat.holm(res.map(r=>r.w&&r.w.p!==null?r.w.p:null));
  const small = A.length<20||B.length<20;
  const fmtP = p => p===null||p===undefined ? "n/a" : p<0.001 ? "<0.001" : p.toFixed(3);
  $("#expDash").innerHTML = `${small?`<div class="callout amber small"><b>Exploratory sample.</b> Fewer than 20 responses in at least one variant. Report results as exploratory; confidence intervals will be wide.</div>`:""}
    <div class="tbl-wrap"><table><thead><tr><th>Measure</th><th class="num">n A</th><th class="num">Mean A (SD)</th><th class="num">n B</th><th class="num">Mean B (SD)</th><th class="num">Diff B − A</th><th class="num">% diff</th><th class="num">95% CI</th><th class="num">t (df)</th><th class="num">p</th><th class="num">Holm p</th><th class="num">d</th></tr></thead><tbody>${res.map((r,i)=>`<tr><td class="small"><b>${esc(r.n)}</b></td><td class="num">${r.a.length}</td><td class="num">${r.ma===null?"n/a":r.ma.toFixed(2)} (${r.sa===null?"n/a":r.sa.toFixed(2)})</td><td class="num">${r.b.length}</td><td class="num">${r.mb===null?"n/a":r.mb.toFixed(2)} (${r.sb===null?"n/a":r.sb.toFixed(2)})</td>
      <td class="num">${r.ma!==null&&r.mb!==null?(r.mb-r.ma>=0?"+":"")+(r.mb-r.ma).toFixed(2):"n/a"}</td><td class="num">${r.ma?((r.mb-r.ma)/r.ma*100).toFixed(1)+"%":"n/a"}</td><td class="num">${r.w?`[${r.w.lo.toFixed(2)}, ${r.w.hi.toFixed(2)}]`:"n/a"}</td><td class="num">${r.w&&r.w.t!==null?`${r.w.t.toFixed(2)} (${r.w.df.toFixed(1)})`:"n/a"}</td><td class="num">${fmtP(r.w&&r.w.p)}</td><td class="num">${holm[i]!==null&&holm[i]<0.05?`<b style="color:var(--accent-2)">${fmtP(holm[i])}</b>`:fmtP(holm[i])}</td><td class="num">${r.w&&r.w.d!==null?r.w.d.toFixed(2):"n/a"}</td></tr>`).join("")}</tbody></table></div>
    <p class="tiny dim" style="margin-top:6px">Welch two-sample t-test, two-sided. Holm-adjusted p below 0.05 is highlighted. Statistical significance is not practical importance; read the confidence interval and d together.</p>
    <div class="grid g2" style="margin-top:16px">
      <div><div class="section-h"><h3>Where does B differ from A?</h3><span class="meta">Difference with 95% CI</span></div><div class="chart-box"><canvas id="chExpDiff" role="img" aria-label="Mean difference with confidence intervals by measure"></canvas></div></div>
      <div><div class="section-h"><h3>How are scores distributed?</h3><select id="expDistK" aria-label="Measure for distribution" style="width:auto">${opts(EXP.questions.map(q=>[q[0],q[1]]), store.get("expDistK","value"))}</select></div><div class="chart-box"><canvas id="chExpDist" role="img" aria-label="Score distribution by variant"></canvas></div></div>
    </div>`;
  const ok = res.filter(r=>r.w);
  chart("chExpDiff",{type:"bar",data:{labels:ok.map(r=>r.n),datasets:[{label:"95% CI",data:ok.map(r=>[r.w.lo,r.w.hi]),backgroundColor:ok.map(r=>r.w.lo>0?C.green2:r.w.hi<0?"rgba(224,104,95,.3)":"rgba(161,166,159,.25)"),borderColor:ok.map(r=>r.w.lo>0?C.green:r.w.hi<0?C.red:C.dim),borderWidth:1,barPercentage:.5}]},
    options:{indexAxis:"y",plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>{ const r=ok[c.dataIndex]; return `Diff ${r.w.diff.toFixed(2)} [${r.w.lo.toFixed(2)}, ${r.w.hi.toFixed(2)}]`; }}}},scales:{x:{title:{display:true,text:"B minus A (scale points)"}},y:{grid:{display:false}}}},
    plugins:[{id:"zero",afterDatasetsDraw(ch){ const {ctx,chartArea:a,scales:{x}}=ch; const z=x.getPixelForValue(0); ctx.save(); ctx.strokeStyle="#A1A69F"; ctx.beginPath(); ctx.moveTo(z,a.top); ctx.lineTo(z,a.bottom); ctx.stroke(); const meta=ch.getDatasetMeta(0); ctx.fillStyle="#F2F3F0"; meta.data.forEach((el,i)=>{ const px=x.getPixelForValue(ok[i].w.diff); ctx.fillRect(px-1.5, el.y-7, 3, 14); }); ctx.restore(); }}]});
  const drawDist = k=>{ store.set("expDistK",k); const cnt = arr=>[1,2,3,4,5,6,7].map(s=>{ const v=arr.map(r=>r[k]).filter(x=>x!==null&&x!==""); return v.length? +(v.filter(x=>+x===s).length/v.length*100).toFixed(1) : 0; });
    chart("chExpDist",{type:"bar",data:{labels:["1","2","3","4","5","6","7"],datasets:[{label:`A (n=${A.filter(r=>r[k]!==null&&r[k]!=="").length})`,data:cnt(A),backgroundColor:C.gray},{label:`B (n=${B.filter(r=>r[k]!==null&&r[k]!=="").length})`,data:cnt(B),backgroundColor:C.green}]},options:{plugins:{legend:{position:"bottom",align:"start"},tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${c.raw}%`}}},scales:{y:{beginAtZero:true,ticks:{callback:v=>v+"%"}},x:{title:{display:true,text:"Score (1 to 7)"},grid:{display:false}}}}}); };
  $("#expDistK").onchange = e=>drawDist(e.target.value); drawDist($("#expDistK").value);
}

/* ---------- AI Workflow (upgraded) ---------- */
let aiLog;
const LABELS = [["AI-assisted","Drafted with a generative AI tool"],["Rule-based","Produced by deterministic rules in this app"],["Human analysis","Written or decided by a person"],["Verified","Checked against the cited source page"],["Unsupported","No basis found; not for external use"]];
const labTag = l => `<span class="tag ${l==="Verified"?"green":l==="Unsupported"?"red":l==="AI-assisted"?"violet":l==="Human analysis"?"blue":""}">${esc(l)}</span>`;
function initWorkflow(){
  aiLog = store.get("aiLog", null) || AI_LOG_DEFAULT.map((r,i)=>({id:"l"+i, ...r}));
  const cv = store.get("claimEdits", {});
  $("#workflow-body").innerHTML = `
    <div class="callout"><b>What is automated here, and what is not.</b> The in-app demonstration uses deterministic rules (pattern matching and a feature-to-benefit dictionary). No AI model or API is connected. The case study below was drafted with Claude outside the app and is labeled AI-assisted.</div>
    <div class="legend-ev">${LABELS.map(l=>`<span class="row" style="gap:6px">${labTag(l[0])}<span class="tiny dim">${esc(l[1])}</span></span>`).join("")}</div>
    <div class="pipeline" id="pipeline" aria-label="Workflow steps"></div>
    <div class="section"><div class="section-h"><h3>Run the rule-based demonstration</h3><span class="meta">Steps 2 to 7 are rule-based; step 8 needs a named reviewer</span></div>
      <div class="grid g2">
        <div><div class="card-h" style="margin-bottom:6px"><label class="fl" for="wfInput" style="margin:0">Source text</label><div class="btn-row"><button class="btn sm" id="wfSample">Load sample</button><button class="btn sm ghost" id="wfClear">Clear</button></div></div>
          <textarea id="wfInput" style="min-height:220px" placeholder="Paste a product datasheet, technical blog excerpt or specification table."></textarea>
          <div class="field" style="margin-top:10px"><label class="fl" for="wfAud">Target audience for adaptation</label><select id="wfAud"></select></div>
          <div class="btn-row"><button class="btn primary" id="wfRun">${icon("play")}Run demonstration</button><span class="small muted" id="wfStatus" role="status"></span></div></div>
        <div><div class="section-h" style="margin-bottom:8px"><h3>Step 8: Human review</h3><span class="tag amber">Required before publishing</span></div><div id="wfApproval"></div></div>
      </div>
      <div class="grid g3" style="margin-top:14px" id="wfOutputs"></div>
    </div>
    <div class="section"><div class="section-h"><h3>Case study: from a Vera Rubin source page to five pieces of messaging</h3>${labTag("AI-assisted")}</div>
      <p class="small muted" style="max-width:var(--measure)">${esc(CASE.note)} Sources: ${CASE.sources.map(id=>srcLink(id)).join("; ")}.</p>
      <div class="grid g2">${CASE.outputs.map((o,i)=>`<div class="doc" style="padding:16px 18px"><div class="card-h" style="margin-bottom:6px"><h3>${esc(o[0])}</h3><div class="row">${labTag(o[1])} ${ev("pv","human review")}<button class="btn sm" data-case="${i}" aria-label="Copy ${esc(o[0])}">${icon("copy")}</button></div></div><p class="small" style="white-space:pre-wrap;margin:0">${esc(o[2])}</p></div>`).join("")}</div>
    </div>
    <div class="section"><div class="section-h"><h3>Claim verification table</h3><span class="meta">Human corrections and final wording are editable and saved locally</span></div>
      <div class="tbl-wrap"><table id="claimTbl"><thead><tr><th style="min-width:200px">Original claim</th><th>Source</th><th style="min-width:150px">AI interpretation</th><th style="min-width:170px">Proposed message</th><th>Status</th><th style="min-width:180px">Potential inaccuracies</th><th style="min-width:170px">Human corrections</th><th style="min-width:200px">Final wording</th></tr></thead><tbody>${CASE.claims.map((c,i)=>{ const e=cv[i]||{}; const st=/Unsupported|Unresolved|Needs/i.test(c.st)?"Unsupported":"Verified"; return `<tr><td class="small">${esc(c.o)}</td><td class="small">${cite(c.src)}</td><td class="small">${esc(c.ai)} ${labTag("AI-assisted")}</td><td class="small">${esc(c.prop)}</td><td class="small">${labTag(st)}<div class="tiny dim" style="margin-top:4px">${esc(c.st)}</div></td><td class="small muted">${esc(c.risk)}</td><td><textarea data-ci="${i}" data-f="fix" aria-label="Human corrections for claim ${i+1}" placeholder="Pending human review">${esc(e.fix||"")}</textarea></td><td><textarea data-ci="${i}" data-f="fin" aria-label="Final wording for claim ${i+1}">${esc(e.fin!==undefined?e.fin:c.fin)}</textarea></td></tr>`; }).join("")}</tbody></table></div>
      <div class="btn-row no-print" style="margin-top:8px"><button class="btn sm" id="claimMd">${icon("download")}Export claim table (.md)</button><button class="btn sm ghost" id="claimReset">${icon("rotate-ccw")}Reset edits</button></div>
    </div>
    <div class="section"><div class="section-h"><h3>AI activity log</h3><span class="meta">For logging your own ChatGPT or Claude use</span></div>
      <p class="small muted" style="max-width:var(--measure)">The first entries record what Claude did while building this version, so the trail is complete. Add your own entries for any AI use in your research or writing, including what you checked and what you changed.</p>
      <div class="btn-row no-print" style="margin-bottom:8px"><button class="btn sm primary" id="logAdd">${icon("plus")}Add entry</button><button class="btn sm" id="logCsv">${icon("download")}Export CSV</button><label class="btn sm" for="logImport" tabindex="0" id="logImportLbl">${icon("upload")}Import CSV</label><input type="file" id="logImport" accept=".csv,text/csv" class="sr-only"></div>
      <div class="tbl-wrap"><table id="logTbl"></table></div>
    </div>
    <div class="section"><div class="section-h"><h3>Reusable prompt library</h3><span class="meta">Edit the variables, then copy into ChatGPT or Claude</span></div>
      <div class="filters"><div class="field"><label class="fl" for="plProduct">{product}</label><input type="text" id="plProduct" value="NVIDIA Vera Rubin NVL72"></div><div class="field"><label class="fl" for="plAudience">{audience}</label><input type="text" id="plAudience" value="enterprise CFO"></div><div class="field"><label class="fl" for="plIndustry">{industry}</label><input type="text" id="plIndustry" value="financial services"></div></div>
      <div class="grid g2" id="promptLib"></div>
    </div>`;
  initWorkflowDemo();
  $("#workflow-body").addEventListener("click", e=>{ const b=e.target.closest("[data-case]"); if(b) copyText(CASE.outputs[+b.dataset.case][2]); });
  $("#claimTbl").addEventListener("input", e=>{ const t=e.target; if(t.dataset.ci===undefined) return; const all=store.get("claimEdits",{}); all[t.dataset.ci]=all[t.dataset.ci]||{}; all[t.dataset.ci][t.dataset.f]=t.value; store.set("claimEdits",all); });
  $("#claimReset").onclick = ()=>confirmModal("Reset claim edits?","Human corrections and final wording return to their drafted values.","Reset",()=>{ store.del("claimEdits"); inited.delete("workflow"); initWorkflow(); inited.add("workflow"); toast("Claim edits reset"); }, false);
  $("#claimMd").onclick = ()=>{ const all=store.get("claimEdits",{}); download("claim-verification.md", `# Claim verification: Vera Rubin case study\n_AI-assisted draft; human review pending unless corrections are recorded._\n\n| Original claim | Source | AI interpretation | Status | Potential inaccuracies | Human corrections | Final wording |\n|---|---|---|---|---|---|---|\n`+CASE.claims.map((c,i)=>{ const e=all[i]||{}; const cl=s=>String(s||"").replace(/\|/g,"/").replace(/\n/g," "); return `| ${cl(c.o)} | ${c.src} | ${cl(c.ai)} | ${cl(c.st)} | ${cl(c.risk)} | ${cl(e.fix||"Pending")} | ${cl(e.fin!==undefined?e.fin:c.fin)} |`; }).join("\n")+"\n", "text/markdown"); };
  renderLog();
  $("#logAdd").onclick = ()=>editLog(null);
  $("#logCsv").onclick = ()=>download("ai-activity-log.csv", toCsvRows(["date","tool","task","input","output","verify","edits","by"], aiLog), "text/csv");
  $("#logImport").addEventListener("change", e=>readCsvFile(e.target, rows=>{ if(rows.length<2){ infoModal("Import failed","No data rows found."); return; } const head=rows[0].map(h=>h.trim().toLowerCase()); const F=["date","tool","task","input","output","verify","edits","by"]; if(head.indexOf("task")<0){ infoModal("Import failed","Required column missing: task."); return; } const add=rows.slice(1).map((r,i)=>{ const o={id:"li"+Date.now().toString(36)+i}; F.forEach(f=>{ const j=head.indexOf(f); o[f]=j>=0?unguard(r[j]):""; }); return o; }).filter(o=>o.task); aiLog=aiLog.concat(add); renderLog(); toast(`Imported ${add.length} entr${add.length===1?"y":"ies"}`); }));
  $("#logImportLbl").addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); $("#logImport").click(); } });
}
function renderLog(){
  store.set("aiLog", aiLog);
  $("#logTbl").innerHTML = `<thead><tr><th>Date</th><th>Tool</th><th>Task</th><th>Output</th><th>Verification</th><th>Human edits</th><th>Logged by</th><th class="no-print">Actions</th></tr></thead><tbody>${aiLog.length?aiLog.map(r=>`<tr><td class="mono small" style="white-space:nowrap">${esc(r.date)}</td><td class="small">${esc(r.tool)}</td><td class="small">${esc(r.task)}<div class="tiny dim">${esc(r.input)}</div></td><td class="small">${esc(r.output)}</td><td class="small">${esc(r.verify)}</td><td class="small">${esc(r.edits)||'<span class="dim">none recorded</span>'}</td><td class="tiny dim">${esc(r.by)}</td><td class="no-print" style="white-space:nowrap"><button class="btn sm" data-le="${esc(r.id)}" aria-label="Edit log entry">${icon("pencil")}</button> <button class="btn sm danger" data-ld="${esc(r.id)}" aria-label="Delete log entry">${icon("trash-2")}</button></td></tr>`).join(""):`<tr><td colspan="8" class="empty">No entries. Add one each time you use an AI tool for this project.</td></tr>`}</tbody>`;
  $("#logTbl").onclick = e=>{ const ed=e.target.closest("[data-le]"); if(ed){ editLog(aiLog.find(r=>r.id===ed.dataset.le)); return; } const d=e.target.closest("[data-ld]"); if(d) confirmModal("Delete this log entry?","The entry is removed from this browser.","Delete",()=>{ aiLog=aiLog.filter(r=>r.id!==d.dataset.ld); renderLog(); }); };
}
function editLog(r){
  const d = r || {id:"lu"+Date.now().toString(36), date:new Date().toISOString().slice(0,10), tool:"ChatGPT", task:"", input:"", output:"", verify:"", edits:"", by:"Ana Laura Nascimento Silva"};
  const F=[["date","Date"],["tool","Tool"],["task","Task"],["input","Input (what you gave the tool)"],["output","Output (what it produced)"],["verify","Verification performed"],["edits","Human edits"],["by","Logged by"]];
  openModal(`<h3 id="modalTitle">${r?"Edit":"Add"} log entry</h3><div class="grid g2" style="gap:0 12px">${F.map(([k,l])=>`<div class="field ${["task","input","output","verify","edits"].includes(k)?"full":""}"><label class="fl" for="lg-${k}">${esc(l)}</label>${["input","output","verify","edits"].includes(k)?`<textarea id="lg-${k}" style="min-height:54px">${esc(d[k])}</textarea>`:`<input type="text" id="lg-${k}" value="${esc(d[k])}">`}</div>`).join("")}</div><div class="err" id="lg-err" role="alert"></div><div class="btn-row" style="justify-content:flex-end;margin-top:10px"><button class="btn" data-x>Cancel</button><button class="btn primary" data-save>Save</button></div>`, m=>{
    m.querySelector("[data-x]").onclick=closeModal;
    m.querySelector("[data-save]").onclick=()=>{ const o={...d}; F.forEach(([k])=>o[k]=$("#lg-"+k).value.trim()); if(!o.task){ $("#lg-err").textContent="Task is required."; $("#lg-err").classList.add("show"); return; } aiLog = r ? aiLog.map(x=>x.id===o.id?o:x) : aiLog.concat(o); closeModal(); renderLog(); toast("Log saved"); };
  });
}
let wf;
function initWorkflowDemo(){
  wf = store.get("wf", {input:"", aud:"CFO", outputs:null, approved:null, done:0});
  $("#wfInput").value = wf.input; $("#wfAud").innerHTML = opts(MSG_AUD, wf.aud);
  $("#wfInput").addEventListener("input", ()=>{ wf.input=$("#wfInput").value; store.set("wf",wf); });
  $("#wfAud").addEventListener("change", ()=>{ wf.aud=$("#wfAud").value; store.set("wf",wf); });
  $("#wfSample").onclick = ()=>{ $("#wfInput").value=WF_SAMPLE; wf.input=WF_SAMPLE; store.set("wf",wf); };
  $("#wfClear").onclick = ()=>{ $("#wfInput").value=""; wf={...wf, input:"", outputs:null, approved:null, done:0}; store.set("wf",wf); renderPipeline(); renderWfOutputs(); renderApproval(); };
  $("#wfRun").onclick = runWorkflow;
  renderPipeline(); renderWfOutputs(); renderApproval();
  ["plProduct","plAudience","plIndustry"].forEach(id=>$("#"+id).addEventListener("input", renderPrompts));
  renderPrompts();
}
function renderPipeline(running=-1){
  $("#pipeline").innerHTML = WF_STEPS.map((s,i)=>{ const done = i < wf.done; const st = i===running ? "run" : done ? "done" : ""; return `<div class="step ${st} ${s.human?"human":""}" aria-label="Step ${i+1}: ${esc(s.n)} ${done?"complete":i===running?"running":"pending"}"><div class="n">STEP ${i+1} · ${esc(s.lab.toUpperCase())}</div><b>${esc(s.n)}</b><div class="st">${i===running?"Running…":done?"✓ "+esc(s.d):s.human?"Awaiting reviewer":"Pending"}</div></div>`; }).join("");
}
function extract(text, aud){
  const sentences = text.replace(/\s+/g," ").split(/(?<=[.!?])\s+(?=[A-Z\[])/).map(s=>s.trim()).filter(s=>s.length>3 && !/^\[.*\]$/.test(s));
  const claims = sentences.filter(s=>/\d/.test(s));
  const feats = FEATURE_MAP.filter(f=>f.k.test(text));
  const superl = /\b(best|most advanced|leading|fastest|unmatched|revolutionary|world'?s|industry[- ]first|unprecedented|every)\b/i;
  const compar = /(\d+(\.\d+)?\s*[x×]\b|\bup to\b|compared (with|to)|\bvs\.?\b|\bversus\b|faster|more performance|lower cost)/i;
  const baseline = /(compared (with|to)|vs\.?|versus)\s+[A-Z0-9]/i;
  const unsupported = [];
  sentences.forEach(s=>{
    if(superl.test(s)) unsupported.push({s, why:"Superlative or absolute claim without a cited source"});
    else if(compar.test(s) && !/\[\d+\]|footnote|\*|†/.test(s)) unsupported.push({s, why: baseline.test(s) ? "Comparative claim: baseline named, but workload, configuration and footnote are missing" : "Comparative claim without a stated baseline"});
  });
  const audCount = {}; feats.forEach(f=>f.a.forEach(a=>audCount[a]=(audCount[a]||0)+1));
  const audiences = Object.entries(audCount).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  const R = ROLE_RULES[aud];
  const topBen = feats.slice(0,3).map(f=>f.b);
  const msg = feats.length ? `Headline: ${topBen[0] || "Measurable value from AI infrastructure"}\n\nFor a ${aud}, the story is about ${R.lens}. ${topBen.map(b=>"• "+b).join("\n")}\n\nProof: use only the verified specifications listed under Technical claims, each with its source.\nCTA: ${aud==="CFO"||aud==="Procurement Executive"?"Model your TCO with your own assumptions":"Request a workload-specific evaluation"}` : "No recognizable features found. Add product documentation with specifications.";
  const checklist = [
    ...claims.slice(0,8).map(c=>`[ ] Verify against source: "${c.length>110?c.slice(0,107)+"…":c}"`),
    ...unsupported.map(u=>`[ ] Resolve: ${u.why}`),
    "[ ] Confirm every number matches the source exactly (units, sparse vs. dense, per chip vs. per rack)",
    "[ ] Confirm product names and trademarks",
    "[ ] Add disclaimer for projected or 'up to' performance",
    "[ ] Legal/brand sign-off recorded before publishing"
  ];
  return {
    claims: claims.length ? claims.map(c=>"• "+c).join("\n") : "No quantitative claims detected.",
    features: feats.length ? feats.map(f=>"• "+f.f).join("\n") : "No features matched the dictionary.",
    benefits: feats.length ? feats.map(f=>`• ${f.f} → ${f.b}`).join("\n") : "n/a",
    audience: audiences.length ? `Primary (selected): ${aud}\nAlso relevant based on features: ${audiences.filter(a=>a!==aud).join(", ") || "n/a"}` : `Primary (selected): ${aud}`,
    messaging: msg,
    unsupported: unsupported.length ? unsupported.map(u=>`• "${u.s}"\n   → ${u.why}`).join("\n") : "No unsupported claims detected by the rules. Human review is still required.",
    checklist: checklist.join("\n"),
    stats:{claims:claims.length, feats:feats.length, unsupported:unsupported.length}
  };
}
function runWorkflow(){
  const text = $("#wfInput").value.trim();
  if(text.length < 40){ $("#wfStatus").textContent = "Paste at least a few sentences of documentation (or load the sample)."; $("#wfInput").focus(); return; }
  wf.input = text; wf.aud = $("#wfAud").value; wf.done = 0; wf.approved = null; $("#wfRun").disabled = true;
  const out = extract(text, wf.aud);
  let i = 0;
  const tick = () => {
    if(i < 7){ renderPipeline(i); wf.done = i; i++; setTimeout(()=>{ wf.done=i; renderPipeline(); tick(); }, 260); }
    else { wf.outputs = out; wf.done = 7; store.set("wf", wf); renderPipeline(); renderWfOutputs(); renderApproval(); $("#wfRun").disabled=false; $("#wfStatus").textContent = `Done: ${out.stats.claims} claims, ${out.stats.feats} features, ${out.stats.unsupported} flagged. Awaiting human approval.`; }
  };
  tick();
}
const WF_OUT = [["claims","Technical claims"],["features","Product features"],["benefits","Potential customer benefits"],["audience","Target audience"],["messaging","Suggested messaging"],["unsupported","Unsupported claims"],["checklist","Verification checklist"]];
function renderWfOutputs(){
  if(!wf.outputs){ $("#wfOutputs").innerHTML = `<div class="full"><div class="empty">Run the demonstration to generate editable outputs. Nothing is generated until you press Run.</div></div>`; return; }
  $("#wfOutputs").innerHTML = WF_OUT.map(([k,l])=>`<div class="out-card ${k==="checklist"||k==="messaging"?"span2":""}"><div class="card-h"><h3>${l}</h3><div class="btn-row">${k==="unsupported"&&wf.outputs.stats.unsupported?`<span class="tag red">${wf.outputs.stats.unsupported} flagged</span>`:""}<button class="btn sm" data-copy="${k}" aria-label="Copy ${l}">${icon("copy")}</button></div></div><textarea data-k="${k}" aria-label="${l} (editable)">${esc(wf.outputs[k])}</textarea></div>`).join("") +
    `<div class="full"><div class="btn-row"><button class="btn" id="wfExport">${icon("download")}Export workflow package (.md)</button><span class="tiny muted">Outputs are editable; edits are saved in this browser.</span></div></div>`;
  $("#wfOutputs").oninput = e=>{ const k=e.target.dataset.k; if(k){ wf.outputs[k]=e.target.value; store.set("wf",wf); } };
  $("#wfOutputs").onclick = e=>{ const b=e.target.closest("[data-copy]"); if(b) copyText(wf.outputs[b.dataset.copy]); };
  $("#wfExport").onclick = ()=>download("ai-marketing-workflow.md", `# AI Marketing Workflow Package\n_Rule-based workflow demonstration (no AI model or API is connected). Audience: ${wf.aud}._\n\n`+WF_OUT.map(([k,l])=>`## ${l}\n\n${wf.outputs[k]}\n`).join("\n")+`\n## Human approval\n${wf.approved?`Approved by ${wf.approved.by} on ${wf.approved.at}`:"Not yet approved"}\n`, "text/markdown");
}
function renderApproval(){
  const ready = !!wf.outputs;
  const items = ["All technical claims verified against primary sources","Unsupported claims removed or substantiated","Brand, trademark and tone review complete","Disclaimers added for projected or simulated results"];
  if(wf.approved){ $("#wfApproval").innerHTML = `<div class="callout"><b>Approved</b> by ${esc(wf.approved.by)} on ${esc(wf.approved.at)}.</div><button class="btn" id="wfRevoke">${icon("rotate-ccw")}Revoke approval</button>`; $("#wfRevoke").onclick=()=>{ wf.approved=null; wf.done=Math.min(wf.done,7); store.set("wf",wf); renderPipeline(); renderApproval(); }; return; }
  $("#wfApproval").innerHTML = `<p class="small muted">${ready?"Complete every check before approving. AI-assisted output is never published without a named human reviewer.":"Run the workflow first."}</p>${items.map((t,i)=>`<label class="small" style="display:flex;gap:8px;margin:8px 0;align-items:flex-start"><input type="checkbox" class="apv" ${ready?"":"disabled"} style="margin-top:3px"> ${esc(t)}</label>`).join("")}<div class="field" style="margin-top:10px"><label class="fl" for="apvName">Reviewer name</label><input type="text" id="apvName" ${ready?"":"disabled"} maxlength="80"></div><button class="btn primary" id="apvBtn" disabled>${icon("shield-check")}Approve for publishing</button>`;
  const check = ()=>{ $("#apvBtn").disabled = !($$(".apv").every(c=>c.checked) && $("#apvName").value.trim()); };
  $("#wfApproval").oninput = check; $("#wfApproval").onchange = check;
  $("#apvBtn").onclick = ()=>{ wf.approved={by:$("#apvName").value.trim(), at:new Date().toLocaleString("en-US")}; wf.done=8; store.set("wf",wf); renderPipeline(); renderApproval(); toast("Approved by reviewer"); };
}
function renderPrompts(){
  const v = {product:$("#plProduct").value||"{product}", audience:$("#plAudience").value||"{audience}", industry:$("#plIndustry").value||"{industry}", channel:"product one-pager"};
  const fill = p => p.replace(/\{(product|audience|industry|channel)\}/g, (_,k)=>v[k]);
  $("#promptLib").innerHTML = PROMPTS.map((p,i)=>`<div class="prompt"><div class="card-h" style="margin:0"><b class="small">${i+1}. ${esc(p.t)}</b><button class="btn sm" data-p="${i}">${icon("copy")}Copy prompt</button></div><pre>${esc(fill(p.p))}</pre></div>`).join("");
  $("#promptLib").onclick = e=>{ const b=e.target.closest("[data-p]"); if(b) copyText(fill(PROMPTS[+b.dataset.p].p)); };
}


/* ---------- Methodology & Sources ---------- */
function initMethod(){
  const M = [
    ["Research question", `<p class="small">How can NVIDIA translate complex AI infrastructure capabilities into clear, measurable, audience-specific value propositions that support enterprise adoption?</p><p class="small muted">Sub-questions: What blocks enterprises from scaling AI infrastructure? How well does NVIDIA's public content address those blocks? Which product marketing actions are supported by evidence?</p>`],
    ["Evidence categories", `<table><tbody>${Object.entries(EV).map(([k,v])=>`<tr><td style="white-space:nowrap">${ev(k)}</td><td class="small muted">${esc(v.d)}</td></tr>`).join("")}</tbody></table><p class="small muted" style="margin-top:8px">Content is also labeled by type: ${Object.values(KINDS).map(esc).join(", ")}.</p>`],
    ["Secondary research", `<p class="small muted">Industry studies were read on the publisher's page (or, where marked, in a secondary compilation) on ${esc(VERIFIED_ON)}. Each statistic is stored with publisher, date, sample, method and a stated limitation. Self-selected and vendor-sponsored samples are labeled. Figures from different surveys are never combined or ranked.</p>`],
    ["Content audit", `<p class="small muted">${CA_REAL.length} public NVIDIA pages were opened and recorded field by field with verbatim excerpts. Each was scored 1 to 5 on seven anchored dimensions (see Content Audit). Overall score is the unweighted mean. Scores were drafted with AI assistance by one reviewer and are pending the author's validation; a second reviewer and an inter-rater check are planned. Three pages that could not be read were excluded rather than guessed.</p>`],
    ["Strategy and prioritization", `<p class="small muted">Findings state their evidence, confidence and limitation. Causal links are marked evidence-supported only where survey data shows the association; all others are hypotheses. Opportunity scores (customer value, strategic relevance, complexity, evidence strength, commercial impact) are the author's proposed judgements and can be edited.</p>`],
    ["Message experiment", `<p class="small muted">Between-subjects design with random assignment to a feature-focused or benefit-focused message, seven 7-point measures, Welch t-tests with Holm correction, confidence intervals and Cohen's d. The study has not been run; no results are shown or simulated.</p>`],
    ["KPI framework", `<p class="small muted">KPIs are defined by funnel stage with objective, formula, data source, frequency, linked initiative and leading or lagging type. No NVIDIA metric is estimated; targets would be set after a baseline period.</p>`],
    ["Financial simulation", `<div class="formula">IT power (kW) = GPUs × W ÷ 1,000\nEnergy (kWh) = kW × hours × PUE\nOPEX = electricity + maintenance + software\nCAPEX = acquisition + implementation\nTCO = CAPEX + OPEX × life\nNPV = −CAPEX + Σ (benefits − OPEX) ÷ (1 + r)^t\nROI = (benefits × life − TCO) ÷ TCO\nCost per productive GPU-hour = (CAPEX ÷ life + OPEX) ÷ (GPUs × hours × utilization)</div><p class="small muted" style="margin-top:8px">All simulator defaults are illustrative assumptions ${ev("il")}, not NVIDIA prices or performance.</p>`],
    ["AI use and verification", `<p class="small muted">Generative AI (Claude) assisted with code, page summaries, score drafts and message drafts; the AI Workflow section logs this. Every number in the app was checked against its source page. Values that could not be confirmed are flagged. The in-app engines are rule-based and say so; no AI API is called.</p>`],
    ["Limitations", `<ul class="clean small"><li>Public web pages only; gated, sales and event content not reviewed.</li><li>Single-reviewer audit; scores pending validation.</li><li>No primary research yet (interviews, experiment).</li><li>Several samples are self-selected or vendor-sponsored.</li><li>IEA energy data and NVIDIA's 10-K competition section not yet read.</li><li>Pages change; everything reflects ${esc(VERIFIED_ON)}.</li></ul>`],
    ["Ethics and independence", `<ul class="clean small"><li>Not affiliated with or endorsed by NVIDIA; no NVIDIA logos used.</li><li>No invented data, participants, interviews or customer feedback.</li><li>Competitors described only from their own documentation.</li><li>User data stays in the browser (localStorage).</li></ul>`]
  ];
  $("#method-body").innerHTML = `<div class="grid g2" id="methodCards">${M.map(([t,b])=>`<div class="panel"><div class="section-h"><h3>${esc(t)}</h3></div>${b}</div>`).join("")}</div>
    <div class="section"><div class="section-h"><h3>Source library</h3><span class="meta" id="srcCount"></span></div>
      <div class="filters"><div class="field" style="min-width:260px"><label class="fl" for="srcQ">Search sources</label><input type="search" id="srcQ" placeholder="Title, publisher or topic"></div><div class="field"><label class="fl" for="srcType">Source type</label><select id="srcType"></select></div><div class="field"><label class="fl" for="srcStatus">Verification</label><select id="srcStatus"><option value="all">All</option><option value="verified">Verified</option><option value="partial">Some details unverified</option></select></div>
      <button class="btn sm" id="srcCsv" style="margin-bottom:2px">${icon("download")}Export CSV</button></div>
      <div class="tbl-wrap"><table id="srcTbl"></table></div></div>
    <div class="section"><div class="section-h"><h3>Research still pending</h3></div><ul class="clean small">
      <li>Read the IEA <i>Energy and AI</i> report and add data center electricity figures with page references.</li><li>Read NVIDIA's Form 10-K (Item 1, Competition; Item 1A, Risk Factors).</li><li>Confirm the Deloitte 2026 publication and fieldwork dates and the exact Uptime average PUE.</li><li>Read the AI Factory purchasing guide, validated design and NVIDIA IT case study.</li><li>Validate audit scores and run a second-reviewer check.</li><li>Run buyer interviews and the message experiment.</li></ul></div>`;
  const types = [...new Set(SOURCES.map(s=>s.type))];
  $("#srcType").innerHTML = opts([["all","All types"],...types],"all");
  const render = () => { const q=$("#srcQ").value.trim().toLowerCase(), t=$("#srcType").value, v=$("#srcStatus").value;
    const rows = SOURCES.filter(s=>(t==="all"||s.type===t)&&(v==="all"||s.status===v)&&(!q||[s.id,s.title,s.pub,s.type,s.method].join(" ").toLowerCase().includes(q)));
    $("#srcCount").textContent = `${rows.length} of ${SOURCES.length} sources · checked ${VERIFIED_ON}`;
    $("#srcTbl").innerHTML = `<thead><tr><th>ID</th><th style="min-width:260px">Source</th><th>Publisher</th><th>Published</th><th>Type</th><th style="min-width:240px">Method, sample, notes</th><th>Status</th></tr></thead><tbody>${rows.length?rows.map(s=>`<tr id="src-${s.id}"><td class="mono tiny">${s.id}</td><td><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ${icon("external-link")}</a><div class="tiny dim" style="word-break:break-all">${esc(s.url)}</div></td><td class="small">${esc(s.pub)}</td><td class="small mono" style="white-space:nowrap">${esc(fmtDate(s.date))}</td><td class="small">${esc(s.type)}</td><td class="small muted">${esc(s.method)}</td><td>${s.status==="verified"?'<span class="tag green">Verified</span>':'<span class="tag amber">Some details unverified</span>'}</td></tr>`).join(""):`<tr><td colspan="7" class="empty">No sources match.</td></tr>`}</tbody>`; };
  ["#srcType","#srcStatus"].forEach(s=>$(s).addEventListener("change",render)); $("#srcQ").addEventListener("input",render); render();
  $("#srcCsv").onclick = ()=>download("source-library.csv", toCsvRows(["id","title","pub","date","type","url","method","status"], SOURCES), "text/csv");
}
function focusSource(id){ const row=$("#src-"+id); if(!row) return; row.scrollIntoView({block:"center"}); row.style.outline="1px solid var(--accent)"; setTimeout(()=>row.style.outline="",1800); }

/* ---------- About the Project ---------- */
function initAbout(){
  $("#about-body").innerHTML = `<div class="hero" style="grid-template-columns:minmax(0,1fr) 320px">
    <div>
      <div class="kicker">About the project</div>
      <h2 style="max-width:none">AI Infrastructure Value Navigator</h2>
      <p class="lead">An independent case study on how AI infrastructure capabilities can be translated into business value for enterprise buyers, built as a working application rather than a slide deck.</p>
      <div class="section-h" style="margin-top:22px"><h3>Objective</h3></div>
      <p class="prose">Show, with verifiable evidence, where enterprise AI infrastructure adoption stalls, how well current public messaging addresses those points, and which product marketing actions would help. Every figure links to its source; every judgement is labeled as such.</p>
      <div class="section-h" style="margin-top:22px"><h3>Competencies demonstrated</h3></div>
      <div class="grid g2" style="gap:6px 24px">${["Technical product marketing and positioning","Market research and evidence synthesis","Content auditing with an explicit rubric","Business analytics and financial modeling (TCO, NPV, ROI)","Experiment design and statistical analysis","Messaging frameworks for technical and business buyers","Data visualization and dashboard design","Responsible use of generative AI with claim verification"].map(c=>`<div class="small" style="padding:6px 0;border-bottom:1px solid var(--line)">${esc(c)}</div>`).join("")}</div>
    </div>
    <aside><dl>
      <dt>Author</dt><dd>Ana Laura Nascimento Silva</dd>
      <dt>Education</dt><dd>BBA in Marketing &amp; Business Analytics, Hult International Business School</dd>
      <dt>Project type</dt><dd>Independent Technical Product Marketing &amp; Business Analytics Case Study</dd>
      <dt>Year</dt><dd>2026</dd>
      <dt>LinkedIn</dt><dd><a href="https://www.linkedin.com/in/analauranascimento/" target="_blank" rel="noopener noreferrer">linkedin.com/in/analauranascimento</a></dd>
      <dt>Source code</dt><dd><a href="https://github.com/analaura-n-s/ai-infrastructure-value-navigator" target="_blank" rel="noopener noreferrer">github.com/analaura-n-s/ai-infrastructure-value-navigator</a></dd>
    </dl></aside></div>
    <div class="callout amber" style="margin-top:22px"><b>Independence.</b> This project is not affiliated with, sponsored by or endorsed by NVIDIA Corporation, and NVIDIA has not reviewed it. NVIDIA, Blackwell, Vera Rubin, NVLink and other marks belong to their owners. Product facts are quoted from public documentation; simulated results and concept assets are the author's own work.</div>
    <div class="section"><div class="section-h"><h3>How the app is built</h3></div><p class="small muted prose">Static HTML, CSS and JavaScript with no backend, build step or API keys, hosted on GitHub Pages. Chart.js 4.4.7 (MIT) is bundled locally; icons are Lucide (ISC). Inputs, edits and notes are stored only in this browser's localStorage and can be cleared with "Reset all data".</p></div>`;
}
