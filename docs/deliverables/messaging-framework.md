# Messaging Framework
_Independent concept. Value propositions are proposed messaging (hypotheses); proof points cite public sources._

## CFO
Owns capital allocation and return on investment; signs off large infrastructure commitments.

**Value proposition:** Know what each unit of AI output costs before you commit, and track it after deployment.

**Objectives:** Predictable return on AI capital; Visibility of unit costs; Risk-adjusted payback

**Pain points:** Few organizations can show enterprise-level AI returns; Running costs are visible in total but not per unit; Projects overrun planned cost

**Objections:** 'Up to' multipliers do not tell me my cost; We already have idle capacity; Hardware generations move fast; asset life is uncertain

**Decision criteria:** TCO and NPV under our assumptions; Payback period; Cost per unit of AI output; Financing and depreciation options

**Benefits:** Lower projected cost per million tokens for agentic inference; More output within a fixed power budget; A shared metric between finance and engineering

**Capabilities:** Vera Rubin NVL72; Dynamo inference serving; AI Enterprise orchestration

**Proof points:**
- One-tenth the cost per million tokens vs GB200 NVL72 (Kimi-K2-Thinking, 32K/8K; projected) (NVIDIA (product page), 2026: https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/)
- Up to 10x more tokens per megawatt vs GB200 NVL72 (projected) (NVIDIA (product page), 2026: https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/)
- About 1 in 5 organizations say AI operating costs constrain use (McKinsey & Company (QuantumBlack), Aug 25, 2026: https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)

**Assets:** CFO Briefing; TCO & ROI Simulator; Executive One-Pager

**CTA:** Model your cost per million tokens with your own assumptions

## CTO
Sets architecture and platform standards; balances performance, roadmap risk and integration.

**Value proposition:** Standardize on one rack-scale architecture that covers training, inference and agentic workloads, with published reference designs.

**Objectives:** An architecture that scales with model growth; Integration with existing software; Roadmap stability

**Pain points:** Full-stack choices across compute, network, storage and software; Pilots stall before production

**Objections:** Lock-in to one vendor's stack; Facility readiness for dense racks; Availability timing of new generations

**Decision criteria:** Workload fit and reproducible benchmarks; Software ecosystem and portability; Reference architectures; Supply and availability

**Benefits:** Fewer integration decisions through reference designs; Room for long-context and agentic workloads; A single upgrade path across generations

**Capabilities:** Vera Rubin NVL72; Spectrum-X Ethernet; BlueField-4 / CMX storage; DSX reference design

