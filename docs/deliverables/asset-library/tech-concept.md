# Technical Product Overview: Vera Rubin NVL72
_Audience: CTOs, AI engineers, infrastructure architects · Format: 2 to 3 pages_

> Independent concept created for a portfolio project. Not NVIDIA material; not reviewed or endorsed by NVIDIA. Proof points cite public sources; projections are labeled.

## What it is
A rack-scale system with 72 Rubin GPUs and 36 Vera CPUs connected by an NVLink 6 switch, with ConnectX-9 SuperNICs and BlueField-4 DPUs [VR].

## Key specifications (preliminary)
• 20.7 TB HBM4 at 1,580 TB/s per rack
• 260 TB/s NVLink 6 switch bandwidth
• 3,600 PFLOPS NVFP4 inference
All values are NVIDIA preliminary figures, subject to change [VR].

## Workloads it targets
Agentic and long-context inference; large mixture-of-experts training. NVIDIA states agentic systems consume up to 15x more tokens than traditional AI applications (basis not stated) [VR].

## Stack around the rack
• Context memory: BlueField-4 STX / CMX tier for KV cache [CMXB]
• Networking: Spectrum-X Ethernet [SPX]
• Serving: Dynamo, NIM [DYN] [NIM]
• Facility: DSX reference design [DSX]

## Claims and their basis
• One-tenth the cost per million tokens vs GB200 NVL72: Kimi-K2-Thinking, 32K/8K, projected
• One-fourth the GPUs for training: 10T MoE, 100T tokens, one month, projected
• Up to 10x tokens per megawatt vs GB200 NVL72: projected

## Open questions to verify
• Availability: product page says 'Available Now'; May 31 release said shipments begin 'this fall' [VR] [VRPR]
• Rack power and cooling requirements for your facility

## Sources
- [VR] NVIDIA Vera Rubin NVL72, NVIDIA (product page), 2026. https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/
- [CMXB] Introducing NVIDIA BlueField-4-Powered CMX Context Memory Storage Platform, NVIDIA Technical Blog, Mar 16, 2026. https://developer.nvidia.com/blog/introducing-nvidia-bluefield-4-powered-inference-context-memory-storage-platform-for-the-next-frontier-of-ai/
- [SPX] NVIDIA Spectrum-X Ethernet Platform, NVIDIA (product page), Oct 22, 2026. https://www.nvidia.com/en-us/networking/spectrumx/
- [DYN] NVIDIA Dynamo, NVIDIA (product page), Apr 8, 2026. https://www.nvidia.com/en-us/ai/dynamo/
- [NIM] NVIDIA NIM for Developers, NVIDIA Developer, Oct 12, 2026. https://developer.nvidia.com/nim
- [DSX] NVIDIA Releases Vera Rubin DSX AI Factory Reference Design and Omniverse DSX Digital Twin Blueprint, NVIDIA Newsroom, Mar 16, 2026. https://nvidianews.nvidia.com/news/nvidia-releases-vera-rubin-dsx-ai-factory-reference-design-and-omniverse-dsx-digital-twin-blueprint-with-broad-industry-support
- [VRPR] NVIDIA Vera Rubin Ramps Into Full Production to Power Agentic AI Factories Worldwide, NVIDIA Newsroom, May 31, 2026. https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory

---
Independent portfolio project by Ana Laura Nascimento (2026). Not affiliated with NVIDIA.
