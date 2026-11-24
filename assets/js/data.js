/* =========================================================
   DATA LAYER — every factual statement references a source id.
   Sources were checked against the live page on 2026-11-24.
   ========================================================= */
const VERIFIED_ON = "Nov 24, 2026";

const SOURCES = [
  // Industry research
  {id:"MCK26", title:"The state of AI in 2026: On the road to ROI", pub:"McKinsey & Company (QuantumBlack)", date:"2026-08-25", type:"Industry research", url:"https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai", method:"Online survey, May 4 – Jun 8, 2026; 1,719 participants in 97 nations; 36% at organizations with >$1B revenue; weighted by national GDP share.", status:"verified"},
  {id:"MCK25", title:"The state of AI in 2025: Agents, innovation, and transformation", pub:"McKinsey & Company (QuantumBlack)", date:"2025-11-05", type:"Industry research", url:"https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025", method:"Online survey, Jun 25 – Jul 29, 2025; 1,993 participants in 105 nations; 38% at organizations with >$1B revenue; weighted by national GDP share.", status:"verified"},
  {id:"DEL25", title:"State of Generative AI in the Enterprise, Q4 (press release)", pub:"Deloitte AI Institute", date:"2025-01-21", type:"Industry research", url:"https://www.deloitte.com/us/en/about/press-room/state-of-generative-ai.html", method:"Survey of 2,773 director- to C-suite-level respondents across 14 countries, all piloting or implementing GenAI. Fieldwork window (reported as Jul–Sep 2024) requires verification against the full report.", status:"verified"},
  {id:"DEL26", title:"The State of AI in the Enterprise (2026)", pub:"Deloitte", date:"2026", type:"Industry research", url:"https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html", method:"Global survey of 3,500 senior leaders. Exact publication date and fieldwork dates are not shown on the page: requires verification against the full PDF.", status:"partial"},
  {id:"NVFSI26", title:"From Pilot to Profit: Survey Reveals the Financial Services Industry Is Doubling Down on AI Investment and Open Source", pub:"NVIDIA Blog (State of AI in Financial Services, 6th edition)", date:"2026-01-22", type:"NVIDIA State of AI report", url:"https://blogs.nvidia.com/blog/ai-in-financial-services-survey-2026", method:"Survey of more than 800 financial services industry professionals. Fieldwork dates and sampling method not stated in the blog summary.", status:"verified"},
  {id:"NVFSI25", title:"AI Pays Off: Survey Reveals Financial Industry's Latest Technological Trends", pub:"NVIDIA Blog (State of AI in Financial Services, 5th edition)", date:"2025-02-05", type:"NVIDIA State of AI report", url:"https://blogs.nvidia.com/blog/ai-in-financial-services-survey-2025/", method:"Annual industry survey. Respondent count not stated in the blog summary.", status:"verified"},
  {id:"UPT25", title:"Uptime Institute Global Data Center Survey 2025 (Keynote Report 180)", pub:"Uptime Institute Intelligence", date:"2025-07", type:"Industry research", url:"https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025", method:"Annual operator survey. Respondent count and the exact average PUE value are not visible on the public summary: requires verification against the full report.", status:"partial"},
  {id:"UPTPUE", title:"Mapping PUE trends by data center region, age and size (Update 420)", pub:"Uptime Institute Intelligence", date:"2025-10", type:"Industry research", url:"https://intelligence.uptimeinstitute.com/resource/mapping-pue-trends-data-center-region-age-and-size", method:"PUE question n=681. Figure values are gated; only the statement that global average PUE has been relatively stable since 2018 is public.", status:"partial"},
  {id:"EIA", title:"Electric Power Monthly, Table 5.6.A: Average Price of Electricity to Ultimate Customers by End-Use Sector", pub:"U.S. Energy Information Administration", date:"2026-10-23", type:"Government data", url:"https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a", method:"Monthly data release. The sector price values could not be extracted during verification: the simulator's electricity default is illustrative and requires verification against this table.", status:"partial"},
  // NVIDIA financial
  {id:"NVIR26", title:"NVIDIA Announces Financial Results for Fourth Quarter and Fiscal 2026", pub:"NVIDIA Investor Relations", date:"2026-02-25", type:"NVIDIA investor relations", url:"https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Fourth-Quarter-and-Fiscal-2026/default.aspx", method:"Company press release (fiscal year ended Jan 25, 2026).", status:"verified"},
  // NVIDIA product documentation
  {id:"GB200", title:"NVIDIA GB200 NVL72", pub:"NVIDIA (product page)", date:"2026-08-27", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/data-center/gb200-nvl72/", method:"Specifications and footnoted performance claims. NVIDIA notes: 'Projected performance subject to change.'", status:"verified"},
  {id:"GB200B", title:"NVIDIA GB200 NVL72 Delivers Trillion-Parameter LLM Training and Real-Time Inference", pub:"NVIDIA Technical Blog", date:"2024-03-18", type:"NVIDIA developer blog", url:"https://developer.nvidia.com/blog/nvidia-gb200-nvl72-delivers-trillion-parameter-llm-training-and-real-time-inference/", method:"Architecture overview with footnoted benchmark configurations.", status:"verified"},
  {id:"HGX", title:"NVIDIA HGX Platform", pub:"NVIDIA (product page)", date:"2026-09-30", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/data-center/hgx/", method:"Product specifications.", status:"verified"},
  {id:"VR", title:"NVIDIA Vera Rubin NVL72", pub:"NVIDIA (product page)", date:"2026", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/", method:"NVIDIA labels specifications 'Preliminary information. All values are up to and subject to change.' ", status:"verified"},
  {id:"VRPR", title:"NVIDIA Vera Rubin Ramps Into Full Production to Power Agentic AI Factories Worldwide", pub:"NVIDIA Newsroom", date:"2026-05-31", type:"NVIDIA press release", url:"https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory", method:"Company press release (GTC Taipei).", status:"verified"},
  {id:"DSX", title:"NVIDIA Releases Vera Rubin DSX AI Factory Reference Design and Omniverse DSX Digital Twin Blueprint", pub:"NVIDIA Newsroom", date:"2026-03-16", type:"NVIDIA press release", url:"https://nvidianews.nvidia.com/news/nvidia-releases-vera-rubin-dsx-ai-factory-reference-design-and-omniverse-dsx-digital-twin-blueprint-with-broad-industry-support", method:"Company press release (GTC).", status:"verified"},
  {id:"AIF", title:"AI Factories", pub:"NVIDIA (solutions page)", date:"2026-10-22", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/solutions/ai-factories/", method:"Solution overview.", status:"verified"},
  {id:"BF4PR", title:"NVIDIA BlueField-4 Powers New Class of AI-Native Storage Infrastructure for the Next Frontier of AI", pub:"NVIDIA Newsroom", date:"2026-01-05", type:"NVIDIA press release", url:"https://nvidianews.nvidia.com/news/nvidia-bluefield-4-powers-new-class-of-ai-native-storage-infrastructure-for-the-next-frontier-of-ai", method:"Company press release (CES 2026).", status:"verified"},
  {id:"CMXB", title:"Introducing NVIDIA BlueField-4-Powered CMX Context Memory Storage Platform", pub:"NVIDIA Technical Blog", date:"2026-03-16", type:"NVIDIA developer blog", url:"https://developer.nvidia.com/blog/introducing-nvidia-bluefield-4-powered-inference-context-memory-storage-platform-for-the-next-frontier-of-ai/", method:"Technical overview. Claims compared with 'traditional/general-purpose storage'; test configuration not stated.", status:"verified"},
  {id:"CMX", title:"NVIDIA CMX Context Memory Storage Platform", pub:"NVIDIA (product page)", date:"2026-08-04", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/data-center/ai-storage/cmx/", method:"Product overview.", status:"verified"},
  {id:"DPU", title:"NVIDIA BlueField Platform (DPU)", pub:"NVIDIA (product page)", date:"n.d.", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/networking/products/data-processing-unit/", method:"Product overview. No date shown on page.", status:"verified"},
  {id:"SPX", title:"NVIDIA Spectrum-X Ethernet Platform", pub:"NVIDIA (product page)", date:"2026-10-22", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/networking/spectrumx/", method:"Product overview with vendor comparison claims.", status:"verified"},
  {id:"CPU", title:"NVIDIA Grace and Vera CPUs", pub:"NVIDIA (product page)", date:"2026-09-15", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/data-center/grace-cpu/", method:"Product overview.", status:"verified"},
  {id:"DYN", title:"NVIDIA Dynamo", pub:"NVIDIA (product page)", date:"2026-04-08", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/ai/dynamo/", method:"Product overview; cites independent benchmarks for throughput claims.", status:"verified"},
  {id:"NIM", title:"NVIDIA NIM for Developers", pub:"NVIDIA Developer", date:"2026-10-12", type:"NVIDIA product documentation", url:"https://developer.nvidia.com/nim", method:"Product overview.", status:"verified"},
  {id:"CUDA", title:"CUDA Toolkit", pub:"NVIDIA Developer", date:"2026-11-05", type:"NVIDIA product documentation", url:"https://developer.nvidia.com/cuda-toolkit", method:"Product overview.", status:"verified"},
  {id:"SPOD", title:"NVIDIA DGX SuperPOD", pub:"NVIDIA (product page)", date:"2026-02-24", type:"NVIDIA product documentation", url:"https://www.nvidia.com/en-us/data-center/dgx-superpod/", method:"Product overview.", status:"verified"},
  // Competitors
  {id:"AMD355", title:"AMD Instinct MI355X GPU", pub:"AMD (product page)", date:"2025-10-20", type:"Competitor documentation", url:"https://www.amd.com/en/products/accelerators/instinct/mi350/mi355x.html", method:"Product specifications; launch date listed as 6/12/2025.", status:"verified"},
  {id:"ROCM", title:"AMD ROCm Software", pub:"AMD (product page)", date:"2026-10-12", type:"Competitor documentation", url:"https://www.amd.com/en/products/software/rocm.html", method:"Software platform overview.", status:"verified"},
  {id:"TPU7", title:"TPU7x (Ironwood)", pub:"Google Cloud documentation", date:"2026-11-18", type:"Competitor documentation", url:"https://docs.cloud.google.com/tpu/docs/tpu7x", method:"Product documentation (last updated date shown).", status:"verified"},
  {id:"TPUB", title:"Announcing Ironwood TPUs General Availability and new Axion-based VMs", pub:"Google Cloud Blog", date:"2025-11-06", type:"Competitor documentation", url:"https://cloud.google.com/blog/products/compute/ironwood-tpus-and-new-axion-based-vms-for-your-ai-workloads/", method:"Product announcement.", status:"verified"},
  {id:"TPUI", title:"Introduction to Cloud TPU", pub:"Google Cloud documentation", date:"2026-11-10", type:"Competitor documentation", url:"https://docs.cloud.google.com/tpu/docs/intro-to-tpu", method:"Product documentation.", status:"verified"},
  {id:"TRN3", title:"Announcing Amazon EC2 Trn3 UltraServers for faster, lower-cost generative AI training", pub:"AWS What's New", date:"2025-12-02", type:"Competitor documentation", url:"https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-ec2-trn3-ultraservers", method:"General availability announcement.", status:"verified"},
  {id:"INF", title:"AWS Inferentia", pub:"Amazon Web Services (product page)", date:"2026-10-26", type:"Competitor documentation", url:"https://aws.amazon.com/ai/machine-learning/inferentia/", method:"Product overview.", status:"verified"},
  // Libraries
  {id:"CHARTJS", title:"Chart.js v4.4.7 (MIT License), bundled in assets/js/vendor", pub:"Chart.js contributors", date:"2024-12", type:"Software library", url:"https://www.chartjs.org/", method:"Bundled locally so the application works offline and needs no CDN.", status:"verified"},
  {id:"LUCIDE", title:"Lucide icons v0.460.0 (ISC License), embedded as an SVG sprite", pub:"Lucide contributors", date:"2024-11", type:"Software library", url:"https://lucide.dev/", method:"Embedded so the application works offline.", status:"verified"}
];
const SRC = Object.fromEntries(SOURCES.map(s => [s.id, s]));

/* ---------- Executive overview KPIs (all verified) ---------- */
const KPIS = [
  {val:"88", unit:"%", label:"of respondents report regular AI use in at least one business function", src:"MCK25", detail:"Up from 78% a year earlier. The 2026 edition reports 'nearly nine in ten' without an exact figure.", theme:"Adoption"},
  {val:"44", unit:"%", label:"say AI is scaling across their enterprise (up from 38%)", src:"MCK26", detail:"Among respondents at organizations with $1B+ revenue, 54% report scaling, versus about one-third of smaller organizations.", theme:"Scaling"},
  {val:"37", unit:"%", label:"say AI contributed positively to enterprise EBIT", src:"MCK26", detail:"McKinsey describes this as essentially unchanged from 2025 (39%). Only about 6% of respondents qualify as 'AI high performers'.", theme:"ROI uncertainty"},
  {val:"1 in 5", unit:"", label:"say AI-related operating costs, including tokens, constrain their AI use", src:"MCK26", detail:"28% spend more than 10% of their enterprise ICT budget on AI; 60% expect to increase AI investment over the next year.", theme:"Cost"},
  {val:">2/3", unit:"", label:"expect 30% or fewer of their GenAI experiments to be fully scaled in the next 3–6 months", src:"DEL25", detail:"Respondents also cited a 'longer than expected time to value'. Concern about regulatory compliance rose from 28% to 38% across Deloitte's survey waves (per Deloitte summary).", theme:"Pilot-to-production"},
  {val:"44", unit:"%", label:"track per-unit inference cost, although 71% track total AI inference and API spend", src:"DEL26", detail:"Measurement gap: most organizations see the bill but not the unit economics. Deloitte 2026 also reports 28% now see revenue gains from AI, up from 20% in January.", theme:"Utilization & unit cost"},
  {val:"~2/3", unit:"", label:"of data center operators report difficulty retaining staff, finding qualified candidates, or both", src:"UPT25", detail:"Uptime also reports average rack densities rising slowly, mostly in the 10–30 kW range, with few facilities above 30 kW.", theme:"Talent & facilities"},
  {val:"30", unit:"%", label:"of financial services respondents say AI investment will focus on building or accessing AI infrastructure", src:"NVFSI26", detail:"Same survey: 65% are actively using AI (up from 45%); 42% are using or assessing agentic AI and 21% have deployed AI agents.", theme:"Infrastructure investment"}
];

const CHALLENGES = [
  {t:"Enterprise AI adoption challenges", d:"Use is near-universal, but only 44% report enterprise-wide scaling (MCK26) and more than two-thirds of GenAI leaders expected 30% or fewer experiments to scale in the near term (DEL25).", s:["MCK26","DEL25"], icon:"users"},
  {t:"Infrastructure investment complexity", d:"Platform choices now span rack-scale systems, networking, storage tiers and software. Vendor claims are often 'up to' projections with configuration-specific footnotes (e.g., GB200 NVL72 and Vera Rubin NVL72 pages).", s:["GB200","VR"], icon:"layers"},
  {t:"ROI uncertainty", d:"37% report positive EBIT contribution from AI (MCK26). Deloitte respondents cite a longer than expected time to value (DEL25).", s:["MCK26","DEL25"], icon:"trending-up"},
  {t:"GPU utilization and unit-cost visibility", d:"Only 44% track per-unit inference cost (DEL26). No credible public benchmark of average enterprise GPU utilization was found: utilization is treated as a scenario input, not a statistic.", s:["DEL26"], icon:"gauge"},
  {t:"Talent and implementation barriers", d:"About two-thirds of data center operators report staffing difficulty, and most racks remain in the 10–30 kW range (UPT25), well below dense, liquid-cooled rack-scale designs.", s:["UPT25"], icon:"server"}
];

const PMM_LEVERS = [
  {t:"Translate specs into outcomes", d:"Map each capability (e.g., NVLink bandwidth) to the business metric it moves (e.g., time-to-train, cost per token) for each role."},
  {t:"Make TCO transparent", d:"Give CFOs and procurement an open model with editable assumptions, rather than a single headline multiple."},
  {t:"Address unit economics", d:"Help buyers instrument cost per productive GPU-hour and per million tokens, the metric most organizations do not yet track."},
  {t:"De-risk the path to production", d:"Reference architectures, partner validation and staged evaluation plans address pilot-to-production friction."},
  {t:"Educate facilities stakeholders", d:"Power density, cooling and PUE are adoption gates; content for data center managers is often missing."},
  {t:"Prove claims responsibly", d:"Pair every performance claim with its comparison baseline, workload and date to protect credibility with technical evaluators."}
];

/* ---------- Market intelligence ---------- */
const BARRIERS = [
  {b:"Scaling beyond pilots", cat:"Scale", aud:"Business", ev:"verified", e:">2/3 of GenAI leaders expect ≤30% of experiments to be fully scaled within 3–6 months.", s:"DEL25"},
  {b:"Scaling beyond pilots", cat:"Scale", aud:"Business", ev:"verified", e:"44% report AI scaling across the enterprise in 2026, up from 38%.", s:"MCK26"},
  {b:"Limited enterprise-level financial impact", cat:"Cost & ROI", aud:"Business", ev:"verified", e:"37% report a positive EBIT contribution from AI; ~6% are high performers.", s:"MCK26"},
  {b:"Operating cost of AI (incl. tokens)", cat:"Cost & ROI", aud:"Both", ev:"verified", e:"About one in five say AI operating costs, including tokens, constrain AI use.", s:"MCK26"},
  {b:"Unit-cost visibility", cat:"Cost & ROI", aud:"Technical", ev:"verified", e:"71% track total inference/API spend, only 44% track per-unit inference cost.", s:"DEL26"},
  {b:"Time to value", cat:"Cost & ROI", aud:"Business", ev:"verified", e:"Respondents report a longer than expected time to value for GenAI.", s:"DEL25"},
  {b:"Regulatory and compliance concern", cat:"Governance & risk", aud:"Business", ev:"verified", e:"Compliance concern rose from 28% to 38% across survey waves (per Deloitte summary).", s:"DEL25"},
  {b:"AI risk and inaccuracy", cat:"Governance & risk", aud:"Both", ev:"verified", e:"51% of AI-using organizations report at least one negative consequence; nearly one-third cite inaccuracy.", s:"MCK25"},
  {b:"Data residency and sovereignty", cat:"Governance & risk", aud:"Business", ev:"verified", e:"74% say data residency and in-region compute are at least moderately important to their AI strategy.", s:"DEL26"},
  {b:"Facilities talent shortage", cat:"Talent & skills", aud:"Technical", ev:"verified", e:"Nearly two-thirds of operators report difficulty retaining or finding qualified staff.", s:"UPT25"},
  {b:"Power density readiness", cat:"Infrastructure", aud:"Technical", ev:"verified", e:"Most rack densities are 10–30 kW; few facilities exceed 30 kW.", s:"UPT25"},
  {b:"Energy efficiency plateau", cat:"Infrastructure", aud:"Technical", ev:"verified", e:"Average PUE has shown little change for the sixth consecutive year.", s:"UPT25"},
  {b:"GPU under-utilization erodes ROI", cat:"Infrastructure", aud:"Technical", ev:"hypothesis", e:"Idle or fragmented accelerator capacity raises cost per productive GPU-hour (see simulator). No verified industry average found.", s:""},
  {b:"Complexity of evaluating full-stack platforms", cat:"Infrastructure", aud:"Both", ev:"hypothesis", e:"Buyers must assess compute, networking, storage and software together; most evaluation templates compare chips in isolation.", s:""},
  {b:"Skills gap in MLOps and inference optimization", cat:"Talent & skills", aud:"Technical", ev:"hypothesis", e:"Serving frameworks, quantization and KV-cache management require specialized skills that pilots rarely build.", s:""},
  {b:"Vendor lock-in concern", cat:"Governance & risk", aud:"Business", ev:"hypothesis", e:"Procurement may weigh software portability and multi-cloud optionality alongside performance.", s:""}
];

const SIZE_DATA = {
  scale:{labels:["$1B+ revenue","Smaller organizations"], vals:[54,33], note:"McKinsey 2026: 54% of respondents at $1B+ organizations report scaling AI, versus 'about one-third' of smaller organizations (plotted as 33%)."},
  agents:{labels:["$1B+ revenue","Smaller organizations"], vals:[40,22], note:"McKinsey 2026: 40% of $1B+ organizations are scaling AI agents in one or more functions (up from 27%); smaller organizations flat at 22%."}
};

const FSI_DATA = {labels:["Actively using AI","Using/assessing GenAI","Using/assessing agentic AI","AI agents deployed","Investment → AI infrastructure","AI raised revenue >5%"], vals:[65,61,42,21,30,64]};

const INDUSTRIES = ["Financial Services","Healthcare","Retail","Manufacturing","Cloud Services","Enterprise Technology"];
const SEGMENTS = {
  "Financial Services":{evidence:"Industry-specific verified data available (NVIDIA State of AI in Financial Services 2026).", pains:["Model risk management and explainability requirements","Latency-sensitive workloads (fraud detection, trading)","Data residency and regulatory oversight"], buyers:"CIO/CTO, Chief Risk Officer, CFO, Head of Quant/AI", workloads:"Fraud detection, document processing, RAG for research, agentic customer service", src:"NVFSI26"},
  "Healthcare":{evidence:"No industry-specific survey verified for this tool.", pains:["Patient data privacy and on-premises requirements","Validation burden for clinical use","Large imaging and genomics datasets"], buyers:"CIO, CMIO, Research Computing Director", workloads:"Medical imaging, genomics, clinical documentation assistants", src:""},
  "Retail":{evidence:"No industry-specific survey verified for this tool.", pains:["Seasonal demand spikes in inference traffic","Thin margins require clear unit economics","Personalization latency"], buyers:"CDO, CTO, VP E-commerce, CFO", workloads:"Recommendation, search, customer service agents, demand forecasting", src:""},
  "Manufacturing":{evidence:"No industry-specific survey verified for this tool.", pains:["OT/IT integration and edge constraints","Digital twin and simulation compute","Limited in-house AI talent"], buyers:"COO, VP Operations, CTO, Plant IT", workloads:"Visual inspection, predictive maintenance, digital twins, robotics", src:""},
  "Cloud Services":{evidence:"No industry-specific survey verified for this tool.", pains:["Capacity planning against volatile demand","Multi-tenant utilization and isolation","Power and space constraints"], buyers:"VP Infrastructure, Data Center Ops, Product (GPU cloud)", workloads:"Training-as-a-service, inference endpoints, managed AI platforms", src:""},
  "Enterprise Technology":{evidence:"No industry-specific survey verified for this tool.", pains:["Embedding AI features across a product portfolio","Cost per token at SaaS scale","Developer productivity"], buyers:"CTO, VP Engineering, CPO, FinOps", workloads:"Coding agents, AI features in SaaS, RAG, agentic workflows", src:""}
};

const TVB = [
  ["Primary question","Will it perform, integrate and scale for our workloads?","Will it pay back, and what is the risk?"],
  ["Proof they trust","Reproducible benchmarks, reference architectures, documentation","Peer case studies, TCO models, analyst views"],
  ["Key metrics","Throughput, latency, memory bandwidth, utilization, power per rack","TCO, NPV, payback, cost per outcome, time to value"],
  ["Common objections","Software compatibility, facility readiness, skills","Upfront capex, uncertain benefits, lock-in"],
  ["Content format","Technical blogs, datasheets, sizing guides, sandboxes","Executive briefs, ROI calculators, one-pagers"],
  ["Language","Precise, quantified, footnoted","Outcome-led, comparative, risk-aware"]
];

const PURCHASE = [
  {t:"Total cost of ownership", d:"Acquisition, energy (incl. PUE), maintenance, software and migration over the asset life."},
  {t:"Workload fit", d:"Training vs. inference mix, model sizes, context lengths, latency targets."},
  {t:"Software ecosystem & portability", d:"Framework support, existing code, serving stack, skills availability."},
  {t:"Deployment model", d:"On-premises, colocation, public cloud, or hybrid; data residency requirements (74% rate residency at least moderately important, DEL26)."},
  {t:"Facility readiness", d:"Rack power density, liquid cooling, floor loading and grid capacity."},
  {t:"Time to production", d:"Reference designs, partner integration, validated configurations."},
  {t:"Vendor roadmap & supply", d:"Generational cadence, availability windows and upgrade path."}
];

const TRENDS = [
  {t:"Agentic AI moves from experiment to scale", d:"23% scaling an agentic system and 39% experimenting (MCK25); 40% of $1B+ organizations scaling agents in 2026 (MCK26).", s:"MCK26"},
  {t:"Inference unit economics become a board topic", d:"About one in five report AI operating costs, including tokens, constrain use (MCK26); 44% track per-unit inference cost (DEL26).", s:"DEL26"},
  {t:"Open source in AI strategy", d:"84% of financial services respondents say open source models and software are important to their AI strategy (the blog body states 83%; the page is internally inconsistent).", s:"NVFSI26"},
  {t:"Sovereign and in-region compute", d:"74% say data residency and in-region compute are at least moderately important (DEL26).", s:"DEL26"},
  {t:"Context memory as a new infrastructure tier", d:"NVIDIA introduced a BlueField-4-powered context memory storage platform for long-context, agentic inference (Jan 2026).", s:"BF4PR"},
  {t:"Gigawatt-scale AI factory reference designs", d:"NVIDIA released the Vera Rubin DSX AI Factory reference design and Omniverse DSX Blueprint (Mar 2026).", s:"DSX"}
];

const IMPLICATIONS = [
  {t:"Lead with unit economics, not peak specs", d:"Because cost constraints and weak unit-cost tracking are documented, position platforms around cost per token and cost per productive GPU-hour, with an open calculator buyers can audit.", tag:"Messaging"},
  {t:"Build a pilot-to-production playbook", d:"The scaling gap suggests demand for staged evaluation plans, reference architectures and partner-delivered proofs of value, aimed at the transition rather than the first pilot.", tag:"Enablement"},
  {t:"Create role-specific content tracks", d:"CFO, procurement and data center manager audiences need different proof than AI engineers. A message map per role reduces translation work for sales.", tag:"Content strategy"},
  {t:"Address facility readiness proactively", d:"With most racks at 10–30 kW, facilities and power readiness are adoption gates. Content on liquid cooling, power planning and modular deployment can unblock deals.", tag:"Market education"},
  {t:"Make claims audit-ready", d:"Pair every 'up to' claim with workload, baseline and date. Technical credibility is a differentiator when buyers compare footnotes.", tag:"Governance"},
  {t:"Segment by company size and maturity", d:"Large enterprises are scaling faster (54% vs ~one-third). Offer self-serve, cloud-first entry paths for smaller organizations and full-stack AI factory narratives for large ones.", tag:"Segmentation"}
];

/* ---------- Infrastructure explorer ---------- */
const LAYERS = [
  {id:"software", label:"Software", items:["software"]},
  {id:"facility", label:"Data center", items:["aifactory","modular"]},
  {id:"systems", label:"Platforms", items:["blackwell","rubin"]},
  {id:"compute", label:"Compute", items:["gpu","cpudpu"]},
  {id:"fabric", label:"Fabric & data", items:["nvlink","storage"]},
  {id:"workloads", label:"Workloads", items:["workloads"]}
];

const COMPONENTS = {
  gpu:{name:"GPUs & accelerated computing", short:"Parallel processors for AI math", icon:"cpu",
    what:{tech:"Graphics processing units execute thousands of parallel threads and include Tensor Cores specialized for the matrix operations at the heart of neural networks, with high-bandwidth memory (HBM) attached.", biz:"Specialized processors that perform the calculations behind AI models far faster than general-purpose servers, so AI products can be trained and served at practical cost and speed."},
    how:{tech:"Workloads are expressed through CUDA and higher-level libraries; Tensor Cores support reduced-precision formats (e.g., FP8, NVFP4) that increase throughput per watt for suitable models.", biz:"Software tools let developers use the hardware without rewriting their AI applications. Lower-precision math lets the same hardware do more work per unit of energy, where accuracy allows."},
    why:{tech:"AI throughput is bounded by compute, memory bandwidth and interconnect; GPU generations raise all three.", biz:"Compute capacity determines how quickly new AI features ship and how much each AI interaction costs."},
    problem:"Insufficient compute for model training and inference demand; slow time to results.",
    metrics:[["HGX B200","8× Blackwell SXM GPUs; 1.4 TB total memory","HGX"],["HGX B300","8× Blackwell Ultra SXM GPUs; 2.1 TB total memory","HGX"],["Status","NVIDIA: 'HGX B300 and HGX B200 shipping now'","HGX"]],
    benefits:["Shorter model development cycles","Capacity for new AI products","Lower cost per inference where utilization is high"],
    segments:["AI Engineer","CTO","Cloud Services","Enterprise Technology"], docs:["HGX","CUDA"]},
  blackwell:{name:"NVIDIA Blackwell (GB200 NVL72)", short:"Rack-scale Grace Blackwell system", icon:"server",
    what:{tech:"GB200 NVL72 connects 36 Grace CPUs and 72 Blackwell GPUs in a rack-scale, liquid-cooled design that acts as a single NVLink domain.", biz:"A complete, pre-engineered rack that behaves like one very large AI computer, intended for the largest models and real-time AI services."},
    how:{tech:"Fifth-generation NVLink provides 1.8 TB/s GPU-to-GPU bandwidth; the NVLink Switch System provides 130 TB/s across the rack. Rack holds 13.4 TB HBM3E at 576 TB/s.", biz:"High-speed links let all 72 GPUs share work and memory, which matters for very large models that do not fit on a single server."},
    why:{tech:"Trillion-parameter and mixture-of-experts models are communication-bound; a larger NVLink domain reduces cross-node traffic.", biz:"Running the largest models in real time requires infrastructure designed as a system, not just faster chips."},
    problem:"Serving very large models at interactive latency; training frontier-scale models within a fixed time window.",
    metrics:[["Configuration","36 Grace CPUs | 72 Blackwell GPUs","GB200"],["NVFP4 Tensor Core (rack)","1,440 | 720 PFLOPS (sparse | dense)","GB200"],["GPU memory | bandwidth","13.4 TB HBM3E | 576 TB/s","GB200"],["NVLink bandwidth","130 TB/s","GB200"],["Vendor claim","Up to 30× real-time LLM inference and 25× energy efficiency vs. H100 (footnoted configuration; projected)","GB200"],["Vendor claim","4× LLM training vs. H100 (GPT-MoE-1.8T configuration)","GB200B"]],
    benefits:["Higher throughput per rack for large-model inference","Potential energy efficiency gains per unit of work (vendor-claimed, configuration-specific)","Fewer, denser racks"],
    segments:["CTO","Data Center Manager","Cloud Services","Financial Services"], docs:["GB200","GB200B"]},
  rubin:{name:"NVIDIA Vera Rubin (NVL72)", short:"Rack-scale platform after Blackwell", icon:"boxes",
    what:{tech:"Vera Rubin NVL72 combines 72 Rubin GPUs, 36 Vera CPUs, ConnectX-9 SuperNICs and BlueField-4 DPUs with an NVLink 6 switch in a third-generation MGX NVL72 rack design.", biz:"NVIDIA's next rack-scale AI platform, positioned for agentic AI and lower cost per AI output than the prior generation."},
    how:{tech:"Rack totals (preliminary): 20.7 TB HBM4 at 1,580 TB/s; 260 TB/s NVLink 6 switch bandwidth; 3,600 PFLOPS NVFP4 inference.", biz:"More memory and faster connections per rack let one system handle longer conversations and larger models."},
    why:{tech:"Agentic workloads multiply token volume; NVIDIA states agentic systems consume up to 15× more tokens than traditional AI applications.", biz:"If agents drive token volume up, cost per million tokens becomes the critical economic metric."},
    problem:"Rising inference cost as agentic and long-context workloads scale.",
    metrics:[["Configuration","72 Rubin GPUs, 36 Vera CPUs","VR"],["GPU memory | bandwidth (rack)","20.7 TB HBM4 | 1,580 TB/s (preliminary)","VR"],["NVFP4 inference (rack)","3,600 PFLOPS (preliminary)","VR"],["Vendor claim","One-tenth the cost per million tokens vs. GB200 NVL72 (Kimi-K2-Thinking, 32K/8K ISL/OSL; projected)","VR"],["Production status","'Ramping into full production'; production shipments 'set to begin starting this fall' (May 31, 2026)","VRPR"]],
    benefits:["Lower projected cost per token for agentic inference","Fewer GPUs for large mixture-of-experts training (vendor projection)","Higher tokens per megawatt (vendor projection)"],
    segments:["CEO","CFO","Cloud Services","Enterprise Technology"], docs:["VR","VRPR"]},
  workloads:{name:"AI inference & model training", short:"The two economic modes of AI", icon:"zap",
    what:{tech:"Training optimizes model weights over large datasets (compute- and communication-bound). Inference serves trained models to users, constrained by latency, memory bandwidth and KV-cache capacity.", biz:"Training builds the AI model once (a capital project); inference runs it every time a customer or employee uses it (an ongoing operating cost)."},
    how:{tech:"Inference serving uses disaggregated prefill/decode, batching and KV-cache reuse (e.g., NVIDIA Dynamo, NIM microservices) to raise throughput per GPU.", biz:"Serving software decides how many requests each GPU can handle, which directly sets cost per AI interaction."},
    why:{tech:"Inference demand scales with users and tokens; efficiency gains compound across every request.", biz:"For most enterprises, inference, not training, determines long-run AI operating cost."},
    problem:"Unclear unit economics for AI services in production.",
    metrics:[["Dynamo (vendor claim)","Up to 7× MoE throughput, GB200 NVL72 + Dynamo vs. B200-based systems","DYN"],["NIM","Self-hostable inference microservices with industry-standard APIs","NIM"]],
    benefits:["Predictable cost per inference","Faster responses for customer-facing AI","Clear separation of capex (training) and opex (serving) planning"],
    segments:["CFO","AI Engineer","All industries"], docs:["DYN","NIM"]},
  cpudpu:{name:"CPUs & DPUs", short:"Grace/Vera CPUs, BlueField DPUs", icon:"cable",
    what:{tech:"Grace and Vera are NVIDIA Arm-based CPUs coupled to GPUs over NVLink-C2C. BlueField DPUs offload networking, storage and security from host CPUs.", biz:"Supporting processors that feed data to GPUs and handle networking and security tasks, so GPUs spend more time on AI work."},
    how:{tech:"Vera: 88 NVIDIA-designed Olympus cores, up to 1.2 TB/s memory bandwidth; NVLink-C2C up to 1.8 TB/s bidirectional. BlueField-4 is an 800 Gb/s infrastructure platform.", biz:"A coherent CPU-GPU link and offloaded infrastructure tasks reduce bottlenecks that leave expensive GPUs waiting."},
    why:{tech:"Host overhead and I/O stalls reduce effective accelerator utilization.", biz:"Idle GPUs are paid for but not productive; supporting processors protect utilization and security."},
    problem:"GPU idle time from data movement and infrastructure overhead; zero-trust security requirements.",
    metrics:[["Vera CPU","88 Olympus cores; up to 1.5 TB memory per CPU","CPU"],["NVLink-C2C","Up to 1.8 TB/s bidirectional ('7× faster than PCIe Gen 6')","CPU"],["BlueField-4","800 Gb/s infrastructure platform","DPU"],["BlueField-3","400 Gb/s infrastructure compute platform","DPU"]],
    benefits:["Higher effective GPU utilization","Infrastructure security isolation","Lower host CPU overhead"],
    segments:["Data Center Manager","AI Engineer","Cloud Services"], docs:["CPU","DPU"]},
  nvlink:{name:"NVLink & high-speed networking", short:"Scale-up and scale-out fabrics", icon:"network",
    what:{tech:"NVLink scales up GPUs into one memory-coherent domain; Spectrum-X Ethernet and SuperNICs scale out across racks and data centers.", biz:"The connections between GPUs. Fast links let many GPUs work as one, so large jobs finish sooner and fewer resources sit idle."},
    how:{tech:"Fifth-gen NVLink: 1.8 TB/s per GPU (over 14× PCIe Gen5). Spectrum-X pairs Spectrum-X switches with SuperNICs; ConnectX-9 delivers 1,600 Gb/s per GPU.", biz:"Purpose-built AI networking reduces congestion when thousands of GPUs exchange data."},
    why:{tech:"Collective communication dominates at scale; network efficiency limits cluster-level utilization.", biz:"Networking determines whether doubling GPUs roughly doubles output, or not."},
    problem:"Poor scaling efficiency and long job completion times in large clusters.",
    metrics:[["NVLink (5th gen)","1.8 TB/s GPU-to-GPU","GB200"],["Spectrum-X (vendor claim)","1.6× AI network performance vs. off-the-shelf Ethernet","SPX"],["Spectrum-X scale","Up to 128K GPUs in two tiers","SPX"],["ConnectX-9","1,600 Gb/s per GPU","SPX"]],
    benefits:["Better scaling efficiency","Shorter time-to-train","Reuse of Ethernet operational skills (Spectrum-X)"],
    segments:["AI Engineer","Data Center Manager","Cloud Services"], docs:["SPX","GB200B"]},
  storage:{name:"AI storage & context memory", short:"CMX context memory tier", icon:"hard-drive",
    what:{tech:"NVIDIA CMX is a BlueField-4-powered, Ethernet-attached flash tier optimized for KV cache, providing petabytes of shared context capacity per GPU pod.", biz:"A new storage layer that remembers the 'context' of long AI conversations and agent tasks, so it does not have to be recomputed."},
    how:{tech:"KV-cache blocks are offloaded from HBM to a pod-level tier and reused across requests via Dynamo, NIXL and DOCA, over Spectrum-X Ethernet.", biz:"Reusing previous work avoids repeating expensive computation for multi-turn and agentic AI."},
    why:{tech:"Long-context and multi-turn inference exhausts GPU memory; recomputation wastes compute.", biz:"Agentic AI keeps more context in play; storing it efficiently lowers cost per task."},
    problem:"Memory limits and recomputation costs for long-context, multi-turn and agentic inference.",
    metrics:[["Vendor claim","Up to 5× tokens per second and up to 5× power efficiency vs. traditional storage (test configuration not stated)","BF4PR"],["Capacity","'Petabytes of shared capacity per GPU pod'","CMXB"],["Availability","BlueField-4 'available in the second half of 2026' (Jan 2026 statement)","BF4PR"]],
    benefits:["Lower cost per long-context interaction","Higher sustained throughput for agents","Storage partner ecosystem choice"],
    segments:["AI Engineer","CTO","Enterprise Technology"], docs:["CMX","CMXB","BF4PR"]},
  modular:{name:"Modular data centers", short:"MGX racks & reference designs", icon:"layers",
    what:{tech:"Modular, standardized building blocks: the third-generation MGX NVL72 rack design with cable-free modular trays, and DGX SuperPOD as a turnkey full-stack cluster.", biz:"Pre-validated, repeatable building blocks that shorten the time from purchase order to production AI capacity."},
    how:{tech:"Reference architectures specify compute, networking, storage, power and cooling together, enabling partners to build to a common design.", biz:"Using a tested blueprint reduces integration risk and dependence on scarce in-house expertise."},
    why:{tech:"Rack-scale systems have tight power, cooling and cabling requirements.", biz:"Faster, lower-risk deployment protects ROI timelines."},
    problem:"Long, risky integration projects and facility readiness gaps.",
    metrics:[["Rack design","Third-generation MGX NVL72; cable-free modular tray designs","VR"],["DGX SuperPOD","'Scaling to tens of thousands of NVIDIA GPUs'","SPOD"]],
    benefits:["Faster time to production","Lower integration risk","Repeatable expansion"],
    segments:["Data Center Manager","Procurement Executive","CTO"], docs:["SPOD","VR"]},
  aifactory:{name:"AI factories", short:"Purpose-built intelligence production", icon:"factory",
    what:{tech:"NVIDIA defines AI factories as purpose-built to 'manufacture intelligence at scale', unifying five layers: energy, chips, infrastructure, models and applications.", biz:"A way of thinking about AI infrastructure as a production line whose output is tokens and AI decisions, measured like any factory."},
    how:{tech:"The Vera Rubin DSX AI Factory reference design and Omniverse DSX Blueprint guide codesigned infrastructure and digital-twin planning for gigawatt-scale sites.", biz:"Planning tools model the facility before it is built, reducing costly surprises in power and cooling."},
    why:{tech:"At gigawatt scale, power availability and tokens per megawatt become binding constraints.", biz:"Framing AI as a factory makes output, cost per unit and utilization the management metrics."},
    problem:"Executives lack an operating model to measure AI infrastructure productivity.",
    metrics:[["Definition","'Purpose-built to manufacture intelligence at scale'","AIF"],["DSX Blueprint","Omniverse DSX Blueprint 'now generally available' (Mar 2026)","DSX"],["Vendor claim (Rubin)","Up to 10× more tokens per megawatt vs. GB200 NVL72 (projected)","VR"]],
    benefits:["Output-based KPIs (tokens, cost per token)","Capacity planning tied to business demand","Energy-aware design"],
    segments:["CEO","CFO","Cloud Services"], docs:["AIF","DSX"]},
  software:{name:"Software ecosystem", short:"CUDA, NIM, Dynamo", icon:"layers",
    what:{tech:"CUDA Toolkit (compiler, libraries, tools), NIM inference microservices, and Dynamo, an open-source distributed inference-serving framework that supports SGLang, TensorRT-LLM and vLLM.", biz:"The software that makes the hardware usable and keeps getting faster after purchase, which is often the deciding factor for developers."},
    how:{tech:"Applications target CUDA libraries; NIM packages models behind standard APIs; Dynamo orchestrates multi-node serving.", biz:"Pre-packaged software shortens deployment and lets teams reuse skills and code."},
    why:{tech:"Software determines achievable utilization and portability across deployment targets.", biz:"Ecosystem maturity lowers implementation risk and talent cost."},
    problem:"Deployment complexity and long time to production.",
    metrics:[["CUDA","CUDA 13.5 current release","CUDA"],["NIM","Runs across cloud, data center and RTX PCs","NIM"],["Dynamo","Open-source; supports SGLang, TensorRT-LLM, vLLM","DYN"]],
    benefits:["Faster development","Portability across on-premises and cloud","Performance gains from software updates"],
    segments:["AI Engineer","CTO","All industries"], docs:["CUDA","NIM","DYN"]}
};

/* ---------- Value navigator rule base ---------- */
const NAV_OPTS = {
  role:["CEO","CFO","CTO","AI Engineer","Data Center Manager","Procurement Executive"],
  industry:INDUSTRIES,
  workload:["Model Training","High-Volume Inference","Agentic AI","Generative AI Applications","Retrieval-Augmented Generation (RAG)"],
  challenge:["Infrastructure Cost","Energy Efficiency","Scalability","Deployment Complexity","GPU Utilization","Latency and Performance","Data and Storage Requirements"],
  maturity:["Exploring AI","Pilot Programs","Production Deployment","Scaling Enterprise AI"]
};

const ROLE_RULES = {
  "CEO":{lens:"strategic advantage and speed to market", care:"growth, differentiation and risk", metrics:["Time to launch AI-enabled products","Revenue or cost impact attributed to AI","Share of AI initiatives in production"], verb:"compete", tone:"outcome", q:["How will this platform keep pace with our AI roadmap over the next three years?","Which reference customers in our industry have reached production scale?"]},
  "CFO":{lens:"total cost of ownership and return on capital", care:"payback, cash flow and cost predictability", metrics:["TCO over asset life","NPV and payback period","Cost per productive GPU-hour","Cost per million tokens"], verb:"invest", tone:"financial", q:["What assumptions drive your TCO model, and can we audit them?","What is included in support and software licensing over the asset life?"]},
  "CTO":{lens:"architecture fit, scalability and roadmap", care:"platform longevity, integration and talent", metrics:["Scaling efficiency at target cluster size","Software stack compatibility","Upgrade path across generations"], verb:"architect", tone:"strategic-technical", q:["How does the platform integrate with our existing data, security and MLOps stack?","What is the upgrade path to the next generation?"]},
  "AI Engineer":{lens:"performance, tooling and developer productivity", care:"throughput, latency and framework support", metrics:["Tokens per second per GPU at target latency","Time to first token","Model FLOPs utilization","Framework and serving-stack support"], verb:"build", tone:"technical", q:["Which serving frameworks and quantization formats are supported for our models?","Can we reproduce your benchmark with our own model and sequence lengths?"]},
  "Data Center Manager":{lens:"power, cooling, density and operations", care:"facility readiness, uptime and efficiency", metrics:["kW per rack and cooling method","PUE impact","Tokens or jobs per megawatt","Mean time to repair"], verb:"operate", tone:"operational", q:["What rack power and liquid-cooling requirements apply?","What monitoring, serviceability and spares model is recommended?"]},
  "Procurement Executive":{lens:"commercial risk, supply and vendor terms", care:"pricing transparency, lead times and lock-in", metrics:["Total contract value vs. TCO","Delivery lead time","Support SLAs","Exit and portability options"], verb:"source", tone:"commercial", q:["What are lead times and allocation commitments?","Which components are standard vs. proprietary, and what are the exit options?"]}
};

const WORKLOAD_RULES = {
  "Model Training":{caps:["blackwell","nvlink","rubin","software"], tm:["Time-to-train for a reference model","Scaling efficiency from 1 to N nodes","Checkpoint and storage throughput"], benefit:"shorter training cycles and faster model iteration"},
  "High-Volume Inference":{caps:["workloads","blackwell","software","cpudpu"], tm:["Throughput at a target latency SLA","Cost per million tokens","Utilization under real traffic patterns"], benefit:"lower and more predictable cost per AI interaction"},
  "Agentic AI":{caps:["rubin","storage","workloads","cpudpu"], tm:["Tokens per task and end-to-end task latency","KV-cache hit rate for multi-turn sessions","Cost per completed agent task"], benefit:"economically viable multi-step agents at scale"},
  "Generative AI Applications":{caps:["workloads","software","gpu","blackwell"], tm:["Time to first token and tokens per second","Cost per generated output","Developer time to deploy a new model"], benefit:"faster delivery of GenAI features with controlled unit costs"},
  "Retrieval-Augmented Generation (RAG)":{caps:["storage","software","workloads","nvlink"], tm:["Retrieval latency plus generation latency","Context length supported at target cost","Data pipeline throughput"], benefit:"accurate, grounded answers from enterprise data at interactive speed"}
};

const CHALLENGE_RULES = {
  "Infrastructure Cost":{pain:"AI infrastructure spend is rising faster than the ability to attribute value to it", caps:["workloads","rubin"], metric:"cost per productive GPU-hour and cost per million tokens", risk:"Headline cost comparisons that omit utilization, energy and software costs"},
  "Energy Efficiency":{pain:"power availability and energy cost are limiting how much AI capacity can be deployed", caps:["blackwell","aifactory","modular"], metric:"useful work per kilowatt-hour (e.g., tokens per megawatt) and facility PUE", risk:"Facility upgrades (liquid cooling, power delivery) extend timelines and add capex"},
  "Scalability":{pain:"performance does not scale linearly as more accelerators are added", caps:["nvlink","blackwell","modular"], metric:"scaling efficiency and job completion time at target cluster size", risk:"Network and storage bottlenecks surfacing only at production scale"},
  "Deployment Complexity":{pain:"integration of compute, networking, storage and software is delaying production", caps:["software","modular","aifactory"], metric:"time from delivery to production workload", risk:"Skills gaps and custom integration work beyond the reference design"},
  "GPU Utilization":{pain:"expensive accelerators sit idle or fragmented, inflating cost per useful output", caps:["software","cpudpu","workloads"], metric:"average and peak utilization and cost per productive GPU-hour", risk:"Utilization targets assumed in business cases but never instrumented"},
  "Latency and Performance":{pain:"AI responses are too slow for customer-facing or real-time use cases", caps:["blackwell","nvlink","workloads"], metric:"p95 latency and time to first token at production load", risk:"Benchmarks run at batch sizes or sequence lengths that differ from real traffic"},
  "Data and Storage Requirements":{pain:"data movement and context memory limits constrain long-context and RAG workloads", caps:["storage","cpudpu","nvlink"], metric:"storage throughput, KV-cache capacity and retrieval latency", risk:"Data governance, residency and pipeline readiness lagging behind compute"}
};

const MATURITY_RULES = {
  "Exploring AI":{stage:"Define use cases and success metrics before committing to infrastructure.", eval:["Start with cloud or managed access to validate demand","Agree on 2–3 measurable business KPIs","Estimate workload profile (training vs. inference)"], risk:"Over-investing in capacity before demand is proven"},
  "Pilot Programs":{stage:"Design pilots that measure production-relevant metrics, not just accuracy.", eval:["Instrument cost per output and utilization during the pilot","Test with production-like data volumes and latency targets","Define go/no-go criteria for scaling"], risk:"Pilots that succeed technically but lack a business case to scale"},
  "Production Deployment":{stage:"Optimize unit economics and reliability of live services.", eval:["Benchmark serving stacks on your own models","Validate SLAs, monitoring and support model","Model TCO with measured utilization"], risk:"Cost overruns as usage grows faster than efficiency"},
  "Scaling Enterprise AI":{stage:"Standardize platforms and plan capacity as an AI factory.", eval:["Assess rack-scale and reference architectures","Plan facility power and cooling 18–36 months ahead (illustrative horizon)","Establish chargeback and cost-per-token governance"], risk:"Facility, power and supply constraints becoming the bottleneck"}
};

const INDUSTRY_CONTEXT = {
  "Financial Services":"In financial services, the NVIDIA 2026 survey reports 65% of respondents actively using AI and 30% planning to direct investment toward AI infrastructure (NVFSI26).",
  "Healthcare":"In healthcare, privacy, validation and on-premises data requirements typically shape infrastructure choices (author's hypothesis; no industry survey verified here).",
  "Retail":"In retail, seasonal traffic peaks and thin margins make inference unit economics especially visible (author's hypothesis).",
  "Manufacturing":"In manufacturing, edge constraints and digital-twin simulation compete for compute and talent (author's hypothesis).",
  "Cloud Services":"For cloud providers, utilization and tokens per megawatt translate directly into gross margin (author's hypothesis).",
  "Enterprise Technology":"For enterprise software companies, cost per token at SaaS scale determines the margin of every AI feature (author's hypothesis)."
};

/* ---------- Competitive intelligence ---------- */
const VENDORS = [
  {id:"nv", name:"NVIDIA", type:"hw", typeLbl:"Hardware + full-stack platform", color:"#76B900",
    facts:[["Example platform","GB200 NVL72: 72 GPUs, 13.4 TB HBM3E, 130 TB/s NVLink","GB200"],["Software","CUDA, NIM, Dynamo","CUDA"],["Deployment","Systems via partners (HGX, DGX); NIM runs across cloud, data center and RTX PCs","NIM"]]},
  {id:"amd", name:"AMD Instinct", type:"hw", typeLbl:"Hardware provider", color:"#e5534b",
    facts:[["Example accelerator","MI355X: 288 GB HBM3E, 8 TB/s; 1400 W typical board power","AMD355"],["Software","ROCm: open software stack; PyTorch, TensorFlow, JAX, vLLM, SGLang","ROCM"],["Launch","June 12, 2025 (MI355X)","AMD355"]]},
  {id:"gcp", name:"Google Cloud TPU", type:"cloud", typeLbl:"Cloud-specific accelerator", color:"#5b9cf0",
    facts:[["Example accelerator","TPU7x (Ironwood): 192 GiB HBM per chip, ~7.37 TB/s","TPU7"],["Scale-up","Pod up to 9,216 chips (144 cubes)","TPU7"],["Software","JAX and PyTorch (TensorFlow not supported on TPU7x); vLLM, SGLang, MaxText","TPU7"]]},
  {id:"aws", name:"AWS Trainium & Inferentia", type:"cloud", typeLbl:"Cloud-specific accelerator", color:"#e3a63a",
    facts:[["Trainium3","144 GB HBM3e, 4.9 TB/s per chip; up to 144 chips per Trn3 UltraServer","TRN3"],["Inferentia2","32 GB HBM per chip; up to 12 chips per Inf2 instance","INF"],["Software","AWS Neuron SDK with native PyTorch integration","TRN3"]]}
];

const MATRIX = [
  {g:"Hardware ecosystem", d:"Offering scope", nv:"GPUs, CPUs (Grace/Vera), DPUs (BlueField), NVLink and Spectrum-X networking, rack-scale systems", amd:"Instinct GPUs on OAM modules in 8-GPU platforms; Infinity Fabric links", gcp:"TPU chips available as Google Cloud VMs and slices", aws:"Trainium (training/inference) and Inferentia (inference) chips available as EC2 instances", s:["GB200","AMD355","TPU7","TRN3"]},
  {g:"Hardware ecosystem", d:"Scale-up unit (as documented)", nv:"72 GPUs in one NVLink domain (GB200 NVL72)", amd:"8-GPU platform referenced on product page", gcp:"Up to 9,216 chips per TPU7x pod in a 3D torus", aws:"Up to 144 Trainium3 chips per UltraServer", s:["GB200","AMD355","TPU7","TRN3"]},
  {g:"Software ecosystem", d:"Primary stack", nv:"CUDA Toolkit; NIM microservices; Dynamo (open source)", amd:"ROCm open software stack; HIP and HIPIFY for porting CUDA code", gcp:"XLA compiler; JAX, PyTorch", aws:"AWS Neuron SDK", s:["CUDA","ROCM","TPUI","TRN3"]},
  {g:"Software ecosystem", d:"Serving frameworks named in docs", nv:"SGLang, TensorRT-LLM, vLLM (via Dynamo)", amd:"vLLM, SGLang", gcp:"vLLM, SGLang", aws:"Native PyTorch integration; Amazon Bedrock serving (Trainium3)", s:["DYN","ROCM","TPU7","TRN3"]},
  {g:"Workload compatibility", d:"Training and inference", nv:"Both; documented for trillion-parameter training and real-time inference", amd:"Both (AI and HPC)", gcp:"Both; MaxText/TorchTitan training, vLLM inference", aws:"Trainium for training and inference; Inferentia for inference", s:["GB200B","ROCM","TPU7","INF"]},
  {g:"Infrastructure integration", d:"Networking & storage", nv:"Spectrum-X Ethernet, ConnectX-9 SuperNICs, BlueField-4 storage (CMX)", amd:"Scale-out Infinity Fabric link per GPU; PCIe 5.0", gcp:"ICI (1,200 GBps bidirectional per chip); data center network", aws:"NeuronSwitch-v1 fabric; EC2 UltraClusters 3.0", s:["SPX","AMD355","TPU7","TRN3"]},
  {g:"Deployment models", d:"Where customers can run it", nv:"On-premises and partner systems; software runs across cloud, data center and workstation", amd:"Servers from partners; AMD lists cloud options", gcp:"Google Cloud only (Compute Engine, GKE)", aws:"AWS only (EC2, SageMaker, Bedrock)", s:["NIM","AMD355","TPU7","INF"]},
  {g:"Developer accessibility", d:"Entry path for developers", nv:"Downloadable CUDA Toolkit and NIM containers", amd:"Open ROCm platform; CUDA-porting tools", gcp:"Cloud console/GKE access; framework-level APIs", aws:"Cloud instances with Neuron SDK tutorials", s:["CUDA","ROCM","TPUI","INF"]},
  {g:"Scalability considerations", d:"Documented scale-out", nv:"Spectrum-X up to 128K GPUs in two tiers; DGX SuperPOD tens of thousands of GPUs", amd:"Not specified on product page (requires verification)", gcp:"9,216-chip superpod; 1.77 PB shared HBM", aws:"UltraClusters 3.0 'to hundreds of thousands of chips'", s:["SPX","AMD355","TPUB","TRN3"]},
  {g:"Customer evaluation criteria", d:"Key questions buyers should ask", nv:"Total stack cost vs. utilization gains; facility readiness for rack-scale", amd:"Software maturity for target models; porting effort", gcp:"Cloud commitment; framework fit (JAX/PyTorch)", aws:"AWS commitment; Neuron support for target models", s:[]}
];

const POSITIONING = {
  diff:{t:"Potential differentiators", tag:"Analysis", items:["Full-stack scope: compute, CPU, DPU, networking, storage and software documented as one platform","Deployment flexibility across on-premises, partner and cloud environments, unlike cloud-specific accelerators","Mature developer ecosystem anchored by CUDA, plus open-source serving (Dynamo)","Rack-scale reference designs (NVL72, DSX) that address facility planning, not just chips"]},
  risk:{t:"Competitive risks", tag:"Analysis", items:["Hyperscalers bundle their own accelerators with cloud services and commitments","Open software stacks (ROCm, framework-level portability via PyTorch/JAX) may lower switching costs","Rack-scale systems require facility upgrades that slow adoption for some enterprises","Buyer skepticism toward 'up to' performance claims with narrow test configurations"]},
  obj:{t:"Customer objections & responses", tag:"Hypothesis", items:["\"Too expensive upfront\" → reframe around cost per productive GPU-hour and per token with an auditable TCO model","\"We fear lock-in\" → emphasize standard APIs (NIM), open-source Dynamo and multi-environment deployment","\"Our facility isn't ready\" → modular reference designs, partner delivery and cloud entry paths","\"Benchmarks don't reflect our workload\" → offer reproducible, workload-specific proofs of value"]}
};

/* ---------- Messaging studio ---------- */
const MSG_PRODUCTS = {
  "GB200 NVL72 rack-scale system":{feat:["72 Blackwell GPUs and 36 Grace CPUs in one liquid-cooled rack","130 TB/s NVLink bandwidth","13.4 TB HBM3E at 576 TB/s"], benefit:"run the largest AI models in real time as one unified system", proof:[["GB200 NVL72 provides 130 TB/s of NVLink bandwidth across 72 GPUs.","GB200",false],["NVIDIA cites up to 30× real-time trillion-parameter LLM inference vs. H100, under a footnoted configuration (projected).","GB200",true]], diff:"a single 72-GPU NVLink domain engineered as one system"},
  "Vera Rubin NVL72 platform":{feat:["72 Rubin GPUs and 36 Vera CPUs","20.7 TB HBM4 per rack (preliminary)","NVLink 6 switch"], benefit:"lower the cost of every AI output as agentic workloads grow", proof:[["Vera Rubin NVL72 is specified with 20.7 TB of HBM4 per rack (preliminary).","VR",false],["NVIDIA projects up to one-tenth the cost per million tokens vs. GB200 NVL72 for a specified model and sequence length.","VR",true]], diff:"a platform codesigned for agentic AI token economics"},
  "Spectrum-X Ethernet networking":{feat:["Spectrum-X switches with SuperNICs","Scales to 128K GPUs in two tiers","ConnectX-9 at 1,600 Gb/s per GPU"], benefit:"scale AI clusters efficiently on Ethernet your teams already know", proof:[["Spectrum-X networks scale up to 128K GPUs in two tiers.","SPX",false],["NVIDIA states 1.6× AI network performance over off-the-shelf Ethernet.","SPX",true]], diff:"Ethernet purpose-built for AI traffic patterns"},
  "CMX context memory storage":{feat:["BlueField-4-powered context memory tier","KV-cache offload over Ethernet","Petabytes of shared capacity per GPU pod"], benefit:"keep long-running AI agents responsive without recomputing context", proof:[["CMX provides petabytes of shared context capacity per GPU pod.","CMXB",false],["NVIDIA states up to 5× tokens per second and 5× power efficiency vs. traditional storage.","BF4PR",true]], diff:"a storage tier designed specifically for inference context"},
  "Dynamo & NIM inference software":{feat:["Open-source distributed inference serving","Supports SGLang, TensorRT-LLM and vLLM","NIM microservices with standard APIs"], benefit:"serve more users per GPU and deploy models faster", proof:[["Dynamo is open source and supports SGLang, TensorRT-LLM and vLLM.","DYN",false],["NVIDIA cites up to 7× MoE throughput for GB200 NVL72 with Dynamo vs. B200-based systems.","DYN",true]], diff:"open, framework-agnostic serving optimized for NVIDIA platforms"},
  "AI factory (full stack)":{feat:["Five layers: energy, chips, infrastructure, models, applications","DSX AI Factory reference design","Omniverse DSX digital twin blueprint"], benefit:"plan, build and operate AI capacity like a production facility", proof:[["NVIDIA released the Vera Rubin DSX AI Factory reference design in March 2026.","DSX",false],["NVIDIA projects up to 10× more tokens per megawatt for Vera Rubin vs. GB200 NVL72.","VR",true]], diff:"an end-to-end blueprint from power to applications"}
};
const MSG_AUD = ["CEO","CFO","CTO","AI Engineer","Data Center Manager","Procurement Executive"];
const MSG_CHANNELS = {
  "Product landing page":{len:"medium", cta:"Explore the platform", fmt:"Scannable hero + 3 benefit blocks"},
  "Sales presentation":{len:"short", cta:"Schedule a workload assessment", fmt:"One idea per slide"},
  "Product one-pager":{len:"medium", cta:"Download the technical brief", fmt:"Problem / solution / proof / next step"},
  "Executive briefing":{len:"short", cta:"Request an executive briefing", fmt:"Bottom line up front"},
  "LinkedIn post":{len:"short", cta:"Read the full story", fmt:"Hook + insight + link"},
  "Blog introduction":{len:"long", cta:"Continue reading", fmt:"Narrative opening"},
  "Partner enablement material":{len:"long", cta:"Access the partner playbook", fmt:"Talk track + discovery questions"},
  "Webinar description":{len:"medium", cta:"Register now", fmt:"What you'll learn + who should attend"}
};
const MSG_PAINS = ["Rising cost per AI interaction","Pilots not reaching production","Power and facility constraints","Slow model training","Latency for real-time AI","Integration complexity","Long-context and agent memory limits"];

/* Content audit, rubric and workflow steps moved to research.js (real audit dataset). */
const WF_SAMPLE = `[Sample text paraphrased from NVIDIA's public GB200 NVL72 product page for demonstration. Verify against the source before use.]

The NVIDIA GB200 NVL72 connects 36 Grace CPUs and 72 Blackwell GPUs in a rack-scale, liquid-cooled design. Fifth-generation NVLink provides 1.8 TB/s of GPU-to-GPU interconnect, and the NVLink Switch System provides 130 TB/s across the rack. The rack includes 13.4 TB of HBM3E memory with 576 TB/s of bandwidth.

GB200 NVL72 delivers up to 30x faster real-time trillion-parameter LLM inference and 4x faster LLM training compared with H100. It offers 25x more performance at the same power versus H100 air-cooled infrastructure. It is the most advanced platform for AI factories and the best choice for every enterprise.`;
const FEATURE_MAP = [
  {k:/nvlink|interconnect/i, f:"High-bandwidth GPU interconnect (NVLink)", b:"Large models run as one system, reducing time-to-result", a:["CTO","AI Engineer"]},
  {k:/hbm|memory/i, f:"Large high-bandwidth memory", b:"Bigger models and longer contexts without splitting across servers", a:["AI Engineer","CTO"]},
  {k:/liquid[- ]cooled|cooling/i, f:"Liquid-cooled design", b:"Higher density per rack and potential energy savings", a:["Data Center Manager","CFO"]},
  {k:/inference/i, f:"Inference performance", b:"Faster responses and lower cost per AI interaction", a:["CFO","CEO","AI Engineer"]},
  {k:/training/i, f:"Training performance", b:"Shorter model development cycles", a:["CTO","AI Engineer"]},
  {k:/power|energy|efficien/i, f:"Performance per watt", b:"More AI output within the same power budget", a:["Data Center Manager","CFO"]},
  {k:/rack[- ]scale|rack/i, f:"Rack-scale integrated system", b:"Faster, lower-risk deployment from a pre-engineered design", a:["Procurement Executive","Data Center Manager"]},
  {k:/cpu|grace|vera/i, f:"Integrated CPU-GPU architecture", b:"Less data-movement overhead, higher GPU utilization", a:["AI Engineer"]},
  {k:/storage|kv[- ]cache|context/i, f:"Context memory/storage tier", b:"Lower cost for long-context and agentic workloads", a:["CTO","AI Engineer"]},
  {k:/ethernet|network|switch/i, f:"AI-optimized networking", b:"Efficient scaling across racks", a:["CTO","Data Center Manager"]}
];
const PROMPTS = [
  {t:"Technical document summarization", p:`You are a technical product marketing analyst. Summarize the following documentation for {product}.
Return: (1) a 3-sentence plain-language summary, (2) a table of every quantitative specification with its exact wording, (3) any performance claim with its stated baseline, workload and conditions, (4) anything ambiguous.
Do not add facts that are not in the text. Quote numbers exactly.

DOCUMENT:
"""
[paste text]
"""`},
  {t:"Product messaging development", p:`Act as a senior product marketing manager. Using ONLY the verified facts below, build a message house for {product} aimed at a {audience} in {industry}.
Include: umbrella value proposition (≤25 words), three pillars each with one proof point and its source, top objection and response, and a call to action.
Mark any statement that is not directly supported by the facts as [NEEDS VERIFICATION].

VERIFIED FACTS:
[paste facts with sources]`},
  {t:"Customer segmentation", p:`Propose a segmentation of enterprise buyers for {product} in {industry}.
For each segment give: firmographics, AI maturity, primary workload, decision-makers, top 3 pains, buying triggers, and the content they need.
Separate evidence-based statements (cite the source I provide) from hypotheses (label them HYPOTHESIS). Do not invent statistics.`},
  {t:"Competitive research", p:`Compare {product} with alternatives from AMD, Google Cloud TPU and AWS Trainium/Inferentia using only official documentation I provide.
Dimensions: hardware ecosystem, software ecosystem, workload compatibility, deployment model, developer accessibility, scalability.
Do NOT include market share, pricing or benchmark rankings unless a cited source states them. Flag gaps as "not documented".`},
  {t:"Marketing content generation", p:`Write a {channel} for {product} targeting a {audience} in {industry}.
Constraints: lead with the customer problem; one primary message; max 3 benefits; every number must come from the facts below with the source in brackets; include a clear CTA; avoid superlatives such as "best", "fastest", "leading" unless sourced.

FACTS:
[paste facts]`},
  {t:"Factual accuracy verification", p:`You are a fact-checker. For each claim in the draft below, return a table: claim | type (spec, comparative, superlative, customer outcome) | supporting source text (quote) | status (Supported / Partially supported / Unsupported) | required fix.
Comparative claims must name the baseline, workload and date. Treat "up to" figures as maximums, not typical results.

SOURCES:
[paste]
DRAFT:
[paste]`},
  {t:"Brand consistency review", p:`Review the draft for brand and style consistency: product names and trademarks used correctly, consistent capitalization, tone appropriate for a {audience}, no unapproved claims, inclusive language, and disclaimer present where results are simulated.
Return a checklist with Pass/Fix and the suggested edit for each item.

DRAFT:
[paste]`}
];
