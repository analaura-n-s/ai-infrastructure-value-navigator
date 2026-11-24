/* =========================================================
   Core helpers shared by every section (classic script, global scope)
   ========================================================= */
"use strict";
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const icon = (n, cls="") => `<svg class="ic ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const LS = "aivn.";
const store = {
  get(k, d){ try{ const v = localStorage.getItem(LS+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(LS+k, JSON.stringify(v)); }catch(e){} },
  del(k){ try{ localStorage.removeItem(LS+k); }catch(e){} },
  clearAll(){ try{ Object.keys(localStorage).filter(k=>k.startsWith(LS)).forEach(k=>localStorage.removeItem(k)); }catch(e){} }
};
const fmtDate = d => { if(!d || d==="n.d.") return "n.d."; const p=String(d).split("-"); const M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; if(p.length===3) return `${M[+p[1]-1]} ${+p[2]}, ${p[0]}`; if(p.length===2) return `${M[+p[1]-1]} ${p[0]}`; return d; };
const srcLink = (id, short=false) => { const s = SRC[id]; if(!s) return ""; return `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" title="${esc(s.title)}">${esc(short ? s.pub.split(" (")[0] : s.pub)}, ${esc(fmtDate(s.date))}</a>${s.status!=="verified" ? ' <span class="tag amber" data-tip="The statistic was confirmed on the source page; some metadata (publication date, sample size or a gated value) could not be confirmed. See Methodology & Sources.">some details unverified</span>' : ""}`; };
const cite = id => SRC[id] ? `<a class="mono tiny" href="#/method" data-src="${esc(id)}" title="${esc(SRC[id].title)}">[${esc(id)}]</a>` : "";
const money = (v, d=0) => { if(v===null || v===undefined || !isFinite(v)) return "n/a"; const a=Math.abs(v); const sign=v<0?"−":""; if(a>=1e9) return `${sign}$${(a/1e9).toFixed(2)}B`; if(a>=1e6) return `${sign}$${(a/1e6).toFixed(2)}M`; if(a>=1e4) return `${sign}$${(a/1e3).toFixed(0)}K`; return `${sign}$${a.toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d})}`; };
const pct = v => (v===null || !isFinite(v)) ? "n/a" : `${(v*100).toFixed(1)}%`;
const avg = a => { const n=a.filter(x=>x!==null&&!isNaN(x)); return n.length ? n.reduce((x,y)=>x+y,0)/n.length : null; };
const f1 = v => v===null||v===undefined||isNaN(v) ? "n/a" : Number(v).toFixed(1);
const ev = (k, extra="") => EV[k] ? `<span class="ev e-${k}" data-tip="${esc(EV[k].d)}" tabindex="0"><i></i>${esc(EV[k].n)}${extra?" · "+esc(extra):""}</span>` : "";
const kindTag = k => KINDS[k] ? `<span class="tag ${k==="hy"?"violet":k==="nv"?"blue":k==="rc"?"amber":"green"}">${esc(KINDS[k])}</span>` : "";
const tip = (term, label) => GLOSSARY[term] ? `<span data-tip="${esc(GLOSSARY[term])}" tabindex="0">${esc(label||term)}</span>` : esc(label||term);
const opts = (arr, sel) => arr.map(o=>{ const [v,l] = Array.isArray(o)?o:[o,o]; return `<option value="${esc(v)}" ${String(v)===String(sel)?"selected":""}>${esc(l)}</option>`; }).join("");
const evLegend = () => `<div class="legend-ev" aria-label="Evidence status legend">${Object.keys(EV).map(k=>ev(k)).join("")}</div>`;

/* Analyst notes: empty, editable areas for the author's own analysis (saved locally). */
function analystNote(key, prompt){
  const v = store.get("note."+key, "");
  return `<div class="analyst no-print-empty"><h4>Analyst notes</h4><label class="sr-only" for="note-${esc(key)}">Analyst notes: ${esc(prompt)}</label><textarea id="note-${esc(key)}" data-note="${esc(key)}" placeholder="${esc(prompt)}">${esc(v)}</textarea><div class="tiny dim">Your own analysis. Empty by default and saved only in this browser.</div></div>`;
}
document.addEventListener("input", e=>{ const k=e.target.dataset && e.target.dataset.note; if(k!==undefined && k!==null && e.target.matches("textarea[data-note]")) store.set("note."+k, e.target.value); });

function toast(msg){ const t=$("#toast"); t.innerHTML = icon("circle-check") + esc(msg); t.classList.add("show"); clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove("show"), 2200); }
async function copyText(txt){
  try{ await navigator.clipboard.writeText(txt); toast("Copied to clipboard"); }
  catch(e){ const ta=document.createElement("textarea"); ta.value=txt; ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta); ta.select(); try{ document.execCommand("copy"); toast("Copied to clipboard"); }catch(_){ toast("Copy failed: select and copy manually"); } ta.remove(); }
}
function download(name, content, type="text/plain"){
  const blob = new Blob([content], {type: type+";charset=utf-8"}); const a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();}, 500);
  toast(`Downloaded ${name}`);
}
function printWith(cls){
  if(cls) document.body.classList.add(cls);
  Object.values(charts).forEach(c=>{ try{ c.options.animation=false; c.resize(); c.update("none"); }catch(e){} });
  const done = () => { if(cls) document.body.classList.remove(cls); window.removeEventListener("afterprint", done); Object.values(charts).forEach(c=>{ try{ c.options.animation={duration:300}; c.resize(); }catch(e){} }); };
  window.addEventListener("afterprint", done);
  setTimeout(()=>{ window.print(); setTimeout(done, 1000); }, 50);
}

