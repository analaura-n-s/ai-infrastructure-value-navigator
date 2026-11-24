/* =========================================================
   Sections: Executive Overview, Market Intelligence, Explorer,
   Value Navigator, TCO & ROI, Competitive, Messaging Studio
   ========================================================= */
const CM_NOTES = {
  "Hardware ecosystem":"Scopes differ: per chip, per rack and per pod figures are not comparable. Read as 'what the vendor sells', not 'who is faster'.",
  "Software ecosystem":"Framework support lists change often. Check the vendor's current release notes for the exact model and version you run.",
  "Workload compatibility":"'Supports training and inference' says nothing about efficiency on a given model. Ask for results on your own workload.",
  "Infrastructure integration":"Networking and storage claims use each vendor's own baselines.",
  "Deployment models":"Cloud-specific accelerators are available only through their cloud. That is a deployment fact, not a quality judgement.",
  "Developer accessibility":"Ease of entry is the author's reading of each vendor's documentation.",
  "Scalability considerations":"Maximum documented scale is not the scale most enterprises deploy.",
  "Customer evaluation criteria":"These are the author's suggested questions, not vendor statements."
};

/* ---------- 1. Executive Overview (editorial) ---------- */
function valueMapSvg(){
  const cols = [
    {x:24,  h:"What the platform provides", n:["Rack-scale GPU compute","NVLink interconnect","Networking and storage","Software stack (CUDA, NIM, Dynamo)"]},
    {x:352, h:"What changes for the customer", n:["Throughput per rack","GPU utilization","Time to deploy","Energy per token"]},
    {x:680, h:"What a buyer can take to finance", n:["Cost per million tokens","Total cost of ownership","Time to production","Capacity within the power budget"]}
  ];
  const W=256, H=46, Y0=78, GAP=70;
  const pos = (c,i)=>({x:cols[c].x, y:Y0+i*GAP});
  const links = [[0,0,1,0],[0,1,1,0],[0,2,1,1],[0,3,1,1],[0,3,1,2],[0,0,1,3],[1,0,2,0],[1,1,2,0],[1,1,2,1],[1,2,2,2],[1,3,2,3],[1,3,2,1]];
  const hot = k => (k[0]===0&&k[1]===1&&k[3]===0) || (k[0]===1&&k[1]===0&&k[3]===0);
  const path = ([c1,i1,c2,i2])=>{ const a=pos(c1,i1), b=pos(c2,i2); const sx=a.x+W, sy=a.y+H/2, tx=b.x, ty=b.y+H/2, m=(sx+tx)/2; return `M${sx},${sy} C${m},${sy} ${m},${ty} ${tx-4},${ty}`; };
  const isHotNode = (c,i)=> (c===0&&i===1)||(c===1&&i===0)||(c===2&&i===0);
  const gapX = 680-36;
  return `<svg class="vmap" viewBox="0 0 960 400" role="img" aria-labelledby="vmapT vmapD">
    <title id="vmapT">From infrastructure capability to business value</title>
    <desc id="vmapD">Three columns. Platform capabilities (rack-scale GPU compute, NVLink interconnect, networking and storage, software stack) lead to customer outcomes (throughput per rack, GPU utilization, time to deploy, energy per token), which lead to business measures a finance team uses (cost per million tokens, total cost of ownership, time to production, capacity within the power budget). The path from NVLink to throughput to cost per million tokens is highlighted. A dashed line before the third column marks where most of the audited pages stop.</desc>
    <defs><pattern id="vmapHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#2B302B" stroke-width="2"/></pattern>
      <marker id="vmArr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#5A6159"/></marker>
      <marker id="vmArrHot" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#76B900"/></marker></defs>
    <rect x="${gapX-14}" y="56" width="28" height="${GAP*3+H+44}" fill="url(#vmapHatch)"/>
    <line x1="${gapX}" y1="50" x2="${gapX}" y2="${Y0+GAP*3+H+28}" stroke="#D9A441" stroke-width="1" stroke-dasharray="3 4"/>
    <text class="gap-l" x="${gapX}" y="${Y0+GAP*3+H+46}" text-anchor="middle">Where most audited pages stop</text>
    ${cols.map(c=>`<text class="col-h" x="${c.x}" y="40">${esc(c.h)}</text>`).join("")}
    ${links.map(k=>`<path class="lk ${hot(k)?"hot":""}" d="${path(k)}" marker-end="url(#${hot(k)?"vmArrHot":"vmArr"})"/>`).join("")}
    ${cols.map((c,ci)=>c.n.map((t,i)=>{ const p=pos(ci,i); return `<g class="nd ${isHotNode(ci,i)?"hot":""} ${ci===2?"biz":""}"><rect x="${p.x}" y="${p.y}" width="${W}" height="${H}" rx="2"/><text x="${p.x+14}" y="${p.y+H/2+5}">${esc(t)}</text></g>`; }).join("")).join("")}
  </svg>`;
}

