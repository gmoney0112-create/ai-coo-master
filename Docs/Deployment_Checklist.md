# AI COO System — Deployment Checklist

Use this checklist for every new client installation. Complete steps in order.
Time estimates are based on a practiced install. First install may take 2×.

---

## Phase 0 — Pre-Install (~30 min)

- [ ] Strategy call completed — fit confirmed
- [ ] Payment received (Stripe/PayPal link sent and paid)
- [ ] Welcome email sent with onboarding form link
- [ ] Onboarding form submitted by client
- [ ] Client folder scaffolded: `bash Scripts/new_client.sh [CLIENT_NAME]`
- [ ] `Clients/[CLIENT_NAME]/env/client.env` filled in from onboarding form data
- [ ] `node Scripts/validate_env.js [CLIENT_NAME]` — all required fields pass ✓

---

## Phase 1 — GHL Setup (~60 min)

- [ ] GHL agency account active, master template subaccount confirmed
- [ ] Client subaccount created (or snapshot imported if available)
- [ ] Subaccount name set to client business name
- [ ] Pipeline "AI COO Leads" created with 6 stages:
  - New Lead → Contacted → Proposal Sent → Closed Won → Nurture → Closed Lost
- [ ] Pipeline "AI COO — Delivery" created with stages:
  - Install In Progress → QA → Handoff → Live → Optimization Call Done
- [ ] GHL calendar created — 30-min slots, M–F, SMS + email reminders (2d / 1d / 1hr)
- [ ] Landing page funnel created — hero page + thank-you page
- [ ] Landing page copy updated with client's offer + ICP
- [ ] Form fields configured: Name, Email, Business Type, Monthly Revenue, Biggest Bottleneck
- [ ] Form submit → thank-you redirect → calendar booking link confirmed working
- [ ] 5-email sequence loaded from `Templates/Email_Sequences/` and customized
- [ ] Workflow 01 activated: `Workflows/GHL/01_new_lead_workflow.json`
- [ ] Workflow 02 activated: `Workflows/GHL/02_noshow_followup.json`
- [ ] Workflow 03 activated: `Workflows/GHL/03_payment_kickoff.json`
- [ ] Workflow 04 configured: `Workflows/GHL/04_broadcast_campaign.json`
- [ ] Workflow 05 activated: `Workflows/GHL/05_optimization_call_reminder.json`
- [ ] Custom domain connected (or GHL subdomain confirmed live)
- [ ] Test submission: fake lead submitted → pipeline entry confirmed + email 1 fires ✓

---

## Phase 2 — n8n Setup (~90 min)

- [ ] Client workflow folder created in n8n — tag all flows: `[CLIENT_NAME]`
- [ ] Per-client `.env` created with all variables from `client.env`
- [ ] Workflow 1 imported: `Workflows/n8n/exports/master-router.json`
- [ ] Workflow 2 imported: `Workflows/n8n/exports/revenue-department.json`
- [ ] Workflow 3 imported: `Workflows/n8n/exports/growth-department.json`
- [ ] Workflow 4 imported: `Workflows/n8n/exports/tech-department.json`
- [ ] Workflow 5 imported: `Workflows/n8n/exports/telegram-interface.json`
- [ ] All env variables wired in n8n:
  - `GHL_API_KEY` ✓
  - `GHL_SUBACCOUNT_ID` ✓
  - `TELEGRAM_CHAT_ID` ✓
  - `LEADS_SHEET_ID` ✓
  - `GHL_WEBHOOK_URL` ✓
  - `N8N_HEALTH_URL` ✓
  - `N8N_GROWTH_BROADCAST_URL` ✓
- [ ] Telegram bot created via @BotFather → token saved
- [ ] Client added to bot — `TELEGRAM_CHAT_ID` confirmed (negative number for groups)
- [ ] All 5 workflows activated in n8n
- [ ] Smoke test: fake lead submitted → Revenue Dept fires → Telegram notification received ✓

---

## Phase 3 — Integration Test (~30 min)

- [ ] End-to-end test: opt-in → GHL pipeline → email sequence → n8n Revenue Dept → Telegram ping
- [ ] `/status` command tested — returns correct pipeline counts ✓
- [ ] `/leads` command tested — returns last 5 leads ✓
- [ ] `/pause` tested — confirms paused ✓
- [ ] `/resume` tested — confirms resumed ✓
- [ ] `/help` tested — lists all commands ✓
- [ ] Tech Dept health check manually triggered — no false alerts ✓
- [ ] Growth Dept weekly report manually triggered — correct format ✓
- [ ] `node Scripts/smoke_test.js [CLIENT_NAME]` — all 4 suites pass ✓
- [ ] GA4 DebugView confirms key events (PageView, Lead)
- [ ] Meta Pixel Test Events confirms PageView + Schedule
- [ ] Mobile UX verified (iOS Safari + Android Chrome)

---

## Phase 4 — Handoff (~45 min)

- [ ] 5-minute Loom recorded: GHL pipeline live, email sequence, Telegram commands in real time
- [ ] 1-page "Your AI COO System — How To Use It" guide written (customize from template)
- [ ] "System Live" email sent: Loom link + guide + optimization call calendar link
- [ ] Client folder backed up: `Clients/[CLIENT_NAME]/` zipped and stored
- [ ] Testimonial requested — send immediately while excitement is high
- [ ] Client tagged `active-client` in GHL (triggers Workflow 05 — 30-day optimization call reminder)
- [ ] Template improvements backported to `Templates/` if any improvements were made during install
- [ ] Workflow exports updated in `Workflows/GHL/` and `Workflows/n8n/` if modified
- [ ] Installation time logged for checklist refinement

---

## Time Targets

| Phase | Target |
|---|---|
| Phase 0 — Pre-Install | 30 min |
| Phase 1 — GHL Setup | 60 min |
| Phase 2 — n8n Setup | 90 min |
| Phase 3 — Integration Test | 30 min |
| Phase 4 — Handoff | 45 min |
| **Total per client** | **~4.25 hours** |

---

## Gotchas

- Fill `client.env` **before** touching GHL or n8n — it's the source of truth for all values
- Never hardcode client values in workflows — always use env vars
- `TELEGRAM_CHAT_ID` for group chats is a **negative** number (e.g., `-1001234567890`)
- If GHL snapshot import fails, build manually from `Workflows/GHL/` reference JSONs
- Test email sequence before handoff — GHL sometimes delays Email 1 by 5–10 min
- Record the Loom **after** full test passes — never before
- Testimonial window is highest in the first 48 hours after handoff — don't wait
- Upsell the retainer ($297–$497/mo) at the 30-day optimization call — not before

---

## Client 1 Notes

> Add any non-standard steps, gotchas, or decisions made here as you do your first install.
> These notes become the next version of this checklist.
