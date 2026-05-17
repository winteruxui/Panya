# Panya — Product Requirements Document
**Version:** 1.0  
**Date:** May 2026  
**Status:** Draft for Development  
**Prepared by:** Product Design  

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Core Design Philosophy](#2-core-design-philosophy)
3. [Design System](#3-design-system)
4. [Information Architecture](#4-information-architecture)
5. [Global Components](#5-global-components)
6. [Pages — Detailed Spec](#6-pages--detailed-spec)
   - 6.1 Authentication
   - 6.2 Dashboard
   - 6.3 Plans
   - 6.4 Content Tools
   - 6.5 Brand Library
   - 6.6 Insights
   - 6.7 Admin
   - 6.8 Ask Panya
7. [Cross-cutting Guardrails](#7-cross-cutting-guardrails)
8. [Accessibility Standards](#8-accessibility-standards)
9. [Error Handling](#9-error-handling)
10. [Copy Guidelines](#10-copy-guidelines)

---

# 1. Product Overview

## 1.1 What Panya Is

Panya is a brand intelligence platform for social media content teams. It enables agencies and brands to plan, score, evaluate, and improve social content using AI that learns from each brand's historical performance data.

The core loop that makes Panya unique:
> Upload brand data → AI learns brand patterns → Create content plan → Score ideas with AI → Client approves → Post on platform → Log actual results → AI calibrates → Predictions improve → Loop continues

## 1.2 Two Products, One Codebase

Panya operates as two distinct experiences sharing the same backend:

| | Internal App | Client App |
|---|---|---|
| **Who** | Agency team | Brand client |
| **Brand access** | Multiple brands (role-dependent) | Single brand only |
| **Navigation** | Brand switcher (multi) | Brand name (locked) |
| **Admin** | Visible to Admin role | Not visible |
| **Feature access** | Full | Full (within own brand) |
| **AskPanya** | Can query across brands | Locked to own brand |

The **only architectural difference** is brand scope. All modules and features exist in both versions.

## 1.3 User Roles

| Role | Description | Access |
|---|---|---|
| **Admin** | Agency administrator | All brands, all modules, Admin panel |
| **Team** | Agency content team | Assigned brands, all modules except Admin |
| **Client** | Brand-side user | Own brand only, all modules except Admin |

## 1.4 The Intelligence Loop (Core Product Value)

```
Brand Library (data + config)
        ↓ feeds
     AI learns brand patterns
        ↓
Plans → Brief → Content Ideas
        ↓
   Content Tools (Score / Rewrite / Check)
        ↓
   Client Approval (Feedback tab)
        ↓
   Published Content
        ↓
   Insights ← Log Actual KPI Results
        ↓
   AI Calibrates (Brand Score improves)
        ↓
   Loop — AI gets smarter every month
```

Every design decision must make this loop **more visible, more rewarding, and lower friction**.

---

# 2. Core Design Philosophy

## 2.1 Design Principles

### P1 — Context-First Navigation
Users must always know what brand and platform they are working with. The Brand Switcher and Platform Switcher are persistent, always visible, never move. This context propagates to every tool automatically.

### P2 — State Over Structure
Navigation is not just a list of pages. It communicates work status. A "Plans" nav item with a badge "[2]" tells users there are 2 plans needing attention before clicking. Users arrive informed.

### P3 — Role-Aware Interface
Admin, Team, and Client each have different mental models and tasks. The interface is designed per role from the start — not one interface with things hidden or greyed out.

### P4 — Progressive Disclosure
Show primary actions first. Details, settings, and edge cases reveal progressively. A tool hub shows 6 tool names — not 6 expanded forms. A plan card shows status — not every field.

### P5 — Persistent Utility
Ask Panya is accessible from its own dedicated nav item on every page. Brand + Platform context inherits automatically. No setup required per conversation.

### P6 — Operational Over Promotional
The dashboard is a daily work hub, not a product landing page. No hero copy, no feature marketing, no logo treatment. Users see their work status immediately.

### P7 — Compounding Value Visibility
Every action that improves AI accuracy should feel meaningful. Logging a KPI result shows "AI will recalibrate for this brand." Brand Score updates visibly. Predictions becoming more accurate over time is surfaced as a metric, not buried.

## 2.2 Aesthetic Direction: Precision Intelligence

Panya handles real business data, client budgets, and brand reputation. The visual language should convey that the system is **serious, accurate, and trustworthy** — not generic SaaS.

**Aesthetic reference:** precision tools (think Figma's UI density, Linear's clarity, Perplexity's intelligence signals) — not consumer apps.

**What this means:**
- Dark primary theme with intentional color use
- Typography with character — not generic system fonts
- Score numbers are hero elements — monospace, large, prominent
- Color has semantic meaning: teal = positive/approved, amber = attention needed, red = error/blocked
- Density is appropriate: content teams work with data, not afraid of information

**What to avoid:**
- Glass morphism
- Gradient blobs
- Generic SaaS blue (#3B82F6)
- Inter or Space Grotesk as primary fonts
- Apple-style design language
- Excessive white space on operational screens
- Marketing aesthetics on data screens

---

# 3. Design System

## 3.1 Color Tokens

### Base Palette (Dark Theme — Internal & Client)

```
--color-bg-base:       #0D0D0F   (page background)
--color-bg-surface:    #161618   (cards, panels)
--color-bg-elevated:   #1E1E21   (dropdowns, modals, tooltips)
--color-bg-overlay:    #252528   (hover states on surface)

--color-border-subtle: #2A2A2E   (subtle dividers)
--color-border-default:#3A3A3F   (card borders, inputs)
--color-border-strong: #52525A   (focus rings, emphasized borders)

--color-text-primary:  #F0F0F2   (primary text)
--color-text-secondary:#A0A0A8   (secondary labels, timestamps)
--color-text-muted:    #606068   (placeholder, disabled text)
--color-text-inverse:  #0D0D0F   (text on light accent bg)
```

### Accent Palette

```
--color-accent-teal:        #00C7A8   (primary CTA, positive, approved, AI active)
--color-accent-teal-muted:  #00C7A820 (teal backgrounds, badges)

--color-accent-amber:       #F59E0B   (attention needed, brief ready, warning)
--color-accent-amber-muted: #F59E0B20

--color-accent-red:         #EF4444   (error, rejected, failed, blocked)
--color-accent-red-muted:   #EF444420

--color-accent-blue:        #60A5FA   (in-progress, drafting, informational)
--color-accent-blue-muted:  #60A5FA20

--color-accent-purple:      #A78BFA   (scored, complete, secondary accent)
--color-accent-purple-muted:#A78BFA20

--color-accent-orange:      #F97316   (pending feedback, action required from client)
--color-accent-orange-muted:#F9731620

--color-accent-gray:        #71717A   (archived, complete/inactive)
--color-accent-gray-muted:  #71717A20
```

### Score Color Mapping

```
Score 0–39   (Weak):      --color-accent-red
Score 40–64  (Average):   --color-accent-orange
Score 65–79  (Strong):    --color-accent-amber
Score 80–100 (Excellent): --color-accent-teal
```

### Client Portal (Light Theme Override)

Client-facing pages use a light theme to ensure readability in presentation/meeting contexts.

```
--color-bg-base:       #FAFAFA
--color-bg-surface:    #FFFFFF
--color-bg-elevated:   #F4F4F5
--color-border-default:#E4E4E7
--color-text-primary:  #18181B
--color-text-secondary:#71717A
```

All accent colors remain the same between themes for semantic consistency.

## 3.2 Typography

### Font Stack

```
Display / Brand:   "Instrument Serif" (Google Fonts) — italic variant for emphasis
UI / Body:         "DM Sans" (Google Fonts) — variable weight
Monospace / Score: "JetBrains Mono" (Google Fonts) — for numbers, scores, code
```

**Rationale:** Instrument Serif brings editorial character to headings without being precious. DM Sans is highly legible at small sizes with a neutral but not generic personality. JetBrains Mono makes scores and metrics feel precise and data-driven.

**Never use:** Inter, Roboto, Space Grotesk, Arial as primary fonts.

### Type Scale

```
--text-xs:   11px / 1.4 / tracking: 0.02em  (meta labels, timestamps)
--text-sm:   13px / 1.5 / tracking: 0       (secondary body, table rows)
--text-base: 15px / 1.6 / tracking: 0       (primary body)
--text-lg:   18px / 1.5 / tracking: -0.01em (subheadings, card titles)
--text-xl:   22px / 1.4 / tracking: -0.02em (section headers)
--text-2xl:  28px / 1.3 / tracking: -0.02em (page titles)
--text-3xl:  36px / 1.2 / tracking: -0.03em (hero numbers, scores)
--text-4xl:  48px / 1.1 / tracking: -0.04em (hero display)

Score numbers: JetBrains Mono, --text-3xl, weight: 700
```

### Weight Usage

```
400 — body, secondary labels
500 — UI labels, table headers, badge text
600 — card titles, emphasized body
700 — page titles, score numbers, CTAs
```

## 3.3 Spacing System

Base unit: 4px

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
```

**Component spacing:**
- Card padding: --space-6 (24px)
- Section gap: --space-8 (32px)
- Sidebar width: 240px
- Content max-width: 1200px
- Table row height: 52px min

## 3.4 Border Radius

```
--radius-sm:   4px  (tags, badges, small inputs)
--radius-md:   8px  (buttons, cards, inputs)
--radius-lg:   12px (panels, modals)
--radius-xl:   16px (large cards, drawers)
--radius-full: 9999px (pills, chips, avatars)
```

## 3.5 Shadow

Used sparingly and intentionally — only for elevated elements:

```
--shadow-sm:  0 1px 2px rgba(0,0,0,0.4)                     (subtle lift)
--shadow-md:  0 4px 12px rgba(0,0,0,0.5)                     (dropdowns, tooltips)
--shadow-lg:  0 8px 24px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)  (modals)
```

No decorative shadows on flat cards. Use background + border differentiation instead.

## 3.6 Motion

```
--duration-fast:   100ms  (hover states, toggle switches)
--duration-base:   200ms  (most interactions)
--duration-slow:   300ms  (panel open/close, page transitions)
--duration-xslow:  500ms  (score reveal, loading completion)

--easing-standard: cubic-bezier(0.4, 0, 0.2, 1)   (default)
--easing-decelerate: cubic-bezier(0, 0, 0.2, 1)    (enter/appear)
--easing-accelerate: cubic-bezier(0.4, 0, 1, 1)    (exit/disappear)
--easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1) (score reveal, success state)
```

**Animation rules:**
- Never animate on page load if it delays content
- Score reveals use --easing-spring to feel satisfying
- Panel open/close uses --easing-decelerate / --easing-accelerate
- Skeleton loading uses shimmer animation at 1.5s loop

## 3.7 Status Badge System

Every badge follows the same structure: color dot + label. Background uses the muted variant of the color.

| Status | Color | Label |
|---|---|---|
| BRIEF READY | Amber | Brief Ready |
| DRAFTING | Blue | Drafting |
| SCORED | Purple | Scored |
| PROPOSED | Teal | Proposed |
| FEEDBACK PENDING | Orange | Feedback Pending |
| COMPLETE | Gray | Complete |
| Active | Teal | Active |
| Invited | Amber | Invited |
| Disabled | Gray | Disabled |
| Excellent accuracy | Teal | Excellent |
| Good accuracy | Amber | Good |
| Fair accuracy | Orange | Fair |
| Low accuracy | Red | Low |
| No results | Gray | No results yet |

## 3.8 Component Specifications

### Button

**Sizes:** sm (32px h), md (40px h, default), lg (48px h)  
**Min touch target:** 44×44px (apply padding if button is smaller)  
**Variants:**

```
Primary:    bg: --color-accent-teal, text: --color-text-inverse, hover: darken 12%
Secondary:  bg: transparent, border: --color-border-default, text: --color-text-primary, hover: bg --color-bg-overlay
Destructive: bg: --color-accent-red, text: white, hover: darken 12%
Ghost:      bg: transparent, text: --color-text-secondary, hover: bg --color-bg-overlay, text: --color-text-primary
Disabled:   opacity: 40%, cursor: not-allowed, no hover effects
Loading:    replace label with spinner, disabled state
```

### Input / Textarea

```
bg: --color-bg-surface
border: --color-border-default
border-radius: --radius-md
padding: --space-3 --space-4
text: --color-text-primary
placeholder: --color-text-muted

focus:  border: --color-accent-teal, ring: 2px --color-accent-teal at 30% opacity
error:  border: --color-accent-red
disabled: opacity: 50%, bg: --color-bg-elevated, cursor: not-allowed
```

### Dropdown / Select

Same as Input for base styling. Open state:
- Options panel: bg --color-bg-elevated, shadow: --shadow-md, z-index: 50
- Option hover: bg --color-bg-overlay
- Option selected: bg --color-accent-teal-muted, text: --color-accent-teal

### Toggle Chips (multi-select options)

Used for: Platform selection, Content Objective, Tone of Voice, Pillar selection

```
Default:  bg: --color-bg-elevated, border: --color-border-default, text: --color-text-secondary
Selected: bg: --color-accent-teal-muted, border: --color-accent-teal, text: --color-accent-teal
Hover:    bg: --color-bg-overlay, text: --color-text-primary
```

### Card

```
bg: --color-bg-surface
border: 1px solid --color-border-default
border-radius: --radius-lg
padding: --space-6
hover (if clickable): border: --color-border-strong, bg: --color-bg-overlay, transition: --duration-base
```

### Skeleton Loading

```
bg: linear-gradient(90deg, --color-bg-surface, --color-bg-elevated, --color-bg-surface)
background-size: 200%
animation: shimmer 1.5s infinite linear
border-radius: --radius-sm
```

### Toast Notifications (Sonner)

```
Success: left border 3px --color-accent-teal
Warning: left border 3px --color-accent-amber
Error:   left border 3px --color-accent-red
Info:    left border 3px --color-accent-blue
Duration: 4000ms default, 6000ms for destructive actions with undo
Position: bottom-right
```

### Modal / Dialog

```
Overlay: bg rgba(0,0,0,0.7), backdrop-blur: 4px
Panel: bg --color-bg-elevated, border: --color-border-default, shadow: --shadow-lg
border-radius: --radius-xl
Max-width: 480px (small), 640px (medium), 800px (large)
Animation: scale from 0.95 + fade in, --duration-slow, --easing-decelerate
```

**Guardrail:** No scrollable content inside modals. If content exceeds modal height, use a full-page panel or a drawer instead.

### Inline Expand (accordion row)

Used in: Evaluation Log KPI form, Insights Log Results, Plan feedback items

```
Closed: standard table row height 52px
Open: row expands downward, pushing rows below. Transition: --duration-slow, --easing-decelerate
Open bg: --color-bg-elevated with left border 2px --color-accent-teal
Close on: Escape key, clicking outside the row
```

### Slide-in Panel (Drawer)

Used in: Invite User, Brand detail side context

```
Width: 400px
Origin: right edge
Overlay: bg rgba(0,0,0,0.5)
Animation: translateX from 100% to 0, --duration-slow, --easing-decelerate
Close on: × button, Escape key, overlay click
```

---

# 4. Information Architecture

## 4.1 Internal App Navigation

```
Sidebar (240px, fixed)
│
├── [Panya. logo]
│
├── Brand Switcher    → dropdown, multi-brand
├── Platform Switcher → dropdown: Facebook / Instagram / TikTok / Twitter/X / YouTube / LINE
│
├── ● Dashboard
├── ○ Plans           [badge: pending count]
├── ○ Content Tools
├── ○ Brand Library
├── ○ Insights
├── ○ Ask Panya
│
├── ─────────────────
├── ○ Admin           [Admin role only] [badge: pending users]
│
└── [User email + role dropdown]
    ├── Profile settings
    └── Sign out
```

## 4.2 Client App Navigation

```
Sidebar (240px, fixed)
│
├── [Panya. × BrandName co-branding]
│
├── [Brand Name — static, no dropdown]
├── Platform Switcher → dropdown
│
├── ● Dashboard
├── ○ Plans           [badge]
├── ○ Content Tools
├── ○ Brand Library
├── ○ Insights
├── ○ Ask Panya
│
└── [User email dropdown]
    ├── Profile settings
    └── Sign out
```

## 4.3 Page Hierarchy

```
/ dashboard
/ plans
  / plans/new                → wizard: context
  / plans/new/brief          → wizard: brief
  / plans/new/content        → wizard: content
  / plans/new/media          → wizard: media
  / plans/new/summary        → wizard: summary
  / plans/:id                → open plan (tabbed)
  / plans/:id/brief
  / plans/:id/content
  / plans/:id/media
  / plans/:id/feedback
  / plans/:id/summary
/ content-tools
  / content-tools/score
  / content-tools/rewrite
  / content-tools/generate
  / content-tools/policy
  / content-tools/hook
  / content-tools/log
/ brand-library
  / brand-library/data
  / brand-library/data/upload
  / brand-library/data/history
  / brand-library/settings/persona
  / brand-library/settings/guardrails
  / brand-library/settings/regulatory
  / brand-library/settings/voice
/ insights
  / insights/:brandSlug/:platform  → brand detail
/ ask-panya
  / ask-panya/:conversationId
/ admin
  / admin/users
  / admin/brands
  / admin/access
  / admin/system
/ auth/signin
/ auth/signup
```

---

# 5. Global Components

## 5.1 Brand + Platform Switcher

**Behavior:**
- Changing brand: All pages re-render with data for the new brand. URL updates to reflect context.
- Changing platform: Same behavior.
- Internal app: All brands user has access to appear in dropdown, searchable.
- Client app: Brand is locked (no dropdown). Platform dropdown is available.
- Context persists across page navigation within session.
- Context used by Content Tools automatically — no re-selection needed.

**States:**
- Default: Shows current brand name + platform name
- Open: Dropdown with search input + brand list
- Loading (after switch): Skeleton content in main area while new brand data loads
- No brand access: Fallback message "You don't have access to any brands yet. Contact your admin."

## 5.2 Sidebar Navigation Badges

- Plans badge: Count of plans in status BRIEF READY or FEEDBACK PENDING
- Admin badge: Count of pending approval users
- Badges are integers, max display "9+" for numbers above 9
- Badges clear when user visits the relevant page and the pending items no longer apply

## 5.3 Toast System

All toasts use Sonner library positioned bottom-right.

**Standard messages:**
- Save success: "[Item] saved."
- Invite sent: "Invite sent to [email]."
- Access updated: "Access updated."
- Upload complete: "Upload complete. [N] posts added."
- Calibration triggered: "Results saved. AI will recalibrate for [Brand]."
- Undo actions: Duration 6000ms with "Undo" button. Undo reverses server action.

**Error toasts:** 
- Generic: "Something went wrong. Please try again."
- Network: "Connection issue. Your changes may not have saved."
- Always include Retry action when applicable.

## 5.4 Empty States

Every empty state must have:
1. Icon or illustration (simple, not decorative)
2. Heading: What is missing ("No plans yet")
3. Body: What to do about it ("Start by creating your first monthly plan")
4. Primary CTA button linking to the creation flow

**Never show blank space.** Empty states are onboarding opportunities.

## 5.5 Confirmation Dialogs

Used only for **destructive or irreversible actions**.

Standard structure:
- Title: What will happen ("Remove [Name]?")
- Body: Consequence + reversibility ("They'll lose access immediately. This can't be undone.")
- Actions: [Destructive action] + [Cancel] — destructive action is always right/primary position

**Guardrail:** Confirmation dialogs must include the name of the specific item being acted on. "Delete this?" is not acceptable. "Remove angkana@winter.co.th?" is correct.

## 5.6 Loading States

- **Skeleton screens** over spinners for page-level loads
- **Inline spinners** for button-triggered actions (replace button label)
- **Progress bars** for file uploads with percentage
- **Toast "Processing..."** for async operations that take > 2 seconds

**Guardrail:** Users must never see a blank white/dark page during loading. Skeleton must reflect the actual layout of the content loading.

---

# 6. Pages — Detailed Spec

---

## 6.1 Authentication

### Sign In

**Job:** Allow existing users to receive a magic link.

**Layout:** Split — left marketing panel (brand messaging), right auth form

**States:**
- **Default:** Email input empty, button disabled
- **Email entered:** Button active "Send Magic Link →"
- **Loading:** Button shows spinner "Sending..."
- **Success:** Form replaced with message "Check your inbox. We sent a link to [email]. It expires in 15 minutes."
- **Email not found:** Inline error under input "We don't recognize this email. Request access below."

**Fields:**
- Work email — text input, type="email", autocomplete="email"
- CTA: "Send Magic Link →"
- Link: "New to Panya? Request access →"

**Guardrails:**
- Email must pass format validation before button activates
- Resend option appears after 30 seconds on success state: "Didn't get it? Resend."
- Magic link expires 15 minutes after send. Expired link shows error: "This link has expired. Request a new one."
- Rate limit: 3 requests per email per 10 minutes. Over limit: "Too many requests. Try again in a few minutes."

---

### Sign Up (Request Access)

**Job:** New users submit their name and email for admin approval.

**Layout:** Centered card

**States:**
- **Default:** Both fields empty, button disabled
- **Filled:** Button active "Request Access →"
- **Loading:** Spinner "Submitting..."
- **Success:** "Request received. We'll send you a magic link once approved."
- **Email already registered:** "This email already has access. Sign in instead →"

**Fields:**
- Full name — text input (required)
- Work email — text input, type="email" (required)
- CTA: "Request Access →"

**Guardrails:**
- Both fields required before button activates
- Email format validated client-side
- After submission, user appears in Admin > Users > Pending section

---

## 6.2 Dashboard

### Job
State-aware operational hub. Users open the app and immediately see what needs attention today.

### Layout
Single column, max-width 1200px, centered.

### Sections (top to bottom)

#### A. Page Header
- Greeting: "Good morning, [first name]." (updates: Good afternoon / Good evening)
- Sub: Current date

#### B. Needs Attention
Displays items that require action, ordered by urgency.

**Urgency order:**
1. Plans where client feedback was received > 2 days ago (FEEDBACK PENDING)
2. Plans that are BRIEF READY with no drafts started and > 3 days since creation
3. Plans in PROPOSED status > 5 days with no client response
4. Brands with no data uploaded (if plans exist for that brand)

**Per item displays:**
- Severity icon (⚡ urgent red / ⚠ attention amber / ℹ info blue)
- Brand + Platform + Month (always present)
- Reason string (human-readable, specific)
- Time elapsed ("3 days ago")
- Primary CTA button (deep links to the exact step that needs action)

**States:**
- Has items (1–5): Shows section with list
- Has items (>5): Shows 5 + "View all ([N])" link
- No items: Section shows "You're all caught up." (keep section visible to prevent layout jump)
- Loading: 3 skeleton items

#### C. Active Plans Grid

Cards for all plans user has access to, excluding COMPLETE plans (which are in Plans list).

**Per card:**
- Brand name (large)
- Platform badge
- Month + Year
- Status badge (color-coded)
- Progress line: "5/8 ideas drafted" or "10 ideas · AVG score 54" or "0 ideas"
- Last updated: "Updated 2 hours ago"
- Click: Opens plan at its current step

**States:**
- Default: Grid 3 columns (2 on medium, 1 on small)
- Filtered: When brand switcher active, shows only that brand's plans + filter chip
- Empty: "No active plans. Start your first one →"

**Sort:** Last updated desc (not user-configurable on Dashboard)

**Limit:** 8 cards. "View all plans →" link below grid.

#### D. Quick Actions

3 large action buttons:
- "+ New Plan" → /plans/new
- "Score a Caption" → /content-tools/score
- "Generate Ideas" → /content-tools/generate

#### E. Recent Activity Feed

Timeline of events across the workspace. Shows last 10 items.

**Format per item:**
- User avatar initial
- Action description: "[Name] scored 3 captions for Haier Instagram"
- Time: relative ("2 hours ago")

**Event types tracked:**
- Plan created / status changed
- Caption scored
- Client feedback received
- Data uploaded
- User invited / approved

**States:**
- Has events: Feed visible
- No events: "No recent activity yet."
- Loading: 5 skeleton lines

### Internal vs Client Differences

| Section | Internal | Client |
|---|---|---|
| Greeting | "Good morning, [name]." | "Good morning, [name]." |
| Brand header | AVG Brand Score across all brands | Brand Score for own brand + trend |
| Needs Attention | All accessible brands | Own brand only |
| Active Plans | All accessible brands | Own brand only |
| Quick Actions | Same | Same |
| Recent Activity | Workspace-level | Own brand only |

### Client-specific: Brand Score Hero

Displayed between greeting and Needs Attention for Client:

```
[Brand Name]
Brand Score: 78/100  ↑ +5 from last month
[Gauge visualization]
"AI is well-calibrated for your brand. Keep logging results to maintain accuracy."
```

---

## 6.3 Plans

### 6.3.1 All Plans List

**Job:** Overview of all plans, entry point to open or create.

**Layout:** Full-width table with filters above.

**Actions:**
- Filter by: Brand (Internal) / Platform / Month / Status
- Sort by: Last updated (default) / Status / Month / AVG Score / Brand A-Z
- Search: Text search on brand name + month
- Click "Open Plan" → /plans/:id
- Click "Log Feedback" (PROPOSED status only) → /plans/:id/feedback
- Click "Remove" → confirmation dialog → soft delete

**Columns:**
- Brand + Platform (combined cell with brand name + platform badge)
- Month / Year
- Status badge
- Ideas count
- AVG Score ("–" if not scored)
- Last updated
- Actions: "Open Plan" + "Log Feedback" (conditional) + "Remove"

**Row states:**
- Default
- Hover: bg --color-bg-overlay
- BRIEF READY: left border 2px --color-accent-amber
- FEEDBACK PENDING: left border 2px --color-accent-orange

**Sorting options:**
- Last updated (desc) — default
- Status group: BRIEF READY → DRAFTING → SCORED → PROPOSED → FEEDBACK PENDING → COMPLETE
- Month newest first
- AVG Score highest first
- Brand A-Z (Internal only)

**Empty state:** "No plans yet. Create your first monthly plan to get started. → + New Plan"

**Pagination:** 20 rows per page or infinite scroll (TBD based on implementation)

---

### 6.3.2 New Plan — Wizard

Step indicator at top: [1. Context] → [2. Brief] → [3. Content] → [4. Media] → [5. Summary]

Completed steps show ✓ icon. Current step is highlighted. Future steps are inactive (not clickable).

**Wizard Guardrails:**
- Cannot skip steps forward
- Can go back to any completed step without losing later data
- Browser back button triggers "Leave wizard?" confirmation
- Accidental refresh triggers "You have unsaved changes" browser confirmation
- Progress auto-saved to draft after each step completion

---

**Step 1: Context**

**Fields:**
- Brand — dropdown (required). Internal: all accessible brands. Client: pre-selected, locked.
- Platform — dropdown (required): Facebook / Instagram / TikTok / Twitter/X / YouTube / LINE
- Month — dropdown of 12 months (required)
- Year — number input, default current year (required)

**Behavior:**
- All 4 fields required before "Start Brief →" activates
- After all fields filled: system checks for duplicate plan (same brand + platform + month + year)
  - If duplicate exists: inline warning "A plan for [Brand] / [Platform] / [Month] [Year] already exists. [Open it →] or continue creating a new one."
  - Not a blocker — user can continue anyway
- After all fields filled: system checks if brand has data in library
  - If no data: inline info "This brand has no uploaded data. AI suggestions and scoring will use generic mode. [Upload data →] or continue."
  - Not a blocker

**States:**
- Incomplete: Button "Start Brief →" disabled, tooltip "Complete all fields to continue"
- Duplicate warning: Yellow inline message below fields
- No data warning: Blue inline message below fields
- Complete: Button active

---

**Step 2: Brief**

**Sections:**

**1. Planning Context (read-only, inherited from Step 1)**
Brand / Platform / Month / Year — displayed as chips, with "← Change" link back to Step 1.

**2. Monthly Direction (CORE INPUT)**
- Hero Campaign Name — text input, optional. Placeholder: "e.g. Songkran Refresh 2026"
- Product or Service Focus — text area, optional. Placeholder: "Core skincare range, subscription plan, seasonal menu..."

**3. Pillar Mix (REQUIRED)**
- Pillar name — text input per row. Placeholder: "e.g. Education, Lifestyle, Promotion"
- Pillar count — number input per row (pieces)
- "+ Add Pillar" button — adds a new row
- "Remove" × per row
- Total Posts calculated automatically and shown sticky: "Total posts: 8"
- Pillar suggestions: chips of historically-used pillars for this brand. Click chip to add instantly.
- Minimum: 1 pillar required to proceed

**4. Optional Notes**
- Text area. Placeholder: "Launch dates, seasonal context, approval guardrails, key opportunities..."

**Actions:**
- "Save Monthly Brief" → saves and navigates to Step 3
- "Clear All" → confirmation "Clear everything you've written? This can't be undone."
- "← Back to Context" → Step 1

**States:**
- No pillars: "Save Brief" disabled, tooltip "Add at least one pillar to continue"
- Pillars added: Total count updates in real-time
- Saving: Spinner on button
- Saved: Toast "Brief saved." + auto-navigate to Step 3

**Guardrails:**
- Pillar name field: max 40 characters
- Pillar count: min 0, max 99, integers only
- Campaign name: max 100 characters
- Notes: max 1000 characters

---

**Step 3: Content Ideas (Drafting)**

**Layout:** Two-column: Left 65% = workspace, Right 35% = brief reference + AI suggestions panel

**Left: Drafting Workspace**

**Suggest Ideas Bar (top of workspace):**
- Label: "Suggest Ideas Objective"
- Chips: General / Maximize Comments / Maximize Shares / Maximize Saves / Maximize Reach / Drive Clicks (single select)
- Button: "Suggest Ideas with Panya" → triggers AI, appends 3 idea cards with pre-filled content

**Idea Cards (each):**

Header row: "IDEA [N]" label + Score badge (NOT SCORED / Weak / Average / Strong / Excellent) + "Score" button + "Remove" button

Fields:
- Post Type — dropdown: Carousel / Reel / Static / Story / Video / Other
- Pillar — dropdown: Shows ONLY pillars defined in this plan's Brief (not generic list)
- Content Objective — chips: General / Maximize Comments / Maximize Shares / Maximize Saves / Maximize Reach / Drive Clicks (single select, optional)
- Post Idea / Caption Draft — text area. Placeholder: "Draft the core post idea or caption here. PredictaPost will score this against the brief and brand history."
- Visual Reference — optional. Toggle: "Image / Mockup" (upload) or "URL" (text input). Accepted: PNG, JPG, GIF

Score button behavior:
- Before score: "Score" button in secondary style
- Scoring: Spinner "Scoring..."
- After score: Badge updates to score label + number. If < 65: inline suggestion appears: "Hook could be stronger. Try [suggestion text]."

Card save states:
- Unsaved: "Draft not saved yet" label bottom right
- Saved: "Saved [time]" label
- Auto-save: Every 30 seconds if changes exist

Buttons at bottom of workspace:
- "+ Add idea card" → appends new empty card
- "Save idea" → saves focused card
- "Save all ideas" → saves all cards, navigates to Step 4

**Right: Context + AI Suggestions Panel**

**Brief Reference section:**
- Status chip: "BRIEF LOADED" (teal) or "WAITING FOR BRIEF" (amber)
- Shows: Brand / Platform / Month, Hero Campaign, Product Focus, Pillar Mix (with drafted count vs target per pillar)

**Pillar Progress tracker (updates in real-time):**
```
Engagement: 2/5 drafted (40%)  [progress bar]
Promotion:  0/2 drafted (0%)   [progress bar amber]
Education:  1/1 drafted (100%) [progress bar teal]
```

**AI Suggestions section:**
- Shows 5 short idea suggestions based on brief + brand data
- Each suggestion is 1–2 sentence shorthand
- Clicking a suggestion: Pre-fills caption draft of the currently focused card

**States of workspace:**
- No cards: "Add your first idea" placeholder + "+ Add idea card" button centered
- Cards present: Full workspace
- AI suggestions loading: Spinner in right panel
- Brief not loaded: "Load a brief first to get contextual AI suggestions" in right panel

**Guardrails:**
- Pillar dropdown only shows pillars from this plan's brief. If brief has no pillars: show warning "Brief has no pillars defined. ← Edit Brief."
- Score button is disabled if caption draft is empty
- Cannot proceed to Step 4 with 0 saved ideas (warning, not hard block — user can click "Continue anyway")

---

**Step 4: Media Plan**

**Job:** Specify which posts will be boosted and set media budget.

**Header:** "Media Plan — Draft"  
Subtitle: "Set which posts use paid media. You can edit this after the plan is confirmed."  
Context chips: [Brand] [Platform] [Month]

**Table columns:**
- Post (caption preview, truncated 2 lines + "Show full caption" link below)
- Post type · Pillar (small text)
- Boost — checkbox toggle
- Objective — dropdown: Reach / Engagement / Traffic / Conversions (shown only when Boost = on)
- Budget (฿) — number input (shown only when Boost = on)
- Duration (days) — number input (shown only when Boost = on)

**Footer summary bar (sticky):**
- Total budget: ฿[sum]
- Boosted posts: [count]
- Objectives: Reach [n] · Engagement [n] · ...

**Validation:**
- Post with Boost on but no Objective: warning icon on row, tooltip "Select an objective for this boosted post"
- Post with Boost on, Objective set, but Budget = 0: info indicator "Budget is ฿0. Fill in your estimated budget or leave as ฿0 if unknown."

**Actions:**
- "Skip →" → skip media plan entirely, go to Step 5. Status note: "Media plan not set. You can add it later."
- "Save & Continue to Summary →" → validates, saves, navigates to Step 5
- "← Back to Content" → Step 3

**States:**
- No boosts selected: Summary shows "Total budget: ฿0 · No boosted posts"
- Partial fills: Warning icons on incomplete rows, "Save & Continue" still available
- Saving: Spinner

**Guardrails:**
- Budget: numeric only, min 0, max 999999
- Duration: integer, min 1, max 365
- If all rows have Boost off: Save shows "No posts boosted. Continue without media plan?"

---

**Step 5: Summary & Propose**

**Layout:** Full width. Header → Stats cards → Idea table → Calendar → Export + Confirm actions

**Header:**
"Content Plan Summary"  
Subtitle: "[Brand] · [Platform] · [Month Year] — Review before presenting to client"  
Context chips: [Brand] [Platform] [Month] [Campaign name if set] [total posts planned]

**Stats Cards (row of 3):**
- Total Ideas: count
- Average Score: number (orange/teal depending on value) — "Average of all PredictaPost scores"
- Media Using: "X/Y" — "No boosted content selected" if 0

**Idea Table:**

Columns: # / Idea (preview) / Type / Pillar / Score badge / Media Using / Media Objective / Post Date

- Post Date: "Not scheduled" if not placed on calendar. Click → opens date picker inline.
- Click row: expands to show full caption

**Calendar:**

Month view. Current month shown by default.

Post tiles on calendar:
- Shows: Idea name (short) + type + score badge
- Right-click / long press: context menu "Move to another date" / "Remove date"
- Drag to move between dates (desktop only)
- Click empty date: dropdown of unscheduled posts → assign to that date
- Pillar filter toggles below calendar: show/hide by pillar color

**Export + Confirm Actions (sticky bottom bar):**
- "Download PNG" — secondary button → exports calendar as PNG
- "Export to PPTX" — primary button → generates slide deck
- "Confirm Plan" — high-emphasis button → changes status to PROPOSED, triggers client notification

**Confirm Plan flow:**
1. Click "Confirm Plan"
2. Confirmation dialog: "Send this plan to [Brand] for review? The plan will be locked for editing. [Cancel] [Confirm & Send]"
3. On confirm: Status → PROPOSED, toast "Plan sent to client for review.", navigate to /plans/:id/feedback

**Post-confirm state:**
- "Confirm Plan" button replaced with "Sent for review on [date]" label
- All content fields become read-only
- "Edit Plan" button available → opens re-draft confirmation: "Re-opening this plan will mark it as Drafting again. The client will be notified. Continue?"

**Guardrails:**
- Unscheduled posts: Shows count "X ideas not yet scheduled" below calendar — informational only, does not block Confirm
- Export buttons available at all times (pre and post confirm)
- Plan with 0 scored ideas: "Confirm Plan" triggers warning "None of your ideas have been scored. Consider scoring before sending to client. [Score ideas →] [Continue anyway]"

---

### 6.3.3 Open Plan (Existing Plan)

**Layout:** Page header with status info + tab navigation + tab content

**Page Header (sticky):**
- Breadcrumb: Plans > [Brand] / [Platform] / [Month]
- Status badge (current status)
- Status description: Contextual sentence (see below)
- Primary action button (changes per status)
- Secondary action button

**Status descriptions:**
- BRIEF READY: "Brief is ready — start drafting your content ideas."
- DRAFTING: "[N] of [total] ideas drafted. Keep going."
- SCORED: "All ideas scored — ready to review and send to client."
- PROPOSED: "Sent to client on [date]. Waiting for their feedback."
- FEEDBACK PENDING: "Client gave feedback — [N] approved, [N] need revision."
- COMPLETE: "Plan complete. Export or archive."

**Status → Primary Action mapping:**

| Status | Primary Action | Secondary Action |
|---|---|---|
| BRIEF READY | "Start Drafting →" → Content tab | "Edit Brief" → Brief tab |
| DRAFTING | "Continue Drafting →" → Content tab | "View Brief" → Brief tab |
| SCORED | "Review & Send →" → Summary tab | "Edit Ideas" → Content tab |
| PROPOSED | "View Feedback →" → Feedback tab | "Download Summary" |
| FEEDBACK PENDING | "See Feedback →" → Feedback tab | "Re-draft if needed" → Content tab |
| COMPLETE | "Download Summary" | "Export PPTX" |

**Tabs:** Brief · Content · Media · Feedback · Summary

Tab content is the same as the corresponding wizard step, but editable (when status allows).

**Feedback Tab (unique to Open Plan):**

Displays all ideas sent to client. Per idea:
- Caption preview (full, scrollable)
- Post type · Pillar · PredictaPost score
- Status selector: Approved / Revised / Rejected (toggle chips)
- Text area: "Client note, reason, or requested change..."
- "Save Feedback" button per item

Media Plan Confirm section (below idea list):
- Shown only when plan is PROPOSED or later
- Table: Post / Boost checkbox / Objective / Budget / Duration / Actual Spend
- "Confirm Media Plan" button → locks media plan

"Save All Feedback" sticky button at bottom of page.

**Permission matrix per tab:**

| Tab | Internal (Admin/Team) | Client |
|---|---|---|
| Brief | Edit | Read-only |
| Content | Edit | Read-only |
| Media | Edit | Read-only |
| Feedback | Read-only | Edit |
| Summary | Edit (dates only) | Read-only |

---

## 6.4 Content Tools

### 6.4.0 Context Bar (Global across all tools)

Persistent bar at top of all Content Tools pages.

Displays:
- Brand chip (clickable → opens brand dropdown to change)
- Platform chip (clickable → opens platform dropdown)
- Industry chip (shown if No Brand is selected, clickable)
- Data health indicator: small dot + "Brand data: Good" or "Limited data"

Behavior:
- Inherits from sidebar Brand + Platform switcher on page load
- Changing context in bar: updates the bar only, does not change sidebar switcher
- Changing sidebar switcher: updates the bar
- Changes persist within current tool session

---

### 6.4.1 Content Tools Hub

**Layout:** Grid of 6 tool cards (2 rows × 3 columns)

**Per card:**
- Tool icon
- Tool name
- Description (max 10 words)
- Last used: "2 hours ago" / "Never used" / "Used [N] times this month"
- Badge: "Brand Brain" for tools that use brand data (Score, Rewrite, Generate, Hook)

**Card order:**
1. Score Caption (most-used, first)
2. Rewrite Caption
3. Idea Generator
4. Policy Check
5. Hook Scan
6. Evaluation Log

**Empty state:** (shouldn't occur but if no brand selected): "Select a brand in the top bar to get started."

---

### 6.4.2 Score Caption

**Job:** Evaluate caption quality using AI against brand context and platform rules.

**Layout:** Two-column. Left: Input form. Right: Results panel (hidden until first evaluation).

**Input Form Fields:**

1. Content Pillar — dropdown (optional): pulls from brand's historical pillars
2. Tone of Voice — chips (optional, single select): Professional / Casual & Friendly / Witty & Playful / Inspirational / Urgent & FOMO / Bold & Direct / Empathetic / Luxury & Premium
3. Image or VDO Mockup (optional):
   - Toggle: "Image Mockup" / "VDO Storyboard" / "Remove Visual Input"
   - Image Mockup: drag-drop or click zone, accepted PNG/JPG/WEBP
   - VDO Storyboard: drag-drop or click zone
4. Caption — text area (required). Placeholder: "Paste the caption you want to evaluate here..."
5. Content Objective — chips (optional): General / Maximize Comments / Maximize Shares / Maximize Saves / Maximize Reach / Drive Clicks

**"Evaluate Caption →" button:** Disabled until Caption field is non-empty.

**Results Panel States:**
- Hidden: Before first evaluation
- Loading: Skeleton of score circles + text blocks
- Scored: Full results displayed

**Results Panel Content:**

**Score Section:**
- Overall score: Large (--text-3xl), JetBrains Mono, color-coded by range
- Score label: "Weak" / "Average" / "Strong" / "Excellent"
- 5 dimension scores in a row, each with:
  - Dimension name (human-readable: "Opens Strong" / "Clear Message" / "Sounds Like the Brand" / "Drives Action" / "On Target")
  - Score number (monospace)
  - Score bar (thin, color-coded)

**Analysis Section:**
- "What's Working" — bullet list (max 3 points)
- "Needs Work" — bullet list (max 3 points)
- Summary paragraph (2–3 sentences, plain language)

**Suggestions Section:**
- Bulleted action items (max 5)
- Each is specific and actionable, not generic

**Improved Version:**
- Full rewritten caption
- "Copy improved version" button → copies to clipboard, button text changes to "Copied!" for 2s

**Quick Action Bar (below results):**
- "Rewrite this →" → navigates to Rewrite Caption, caption auto-filled
- "Check Policy →" → navigates to Policy Check, caption auto-filled
- "Scan Hook →" → navigates to Hook Scan, caption auto-filled
- "Save to Plan →" → opens plan selector dropdown → saves caption as idea in selected plan
- "Save to Log" → saves to Evaluation Log without attaching to plan

**Source chip:** If result came from auto-fill from another tool: shows "[From Hook Scan ×]" chip at top of form.

**States:**
- Form empty: Button disabled
- Caption filled: Button active
- Evaluating: Button shows spinner, right panel shows skeleton
- Scored (Weak/Average): Results + suggestion visible immediately without scrolling
- Saved to plan: "Saved to [Plan Name] ✓" chip below quick actions
- Error: "Evaluation failed. Please try again." toast + retry button

**Guardrails:**
- Caption max length: 3000 characters (with character count displayed)
- Image upload max size: 10MB
- VDO storyboard: images only, max 5 images
- "Save to Plan" shows only plans in BRIEF READY or DRAFTING status (not PROPOSED or COMPLETE)

---

### 6.4.3 Rewrite Caption

**Job:** Rewrite a caption in multiple tones. Returns N versions equal to the number of tones selected.

**Input Fields:**
1. Original Caption — text area (required). Placeholder: "Paste the original caption you want to rewrite here..."
2. Tone of Voice — chips (multi-select, required, min 1):
   Professional / Casual & Friendly / Witty & Playful / Inspirational / Urgent & FOMO / Bold & Direct / Empathetic / Luxury & Premium

**Button:** "Rewrite in [N] selected tones →" — disabled until caption filled + at least 1 tone selected.

**Result Cards:**

One card per selected tone, in selection order.

**Per card:**
- Tone label (e.g. "PROFESSIONAL") in accent color
- Rewritten caption (full text, not truncated)
- Hashtags (separate from caption body, displayed as chips)
- Actions: 
  - Thumbs up / Thumbs down (rating, saved to improve model)
  - "Copy" → copies caption to clipboard
  - "Score this →" → sends to Score Caption with auto-fill
  - "Use as base" → replaces Original Caption field with this version, resets results

**Card States:**
- Default: Standard card
- Thumbs up: Card gets subtle teal left border, thumbs-up icon fills
- Thumbs down: Card gets muted treatment
- Copied: "Copy" → "Copied!" for 2s

**Via Auto-fill State:**
If user arrives from Score Caption's "Rewrite this →" action:
- Caption pre-filled with the caption from Score Caption
- Chip shown: "[From Score Caption ×]" — click × to clear and enter own caption

**States:**
- No tone selected: Button disabled, tooltip "Select at least one tone"
- Loading: Skeleton cards in positions equal to number of selected tones
- Error: "Rewrite failed. Please try again."

**Guardrails:**
- Original caption max 3000 characters
- Maximum 4 tone selections (button becomes inactive after 4: "Maximum 4 tones selected")
- Results do not clear when user changes tone selections — only clears on new "Rewrite" action

---

### 6.4.4 Idea Generator

**Job:** Generate 3 on-brand content ideas from a trend or topic input.

**Input Fields:**
1. Brand — inherited from context bar (not shown as a separate field if context bar has brand set)
2. Platform — inherited from context bar
3. Trend / Topic — text input (required). Placeholder: "e.g. Songkran, premium launch, summer sale, limited offer..."

**Button:** "Generate Brand Ideas →" — disabled until trend filled.

**Result Cards (3, always):**

**Per card:**
- Idea headline (short, compelling title)
- Suggested post type badge
- Suggested pillar badge
- Caption draft (short, 1–3 sentences)
- Actions:
  - "Draft this →" → navigates to Score Caption, caption pre-filled with this idea's draft
  - "Save to Plan →" → plan selector → saves as idea card

**"Generate more" button:** Appears after first generation. Appends 3 new cards below existing cards, does not replace.

**"Clear all" button:** Appears after first generation. Confirmation: "Clear all generated ideas?" → resets to empty state.

**States:**
- No trend: Button disabled
- Loading: "Thinking with your brand data..." + 3 skeleton cards
- Results (3): Cards displayed
- Results (6+): Cards stack, scroll

**Guardrails:**
- Trend input max 200 characters
- Max 5 "Generate more" calls per session (15 ideas total) — then: "You've generated a lot of ideas. Try saving some before generating more."
- If No Brand selected: results are generic, shown with note "Brand Brain not applied. Results are broader and more generic."

---

### 6.4.5 Policy Check

**Job:** Verify a caption and/or image against platform advertising policies and brand guardrails.

**Input Fields:**
1. Brand or Industry — context bar (if No Brand: industry chips shown: Agriculture & Food / Automotive / Electronics & Tech / Healthcare & Medical / Tourism & Hospitality / Real Estate / Fashion & Retail / Finance & Banking / Insurance / Food & Beverage / Energy / Education / Media & Entertainment / Beauty & Personal Care / Sports & Fitness / Pets & Animals / Others)
2. Platform — context bar (required)
3. Check Type — toggle chips: Caption (default) / Image / Caption + Image
4. Caption Input — text area (shown when Caption or Caption + Image selected). Placeholder: "Paste the caption to be checked..."
5. Image Upload — drop zone (shown when Image or Caption + Image selected)

**Button:** "ตรวจสอบ Policy" — disabled until required fields for selected check type are filled.

**Result States:**

**Pass:**
```
[✓ ผ่าน] — green banner
"ไม่พบข้อขัดแย้งกับนโยบายที่กำหนด"
"ไม่พบข้อขัดแย้ง — caption นี้ผ่านการตรวจสอบทุกข้อ"
```

**Fail:**
```
[✗ ผิดกฎ] — red banner
"พบจุดที่ขัดกับกฎที่กำหนด [N] จุด"
```

Per violation card:
- [✗ ผิดกฎ] badge
- Problematic text: highlighted text from caption in a chip
- เหตุผล: plain language explanation
- แนะนำใช้แทน: specific actionable suggestion
- อ้างอิง: policy source URL or name
- "Fix this →" button → navigates to Rewrite Caption with caption pre-filled + context "Fix: [violation reason]"

**Inline highlight in caption preview:**
When checking caption, show the original caption with problematic phrases highlighted in red underline.

**"Check another" button:** Resets form but keeps brand/platform/check type selection.

**Guardrails:**
- Caption max 3000 characters
- Image max 10MB per upload
- Minimum: caption not empty (for caption check), image uploaded (for image check)
- Platform must be selected (cannot check without platform context)

---

### 6.4.6 Hook Scan

**Job:** Score the opening line or artwork headline and generate 3 alternative hook styles.

**Input Fields:**
1. Industry — context bar (recommended)
2. Input method — toggle: "Upload ภาพ AW" / "กรอก text เอง"
   - Upload path: drag-drop/click for JPG/PNG. After upload: AI extracts text from image, shows extracted text in editable confirmation field: "We read this text from your image. Confirm or edit:" → user confirms → proceed
   - Text path: text area for copy. Placeholder: "e.g. 'เย็นไว้ถึงใจ...ทุกครั้งที่กดเปิด'"
3. Context เพิ่มเติม (optional) — text input. Placeholder: "e.g. โพสต์ Facebook, product launch"

**Button:** "Scan Hook" — disabled until either image uploaded+confirmed or text entered.

**Result:**

**Hook Score:**
- Number (monospace, large)
- Label: Weak / Mixed / Strong
- Explanation paragraph: 2–3 sentences analyzing why this hook works or doesn't

**Hook Suggestions (3 styles):**

- CONCEDE OVERCOME — [suggestion text]
- REACTION FIRST — [suggestion text]
- CHALLENGE CLAIM — [suggestion text]

Per suggestion:
- Style label chip
- Hook text
- Thumbs up / Thumbs down
- "Copy" button
- "Use this →" → sends to Score Caption with the hook pre-populated at beginning of caption

**States:**
- Image processing: "Reading your artwork..." spinner
- Extracted text confirmation: editable field + "Looks right, continue" button + "Edit manually" button
- Loading scan: "Scanning your hook..."
- Results: Hook score + 3 alternatives
- Error: "Couldn't scan this image. Try entering the text manually."

**Guardrails:**
- Image must be JPG or PNG only
- Image max 10MB
- If AI cannot extract text from image: show error + fallback to text input automatically
- Text input max 500 characters (hooks should be short)

---

### 6.4.7 Evaluation Log

**Job:** History of all scored captions. Log actual results to calibrate AI.

**Layout:** Filter bar above table.

**Filter Options:**
- Brand (multi-select chips, Internal only — client sees own brand only)
- Platform (multi-select chips)
- Date range (date picker range)
- Status: All / Has KPI / No KPI yet

**Table Columns:**
- Brand + Platform chips
- Post Type + Pillar chips
- Caption preview (2 lines truncated, "Show full" expand)
- Overall Score badge
- Sub-scores: Hook / Clarity / Brand Voice / CTA / Relevance (small badges in a row)
- Date evaluated
- KPI status: "Add results" (orange, no KPI) / "Partial" (amber) / "Evaluated" (teal, full KPI)

**Row Actions:**
- Click row body → expand to show full caption + sub-score breakdown
- "View / Edit KPI" → inline expand with KPI form
- "Score again →" → navigates to Score Caption with caption pre-filled
- "Export Result" → PNG export of this evaluation
- "Delete" → confirmation → soft delete with undo toast

**Inline KPI Form (inline expand):**

Fields (all optional):
- Likes, Shares, Comments, Saves, Clicks, Views, AR%, Reach
- Layout: 4-column grid, 2 rows
- "Save KPI Actuals →" button

Behavior:
- Expands row in place, pushes rows below
- Focus hint: highlights the metrics most relevant to this post's original objective. Example: if Objective was "Maximize Comments" → Comments and Shares fields have subtle highlight + label "Key metric for this objective"
- After save: Row collapses, Status updates to "Evaluated" or "Partial", toast "Results saved. AI will recalibrate for [Brand]."

**Sorting Options:**
- Date evaluated (default, desc)
- Overall Score (highest first)
- Brand A-Z (Internal only)
- KPI logged (posts with KPI first)

**Empty state:** "No evaluations yet. Score a caption in Content Tools to start building your log."

**Guardrails:**
- All KPI fields: numeric only, no negatives
- Partial saves allowed (not all fields required)
- Deleted items go to soft-delete, recoverable within 30 days (admin only)

---

## 6.5 Brand Library

### 6.5.1 Overview

**Job:** Dashboard for a single brand's data health and configuration status.

**Tabs:** Data · Settings

**Layout:** Header with brand info → stats row → tabs

**Brand Header:**
- Brand initial avatar (large)
- Brand name
- Industry tag
- Data Health Score: gauge 0–100% + label (None 0–10% / Low 11–40% / Fair 41–69% / Good 70–89% / Excellent 90–100%)
- Data Health explanation: "Higher data health = more accurate AI predictions for this brand"

**Stats Row:**
- Total posts uploaded
- Date range: "Jan 2024 – Apr 2026" or "No data"
- Platforms covered: chips showing which platforms have data (✓ Facebook ✓ Instagram – TikTok)
- Last upload: relative time
- Config completeness: "Persona ✓ · Guardrails ✓ · Voice Examples –" (indicating which settings sections are filled)

**States:**
- No data (Empty): Health = 0%, callout: "Upload your brand's social data to unlock AI-powered features. → Upload Data"
- Low data (< 40%): Warning: "AI accuracy is limited with this amount of data. Upload more posts to improve predictions."
- Data present (≥ 40%): Normal display
- Loading: Skeleton

---

### 6.5.2 Data Tab — Upload Data

**Step 1: Select Platform**

- Platform chips: Facebook / Instagram / TikTok / Twitter/X / YouTube / LINE (single select)
- After selection: "Download template for [Platform]" link → downloads CSV template

**Step 2: Drop File**

- Drop zone: "Drop your CSV or JSON here, or browse files"
- Accepted: CSV, JSON
- After drop:
  - Validating... spinner
  - **Valid:** proceed to preview
  - **Invalid format:** "This file doesn't match the expected format for [Platform]. Check the column names and try again. [Download Template]"
  - **Empty file:** "This file appears to be empty."
  - **Too large (>50MB):** "File is too large. Split into smaller batches and upload separately."

**Step 3: Column Mapping (conditional)**

Shown only when column headers don't match expected format.

Layout: Two columns — "Your column" → "Panya expects"
- Required columns: highlighted with asterisk
- Optional columns: shown dimmed
- Dropdowns to map each column
- "Skip this column" option for optional fields
- If required column unmapped: "Save & Continue" disabled, tooltip "Map all required columns to continue"
- If required column mapped: proceed

**Step 4: Preview**

- Summary: "247 posts detected · Jan 2024 – Apr 2026"
- Preview table: first 10 rows
- Duplicate warning: "32 of your posts overlap with a previous upload. Duplicates will be skipped automatically."
- New posts count: "215 new posts will be added."
- Confirm: "Confirm Upload" + "Cancel"

**Step 5: Processing**

- Progress bar with percentage
- Status messages (sequential):
  1. "Normalizing [N] posts..."
  2. "Identifying patterns..."
  3. "Updating brand model..."
- Browser leave warning: "Upload in progress. Leaving will cancel the upload."

**Step 6: Success**

- "✓ Upload complete. 247 new posts added."
- Data Health Score: animated update to new value
- Links: "Upload another" + "View History"

---

### 6.5.3 Data Tab — Upload History

**Layout:** Filter bar → table

**Filter:** Platform chips (multi-select)

**Table columns:**
- Platform chip
- Upload date + time
- Posts count
- Date range of data ("Jan 2024 – Apr 2026")
- Uploaded by (email)
- Status: "Active" (current dataset) / "Archived"
- Actions: "Restore this version" / "Delete" (Admin only)

**Restore flow:**
1. Click "Restore this version"
2. Confirmation: "Restore [Platform] data to [date] snapshot? This will replace your current [Platform] data. Content scores based on current data may change. [Restore] [Cancel]"
3. On restore: Status updates, toast "Restored successfully."

**Delete flow:**
1. Confirmation: "Delete this snapshot? It will be permanently removed. Active data is not affected. [Delete] [Cancel]"
2. On delete: Row removed

**Empty state:** "No uploads yet for this brand."

**Sorting:**
- Upload date (default, desc)
- Platform
- Posts count (largest first)

---

### 6.5.4 Settings Tab — Persona

**Layout:** Full-width form, auto-save

**Auto-save behavior:**
- Saves 2 seconds after last keystroke (debounce)
- "Saving..." indicator appears top-right during save
- "Saved ✓" appears on completion
- On error: "Couldn't save. Check your connection and try again."

**Fields:**

1. Industry — chips grid (required for Regulatory to load):
Agriculture & Food / Automotive / Electronics & Tech / Healthcare & Medical / Tourism & Hospitality / Real Estate / Fashion & Retail / Finance & Banking / Insurance / Food & Beverage / Energy / Education / Media & Entertainment / Beauty & Personal Care / Sports & Fitness / Pets & Animals / Others

2. Tone of Voice — chips (multi-select):
Friendly / Professional / Playful / Authoritative / Inspirational

3. Brand Personality — text area. Placeholder: "Describe how this brand communicates. What does it stand for? How does it speak to its audience?" Max 2000 chars.

4. Key Messages — text area. Placeholder: "Core messages this brand always conveys. e.g. 'Innovation for a better life', 'Accessible luxury for everyone'." Max 1000 chars.

**Completeness indicator:**
"Persona: 3/4 fields filled. Complete all fields for the most accurate Brand Voice scores."

**Read-only mode** (for Team role): All fields dimmed, with banner: "Brand settings can only be edited by admins and client users." No save button visible.

---

### 6.5.5 Settings Tab — Guardrails

**Job:** Set rules that AI must follow when scoring and generating content.

**Layout:** Type selector + input row → list of existing guardrails

**Add guardrail:**
- Type dropdown: ห้าม / ต้องมี / ระวัง
- Text input: "Add a guardrail..."
- "+ เพิ่ม" button

**Type explanations (shown as help text below dropdown):**
- ห้าม: "AI will flag content containing this as a policy violation."
- ต้องมี: "AI will suggest adding this if content doesn't include it."
- ระวัง: "AI will warn when content approaches this territory."

**Existing guardrails list:**
- Per item: Type badge + text + edit (inline) + × remove
- Inline edit: click text to edit in-place, enter to save
- Remove: fades out + undo toast "Guardrail removed. Undo" (6s)

**Empty state:** "No guardrails yet. Add rules to guide AI behavior for this brand."

**Read-only mode:** Same as Persona.

**Guardrails for guardrails:**
- Text max 200 characters
- Max 50 guardrail items per brand
- Over limit: "+ เพิ่ม" disabled, tooltip "Maximum 50 guardrails reached. Remove some to add more."

---

### 6.5.6 Settings Tab — Regulatory

**Layout:** Read-only list of compliance rules.

**Purpose:** Displays built-in regulatory rules relevant to the brand's industry (set in Persona). These are system-managed, not user-editable.

**State — No industry set:**
"Set your industry in the Persona tab to load relevant regulations. → Go to Persona"

**State — Industry set:**
List of regulatory items. Per item:
- Rule name (bold)
- Summary (1 sentence)
- Source reference (small text, e.g. "พรบ.ยา พ.ศ. 2510 มาตรา 88")
- "Built-in" badge
- Expand: click to see full rule text

**All users can read.** No edit functionality.

---

### 6.5.7 Settings Tab — Voice Examples

**Job:** Provide good/bad caption examples to train AI's understanding of brand voice.

**Layout:** Two columns: "ตัวอย่างที่ดี" (left) + "ตัวอย่างที่ไม่ดี" (right)

**Per example card:**
- Label input (optional): "e.g. Songkran campaign, standard product post"
- Caption text area: "Paste an example caption..."
- Character count
- × remove button

**"+ เพิ่ม" button** at bottom of each column — adds new card.

**Impact note (shown above columns):**
"Voice examples directly influence Brand Voice scores. More examples = more accurate AI recognition of this brand's writing style."

**Remove:** Undo toast (6s) "Example removed. Undo"

**Empty state (per column):** "No examples yet. Add good/bad captions to help AI understand this brand's voice."

**Guardrails:**
- Caption max 3000 characters per example
- Max 20 examples per column (40 total)
- Label max 100 characters
- Read-only for Team role (same as Persona)

---

## 6.6 Insights

### 6.6.1 Insights Overview

**Layout:** Summary section → filter bar → brand table

**Summary Cards (2 rows):**

Row 1 (Core metrics):
- Brands with predictions (count)
- Total posts with results (count)
- Average prediction accuracy (%)

Row 2 (Context):
- Brands accessible (count)
- Average actual score (number)

**Filter Bar:**
- Platform: All / Facebook / Instagram / TikTok / Twitter/X / YouTube / LINE
- Accuracy: All / No results / Low / Fair / Good / Excellent
- Results logged: All / Has results / No results

**Brand Table:**

Essential columns (always visible):
- Brand name
- Platform badge
- Accuracy badge
- Results logged (count)
- Actions

Expandable columns (toggle via "Columns" button):
- Predicted (AVG)
- Actual Score (AVG)
- Weighted Engagement

**Accuracy badge states:**

| Badge | Color | Meaning | Row CTA |
|---|---|---|---|
| No results yet | Gray | No actual results logged | "Add results →" |
| Low 0–39% | Red | Poor predictions | "Upload more data →" |
| Fair 40–69% | Orange | Moderate accuracy | "Add more results →" |
| Good 70–89% | Amber | Good accuracy | "View details →" |
| Excellent 90%+ | Teal | Excellent accuracy | "View details →" |

**Callout (shown when no results exist at all):**
"You have [N] predictions but no actual results yet. Add results to see how accurate Panya's predictions are for your brands. It only takes a minute."

**Sorting:**
- Accuracy desc (default) — most accurate first
- Brand A-Z
- Results logged most first
- Last updated

**Internal vs Client:**
- Internal: All brands accessible to user
- Client: Table shows own brand with each platform as a separate row (Bonchon / Facebook, Bonchon / Instagram as separate rows)

---

### 6.6.2 Insights Brand Detail

**Navigation:** Breadcrumb "Insights > [Brand] / [Platform]" + "← Back to Insights" button

**Summary Cards (row of 4):**
- Total Posts Scored
- AVG Predicted Score
- AVG Actual Score
- Accuracy % + trend indicator: "↑ +12% over last 3 months" in teal, or "↓ -5%" in red
  - Below: sparkline chart (3 months, tiny, inline)

**Filter Bar:**
- Month (multi-select)
- Pillar (multi-select, from brand's pillars)
- Type (post type, multi-select)
- Status: All / Needs results / Partial / Evaluated

**Post Table:**

Essential columns:
- Post Idea (2-line truncated preview)
- Type + Pillar chips
- Month
- Predicted score visualization: horizontal bar + number (JetBrains Mono)
- Status

Expandable:
- Actual Score
- Weighted Engagement
- Match (✓ / ×)

**Predicted vs Actual visualization:**

When actual score exists, show stacked bars:
```
Predicted  ████████░░░░  70
Actual     █████░░░░░░░  50
```
Predicted bar: 60% opacity color
Actual bar: full color

**Status column values:**
- "Needs results" (orange) → row has "Add results" button
- "Partial" (amber) → row has "Edit results" button
- "Evaluated" (teal) → row has "View / Edit" button

**Inline KPI Form (same as Evaluation Log):**
- Expands row on "Add results" / "Edit results" click
- 8 fields (Likes, Shares, Comments, Saves, Clicks, Views, AR%, Reach)
- Optional fields — partial save allowed
- Relevant fields highlighted based on post's original objective
- "Save KPI Actuals →" + "Cancel"
- After save: Toast "Results saved. AI will recalibrate for [Brand] / [Platform]."

**Sorting:**
- Month (default, newest first)
- Predicted score (highest first)
- Actual score (highest first)
- Match % accuracy

---

## 6.7 Admin

### Layout

Full page with tab navigation at top.

**Tabs:** Users · Brands · Access · System

**Sidebar badge:** "Admin [N]" shows count of pending approval users.

---

### 6.7.1 Users Tab

**Pending Approval Section (shown only when pending > 0):**

Section header: "Waiting for approval ([N])"

Per pending user card:
- Email address
- Request date
- "Approve" button (teal) → approves, sends magic link, moves to active table with status "Invited"
- "Reject" button (destructive) → confirmation: "Reject this request? [email] won't receive access to Panya. [Reject] [Cancel]"

Note below section: "Approved users still need brand access assigned manually from the Access tab."

**All Users Table:**

Search: "Search by name or email" text input above table.

Columns:
- User (email + name if available)
- Role badge: Admin (amber) / Team (blue) / Client (purple)
- Brands (chips, max 3 shown + "+N" overflow)
- Created date
- Status: Active (teal dot) / Invited (amber dot) / Disabled (gray dot)
- Actions: Variable by status

**Actions per user:**
- Active (Team/Client): [Dropdown: Change role] + "Disable" + "Remove"
- Active (Admin): "Disable" only (cannot change admin role from UI — set in Supabase)
- Invited: "Resend Link" + "Remove"
- Disabled: "Enable" + "Remove"

**Remove confirmation:** "Remove [email]? They'll lose access to Panya immediately. This can't be undone."

**Disable confirmation:** No dialog — immediate with undo toast "Disabled [email]. Undo" (6s)

**Invite User Panel (slide-in from right, 400px):**

Trigger: "+ Invite user" button

Fields:
- Email (required) — text input, type="email"
- Role (required) — toggle: Team / Client
  - Team description (shown on hover/focus): "Can use all tools and access assigned brands."
  - Client description: "Has full tool access for their assigned brand only."
- Brand Access (optional) — multi-select searchable list of all active brands

Button: "Send magic link" — disabled until email valid + role selected
On success: Panel closes, toast "Invite sent to [email].", user appears in table with status "Invited"

**Duplicate email:** Inline error under email input "This user already has access."

**Sorting:**
- Created date (default, desc)
- Role
- Status (Active first)
- Email A-Z

---

### 6.7.2 Brands Tab

**Header:** "Brands" subtitle "Create brands, rename them, or archive them. Brands are never deleted."

Search: "Search brands" text input

**"+ Add brand" button** → inline form appears at top of table:
- Brand name input (required)
- Slug preview: "Slug: [auto-generated]" + editable
- "Create brand" + "Cancel"
- Duplicate slug: inline error "This slug is already taken."
- After create: New row appears in table, toast "Brand created. Go to Brand Library to configure it."

**Table columns:**
- Brand name
- Slug (dimmed text)
- Status: Active / Archived
- Users (count)
- Actions: "Go to Brand Library →" + "Rename" + "Archive" (or "Unarchive" if archived)

**Archive confirmation:** "Archive [Brand name]? It will be hidden from all users but no data will be deleted. You can restore it anytime."

**Rename:** Inline edit on click. Press Enter to save. Press Escape to cancel.

**Archived brands:** Shown in collapsed section "Archived brands ([N])" at bottom. Expand to see list.

**Sorting:** Brand name A-Z (default) / Users most first / Created date

---

### 6.7.3 Access Tab

**Summary Row:**
- Total Users: [N]
- Total Brands: [N]  
- Access Grants: [N]

**Search:** "Search users, email, or brand" — filters both users (rows) and brands (columns visible)

**View Toggle:** "Matrix View" / "List View" buttons, top right

**Matrix View (default when brands ≤ 8):**

Grid: Users as rows, brands as columns. Checkboxes at intersections.

- First column (User email) sticky
- Header row (brand names) sticky
- Scroll indicator on right if brands overflow: "→ [N] more brands"
- Checkbox: 44×44px click target
- Brand names in header: truncated at 12 chars, full name in tooltip
- Click checkbox: toggle access immediately, auto-save
  - Saving: checkbox shows spinner (small, inside checkbox area)
  - Saved: checkbox returns to normal (no toast — action too granular)
  - Error: checkbox reverts, inline error "Couldn't save access. Try again."

**List View (active when brands > 8 or user toggles):**

Each row: User email + role + brand chips + "+ Add brand" button
- Brand chip: click to remove access (undo toast 6s)
- "+ Add brand": dropdown of all brands → click to add access (saves immediately)

---

### 6.7.4 System Tab

**System Health Section:**

Header: "Daily System Health Check"
Sub: "Quick read on environment, database access, and Anthropic API availability."
"Refresh check" button (top right)

**Health status card:**
- Healthy: Green badge "All systems operational" + individual check items (all ✓)
- Degraded: Amber badge + failing item highlighted with description
- Failed: Red badge "Check failed" + specific error message (not just "Health check failed")

Specific error examples:
- "Database connection failed. Check your Supabase connection string."
- "Anthropic API unreachable. Check your API key and network."

**Anthropic API Usage Section:**

Header: "Anthropic API Usage"
Sub: "Token and cost estimates for Claude requests this month."
"Refresh" button

Summary cards (row of 4):
- API Calls This Month
- Total Tokens Used
- Cost USD (with sparkline of last 7 days below)
- Cost THB

**Unusual usage warning:** If today's usage is > 3× daily average: amber banner "Today's usage is unusually high ($[X] vs. $[Y] daily average). Check if an automated process is running unexpectedly."

**By Feature table:**
- Feature / Calls / Tokens Used / Cost
- Rows: score / ask / suggest / rewrite / policy / hook

**Last 7 Days table:**
- Date / Calls / Tokens / Cost

---

## 6.8 Ask Panya

### Layout

Split: Left panel 280px (conversation list) + Right main (active conversation)

### Left Panel — Conversation List

**Header:**
- "+ New conversation" button (full width, prominent)

**Conversation groups:** Today / Yesterday / Last 7 days / Older

**Per conversation item:**
- Auto-title (first question, max 45 chars truncated)
- Brand + Platform chips (tiny)
- Time ago

**Hover actions:**
- Pin → moves to "Pinned" section at top
- Rename → inline edit
- Delete → confirmation "Delete this conversation? This can't be undone."

**Pinned section:** Always at top, max 5 items. Pin icon visible on item.

**Empty state:** "No conversations yet."

**Loading:** Skeleton items

### Context Bar (top of conversation area)

Displays: [Brand chip ×] [Platform chip ×]

- Brand chip: click → dropdown to change brand context for this conversation
- Platform chip: click → dropdown to change platform
- Chips are independent of sidebar switcher — sidebar change updates bar, bar change does NOT update sidebar
- If no brand: "Select a brand" chip with amber outline + tooltip "Select a brand to get brand-specific answers"

**Data health indicator (small, inline):**
- "Brand data: Good" in teal (≥ 70% health)
- "Brand data: Limited" in amber (< 40% health) — with tooltip "Answers may be less specific with limited data"

### Conversation Area

**New conversation state (no messages):**

Center of conversation area:
- Large prompt: "What do you want to know about [Brand]?" (or "What do you want to know?" if no brand)
- Suggested questions (4 chips based on context — see Suggested Questions spec)

**Active conversation:**

Messages:
- User message: right-aligned, rounded bubble, --color-bg-elevated background
- AI message: left-aligned, no bubble background, full width
  - AI name + avatar initial shown above each AI response
  - Copy icon top-right of each AI message
  - Thumbs up / Thumbs down below each AI response
- Typing indicator: 3 dots animated while AI is generating

**AI message with citations:**
- Inline citation chips: "[Post #23 · Bonchon IG · Mar 2025]"
- Click citation → side drawer opens with post preview (caption + score + actual results)

**AI message with action links:**
Section below AI response: "Related actions"
- "View this post in Evaluation Log →"
- "Open [Plan name] →"
- "Score a similar caption →"

These links are generated by AI based on what it referenced, not hardcoded.

### Input Area (sticky bottom)

- Text area, multi-line. Placeholder: "Ask about your brand data, past performance, or content strategy..."
- Enter to send / Shift+Enter for new line
- "Send" button (icon, right of input)
- Character limit: 2000 characters, counter shown below input when > 1000

**Suggested questions (below input, shown in new conversation):**

4 chips based on context. Examples:
- Brand has data: "โพสแบบไหนทำ engagement ดีที่สุด?" / "Pillar ไหนได้ score สูงสุดเดือนที่แล้ว?"
- In plan context: "ไอเดียไหนน่าจะทำได้ดีที่สุด?" / "เปรียบ pillar mix กับเดือนก่อน"
- No brand data: "แนะนำ content pillar ทั่วไปสำหรับ [industry]"

Chips disappear after first message is sent in a conversation.

### States

| State | Display |
|---|---|
| New conversation, brand set, has data | Center prompt + 4 suggested questions |
| New conversation, no brand | Center prompt + brand selector chips + note "Select brand for brand-specific answers" |
| New conversation, brand set, no data | Center prompt + warning "Limited data — answers will be generic" |
| Conversation in progress | Message history + input |
| AI generating | Typing indicator + input disabled |
| Error from AI | "I couldn't find enough data to answer that. Try rephrasing, or upload more data for this brand." |
| Offline | "You appear to be offline. Reconnect to continue." |

### Internal vs Client

**Internal:**
- Brand chip in context bar allows changing to any accessible brand
- Can ask cross-brand questions: "Compare Bonchon and Haier engagement patterns"
- Can see conversations within their role scope

**Client:**
- Brand chip locked to own brand (shows brand name without click affordance)
- Cannot reference other brands in questions — if question mentions another brand, AI responds: "I can only answer questions about [Brand]. Try rephrasing."

---

# 7. Cross-cutting Guardrails

These rules apply globally across all pages and components.

## 7.1 Data & Scope Guardrails

- **Client brand isolation:** Client users must never see data from any brand other than their assigned brand. This must be enforced at the API layer, not just UI visibility.
- **Role-based access:** Admin-only pages (/admin/*) must return 403 for non-admin users — not just hide the navigation item.
- **Plan locking:** Once a plan is PROPOSED, content and brief fields become read-only for all users. Only "Re-open draft" (with confirmation) can reverse this.
- **Data deletion policy:** Brands are never hard-deleted. Plans are soft-deleted with 30-day recovery window. KPI results are never deletable by non-admin users.

## 7.2 AI & Scoring Guardrails

- **No brand = generic mode:** When no brand is selected or brand has no data, AI tools must clearly state "Operating in generic mode — results are not brand-specific."
- **Score is advisory:** Scores must never be labeled as pass/fail. They are indicators, not gates. Users can always proceed with low-scored content.
- **AI suggestions label:** All AI-generated text (suggestions, rewrites, generated ideas) must include a subtle "AI" indicator so users always know what is human vs machine.
- **Citation requirement:** AskPanya responses that reference specific data points must include source citations. Answers without citable data should state "Based on general best practices, not your brand data."

## 7.3 Form & Input Guardrails

- **Destructive confirmation pattern:** All destructive/irreversible actions require a confirmation step that includes the specific item name. Generic "Are you sure?" dialogs are not acceptable.
- **Auto-save rules:** Pages with auto-save (Brand Library Settings) must show save state at all times — "Saving...", "Saved [time]", or error. Never silent.
- **Required field behavior:** Required fields must not block submit with only visual color change. Always include a tooltip or inline message explaining what's needed.
- **Loading during submit:** Submit buttons must show spinner and become disabled during async operations. Never allow double-submit.

## 7.4 Navigation Guardrails

- **Unsaved changes protection:** Any page with unsaved form data must trigger "You have unsaved changes. Leave?" browser dialog on navigation away (except auto-saved pages).
- **Wizard back navigation:** In New Plan wizard, browser back button must trigger "Leave this plan?" dialog (not navigate away silently).
- **Deep links:** Needs Attention items and plan status CTAs must deep link to the exact section of the page — not just the page root. Use URL fragments or scroll-to behavior.
- **Breadcrumbs on detail pages:** Any page with a "back" navigation (Brand Detail in Insights, Plan Open) must have an in-page back button — not rely on browser back.

## 7.5 Empty State Guardrails

- Empty states must never be blank space.
- Every empty state must have: illustration/icon + heading + body + CTA.
- Empty states for feature unlock (e.g., "Upload data to enable AI scoring") must link directly to the required action.

## 7.6 Responsiveness Guardrails

- Minimum supported viewport: 1024px width (web app, not mobile)
- All tables must handle column overflow gracefully — no horizontal scroll without visual indicator
- All touch targets minimum 44×44px (for trackpad users on laptops)
- Slide-in panels must not cover more than 50% of the viewport on screens < 1200px

## 7.7 Performance Guardrails

- Any operation that takes > 300ms must show a loading state
- Any operation that takes > 2 seconds must show a progress indicator with context ("Processing 247 posts...")
- Skeleton screens must reflect the actual content layout — not generic rectangles
- File uploads must show real progress percentage, not a spinner

---

# 8. Accessibility Standards

Follow WCAG 2.1 AA as the baseline.

## 8.1 Color Contrast

- Normal text (< 18px or < 14px bold): minimum 4.5:1 contrast ratio
- Large text (≥ 18px or ≥ 14px bold): minimum 3:1
- UI components and states: minimum 3:1
- Never rely on color alone to convey meaning — always pair with icon, label, or pattern

## 8.2 Keyboard Navigation

- All interactive elements reachable via Tab key
- Tab order must follow visual reading order (top-left to bottom-right)
- Custom interactive elements (chips, toggle buttons): must have tabindex="0" and keyboard event handlers (Enter/Space to activate)
- Dropdown menus: Arrow keys to navigate options, Enter to select, Escape to close
- Modals: Focus trapped inside modal when open, returns to trigger on close
- Sidebar: All nav items keyboard-focusable

## 8.3 Focus States

All focusable elements must have a visible focus ring:
```
outline: 2px solid var(--color-accent-teal)
outline-offset: 2px
```

Focus rings must not be hidden or removed (`outline: none` is prohibited without an alternative focus indicator).

## 8.4 ARIA

- Status badges: `role="status"` or descriptive `aria-label`
- Progress bars: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Modals: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to modal title
- Toasts: `role="alert"` or `aria-live="polite"` for non-urgent
- Loading states: `aria-busy="true"` on the container, `aria-label="Loading..."` on spinners
- Skeleton screens: `aria-hidden="true"` (not meaningful to screen readers)
- Icon buttons: `aria-label="[action description]"` when button has no text

## 8.5 Semantic HTML

- Use `<nav>` for sidebar navigation
- Use `<main>` for primary content area
- Use `<table>`, `<thead>`, `<tbody>`, `<th scope="col/row">` for data tables
- Use `<button>` for actions, `<a>` for navigation
- Use appropriate heading hierarchy (h1 → h2 → h3, no skipping)
- Use `<label for="inputId">` explicitly linked to every form input

---

# 9. Error Handling

## 9.1 Error Categories

| Category | User Impact | Recovery |
|---|---|---|
| Validation error | Form cannot submit | Inline message, user corrects |
| Network error | Action failed | Retry button shown |
| AI error | Tool didn't respond | Retry + fallback message |
| Auth error | User not authorized | Redirect to sign-in |
| Server error (500) | Operation failed | Toast with retry |
| Not found (404) | Page doesn't exist | Friendly 404 with navigation |

## 9.2 Validation Errors

- Shown inline, immediately below the relevant field
- Never use alert() or modal for validation
- Icon: red circle × + error text in red
- Message: specific and actionable ("Email must include @" not "Invalid input")
- On submit attempt with errors: scroll to first error field, focus it

## 9.3 Network Errors

- Toast: "Connection issue. Your changes may not have saved. [Retry]"
- For uploads: "Upload failed. Check your connection and try again. [Retry]"
- Retry should re-attempt the exact same operation

## 9.4 AI Errors

Score Caption: "Evaluation failed. Please try again. If this persists, check your API settings in Admin."
Rewrite: "Rewrite failed. Please try again."
AskPanya: "Panya couldn't answer that question. Try rephrasing, or check if your brand has uploaded data."

All AI errors must show Retry button.

## 9.5 Authentication Errors

Expired magic link: Page showing "This link has expired. Request a new one. → Request new link"
Not authorized (403): Redirect to /dashboard with toast "You don't have access to that page."
Session expired: Redirect to /auth/signin with toast "Your session expired. Please sign in again."

## 9.6 Empty Results (not errors)

Treat separately from errors. Empty search results, filtered tables with no matches, etc.:
- Never show error styling
- Show: "No results match your filters. [Clear filters]" or "No [items] found for '[query]'."

---

# 10. Copy Guidelines

## 10.1 Voice & Tone

Panya's copy should feel like a **knowledgeable colleague** — not a chatbot, not a marketing department.

- Direct: "Save Monthly Brief" not "Click here to save your monthly brief"
- Specific: "Brief ready, waiting for content ideas" not "In progress"
- Human: "You're all caught up. Nice work." not "No pending items"
- Consequential: "Remove [email]? They'll lose access immediately." not "Are you sure?"

## 10.2 Action Labels

Always use verbs that describe the outcome, not the mechanism:

| ❌ Avoid | ✅ Use |
|---|---|
| View | Open |
| Click here | [Specific action] |
| Submit | Save / Send / Confirm |
| OK | Got it / Done |
| Error | Specific description |
| Process | Generating / Saving / Uploading |
| Resume | Continue drafting |

## 10.3 Time Formatting

- < 1 minute: "Just now"
- < 1 hour: "23 minutes ago"
- < 24 hours: "5 hours ago"
- < 7 days: "3 days ago"
- ≥ 7 days: "May 12" (no year if current year) / "May 12, 2025" (if different year)

## 10.4 Numbers

- Scores: Always show as integers. "54" not "54.0"
- Currency: "฿1,200" with comma separator for thousands
- Percentages: "67%" not "67.00%"
- Large numbers: "1,240 posts" not "1240 posts"

## 10.5 Empty States (Template)

```
[Icon]
[What is empty — noun phrase]
[What to do about it — one actionable sentence]
[CTA button → link to creation flow]
```

Example:
```
📋
No plans yet
Create your first monthly content plan to get started.
[+ New Plan]
```

## 10.6 Confirmation Dialog Copy (Template)

```
[Action] [Specific item name]?
[Consequence sentence]. [Reversibility sentence].
[Destructive button]   [Cancel]
```

Example:
```
Remove angkana@winter.co.th?
They'll lose access to all Panya features immediately. This can't be undone.
[Remove]   [Cancel]
```

## 10.7 Toast Messages

Success pattern: "[Item/action] [past tense result]."
- "Brief saved."
- "Invite sent to [email]."
- "Upload complete. 247 posts added."
- "Results saved. AI will recalibrate for Bonchon."

Undo pattern (6s): "[Action] [item]. [Undo button]"
- "Guardrail removed. Undo"
- "Access removed for Bonchon. Undo"

Error pattern: "[What failed]. [What to do]."
- "Couldn't save. Check your connection and try again."
- "Upload failed. The file may be too large (max 50MB)."

---

*End of PRD v1.0*

---

**Document notes:**
- This PRD covers the full redesign of Panya's web application
- Implementation should follow the two-track approach: Track A (structural UX improvements, same features) for immediate delivery, Track B (system improvements) for subsequent sprints
- Design tokens should be implemented as CSS custom properties before component development begins
- Accessibility testing should be integrated at component level, not as a final pass
