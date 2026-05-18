# IMPLEMENTATION FEEDBACK & FIXES
**For:** Panya Redesign v1.0  
**Status:** Ready for Claude Code revision  
**Format:** Structured for token-efficient prompting

---

## DASHBOARD

### Add Overall Summary Cards
- Create metric summary cards for each brand (when "all brands" selected) or single brand (when specific brand selected)
- Cards show key metrics: Brand Score, Active Plans, Total Ideas, Avg Score, Last Updated
- Position above "Needs Attention" section

### Layout Restructure
- Change from single column to **2-column layout**
- Left column (60%): "Needs Attention" + "Quick Actions" below it
- Right column (40%): "Overall Summary" cards + "Active Plans Grid"
- This reduces page length

---

## PLANS PAGE

### Action Buttons in Table
**Current state:** Some rows show "Open Plan" + "Log Feedback", others only "Open Plan"

**Fix:**
- All rows must show both buttons: "Open Plan" (secondary style) + "Log Feedback" (tertiary style)
- "Log Feedback" is disabled (grayed out) for plans NOT in PROPOSED status
- Only active when plan status = PROPOSED

### Step 1: Context (Dropdown Arrows)
- All 4 dropdowns (Brand, Platform, Month, Year) currently missing dropdown chevron icon
- Add chevron icon to all 4 dropdown fields

### Navigation Buttons
- Currently has "Back" button both at top AND bottom of form
- Remove bottom "Back" button
- Redesign bottom button layout to be symmetric and balanced

### Pillar Mix Input
**Current:** Simple text input for pillar name + number input for count

**Fix to:**
1. User clicks "+ Add Pillar" to add a new row
2. Each row has:
   - Pillar name dropdown: select from system-provided pillars OR type custom pillar name
   - Label showing "Pieces" or "Posts" (clarify what the number represents)
   - Number input for count
   - Delete (×) button
3. User can create custom pillars (not just select from list)
4. System should suggest historical pillars for this brand

### Content Ideas Step
**Current:** "Save all ideas" button always visible at bottom

**Fix:**
- If NO ideas have been scored yet: show "Score all ideas" button instead
- Once ANY idea is scored: replace with "Save ideas" button
- This guides user to score before saving

### Summary Step
**Current:** "Confirm Plan" button appears both inline and in bottom sticky bar

**Fix:**
- Remove inline "Confirm Plan" button (duplicate)
- Keep only the one in sticky bottom bar
- Move "Download PNG" and "Export PPTX" buttons to bottom bar next to "Confirm Plan"

### Open Plan Page
**Remove:**
- "Score Insights" section (redundant — already in Plan Summary tab)
- "Next Steps" section (redundant information)

---

## CONTENT TOOLS

### Overall Layout
**Current:** Different layouts per tool (inconsistent)

**Fix:** Standardize all tools with 3-column horizontal layout:
```
[Left: Tool Hub] | [Center: Configuration Panel] | [Right: Results]
```

- Left: Tool selector/hub
- Center: All input fields and controls
- Right: Empty state initially, populated after Score/Generate/etc action

### Results Empty State
- Before user takes action: show empty state in Results column
- After generating/scoring: populate Results column with output

### Add to Plan Feature
**Current:** Simple button "Save to Plan" → auto-assigns

**Fix:**
- Button opens dialog with 2 options:
  1. "Add to existing plan" (dropdown of DRAFTING/BRIEF_READY plans)
  2. "Create new plan" (form to create plan on the fly)
- User chooses, then idea is added accordingly

### Spacing Audit
- Review all spacing between sections, inputs, results
- Many areas feel cramped or inconsistent
- Apply DESIGN_BIBLE spacing scale (4px base, 8/16/24/32/48/64px gaps)

### Remove History
- History tab/section is not needed
- Remove completely

---

## BRAND LIBRARY

### Sidebar Navigation
**Current:** Brand Library listed separately in main nav

**Fix:**
- Move Brand Library to bottom of sidebar (same group as Admin sections)
- Should be grouped logically with settings/admin pages

---

## ASK PANYA

### Brand & Platform Selection
**Current:** Cannot select Brand and Platform before asking question

