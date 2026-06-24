# Panya — Admin Settings Expansion + Brand Library Evaluation Log

**Date:** 2026-06-24
**Author:** Patiphan S. (uxui.winter@outlook.com)
**Status:** Design — pending review

---

## 1. Summary

This spec combines two related initiatives discussed together:

1. **Admin page expansion** — add net-new workspace settings that don't exist
   anywhere in the product yet (General, Notifications, AI & Content defaults,
   Audit Log, granular Roles).
2. **Brand Library Evaluation Log** — a per-brand feedback loop where the user
   logs *real published-post results* so the system learns what actually works
   for each brand and improves future AI output.

Both are built as **static prototype** screens consistent with the rest of the
app: plain HTML/CSS using the shared `ds.css` / `shared.css` tokens, `toast.js`
for feedback, and `localStorage` for any persistence. No backend.

---

## 2. Context (current state)

### Admin (`admin.html`)
Tabbed page with 5 tabs:
- **Overview** — KPI cards (members, brands, AI credits) + recent activity feed
- **Team** — member table, roles (Admin / Editor / Viewer), invite modal
- **Billing** — plan, usage meters, billing history
- **Integrations** — OpenAI key, Facebook, Instagram, TikTok, LINE, Google Analytics
- **Security** — 2FA, password, sessions, delete workspace

### Settings that live on other pages
- **Brand Library** (`brand-library.html`) — all per-brand config: Brand Voice,
  Colors, Typography, Hashtag Bank, Content Rules, Sample Captions. Each brand
  panel has a `stat-strip` (Plans, AVG Score, Posts Tracked, Hashtags).
- Sidebar user popup links to "My account" but no profile page exists behind it.

### Evaluation today
- **`content-tools.html`** has a caption **evaluation tool** (ประเมินแคปชัน) that
  AI-scores a caption across dimensions (Hook, Brand Voice, CTA, platform fit) —
  one-shot, nothing persisted.
- **Predicta Posts** reference shows an **Evaluation Log** as a read-only scoring
  history (overall score + 5 sub-scores per card, filterable by brand).
- **There is no Evaluation Log in the Panya codebase today**, and no persisted
  history of evaluations or real post results anywhere.

---

## 3. Goals

- Centralize missing workspace settings into `admin.html`.
- Give each brand a living record of evaluated + published posts.
- Capture real-world results so "what works" is grounded in actual performance,
  not just predicted AI scores.
- Keep everything consistent with existing design tokens and interaction patterns.

## 4. Non-goals

- No real backend, API, or persistence beyond `localStorage`.
- No real ML/model retraining — "learning" is represented through UI affordances
  (pinning winners into brand context), not an actual training pipeline.
- No redesign of existing tabs/sections beyond the additions described here.

---

## 5. Part A — Admin settings expansion

### 5.1 Target tab structure

Recommended approach: targeted new tabs + fold small additions into existing
tabs, rather than a flat row of 10 tabs.

| Tab | Status | Contents |
|-----|--------|----------|
| **General** | NEW | Workspace name, logo upload, default language (ไทย/English), timezone (default Asia/Bangkok), currency (฿ THB), date format |
| Overview | exists | unchanged |
| **Team & Roles** | exists + NEW | member table **+ Roles panel**: editable permission matrix (create plans, edit brands, manage billing, invite) |
| **AI & Content** | NEW | default AI model, default tone & output language, banned-words / guardrails list, max credits-per-user cap, auto-translate toggle |
| **Notifications** | NEW | per-event email + in-app toggles: plan approvals, brief submissions, API-key/credit warnings, weekly digest |
| Billing | exists | unchanged |
| Integrations | exists | unchanged (API key stays here) |
| Security | exists | unchanged |
| **Audit Log** | NEW | full filterable log (member, action, date) — the complete version of the Overview activity feed |

### 5.2 IA decisions
- **Roles** folds into Team ("Team & Roles") — same mental model.
- **AI defaults** is separate from the API key: key = connection (Integrations),
  AI tab = behavior.
- **Audit Log** is its own tab (full filterable table, not a settings form).
- Result is 9 tabs. Fallback if too heavy: group into two rows
  ("Workspace" / "Account & Security"). Start flat.

### 5.3 New tab detail

