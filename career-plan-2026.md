# Career Preparation Plan — Mohammed Firdous Araoye
**Recruiter perspective · 30 years EMEA hiring experience · As of 20 June 2026**

---

## 1. Brutal Candidate Evaluation

### What is genuinely strong (rare at this level)

| Signal | Why it matters |
|--------|----------------|
| CNCF LFX Mentorship (PipeCD) | Extremely few undergrads globally complete this. It's a credentialled, merit-selected programme. Bloomberg and Google recruiters recognise CNCF. |
| 10 merged OSS contributions — GitLab + PipeCD | Not toy PRs. Includes a bug fix cherry-picked into v0.52.2 and a Docker image reduction from 800MB → 500MB. Verifiable, production-impact work. |
| KCNA certification | Baseline signal. Shows you took Kubernetes seriously enough to sit an exam. |
| Teaching experience (Awake) | Rare for a student. You can't teach what you don't understand. |
| Public talks (3, AWS Cloud Club UNILAG) | Community visibility. Recorded on YouTube = verifiable. |

### What is weak — do not skip this section

**1. Internship overlap is suspicious.**
Nithub (May–Oct 2025) and Swype (Jul–Nov 2025) overlapped by 4 months. At Bloomberg and Google, this reads as either part-time at both or inaccurate dates. Have a clean explanation ready for every interview.

**2. The 5% throughput metric at Swype is a liability.**
"~5% improvement in transaction throughput" is barely within noise for a CRUD API. It reads as a number invented to have a number. Remove it or replace it with something you can defend in detail under pressure.

**3. Zero GitHub stars, zero forks on personal projects.**
Your K8s operator and multi-agent projects are invisible. No one outside your portfolio knows they exist. A K8s operator with 0 stars looks like a weekend experiment even if it isn't. Fix this — README quality, a blog post, a CNCF Slack mention.

**4. Breadth is covering for lack of depth.**
14 projects across Go, Python, Node.js, Terraform, AWS, GCP, Cloudflare, AI agents, K8s operators, RAG systems. When a recruiter asks "what's your deepest area?" the answer must be crisp: *Kubernetes and cloud-native infrastructure*. Currently your portfolio doesn't say that loudly enough.

**5. No DSA signal anywhere — this is your biggest blocker.**
Bloomberg, Jane Street, Palantir, Google all gate on algorithms. There is no competitive programming, no LeetCode mention, no algorithmic project on the portfolio. Without fixing this you will not pass phone screens regardless of project quality. Start today.

**6. University of Lagos is unknown in UK hiring.**
Not a judgement on the institution — a practical EMEA recruiter reality. UK hiring managers at Bloomberg/Google don't have a mental model of UNILAG the way they do for Imperial or UCL. Your external signals (OSS, cert, LFX) must do the work your university brand doesn't. You already have some — lead with them.

**7. Visa sponsorship is required.**
You will need a UK Skilled Worker Visa or Graduate Visa equivalent. Not all companies sponsor junior/intern roles. Always verify before applying. This narrows your target list.

---

## 2. Role Targeting — SWE vs Cloud Engineering

**Verdict: Apply as Software Engineer, not Cloud Engineer.**

- "Cloud Engineer" in the UK is often an ops/infrastructure role with a lower career ceiling and lower compensation
- Your strongest signals (CNCF LFX, Go operator, PipeCD plugin) are *software engineering inside the cloud-native ecosystem*, not infrastructure management
- Bloomberg, Cloudflare, and Google hire through SWE pipelines and place you on cloud/platform/infra teams — better comp, better trajectory
- At Bloomberg specifically, all engineers are "Software Engineers" — they don't hire "Cloud Engineers" at junior level

**Role types to target (priority order):**

1. Software Engineer Intern / New Grad — Bloomberg, Cloudflare, Arm, Canonical
2. Platform Engineering / SRE Intern — Google, Cloudflare, AWS
3. Backend Engineer Intern — companies with Go/Python stacks
4. DevOps / Infrastructure Engineer — fallback if SWE screens are not passing yet

---

## 3. Muslim-Friendly Company Targets (UK/EMEA)

Companies where the core business is permissible — technology, infrastructure, data — not interest-based trading, alcohol, gambling, or weapons:

| Company | Role fit | Notes |
|---------|----------|-------|
| **Bloomberg L.P.** | SWE Intern / New Grad | Financial *data and technology*, not trading/interest. Large London office. Strong intern programme. Sponsors visas. |
| **Cloudflare** | SWE / Infrastructure | Internet security and CDN. Fully permissible. London office. Sponsors. |
| **Arm** | SWE Intern | Chip architecture/software. Cambridge, UK. Sponsors. Competitive. |
| **Canonical** | SWE / Cloud | Ubuntu/open-source Linux. Remote-first. Strong OSS culture — your contributions align directly. |
| **Red Hat (IBM)** | Associate SWE | Open-source enterprise Linux/K8s. CNCF background is directly relevant. |
| **Palo Alto Networks** | SWE Intern | Cybersecurity. Permissible. London office. |
| **HashiCorp (now IBM)** | SWE | Terraform — you already have Terraform projects. |
| **AWS (Amazon)** | SDE Intern | Cloud infrastructure. Large London office. Sponsors visas. Heavy DSA interview. |
| **Google (GCP/SRE)** | STEP / SWE Intern | Strongest brand. Extremely competitive. DSA-heavy. |
| **Palantir** | SWE / Forward Deployed | Data analytics for government/commercial. Permissible. London office. |
| **MongoDB** | SWE Intern | Database company. OSS-friendly culture. |
| **Grafana Labs** | SWE | Observability — directly relevant to your monitoring projects. Remote-first. |