function initOverview(){
  const audN = CA_REAL.length;
  const R = realAudit(); const mean = k => avg(R.map(r=>+r[k]));
  const tech = mean("techCred").toFixed(1), biz = mean("bizValue").toFixed(1);
  const cfo = R.filter(r=>r.audience==="CFO").length;
  const WS = [
    ["Research","market","Market evidence across nine dimensions, competitor documentation and the audit of "+audN+" NVIDIA pages."],
    ["Product and strategy","strategy","Findings, a causal problem tree, prioritized opportunities, the messaging framework and six concept documents."],
    ["Tools","tco","A two-scenario TCO and ROI model, a rule-based messaging studio and an experiment lab ready for real data."],
    ["Documentation","method","Methods, all "+SOURCES.length+" sources, how AI was used and checked, and what research is still open."]
  ];
  $("#overview-body").innerHTML = `
  <article class="case">
    <header class="case-open">
      <p class="byline">A case study by <a href="#/about">Ana Laura Nascimento</a>, independent researcher and developer of this project</p>
      <h2 class="display">Most enterprises now use AI. Far fewer can show what their AI infrastructure returns.</h2>
      <p class="lede">This case study asks how NVIDIA could turn complex infrastructure capabilities into value that a CFO, a CTO and a procurement lead can each check for themselves, so that more AI work moves from pilot to production.</p>
      <div class="case-cta">
        <a class="btn primary lg" href="#/navigator">Try the Value Navigator</a>
        <a class="text-link" href="#/strategy">Read the recommendations ${icon("arrow-right")}</a>
      </div>
      <p class="status"><span class="dot" aria-hidden="true"></span><span><b>Research status.</b> Secondary research and a content audit of ${audN} public NVIDIA pages are done. The audit scores still need my validation, and the buyer interviews and message experiment are designed but not yet run. <a href="#/method">What is still open</a></span></p>
    </header>

    <figure class="case-fig">
      <div class="vmap-wrap">${valueMapSvg()}</div>
      <figcaption>The framework behind the project: each capability matters to a buyer only once it reaches the right-hand column. This is my own mapping, not an NVIDIA diagram. The highlighted path is the one NVIDIA quantifies for Vera Rubin NVL72: one-tenth the cost per million tokens of GB200 NVL72 for a stated model and context length, which is a vendor projection ${cite("VR")}. The dashed line marks where most of the audited pages stop, based on the content audit, whose scores are still pending my validation.</figcaption>
    </figure>

    <section class="case-sec" aria-labelledby="cs-problem">
      <h3 class="sec-title" id="cs-problem">The problem</h3>
      <div class="sec-body">
        <p>AI adoption is close to universal, but value is not keeping up. In McKinsey's 2026 survey, 44% of respondents say AI is scaling across their enterprise and 37% report a positive EBIT contribution ${cite("MCK26")}. For the other 63%, AI has not yet shown up as a positive contribution to EBIT.</p>
        <p>Infrastructure makes the gap expensive. It is a large, long-lived commitment, and the decision is shared between people who read specifications and people who read budgets. A message that convinces an engineer does not, on its own, give a CFO something to sign.</p>
        <p class="pull">This project calls that the <em>Enterprise AI Infrastructure Adoption Gap</em>, and asks what product marketing can do about it.</p>
      </div>
    </section>

    <section class="case-sec" aria-labelledby="cs-evidence">
      <h3 class="sec-title" id="cs-evidence">The evidence</h3>
      <div class="sec-body">
        <div class="evi">
          <div class="evi-n">37%</div>
          <div><p class="evi-h">Use is not the bottleneck. Return is.</p><p>Regular AI use reached 88% of organizations in 2025, while the share reporting a positive EBIT contribution was 39% in 2025 and 37% in 2026 ${cite("MCK25")} ${cite("MCK26")}.</p></div>
        </div>
        <div class="evi">
          <div class="evi-n">44%</div>
          <div><p class="evi-h">Buyers lack the instruments to judge value.</p><p>Deloitte reports that 71% of leaders track total inference spend but only 44% track cost per unit ${cite("DEL26")}. In a smaller, self-selected survey, a third of GPU-operating respondents said they do not measure utilization ${cite("VBP26")}.</p></div>
        </div>
        <div class="evi">
          <div class="evi-n">${tech}<span> vs </span>${biz}</div>
          <div><p class="evi-h">NVIDIA's public pages speak to engineers first.</p><p>Across the ${audN} NVIDIA pages audited for this project, technical credibility averages ${tech} out of 5 and business value ${biz}. ${cfo===0?"None is written primarily for a CFO.":cfo+" are written primarily for a CFO."} These scores are an independent assessment that I have not yet validated. <a href="#/content">See the audit</a></p></div>
        </div>
        <figure class="sec-chart">
          <div class="chart-box"><canvas id="chFunnel" role="img" aria-label="Bar chart: regular AI use 88% (2025); scaling 33% (2025) and 44% (2026); positive EBIT 39% and 37%; high performers 6% and 6%."></canvas></div>
          <figcaption>Share of McKinsey respondents at each stage. The 2026 survey reports AI use only as "nearly nine in ten", so only 2025 is plotted for that bar. Samples: n=1,993 (2025) and n=1,719 (2026). ${cite("MCK25")} ${cite("MCK26")}</figcaption>
        </figure>
        <p class="more"><a href="#/market">All evidence, with samples and limitations ${icon("arrow-right")}</a></p>
      </div>
    </section>

    <section class="case-sec" aria-labelledby="cs-approach">
      <h3 class="sec-title" id="cs-approach">My approach</h3>
      <div class="sec-body">
        <p>The project treats value as something a buyer should be able to verify, not just read. It moves from evidence to a diagnosis, then to priorities, and ends with tools that put the buyer's own numbers next to the vendor's claims.</p>
        <dl class="steps">
          <dt><a href="#/market">Map the evidence</a></dt><dd>${SOURCES.length} sources across nine adoption-gap dimensions, each logged with its sample, date and limits.</dd>
          <dt><a href="#/content">Audit the messaging</a></dt><dd>${audN} public NVIDIA pages, recorded with verbatim excerpts and scored on a seven-part rubric.</dd>
          <dt><a href="#/strategy">Set priorities</a></dt><dd>Seven opportunities, kept only where a finding supports them, with a 90-day plan and KPIs.</dd>
          <dt><a href="#/navigator">Build tools a buyer can check</a></dt><dd>A value brief by role and an open cost model, both showing their sources and assumptions.</dd>
        </dl>
        <div class="feature-tool">
          <div>
            <p class="ft-k">The central piece</p>
            <p class="ft-h">Value Navigator</p>
            <p>Choose a role, industry, workload, challenge and AI maturity. The Navigator returns a value brief with the capabilities that matter to that buyer, the metrics to evaluate, the questions to ask providers, the risks to plan for and links to the product documentation. It runs on transparent rules, not a live AI model.</p>
          </div>
          <div class="ft-a">
            <a class="btn primary" href="#/navigator">Open the Value Navigator</a>
            <a class="text-link" href="#/tco">Or start with the TCO & ROI Simulator ${icon("arrow-right")}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="case-sec author" aria-labelledby="cs-author">
      <h3 class="sec-title" id="cs-author">About the author</h3>
      <div class="sec-body">
        <p class="author-name">Ana Laura Nascimento</p>
        <p class="author-role">BBA in Marketing &amp; Business Analytics, Hult International Business School</p>
        <p>I developed this case study independently, as a portfolio project for technical product marketing. It is not affiliated with or reviewed by NVIDIA. Generative AI helped with code and drafts. How it was used, and how its output was checked, is documented in the <a href="#/workflow">AI Workflow</a>.</p>
        <p class="author-links"><a href="https://www.linkedin.com/in/analauranascimento/" target="_blank" rel="noopener noreferrer">LinkedIn ${icon("external-link")}</a><a href="https://github.com/analaura-n-s/ai-infrastructure-value-navigator" target="_blank" rel="noopener noreferrer">Source code ${icon("external-link")}</a><a href="#/about">About the project</a></p>
      </div>
    </section>

    <section class="case-sec deeper" aria-labelledby="cs-deeper">
      <h3 class="sec-title" id="cs-deeper">Go deeper</h3>
      <div class="sec-body">
        <p>Everything above is drawn from the workspace, where each number links to its source and each judgement is labeled.</p>
        <ul class="ws">${WS.map(w=>`<li><a href="#/${w[1]}">${esc(w[0])}</a><span>${esc(w[2])}</span></li>`).join("")}</ul>
        <details class="notes-d"><summary>Author notes</summary>${analystNote("overview","Your summary of the case in your own words, or what you would tell a hiring manager in two minutes.")}</details>
      </div>
    </section>
  </article>`;
  $("#overview-body").addEventListener("click", e=>{ const b=e.target.closest("[data-go]"); if(b) location.hash="#/"+b.dataset.go; });
  chart("chFunnel", {type:"bar", data:{labels:[["Regular","AI use"],["Scaling","enterprise-wide"],["Positive","EBIT impact"],["AI high","performers"]], datasets:[
      {label:"2025 survey", data:[88,33,39,6], backgroundColor:C.gray2},
      {label:"2026 survey", data:[null,44,37,6], backgroundColor:C.green}]},
    options:{layout:{padding:{top:16}}, plugins:{valueLabels:{enabled:true, fmt:v=>v+"%"}, legend:{position:"bottom", align:"start"}, tooltip:{callbacks:{label:c=> c.raw===null? `${c.dataset.label}: not reported as an exact %` : `${c.dataset.label}: ${c.raw}%`}}}, scales:{y:{beginAtZero:true,max:100,ticks:{callback:v=>v+"%"},grid:{color:"#222622"}}, x:{grid:{display:false}}}}});
}