**General**
- Text input: Workspace name (prefilled "Panya")
- Logo upload (drag/drop placeholder + current logo preview)
- Select: Default language (ไทย / English)
- Select: Timezone (default Asia/Bangkok)
- Select: Currency (฿ THB default)
- Select: Date format
- Save button → `toast('Workspace settings saved','success')`

**Team & Roles** (additions only)
- New "Roles & Permissions" panel below the member table.
- Permission matrix: rows = capabilities (Create plans, Edit brands, Manage
  billing, Invite members, View insights); columns = Admin / Editor / Viewer;
  cells = toggles. Admin column locked on.

**AI & Content**
- Select: Default AI model (GPT-4o default)
- Select: Default output tone
- Select: Default output language (Thai-first)
- Tag input: Banned words / guardrails
- Number input: Max AI credits per user / month
- Toggle: Auto-translate generated content

**Notifications**
- Table of events × {Email, In-app} toggles:
  plan approvals, brief submissions, API-key expiry, credit threshold,
  weekly digest, new member joined.

**Audit Log**
- Filter bar: member select, action-type select, date range.
- Data table: timestamp, member, action, target. Reuses `.data-table`.
- Seeded with the same events shown in Overview activity, expanded.

---

## 6. Part B — Brand Library Evaluation Log

### 6.1 Placement
- New `.brand-section` titled **Evaluation Log**, added to each
  `#panel-<brand>` after the **Sample Captions** section.
- Brand-scoped — only shows entries for the brand currently viewed (the brand
  tab already provides the filtering; no global brand filter needed).
- The existing `stat-strip` **AVG Score** and **Posts Tracked** become live
  summaries of this log.

### 6.2 Log entry card (mirrors the Predicta reference)
Each entry shows:
- Platform chip + post-type chip (Promotion / Product / Entertainment)
- Date
- **Overall score** badge + **5 sub-scores** (Hook, Brand Voice, CTA,
  Platform fit, Clarity)
- Caption text with *Show more*
- Actions: **`+ Add details`** · **`Export Result`** · *View details*
- After results are added: a **"Results added ✓"** badge + predicted-vs-actual
  delta (e.g. "AI 67 → Real: High engagement").

### 6.3 "Add details" — the learning input (new vs. Predicta)
Opens a drawer/modal to record what happened after publishing:
- **Real metrics:** reach, likes, comments, shares, engagement rate
  (CTR / saves optional)
- **Verdict tag:** 🏆 Win / ⚪ Neutral / ⚠️ Underperformed
- **Note:** free-text "why" (e.g. "promo timing nailed it", "wrong audience")
- On save → entry updates with results badge + delta; `toast('Results saved','success')`.
- Persist to `localStorage` keyed by brand + entry id.

### 6.4 How learning is represented
- A **Win** entry gains a **"Pin as Sample Caption"** action.
- Pinning promotes that caption into the brand's **Sample Captions** section,
  tagged with its real performance (e.g. "Real: 12.4% ER").
- Conceptually this is the high-signal data the generator feeds back into the
  brand prompt — represented in-UI by the pinning affordance. No real model
  retraining in the prototype.

---

## 7. Components & data flow

- **No new shared infra.** Each page stays self-contained (inline `<script>` +
  `toast.js`, like existing pages).
- **Persistence:** `localStorage`
  - `panya_admin_settings` — General / AI / Notifications / Roles values
  - `panya_eval_log_<brand>` — array of entries with optional `results` object
- **Seed data:** ship each brand's Evaluation Log with a few seeded entries so
  the section is populated on first view (matching the rest of the mock app).

---

## 8. Build order (suggested)

1. Admin: **General** tab (highest-value gap, simplest form).
2. Admin: **Notifications** tab.
3. Admin: **AI & Content** tab.
4. Admin: **Team & Roles** permission matrix.
5. Admin: **Audit Log** tab.
6. Brand Library: **Evaluation Log** section + seeded entry cards.
7. Brand Library: **Add details** drawer + localStorage persistence.
8. Brand Library: **Pin as Sample Caption** + stat-strip live summary.

Parts A and B are independent and can be built in either order.

---

## 9. Open questions / assumptions

- Assumed **static prototype** (no backend) — confirm.
- Assumed learning is shown via **Pin → Sample Captions** — confirm vs. feeding
  into Content Tools / Ask Panya instead.
- Exact 5 sub-score labels mirror Predicta; confirm final labels.