**Companies to avoid or research carefully:**
- Jane Street, Citadel, Jump Trading — pure prop trading firms. Scholarly opinions differ. Research with your own Islamic guidance before applying.
- Revolut, Monzo — consumer finance with interest products as core offering.
- Defence/weapons contractors.

---

## 4. Application Timeline — Summer 2027 Internships & New Grad 2027

| Period | What opens | Action |
|--------|------------|--------|
| **Now – July 2026** | Preparation window. No major cycles open yet. | DSA grind, resume polish, LinkedIn recruiter outreach |
| **July–Aug 2026** | Amazon SDE Intern opens. Bloomberg new grad roles sometimes appear. | Apply immediately when open. Bloomberg fills fast. |
| **Sept–Oct 2026** | **Bloomberg Intern opens (historically September).** Google STEP/SWE. Cloudflare, Arm, Canonical, Palantir. | Highest-priority window. Do not miss this. |
| **Nov–Dec 2026** | Red Hat, Grafana, MongoDB. Some roles extend. | Apply to remaining targets. |
| **Jan–Mar 2027** | Late cycle. Spots are scarce. Canonical/remote-first sometimes hire later. | Fill gaps only. |

> **Set a calendar alert for 1 September 2026. Bloomberg closes within 6–8 weeks of opening. If you miss it you wait a full year.**

---

## 5. Projects to Build Before September 2026

You have ~10 weeks. Prioritise ruthlessly.

### Priority 1 — DSA practice (start immediately, non-negotiable)
- Target: 150 LeetCode problems — 60% Medium, 20% Hard — before September
- Focus topics: trees/graphs, dynamic programming, sliding window, heap/priority queue, concurrent data structures
- Without this you will not pass Bloomberg, Google, or AWS phone screens regardless of project quality

### Priority 2 — One deeper Go systems project
Your Go exposure (PipeCD plugin, K8s operator) is strong but the projects are cloud-native glue. Build something lower-level:
- A simple distributed key-value store (consistent hashing + replication, or Raft consensus)
- OR a network proxy / load balancer in Go with connection pooling

This demonstrates systems programming depth, not just Kubernetes YAML authorship.

### Priority 3 — Promote existing work (do this before building anything new)
- Write proper READMEs for `k8s-health-ai` and `ecommerce-k8s` — architecture diagram, quickstart, demo GIF
- Post the LFX work on CNCF Slack (`#pipecd`) and LinkedIn — ask PipeCD maintainers to share
- Submit the Qwen evaluation as a blog post to Towards Data Science or the Hugging Face blog

### Priority 4 — Add observability to one existing project
- Prometheus metrics + Grafana dashboard
- Structured logging with correlation IDs
- A short runbook

Companies want evidence you think about reliability, not just greenfield building.

---

## 6. LinkedIn Recruiters to Reach

**Search string:**
```
"Technical Recruiter" OR "University Recruiter" OR "Early Careers" [Company Name] London
```

**Per company:**
- **Bloomberg** — Search "Bloomberg University Recruiting London". Connect with anyone with "University Recruiting" or "Early Careers" in their title.
- **Cloudflare** — Small team. Search "Cloudflare Recruiter London" — usually 2–3 technical recruiters.
- **Google** — Search "Google University Programs EMEA" — dedicated EMEA university recruiting team.
- **Arm** — "Arm Early Careers" or "Arm Graduate Recruiter Cambridge"
- **Canonical** — Small talent team, post directly on their site. Reachable on LinkedIn.
- **Palantir** — "Palantir Talent London"

**Message template (keep under 100 words):**

> Hi [Name], I'm a final-year Cloud Engineering student at University of Lagos, graduating [month] 2027. I recently completed a CNCF LFX Mentorship building the Kubernetes multi-cluster plugin for PipeCD, and have 10 merged contributions to GitLab and CNCF projects. I'm targeting [Company]'s [Role] programme for Summer 2027 and wanted to reach out before applications open. Would you be open to a brief conversation? [Portfolio link]

**Rules:**
- Do not attach a CV in the first message
- Do not ask "when do applications open?" — that's what Google is for
- Connect first, then send the message 2–3 days later if no automatic acceptance

---

## 7. Portfolio / CV Fixes Before Applying

- [ ] Remove or reframe the "~5% throughput improvement" claim from Swype
- [ ] Add architecture diagrams to at least 3 projects
- [ ] Surface the CNCF LFX Mentorship at the very top of the portfolio homepage — it should be the first thing anyone reads
- [ ] Add a Skills / Stack section to the portfolio landing page — recruiters scan for keywords
- [ ] KCNA certification should be prominently visible — it's rare at undergrad level
- [ ] Add a LeetCode/Codeforces profile link once you have 50+ problems solved

---

## 8. Realistic Expectations

| Tier | Companies | Honest probability |
|------|-----------|--------------------|
| Reach | Google, top prop trading equivalents | 15–20% if DSA is fixed |
| Target | Bloomberg, Cloudflare, Palantir, Arm | 40–55% with strong prep |
| Likely | Canonical, Red Hat, Grafana, MongoDB | 65–75% — OSS background fits directly |
| Safety | Startups, CNCF-adjacent, remote roles | 85%+ |

**The CNCF LFX mentorship puts you above most applicants from any university for cloud/platform roles. The gap is DSA. Fix that and the Target tier becomes realistic.**