/* ---------- 2. Market Intelligence (evidence beside interpretation) ---------- */
function initMarket(){
  const st = store.get("market2", {dim:"all", kind:"all", ev:"all", size:"scale", ind:"Financial Services"});
  $("#market-body").innerHTML = `
    <div class="callout"><b>How to read this register.</b> Each row puts a piece of evidence on the left and the author's reading of it on the right. The left side states what the source says, with its sample and limits. The right side is interpretation and is labeled as such. Survey figures come from different samples and must not be ranked against each other.</div>
    ${evLegend()}
    <div class="filters" role="group" aria-label="Evidence filters">
      <div class="field"><label class="fl" for="mkDim">Adoption-gap dimension</label><select id="mkDim">${opts([["all","All nine dimensions"],...DIMENSIONS.map(d=>[d.id,d.n])], st.dim)}</select></div>
      <div class="field"><label class="fl" for="mkKind">Content type</label><select id="mkKind">${opts([["all","All types"],...Object.entries(KINDS).filter(([k])=>k!=="rc")], st.kind)}</select></div>
      <div class="field"><label class="fl" for="mkEv">Evidence status</label><select id="mkEv">${opts([["all","All statuses"],...Object.entries(EV).map(([k,v])=>[k,v.n])], st.ev)}</select></div>
      <div class="spacer"></div><span class="small dim" id="mkCount"></span>
    </div>
    <div id="mkRegister"></div>
    <div class="section">
      <div class="section-h"><h3>Who is scaling: does company size matter?</h3>${ev("vp")}</div>
      <div class="grid g2">
        <div><div class="seg" role="group" aria-label="Metric" id="sizeSeg"><button aria-pressed="true" data-m="scale" class="g">Scaling AI enterprise-wide</button><button aria-pressed="false" data-m="agents">Scaling AI agents</button></div>
          <div class="chart-box short" style="margin-top:10px"><canvas id="chSize" role="img" aria-label="Company size segmentation"></canvas></div><p class="tiny dim" style="margin-top:8px" id="sizeNote"></p></div>
        <div><p class="chart-q" style="margin-top:0">Where is financial services on AI and infrastructure?</p><div class="chart-box short"><canvas id="chFsi" role="img" aria-label="NVIDIA State of AI in Financial Services 2026 findings"></canvas></div>
          <p class="tiny dim" style="margin-top:8px">NVIDIA, State of AI in Financial Services (Jan 22, 2026; 800+ industry professionals; fieldwork dates and sampling not stated). Vendor-sponsored and industry-specific: do not generalize. ${cite("NVFSI26")}</p></div>
      </div>
    </div>
    <div class="section grid g2">
      <div><div class="section-h"><h3>Industry segments</h3>${ev("hy")}</div><div class="filters"><div class="field"><label class="fl" for="segInd">Industry</label><select id="segInd">${opts(INDUSTRIES, st.ind)}</select></div></div><div id="segOut"></div></div>
      <div><div class="section-h"><h3>Technical vs business decision-makers</h3>${ev("hy")}</div><div class="tbl-wrap"><table id="tvbTbl"><thead><tr><th>Dimension</th><th>Technical buyer</th><th>Business buyer</th></tr></thead><tbody>${TVB.map(r=>`<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div></div>
    </div>
    <div class="section grid g2">
      <div><div class="section-h"><h3>Purchasing considerations</h3>${ev("hy","framework")}</div><ol class="clean small" style="padding-left:20px">${PURCHASE.map(p=>`<li style="margin:6px 0"><b>${esc(p.t)}.</b> <span class="muted">${esc(p.d)}</span></li>`).join("")}</ol></div>
      <div><div class="section-h"><h3>Market trends</h3>${ev("vp")}</div>${TRENDS.map(t=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)"><b class="small">${esc(t.t)}</b><div class="small muted">${esc(t.d)}</div><div class="tiny">${srcLink(t.s,true)}</div></div>`).join("")}</div>
    </div>
    <div class="section"><div class="section-h"><h3>What this could mean for NVIDIA product marketing</h3>${ev("hy")}</div>
      <div class="grid g3">${IMPLICATIONS.map(i=>`<div><span class="tag">${esc(i.tag)}</span><h3 style="margin:8px 0 4px">${esc(i.t)}</h3><p class="small muted" style="margin:0">${esc(i.d)}</p></div>`).join("")}</div></div>
    ${analystNote("market","Which dimension do you think matters most for NVIDIA, and what evidence would change your mind?")}`;
  const render = () => {
    st.dim=$("#mkDim").value; st.kind=$("#mkKind").value; st.ev=$("#mkEv").value; store.set("market2", st);
    const rows = EVIDENCE.filter(x=>(st.dim==="all"||x.dim===st.dim)&&(st.kind==="all"||x.kind===st.kind)&&(st.ev==="all"||x.ev===st.ev));
    $("#mkCount").textContent = `${rows.length} of ${EVIDENCE.length} evidence items`;
    const dims = DIMENSIONS.filter(d=>rows.some(r=>r.dim===d.id));
    $("#mkRegister").innerHTML = dims.length ? dims.map(d=>`<div class="section" style="margin-top:22px"><div class="section-h"><h3>${esc(d.n)}</h3><span class="meta">${esc(d.q)}</span></div>
      <div class="tbl-wrap"><table><thead><tr><th style="width:52%">Evidence</th><th>Interpretation</th></tr></thead><tbody>${rows.filter(r=>r.dim===d.id).map(r=>`<tr>
        <td><div style="display:flex;gap:14px"><div class="mono" style="font-size:17px;min-width:84px;color:var(--text)">${esc(r.stat)}</div><div><div>${esc(r.claim)}</div>
          <div class="tiny dim" style="margin-top:4px">${r.src?srcLink(r.src,true)+" · ":""}${esc(r.sample)}</div>
          <div class="tiny dim">Limitation: ${esc(r.lim)}</div><div class="row" style="margin-top:6px">${ev(r.ev)} ${kindTag(r.kind)}</div></div></div></td>
        <td><div class="small">${esc(r.read)}</div><div class="small muted" style="margin-top:6px"><span class="kicker" style="display:inline">NVIDIA implication</span> ${esc(r.impl)}</div><div style="margin-top:6px">${ev("hy","interpretation")}</div></td></tr>`).join("")}</tbody></table></div></div>`).join("") : `<div class="empty">No evidence matches these filters.</div>`;
  };
  ["#mkDim","#mkKind","#mkEv"].forEach(s=>$(s).addEventListener("change", render)); render();
  const drawSize = m => { st.size=m; store.set("market2",st); const d=SIZE_DATA[m];
    chart("chSize",{type:"bar",data:{labels:d.labels,datasets:[{label:m==="scale"?"Scaling AI enterprise-wide":"Scaling AI agents",data:d.vals,backgroundColor:[C.green,C.gray]}]},options:{indexAxis:"y",layout:{padding:{right:40}},plugins:{legend:{display:false},valueLabels:{enabled:true,fmt:v=>v+"%"},tooltip:{callbacks:{label:c=>c.raw+"%"}}},scales:{x:{beginAtZero:true,max:100,ticks:{callback:v=>v+"%"}},y:{grid:{display:false}}}}});
    $("#sizeNote").innerHTML = esc(d.note)+" "+cite("MCK26"); };
  segSet("#sizeSeg","m",st.size); segBind("#sizeSeg","m",drawSize); drawSize(st.size);
  chart("chFsi",{type:"bar",data:{labels:FSI_DATA.labels,datasets:[{label:"% of respondents",data:FSI_DATA.vals,backgroundColor:FSI_DATA.labels.map(l=>/infrastructure/i.test(l)?C.green:C.gray)}]},options:{indexAxis:"y",layout:{padding:{right:40}},plugins:{legend:{display:false},valueLabels:{enabled:true,fmt:v=>v+"%"},tooltip:{callbacks:{label:c=>c.raw+"% of respondents"}}},scales:{x:{beginAtZero:true,max:100,ticks:{callback:v=>v+"%"}},y:{grid:{display:false}}}}});
  const drawSeg = () => { st.ind=$("#segInd").value; store.set("market2",st); const s=SEGMENTS[st.ind];
    $("#segOut").innerHTML = `<p class="small">${s.src?ev("vp","industry data available"):ev("hy","no verified industry survey")} <span class="muted">${esc(s.evidence)}</span></p>
      <h4>Likely pain points</h4><ul class="clean small">${s.pains.map(p=>`<li>${esc(p)}</li>`).join("")}</ul>
      <h4>Typical buying group</h4><p class="small muted">${esc(s.buyers)}</p>
      <h4>Priority workloads</h4><p class="small muted">${esc(s.workloads)}</p>${s.src?`<p class="tiny">${srcLink(s.src)}</p>`:""}`; };
  $("#segInd").addEventListener("change", drawSeg); drawSeg();
}

/* ---------- Ported and restyled sections ---------- */
function initExplorer(){
  const st = store.get("explorer", {sel:"blackwell", mode:"tech"});
  $("#arch").innerHTML = LAYERS.map((l,i)=>`${i?'<div class="flow-line" aria-hidden="true"></div>':""}<div class="layer"><div class="layer-lbl">${esc(l.label)}</div><div class="layer-items">${l.items.map(id=>{const c=COMPONENTS[id]; return `<button class="node" data-c="${id}" aria-pressed="false">${icon(c.icon)}<div><b>${esc(c.name)}</b><span>${esc(c.short)}</span></div></button>`;}).join("")}</div></div>`).join("");
  const render = () => {
    store.set("explorer", st);
    $$("#arch .node").forEach(n=>n.setAttribute("aria-pressed", n.dataset.c===st.sel));
    const c = COMPONENTS[st.sel], m = st.mode;
    $("#compDetail").innerHTML = `
      <div class="card-h"><div><div class="kicker">${m==="tech"?"Technical explanation":"Business explanation"}</div><h3 style="font-size:17px;margin-top:4px">${esc(c.name)}</h3></div>${icon(c.icon,"lg")}</div>
      <dl>
        <dt>What it is</dt><dd>${esc(c.what[m])}</dd>
        <dt>How it works</dt><dd>${esc(c.how[m])}</dd>
        <dt>Why it matters</dt><dd>${esc(c.why[m])}</dd>
        <dt>Customer problem addressed</dt><dd>${esc(c.problem)}</dd>
        <dt>${m==="tech"?"Technical performance metrics":"Key facts behind the value"}</dt>
        <dd><ul class="metric-list">${c.metrics.map(x=>`<li><span>${esc(x[0])}${/claim/i.test(x[0])?' <span class="tag amber">vendor claim</span>':""}</span><b>${esc(x[1])} <span class="tiny muted" style="font-weight:400">[${esc(x[2])}]</span></b></li>`).join("")}</ul></dd>
        <dt>Potential business benefits</dt><dd><ul class="clean">${c.benefits.map(b=>`<li>${esc(b)}</li>`).join("")}</ul></dd>
        <dt>Applicable customer segments</dt><dd><div class="chips">${c.segments.map(s=>`<span class="tag">${esc(s)}</span>`).join("")}</div></dd>
        <dt>Official documentation</dt><dd>${c.docs.map(d=>`<div class="small">${icon("external-link")} <a href="${esc(SRC[d].url)}" target="_blank" rel="noopener noreferrer">${esc(SRC[d].title)}</a> <span class="muted">· ${esc(fmtDate(SRC[d].date))} · [${d}]</span></div>`).join("")}</dd>
      </dl>
      <p class="tiny muted" style="margin-top:14px">Specifications quoted from NVIDIA documentation as of ${VERIFIED_ON}. Vendor claims are projections under the configurations NVIDIA footnotes; they are not independent results. Bracketed codes link to the source library.</p>`;
  };
  $("#arch").addEventListener("click", e=>{ const n=e.target.closest(".node"); if(!n) return; st.sel=n.dataset.c; render(); });
  segSet("#modeSeg","mode",st.mode); segBind("#modeSeg","mode", m=>{ st.mode=m; render(); });
  render();
}


let navState;
function buildBrief(s){
  const R=ROLE_RULES[s.role], W=WORKLOAD_RULES[s.workload], Ch=CHALLENGE_RULES[s.challenge], M=MATURITY_RULES[s.maturity];
  const capIds = [...new Set([...Ch.caps, ...W.caps])].slice(0,4);
  const caps = capIds.map(id=>({id, c:COMPONENTS[id]}));
  const capNames = caps.map(x=>{ const n=x.c.name.replace(/ \(.*\)/,""); return /^(NVIDIA|AI|GPUs|CPUs|NVLink)/.test(n) ? n : n.charAt(0).toLowerCase()+n.slice(1); }).slice(0,3);
  const article = /^[AEIOU]/.test(s.role) ? "an" : "a";
  const pain = `As ${article} ${s.role} in ${s.industry} at the "${s.maturity}" stage, running ${lc(s.workload)} workloads, the central problem is that ${Ch.pain}. From your seat this becomes a question of ${R.lens}: without clear evidence, it is hard to ${R.verb} with confidence.`;
  const vpByTone = {
    outcome:`For ${s.industry} leaders who need ${W.benefit}, an integrated stack combining ${capNames.join(", ")} can turn AI infrastructure from a cost center into measurable capacity for growth, provided success is tracked through ${Ch.metric}.`,
    financial:`For finance leaders in ${s.industry}, the value case rests on ${Ch.metric}. Capabilities such as ${capNames.join(", ")} are designed to deliver ${W.benefit}; evaluate them on lifetime TCO, NPV and payback using your own measured utilization, not peak specifications.`,
    "strategic-technical":`For technology leaders in ${s.industry}, ${capNames.join(", ")} offer an architecture path to ${W.benefit}, with ${Ch.metric} as the primary proof that the platform addresses your ${lc(s.challenge)} challenge.`,
    technical:`For engineers building ${lc(s.workload)} systems, ${capNames.join(", ")} target the bottleneck behind your ${lc(s.challenge)} problem. Validate with ${Ch.metric} on your own models and sequence lengths.`,
    operational:`For data center teams in ${s.industry}, ${capNames.join(", ")} can deliver ${W.benefit} within facility constraints, measured by ${Ch.metric} and confirmed against your power, cooling and density limits.`,
    commercial:`For procurement teams, the decision is about value and risk across the asset life: ${capNames.join(", ")} should be assessed on ${Ch.metric}, supply commitments and portability, alongside ${W.benefit}.`
  };
  const benefits = [...new Set([`Progress toward ${W.benefit}`, ...caps.flatMap(x=>x.c.benefits)])].slice(0,6);
  const techMetrics = [...new Set([...W.tm, `${Ch.metric.charAt(0).toUpperCase()+Ch.metric.slice(1)}`, ...R.metrics])].slice(0,8);
  const evalCrit = [...M.eval, `Evidence for ${R.care}`, "Reproduce vendor benchmarks with your own models, data and latency targets", "Confirm assumptions in a transparent TCO model (see TCO & ROI Simulator)"];
  const docs = [...new Set(caps.flatMap(x=>x.c.docs))];
  const qs = [...R.q, `How do you measure ${Ch.metric} for ${lc(s.workload)} in production?`, `Which ${lc(s.industry)} customers can share results at a comparable maturity stage ("${s.maturity}")?`, "Which performance figures are projections, and under what configuration were they measured?"];
  const risks = [Ch.risk, M.risk, "Vendor performance figures are 'up to' projections under specific configurations and may not match your workloads", s.industry==="Financial Services"||s.industry==="Healthcare" ? "Regulatory, residency and model-risk requirements may constrain deployment options" : "Data readiness and governance may lag behind infrastructure investment", s.role==="Data Center Manager"||s.challenge==="Energy Efficiency" ? "Power availability and cooling retrofits may extend timelines" : "Skills gaps in MLOps and inference optimization may limit achieved utilization"];
  const rules = [`Role "${s.role}" → lens: ${R.lens}; metrics emphasised: ${R.metrics.slice(0,2).join(", ")}`, `Challenge "${s.challenge}" → capabilities: ${Ch.caps.map(c=>COMPONENTS[c].name).join(", ")}`, `Workload "${s.workload}" → capabilities: ${W.caps.map(c=>COMPONENTS[c].name).join(", ")}`, `Maturity "${s.maturity}" → evaluation stage: ${M.stage}`, `Industry "${s.industry}" → ${SEGMENTS[s.industry].src?"verified industry data":"hypothesis-based context"}`];
  return {s, pain, industryCtx:INDUSTRY_CONTEXT[s.industry], caps, vp:vpByTone[R.tone], benefits, techMetrics, evalCrit, docs, qs, risks, rules, stage:M.stage, date:new Date().toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})};
}
function initNavigator(){
  navState = store.get("nav", {role:"CFO", industry:"Financial Services", workload:"High-Volume Inference", challenge:"Infrastructure Cost", maturity:"Production Deployment"});
  const lbl = {role:"Decision-maker role", industry:"Industry", workload:"Primary AI workload", challenge:"Primary business challenge", maturity:"AI maturity"};
  $("#navControls").innerHTML = `<div class="section-h"><h3>Customer scenario</h3></div>` + Object.keys(NAV_OPTS).map(k=>`<div class="field"><label class="fl" for="nv-${k}">${lbl[k]}</label><select id="nv-${k}" data-k="${k}">${opts(NAV_OPTS[k], navState[k])}</select></div>`).join("") +
    `<div class="callout blue small" style="margin-top:6px"><b>Educational output.</b> Recommendations are generated from documented rules (see "Why these recommendations") and are not definitive purchasing advice.</div><button class="btn" id="nvRandom">${icon("sparkles")}Try a random scenario</button>`;
  $("#navControls").addEventListener("change", e=>{ const k=e.target.dataset.k; if(!k) return; navState[k]=e.target.value; renderBrief(); });
  $("#nvRandom").onclick = ()=>{ Object.keys(NAV_OPTS).forEach(k=>{ navState[k]=NAV_OPTS[k][Math.floor(Math.random()*NAV_OPTS[k].length)]; $("#nv-"+k).value=navState[k]; }); renderBrief(); };
  $("#briefPrint").onclick = ()=>printWith("print-brief");
  $("#briefCopy").onclick = ()=>copyText(briefMd(buildBrief(navState)));
  $("#briefMd").onclick = ()=>download(`customer-value-brief-${navState.role.replace(/\s+/g,"-").toLowerCase()}.md`, briefMd(buildBrief(navState)), "text/markdown");
  renderBrief();
}
function renderBrief(){
  store.set("nav", navState);
  const b = buildBrief(navState);
  const li = a => `<ul class="clean">${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
  $("#briefOut").innerHTML = `<article class="brief" aria-live="polite">
    <div class="brief-head"><div><div class="kicker">Customer Value Brief</div><h3>${esc(b.s.role)} · ${esc(b.s.industry)}</h3><div class="small muted">${esc(b.s.workload)} · ${esc(b.s.challenge)} · ${esc(b.s.maturity)}</div></div><div style="text-align:right"><span class="tag amber">Educational · not purchasing advice</span><div class="tiny muted" style="margin-top:6px">Generated ${esc(b.date)}</div></div></div>
    <div class="brief-sec"><h4>Audience-specific value proposition</h4><p class="vp">${esc(b.vp)}</p></div>
    <div class="brief-sec"><h4>Personalized customer pain point</h4><p>${esc(b.pain)}</p><p class="small muted">${esc(b.industryCtx)}</p></div>
    <div class="brief-sec"><h4>Relevant infrastructure capabilities</h4><div class="grid g2">${b.caps.map(x=>`<div class="card flat"><b>${esc(x.c.name)}</b><p class="small muted" style="margin:4px 0">${esc(x.c.what.biz)}</p><div class="tiny">${esc(x.c.metrics[0][0])}: <b>${esc(x.c.metrics[0][1])}</b> [${esc(x.c.metrics[0][2])}]</div></div>`).join("")}</div></div>
    <div class="grid g2"><div class="brief-sec"><h4>Potential business benefits</h4>${li(b.benefits)}</div><div class="brief-sec"><h4>Technical metrics to evaluate</h4>${li(b.techMetrics)}</div></div>
    <div class="grid g2"><div class="brief-sec"><h4>Recommended evaluation criteria</h4><p class="small muted">${esc(b.stage)}</p>${li(b.evalCrit)}</div><div class="brief-sec"><h4>Questions for infrastructure providers</h4>${li(b.qs)}</div></div>
    <div class="brief-sec"><h4>Potential implementation risks</h4>${li(b.risks)}</div>
    <div class="brief-sec"><h4>Relevant product documentation</h4>${b.docs.map(d=>`<div class="small">${icon("external-link")} <a href="${esc(SRC[d].url)}" target="_blank" rel="noopener noreferrer">${esc(SRC[d].title)}</a> <span class="muted">· ${esc(SRC[d].pub)} · ${esc(fmtDate(SRC[d].date))}</span></div>`).join("")}</div>
    <details class="brief-sec no-print"><summary class="small" style="cursor:pointer">Why these recommendations (rules applied)</summary>${li(b.rules)}</details>
    <p class="tiny muted" style="margin-top:12px">Independent educational project, not affiliated with or endorsed by NVIDIA. Product facts are quoted from public NVIDIA documentation (verified ${VERIFIED_ON}); vendor performance claims are projections under footnoted configurations. Created by Ana Laura Nascimento, 2026.</p>
  </article>`;
}
function briefMd(b){
  const l = a => a.map(x=>`- ${x}`).join("\n");
  return `# Customer Value Brief\n**${b.s.role} · ${b.s.industry}**  \n${b.s.workload} · ${b.s.challenge} · ${b.s.maturity}  \n_Generated ${b.date}. Educational output, not purchasing advice._\n\n## Value proposition\n${b.vp}\n\n## Customer pain point\n${b.pain}\n\n${b.industryCtx}\n\n## Relevant infrastructure capabilities\n${b.caps.map(x=>`- **${x.c.name}**: ${x.c.what.biz} (${x.c.metrics[0][0]}: ${x.c.metrics[0][1]} [${x.c.metrics[0][2]}])`).join("\n")}\n\n## Potential business benefits\n${l(b.benefits)}\n\n## Technical metrics to evaluate\n${l(b.techMetrics)}\n\n## Recommended evaluation criteria\n${b.stage}\n${l(b.evalCrit)}\n\n## Questions for infrastructure providers\n${l(b.qs)}\n\n## Potential implementation risks\n${l(b.risks)}\n\n## Documentation\n${b.docs.map(d=>`- [${SRC[d].title}](${SRC[d].url}) (${SRC[d].pub}, ${fmtDate(SRC[d].date)})`).join("\n")}\n\n## Rules applied\n${l(b.rules)}\n\n---\nIndependent educational portfolio project by Ana Laura Nascimento (2026). Not affiliated with or endorsed by NVIDIA.\n`;
}


const TCO_FIELDS = [
  {k:"acq", l:"Infrastructure acquisition cost", u:"$", min:0, max:1e11, step:10000},
  {k:"impl", l:"Migration & implementation (one-time)", u:"$", min:0, max:1e10, step:10000},
  {k:"gpus", l:"Number of GPUs", u:"count", min:0, max:1e6, step:1, int:true},
  {k:"watts", l:"Power per GPU (incl. server share)", u:"W", min:0, max:10000, step:50},
  {k:"util", l:"GPU utilization rate", u:"%", min:0, max:100, step:1},
  {k:"hours", l:"Annual operating hours", u:"h/yr", min:0, max:8760, step:10},
  {k:"price", l:"Electricity cost", u:"$/kWh", min:0, max:5, step:0.01},
  {k:"pue", l:"Data center PUE", u:"ratio", min:1, max:5, step:0.01},
  {k:"maint", l:"Annual maintenance", u:"$/yr", min:0, max:1e10, step:5000},
  {k:"soft", l:"Annual software & licensing", u:"$/yr", min:0, max:1e10, step:5000},
  {k:"benefit", l:"Estimated annual business benefits", u:"$/yr", min:0, max:1e11, step:10000},
  {k:"life", l:"Expected lifespan", u:"years", min:1, max:15, step:1, int:true},
  {k:"rate", l:"Discount rate", u:"%", min:0, max:50, step:0.5}
];
const TCO_DEFAULT = {
  A:{name:"Scenario A · Baseline cluster", acq:2400000, impl:150000, gpus:64, watts:700, util:45, hours:8760, price:0.10, pue:1.5, maint:180000, soft:120000, benefit:1600000, life:5, rate:8},
  B:{name:"Scenario B · Alternative platform", acq:3600000, impl:300000, gpus:64, watts:1000, util:70, hours:8760, price:0.10, pue:1.3, maint:220000, soft:200000, benefit:2600000, life:5, rate:8},
  case:"base", bd:"A", sens:"B"
};
const CASES = {
  conservative:{benefit:0.75, util:-10, impl:1.25, price:1.15, txt:"Benefits −25%, utilization −10 points, implementation cost +25%, electricity price +15%."},
  base:{benefit:1, util:0, impl:1, price:1, txt:"Inputs used exactly as entered."},
  optimistic:{benefit:1.2, util:10, impl:0.9, price:0.95, txt:"Benefits +20%, utilization +10 points, implementation cost −10%, electricity price −5%."}
};
let tco;
function applyCase(s, cs){ const c=CASES[cs]; return {...s, benefit:s.benefit*c.benefit, util:Math.min(100,Math.max(0,s.util+c.util)), impl:s.impl*c.impl, price:s.price*c.price}; }
function calc(raw, cs){
  const s = applyCase(raw, cs); const r = s.rate/100; const L = Math.max(1, Math.round(s.life));
  const kW = s.gpus*s.watts/1000;
  const energyKWh = kW*s.hours*s.pue;
  const elec = energyKWh*s.price;
  const opex = elec + s.maint + s.soft;
  const capex = s.acq + s.impl;
  const tcoNom = capex + opex*L;
  let pvOpex=0, npv=-capex, pvBen=0; const cum=[capex]; const cumNet=[-capex];
  for(let t=1;t<=L;t++){ const df=Math.pow(1+r,t); pvOpex+=opex/df; pvBen+=s.benefit/df; npv+=(s.benefit-opex)/df; cum.push(capex+opex*t); cumNet.push(cumNet[t-1]+s.benefit-opex); }
  const net = s.benefit - opex;
  let payback = null;
  if(capex===0 && net>=0) payback = 0;
  else if(net>0){ let c=-capex; for(let t=1;t<=L;t++){ const prev=c; c+=net; if(c>=0){ payback = (t-1) + (-prev)/net; break; } } }
  const benefitsTot = s.benefit*L;
  const roi = tcoNom>0 ? (benefitsTot - tcoNom)/tcoNom : null;
  const prodHours = s.gpus*s.hours*(s.util/100);
  const annualized = capex/L + opex;
  const cph = prodHours>0 ? annualized/prodHours : null;
  return {s, L, kW, energyKWh, elec, opex, capex, tcoNom, pvCost:capex+pvOpex, pvBen, npv, net, payback, benefitsTot, roi, prodHours, cph, cum, cumNet,
    breakdown:{"Acquisition":s.acq,"Migration & implementation":s.impl,"Electricity":elec*L,"Maintenance":s.maint*L,"Software & licensing":s.soft*L}};
}
function cphAt(raw, cs, util){ const x = calc({...raw}, cs); const prod = x.s.gpus*x.s.hours*(util/100); return prod>0 ? (x.capex/x.L + x.opex)/prod : null; }
function initTco(){
  tco = store.get("tco", null) || JSON.parse(JSON.stringify(TCO_DEFAULT));
  ["A","B"].forEach(k=>{ tco[k] = {...TCO_DEFAULT[k], ...tco[k]}; });
  renderTcoInputs();
  segSet("#caseSeg","case",tco.case); segBind("#caseSeg","case", c=>{ tco.case=c; updateTco(); });
  segSet("#bdSeg","s",tco.bd); segBind("#bdSeg","s", v=>{ tco.bd=v; updateTco(); });
  segSet("#sensSeg","s",tco.sens); segBind("#sensSeg","s", v=>{ tco.sens=v; updateTco(); });
  $("#tcoReset").onclick = ()=> confirmModal("Reset simulator assumptions?", "Both scenarios return to the illustrative default values.", "Reset assumptions", ()=>{ tco = JSON.parse(JSON.stringify(TCO_DEFAULT)); renderTcoInputs(); segSet("#caseSeg","case","base"); segSet("#bdSeg","s","A"); segSet("#sensSeg","s","B"); updateTco(); toast("Assumptions reset"); }, false);
  $("#tcoCsv").onclick = exportTcoCsv;
  $("#tcoPrint").onclick = ()=>printWith("print-tco");
  $("#formulaBox").textContent =
`Assumption: GPUs draw the entered power for every operating hour (a conservative simplification; real draw varies with load).
IT power (kW)                 = GPUs × power per GPU (W) ÷ 1,000
Annual energy (kWh)           = IT power × annual operating hours × PUE
Annual electricity cost       = annual energy × electricity price ($/kWh)
Annual OPEX                   = electricity + maintenance + software & licensing
CAPEX (year 0)                = acquisition + migration & implementation
TCO (nominal)                 = CAPEX + annual OPEX × lifespan
PV of costs                   = CAPEX + Σ OPEX ÷ (1 + r)^t,  t = 1…lifespan
Net annual cash flow          = annual benefits − annual OPEX
NPV                           = −CAPEX + Σ (benefits − OPEX) ÷ (1 + r)^t
ROI (lifetime, nominal)       = (benefits × lifespan − TCO) ÷ TCO
Payback (years)               = first point where cumulative net cash flow ≥ 0 (linear within the year)
Productive GPU-hours / year   = GPUs × operating hours × utilization
Cost per productive GPU-hour  = (CAPEX ÷ lifespan + annual OPEX) ÷ productive GPU-hours
Estimated cost savings (B vs A) = TCO(A) − TCO(B); positive means B costs less over its life
Case adjustments are applied before calculation and do not change the stored inputs.`;
  updateTco();
}
function renderTcoInputs(){
  ["A","B"].forEach(k=>{
    const s=tco[k];
    $("#scen"+k).innerHTML = `<div class="card-h"><h3 style="color:${k==="A"?"var(--accent-2)":"var(--blue)"}">Scenario ${k}</h3><span class="tag amber">Illustrative defaults</span></div>
      <div class="field"><label class="fl" for="t${k}-name">Scenario name</label><input type="text" id="t${k}-name" data-s="${k}" data-k="name" value="${esc(s.name)}" maxlength="60"></div>
      <div class="inp-grid">${TCO_FIELDS.map(f=>`<div class="field"><label class="fl" for="t${k}-${f.k}"><span>${esc(f.l)}</span><em>${esc(f.u)}</em></label><input type="number" inputmode="decimal" id="t${k}-${f.k}" data-s="${k}" data-k="${f.k}" value="${s[f.k]}" min="${f.min}" max="${f.max}" step="${f.step}" aria-describedby="e${k}-${f.k}"><div class="err" id="e${k}-${f.k}" role="alert"></div></div>`).join("")}</div>`;
    $("#scen"+k).oninput = onTcoInput;
  });
}
function onTcoInput(e){
  const inp=e.target; const k=inp.dataset.s, f=inp.dataset.k; if(!k||!f) return;
  if(f==="name"){ tco[k].name = inp.value.trim() || `Scenario ${k}`; updateTco(); return; }
  const def = TCO_FIELDS.find(x=>x.k===f); const err=$(`#e${k}-${f}`); const raw = inp.value.trim();
  let msg="";
  const v = Number(raw);
  if(raw==="") msg="Enter a value (0 is allowed).";
  else if(!isFinite(v)) msg="Enter a valid number.";
  else if(v<def.min || v>def.max) msg=`Must be between ${def.min.toLocaleString()} and ${def.max.toLocaleString()}.`;
  else if(def.int && !Number.isInteger(v)) msg="Enter a whole number.";
  inp.classList.toggle("invalid", !!msg); inp.setAttribute("aria-invalid", !!msg); err.textContent = msg ? msg+" Last valid value is used." : ""; err.classList.toggle("show", !!msg);
  if(!msg){ tco[k][f]=v; updateTco(); }
}
function updateTco(){
  store.set("tco", tco);
  const A = calc(tco.A, tco.case), B = calc(tco.B, tco.case);
  $("#caseNote").innerHTML = `<b>${tco.case[0].toUpperCase()+tco.case.slice(1)} case.</b> ${esc(CASES[tco.case].txt)} All outputs are simulations based on user assumptions and illustrative defaults. They are not NVIDIA performance or pricing data.`;
  const yrs = v => v===null ? "Not within lifespan" : v===0 ? "Immediate" : `${v.toFixed(1)} yrs`;
  const cphTxt = (x) => x.cph===null ? "N/A (0 productive hours)" : `$${x.cph.toFixed(2)}`;
  const rows = [
    ["Annual electricity cost", money(A.elec), money(B.elec), B.elec-A.elec, true],
    ["Annual operating expenditure", money(A.opex), money(B.opex), B.opex-A.opex, true],
    ["CAPEX (acquisition + implementation)", money(A.capex), money(B.capex), B.capex-A.capex, true],
    ["Total cost of ownership (nominal)", money(A.tcoNom), money(B.tcoNom), B.tcoNom-A.tcoNom, true],
    ["Present value of costs", money(A.pvCost), money(B.pvCost), B.pvCost-A.pvCost, true],
    ["Lifetime business benefits", money(A.benefitsTot), money(B.benefitsTot), B.benefitsTot-A.benefitsTot, false],
    ["Estimated ROI (lifetime)", pct(A.roi), pct(B.roi), null, false],
    ["Net present value", money(A.npv), money(B.npv), B.npv-A.npv, false],
    ["Payback period", yrs(A.payback), yrs(B.payback), null, false],
    ["Productive GPU-hours / year", A.prodHours ? Math.round(A.prodHours).toLocaleString() : "0", B.prodHours ? Math.round(B.prodHours).toLocaleString() : "0", null, false],
    ["Cost per productive GPU-hour", cphTxt(A), cphTxt(B), (A.cph!==null&&B.cph!==null)?B.cph-A.cph:null, true]
  ];
  const savings = A.tcoNom - B.tcoNom;
  const warn = [];
  [["A",A],["B",B]].forEach(([k,x])=>{ if(x.s.gpus===0) warn.push(`Scenario ${k} has 0 GPUs: energy and cost per GPU-hour cannot be computed meaningfully.`); if(x.s.util===0) warn.push(`Scenario ${k} has 0% utilization: there are no productive GPU-hours.`); if(x.s.hours===0) warn.push(`Scenario ${k} has 0 operating hours.`); if(x.tcoNom===0) warn.push(`Scenario ${k} has zero total cost, so ROI is undefined.`); });
  $("#tcoResults").innerHTML = `
    <div class="res-grid" style="margin-bottom:12px">
      <div class="res"><div class="k">Estimated cost savings (B vs A, lifetime TCO)</div><div class="v ${savings>=0?"a":""}">${money(savings)}</div><div class="d">${savings>=0?"B costs less than A over the lifespan":"B costs more than A over the lifespan"}</div></div>
      <div class="res"><div class="k">NPV · ${esc(tco.A.name)}</div><div class="v a">${money(A.npv)}</div><div class="d">at ${tco.A.rate}% discount rate</div></div>
      <div class="res"><div class="k">NPV · ${esc(tco.B.name)}</div><div class="v b">${money(B.npv)}</div><div class="d">at ${tco.B.rate}% discount rate</div></div>
      <div class="res"><div class="k">Cost per productive GPU-hour (A → B)</div><div class="v">${A.cph===null?"N/A":"$"+A.cph.toFixed(2)} → ${B.cph===null?"N/A":"$"+B.cph.toFixed(2)}</div><div class="d">annualized CAPEX + OPEX</div></div>
    </div>
    ${warn.length?`<div class="callout amber small">${warn.map(esc).join("<br>")}</div>`:""}
    <div class="tbl-wrap"><table><thead><tr><th>Metric</th><th class="num">${esc(tco.A.name)}</th><th class="num">${esc(tco.B.name)}</th><th class="num">Difference (B − A)</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td>${esc(r[0])}</td><td class="num">${r[1]}</td><td class="num">${r[2]}</td><td class="num">${r[3]===null?"n/a":`<span style="color:${(r[4]? r[3]<=0 : r[3]>=0)?"var(--accent-2)":"var(--red)"}">${r[0].includes("GPU-hour")?(r[3]<0?"−":"")+"$"+Math.abs(r[3]).toFixed(2):money(r[3])}</span>`}</td></tr>`).join("")}
    </tbody></table></div>
    <p class="tiny muted" style="margin:8px 0 0">Green differences favor Scenario B (lower cost or higher value). Default values are illustrative assumptions; electricity price and PUE defaults require verification against EIA and Uptime Institute data for your region.</p>`;
  const maxL = Math.max(A.L, B.L);
  chart("chCum",{type:"line",data:{labels:[...Array(maxL+1).keys()].map(y=>"Yr "+y),datasets:[
    {label:tco.A.name,data:A.cum,borderColor:C.green,backgroundColor:C.green,tension:.2,pointRadius:3},
    {label:tco.B.name,data:B.cum,borderColor:C.blue,backgroundColor:C.blue,tension:.2,pointRadius:3}]},
    options:{plugins:{tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${money(c.raw)}`}}},scales:{y:{ticks:{callback:v=>money(v)}}}}});
  chart("chCapex",{type:"bar",data:{labels:["A","B"],datasets:[{label:"CAPEX",data:[A.capex,B.capex],backgroundColor:C.gray},{label:"Lifetime OPEX",data:[A.opex*A.L,B.opex*B.L],backgroundColor:C.green}]},
    options:{plugins:{tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${money(c.raw)}`}}},scales:{x:{stacked:true,grid:{display:false}},y:{stacked:true,ticks:{callback:v=>money(v)}}}}});
  const bdX = tco.bd==="A"?A:B;
  const bdE = Object.entries(bdX.breakdown).sort((a,b)=>b[1]-a[1]); const bdT = bdE.reduce((a,x)=>a+x[1],0);
  chart("chBreak",{type:"bar",data:{labels:bdE.map(x=>x[0]),datasets:[{label:"Lifetime cost",data:bdE.map(x=>x[1]),backgroundColor:bdE.map((x,i)=>i===0?C.green:C.gray)}]},
    options:{indexAxis:"y",layout:{padding:{right:70}},plugins:{legend:{display:false},valueLabels:{enabled:true,fmt:v=>`${money(v)} · ${bdT?((v/bdT)*100).toFixed(0):0}%`},tooltip:{callbacks:{label:c=>`${money(c.raw)} (${bdT?((c.raw/bdT)*100).toFixed(1):0}%)`}}},scales:{x:{display:false,beginAtZero:true},y:{grid:{display:false}}}}});
  chart("chComp",{type:"bar",data:{labels:["TCO (nominal)","PV of costs","Lifetime benefits","NPV"],datasets:[{label:"A",data:[A.tcoNom,A.pvCost,A.benefitsTot,A.npv],backgroundColor:C.green},{label:"B",data:[B.tcoNom,B.pvCost,B.benefitsTot,B.npv],backgroundColor:C.blue}]},
    options:{plugins:{tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${money(c.raw)}`}}},scales:{x:{grid:{display:false}},y:{ticks:{callback:v=>money(v)}}}}});
  // Sensitivity (tornado)
  const base = tco[tco.sens]; const baseNpv = calc(base, tco.case).npv;
  const vars = [["benefit","Annual benefits"],["acq","Acquisition cost"],["price","Electricity price"],["maint","Maintenance"],["soft","Software & licensing"],["impl","Implementation cost"],["rate","Discount rate"],["pue","PUE"]];
  const sens = vars.map(([k,l])=>{ const lo = calc({...base,[k]: k==="pue"? Math.max(1, base[k]*0.8) : base[k]*0.8}, tco.case).npv; const hi = calc({...base,[k]:base[k]*1.2}, tco.case).npv; return {l, lo, hi, span:Math.abs(hi-lo)}; }).sort((a,b)=>b.span-a.span);
  chart("chSens",{type:"bar",data:{labels:sens.map(x=>x.l),datasets:[{label:"NPV range (−20% to +20%)",data:sens.map(x=>[Math.min(x.lo,x.hi),Math.max(x.lo,x.hi)]),backgroundColor:tco.sens==="A"?C.green2:C.blue2,borderColor:tco.sens==="A"?C.green:C.blue,borderWidth:1}]},
    options:{indexAxis:"y",plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>{const x=sens[c.dataIndex]; return [`−20%: ${money(x.lo)}`,`+20%: ${money(x.hi)}`,`Base NPV: ${money(baseNpv)}`];}}}},scales:{x:{ticks:{callback:v=>money(v)}},y:{grid:{display:false}}}}});
  const utils=[10,20,30,40,50,60,70,80,90,100];
  chart("chUtil",{type:"line",data:{labels:utils.map(u=>u+"%"),datasets:[{label:"A",data:utils.map(u=>cphAt(tco.A,tco.case,u)),borderColor:C.green,backgroundColor:C.green,tension:.3,pointRadius:2},{label:"B",data:utils.map(u=>cphAt(tco.B,tco.case,u)),borderColor:C.blue,backgroundColor:C.blue,tension:.3,pointRadius:2}]},
    options:{plugins:{tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${c.raw===null?"N/A":"$"+c.raw.toFixed(2)} per productive GPU-hour`}}},scales:{x:{title:{display:true,text:"GPU utilization"}},y:{title:{display:true,text:"$ per productive GPU-hour"},ticks:{callback:v=>"$"+v}}}}});
}
function exportTcoCsv(){
  const A = calc(tco.A, tco.case), B = calc(tco.B, tco.case);
  const lines = [["Section","Item","Scenario A","Scenario B","Unit"]];
  lines.push(["Meta","Scenario name",tco.A.name,tco.B.name,""]);
  lines.push(["Meta","Case",tco.case,tco.case,""]);
  TCO_FIELDS.forEach(f=>lines.push(["Input (as entered)",f.l,tco.A[f.k],tco.B[f.k],f.u]));
  const r2 = v => v===null||!isFinite(v) ? "N/A" : Math.round(v*100)/100;
  [["Annual electricity cost","elec","$"],["Annual OPEX","opex","$"],["CAPEX","capex","$"],["TCO (nominal)","tcoNom","$"],["PV of costs","pvCost","$"],["Lifetime benefits","benefitsTot","$"],["NPV","npv","$"],["Payback period","payback","years"],["Productive GPU-hours per year","prodHours","hours"],["Cost per productive GPU-hour","cph","$"]].forEach(([l,k,u])=>lines.push(["Result",l,r2(A[k]),r2(B[k]),u]));
  lines.push(["Result","ROI (lifetime)",A.roi===null?"N/A":(A.roi*100).toFixed(2),B.roi===null?"N/A":(B.roi*100).toFixed(2),"%"]);
  lines.push(["Result","Estimated cost savings (TCO A − TCO B)",r2(A.tcoNom-B.tcoNom),"","$"]);
  for(let t=0;t<=Math.max(A.L,B.L);t++) lines.push(["Cumulative cost",`Year ${t}`, A.cum[t]!==undefined?r2(A.cum[t]):"", B.cum[t]!==undefined?r2(B.cum[t]):"","$"]);
  lines.push(["Note","Illustrative simulation. Not NVIDIA pricing or performance data.","","",""]);
  download("tco-roi-scenarios.csv", lines.map(r=>r.map(csvCell).join(",")).join("\r\n"), "text/csv");
}


function initCompete(){
  const st = store.get("compete", {g:"all", type:"all", q:"", open:[]});
  $("#vendorCards").innerHTML = VENDORS.map(v=>`<div class="card"><div class="card-h"><h3>${esc(v.name)}</h3></div><span class="tag ${v.type==="hw"?"green":"blue"}">${esc(v.typeLbl)}</span><dl class="facts">${v.facts.map(f=>`<dt>${esc(f[0])}</dt><dd>${esc(f[1])} ${cite(f[2])}</dd>`).join("")}</dl></div>`).join("");
  $("#cmGroup").innerHTML = opts([["all","All dimensions"], ...[...new Set(MATRIX.map(m=>m.g))]], st.g);
  $("#cmType").value = st.type; $("#cmSearch").value = st.q;
  const render = () => {
    st.g=$("#cmGroup").value; st.type=$("#cmType").value; st.q=$("#cmSearch").value.trim(); store.set("compete", st);
    const vs = VENDORS.filter(v=>st.type==="all"||v.type===st.type);
    const q = st.q.toLowerCase();
    const rows = MATRIX.filter(m=>(st.g==="all"||m.g===st.g) && (!q || [m.g,m.d,...vs.map(v=>m[v.id])].join(" ").toLowerCase().includes(q)));
    const hl = t => { const e=esc(t); if(!q) return e; const i=e.toLowerCase().indexOf(esc(q).toLowerCase()); return i<0?e:e.slice(0,i)+`<mark style="background:rgba(118,185,0,.3);color:inherit">${e.slice(i,i+esc(q).length)}</mark>`+e.slice(i+esc(q).length); };
    const open = new Set(st.open||[]);
    $("#cmTbl").innerHTML = `<thead><tr><th style="min-width:190px">Dimension</th>${vs.map(v=>`<th style="min-width:190px"><span style="color:${v.color}">■</span> ${esc(v.name)}<div class="tiny" style="text-transform:none;font-weight:400;letter-spacing:0">${esc(v.typeLbl)}</div></th>`).join("")}<th>Sources</th></tr></thead><tbody>${rows.length?rows.map(m=>{ const isO=open.has(m.d); return `<tr><td><button class="btn link" data-exp="${esc(m.d)}" aria-expanded="${isO}" style="text-align:left">${isO?"−":"+"} ${esc(m.d)}</button><div class="tiny dim">${esc(m.g)}</div></td>${vs.map(v=>`<td>${hl(m[v.id])}</td>`).join("")}<td class="tiny">${m.s.length?m.s.map(id=>cite(id)).join(" "):'<span class="dim">Author analysis</span>'}</td></tr>`+(isO?`<tr class="expand"><td colspan="${vs.length+2}"><div class="grid g2"><div><h4 style="margin-top:0">Sources behind this row</h4>${m.s.length?`<ul class="clean small">${m.s.map(id=>`<li>${srcLink(id)} <span class="dim">· ${esc(SRC[id].title)}</span></li>`).join("")}</ul>`:'<p class="small muted">No vendor source: this row is the author\'s framework.</p>'}<h4>How to read it</h4><p class="small muted">${esc(CM_NOTES[m.g]||"Each cell restates what the vendor documents. Cells are not scored or ranked.")}</p></div><div>${analystNote("cm."+m.d, "What would a buyer conclude from this row? What would you verify next?")}</div></div></td></tr>`:""); }).join(""):`<tr><td colspan="${vs.length+2}" class="empty">No rows match. Clear the search or choose another dimension.</td></tr>`}</tbody>`;
    $("#cmTbl").onclick = e=>{ const b=e.target.closest("[data-exp]"); if(!b) return; const k=b.dataset.exp; open.has(k)?open.delete(k):open.add(k); st.open=[...open]; store.set("compete",st); render(); };
    $("#cmCount").textContent = `${rows.length} dimensions · ${vs.length} offerings`;
  };
  ["#cmGroup","#cmType"].forEach(s=>$(s).addEventListener("change",render)); $("#cmSearch").addEventListener("input",render); render();
  $("#positioning").innerHTML = Object.values(POSITIONING).map(p=>`<div class="panel"><div class="section-h"><h3>${esc(p.t)}</h3>${ev("hy")}</div><ul class="clean small">${p.items.map(i=>`<li style="margin:6px 0">${esc(i)}</li>`).join("")}</ul></div>`).join("") +
    `<div class="full callout"><b>Scope note.</b> NVIDIA and AMD are hardware/platform providers whose products can be deployed on-premises or through partners and clouds. Google Cloud TPU and AWS Trainium/Inferentia are cloud-specific accelerators available only through their respective clouds, per their documentation. Specifications use different units and scopes (per chip, per rack, per pod) and must not be read as performance rankings. NVIDIA's own description of its competitors (Form 10-K, Item 1) has not been read for this version and is listed as pending research.</div>`;
}


let msgState;
const PAIN_PROBLEM = {
  "Rising cost per AI interaction":"every new AI feature adds inference cost that is hard to forecast or attribute",
  "Pilots not reaching production":"promising AI pilots stall before they deliver production value",
  "Power and facility constraints":"power and cooling limits cap how much AI capacity can be deployed",
  "Slow model training":"long training cycles slow model iteration and time to market",
  "Latency for real-time AI":"AI responses are too slow for real-time, customer-facing use",
  "Integration complexity":"stitching together compute, networking, storage and software delays deployment",
  "Long-context and agent memory limits":"long-context and agentic workloads exhaust GPU memory and force costly recomputation"
};
const ROLE_BENEFIT = {CEO:"Accelerate AI-driven growth initiatives", CFO:"Make AI infrastructure spend measurable and predictable", CTO:"Standardize on an architecture that scales with your roadmap", "AI Engineer":"Spend less time on infrastructure and more on models", "Data Center Manager":"Deliver more AI output within your power envelope", "Procurement Executive":"Evaluate total value, not just acquisition price"};
const PAIN_BENEFIT = {"Rising cost per AI interaction":"Lower, more predictable cost per AI interaction","Pilots not reaching production":"A clearer path from pilot to production","Power and facility constraints":"More useful work per unit of energy","Slow model training":"Shorter training cycles","Latency for real-time AI":"Faster responses for real-time experiences","Integration complexity":"Faster deployment from validated building blocks","Long-context and agent memory limits":"Responsive long-context and agentic AI"};
function buildMsg(s){
  const P = MSG_PRODUCTS[s.product], ch = MSG_CHANNELS[s.channel], prob = PAIN_PROBLEM[s.pain];
  const cx = +s.complexity; // 1 exec, 2 balanced, 3 technical
  const shortName = s.product.replace(/ (rack-scale system|platform|networking|storage|inference software|\(full stack\))$/,"");
  const vp = cx===1 ? `Help your ${lc(s.industry)} organization ${P.benefit}, turning AI infrastructure into measurable business capacity.`
    : cx===2 ? `${shortName} helps ${s.audience}s in ${lc(s.industry)} ${P.benefit}, addressing the reality that ${prob}.`
    : `${shortName} (${lc(P.feat[0])}; ${lc(P.feat[1])}) is engineered to ${P.benefit}, targeting the bottleneck where ${prob}.`;
  const benefits = [PAIN_BENEFIT[s.pain], ROLE_BENEFIT[s.audience], `${P.benefit.charAt(0).toUpperCase()+P.benefit.slice(1)}`];
  const headlines = {
    "Product landing page":`${P.benefit.charAt(0).toUpperCase()+P.benefit.slice(1)}.`,
    "Sales presentation":`The ${lc(s.pain)} problem, solved at the infrastructure layer`,
    "Product one-pager":`${shortName}: ${PAIN_BENEFIT[s.pain]}`,
    "Executive briefing":`What ${s.audience}s in ${s.industry} need to know about ${lc(s.pain)}`,
    "LinkedIn post":`${s.pain}? It may be an infrastructure question, not a model question.`,
    "Blog introduction":`Why ${lc(s.pain)} is the next AI challenge for ${lc(s.industry)}`,
    "Partner enablement material":`Positioning ${shortName} for ${s.audience}s: talk track and discovery guide`,
    "Webinar description":`Live session: ${lc(PAIN_BENEFIT[s.pain])} with ${shortName}`
  };
  const proofTxt = P.proof.map(p=>p[0]);
  const featLine = cx===3 ? ` Key specifications: ${P.feat.join("; ")}.` : "";
  const bodies = {
    short:`For ${s.audience}s in ${lc(s.industry)}, ${prob}. ${shortName} is designed to ${P.benefit}.${featLine}`,
    medium:`In ${lc(s.industry)}, ${prob}. For a ${s.audience}, that means ${ROLE_RULES[s.audience].care} are at stake.\n\n${shortName} is designed to ${P.benefit}. ${proofTxt[0]}${featLine}\n\n${benefits.map(b=>"• "+b).join("\n")}`,
    long:`AI ambitions in ${lc(s.industry)} are colliding with a practical constraint: ${prob}. For ${s.audience}s, the conversation is shifting from "can we use AI?" to "can we run it at a cost, speed and scale that pays off?"\n\n${shortName} approaches this as an infrastructure problem. ${proofTxt[0]} The goal is to ${P.benefit}.${featLine}\n\n${s.channel==="Partner enablement material"?"Discovery questions:\n• "+ROLE_RULES[s.audience].q.join("\n• ")+"\n\n":""}Before quoting performance figures, pair each with its baseline, workload and date.`
  };
  const verify = [
    ...P.proof.filter(p=>p[2]).map(p=>`${p[0].replace(/\.$/,"")}: vendor comparative claim; cite baseline, configuration and footnote [${p[1]}]`),
    `Competitive differentiation ("${P.diff}"): comparative positioning requires substantiation before external use`,
    `Any customer outcome or ROI for ${s.industry}: requires a named, approved reference or must be labeled illustrative`,
    `Suitability for "${lc(s.pain)}": confirm with workload-specific testing`
  ];
  return {s, P, ch, audienceTxt:`${s.audience} · ${s.industry}`, problem:`${prob.charAt(0).toUpperCase()+prob.slice(1)}.`, vp, benefits, proof:P.proof, diff:`${shortName} offers ${P.diff}.`, headline:headlines[s.channel], copy:bodies[ch.len], cta:ch.cta, verify,
    featureVer:{headline:`${shortName}: ${P.feat[0]}`, copy:`${P.feat.join(". ")}. ${proofTxt[1]}`, why:"Leads with specifications. Credible for technical evaluators, but leaves the reader to infer business value."},
    benefitVer:{headline:headlines[s.channel], copy:`${prob.charAt(0).toUpperCase()+prob.slice(1)}. ${shortName} helps you ${P.benefit}, so ${s.audience}s can focus on ${ROLE_RULES[s.audience].care}. ${proofTxt[0]}`, why:"Leads with the customer problem and outcome, then supports it with a verified fact. Better suited to business audiences."}};
}
function initMessaging(){
  msgState = store.get("msg", {product:"Vera Rubin NVL72 platform", audience:"CFO", industry:"Enterprise Technology", pain:"Rising cost per AI interaction", channel:"Executive briefing", complexity:"2", mode:"single"});
  const F = [["product","Product or capability",Object.keys(MSG_PRODUCTS)],["audience","Target audience",MSG_AUD],["industry","Industry",INDUSTRIES],["pain","Customer pain point",MSG_PAINS],["channel","Communication channel",Object.keys(MSG_CHANNELS)],["complexity","Technical complexity",[["1","Low · executive"],["2","Medium · balanced"],["3","High · technical"]]]];
  $("#msgControls").innerHTML = `<div class="section-h"><h3>Configuration</h3></div>`+F.map(([k,l,o])=>`<div class="field"><label class="fl" for="ms-${k}">${l}</label><select id="ms-${k}" data-k="${k}">${opts(o, msgState[k])}</select></div>`).join("")+`<div class="callout small" style="margin-top:6px"><b>Rule-based engine.</b> Copy is assembled from templates, a message map per product and sourced proof points. Nothing here is generated by a live AI model.</div>`;
  $("#msgControls").addEventListener("change", e=>{ const k=e.target.dataset.k; if(k){ msgState[k]=e.target.value; renderMsg(); } });
  segSet("#msgMode","m",msgState.mode); segBind("#msgMode","m", m=>{ msgState.mode=m; renderMsg(); });
  $("#msgCopy").onclick = ()=>copyText(msgMd(buildMsg(msgState)));
  $("#msgExport").onclick = ()=>download("messaging-"+msgState.channel.toLowerCase().replace(/\W+/g,"-")+".md", msgMd(buildMsg(msgState)), "text/markdown");
  renderMsg();
}
function renderMsg(){
  store.set("msg", msgState);
  const m = buildMsg(msgState);
  const check = `<div class="section-h"><h3>Claim check</h3><span class="meta">${m.proof.length} proof points</span></div>
    <h4 style="margin-top:0">Source facts available for this product</h4>
    <ul class="clean small">${m.proof.map(p=>`<li style="margin:6px 0">${esc(p[0])}<div>${p[2]?ev("vp","vendor claim"):ev("vp","specification")} <span class="tiny">${srcLink(p[1],true)}</span></div></li>`).join("")}</ul>
    <h4>Needs verification before use</h4><ul class="clean small">${m.verify.map(v=>`<li style="margin:6px 0">${esc(v)}</li>`).join("")}</ul>
    <h4>Differentiation</h4><p class="small">${esc(m.diff)}</p><p>${ev("hy","requires substantiation")}</p>`;
  if(msgState.mode==="compare"){
    $("#msgOut").innerHTML = `<div class="stack">${[["Feature-focused",m.featureVer,"Technical audiences"],["Customer-benefit-focused",m.benefitVer,"Recommended for "+msgState.audience]].map(([t,v,c])=>`<div class="doc"><div class="kicker">${esc(t)} · ${esc(c)}</div><p style="font-size:16px;font-weight:600;margin:6px 0 8px">${esc(v.headline)}</p><p class="small">${esc(v.copy)}</p><p class="small dim" style="margin:0">${esc(v.why)}</p></div>`).join("")}
    <div class="tbl-wrap"><table><thead><tr><th>Element</th><th>Feature-focused</th><th>Benefit-focused</th></tr></thead><tbody><tr><td>Opening</td><td>Product name and specification</td><td>Customer problem</td></tr><tr><td>Evidence</td><td>Comparative vendor claim</td><td>Verified specification</td></tr><tr><td>Reader effort</td><td>Must infer value</td><td>Value stated explicitly</td></tr><tr><td>Best for</td><td>AI engineers, technical evaluators</td><td>CEO, CFO, procurement, business sponsors</td></tr></tbody></table></div>
    <p class="small muted">Which version works better is a testable question. See the <a href="#/experiment">Messaging Experiment Lab</a> for a study design.</p></div>`;
    $("#msgCheck").innerHTML = check; return;
  }
  const blk = (t, body) => `<div class="brief-sec"><h4>${t}</h4>${body}</div>`;
  $("#msgOut").innerHTML = `<div class="brief">
    <div class="brief-head"><div><div class="kicker">${esc(msgState.channel)} · ${esc(m.ch.fmt)}</div><h3 contenteditable="true" spellcheck="true" aria-label="Suggested headline (editable)">${esc(m.headline)}</h3></div><span class="tag amber">Draft · review before use</span></div>
    ${blk("Target audience", `<p>${esc(m.audienceTxt)}</p>`)}
    ${blk("Customer problem", `<p>${esc(m.problem)}</p>`)}
    ${blk("Core value proposition", `<p class="vp" contenteditable="true" aria-label="Value proposition (editable)">${esc(m.vp)}</p>`)}
    ${blk("Supporting benefits", `<ul class="clean">${m.benefits.map(b=>`<li>${esc(b)}</li>`).join("")}</ul>`)}
    ${blk("Supporting copy", `<textarea id="msgCopyTxt" aria-label="Supporting copy (editable)" style="min-height:170px">${esc(m.copy)}</textarea>`)}
    ${blk("Call to action", `<p class="mono small">${esc(m.cta)}</p>`)}
  </div>`;
  $("#msgCheck").innerHTML = check;
}
function msgMd(m){
  if(msgState.mode==="compare") return `# Feature vs. benefit messaging\n\n## Feature-focused\n**${m.featureVer.headline}**\n\n${m.featureVer.copy}\n\n## Customer-benefit-focused\n**${m.benefitVer.headline}**\n\n${m.benefitVer.copy}\n\n_Rule-based draft. Verify all claims before use._\n`;
  const copy = $("#msgCopyTxt") ? $("#msgCopyTxt").value : m.copy;
  const head = $("#msgOut [contenteditable][aria-label^='Suggested']")?.textContent || m.headline;
  return `# ${head}\n_Channel: ${msgState.channel} · Audience: ${m.audienceTxt}_\n\n**Customer problem:** ${m.problem}\n\n**Value proposition:** ${m.vp}\n\n**Supporting benefits**\n${m.benefits.map(b=>"- "+b).join("\n")}\n\n**Technical proof points**\n${m.proof.map(p=>`- ${p[0]} (${SRC[p[1]].pub}, ${fmtDate(SRC[p[1]].date)}: ${SRC[p[1]].url})`).join("\n")}\n\n**Differentiation:** ${m.diff}\n\n**Copy**\n\n${copy}\n\n**CTA:** ${m.cta}\n\n**Claims requiring verification**\n${m.verify.map(v=>"- "+v).join("\n")}\n\n_Rule-based draft from the AI Infrastructure Value Navigator (independent portfolio project, not affiliated with NVIDIA)._\n`;
}

