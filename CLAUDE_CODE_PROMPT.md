# CLAUDE CODE PROMPT — TOKEN OPTIMIZED

**Use this exact prompt when starting Claude Code revision session**

---

## PROMPT

```
Read FEEDBACK_FOR_REVISIONS.md and DESIGN_BIBLE.md.

PRIORITY 1 FIXES (must do first):

Dashboard:
- 2-column layout: left column has Needs Attention + Quick Actions, right column has Overall Summary cards + Active Plans
- Add metric summary cards for each brand (Brand Score, Active Plans count, AVG Score, Last Updated)

Plans Page:
- All table rows show both "Open Plan" (secondary) + "Log Feedback" (tertiary) buttons
- "Log Feedback" is disabled for non-PROPOSED plans
- Step 1: add dropdown chevron icons to Brand/Platform/Month/Year selectors
- Remove bottom "Back" button, keep top only

Admin:
- Add "Remove Member" button to every member row (with confirmation dialog)
- Invite member: require email + role selection before "Send Magic Link" activates
- Add logout button to user menu

PRIORITY 2 FIXES:

Plans:
- Pillar Mix: dropdown to select pillar + custom name input + number input + delete button per row
- Content Ideas: Show "Score all" button if no scores exist, change to "Save ideas" after first score
- Summary step: Remove inline "Confirm Plan" button, move "Download PNG" + "Export PPTX" to bottom bar

Content Tools:
- Standardize ALL tools to 3-column layout: [Tool Hub] | [Config Panel] | [Results]
- Results column empty state before action, populated after
- Add to Plan: dialog with "Add to existing" or "Create new" options

Ask Panya:
- Enable Brand + Platform selection before asking (dropdown or selector in context bar)

Brand Library:
- Move to bottom of sidebar (group with Admin sections)

PRIORITY 3 FIXES:

Sign In/Out:
- Implement logout functionality (clears token, redirects to /signin)
- Create Sign In page (email → magic link)
- Create Sign Up page (email + name → request access)

Spacing & Design:
- Audit all spacing against DESIGN_BIBLE 4px scale
- Verify typography hierarchy (text-lg, text-xl, text-2xl, text-3xl sizes)
- All colors use CSS variables (no hardcoded hex)
- All spacing uses --space-* tokens
- Check all hover transitions = 200ms ease

WORKFLOW:
1. First, list ALL component files you will touch — I will approve before you start
2. Work file by file
3. After each file: one-line summary of changes
4. Do not modify files outside the approved list

Wait for my approval on the file list before implementing.
```

---

## NOTES

- **Length:** ~280 words (short, direct, focused)
- **Structure:** Organized by PRIORITY so Claude stops after Phase 1 if you pause
- **No redundancy:** References feedback document (don't repeat details)
- **Clear boundaries:** "list files first" prevents scope creep
- **Measurable:** Each item is actionable, no vague language

---

## HOW TO USE

1. Ensure both files are in project root:
   - `FEEDBACK_FOR_REVISIONS.md`
   - `DESIGN_BIBLE.md`

2. Start Claude Code:
   ```bash
   cd your-project
   claude
   ```

3. Paste the PROMPT above

4. Claude responds with file list

5. You review and say "Approve" or adjust

6. Claude implements

---

## EXPECTED CLAUDE RESPONSE

Claude will ask for approval first:

```
I found these files that need changes:
- src/pages/Dashboard.jsx
- src/pages/Plans/List.jsx
- src/pages/Plans/Wizard/Step1.jsx
- src/pages/Plans/Wizard/Step2.jsx
- src/pages/Plans/Wizard/Step3.jsx
- src/pages/Plans/Wizard/Step5.jsx
- src/pages/Plans/OpenPlan.jsx
- src/components/Admin/InviteUser.jsx
- src/components/Admin/MembersList.jsx
... (full list)

Ready to start? Approve this list or suggest changes.
```

---

## IF YOU WANT FASTER ITERATION

Instead of doing all 3 phases at once, do:

**Session 1: PRIORITY 1 only**
```
(Same prompt but end with:)

Focus on PRIORITY 1 fixes only.
```

Then after Session 1 completes, start **Session 2: PRIORITY 2** separately.

This keeps token count per session lower and lets you review Phase 1 before proceeding.

---

*Optimized for Claude Code — ready to copy-paste*
