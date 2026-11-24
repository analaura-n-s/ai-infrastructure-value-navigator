/* =========================================================
   RESEARCH LAYER (upgrade, Nov 24, 2026)
   Evidence register, real content audit, strategy, messaging
   framework, asset concepts, experiment design and workflow case.
   Every quantitative statement references a source id in SOURCES.
   ========================================================= */

/* ---------- Additional sources read for the upgrade ---------- */
SOURCES.push(
  {id:"VBP26", title:"VB Pulse AI Infrastructure and Compute Report (October 2026)", pub:"VentureBeat Intelligence", date:"2026-11-06", type:"Industry research", url:"https://venturebeat.com/vb-pulse-infrastructure-and-compute-report", method:"Online survey, October 2026: 172 responses, 156 qualified (87% research panel, 7% VentureBeat email, 6% other). GPU-utilization questions asked of the 128 respondents whose organizations operate GPUs or accelerators. The publisher states the sample is self-selected and results 'may not hold for all enterprises'.", status:"verified"},
  {id:"VB79", title:"AI bubble update: 79% of companies say their GPUs sit idle at least half the time, yet most plan new AI platforms", pub:"VentureBeat (Matt Marshall)", date:"2026-10-23", type:"Industry research", url:"https://venturebeat.com/ai/ai-bubble-update-79-of-companies-say-their-gpus-sit-idle-at-least-half-the-time-yet-most-plan-new-ai-platforms", method:"Pools three monthly VB Pulse surveys (Jul, Aug, Sep 2026; 385 qualified respondents). The 79% figure is 172 of the 218 respondents who reported GPU utilization. Each month is a different self-selected group of readers and panel respondents.", status:"verified"},
  {id:"CLML24", title:"Survey on AI Infrastructure Spotlights GPU Challenges (ClearML, AI Infrastructure Alliance and FuriosaAI)", pub:"insideHPC (press coverage of a ClearML release)", date:"2024-03-13", type:"Industry research (secondary)", url:"https://insidehpc.com/2024/03/survey-on-ai-infrastructure-spotlights-gpu-challenges/", method:"'The State of AI Infrastructure at Scale 2024': responses from AI/ML and technology leaders at 1,000 companies in North America, Europe and Asia Pacific. Fieldwork dates and sampling method not stated in the coverage. Vendor-sponsored.", status:"verified"},
  {id:"AIX26", title:"2026 AI Index Report (Economy and Technical Performance chapters)", pub:"Stanford Institute for Human-Centered AI (HAI)", date:"2026-04", type:"Industry research (secondary)", url:"https://hai.stanford.edu/ai-index/2026-ai-index-report/economy", method:"Annual report that compiles third-party data. Figures quoted here come from chart descriptions on the Economy page and from the Chapter 2 PDF. No date on the pages read; April 2026 is inferred from a linked press article dated Apr 16, 2026. The underlying source of each chart should be checked in the full PDF.", status:"partial"},
  {id:"NVAR26", title:"NVIDIA 2026 Annual Review (CEO letter, proxy statement, Form 10-K cross-reference)", pub:"NVIDIA Corporation", date:"2026-05-12", type:"NVIDIA investor relations", url:"https://s201.q4cdn.com/141608511/files/doc_financials/2026/ar/2026-Annual-Report-Web.pdf", method:"Read the CEO letter and proxy. The bundle does not contain Form 10-K Item 1 (Competition) or Item 1A (Risk Factors); those were not reviewed. Date is the proxy notice date.", status:"verified"},
  {id:"AIE", title:"NVIDIA AI Enterprise", pub:"NVIDIA (product page)", date:"2026-09-17", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/data-center/products/ai-enterprise/", method:"Content audit source. Date from page metadata; no visible date.", status:"verified"},
  {id:"NPN", title:"NVIDIA Partner Network (NPN)", pub:"NVIDIA (program page)", date:"2026-11-16", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/about-nvidia/partners/", method:"Content audit source. Date from page metadata. Tier and CTA details rest partly on the fetch tool's summary of the page tail.", status:"partial"},
  {id:"AMGEN", title:"Enhancing Biologics Discovery and Development With Generative AI (Amgen customer story)", pub:"NVIDIA (case study)", date:"n.d.", type:"NVIDIA case study", url:"https://www.nvidia.com/en-us/case-studies/amgen-biologics-discovery-and-development/", method:"Content audit source. No publication date on the page; outcomes are customer-reported.", status:"partial"},
  {id:"BWA", title:"NVIDIA Blackwell Architecture", pub:"NVIDIA (technology page)", date:"2025-12-18", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/", method:"Content audit source. Date from page metadata.", status:"verified"},
  {id:"BWTB", title:"NVIDIA Blackwell Architecture Technical Overview (technical brief)", pub:"NVIDIA (resource library)", date:"2024-03-26", type:"NVIDIA product documentation", url:"https://resources.nvidia.com/en-us-blackwell-architecture", method:"Opened, but the document viewer showed a password prompt and the brief could not be read. Excluded from scoring.", status:"partial"},
  {id:"WEBP", title:"Watch NVIDIA Webinars (webinar portal)", pub:"NVIDIA", date:"2026-04-29", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/about-nvidia/webinar-portal/", method:"Opened; no readable AI infrastructure session content in the fetched page. Excluded from scoring.", status:"partial"},
  {id:"ODAF", title:"Playlist: AI Factory 2025 (NVIDIA On-Demand)", pub:"NVIDIA On-Demand", date:"2026-03-13", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/on-demand/playlist/playList-bd61ef7b-09e1-4f5c-85ff-6314b494b8d2/", method:"Opened; the session list is rendered by JavaScript and did not load in the fetch. Excluded from scoring.", status:"partial"}
);
SOURCES.forEach(s => { SRC[s.id] = s; });

/* ---------- Evidence status vocabulary ---------- */
const EV = {
  vp:{n:"Verified Primary Source", d:"Read on the publisher's own page or report on Nov 24, 2026."},
  vs:{n:"Verified Secondary Source", d:"Read in a compilation or press coverage of the original research. The original was not read."},
  qa:{n:"Independent Qualitative Assessment", d:"A scored judgement made against the rubric in this project. Not an NVIDIA metric."},
  hy:{n:"Strategic Hypothesis", d:"An interpretation that the evidence suggests but does not prove. Needs testing."},
  il:{n:"Illustrative Assumption", d:"A placeholder value chosen to demonstrate a model. Replace with real data."},
  pv:{n:"Pending Validation", d:"Drafted, but still needs review by the author or a second reviewer, or a source that has not been read."}
};
/* Content-type labels the brief asks for */
const KINDS = {ic:"Verified industry challenge", nv:"NVIDIA-specific observation", hy:"Strategic hypothesis", rf:"Research finding", rc:"Recommendation"};

/* ---------- Glossary (tooltips) ---------- */
const GLOSSARY = {
  "TCO":"Total cost of ownership: purchase plus every running cost over the life of the asset.",
  "NPV":"Net present value: future net cash flows discounted to today, minus the upfront investment.",
  "PUE":"Power usage effectiveness: total facility energy divided by IT equipment energy. 1.0 is the theoretical ideal.",
  "HBM":"High-bandwidth memory stacked next to the GPU. Its capacity and bandwidth limit model size and speed.",
  "NVLink":"NVIDIA's GPU-to-GPU interconnect. A larger NVLink domain lets more GPUs share memory and work as one.",
  "KV cache":"Key-value cache: the stored attention state of a conversation. Reusing it avoids recomputing earlier tokens.",
  "NVFP4":"NVIDIA's 4-bit floating-point format. Vendor PFLOPS figures are often quoted at this precision.",
  "MoE":"Mixture-of-experts: a model design that activates only part of its parameters for each token.",
  "ISL/OSL":"Input and output sequence length, in tokens. Benchmarks depend heavily on these settings.",
  "sparse":"Sparse figures assume structured sparsity and are typically double the dense figure. Compare like with like.",
  "DPU":"Data processing unit: offloads networking, storage and security work from the host CPU.",
  "GPU-hour":"One GPU running for one hour. Productive GPU-hours count only utilized time.",
  "cost per million tokens":"Total serving cost divided by tokens generated, a unit cost for AI output.",
  "Welch t-test":"A two-sample test that does not assume equal variances. Used here to compare Variant A and B means.",
  "95% CI":"95% confidence interval: the range of differences consistent with the data at the 5% level.",
  "Cohen's d":"Standardized effect size: difference in means divided by the pooled standard deviation.",
  "Holm correction":"Adjusts p-values when testing several measures at once, to limit false positives.",
  "Likert":"A 1 to 7 agreement scale. Treated here as approximately interval data, a common but debatable choice.",
  "MDE":"Minimum detectable effect: the smallest true difference the study is powered to detect.",
  "leading indicator":"A metric that moves before the outcome it predicts.",
  "lagging indicator":"A metric that confirms an outcome after it happens."
};

/* =========================================================
   MARKET: evidence register by adoption-gap dimension
   ========================================================= */
const DIMENSIONS = [
  {id:"roi", n:"ROI uncertainty", q:"Can buyers show a financial return on AI infrastructure?"},
  {id:"cost", n:"Acquisition and operating costs", q:"Do costs constrain use, and are they visible?"},
  {id:"util", n:"GPU utilization", q:"Is purchased capacity being used?"},
  {id:"complex", n:"Deployment complexity", q:"How hard is it to move from pilot to production?"},
  {id:"energy", n:"Energy and data center capacity", q:"Can facilities host dense AI systems?"},
  {id:"storage", n:"Storage and networking", q:"Do data movement and memory limit AI workloads?"},
  {id:"talent", n:"Talent shortage", q:"Are there people to build and run the infrastructure?"},
  {id:"align", n:"Technical vs financial priorities", q:"Do technical and finance teams evaluate on the same terms?"},
  {id:"compet", n:"Competitive pressure", q:"How is competition shaping buying criteria?"}
];

/* kind: ic|nv|hy|rf ; ev: vp|vs|qa|hy|pv */
const EVIDENCE = [
  // ROI
  {dim:"roi", kind:"ic", ev:"vp", stat:"37%", claim:"say AI contributed positively to enterprise EBIT; about 6% qualify as AI high performers.", src:"MCK26", sample:"n=1,719, 97 nations, online, May 4 to Jun 8, 2026", lim:"Self-reported; EBIT attribution is the respondent's judgement.", read:"Most organizations using AI cannot yet point to an enterprise-level financial result.", impl:"Lead buyer conversations with how value will be measured, not only with capability."},
  {dim:"roi", kind:"ic", ev:"vp", stat:"21%", claim:"track return on AI infrastructure spend rigorously; 37% partially. 26% judge AI spending by a measured financial return.", src:"VBP26", sample:"n=156 qualified, October 2026", lim:"Self-selected sample of VentureBeat readers and panel members.", read:"Return measurement is the exception in this sample.", impl:"Buyers may need a measurement method before they can use a vendor's ROI claim."},
  {dim:"roi", kind:"rf", ev:"vp", stat:"58 of 64", claim:"companies planning a new AI compute platform had no return-on-investment figure their finance team had reviewed (91%).", src:"VB79", sample:"September 2026 VB Pulse wave", lim:"Small base (64); self-selected. This cuts against the idea that a missing ROI case blocks purchases.", read:"Purchases are planned without a finance-reviewed case, which may shift scrutiny to after deployment.", impl:"Post-purchase value realization content may matter as much as pre-sale ROI claims."},
  {dim:"roi", kind:"ic", ev:"vp", stat:"Time to value", claim:"GenAI leaders report a longer than expected time to value.", src:"DEL25", sample:"n=2,773 director to C-suite, 14 countries", lim:"Press-release summary; fieldwork window needs checking against the full report.", read:"Delay, not only size of return, shapes the ROI question.", impl:"Payback timing deserves as much attention as total return in CFO content."},
  // Cost
  {dim:"cost", kind:"ic", ev:"vp", stat:"~1 in 5", claim:"say AI operating costs, including tokens, constrain their use of AI.", src:"MCK26", sample:"n=1,719", lim:"Self-reported constraint; the question wording was not reviewed.", read:"Running cost, not only purchase cost, limits use.", impl:"Cost per million tokens is a natural bridge between engineering and finance."},
  {dim:"cost", kind:"ic", ev:"vp", stat:"71% vs 44%", claim:"track total AI inference and API spend, but only 44% track per-unit inference cost.", src:"DEL26", sample:"n=3,500 senior leaders", lim:"Publication and fieldwork dates not shown on the page.", read:"Organizations see the bill but not the unit economics.", impl:"A unit-cost method is a gap vendors can help fill."},
  {dim:"cost", kind:"rf", ev:"vp", stat:"38%", claim:"delayed, scaled back or canceled an AI project because it cost more than planned.", src:"VBP26", sample:"n=156 qualified, October 2026", lim:"Self-selected sample.", read:"Cost overruns already change project decisions in this sample.", impl:"Forecastable cost, not only lower cost, is a value message."},
  // Utilization
  {dim:"util", kind:"rf", ev:"vp", stat:"57%", claim:"of respondents running GPUs say those chips sit idle at least half the time; 33% say they don't measure utilization; 23% use continuous fleet telemetry.", src:"VBP26", sample:"Base n=128 organizations operating GPUs, October 2026", lim:"Self-selected. The pooled July to September figure was 79%, so estimates vary widely by wave.", read:"Reported idle time is high, and a third cannot answer the question.", impl:"Utilization is a measurement problem before it is a hardware problem."},
  {dim:"util", kind:"rf", ev:"vp", stat:"79%", claim:"of 218 respondents who reported GPU utilization said GPUs are busy half the time or less (pooled Jul to Sep 2026).", src:"VB79", sample:"385 qualified respondents across three monthly surveys", lim:"Different self-selected group each month; not comparable with the October 57%.", read:"Treat as a directional signal, not an industry benchmark.", impl:"Avoid citing a single 'idle GPU' statistic without its base and method."},
  {dim:"util", kind:"ic", ev:"vs", stat:"42%", claim:"of companies can manage dynamic MIG/GPU partitioning to optimize utilization; most report GPUs underutilized during peak times.", src:"CLML24", sample:"1,000 companies, NA/EU/APAC, 2024", lim:"Vendor-sponsored; reported through press coverage; fieldwork dates not stated; 2024.", read:"Older, independent signal pointing the same way.", impl:"Orchestration and scheduling capabilities are part of the value story."},
  {dim:"util", kind:"nv", ev:"vp", stat:"Up to 5x", claim:"NVIDIA AI Enterprise page: 'Maximize GPU utilization up to 5x by dynamically adapting compute across workloads.' No baseline stated.", src:"AIE", sample:"Vendor claim", lim:"No baseline or workload on the page.", read:"NVIDIA already recognizes utilization as a buyer concern.", impl:"Pair the claim with a measurement method buyers can apply to their own fleet."},
  // Complexity
  {dim:"complex", kind:"ic", ev:"vp", stat:"44%", claim:"say AI is scaling across the enterprise, up from 38%. At $1B+ organizations 54%, versus about one-third of smaller ones.", src:"MCK26", sample:"n=1,719", lim:"'Scaling' is respondent-defined.", read:"Most adopters are not yet at enterprise scale, and size matters.", impl:"Smaller organizations may need a different entry path than rack-scale systems."},
  {dim:"complex", kind:"ic", ev:"vp", stat:">2/3", claim:"of GenAI leaders expected 30% or fewer of their experiments to be fully scaled in the next 3 to 6 months.", src:"DEL25", sample:"n=2,773", lim:"Survey wave from 2024; press summary.", read:"The pilot-to-production gap is long-standing.", impl:"Staged evaluation and reference designs address the transition."},
  {dim:"complex", kind:"nv", ev:"vp", stat:"Quote", claim:"NVIDIA CEO letter: 'Land, power, cooling, networking, and systems must scale in parallel.'", src:"NVAR26", sample:"Company statement", lim:"Vendor framing.", read:"NVIDIA describes the buildout as a multi-system coordination problem.", impl:"Buyers coordinating many teams may need a shared planning artifact."},
  {dim:"complex", kind:"nv", ev:"vp", stat:"Quote", claim:"DGX SuperPOD page positions the product so enterprises can build applications 'rather than struggling with platform complexity'.", src:"SPOD", sample:"Vendor copy", lim:"Marketing statement.", read:"Complexity is an acknowledged objection.", impl:"Proof of reduced complexity (time to first job, staff needed) is rarely quantified."},
  // Energy
  {dim:"energy", kind:"ic", ev:"vp", stat:"10 to 30 kW", claim:"Most rack densities remain in the 10 to 30 kW range, with few facilities above 30 kW. Average PUE has shown little change for the sixth consecutive year.", src:"UPT25", sample:"Annual operator survey", lim:"Respondent count and exact PUE value not visible in the public summary.", read:"Typical facilities are far from the density of liquid-cooled rack-scale AI systems.", impl:"Facility readiness is part of the sale, not a later engineering detail."},
  {dim:"energy", kind:"nv", ev:"vp", stat:"Quote", claim:"NVIDIA DSX release: 'Energy is now the biggest bottleneck for AI infrastructure buildouts', citing over $300 billion in equipment backlogs and more than 200 gigawatts of projects in U.S. interconnection queues.", src:"DSX", sample:"Vendor statement", lim:"The market figures are not sourced on the page.", read:"NVIDIA frames energy as the gating resource.", impl:"Tokens per megawatt is a credible metric for operators; cite independent energy data next to it."},
  {dim:"energy", kind:"ic", ev:"pv", stat:"Pending", claim:"IEA 'Energy and AI' projections of data center electricity demand.", src:"", sample:"", lim:"The IEA executive summary could not be retrieved in this session.", read:"Not used until read.", impl:"Author to read the IEA report and add its figures with page references."},
  // Storage & networking
  {dim:"storage", kind:"nv", ev:"vp", stat:"Quote", claim:"BlueField-4 release: 'A KV cache cannot be stored on GPUs long term, as this would create a bottleneck for real-time inference.'", src:"BF4PR", sample:"Vendor statement", lim:"Problem statement from the vendor that sells the solution.", read:"Long-context and agentic inference create a new memory-tier problem.", impl:"Needs independent workload evidence before it is used as an industry-wide claim."},
  {dim:"storage", kind:"nv", ev:"vp", stat:"Up to 15x", claim:"Vera Rubin page: 'Agentic systems consume up to 15x more tokens than traditional AI applications.' Basis not stated.", src:"VR", sample:"Vendor claim", lim:"No method or source on the page.", read:"Token growth is the premise of NVIDIA's storage and networking story.", impl:"Treat as NVIDIA's view until an independent measure is found."},
  {dim:"storage", kind:"hy", ev:"hy", stat:"Hypothesis", claim:"Network and storage bottlenecks lower effective GPU utilization, which links this dimension to ROI.", src:"", sample:"", lim:"No independent survey read on this link.", read:"Plausible mechanism; not measured here.", impl:"A buyer-facing utilization model should include network and storage stalls."},
  // Talent
  {dim:"talent", kind:"ic", ev:"vp", stat:"~2/3", claim:"of data center operators report difficulty retaining staff, finding qualified candidates, or both.", src:"UPT25", sample:"Annual operator survey", lim:"Facilities staff, not AI/ML engineers.", read:"Physical infrastructure skills are scarce.", impl:"Partner-delivered deployment and managed options reduce the skills burden."},
  {dim:"talent", kind:"hy", ev:"hy", stat:"Hypothesis", claim:"MLOps and inference-optimization skills (serving, quantization, KV-cache management) are scarce, which limits achieved utilization.", src:"", sample:"", lim:"No verified survey read; ClearML's 42% partitioning figure is an indirect signal.", read:"Plausible; needs evidence.", impl:"Enablement content for platform teams may help raise achieved utilization already purchased."},
  // Alignment
  {dim:"align", kind:"rf", ev:"vp", stat:"34%", claim:"of respondents who track AI return name a figure their finance organization has reviewed and signed off.", src:"VBP26", sample:"Subset of n=156 who track return", lim:"Self-selected; small subset.", read:"Technical and finance views of value are often not reconciled.", impl:"Shared metrics (cost per productive GPU-hour, cost per million tokens) can align both."},
  {dim:"align", kind:"hy", ev:"hy", stat:"Hypothesis", claim:"Technical evaluators judge throughput and latency, while finance judges payback and risk; vendor content serves the first group better.", src:"", sample:"", lim:"Supported only by this project's content audit of 19 pages (see Content Audit).", read:"Consistent with the audit; not tested with buyers.", impl:"Test with CFO and procurement interviews before acting."},
  // Competitive
  {dim:"compet", kind:"ic", ev:"vs", stat:"Quote", claim:"AI Index Chapter 2: 'competitive pressure is shifting toward cost, reliability, and real-world usefulness.'", src:"AIX26", sample:"Report narrative (model performance context)", lim:"Refers to AI models, not infrastructure vendors.", read:"Buyers may judge AI on practical economics more than peak capability.", impl:"Infrastructure messaging that leads with cost and reliability fits this shift."},
  {dim:"compet", kind:"ic", ev:"vs", stat:"$581.69B", claim:"global corporate AI investment in 2025 (private investment $344.66B; U.S. $285.88B).", src:"AIX26", sample:"Compiled third-party data", lim:"Figure from chart description; underlying source not checked.", read:"Investment is large and growing, so scrutiny of returns will grow too.", impl:"CFO-grade evidence becomes a differentiator as budgets rise."},
  {dim:"compet", kind:"nv", ev:"vp", stat:"$193.7B", claim:"NVIDIA fiscal 2026 Data Center revenue, up 68%; Q4 Data Center revenue $62.3B, up 75% year over year.", src:"NVIR26", sample:"Company results", lim:"Demand context only; says nothing about enterprise ROI.", read:"Demand is strong today; the question is durability as buyers seek returns.", impl:"Value realization content protects future demand."},
  {dim:"compet", kind:"ic", ev:"vp", stat:"4 vendors", claim:"Alternatives documented in this project: AMD Instinct MI355X (ROCm), Google Cloud TPU7x, AWS Trainium3 and Inferentia2.", src:"AMD355", sample:"Vendor documentation", lim:"No pricing, market share or head-to-head benchmark is claimed.", read:"Buyers have credible alternatives, some only through one cloud.", impl:"See Competitive Intelligence. NVIDIA's 10-K Competition section is still to be read."}
];

/* =========================================================
   CONTENT AUDIT: real dataset (19 scored assets)
   Every record was opened on Nov 24, 2026 by an automated
   fetch requested by Claude during this build. Scores are an
   independent qualitative assessment, pending validation by
   the author. Quotes are verbatim and short.
   ========================================================= */
const CA_AUDIENCES = ["CEO","CFO","CTO","AI engineers","Data center operators","Procurement","Cloud service providers","Enterprise technology leaders"];
const CA_FORMATS = ["Product page","Solution page","Press release","Technical blog","Case study","Program page"];
const CA_PRODUCTS = ["Blackwell","Vera Rubin","HGX","AI factory","Networking","Storage","CPU","Software","Partners"];
const CA_PAINS = ["ROI uncertainty","Acquisition and operating costs","GPU utilization","Deployment complexity","Energy and data center capacity","Storage and networking","Talent shortage","Technical vs financial priorities","Competitive pressure","Performance and scale"];
const CA_ROI = ["None","Qualitative only","Quantified, no stated basis","Quantified with stated basis","Customer or partner outcome"];
const CA_CTA = ["Contact sales","Trial or get started","Find a partner","Read more or datasheet","Text link only"];
const RUBRIC = [
  {k:"clarity", n:"Messaging clarity", a:["No clear statement of what it is or for whom","What it is is clear; value must be inferred","Clear statement of what it is and its main benefit","Clear value statement naming the problem","One-sentence value proposition naming audience, problem and outcome"]},
  {k:"relevance", n:"Audience relevance", a:["No identifiable audience","Audience implied; content mixed across groups","Audience implied and mostly consistent","Explicit audience; most content serves them","Explicit audience; content answers their decision criteria"]},
  {k:"bizValue", n:"Business value", a:["No business outcome stated","Generic outcome words (efficiency, ROI) only","Outcomes named qualitatively","Outcome quantified as a relative business metric (e.g. cost per token)","Quantified financial outcome with stated basis (TCO, payback, $)"]},
  {k:"techCred", n:"Technical credibility", a:["No specifications","Capabilities described, no specifications","Specifications in prose, no footnotes","Specifications plus some test conditions","Specification tables and footnoted test configurations"]},
  {k:"evidence", n:"Evidence quality", a:["Claims with no baseline or source","Generic baselines ('traditional'); no conditions","Some claims footnoted, others not","Most claims have baseline and conditions, or named customers","All quantified claims have baseline, workload, configuration and date, plus third-party or customer proof"]},
  {k:"compDiff", n:"Competitive differentiation", a:["No differentiation stated","Generic or unsubstantiated superiority claim","Quantified versus own prior generation or an unnamed generic baseline","Quantified versus a named category or alternative buyers consider, with conditions","Substantiated comparison with named alternatives, with method"]},
  {k:"action", n:"Actionability", a:["No next step","Text links only, or a stale CTA","Generic CTAs (Learn more) or many competing CTAs","Clear next step for one stage of the buying journey","Clear next step matched to the reader's stage (calculator, sizing, sales)"]}
];
const CA_FIELDS = ["id","title","url","date","dateBasis","format","audience","audiences","product","pains","vp","complexity","bizClarity","roiEvidence","compDiffNote","ctaType","cta","excerpts","observations","opportunities","issues","partial","clarity","relevance","bizValue","techCred","evidence","compDiff","action","validated","analystNote"];

const CA_REAL = [
 {id:"a01", src:"GB200", title:"NVIDIA GB200 NVL72", format:"Product page", audience:"CTO", audiences:["AI engineers","Data center operators"], product:"Blackwell", pains:["Performance and scale","Energy and data center capacity"],
  vp:"\"delivers 30x faster real-time trillion-parameter large language model (LLM) inference\"", complexity:5, bizClarity:2, roiEvidence:"Quantified, no stated basis",
  compDiffNote:"Versus NVIDIA H100 (footnoted). 'The largest NVIDIA NVLink domain ever offered' has no external baseline.", ctaType:"Read more or datasheet", cta:"Read Datasheet; Notify Me",
  excerpts:["\"The NVIDIA GB200 NVL72 is an exascale computer in a single rack.\"","\"deliver a 5x better TCO\" (Data Processing section)"],
  observations:["Spec table with sparse and dense footnotes; benchmark footnotes state TTL, FTL and sequence lengths.","The '5x better TCO' claim sits next to a footnote that describes query speed, not a TCO method.","Newsletter block still reads 'Sign up to hear when NVIDIA Blackwell becomes available' on a page updated Aug 27, 2026."],
  opportunities:["Publish the TCO method behind '5x better TCO'.","Replace the stale availability sign-up with a sizing or sales path."],
  issues:["Stale CTA","Claim without method"], scores:[3,4,2,5,4,3,2]},
 {id:"a02", src:"VR", title:"NVIDIA Vera Rubin NVL72", format:"Product page", audience:"Cloud service providers", audiences:["Enterprise technology leaders","CTO"], product:"Vera Rubin", pains:["Acquisition and operating costs","Performance and scale"],
  vp:"\"AI training with one-fourth the GPUs and AI inference at one-tenth the cost per million tokens versus NVIDIA Blackwell.\"", complexity:5, bizClarity:4, roiEvidence:"Quantified with stated basis",
  compDiffNote:"Versus GB200 NVL72 (Kimi-K2-Thinking, 32K/8K ISL/OSL; projected). '35x higher throughput per megawatt' has no named baseline.", ctaType:"Contact sales", cta:"View Datasheet; Contact Sales",
  excerpts:["\"one-tenth the cost per million tokens compared to NVIDIA GB200 NVL72 for highly interactive, deep reasoning agentic AI\"","\"Agentic systems consume up to 15x more tokens than traditional AI applications.\""],
  observations:["Leads with a unit-cost metric (cost per million tokens), the most business-oriented hero in the sample.","Baseline wording differs: 'versus NVIDIA Blackwell' in the overview, 'compared to NVIDIA GB200 NVL72' in the chart.","Body copy targets 'AI labs, cloud providers, and hyperscalers'; the meta description says 'enterprise rack-scale AI platform'.","'Available Now' badge, while the May 31 release said production shipments begin 'this fall'."],
  opportunities:["Use one baseline name everywhere ('GB200 NVL72').","Add a worked dollar example with editable assumptions for enterprise buyers."],
  issues:["Baseline inconsistency","Audience mismatch","Availability ambiguity"], scores:[4,3,4,5,4,3,4]},
 {id:"a03", src:"HGX", title:"NVIDIA HGX Platform", format:"Product page", audience:"CTO", audiences:["Cloud service providers"], product:"HGX", pains:["Performance and scale","GPU utilization"],
  vp:"\"Supercharging AI and high-performance computing for every data center.\"", complexity:5, bizClarity:3, roiEvidence:"Qualitative only",
  compDiffNote:"'Up to 10x more token factory throughput versus HGX B200'; the footnote compares Rubin sparse NVFP4 with B200 dense NVFP4.", ctaType:"Read more or datasheet", cta:"Explore Systems",
  excerpts:["\"This leap in performance allows AI factories to serve more users, maximize token revenue, and lower cost per token.\""],
  observations:["Deep spec tables with footnoted chart bases.","Headline ratio compares sparse with dense precision; disclosed in the footnote but not in the headline.","Token revenue and cost per token are named but not quantified."],
  opportunities:["Show the like-for-like (dense vs dense) ratio next to the headline.","Add a cost-per-token example for OEM buyers."],
  issues:["Precision mismatch in headline ratio"], scores:[3,3,3,5,3,3,3]},
 {id:"a04", src:"AIF", title:"AI Factories (solutions hub)", format:"Solution page", audience:"Enterprise technology leaders", audiences:["CTO","Data center operators"], product:"AI factory", pains:["Deployment complexity","Performance and scale"],
  vp:"\"Accelerate and deploy full-stack AI infrastructure and software purpose-built for AI factories.\"", complexity:2, bizClarity:3, roiEvidence:"Qualitative only",
  compDiffNote:"'Unlike traditional data centers'; Rubin offers 'more tokens per watt and lower cost per token than the NVIDIA Blackwell generation' (no figure).", ctaType:"Read more or datasheet", cta:"Read Purchasing Guide (plus 13 other CTAs)",
  excerpts:["\"Unlike traditional data centers, AI factories are purpose-built to manufacture intelligence at scale.\"","\"reducing planning times by over 95% percent\""],
  observations:["The only customer example is NVIDIA's own IT organization.","Copy error: '95% percent'.","Fourteen CTAs and no routing by buyer type (enterprise, sovereign, cloud).","'Maximizing ROI' appears without a figure."],
  opportunities:["Add role-based entry points (CFO, operator, architect).","Add one external customer outcome with a stated basis."],
  issues:["Copy error","Self-referential proof"], scores:[3,3,3,2,2,2,3]},
 {id:"a05", src:"SPOD", title:"NVIDIA DGX SuperPOD", format:"Product page", audience:"Enterprise technology leaders", audiences:["CTO"], product:"AI factory", pains:["Deployment complexity"], partial:true,
  vp:"\"provides leadership-class AI infrastructure with agile, scalable performance for the most challenging AI training and inference workloads\"", complexity:3, bizClarity:3, roiEvidence:"Customer or partner outcome",
  compDiffNote:"'outperforming all other AI infrastructure options at scale in MLPerf benchmarks' with no footnote or named benchmark.", ctaType:"Contact sales", cta:"Talk to Us",
  excerpts:["\"enables every enterprise to integrate AI into their business and create innovative applications rather than struggling with platform complexity\"","University of Florida \"has served nearly 7,000 users and processed over 33 million research requests in the past year\""],
  observations:["Eight named customers with attributed testimonials (BNY, MITRE, SoftBank, University of Florida and others).","Customer outcomes are usage counts, not cost or return.","NVIDIA Eos is '#10 in the TOP500' in one block and '#9' in two others.","A Mission Control 'Learn More' link points to '#'."],
  opportunities:["Add one cost or time-to-value outcome to the customer stories.","Footnote the MLPerf claim with round and benchmark."],
  issues:["Fact inconsistency","Dead link","Unfootnoted superlative"], scores:[3,4,3,3,3,2,4]},
 {id:"a06", src:"CMX", title:"NVIDIA CMX Context Memory Storage Platform", format:"Product page", audience:"CTO", audiences:["Data center operators"], product:"Storage", pains:["Storage and networking","Energy and data center capacity"],
  vp:"\"Rearchitecting inference storage for the next frontier of AI.\"", complexity:4, bizClarity:2, roiEvidence:"Qualitative only",
  compDiffNote:"'up to 5x higher throughput and up to 5x better power efficiency' versus 'general-purpose storage approaches'; basis in a linked solution overview.", ctaType:"Contact sales", cta:"Read the Solution Overview; Contact Sales (10 CTAs)",
  excerpts:["\"Scale AI services with a highly efficient, KV-cache-optimized storage tier that reclaims essential power.\""],
  observations:["Fifteen partner logos, no named customer or deployment.","Core evidence sits in a linked document, not on the page."],
  opportunities:["Bring the test conditions for the 5x figures onto the page.","Explain the KV-cache problem in business terms (idle GPUs while context reloads)."],
  issues:["Generic baseline"], scores:[3,4,2,3,2,3,3]},
 {id:"a07", src:"SPX", title:"NVIDIA Spectrum-X Ethernet Platform", format:"Product page", audience:"Cloud service providers", audiences:["CTO"], product:"Networking", pains:["Storage and networking","Performance and scale"],
  vp:"\"Accelerate AI network performance by 1.6x over off-the-shelf (OTS) Ethernet.\"", complexity:5, bizClarity:2, roiEvidence:"None",
  compDiffNote:"1.6x versus off-the-shelf Ethernet (conditions in a linked whitepaper). 'The World's First Ethernet Networking Platform for AI' is unqualified.", ctaType:"Trial or get started", cta:"Get Started (DSX Air free trial); Read Whitepaper",
  excerpts:["\"The network is ultimately responsible for AI performance, acting as the backbone of the data center.\"","\"designed for cloud service providers and large enterprises running multi-tenant AI workloads at hyperscale\""],
  observations:["States its audience explicitly in the FAQ.","Names a baseline category buyers actually consider (standard Ethernet).","'1.9x higher NCCL performance' has no stated baseline.","Partners section appears twice."],
  opportunities:["Translate 1.6x network performance into GPU utilization or job-time terms.","Qualify 'World's First'."],
  issues:["Unqualified superlative","Duplicate section"], scores:[4,4,2,4,3,4,3]},
 {id:"a08", src:"CPU", title:"NVIDIA CPU Platforms (Grace and Vera)", format:"Product page", audience:"AI engineers", audiences:["Data center operators"], product:"CPU", pains:["Performance and scale"],
  vp:"\"NVIDIA Vera is the CPU for agents and the max single-threaded CPU at scale.\"", complexity:4, bizClarity:2, roiEvidence:"None",
  compDiffNote:"'up to 2x performance on critical agentic workloads' and 'twice the performance at the same power as leading traditional CPUs', no baseline named.", ctaType:"Read more or datasheet", cta:"Learn More (several variants)",
  excerpts:["\"Vera pairs with NVIDIA GPUs as the host CPU for accelerated systems or runs independently across the data center.\""],
  observations:["URL and title say Grace; the page leads with Vera.","No benchmark footnotes or customer proof."],
  opportunities:["Align page naming with the product it leads with.","Name the CPU baseline behind the 2x claims."],
  issues:["Naming inconsistency","Claim without baseline"], scores:[2,3,2,3,2,3,2]},
 {id:"a09", src:"DYN", title:"NVIDIA Dynamo", format:"Product page", audience:"AI engineers", audiences:["Cloud service providers"], product:"Software", pains:["Acquisition and operating costs","Performance and scale"], partial:true,
  vp:"\"Scale and serve AI inference—fast.\"", complexity:4, bizClarity:3, roiEvidence:"Qualitative only",
  compDiffNote:"'up to 7x compared to NVIDIA B200-based systems' (independent benchmarks, no link) and elsewhere 'up to 15x compared to Hopper-based systems'.", ctaType:"Trial or get started", cta:"Get Started (GitHub)",
  excerpts:["\"NVIDIA Dynamo is an open source, distributed inference-serving framework built to deploy models in multi-node environments.\"","Heading: \"Increase Inference Serving Capacity While Reducing Costs\""],
  observations:["Named customer testimonials (CoreWeave, Together AI).","Two different multipliers and baselines for the same idea (7x vs B200, 15x vs Hopper).","'Reducing Costs' heading with no cost figure."],
  opportunities:["Reconcile the 7x and 15x claims with one clearly footnoted comparison.","Add a cost-per-token example from a named customer."],
  issues:["Baseline inconsistency"], scores:[4,4,3,3,3,3,4]},
 {id:"a10", src:"NIM", title:"NVIDIA NIM for Developers", format:"Product page", audience:"AI engineers", audiences:[], product:"Software", pains:["Deployment complexity"],
  vp:"\"NVIDIA NIM™ provides containers to self-host GPU-accelerated inferencing microservices for pretrained and customized AI models\"", complexity:3, bizClarity:2, roiEvidence:"None",
  compDiffNote:"None with a named baseline.", ctaType:"Trial or get started", cta:"Try APIs; Get Started With NIM",
  excerpts:["\"Get free access to NIM API endpoints for unlimited prototyping, powered by DGX Cloud.\""],
  observations:["Clear developer audience and trial path.","'Optimized' and 'low-latency, high-throughput' have no evidence on the page.","Two 'Explore NVIDIA Blueprints' buttons lead to different places."],
  opportunities:["Add one reproducible performance example.","Deduplicate CTAs."],
  issues:["Duplicate CTA"], scores:[4,5,2,2,1,1,4]},
 {id:"a11", src:"VRPR", title:"NVIDIA Vera Rubin Ramps Into Full Production to Power Agentic AI Factories Worldwide", format:"Press release", audience:"Cloud service providers", audiences:["Enterprise technology leaders"], product:"Vera Rubin", pains:["Performance and scale"],
  vp:"\"Vera Rubin delivers the POD-scale foundation for next-generation AI factories.\"", complexity:3, bizClarity:2, roiEvidence:"None",
  compDiffNote:"'10x agent throughput at scale compared with the previous-generation NVIDIA Grace Blackwell platform' with no workload or configuration.", ctaType:"Text link only", cta:"Watch keynote; Download Press Release",
  excerpts:["\"Vera Rubin delivers 10x agent throughput at scale compared with the previous-generation NVIDIA Grace Blackwell platform.\"","\"AI factories are increasingly processing proprietary data, regulated content and mission-critical models in agentic workflows.\""],
  observations:["Production shipments 'set to begin starting this fall'; no visible status update as of Nov 2026.","Ecosystem logos only; no customer outcomes.","'Groq 3 LPX' named without explanation."],
  opportunities:["Footnote the 10x claim.","Publish an availability update for enterprise buyers."],
  issues:["Claim without configuration","Availability ambiguity"], scores:[4,3,2,2,2,3,2]},
 {id:"a12", src:"DSX", title:"NVIDIA Releases Vera Rubin DSX AI Factory Reference Design and Omniverse DSX Digital Twin Blueprint", format:"Press release", audience:"Data center operators", audiences:["Cloud service providers"], product:"AI factory", pains:["Energy and data center capacity","Deployment complexity"],
  vp:"\"maximum token per watt and accelerated time to first production\"", complexity:3, bizClarity:3, roiEvidence:"Customer or partner outcome",
  compDiffNote:"Implicit baseline 'Traditional design methods'; no figures.", ctaType:"Text link only", cta:"Omniverse DSX Blueprint link; Watch the GTC keynote",
  excerpts:["\"Energy is now the biggest bottleneck for AI infrastructure buildouts\"","\"In the age of AI, intelligence tokens are the new currency, and AI factories are the infrastructure that generates them\""],
  observations:["The only asset in the sample aimed at facility and energy stakeholders.","Market figures ($300B backlog, 200 GW queues) have no source on the page.","Partner claim: Phaidra 'about 10% more compute by reducing cooling spikes'.","The reference design document is mentioned but not linked; naming alternates 'Vera Rubin DSX' and 'Rubin DSX'."],
  opportunities:["Link the reference design itself.","Source the market figures."],
  issues:["Unsourced statistic","Naming inconsistency","Missing link"], scores:[3,4,3,2,2,2,2]},
 {id:"a13", src:"BF4PR", title:"NVIDIA BlueField-4 Powers New Class of AI-Native Storage Infrastructure", format:"Press release", audience:"CTO", audiences:["Data center operators"], product:"Storage", pains:["Storage and networking"],
  vp:"\"boosting tokens per seconds and power efficiency by up to 5x\"", complexity:4, bizClarity:2, roiEvidence:"None",
  compDiffNote:"'up to 5x greater power efficiency compared with traditional storage', basis not stated.", ctaType:"Text link only", cta:"Download Press Release",
  excerpts:["\"A KV cache cannot be stored on GPUs long term, as this would create a bottleneck for real-time inference\""],
  observations:["Clear problem statement for a technical reader.","Product named 'Inference Context Memory Storage Platform' here and 'CMX' elsewhere.","Availability 'in the second half of 2026' with no visible update."],
  opportunities:["Unify product naming across press, blog and product page."],
  issues:["Naming inconsistency","Claim without basis"], scores:[3,3,2,2,2,3,2]},
 {id:"a14", src:"GB200B", title:"NVIDIA GB200 NVL72 Delivers Trillion-Parameter LLM Training and Real-Time Inference", format:"Technical blog", audience:"AI engineers", audiences:["CTO"], product:"Blackwell", pains:["Performance and scale","Acquisition and operating costs"],
  vp:"\"It delivers a 30x speedup for resource-intensive applications like the 1.8T parameter GPT-MoE\"", complexity:5, bizClarity:2, roiEvidence:"Quantified, no stated basis",
  compDiffNote:"Named baselines: H100, Sapphire Rapids x86 CPUs, PCIe Gen5; footnoted configurations for inference and Cadence workloads.", ctaType:"Read more or datasheet", cta:"Explore the NVIDIA GB200 NVL72",
  excerpts:["\"This reduces the communications overhead experienced when scaling over traditional networks.\"","\"delivering 25x lower cost and energy consumption\""],
  observations:["The only asset with footnoted benchmark configurations for several claims.","Published Mar 18, 2024 with no visible refresh.","'25x lower cost' has no baseline; the 4x training claim has no footnote."],
  opportunities:["Refresh with current results or mark as historical.","Add the basis for the cost claim."],
  issues:["Dated content","Claim without basis"], scores:[4,5,2,5,4,4,3]},
 {id:"a15", src:"CMXB", title:"Introducing NVIDIA BlueField-4-Powered CMX Context Memory Storage Platform", format:"Technical blog", audience:"CTO", audiences:["AI engineers"], product:"Storage", pains:["Storage and networking","Acquisition and operating costs"],
  vp:"\"AI‑native organizations increasingly face scaling challenges as agentic AI workflows drive context windows to millions of tokens.\"", complexity:5, bizClarity:2, roiEvidence:"Qualitative only",
  compDiffNote:"'5x more power efficient than traditional storage' and 'up to 5x higher sustained TPS'; unnamed baselines; x86 controllers mentioned.", ctaType:"Read more or datasheet", cta:"Review the solution overview",
  excerpts:["\"forcing AI providers to choose between scarce GPU high‑bandwidth memory (HBM) and general‑purpose storage tiers\"","\"This tier acts as the agentic long‑term memory of the AI infrastructure pod\""],
  observations:["Strong conceptual explanation (G1 to G4 memory hierarchy, new G3.5 tier).","'Improve total cost of ownership' with no figure.","Visible 'Updated on March 16, 2026' conflicts with page metadata (Apr 2, 2026)."],
  opportunities:["Add capacity and bandwidth figures.","Connect the memory-tier story to cost per token."],
  issues:["Date inconsistency","Naming inconsistency"], scores:[4,4,2,4,2,3,3]},
 {id:"a16", src:"AIE", title:"NVIDIA AI Enterprise", format:"Product page", audience:"AI engineers", audiences:["Enterprise technology leaders"], product:"Software", pains:["Deployment complexity","GPU utilization"],
  vp:"\"The Reliable and Secure Path for AI in Production\"", complexity:3, bizClarity:3, roiEvidence:"Quantified, no stated basis",
  compDiffNote:"'up to 10x' GPU availability, 'up to 5x' utilization, 'up to 20x' throughput, with no baselines.", ctaType:"Trial or get started", cta:"Request a Free 90-Day License; Get Started",
  excerpts:["\"Increase AI workload throughput by up to 20x on existing infrastructure.\"","\"Try it for free through a web browser or via NVIDIA-hosted AI APIs.\""],
  observations:["Addresses utilization directly, one of only two assets that do.","Three customer cards with one-line summaries.","Strong developer trial path; enterprise buyer proof is thin."],
  opportunities:["State the baseline for each 'up to' multiplier.","Add a utilization case with before and after measurement."],
  issues:["Claims without baseline"], scores:[4,3,3,2,2,2,4]},
 {id:"a17", src:"NPN", title:"NVIDIA Partner Network (NPN)", format:"Program page", audience:"Procurement", audiences:[], product:"Partners", pains:["Deployment complexity"], partial:true,
  vp:"\"Join the NVIDIA partner program or find an experienced partner.\" (meta description)", complexity:1, bizClarity:2, roiEvidence:"None",
  compDiffNote:"'Proven architectures' and reduced 'complexity' (from the page summary), unsourced.", ctaType:"Find a partner", cta:"Find a Partner; NPN Portal",
  excerpts:["\"Benefits include sales and distribution, training, marketing, service, and support.\" (meta description)"],
  observations:["Clear buyer path to find a partner.","No customer proof or partner outcome data.","Tier details (Registered, Preferred, Elite) rest on a summary of the page."],
  opportunities:["Show what a partner-led deployment delivers (time, staffing).","Link partner specializations to buyer problems (AI factory, agentic AI)."],
  issues:[], scores:[3,3,2,1,1,2,4]},
 {id:"a18", src:"AMGEN", title:"Enhancing Biologics Discovery and Development With Generative AI (Amgen)", format:"Case study", audience:"Enterprise technology leaders", audiences:["AI engineers"], product:"Software", pains:["Acquisition and operating costs","Performance and scale"],
  vp:"\"Using NVIDIA DGX™ Cloud and BioNeMo™, Amgen trains large language models (LLMs) on their proprietary data\"", complexity:4, bizClarity:4, roiEvidence:"Customer or partner outcome",
  compDiffNote:"'up to 100X faster post-training analysis' relative to unnamed 'alternative platforms'; '20–30X' versus Amgen's internal version.", ctaType:"Text link only", cta:"Contact us (text only)",
  excerpts:["\"Less than four weeks from onboarding on DGX Cloud to the first pretrained protein LLM model\"","\"BioNeMo on DGX Cloud is a turnkey solution—our users only need to supply data\""],
  observations:["Named customer and named spokesperson with time-based outcomes, the strongest proof in the sample.","No publication date; the A100-based setup may be dated relative to current messaging.","Framed around lower cost, but gives no cost figures."],
  opportunities:["Date the story and add a cost or capacity outcome.","Use this structure as a template for infrastructure case studies."],
  issues:["Undated","Unnamed baseline"], scores:[4,4,4,4,4,3,2]},
 {id:"a19", src:"BWA", title:"NVIDIA Blackwell Architecture", format:"Product page", audience:"CTO", audiences:["Enterprise technology leaders"], product:"Blackwell", pains:["Performance and scale"],
  vp:"\"The engine behind AI factories for the age of AI reasoning—now in full production.\"", complexity:5, bizClarity:2, roiEvidence:"None",
  compDiffNote:"'30X faster real-time inference' and '65X more AI compute than Hopper systems', no conditions on the page.", ctaType:"Contact sales", cta:"Read Technical Brief; Contact Sales",
  excerpts:["\"NVIDIA Blackwell-architecture GPUs pack 208 billion transistors and are manufactured using a custom-built TSMC 4NP process.\""],
  observations:["Detailed architecture content; enterprise buyer content limited to a product list and Contact Sales.","The linked technical brief opened to a password prompt in this review."],
  opportunities:["Add test conditions next to multipliers.","Check access to the technical brief."],
  issues:["Claims without conditions","Possible access issue"], scores:[3,3,2,4,2,3,3]}
];
const CA_EXCLUDED = [
  {src:"BWTB", why:"Document viewer showed a password prompt; content not readable."},
  {src:"WEBP", why:"Portal page fetched, but no AI infrastructure session content was readable."},
  {src:"ODAF", why:"Session list is rendered by JavaScript and did not load."}
];
const CA_NOT_OPENED = [
  {t:"NVIDIA IT AI factory case study", url:"https://www.nvidia.com/en-us/case-studies/ai-factory-drives-enterprise-innovation-at-scale/"},
  {t:"NVIDIA Enterprise AI Factory validated design", url:"https://www.nvidia.com/en-us/solutions/ai-factories/validated-design/"},
  {t:"AI Factory purchasing guide (linked from the AI Factories hub)", url:""},
  {t:"ServiceNow and Amdocs customer stories (linked from AI Enterprise)", url:""}
];
const realAudit = () => CA_REAL.map(r => {
  const s = SRC[r.src]; const sc = r.scores;
  return {id:r.id, title:r.title, url:s.url, date:s.date, dateBasis: s.date==="n.d." ? "Not stated" : (["VRPR","DSX","BF4PR","GB200B","CMXB"].includes(r.src) ? "Visible date" : "Page metadata"),
    format:r.format, audience:r.audience, audiences:(r.audiences||[]).join("; "), product:r.product, pains:r.pains.join("; "), vp:r.vp,
    complexity:r.complexity, bizClarity:r.bizClarity, roiEvidence:r.roiEvidence, compDiffNote:r.compDiffNote, ctaType:r.ctaType, cta:r.cta,
    excerpts:r.excerpts.join(" | "), observations:r.observations.join(" | "), opportunities:r.opportunities.join(" | "), issues:(r.issues||[]).join("; "),
    partial: r.partial ? "yes" : "no",
    clarity:sc[0], relevance:sc[1], bizValue:sc[2], techCred:sc[3], evidence:sc[4], compDiff:sc[5], action:sc[6], validated:"no", analystNote:""};
});

/* =========================================================
   STRATEGY
   ========================================================= */
const CAUSAL = {
  nodes:[
    {id:"n1", x:20,  y:40,  t:"Infrastructure complexity", s:"compute, network, storage, software, facility", ev:"vp", d:"Verified that the stack spans many interdependent systems (NVIDIA's own product range and CEO letter).", src:["NVAR26","AIF"]},
    {id:"n2", x:250, y:40,  t:"Understanding gap", s:"specs not translated into outcomes", ev:"hy", d:"Not measured with buyers. The content audit shows technical credibility outscores business value in the 19 pages reviewed, which is consistent with, but does not prove, a buyer understanding gap.", src:[]},
    {id:"n3", x:480, y:40,  t:"Financial justification gap", s:"ROI and unit cost unclear", ev:"vp", d:"Verified: 37% report positive EBIT impact (McKinsey 2026); 21% track AI infrastructure return rigorously (VB Pulse, self-selected).", src:["MCK26","VBP26"]},
    {id:"n4", x:710, y:40,  t:"Purchasing confidence", s:"willingness to commit and scale", ev:"pv", d:"No data found that measures purchasing confidence directly. Needs buyer interviews or a survey.", src:[]},
    {id:"n5", x:710, y:220, t:"Adoption and scaling gap", s:"use is broad, scaled value is not", ev:"vp", d:"Verified: 44% scaling AI enterprise-wide versus near-universal use (McKinsey 2026); more than two-thirds expected 30% or fewer experiments to scale (Deloitte).", src:["MCK26","DEL25"]},
    {id:"n6", x:480, y:220, t:"Utilization and unit-cost blind spots", s:"idle capacity, unmeasured cost", ev:"vp", d:"Verified in self-selected samples: 33% don't measure GPU utilization; 57% report GPUs idle at least half the time (VB Pulse, Oct 2026). 44% track per-unit inference cost (Deloitte 2026).", src:["VBP26","DEL26"]},
    {id:"n7", x:250, y:220, t:"Facility and energy constraints", s:"power density, cooling, grid", ev:"vp", d:"Verified: most racks at 10 to 30 kW; PUE flat for six years (Uptime 2025). NVIDIA calls energy 'the biggest bottleneck' (unsourced on its page).", src:["UPT25","DSX"]},
    {id:"n8", x:20,  y:220, t:"Talent shortage", s:"facilities and MLOps skills", ev:"vp", d:"Verified for facilities staff (Uptime 2025). MLOps skill scarcity is a hypothesis.", src:["UPT25"]}
  ],
  edges:[
    {f:"n1", t:"n2", st:"hy", d:"Hypothesis. Complexity is documented, but no study read here links it to buyer understanding."},
    {f:"n2", t:"n3", st:"hy", d:"Hypothesis. The audit shows vendor content rarely quantifies business value; buyer behaviour was not measured."},
    {f:"n3", t:"n4", st:"hy", d:"Hypothesis with counter-evidence: 58 of 64 companies planning a new AI platform had no finance-reviewed ROI figure (VentureBeat, Sep 2026). Weak justification may not stop purchases; it may move scrutiny to after deployment."},
    {f:"n4", t:"n5", st:"hy", d:"Hypothesis. The adoption gap is verified, but its link to purchasing confidence is not."},
    {f:"n6", t:"n3", st:"ev", d:"Evidence-supported (descriptive). The same self-selected sample shows low utilization measurement and low rigorous return tracking. This is an association in survey data, not a proven cause."},
    {f:"n6", t:"n5", st:"ev", d:"Evidence-supported (descriptive). About one in five say AI operating costs constrain use (McKinsey 2026); 38% delayed, scaled back or canceled a project over cost (VB Pulse, Oct 2026)."},
    {f:"n7", t:"n5", st:"hy", d:"Hypothesis. Facility densities are below rack-scale AI requirements, but rack power for current systems was not verified in this project and IEA data is pending."},
    {f:"n8", t:"n2", st:"hy", d:"Hypothesis. Skills shortages may slow how quickly buyers understand and operate the stack."},
    {f:"n8", t:"n5", st:"hy", d:"Hypothesis. Staffing difficulty is verified for facilities; its effect on AI scaling is not measured."}
  ]
};

const FINDINGS = [
  {t:"The adoption gap is measured, not assumed", kind:"rf", ev:"vp", conf:"High",
   e:"Near-universal AI use, but 44% scaling enterprise-wide and 37% reporting positive EBIT impact. The AI Index charts adoption rising from 55% (2023) to 88% (2025).", src:["MCK26","AIX26"],
   biz:"Infrastructure spending is ahead of measured enterprise returns for most adopters.", pmm:"Messaging that only proves capability addresses the part of the funnel that is already working.",
   lim:"Self-reported surveys with different definitions of 'scaling' and 'impact'."},
  {t:"Buyers lack the unit-economics instruments to justify AI infrastructure", kind:"rf", ev:"vp", conf:"Medium",
   e:"71% track total inference spend but 44% track unit cost; 33% of GPU-operating respondents don't measure utilization; 21% track return rigorously.", src:["DEL26","VBP26"],
   biz:"Without unit cost and utilization data, finance teams cannot test vendor efficiency claims against their own fleet.", pmm:"A measurement method (cost per productive GPU-hour, cost per million tokens) may be more persuasive than another multiplier.",
   lim:"VentureBeat samples are self-selected; Deloitte's publication date is unconfirmed."},
  {t:"Reported GPU idle time is high, but estimates vary too much to quote as one number", kind:"rf", ev:"vp", conf:"Low",
   e:"79% (pooled Jul to Sep 2026, n=218) versus 57% (Oct 2026, n=128) report GPUs busy half the time or less; a 2024 vendor survey reports most GPUs underutilized at peak.", src:["VB79","VBP26","CLML24"],
   biz:"If idle capacity is common, buyers may question new purchases before existing capacity is used.", pmm:"Utilization content is an opportunity and a risk: it should lead with measurement, not with a statistic.",
   lim:"Neither VentureBeat wave is a random sample; bases differ; the 2024 survey is vendor-sponsored."},
  {t:"In the 19 NVIDIA pages reviewed, technical credibility consistently outscores business value", kind:"nv", ev:"qa", conf:"Medium", dyn:"techVsBiz",
   e:"Computed from the Content Audit dataset (see live figures in that section).", src:[],
   biz:"Technical evaluators are well served; budget owners must translate specifications themselves.", pmm:"Add a business-value layer to existing technical pages instead of creating parallel content.",
   lim:"Single reviewer (AI-assisted, pending the author's validation); 19 public pages; gated and sales content not reviewed."},
  {t:"No reviewed asset is written primarily for CFOs, CEOs or procurement as financial decision-makers", kind:"nv", ev:"qa", conf:"Medium", dyn:"audienceGap",
   e:"Primary audiences in the sample are CTOs, AI engineers, cloud providers and enterprise technology leaders. The one procurement-facing page is the partner locator. The AI Factories purchasing guide was linked but not read.", src:["AIF"],
   biz:"Budget holders may receive NVIDIA's value story second-hand through technical teams.", pmm:"A CFO briefing and an auditable TCO kit fill a visible gap, if the purchasing guide does not already.",
   lim:"Public web pages only. NVIDIA's sales enablement and gated executive content were not reviewed and may cover this."},
  {t:"Headline claims are mostly relative multipliers, and some baselines differ across pages", kind:"nv", ev:"vp", conf:"High",
   e:"Vera Rubin: 'versus NVIDIA Blackwell' in the overview, 'GB200 NVL72' in the chart. Dynamo: 7x vs B200 and 15x vs Hopper. HGX: sparse vs dense precision in the 10x ratio. Storage platform named CMX and 'Inference Context Memory Storage Platform'.", src:["VR","DYN","HGX","BF4PR","CMXB"],
   biz:"Inconsistent baselines give competitors and skeptical evaluators an easy objection.", pmm:"A claim-governance standard (baseline, workload, configuration, date, name) protects credibility.",
   lim:"Observed on specific dates; pages change often."},
  {t:"Cost and practicality are becoming the competitive frame, and NVIDIA has started to lead with it", kind:"ic", ev:"vs", conf:"Medium",
   e:"AI Index: 'competitive pressure is shifting toward cost, reliability, and real-world usefulness.' The Vera Rubin page leads with cost per million tokens.", src:["AIX26","VR"],
   biz:"Unit cost is becoming a buying criterion alongside performance.", pmm:"Extend the cost-per-token frame from one product page into role-specific tools and proof.",
   lim:"The AI Index quote concerns AI models, not infrastructure vendors."},
  {t:"Facility and energy readiness is a recognized gate, with little content for operators outside hyperscale", kind:"ic", ev:"vp", conf:"Medium",
   e:"Most racks run at 10 to 30 kW and PUE has been flat for six years (Uptime). In the audit, only the DSX press release targets facility stakeholders.", src:["UPT25","DSX"],
   biz:"Enterprises without dense, liquid-cooled facilities face a longer path to rack-scale systems.", pmm:"Facility-readiness content and partner paths (colocation, cloud) widen the addressable buyer group.",
   lim:"IEA energy projections pending; rack power of current systems not verified here."}
];

const OPPORTUNITIES = [
  {id:"o1", t:"Auditable TCO and cost-per-token kit for CFOs and procurement", f:[2,5,7], s:{cv:5, sr:5, cx:4, es:4, ci:5}, d:"An open calculator plus a short method note that turns 'one-tenth the cost per million tokens' into a buyer's own numbers."},
  {id:"o2", t:"Claim-governance standard for performance claims", f:[6], s:{cv:3, sr:4, cx:2, es:5, ci:3}, d:"One footnote pattern (baseline, workload, configuration, date) and one name per product across product pages, press and blogs."},
  {id:"o3", t:"'Measure before you scale' utilization playbook", f:[2,3], s:{cv:4, sr:4, cx:3, es:3, ci:4}, d:"A practical guide to measuring GPU utilization and unit cost, linking to orchestration and serving software."},
  {id:"o4", t:"Executive and CFO briefing track", f:[1,5], s:{cv:4, sr:4, cx:2, es:3, ci:4}, d:"A short series that answers the CFO's questions: payback, risk, financing and how to measure value after deployment."},
  {id:"o5", t:"Facility-readiness guide for enterprise data center operators", f:[8], s:{cv:4, sr:3, cx:3, es:3, ci:3}, d:"Power, cooling and site options (on-premises, colocation, cloud) for organizations below hyperscale."},
  {id:"o6", t:"Value-realization case studies with financial outcomes", f:[1,2], s:{cv:4, sr:4, cx:4, es:2, ci:4}, d:"Extend the strongest pattern in the audit (named customer, timed outcome) with cost or capacity results."},
  {id:"o7", t:"Role-based entry points on the AI Factories hub", f:[5], s:{cv:3, sr:3, cx:1, es:2, ci:2}, d:"Route CFOs, operators and architects to the content that answers their questions."}
];

const ROADMAP = [
  {p:1, s:1, e:14, t:"Second-reviewer validation of the 19 audit scores", o:"Author with one peer reviewer", m:"Inter-rater agreement reported; scores marked validated"},
  {p:1, s:1, e:21, t:"Read gated and linked assets (purchasing guide, validated design, 10-K Item 1)", o:"Author", m:"Audit extended or findings revised"},
  {p:1, s:8, e:30, t:"Buyer interviews: CFO, procurement, data center operators (target 8)", o:"Author", m:"Interview notes coded against the causal framework"},
  {p:1, s:15, e:30, t:"Claims inventory with baseline and date for each headline claim", o:"Author", m:"Inventory complete for Vera Rubin and storage pages"},
  {p:2, s:31, e:50, t:"Draft TCO and cost-per-token kit (method note + calculator)", o:"PMM with finance input", m:"Reviewed by two finance practitioners"},
  {p:2, s:31, e:45, t:"Claim-governance standard and naming checklist", o:"PMM with legal and engineering", m:"Standard approved; applied to three pages"},
  {p:2, s:40, e:60, t:"CFO briefing and executive one-pager", o:"PMM", m:"Draft passes message test readiness review"},
  {p:2, s:45, e:60, t:"Utilization playbook outline and facility-readiness guide outline", o:"PMM with solutions architects", m:"Outlines reviewed by two practitioners"},
  {p:3, s:61, e:80, t:"Run the Variant A vs B message experiment", o:"Author", m:"Pre-registered analysis completed; results reported with limits"},
  {p:3, s:61, e:85, t:"Pilot assets with a small set of sales conversations", o:"Sales and PMM", m:"Qualitative feedback logged; asset changes made"},
  {p:3, s:75, e:90, t:"KPI baseline and 90-day readout", o:"Author", m:"Leading indicators reported against baseline"}
];
const PHASES = ["Days 1 to 30: Discovery and Validation","Days 31 to 60: Messaging and Asset Development","Days 61 to 90: Testing and Optimization"];

const KPI_FRAMEWORK = [
  {st:"Awareness", k:"Executive content reach", o:"Get value content in front of budget holders", f:"Unique visits from target accounts to CFO and executive assets ÷ target accounts", ds:"Web analytics with account matching", fr:"Monthly", i:"o4", li:"Leading"},
  {st:"Awareness", k:"Role coverage of new content", o:"Close audience gaps found in the audit", f:"Assets published per primary audience ÷ planned assets per audience", ds:"Content inventory (this audit's schema)", fr:"Quarterly", i:"o7", li:"Leading"},
  {st:"Consideration", k:"Calculator start rate", o:"Engage buyers with their own numbers", f:"TCO kit sessions with at least one edited input ÷ TCO kit page visits", ds:"Product analytics on the calculator", fr:"Monthly", i:"o1", li:"Leading"},
  {st:"Consideration", k:"Message comprehension score", o:"Confirm buyers understand the value story", f:"Mean comprehension (1 to 7) for the chosen message in tests", ds:"Message tests (Experiment Lab)", fr:"Per test", i:"o4", li:"Leading"},
  {st:"Evaluation", k:"Model export rate", o:"Move from browsing to evaluation", f:"Calculator sessions ending in a CSV or PDF export ÷ sessions started", ds:"Product analytics", fr:"Monthly", i:"o1", li:"Leading"},
  {st:"Evaluation", k:"Claim-related objections", o:"Reduce credibility friction", f:"Opportunities with a logged objection about a performance claim ÷ opportunities reviewed", ds:"CRM notes or win/loss interviews", fr:"Quarterly", i:"o2", li:"Leading"},
  {st:"Evaluation", k:"Proof-of-value requests from finance-led deals", o:"Engage the economic buyer in evaluation", f:"Proof-of-value requests with a finance stakeholder named ÷ total requests", ds:"CRM", fr:"Quarterly", i:"o4", li:"Leading"},
  {st:"Adoption", k:"Pilot-to-production conversion", o:"Shrink the adoption gap", f:"Pilots moving to production within 6 months ÷ pilots started", ds:"CRM and customer success records", fr:"Quarterly", i:"o6", li:"Lagging"},
  {st:"Adoption", k:"Measured utilization after deployment", o:"Show value already purchased", f:"Median productive GPU-hours ÷ available GPU-hours across reference customers", ds:"Customer-shared telemetry (with consent)", fr:"Quarterly", i:"o3", li:"Lagging"},
  {st:"Adoption", k:"Win rate where the TCO kit was used", o:"Link assets to revenue", f:"Won opportunities using the kit ÷ closed opportunities using the kit, compared with those that did not", ds:"CRM asset tagging", fr:"Semi-annual", i:"o1", li:"Lagging"}
];

/* =========================================================
   MESSAGING FRAMEWORK
   VP and benefits are proposed messaging (hypotheses).
   Proof points are verified facts with source ids.
   ========================================================= */
const FRAMEWORK = [
  {a:"CFO", profile:"Owns capital allocation and return on investment; signs off large infrastructure commitments.", obj:["Predictable return on AI capital","Visibility of unit costs","Risk-adjusted payback"],
   pains:["Few organizations can show enterprise-level AI returns","Running costs are visible in total but not per unit","Projects overrun planned cost"],
   objections:["'Up to' multipliers do not tell me my cost","We already have idle capacity","Hardware generations move fast; asset life is uncertain"],
   criteria:["TCO and NPV under our assumptions","Payback period","Cost per unit of AI output","Financing and depreciation options"],
   vp:"Know what each unit of AI output costs before you commit, and track it after deployment.",
   benefits:["Lower projected cost per million tokens for agentic inference","More output within a fixed power budget","A shared metric between finance and engineering"],
   caps:["Vera Rubin NVL72","Dynamo inference serving","AI Enterprise orchestration"],
   proof:[["One-tenth the cost per million tokens vs GB200 NVL72 (Kimi-K2-Thinking, 32K/8K; projected)","VR"],["Up to 10x more tokens per megawatt vs GB200 NVL72 (projected)","VR"],["About 1 in 5 organizations say AI operating costs constrain use","MCK26"]],
   assets:["CFO Briefing","TCO & ROI Simulator","Executive One-Pager"], cta:"Model your cost per million tokens with your own assumptions"},
  {a:"CTO", profile:"Sets architecture and platform standards; balances performance, roadmap risk and integration.", obj:["An architecture that scales with model growth","Integration with existing software","Roadmap stability"],
   pains:["Full-stack choices across compute, network, storage and software","Pilots stall before production"],
   objections:["Lock-in to one vendor's stack","Facility readiness for dense racks","Availability timing of new generations"],
   criteria:["Workload fit and reproducible benchmarks","Software ecosystem and portability","Reference architectures","Supply and availability"],
   vp:"Standardize on one rack-scale architecture that covers training, inference and agentic workloads, with published reference designs.",
   benefits:["Fewer integration decisions through reference designs","Room for long-context and agentic workloads","A single upgrade path across generations"],
   caps:["Vera Rubin NVL72","Spectrum-X Ethernet","BlueField-4 / CMX storage","DSX reference design"],
   proof:[["72 Rubin GPUs and 36 Vera CPUs per rack; 260 TB/s NVLink 6 switch bandwidth (preliminary)","VR"],["Spectrum-X: 1.6x AI network performance over off-the-shelf Ethernet","SPX"],["Vera Rubin DSX AI Factory reference design released Mar 16, 2026","DSX"]],
   assets:["Technical Product Overview","Infrastructure Explorer"], cta:"Review the reference architecture with a solutions architect"},
  {a:"CEO", profile:"Accountable for growth strategy and competitive position; sponsors transformation programs.", obj:["Turn AI use into measurable business results","Move faster than competitors","Manage strategic risk"],
   pains:["AI is widely used but rarely scaled","Investment is rising faster than evidence of return"],
   objections:["Is this the right time to commit capital?","Can our organization execute?"],
   criteria:["Strategic fit","Time to value","Evidence from peers"],
   vp:"Move AI from scattered pilots to measured, enterprise-wide capability, on infrastructure designed for the next wave of agentic workloads.",
   benefits:["A credible path from pilot to production","Capacity for agentic AI growth","Comparable unit economics across initiatives"],
   caps:["AI factory (full stack)","DGX SuperPOD","Partner ecosystem"],
   proof:[["44% of organizations report scaling AI across the enterprise (up from 38%)","MCK26"],["37% report positive EBIT contribution from AI","MCK26"]],
   assets:["Executive One-Pager","Webinar Campaign"], cta:"Brief your leadership team on AI infrastructure economics"},
  {a:"AI engineers", profile:"Build, train and serve models; judge platforms by throughput, latency and tooling.", obj:["Ship models faster","Serve more requests per GPU","Avoid infrastructure toil"],
   pains:["Large models exceed one GPU's memory","KV-cache recomputation wastes GPU time","Serving stacks are complex"],
   objections:["Benchmarks don't match our models","Migration effort from existing code"],
   criteria:["Framework support","Reproducible benchmarks","Serving and orchestration tools"],
   vp:"Serve larger models with longer context at higher throughput, using open-source serving software and standard APIs.",
   benefits:["Disaggregated serving and KV-cache reuse","Prebuilt inference microservices","Large NVLink domains for MoE models"],
   caps:["Dynamo","NIM","CUDA","GB200 / Vera Rubin NVL72"],
   proof:[["Dynamo is an open source, distributed inference-serving framework","DYN"],["NIM provides containers to self-host inference microservices with industry-standard APIs","NIM"],["GB200 NVL72: 30x speedup for 1.8T GPT-MoE inference (footnoted, projected, 2024)","GB200B"]],
   assets:["Technical Product Overview"], cta:"Reproduce the benchmark on your own model"},
  {a:"Data center operators", profile:"Run facilities: power, cooling, space and uptime.", obj:["Fit AI systems into power and cooling limits","Keep uptime","Plan capacity years ahead"],
   pains:["Most racks run at 10 to 30 kW","PUE improvement has stalled","Staffing is hard"],
   objections:["Liquid cooling retrofit cost","Grid connection timelines"],
   criteria:["Rack power and cooling requirements","Reference designs","Partner support"],
   vp:"Plan AI capacity around tokens per megawatt, with reference designs and digital twins that reduce design risk.",
   benefits:["More AI output per unit of power","Validated designs for power and cooling","Digital-twin planning before construction"],
   caps:["DSX reference design","Omniverse DSX Blueprint","Spectrum-X Photonics"],
   proof:[["Most rack densities 10 to 30 kW; few above 30 kW","UPT25"],["About two-thirds of operators report staffing difficulty","UPT25"],["Phaidra (DSX partner) reports about 10% more compute by reducing cooling spikes (partner claim)","DSX"]],
   assets:["Technical Product Overview","Webinar Campaign"], cta:"Assess your facility's readiness for rack-scale AI"},
  {a:"Procurement", profile:"Runs sourcing, compares vendors and negotiates terms.", obj:["Fair comparison across vendors","Total value, not just price","Supply security"],
   pains:["Specs are quoted in different units and scopes","Claims use different baselines"],
   objections:["Single-vendor dependence","Unverifiable performance claims"],
   criteria:["Like-for-like comparison","Total cost over life","Delivery timelines","Support and partners"],
   vp:"Compare platforms on total cost and verified, footnoted claims, with a clear partner and support model.",
   benefits:["A structured evaluation checklist","Lifetime cost view","Partner options for delivery and support"],
   caps:["NVIDIA Partner Network","DGX SuperPOD"],
   proof:[["NPN benefits include 'sales and distribution, training, marketing, service, and support'","NPN"],["Competitor offerings documented: AMD MI355X, Google TPU7x, AWS Trainium3","AMD355"]],
   assets:["Sales Battlecard","TCO & ROI Simulator"], cta:"Use the evaluation checklist in your next RFP"},
  {a:"Cloud service providers", profile:"Sell GPU capacity and AI services; margins depend on utilization and cost per token.", obj:["Maximize token revenue per megawatt","High multi-tenant utilization","Fast time to new capacity"],
   pains:["Power-limited growth","Multi-tenant isolation and performance"],
   objections:["Capex per rack","Customer demand volatility"],
   criteria:["Tokens per megawatt","Network performance at scale","Time to deploy"],
   vp:"Generate more tokens per megawatt and serve more tenants per rack.",
   benefits:["Higher throughput per unit of power","Multi-tenant Ethernet at scale","Faster capacity bring-up"],
   caps:["Vera Rubin NVL72","Spectrum-X","Dynamo"],
   proof:[["Up to 10x more tokens per megawatt vs GB200 NVL72 (projected)","VR"],["Spectrum-X designed for 'cloud service providers and large enterprises running multi-tenant AI workloads at hyperscale'","SPX"]],
   assets:["Technical Product Overview","Sales Battlecard"], cta:"Model tokens per megawatt for your next build"},
  {a:"Enterprise technology leaders", profile:"CIOs and heads of AI platforms who turn strategy into running services.", obj:["Production-grade AI platforms","Security and data control","Cost transparency for business units"],
   pains:["Pilot-to-production gap","Data residency requirements","Charging business units for AI"],
   objections:["Skills to run the platform","Build versus buy versus cloud"],
   criteria:["Security and support","Deployment options","Internal chargeback metrics"],
   vp:"Run AI in production on a supported full stack, with unit-cost metrics you can share with every business unit.",
   benefits:["Supported production software","On-premises, colocation or cloud options","Unit-cost reporting for chargeback"],
   caps:["AI Enterprise","DGX SuperPOD","NIM"],
   proof:[["74% say data residency is at least moderately important","DEL26"],["University of Florida: nearly 7,000 users and 33 million research requests in a year on DGX SuperPOD","SPOD"]],
   assets:["Executive One-Pager","Landing Page Concept"], cta:"Plan your pilot-to-production path"}
];

const F2B = [
  {f:"Vera Rubin NVL72 rack: 72 Rubin GPUs, 36 Vera CPUs, NVLink 6 (260 TB/s)", fb:"The rack behaves as one large accelerator for very large models", co:"Fewer systems needed for large MoE training", bv:"Lower capital per trained model", ev:"'One-fourth the number of GPUs' for a 10T MoE trained on 100T tokens in one month (projected)", src:"VR", st:"vp"},
  {f:"20.7 TB HBM4 at 1,580 TB/s per rack (preliminary)", fb:"More context and larger batches fit in fast memory", co:"Long-context and agentic requests stay responsive", bv:"More revenue-generating tokens per rack", ev:"Specification, preliminary", src:"VR", st:"vp"},
  {f:"Rubin platform inference efficiency", fb:"More tokens generated per unit of compute", co:"Lower cost per AI interaction", bv:"One-tenth the cost per million tokens vs GB200 NVL72 (projected)", ev:"Kimi-K2-Thinking, 32K/8K ISL/OSL; projected", src:"VR", st:"vp"},
  {f:"Rubin platform energy efficiency", fb:"More output from the same power envelope", co:"Grow AI services without new grid capacity", bv:"Up to 10x more tokens per megawatt vs GB200 NVL72 (projected)", ev:"Kimi-K2-Thinking basis; projected", src:"VR", st:"vp"},
  {f:"BlueField-4 STX and CMX context memory tier", fb:"KV cache is reused instead of recomputed", co:"GPUs spend less time waiting on context", bv:"Higher return on GPU investment (hypothesis)", ev:"Up to 5x tokens per second and power efficiency vs traditional storage; basis not stated", src:"BF4PR", st:"hy"},
  {f:"Spectrum-X Ethernet", fb:"Higher effective bandwidth for AI traffic", co:"Multi-node jobs finish sooner; GPUs stay busier", bv:"Better utilization of purchased GPUs (hypothesis)", ev:"1.6x AI network performance over off-the-shelf Ethernet (conditions in whitepaper)", src:"SPX", st:"vp"},
  {f:"Dynamo disaggregated serving", fb:"Prefill and decode scheduled separately; KV-aware routing", co:"More requests served on the same hardware", bv:"Lower cost per token (hypothesis)", ev:"Up to 7x MoE throughput vs B200-based systems; page also states 15x vs Hopper (inconsistent)", src:"DYN", st:"pv"},
  {f:"Vera CPU (88 Olympus cores)", fb:"Fast tool calls, sandboxes and orchestration for agents", co:"Agent pipelines not held back by CPU work", bv:"Higher agent throughput per rack (hypothesis)", ev:"'Up to 2x performance on critical agentic workloads'; no baseline stated", src:"CPU", st:"pv"},
  {f:"DSX reference design and Omniverse DSX Blueprint", fb:"Facility designed and tested as a digital twin", co:"Fewer design surprises; earlier production", bv:"Earlier revenue from new capacity (hypothesis)", ev:"Partner claim: about 10% more compute by reducing cooling spikes (Phaidra)", src:"DSX", st:"vp"},
  {f:"AI Enterprise orchestration", fb:"Compute shared dynamically across workloads", co:"Less idle capacity", bv:"Higher utilization of existing assets (hypothesis)", ev:"'Maximize GPU utilization up to 5x'; no baseline stated", src:"AIE", st:"pv"}
];

/* =========================================================
   ASSET LIBRARY: independent concepts (Markdown-like blocks)
   ========================================================= */
const CONCEPT_NOTE = "Independent concept created for a portfolio project. Not NVIDIA material; not reviewed or endorsed by NVIDIA. Proof points cite public sources; projections are labeled.";
const ASSETS = [
  {id:"onepager", t:"Executive One-Pager", aud:"CEO, enterprise technology leaders", fmt:"1 page", sections:[
    ["Headline","From AI pilots to measured AI output"],
    ["The problem","AI use is broad, but measured value is not. 44% of organizations report scaling AI across the enterprise and 37% report a positive EBIT contribution [MCK26]. About one in five say AI operating costs, including tokens, constrain use [MCK26]."],
    ["What changes with rack-scale AI infrastructure","Agentic AI multiplies the number of tokens each task needs. The economics of AI therefore depend on the cost of each unit of output. NVIDIA projects that Vera Rubin NVL72 delivers one-tenth the cost per million tokens of GB200 NVL72 for a reasoning model at long context [VR]."],
    ["Three questions to ask before you scale","1. What does a million tokens cost us today, and how would we know?\n2. How much of the capacity we already own is in use?\n3. Which facility, skills and partner constraints set our timeline?"],
    ["Proof points","• One-tenth the cost per million tokens vs GB200 NVL72 (Kimi-K2-Thinking, 32K/8K; projected) [VR]\n• Up to 10x more tokens per megawatt vs GB200 NVL72 (projected) [VR]\n• Reference design for AI factories released Mar 16, 2026 [DSX]"],
    ["Next step","Run your numbers through an open cost model, then review the result with finance and engineering together."]]},
  {id:"cfo", t:"CFO Briefing", aud:"CFO, finance leaders", fmt:"2 pages", sections:[
    ["Purpose","Give finance a way to test AI infrastructure claims against the organization's own costs."],
    ["What the research shows","• 37% report positive EBIT impact from AI [MCK26]\n• 71% track total inference spend, 44% track unit cost [DEL26]\n• 38% delayed, scaled back or canceled a project because it cost more than planned (self-selected sample, n=156) [VBP26]"],
    ["Three metrics finance can own","1. Cost per million tokens = annual serving cost ÷ annual tokens served\n2. Cost per productive GPU-hour = (CAPEX ÷ life + annual OPEX) ÷ (GPUs × hours × utilization)\n3. Payback = time until cumulative net benefit covers the investment"],
    ["How to read vendor claims","Every multiplier has a baseline, a workload and a date. 'One-tenth the cost per million tokens' is a projection against GB200 NVL72 for one model at 32K input and 8K output tokens [VR]. Ask for results on your own workloads."],
    ["Questions for the vendor","• Which configuration and workload produced this figure?\n• What utilization does the TCO assume?\n• What changes if our facility PUE is higher?\n• What support and partner costs are not in the quote?"],
    ["Next step","Use the TCO & ROI Simulator with your own quotes; replace every illustrative default."]]},
  {id:"tech", t:"Technical Product Overview: Vera Rubin NVL72", aud:"CTOs, AI engineers, infrastructure architects", fmt:"2 to 3 pages", sections:[
    ["What it is","A rack-scale system with 72 Rubin GPUs and 36 Vera CPUs connected by an NVLink 6 switch, with ConnectX-9 SuperNICs and BlueField-4 DPUs [VR]."],
    ["Key specifications (preliminary)","• 20.7 TB HBM4 at 1,580 TB/s per rack\n• 260 TB/s NVLink 6 switch bandwidth\n• 3,600 PFLOPS NVFP4 inference\nAll values are NVIDIA preliminary figures, subject to change [VR]."],
    ["Workloads it targets","Agentic and long-context inference; large mixture-of-experts training. NVIDIA states agentic systems consume up to 15x more tokens than traditional AI applications (basis not stated) [VR]."],
    ["Stack around the rack","• Context memory: BlueField-4 STX / CMX tier for KV cache [CMXB]\n• Networking: Spectrum-X Ethernet [SPX]\n• Serving: Dynamo, NIM [DYN] [NIM]\n• Facility: DSX reference design [DSX]"],
    ["Claims and their basis","• One-tenth the cost per million tokens vs GB200 NVL72: Kimi-K2-Thinking, 32K/8K, projected\n• One-fourth the GPUs for training: 10T MoE, 100T tokens, one month, projected\n• Up to 10x tokens per megawatt vs GB200 NVL72: projected"],
    ["Open questions to verify","• Availability: product page says 'Available Now'; May 31 release said shipments begin 'this fall' [VR] [VRPR]\n• Rack power and cooling requirements for your facility"]]},
  {id:"battlecard", t:"Sales Battlecard", aud:"Sales and partner teams", fmt:"1 page, internal", sections:[
    ["When to use","Enterprise accounts evaluating rack-scale inference capacity where finance is involved."],
    ["Discovery questions","• What does a million tokens cost you today?\n• How do you measure GPU utilization now?\n• Who signs off the business case?"],
    ["Positioning","Lead with unit economics and measurement; support with footnoted performance claims."],
    ["Alternatives the buyer may consider","AMD Instinct MI355X with ROCm [AMD355] [ROCM]; Google Cloud TPU7x (Google Cloud only) [TPU7]; AWS Trainium3 and Inferentia2 (AWS only) [TRN3] [INF]. Do not claim head-to-head performance without a published, comparable benchmark."],
    ["Objection handling","• 'Your multipliers don't apply to us.' Offer a workload-specific evaluation and an open cost model.\n• 'We have idle GPUs already.' Start with a utilization assessment; value improves when capacity is used.\n• 'Our facility can't host it.' Discuss colocation, cloud and DSX-based planning."],
    ["Do not say","• Unqualified superlatives\n• Any figure without its baseline and date\n• Availability dates not confirmed in writing"]]},
  {id:"landing", t:"Landing Page Concept", aud:"Enterprise technology leaders, CFOs", fmt:"Web page wireframe", sections:[
    ["Hero","Know your cost per million tokens before you scale."],
    ["Subhead","Model AI infrastructure costs with your own assumptions, then compare platforms on the same basis."],
    ["Primary CTA","Open the cost model"],
    ["Secondary CTA","Download the CFO briefing"],
    ["Proof strip","One-tenth the cost per million tokens vs GB200 NVL72 (projected) [VR] · Up to 10x tokens per megawatt (projected) [VR] · Footnotes on every claim"],
    ["Sections","1. The problem: usage is broad, measured value is not [MCK26]\n2. Three metrics to own\n3. How the platform changes them\n4. Facility and deployment options\n5. Questions to ask any vendor"],
    ["Measurement","Track calculator start rate and model export rate (see KPI framework)."]]},
  {id:"webinar", t:"Webinar Campaign Concept", aud:"CFOs, CTOs, enterprise technology leaders", fmt:"Campaign kit", sections:[
    ["Title","The Economics of AI Inference: Measuring Cost per Token Before You Scale"],
    ["Target audience","Finance and technology leaders at enterprises moving AI from pilots into production."],
    ["Customer pain","AI use is broad, but few organizations can show what each unit of AI output costs or returns [MCK26] [DEL26]."],
    ["Description","A 45-minute session for finance and technology leaders on how to measure, model and reduce the cost of AI output, with a walkthrough of an open cost model."],
    ["Learning objectives","1. Define cost per million tokens and cost per productive GPU-hour\n2. Read vendor performance claims and their baselines\n3. Build a first TCO model with your own assumptions\n4. Plan utilization measurement before buying more capacity"],
    ["Promotional email","Subject: What does a million tokens cost you?\n\nMost organizations track their total AI bill. Fewer track what each unit of AI output costs. Join finance and technology leaders for a 45-minute session on measuring AI unit economics, reading vendor claims and building a model you can defend.\n\n[Register]"],
    ["LinkedIn copy","Most teams can tell you their AI bill. Few can tell you their cost per million tokens. In this session we walk through the three metrics finance and engineering can share, and how to test vendor claims against your own workloads. Register below."],
    ["KPIs","Registrations from target accounts; attendance rate; calculator starts within 14 days of the session; post-event survey comprehension score."]]}
];

/* =========================================================
   EXPERIMENT LAB
   ========================================================= */
const EXP = {
  variantA:{label:"Variant A: Feature-focused", headline:"Vera Rubin NVL72: 72 Rubin GPUs, 36 Vera CPUs, 260 TB/s NVLink 6", body:"A rack-scale system with 20.7 TB of HBM4 at 1,580 TB/s and 3,600 PFLOPS of NVFP4 inference (preliminary). NVIDIA projects one-tenth the cost per million tokens of GB200 NVL72 for Kimi-K2-Thinking at 32K/8K."},
  variantB:{label:"Variant B: Benefit-focused", headline:"Know what each unit of AI output costs before you scale", body:"Agentic AI multiplies token volume, so cost per million tokens decides whether AI pays off. NVIDIA projects that Vera Rubin NVL72 delivers one-tenth the cost per million tokens of GB200 NVL72 for a long-context reasoning model (Kimi-K2-Thinking, 32K/8K)."},
  hypothesis:"H1: Among enterprise finance and technology decision-makers, the benefit-focused message (B) scores higher than the feature-focused message (A) on perceived business value. H0: no difference. Secondary: comprehension, relevance, clarity, trust, confidence, intent. Exploratory: does the effect differ between technical and business roles?",
  population:"Professionals involved in AI infrastructure decisions at organizations with 500+ employees: finance (CFO, FP&A), technology leadership (CTO, CIO, head of AI platform), AI engineers and procurement.",
  recruitment:"Professional network outreach and a paid B2B research panel with role screening. Record the recruitment channel for each participant. Exclude current NVIDIA employees and anyone who has seen either variant.",
  assignment:"Between-subjects. Each participant is randomly assigned to A or B by the survey tool (block randomization by role group: business vs technical) and sees only one variant.",
  questions:[
    ["comprehension","Comprehension","Check question: 'According to the message, what does the platform reduce?' (scored correct or not) plus 'I understood what this offering does' (1 to 7)."],
    ["relevance","Relevance","'This message addresses a problem my organization has.' (1 to 7)"],
    ["clarity","Clarity","'The message was clear and easy to follow.' (1 to 7)"],
    ["trust","Trust","'I believe the claims in this message.' (1 to 7)"],
    ["value","Perceived business value","'This offering could create measurable business value for my organization.' (1 to 7)"],
    ["confidence","Decision confidence","'This message gives me enough information to judge whether to evaluate the offering.' (1 to 7)"],
    ["intent","Intent","'How likely are you to request more information?' (1 to 7)"]
  ],
  biases:["Self-selection into the study (respondents interested in AI infrastructure).","Social desirability and acquiescence on agreement scales.","Brand familiarity: both variants name NVIDIA, which may raise trust in both.","Stated intent is not behaviour; treat intent as a leading indicator only.","Multiple comparisons across seven measures (Holm correction applied).","Likert scores treated as interval data; check with a non-parametric test if distributions are skewed."],
  limits:"With 7-point scales and an expected standardized effect of d = 0.5, about 64 participants per variant give 80% power at α = 0.05 (two-sided). Smaller effects need many more people (d = 0.3 needs about 175 per variant). A portfolio study of 20 to 40 people per variant can only detect large effects and should be reported as exploratory."
};
const EXP_MEASURES = EXP.questions.map(q=>q[0]);
const EXP_FIELDS = ["participant_id","variant","role_group","comprehension","relevance","clarity","trust","value","confidence","intent"];

/* =========================================================
   AI WORKFLOW: 8-step process and a real case study
   ========================================================= */
const WF_STEPS = [
  {n:"Source Collection", d:"Gather primary documentation", lab:"Human analysis"},
  {n:"Information Extraction", d:"Pull claims, specs and numbers", lab:"Rule-based"},
  {n:"Technical Understanding", d:"Explain what each spec does", lab:"Rule-based"},
  {n:"Feature-to-Benefit Mapping", d:"Link features to outcomes", lab:"Rule-based"},
  {n:"Audience Adaptation", d:"Reframe for the chosen role", lab:"Rule-based"},
  {n:"Content Development", d:"Draft messaging", lab:"Rule-based"},
  {n:"Claim Verification", d:"Flag unsupported claims", lab:"Rule-based"},
  {n:"Human Review", d:"Named reviewer approves", lab:"Human analysis", human:true}
];
const CASE = {
  sources:["VR","VRPR"],
  note:"Drafted with Claude (AI-assisted) during this build from the two NVIDIA pages listed. Every number was checked against the source page on Nov 24, 2026. Pending the author's human review before any use.",
  outputs:[
    ["Executive messaging","AI-assisted","Agentic AI multiplies the tokens each task consumes, so the cost of AI output now decides whether AI investments pay back. NVIDIA projects that Vera Rubin NVL72 delivers one-tenth the cost per million tokens of GB200 NVL72 for a long-context reasoning model. The next step is to test that projection against your own workloads and costs."],
    ["Technical messaging","AI-assisted","Vera Rubin NVL72 puts 72 Rubin GPUs and 36 Vera CPUs in one NVLink 6 domain (260 TB/s switch bandwidth), with 20.7 TB of HBM4 at 1,580 TB/s per rack (preliminary). NVIDIA's projections: one-tenth the cost per million tokens versus GB200 NVL72 on Kimi-K2-Thinking at 32K/8K ISL/OSL, and one-fourth the GPUs to train a 10T-parameter MoE on 100T tokens in one month."],
    ["One-pager outline","AI-assisted","1. Problem: token volume and unit cost\n2. What the rack is (verified specifications, preliminary)\n3. Projected economics with baselines and workloads\n4. Facility and availability questions\n5. Next step: workload-specific evaluation"],
    ["Sales enablement","AI-assisted","Talk track: 'Before we talk about performance, how do you measure cost per million tokens today?' Objection: 'Those are projections.' Response: 'Yes, NVIDIA labels them projected and states the workload. Let's define a test on your model.'"],
    ["Blog introduction","AI-assisted","Every agent step is a set of tokens, and every token has a cost. As enterprises move from chat assistants to agents that plan, call tools and check their own work, the number of tokens per task rises. That makes cost per million tokens a board-level number. This post looks at what NVIDIA's Vera Rubin platform claims to change about that number, and how to test the claim."]
  ],
  claims:[
    {o:"\"one-tenth the cost per million tokens compared to NVIDIA GB200 NVL72 for highly interactive, deep reasoning agentic AI\"", src:"VR", ai:"Vera Rubin cuts inference costs by 90%.", prop:"NVIDIA projects one-tenth the cost per million tokens versus GB200 NVL72 for Kimi-K2-Thinking at 32K/8K.", st:"Verified with qualification", risk:"'Cuts inference costs by 90%' overstates scope: the claim is per million tokens, one model, one sequence-length setting, projected.", fix:"", fin:"NVIDIA projects one-tenth the cost per million tokens versus GB200 NVL72 (Kimi-K2-Thinking, 32K/8K ISL/OSL; projected, subject to change)."},
    {o:"\"AI inference at one-tenth the cost per million tokens versus NVIDIA Blackwell\"", src:"VR", ai:"Rubin is 10x cheaper to run than Blackwell.", prop:"Use GB200 NVL72 as the named baseline.", st:"Needs correction", risk:"'Blackwell' is a product family; the chart baseline is GB200 NVL72. The two phrasings are not equivalent.", fix:"", fin:"Use the chart's baseline: GB200 NVL72."},
    {o:"\"Available Now\" (product page badge)", src:"VR", ai:"Vera Rubin is available to enterprises today.", prop:"Avoid availability statements.", st:"Unresolved", risk:"The May 31, 2026 release says production shipments are 'set to begin starting this fall'. Availability terms and lead times are not stated.", fix:"", fin:"Omit availability claims until confirmed in writing."},
    {o:"\"10x agent throughput at scale compared with the previous-generation NVIDIA Grace Blackwell platform\"", src:"VRPR", ai:"Agents run 10x faster on Vera Rubin.", prop:"Do not use externally without the configuration.", st:"Unsupported for external use", risk:"No workload, configuration or footnote in the release.", fix:"", fin:"Not used."},
    {o:"\"up to 10x more tokens per megawatt than NVIDIA GB200 NVL72\"", src:"VR", ai:"Ten times the output from the same power.", prop:"NVIDIA projects up to 10x more tokens per megawatt versus GB200 NVL72.", st:"Verified (vendor projection)", risk:"'Up to' and 'projected' must stay attached.", fix:"", fin:"NVIDIA projects up to 10x more tokens per megawatt versus GB200 NVL72 (Kimi-K2-Thinking basis; projected)."},
    {o:"\"Agentic systems consume up to 15x more tokens than traditional AI applications.\"", src:"VR", ai:"Agents use 15x more tokens.", prop:"Attribute to NVIDIA; do not state as industry fact.", st:"Unsupported (no basis on page)", risk:"No method or source given.", fix:"", fin:"Rephrase without the figure: 'Agentic workflows raise the number of tokens each task needs.'"},
    {o:"\"delivers up to 35x higher throughput per megawatt for trillion-parameter models\" (with LPX)", src:"VR", ai:"35x more efficient.", prop:"Not used.", st:"Unsupported (baseline not named)", risk:"Baseline and GPU configuration not disclosed; footnote tiers ($0 to $150) unexplained.", fix:"", fin:"Not used."},
    {o:"\"one-fourth the number of GPUs\" (MoE training)", src:"VR", ai:"Train with 75% fewer GPUs.", prop:"NVIDIA projects one-fourth the GPUs to train a 10T MoE on 100T tokens in one month, versus Blackwell.", st:"Verified with qualification", risk:"Applies to one model size and time window; projected.", fix:"", fin:"NVIDIA projects one-fourth the GPUs for training a 10T-parameter MoE model on 100T tokens in one month (projected)."}
  ]
};
const AI_LOG_DEFAULT = [
  {date:"2026-11-24", tool:"Claude (Claude Code)", task:"Fetched and summarized 23 NVIDIA pages for the content audit", input:"Public NVIDIA URLs", output:"Page-by-page notes with verbatim excerpts", verify:"Excerpts kept verbatim; partial reads flagged", edits:"", by:"Logged by Claude during the build"},
  {date:"2026-11-24", tool:"Claude (Claude Code)", task:"Drafted rubric scores for 19 audited assets", input:"Audit notes and rubric", output:"Scores 1 to 5 on seven dimensions", verify:"Pending: author to validate each score", edits:"", by:"Logged by Claude during the build"},
  {date:"2026-11-24", tool:"Claude (Claude Code)", task:"Read VentureBeat, Stanford AI Index and NVIDIA annual review for market evidence", input:"Source URLs", output:"Statistics with sample and method", verify:"Checked against source pages; limitations recorded", edits:"", by:"Logged by Claude during the build"},
  {date:"2026-11-24", tool:"Claude (Claude Code)", task:"Drafted Vera Rubin case-study messaging and claim table", input:"VR product page, VRPR press release", output:"Five message drafts, eight claim rows", verify:"Numbers checked against source; human review pending", edits:"", by:"Logged by Claude during the build"}
];
