# Onboarding Form Template — AI COO System

> Copy this into your GHL form builder or use as a survey template.
> Replace all `{{PLACEHOLDER}}` values with client-specific language.

---

## Form Title
```
AI COO System — Deployment Intake Form
```

## Form Subtitle
```
Takes 5 minutes. Helps us deploy your system faster.
```

---

## Section 1 — Business Basics

**Q1. Full Name**
- Type: Short text
- Required: Yes

**Q2. Email Address**
- Type: Email
- Required: Yes

**Q3. Phone Number (for SMS updates)**
- Type: Phone
- Required: Yes

**Q4. Business Name**
- Type: Short text
- Required: Yes

**Q5. What best describes your business?**
- Type: Dropdown
- Options:
  - Online Coach
  - Course Creator
  - Consultant / Agency
  - Service Business
  - Other
- Required: Yes

---

## Section 2 — Current Operations

**Q6. How are you currently managing leads and follow-up?**
- Type: Long text
- Placeholder: e.g. manually in a spreadsheet, CRM, not really managing it
- Required: Yes

**Q7. What's taking the most of your manual time right now?**
- Type: Long text
- Required: Yes

**Q8. How many leads come in per week on average?**
- Type: Dropdown
- Options: 0-5 / 6-20 / 21-50 / 51-100 / 100+
- Required: Yes

**Q9. What tools are you currently using?** (select all that apply)
- Type: Checkbox
- Options: GHL / ActiveCampaign / Mailchimp / Calendly / Zapier / n8n / Notion / None / Other
- Required: No

---

## Section 3 — Goals

**Q10. What's the #1 outcome you want from the AI COO System?**
- Type: Long text
- Required: Yes

**Q11. What does success look like in 30 days?**
- Type: Long text
- Required: Yes

**Q12. Is there anything else we should know before the deployment call?**
- Type: Long text
- Required: No

---

## Form Settings

- **Submit button text:** Submit — See You on the Call
- **Success message:** Got it. Check your email for call details and a pre-call primer.
- **GHL tags on submit:** `ai-coo-intake`, `{{CLIENT_TAG}}`
- **GHL pipeline:** Move to "Intake Submitted" stage
- **Notification:** Email + Telegram message to owner