/* ---------- Modal ---------- */
let lastFocus = null;
function openModal(html, onMount){
  lastFocus = document.activeElement;
  $("#modal").innerHTML = html; $("#modalBg").classList.add("open");
  if(onMount) onMount($("#modal"));
  const f = $("#modal").querySelector("input,select,textarea,button"); if(f) f.focus();
}
function closeModal(){ $("#modalBg").classList.remove("open"); $("#modal").innerHTML=""; if(lastFocus) lastFocus.focus(); }
function infoModal(title, body){ openModal(`<h3 id="modalTitle">${esc(title)}</h3><div class="muted small">${body}</div><div class="btn-row" style="justify-content:flex-end;margin-top:16px"><button class="btn" data-x>Close</button></div>`, m=>m.querySelector("[data-x]").onclick=closeModal); }
function confirmModal(title, body, okLabel, onOk, danger=true){
  openModal(`<h3 id="modalTitle">${esc(title)}</h3><p class="muted">${body}</p><div class="btn-row" style="justify-content:flex-end;margin-top:16px"><button class="btn" data-x>Cancel</button><button class="btn ${danger?"danger":"primary"}" data-ok>${esc(okLabel)}</button></div>`, m=>{
    m.querySelector("[data-x]").onclick=closeModal; m.querySelector("[data-ok]").onclick=()=>{ closeModal(); onOk(); };
  });
}

/* ---------- Charts ---------- */
const charts = {};
const hasChart = () => typeof window.Chart !== "undefined";
const C = {green:"#76B900", green2:"rgba(118,185,0,.30)", blue:"#6FA3E0", blue2:"rgba(111,163,224,.30)", amber:"#D9A441", red:"#E0685F", gray:"#5E655D", gray2:"#3A403A", violet:"#A894E0", teal:"#5DB8AE", text:"#C9CDC6", dim:"#7D837B"};
if(hasChart()){
  Chart.defaults.color = "#A1A69F"; Chart.defaults.borderColor = "#2B302B";
  Chart.defaults.font.family = '"IBM Plex Sans","Inter","Segoe UI",system-ui,sans-serif'; Chart.defaults.font.size = 11.5;
  Chart.defaults.plugins.legend.labels.boxWidth = 9; Chart.defaults.plugins.legend.labels.boxHeight = 9;
  Chart.defaults.plugins.tooltip.backgroundColor = "#232723"; Chart.defaults.plugins.tooltip.borderColor = "#3A403A"; Chart.defaults.plugins.tooltip.borderWidth = 1; Chart.defaults.plugins.tooltip.cornerRadius = 2;
  Chart.defaults.elements.bar.borderRadius = 0; Chart.defaults.maintainAspectRatio = false; Chart.defaults.animation.duration = 300;
  /* Direct value labels at the end of bars (no legend lookup needed). */
  Chart.register({id:"valueLabels", afterDatasetsDraw(ch, args, o){
    if(!o || !o.enabled) return; const ctx=ch.ctx; ctx.save(); ctx.font='11px "IBM Plex Mono","JetBrains Mono",monospace'; ctx.fillStyle="#C9CDC6";
    ch.data.datasets.forEach((ds,di)=>{ const meta=ch.getDatasetMeta(di); if(meta.hidden) return; meta.data.forEach((el,i)=>{ const raw=ds.data[i]; if(raw===null||raw===undefined) return; const v=Array.isArray(raw)?null:raw; if(v===null) return; const txt=o.fmt?o.fmt(v,i,di):String(v);
      if(ch.options.indexAxis==="y"){ ctx.textAlign="left"; ctx.textBaseline="middle"; ctx.fillText(txt, el.x+5, el.y); } else { ctx.textAlign="center"; ctx.textBaseline="bottom"; ctx.fillText(txt, el.x, el.y-3); } }); });
    ctx.restore(); }});
}
function chart(id, cfg){
  const cv = document.getElementById(id); if(!cv) return null;
  if(!hasChart()){ cv.parentElement.innerHTML = `<div class="chart-fallback">Chart library unavailable. The same data is shown in the tables and text on this page.</div>`; return null; }
  if(charts[id]){ charts[id].destroy(); }
  try{ charts[id] = new Chart(cv, cfg); }catch(err){ cv.parentElement.innerHTML = `<div class="chart-fallback">This chart could not be drawn (${esc(err.message)}). The data is listed in the table on this page.</div>`; return null; }
  return charts[id];
}

