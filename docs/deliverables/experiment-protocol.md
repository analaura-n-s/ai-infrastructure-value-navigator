# Messaging Experiment: study protocol
_Study design only. The experiment has not been run, no participants have been recruited and no results exist._

## Stimuli
**Variant A: Feature-focused.** Vera Rubin NVL72: 72 Rubin GPUs, 36 Vera CPUs, 260 TB/s NVLink 6

A rack-scale system with 20.7 TB of HBM4 at 1,580 TB/s and 3,600 PFLOPS of NVFP4 inference (preliminary). NVIDIA projects one-tenth the cost per million tokens of GB200 NVL72 for Kimi-K2-Thinking at 32K/8K.

**Variant B: Benefit-focused.** Know what each unit of AI output costs before you scale

Agentic AI multiplies token volume, so cost per million tokens decides whether AI pays off. NVIDIA projects that Vera Rubin NVL72 delivers one-tenth the cost per million tokens of GB200 NVL72 for a long-context reasoning model (Kimi-K2-Thinking, 32K/8K).

## Hypothesis
H1: Among enterprise finance and technology decision-makers, the benefit-focused message (B) scores higher than the feature-focused message (A) on perceived business value. H0: no difference. Secondary: comprehension, relevance, clarity, trust, confidence, intent. Exploratory: does the effect differ between technical and business roles?

## Population
Professionals involved in AI infrastructure decisions at organizations with 500+ employees: finance (CFO, FP&A), technology leadership (CTO, CIO, head of AI platform), AI engineers and procurement.

## Recruitment
Professional network outreach and a paid B2B research panel with role screening. Record the recruitment channel for each participant. Exclude current NVIDIA employees and anyone who has seen either variant.

## Random assignment
Between-subjects. Each participant is randomly assigned to A or B by the survey tool (block randomization by role group: business vs technical) and sees only one variant.

## Measures
- **Comprehension** (`comprehension`): Check question: 'According to the message, what does the platform reduce?' (scored correct or not) plus 'I understood what this offering does' (1 to 7).
- **Relevance** (`relevance`): 'This message addresses a problem my organization has.' (1 to 7)
- **Clarity** (`clarity`): 'The message was clear and easy to follow.' (1 to 7)
- **Trust** (`trust`): 'I believe the claims in this message.' (1 to 7)
- **Perceived business value** (`value`): 'This offering could create measurable business value for my organization.' (1 to 7)
- **Decision confidence** (`confidence`): 'This message gives me enough information to judge whether to evaluate the offering.' (1 to 7)
- **Intent** (`intent`): 'How likely are you to request more information?' (1 to 7)

## Analysis
Welch two-sample t-tests (two-sided) per measure, Holm correction across measures, 95% confidence intervals and Cohen's d. Data columns: participant_id, variant, role_group, comprehension, relevance, clarity, trust, value, confidence, intent.

## Possible biases
- Self-selection into the study (respondents interested in AI infrastructure).
- Social desirability and acquiescence on agreement scales.
- Brand familiarity: both variants name NVIDIA, which may raise trust in both.
- Stated intent is not behaviour; treat intent as a leading indicator only.
- Multiple comparisons across seven measures (Holm correction applied).
- Likert scores treated as interval data; check with a non-parametric test if distributions are skewed.

## Sample size and limits
With 7-point scales and an expected standardized effect of d = 0.5, about 64 participants per variant give 80% power at α = 0.05 (two-sided). Smaller effects need many more people (d = 0.3 needs about 175 per variant). A portfolio study of 20 to 40 people per variant can only detect large effects and should be reported as exploratory.
