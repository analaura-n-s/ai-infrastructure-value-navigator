# CFO Briefing
_Audience: CFO, finance leaders · Format: 2 pages_

> Independent concept created for a portfolio project. Not NVIDIA material; not reviewed or endorsed by NVIDIA. Proof points cite public sources; projections are labeled.

## Purpose
Give finance a way to test AI infrastructure claims against the organization's own costs.

## What the research shows
• 37% report positive EBIT impact from AI [MCK26]
• 71% track total inference spend, 44% track unit cost [DEL26]
• 38% delayed, scaled back or canceled a project because it cost more than planned (self-selected sample, n=156) [VBP26]

## Three metrics finance can own
1. Cost per million tokens = annual serving cost ÷ annual tokens served
2. Cost per productive GPU-hour = (CAPEX ÷ life + annual OPEX) ÷ (GPUs × hours × utilization)
3. Payback = time until cumulative net benefit covers the investment

## How to read vendor claims
Every multiplier has a baseline, a workload and a date. 'One-tenth the cost per million tokens' is a projection against GB200 NVL72 for one model at 32K input and 8K output tokens [VR]. Ask for results on your own workloads.

## Questions for the vendor
• Which configuration and workload produced this figure?
• What utilization does the TCO assume?
• What changes if our facility PUE is higher?
• What support and partner costs are not in the quote?

## Next step
Use the TCO & ROI Simulator with your own quotes; replace every illustrative default.

## Sources
- [MCK26] The state of AI in 2026: On the road to ROI, McKinsey & Company (QuantumBlack), Aug 25, 2026. https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai
- [DEL26] The State of AI in the Enterprise (2026), Deloitte, 2026. https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html
- [VBP26] VB Pulse AI Infrastructure and Compute Report (October 2026), VentureBeat Intelligence, Nov 6, 2026. https://venturebeat.com/vb-pulse-infrastructure-and-compute-report
- [VR] NVIDIA Vera Rubin NVL72, NVIDIA (product page), 2026. https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/

---
Independent portfolio project by Ana Laura Nascimento Silva (2026). Not affiliated with NVIDIA.