**Fix:**
- Allow user to set Brand and Platform context BEFORE typing question
- Option 1: Dropdown selector in context bar (before chat starts)
- Option 2: If no brand selected, show selector when user starts typing
- Once set, context inherits for all questions in conversation

---

## ADMIN

### Invite Member Flow
**Current:** Invite button opens panel but doesn't require form completion before send

**Fix:**
- Invite panel must have email field and Role selector
- "Send Magic Link" button disabled until:
  - Email is filled and valid format
  - Role is selected
- Only then can button be clicked

### Member Edit / Actions
**Current:** "Edit" button exists but no clear actions available

**Fix:** Add member edit panel with:
1. Change Role (Team/Client)
2. View/Edit Brand Access
3. Resend Invite Link (if Invited status)
4. **Remove Member button** (with confirmation dialog)

All member rows must have consistent action buttons.

### Remove Member Button
- Add "Remove" button to every member row
- Show confirmation: "Remove [email]? They will lose all access immediately."
- After remove: user appears in archived/inactive list or disappears

---

## SIGN IN / SIGN UP

### Logout Functionality
**Current:** No way to sign out

**Fix:**
- Add logout option in user menu (top right)
- Clicking logout clears auth token and redirects to /signin

### Sign In & Sign Up Pages
**Current:** Not implemented

**Fix:** Implement per DESIGN_BIBLE and PRD:
- Sign In page: Email input → magic link sent → user logs in
- Sign Up page: Email + Full Name → request access → admin approves
- Both pages styled per DESIGN_BIBLE white + typography system

---

## OVERALL DESIGN PASS

### Spacing & Typography Audit
- Review ALL pages against DESIGN_BIBLE.md
- Fix inconsistent spacing (should follow 4px scale)
- Verify typography hierarchy on every page
- Ensure all headings use correct `text-xl`, `text-2xl`, `text-3xl` sizes
- Check line heights match spec (1.6 for body, 1.2 for headings)

### Design System Compliance
- All colors must use CSS variables (not hardcoded hex)
- All spacing must use `--space-*` tokens
- All border radius must use `--radius-*` tokens
- All shadows must use `--shadow-*` tokens

### Visual Polish
- Check all hover states are smooth transitions (200ms)
- Verify all interactive elements have focus-visible states
- Ensure all cards have consistent styling and spacing
- Check alignment and grid consistency

---

## PRIORITY ORDER (for implementation)

**Phase 1 (Critical):**
1. Dashboard: 2-column layout + Overall Summary cards
2. Plans: Fix action buttons (both buttons all rows + disable state)
3. Admin: Add remove member + fix invite flow
4. Sign In/Out: Implement logout + auth pages

**Phase 2 (Important):**
1. Content Tools: Standardize layout (3-column)
2. Plans: Fix Pillar Mix UX (dropdown + custom)
3. Ask Panya: Brand/Platform selection
4. Brand Library: Reposition in nav

**Phase 3 (Polish):**
1. Plans: Button styling, spacing, dropdown arrows
2. Content Tools: Spacing audit + Add to Plan dialog
3. Overall: Design system pass (spacing, typography, colors)

---

## QUICK PROMPT FOR CLAUDE CODE

```
Fix the following feedback on Panya redesign:

PRIORITY 1:
- Dashboard: 2-column layout (left: Needs Attention + Quick Actions, right: Overall Summary cards + Active Plans)
- Plans table: Add "Log Feedback" button to all rows (secondary style, disabled if not PROPOSED)
- Admin: Add "Remove Member" button with confirmation, fix Invite flow (require email + role selection)

PRIORITY 2:
- Plans Step 1: Add dropdown chevron icons to all 4 dropdowns
- Plans Pillar Mix: Change to dropdown + custom pillar name + add/delete buttons
- Plans Content Ideas: Show "Score all" until first score, then "Save ideas"
- Plans Summary: Remove inline "Confirm Plan" button, move Downloads to bottom bar
- Content Tools: Standardize 3-column layout (Tool | Config | Results)

PRIORITY 3:
- Add logout functionality to user menu
- Ask Panya: Allow Brand/Platform selection before asking
- Spacing audit: Apply DESIGN_BIBLE 4px scale throughout
- Design system: Ensure all colors/spacing/radius use CSS variables

Do not start until you list all files to be modified and I approve.
```

---

*Ready to send to Claude Code*
