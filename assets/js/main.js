/* =========================================================
   Navigation, routing and boot
   ========================================================= */
const GROUPS = [
  {id:"research", n:"Research", views:[
    {id:"overview", n:"Executive Overview", i:"layout-dashboard", init:initOverview},
    {id:"market", n:"Market Intelligence", i:"globe", init:initMarket},
    {id:"compete", n:"Competitive Intelligence", i:"swords", init:initCompete},
    {id:"content", n:"Content Audit", i:"file-search", init:initContent}]},
  {id:"strategy", n:"Product & Strategy", views:[
    {id:"explorer", n:"Infrastructure Explorer", i:"cpu", init:initExplorer},
    {id:"framework", n:"Messaging Framework", i:"message-square-text", init:initFramework},
    {id:"strategy", n:"Strategic Recommendations", i:"file-text", init:initStrategy},
    {id:"assets", n:"Asset Library", i:"library", init:initAssets}]},
  {id:"tools", n:"Interactive Tools", views:[
    {id:"navigator", n:"Value Navigator", i:"compass", init:initNavigator},
    {id:"tco", n:"TCO & ROI Simulator", i:"calculator", init:initTco},
    {id:"messaging", n:"Messaging Studio", i:"pen-line", init:initMessaging},
    {id:"experiment", n:"Messaging Experiment Lab", i:"flask-conical", init:initExperiment}]},
  {id:"docs", n:"Documentation", views:[
    {id:"workflow", n:"AI Workflow", i:"workflow", init:initWorkflow},
    {id:"method", n:"Methodology & Sources", i:"book-open", init:initMethod},
    {id:"about", n:"About the Project", i:"user", init:initAbout}]}
];
const VIEWS = GROUPS.flatMap(g=>g.views.map(v=>({...v, g:g.n})));
const inited = new Set();

/* Data-version guard: clear saved state from the previous app version once. */
if(store.get("schema", 0) < 2){ ["audit","tco","nav","msg","wf","market","compete","explorer","view"].forEach(k=>store.del(k)); store.set("schema", 2); }

const navClosed = new Set(store.get("navClosed", []));
$("#nav").innerHTML = GROUPS.map(g=>`<li class="nav-group ${navClosed.has(g.id)?"closed":""}" data-g="${g.id}"><button class="grp" aria-expanded="${!navClosed.has(g.id)}" aria-controls="grp-${g.id}"><span>${esc(g.n)}</span>${icon("chevron-down")}</button><ul id="grp-${g.id}">${g.views.map(v=>`<li><button class="item" data-view="${v.id}" title="${esc(v.n)}">${icon(v.i)}<span class="lbl">${esc(v.n)}</span></button></li>`).join("")}</ul></li>`).join("");

function show(id, focus=false){
  const v = VIEWS.find(x=>x.id===id) || VIEWS[0];
  $$(".view").forEach(s=>s.classList.toggle("active", s.id==="view-"+v.id));
  $$("#nav button.item").forEach(b=> b.dataset.view===v.id ? b.setAttribute("aria-current","page") : b.removeAttribute("aria-current"));
  const grp = GROUPS.find(g=>g.views.some(x=>x.id===v.id)); const li=$(`.nav-group[data-g="${grp.id}"]`);
  if(li && li.classList.contains("closed")){ li.classList.remove("closed"); li.querySelector(".grp").setAttribute("aria-expanded","true"); navClosed.delete(grp.id); store.set("navClosed",[...navClosed]); }
  $("#viewCrumb").textContent = v.g; $("#viewTitle").textContent = v.n; document.title = `${v.n} · AI Infrastructure Value Navigator`;
  if(!inited.has(v.id)){ inited.add(v.id);
    try{ v.init(); }catch(err){ console.error(err); const b=$(`#view-${v.id} .view-body`); if(b) b.innerHTML = `<div class="callout amber"><b>This section could not load.</b> ${esc(err.message)}. Try "Reset all data" in the top bar; saved data in this browser may be from an older version.</div>`; } }
  Object.values(charts).forEach(c=>{ try{ c.resize(); }catch(e){} });
  store.set("view", v.id);
  if(focus){ $("#main").focus({preventScroll:true}); window.scrollTo(0,0); }
  toggleDrawer(false);
}
$("#nav").addEventListener("click", e=>{
  const g=e.target.closest("button.grp");
  if(g){ const li=g.closest(".nav-group"); const c=li.classList.toggle("closed"); g.setAttribute("aria-expanded", !c); c?navClosed.add(li.dataset.g):navClosed.delete(li.dataset.g); store.set("navClosed",[...navClosed]); return; }
  const b=e.target.closest("button[data-view]"); if(!b) return;
  if(location.hash!=="#/"+b.dataset.view) location.hash="#/"+b.dataset.view; else show(b.dataset.view,true);
});
window.addEventListener("hashchange", ()=> show(location.hash.replace("#/",""), true));
document.addEventListener("click", e=>{ const a=e.target.closest("a[data-src]"); if(!a) return; e.preventDefault(); const id=a.dataset.src; if(location.hash!=="#/method") location.hash="#/method"; else show("method"); setTimeout(()=>focusSource(id), 80); });
function toggleDrawer(open){ $("#app").classList.toggle("nav-open", open); $("#menuBtn").setAttribute("aria-expanded", open); }
$("#menuBtn").onclick = ()=> toggleDrawer(!$("#app").classList.contains("nav-open"));
$("#collapseBtn").onclick = ()=>{ const c=$("#app").classList.toggle("collapsed"); $("#collapseBtn").setAttribute("aria-expanded", !c); $("#collapseBtn").setAttribute("aria-label", c?"Expand sidebar":"Collapse sidebar"); store.set("collapsed", c); setTimeout(()=>Object.values(charts).forEach(ch=>ch.resize()),220); };
if(store.get("collapsed", false)){ $("#app").classList.add("collapsed"); $("#collapseBtn").setAttribute("aria-expanded","false"); }
$("#app").addEventListener("click", e=>{ if($("#app").classList.contains("nav-open") && !e.target.closest(".sidebar") && !e.target.closest("#menuBtn")) toggleDrawer(false); });
$("#resetAllBtn").onclick = ()=> confirmModal("Reset all saved data?", "This clears every saved input, scenario, audit edit, experiment response, log entry and note stored in this browser, then reloads the application with its original data.", "Reset everything", ()=>{ store.clearAll(); location.hash=""; location.reload(); });
$("#modalBg").addEventListener("click", e=>{ if(e.target.id==="modalBg") closeModal(); });
document.addEventListener("keydown", e=>{
  if(e.key==="Escape"){ if($("#modalBg").classList.contains("open")) closeModal(); else if($("#app").classList.contains("nav-open")) toggleDrawer(false); }
  if(e.key==="Tab" && $("#modalBg").classList.contains("open")){
    const f = $$("#modal input,#modal select,#modal textarea,#modal button,#modal a[href]").filter(x=>!x.disabled);
    if(!f.length) return; const first=f[0], last=f[f.length-1];
    if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
});
window.addEventListener("error", e=>{ const n=$("#globalErr"); if(n){ n.hidden=false; n.querySelector("span").textContent = e.message || "Unexpected error"; } });
$("#globalErr button").onclick = ()=>{ $("#globalErr").hidden=true; };

$("#loading").hidden = true;
const start = (location.hash||"").replace("#/","") || store.get("view","overview");
if(!location.hash) history.replaceState(null,"","#/"+start);
show(start);
window.__aivn = {calc, buildBrief, buildMsg, extract, parseCsv, toCsvRows, Stat, auditFindings, realAudit, overall};