/* ---------- CSV ---------- */
function csvCell(v){ let s = String(v ?? ""); if(/^[=+\-@\t\r]/.test(s) && isNaN(Number(s))) s="'"+s; return /[",\n\r]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s; }
function toCsvRows(fields, rows){ return [fields.join(","), ...rows.map(r=>fields.map(f=>csvCell(r[f])).join(","))].join("\r\n")+"\r\n"; }
function parseCsv(text){
  const rows=[]; let row=[], cell="", q=false; text = String(text).replace(/^﻿/,"");
  for(let i=0;i<text.length;i++){ const c=text[i];
    if(q){ if(c==='"'){ if(text[i+1]==='"'){ cell+='"'; i++; } else q=false; } else cell+=c; }
    else if(c==='"') q=true; else if(c===","){ row.push(cell); cell=""; } else if(c==="\n"||c==="\r"){ if(c==="\r"&&text[i+1]==="\n") i++; row.push(cell); rows.push(row); row=[]; cell=""; } else cell+=c; }
  if(cell!==""||row.length){ row.push(cell); rows.push(row); }
  return rows.filter(r=>r.some(x=>x.trim()!==""));
}
const unguard = s => String(s||"").trim().replace(/^'(?=[=+\-@])/,"");
function readCsvFile(input, onRows){
  const file = input.files[0]; input.value=""; if(!file) return;
  if(file.size > 5e6){ infoModal("Import failed","The file is larger than 5 MB."); return; }
  const rd = new FileReader();
  rd.onload = () => { try{ onRows(parseCsv(String(rd.result))); }catch(err){ infoModal("Import failed", `The file could not be parsed: ${esc(err.message)}`); } };
  rd.onerror = () => infoModal("Import failed","The browser could not read the file.");
  rd.readAsText(file);
}

/* ---------- Statistics (Experiment Lab) ---------- */
const Stat = {
  mean: a => a.reduce((x,y)=>x+y,0)/a.length,
  sd(a){ if(a.length<2) return null; const m=Stat.mean(a); return Math.sqrt(a.reduce((s,x)=>s+(x-m)*(x-m),0)/(a.length-1)); },
  lgamma(x){ const g=7, c=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
    if(x<0.5) return Math.log(Math.PI/Math.sin(Math.PI*x))-Stat.lgamma(1-x); x-=1; let a=c[0]; const t=x+g+0.5; for(let i=1;i<9;i++) a+=c[i]/(x+i); return 0.5*Math.log(2*Math.PI)+(x+0.5)*Math.log(t)-t+Math.log(a); },
  betacf(a,b,x){ const MAXIT=200, EPS=3e-14, FPMIN=1e-300; let qab=a+b, qap=a+1, qam=a-1, c=1, d=1-qab*x/qap; if(Math.abs(d)<FPMIN) d=FPMIN; d=1/d; let h=d;
    for(let m=1;m<=MAXIT;m++){ const m2=2*m; let aa=m*(b-m)*x/((qam+m2)*(a+m2)); d=1+aa*d; if(Math.abs(d)<FPMIN) d=FPMIN; c=1+aa/c; if(Math.abs(c)<FPMIN) c=FPMIN; d=1/d; h*=d*c;
      aa=-(a+m)*(qab+m)*x/((a+m2)*(qap+m2)); d=1+aa*d; if(Math.abs(d)<FPMIN) d=FPMIN; c=1+aa/c; if(Math.abs(c)<FPMIN) c=FPMIN; d=1/d; const del=d*c; h*=del; if(Math.abs(del-1)<EPS) break; } return h; },
  ibeta(x,a,b){ if(x<=0) return 0; if(x>=1) return 1; const bt=Math.exp(Stat.lgamma(a+b)-Stat.lgamma(a)-Stat.lgamma(b)+a*Math.log(x)+b*Math.log(1-x)); return x<(a+1)/(a+b+2) ? bt*Stat.betacf(a,b,x)/a : 1-bt*Stat.betacf(b,a,1-x)/b; },
  tcdf(t,df){ const x=df/(df+t*t); const p=0.5*Stat.ibeta(x,df/2,0.5); return t>0?1-p:p; },
  tinv(p,df){ let lo=-100, hi=100; for(let i=0;i<200;i++){ const mid=(lo+hi)/2; if(Stat.tcdf(mid,df)<p) lo=mid; else hi=mid; } return (lo+hi)/2; },
  welch(a,b){ const na=a.length, nb=b.length; if(na<2||nb<2) return null; const ma=Stat.mean(a), mb=Stat.mean(b), va=Math.pow(Stat.sd(a),2), vb=Math.pow(Stat.sd(b),2);
    const se=Math.sqrt(va/na+vb/nb); const diff=mb-ma; if(se===0) return {diff, se:0, t:null, df:null, p:null, lo:diff, hi:diff, d:null};
    const df=Math.pow(va/na+vb/nb,2)/(Math.pow(va/na,2)/(na-1)+Math.pow(vb/nb,2)/(nb-1)); const t=diff/se; const p=2*(1-Stat.tcdf(Math.abs(t),df)); const tc=Stat.tinv(0.975,df);
    const sp=Math.sqrt(((na-1)*va+(nb-1)*vb)/(na+nb-2)); return {diff, se, t, df, p, lo:diff-tc*se, hi:diff+tc*se, d: sp>0?diff/sp:null}; },
  holm(ps){ const idx=ps.map((p,i)=>({p,i})).filter(x=>x.p!==null).sort((a,b)=>a.p-b.p); const m=idx.length; const out=ps.map(()=>null); let run=0; idx.forEach((x,k)=>{ run=Math.max(run, Math.min(1,(m-k)*x.p)); out[x.i]=run; }); return out; },
  nPerGroup(d, alpha=0.05, power=0.8){ const z=p=>{ /* inverse normal (Acklam) */ const a=[-39.6968302866538,220.946098424521,-275.928510446969,138.357751867269,-30.6647980661472,2.50662827745924], b=[-54.4760987982241,161.585836858041,-155.698979859887,66.8013118877197,-13.2806815528857], c=[-7.78489400243029e-3,-0.322396458041136,-2.40075827716184,-2.54973253934373,4.37466414146497,2.93816398269878], dd=[7.78469570904146e-3,0.32246712907004,2.445134137143,3.75440866190742]; const pl=0.02425; let q,r;
      if(p<pl){ q=Math.sqrt(-2*Math.log(p)); return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((dd[0]*q+dd[1])*q+dd[2])*q+dd[3])*q+1); }
      if(p>1-pl){ q=Math.sqrt(-2*Math.log(1-p)); return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((dd[0]*q+dd[1])*q+dd[2])*q+dd[3])*q+1); }
      q=p-0.5; r=q*q; return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q/(((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1); };
    if(!(d>0)) return null; return Math.ceil(2*Math.pow(z(1-alpha/2)+z(power),2)/(d*d)); }
};

/* ---------- Segmented controls ---------- */
function segBind(sel, attr, cb){
  const g = $(sel); if(!g) return;
  g.addEventListener("click", e=>{ const b=e.target.closest("button"); if(!b || !g.contains(b)) return; $$("button", g).forEach(x=>{ const on = x===b; x.setAttribute("aria-pressed", on); x.classList.toggle("g", on); }); cb(b.dataset[attr]); });
}
function segSet(sel, attr, val){ $$(sel+" button").forEach(x=>{ const on = x.dataset[attr]===val; x.setAttribute("aria-pressed", on); x.classList.toggle("g", on); }); }

/* Sortable table helper: rows = array of objects, cols = [{k,l,num,fmt}] */
function sortRows(rows, key, dir){ const m = dir==="desc"?-1:1; return rows.slice().sort((a,b)=>{ const x=a[key], y=b[key]; if(x===y) return 0; if(x===null||x===undefined||x==="") return 1; if(y===null||y===undefined||y==="") return -1; return (typeof x==="number"&&typeof y==="number" ? x-y : String(x).localeCompare(String(y)))*m; }); }

/* Lowercase for mid-sentence use, keeping acronyms intact. */
const lc = t => String(t).toLowerCase().replace(/\b(ai|gpus?|cpus?|roi|tco|llms?|hpc|fsi)\b/g, m=>m.toUpperCase().replace(/S$/,"s"));
