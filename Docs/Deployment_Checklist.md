# Deployment Checklist — AI COO System

> Fill this in brutally specifically during Week 4 of Client 1 deployment.
> This becomes the repeatable franchise kit for every client after.

---

## Week 1 — Offer & GHL Setup

- [ ] GHL agency account confirmed and active
- [ ] "AI COO Template" master subaccount created
- [ ] Client ICP confirmed (online expert: coach / course creator / consultant)
- [ ] Client offer and primary funnel identified
- [ ] Client GHL subaccount duplicated from master template
- [ ] Client env file created at `Clients/[CLIENT_NAME]/env/client.env`
- [ ] All placeholder values in env file populated
- [ ] Client pipeline stages confirmed and mapped

## Week 2 — Workflows & Templates

- [ ] Lead capture workflow imported and tested
- [ ] No-show / follow-up workflow imported and tested
- [ ] Broadcast / referral workflow imported and tested
- [ ] Health check workflow imported and tested
- [ ] Telegram control panel v1 commands wired
- [ ] Email sequences copied from `Templates/Email_Sequences/` and personalized
- [ ] Onboarding form copied from `Templates/Onboarding_Forms/` and customized
- [ ] Landing page copied from `Templates/Landing_Page/` and customized
- [ ] All webhook endpoints confirmed and tested
- [ ] UTM passthrough confirmed end-to-end

## Week 3 — Testing & Debugging

- [ ] Full funnel smoke test: lead → pipeline → workflow → email
- [ ] Telegram commands tested: status, pause, resume, report
- [ ] No-show sequence tested with real test contact
- [ ] Broadcast tested with segment filter
- [ ] Health check alert tested
- [ ] GA4 DebugView confirms all key events
- [ ] Meta Pixel Test Events confirms PageView + Lead + Purchase
- [ ] FastPayDirect → thank-you redirect verified end-to-end with live test purchase
- [ ] UTM attribution confirmed in GHL contact record
- [ ] Mobile UX verified (iOS Safari + Android Chrome)

## Week 4 — Documentation & Handoff

- [ ] This checklist filled in with exact steps taken for Client 1
- [ ] Any custom steps documented in `Clients/[CLIENT_NAME]/README.md`
- [ ] Workflow exports saved to `Workflows/GHL/` and `Workflows/n8n/`
- [ ] Template updates backported to `Templates/` if improvements were made
- [ ] `Docs/Deployment_Checklist.md` updated with lessons learned
- [ ] Client handed off with Telegram access and onboarding walkthrough
- [ ] Retainer conversation initiated after 30 days of results

---

## Notes — Client 1 Specific

> Add any non-standard steps, gotchas, or decisions made for Client 1 here.