**Proof points:**
- 72 Rubin GPUs and 36 Vera CPUs per rack; 260 TB/s NVLink 6 switch bandwidth (preliminary) (NVIDIA (product page), 2026: https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/)
- Spectrum-X: 1.6x AI network performance over off-the-shelf Ethernet (NVIDIA (product page), Oct 22, 2026: https://www.nvidia.com/en-us/networking/spectrumx/)
- Vera Rubin DSX AI Factory reference design released Mar 16, 2026 (NVIDIA Newsroom, Mar 16, 2026: https://nvidianews.nvidia.com/news/nvidia-releases-vera-rubin-dsx-ai-factory-reference-design-and-omniverse-dsx-digital-twin-blueprint-with-broad-industry-support)

**Assets:** Technical Product Overview; Infrastructure Explorer

**CTA:** Review the reference architecture with a solutions architect

## CEO
Accountable for growth strategy and competitive position; sponsors transformation programs.

**Value proposition:** Move AI from scattered pilots to measured, enterprise-wide capability, on infrastructure designed for the next wave of agentic workloads.

**Objectives:** Turn AI use into measurable business results; Move faster than competitors; Manage strategic risk

**Pain points:** AI is widely used but rarely scaled; Investment is rising faster than evidence of return

**Objections:** Is this the right time to commit capital?; Can our organization execute?

**Decision criteria:** Strategic fit; Time to value; Evidence from peers

**Benefits:** A credible path from pilot to production; Capacity for agentic AI growth; Comparable unit economics across initiatives

**Capabilities:** AI factory (full stack); DGX SuperPOD; Partner ecosystem

**Proof points:**
- 44% of organizations report scaling AI across the enterprise (up from 38%) (McKinsey & Company (QuantumBlack), Aug 25, 2026: https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- 37% report positive EBIT contribution from AI (McKinsey & Company (QuantumBlack), Aug 25, 2026: https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)

**Assets:** Executive One-Pager; Webinar Campaign

**CTA:** Brief your leadership team on AI infrastructure economics

## AI engineers
Build, train and serve models; judge platforms by throughput, latency and tooling.

**Value proposition:** Serve larger models with longer context at higher throughput, using open-source serving software and standard APIs.

**Objectives:** Ship models faster; Serve more requests per GPU; Avoid infrastructure toil

**Pain points:** Large models exceed one GPU's memory; KV-cache recomputation wastes GPU time; Serving stacks are complex

**Objections:** Benchmarks don't match our models; Migration effort from existing code

**Decision criteria:** Framework support; Reproducible benchmarks; Serving and orchestration tools

**Benefits:** Disaggregated serving and KV-cache reuse; Prebuilt inference microservices; Large NVLink domains for MoE models

**Capabilities:** Dynamo; NIM; CUDA; GB200 / Vera Rubin NVL72

**Proof points:**
- Dynamo is an open source, distributed inference-serving framework (NVIDIA (product page), Apr 8, 2026: https://www.nvidia.com/en-us/ai/dynamo/)
- NIM provides containers to self-host inference microservices with industry-standard APIs (NVIDIA Developer, Oct 12, 2026: https://developer.nvidia.com/nim)
- GB200 NVL72: 30x speedup for 1.8T GPT-MoE inference (footnoted, projected, 2024) (NVIDIA Technical Blog, Mar 18, 2024: https://developer.nvidia.com/blog/nvidia-gb200-nvl72-delivers-trillion-parameter-llm-training-and-real-time-inference/)

**Assets:** Technical Product Overview

**CTA:** Reproduce the benchmark on your own model

## Data center operators
Run facilities: power, cooling, space and uptime.

**Value proposition:** Plan AI capacity around tokens per megawatt, with reference designs and digital twins that reduce design risk.

**Objectives:** Fit AI systems into power and cooling limits; Keep uptime; Plan capacity years ahead

**Pain points:** Most racks run at 10 to 30 kW; PUE improvement has stalled; Staffing is hard

**Objections:** Liquid cooling retrofit cost; Grid connection timelines

**Decision criteria:** Rack power and cooling requirements; Reference designs; Partner support

**Benefits:** More AI output per unit of power; Validated designs for power and cooling; Digital-twin planning before construction

**Capabilities:** DSX reference design; Omniverse DSX Blueprint; Spectrum-X Photonics

**Proof points:**
- Most rack densities 10 to 30 kW; few above 30 kW (Uptime Institute Intelligence, Jul 2025: https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025)
- About two-thirds of operators report staffing difficulty (Uptime Institute Intelligence, Jul 2025: https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025)
- Phaidra (DSX partner) reports about 10% more compute by reducing cooling spikes (partner claim) (NVIDIA Newsroom, Mar 16, 2026: https://nvidianews.nvidia.com/news/nvidia-releases-vera-rubin-dsx-ai-factory-reference-design-and-omniverse-dsx-digital-twin-blueprint-with-broad-industry-support)

**Assets:** Technical Product Overview; Webinar Campaign

**CTA:** Assess your facility's readiness for rack-scale AI

## Procurement
Runs sourcing, compares vendors and negotiates terms.

**Value proposition:** Compare platforms on total cost and verified, footnoted claims, with a clear partner and support model.

**Objectives:** Fair comparison across vendors; Total value, not just price; Supply security

**Pain points:** Specs are quoted in different units and scopes; Claims use different baselines

**Objections:** Single-vendor dependence; Unverifiable performance claims

**Decision criteria:** Like-for-like comparison; Total cost over life; Delivery timelines; Support and partners

**Benefits:** A structured evaluation checklist; Lifetime cost view; Partner options for delivery and support

**Capabilities:** NVIDIA Partner Network; DGX SuperPOD

**Proof points:**
- NPN benefits include 'sales and distribution, training, marketing, service, and support' (NVIDIA (program page), Nov 16, 2026: https://www.nvidia.com/en-us/about-nvidia/partners/)
- Competitor offerings documented: AMD MI355X, Google TPU7x, AWS Trainium3 (AMD (product page), Oct 20, 2025: https://www.amd.com/en/products/accelerators/instinct/mi350/mi355x.html)

**Assets:** Sales Battlecard; TCO & ROI Simulator

**CTA:** Use the evaluation checklist in your next RFP

## Cloud service providers
Sell GPU capacity and AI services; margins depend on utilization and cost per token.

**Value proposition:** Generate more tokens per megawatt and serve more tenants per rack.

**Objectives:** Maximize token revenue per megawatt; High multi-tenant utilization; Fast time to new capacity

**Pain points:** Power-limited growth; Multi-tenant isolation and performance

**Objections:** Capex per rack; Customer demand volatility

**Decision criteria:** Tokens per megawatt; Network performance at scale; Time to deploy

**Benefits:** Higher throughput per unit of power; Multi-tenant Ethernet at scale; Faster capacity bring-up

**Capabilities:** Vera Rubin NVL72; Spectrum-X; Dynamo

**Proof points:**
- Up to 10x more tokens per megawatt vs GB200 NVL72 (projected) (NVIDIA (product page), 2026: https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/)
- Spectrum-X designed for 'cloud service providers and large enterprises running multi-tenant AI workloads at hyperscale' (NVIDIA (product page), Oct 22, 2026: https://www.nvidia.com/en-us/networking/spectrumx/)

**Assets:** Technical Product Overview; Sales Battlecard

**CTA:** Model tokens per megawatt for your next build

## Enterprise technology leaders
CIOs and heads of AI platforms who turn strategy into running services.

**Value proposition:** Run AI in production on a supported full stack, with unit-cost metrics you can share with every business unit.

**Objectives:** Production-grade AI platforms; Security and data control; Cost transparency for business units

**Pain points:** Pilot-to-production gap; Data residency requirements; Charging business units for AI

**Objections:** Skills to run the platform; Build versus buy versus cloud

**Decision criteria:** Security and support; Deployment options; Internal chargeback metrics

**Benefits:** Supported production software; On-premises, colocation or cloud options; Unit-cost reporting for chargeback

**Capabilities:** AI Enterprise; DGX SuperPOD; NIM

**Proof points:**
- 74% say data residency is at least moderately important (Deloitte, 2026: https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html)
- University of Florida: nearly 7,000 users and 33 million research requests in a year on DGX SuperPOD (NVIDIA (product page), Feb 24, 2026: https://www.nvidia.com/en-us/data-center/dgx-superpod/)

**Assets:** Executive One-Pager; Landing Page Concept

**CTA:** Plan your pilot-to-production path

## Feature to benefit matrix
| Feature | Functional benefit | Customer outcome | Business value | Evidence | Status |
|---|---|---|---|---|---|
| Vera Rubin NVL72 rack: 72 Rubin GPUs, 36 Vera CPUs, NVLink 6 (260 TB/s) | The rack behaves as one large accelerator for very large models | Fewer systems needed for large MoE training | Lower capital per trained model | 'One-fourth the number of GPUs' for a 10T MoE trained on 100T tokens in one month (projected) [VR] | Verified Primary Source |
| 20.7 TB HBM4 at 1,580 TB/s per rack (preliminary) | More context and larger batches fit in fast memory | Long-context and agentic requests stay responsive | More revenue-generating tokens per rack | Specification, preliminary [VR] | Verified Primary Source |
| Rubin platform inference efficiency | More tokens generated per unit of compute | Lower cost per AI interaction | One-tenth the cost per million tokens vs GB200 NVL72 (projected) | Kimi-K2-Thinking, 32K/8K ISL/OSL; projected [VR] | Verified Primary Source |
| Rubin platform energy efficiency | More output from the same power envelope | Grow AI services without new grid capacity | Up to 10x more tokens per megawatt vs GB200 NVL72 (projected) | Kimi-K2-Thinking basis; projected [VR] | Verified Primary Source |
| BlueField-4 STX and CMX context memory tier | KV cache is reused instead of recomputed | GPUs spend less time waiting on context | Higher return on GPU investment (hypothesis) | Up to 5x tokens per second and power efficiency vs traditional storage; basis not stated [BF4PR] | Strategic Hypothesis |
| Spectrum-X Ethernet | Higher effective bandwidth for AI traffic | Multi-node jobs finish sooner; GPUs stay busier | Better utilization of purchased GPUs (hypothesis) | 1.6x AI network performance over off-the-shelf Ethernet (conditions in whitepaper) [SPX] | Verified Primary Source |
| Dynamo disaggregated serving | Prefill and decode scheduled separately; KV-aware routing | More requests served on the same hardware | Lower cost per token (hypothesis) | Up to 7x MoE throughput vs B200-based systems; page also states 15x vs Hopper (inconsistent) [DYN] | Pending Validation |
| Vera CPU (88 Olympus cores) | Fast tool calls, sandboxes and orchestration for agents | Agent pipelines not held back by CPU work | Higher agent throughput per rack (hypothesis) | 'Up to 2x performance on critical agentic workloads'; no baseline stated [CPU] | Pending Validation |
| DSX reference design and Omniverse DSX Blueprint | Facility designed and tested as a digital twin | Fewer design surprises; earlier production | Earlier revenue from new capacity (hypothesis) | Partner claim: about 10% more compute by reducing cooling spikes (Phaidra) [DSX] | Verified Primary Source |
| AI Enterprise orchestration | Compute shared dynamically across workloads | Less idle capacity | Higher utilization of existing assets (hypothesis) | 'Maximize GPU utilization up to 5x'; no baseline stated [AIE] | Pending Validation |
