# Admin Settings Expansion + Brand Library Evaluation Log — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add net-new workspace settings tabs to `admin.html`, and add a per-brand Evaluation Log (with real-results logging + pin-to-sample learning loop) to `brand-library.html`.

**Architecture:** Static HTML prototype. New UI is added inline into the two existing pages, reusing their established CSS tokens (`ds.css` / `shared.css`) and patterns (tab switching, `.data-table`, `.brand-section`, drawer overlay, `toast.js`). Persistence is `localStorage`; "learning" is represented by UI affordances, not a real pipeline.

**Tech Stack:** Plain HTML/CSS/vanilla JS, `toast.js`, `localStorage`. No build step, no test framework.

**Canonical files:** repo root `C:\Winter\Panya\Panya\admin.html` and `...\brand-library.html`. The nested `Panya/` directory is an untracked duplicate — **do not edit it**.

**Verification model:** There is no test runner. Each task is verified by opening the page in the browser preview and confirming the described behavior (tab appears, panel renders, toast fires, value persists across reload). Use the preview tools (`preview_start`, `preview_snapshot`, `preview_click`, `preview_screenshot`).

---

## File Structure

| File | Responsibility | Change |
|------|----------------|--------|
| `admin.html` | Workspace settings tabs | Add 4 tab buttons + 4 panels + Roles panel + supporting JS/CSS |
| `brand-library.html` | Per-brand config + new Evaluation Log | Add CSS, one Evaluation Log section per brand panel, an "Add details" drawer, and JS for persistence/pin |

Both files are large single-page mockups; follow that existing convention (inline `<style>` + inline `<script>`).

---

## PART A — Admin settings expansion (`admin.html`)

The tab bar lives at `admin.html:284-290`. Tab panels follow at `admin.html:292+`. The `switchTab(name, el)` function is at `admin.html:704`. Add new tab buttons in order: **General** first (before Overview), then **Team & Roles** stays as "Team", and **AI & Content**, **Notifications**, **Audit Log** appended after Security.

Final tab order: General · Overview · Team · Billing · Integrations · Security · AI · Notifications · Audit.

### Task A1: Add the "General" tab

**Files:**
- Modify: `admin.html:284-290` (tab bar), `admin.html:292` (insert panel before Overview)

- [ ] **Step 1: Add the tab button**

In the `.tab-bar` (`admin.html:284`), add as the FIRST tab (before Overview):

```html
<div class="tab active" onclick="switchTab('general', this)">General</div>
```

And remove `active` from the existing Overview tab on line 285 (change `class="tab active"` → `class="tab"`).

- [ ] **Step 2: Add the panel**

Immediately after `<!-- Overview tab -->` opening area, insert this panel BEFORE the Overview panel (`admin.html:293`). Also remove `active` from the Overview panel (`id="tab-overview"`).

```html
<!-- General tab -->
<div class="tab-panel active" id="tab-general">
  <div class="section">
    <div class="section-head"><span class="section-title">Workspace</span></div>
    <div style="padding:var(--space-6)">
      <div style="margin-bottom:var(--space-5)">
        <label class="modal-label" for="gen-name">Workspace name</label>
        <input class="modal-input" id="gen-name" value="Panya">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-5)">
        <div>
          <label class="modal-label" for="gen-lang">Default language</label>
          <select class="modal-select" id="gen-lang">
            <option value="th">ไทย (Thai)</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label class="modal-label" for="gen-tz">Timezone</label>
          <select class="modal-select" id="gen-tz">
            <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div>
          <label class="modal-label" for="gen-cur">Currency</label>
          <select class="modal-select" id="gen-cur">
            <option value="THB">฿ THB</option>
            <option value="USD">$ USD</option>
          </select>
        </div>
        <div>
          <label class="modal-label" for="gen-date">Date format</label>
          <select class="modal-select" id="gen-date">
            <option value="dmy">31 May 2026</option>
            <option value="ymd">2026-05-31</option>
          </select>
        </div>
      </div>
      <button class="btn-sm primary" onclick="saveGeneral()">Save changes</button>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Add the save handler**

In the `<script>` block (after `switchTab`, near `admin.html:710`), add:

```javascript
function saveGeneral() {
  var data = {
    name: document.getElementById('gen-name').value,
    lang: document.getElementById('gen-lang').value,
    tz:   document.getElementById('gen-tz').value,
    cur:  document.getElementById('gen-cur').value,
    date: document.getElementById('gen-date').value
  };
  localStorage.setItem('panya_admin_general', JSON.stringify(data));
  window.toast('Workspace settings saved', 'success', 2500);
}
function loadGeneral() {
  var raw = localStorage.getItem('panya_admin_general');
  if (!raw) return;
  try {
    var d = JSON.parse(raw);
    if (d.name) document.getElementById('gen-name').value = d.name;
    if (d.lang) document.getElementById('gen-lang').value = d.lang;
    if (d.tz)   document.getElementById('gen-tz').value = d.tz;
    if (d.cur)  document.getElementById('gen-cur').value = d.cur;
    if (d.date) document.getElementById('gen-date').value = d.date;
  } catch (e) {}
}
document.addEventListener('DOMContentLoaded', loadGeneral);
```

- [ ] **Step 4: Verify in browser**

Start preview, open `admin.html`. Confirm: "General" is the first tab and is active on load; the form renders; change name to "Panya HQ", click Save → success toast; reload → value persists.

- [ ] **Step 5: Commit**

```bash
git add admin.html
git commit -m "feat(admin): add General workspace settings tab"
```

### Task A2: Add the "AI & Content" tab

**Files:**
- Modify: `admin.html` tab bar + append panel after Security panel (after `admin.html:653`)

- [ ] **Step 1: Add the tab button**

Append to `.tab-bar` after the Security tab (`admin.html:289`):

```html
<div class="tab" onclick="switchTab('ai', this)">AI &amp; Content</div>
```

- [ ] **Step 2: Add the panel**

After the Security panel closes (`</div><!-- tab-security end -->` around `admin.html:653`), insert:

```html
<!-- AI & Content tab -->
<div class="tab-panel" id="tab-ai">
  <div class="section">
    <div class="section-head"><span class="section-title">AI &amp; Content Defaults</span></div>
    <div style="padding:var(--space-6)">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-5)">
        <div>
          <label class="modal-label" for="ai-model">Default AI model</label>
          <select class="modal-select" id="ai-model">
            <option value="gpt-4o">OpenAI GPT-4o</option>
            <option value="gpt-4o-mini">GPT-4o mini</option>
          </select>
        </div>
        <div>
          <label class="modal-label" for="ai-lang">Default output language</label>
          <select class="modal-select" id="ai-lang">
            <option value="th">Thai-first</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label class="modal-label" for="ai-tone">Default tone</label>
          <select class="modal-select" id="ai-tone">
            <option>Playful</option><option>Professional</option><option>Bold</option>
          </select>
        </div>
        <div>
          <label class="modal-label" for="ai-cap">Max AI credits / user / month</label>
          <input class="modal-input" id="ai-cap" type="number" value="1000">
        </div>
      </div>
      <div style="margin-bottom:var(--space-5)">
        <label class="modal-label" for="ai-banned">Banned words / guardrails (comma-separated)</label>
        <input class="modal-input" id="ai-banned" placeholder="e.g. ถูกที่สุด, รับประกัน100%">
      </div>
      <label style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-5);font-size:var(--text-sm)">
        <input type="checkbox" id="ai-translate" checked> Auto-translate generated content
      </label>
      <button class="btn-sm primary" onclick="saveAI()">Save changes</button>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Add handler**

```javascript
function saveAI() {
  var data = {
    model: document.getElementById('ai-model').value,
    lang:  document.getElementById('ai-lang').value,
    tone:  document.getElementById('ai-tone').value,
    cap:   document.getElementById('ai-cap').value,
    banned:document.getElementById('ai-banned').value,
    translate: document.getElementById('ai-translate').checked
  };
  localStorage.setItem('panya_admin_ai', JSON.stringify(data));
  window.toast('AI & content defaults saved', 'success', 2500);
}
```

- [ ] **Step 4: Verify in browser** — click "AI & Content" tab, confirm panel renders, Save fires toast.

- [ ] **Step 5: Commit**

```bash
git add admin.html
git commit -m "feat(admin): add AI & Content defaults tab"
```

### Task A3: Add the "Notifications" tab

**Files:** Modify `admin.html` tab bar + append panel after AI panel.

- [ ] **Step 1: Add tab button** — append to `.tab-bar`:

```html
<div class="tab" onclick="switchTab('notifications', this)">Notifications</div>
```

- [ ] **Step 2: Add panel** — after the AI panel:

```html
<!-- Notifications tab -->
<div class="tab-panel" id="tab-notifications">
  <div class="section">
    <div class="section-head"><span class="section-title">Notification Preferences</span></div>
    <table class="data-table">
      <thead><tr><th>Event</th><th style="text-align:center">Email</th><th style="text-align:center">In-app</th></tr></thead>
      <tbody id="notif-body"></tbody>
    </table>
    <div style="padding:var(--space-4) var(--space-6)">
      <button class="btn-sm primary" onclick="saveNotif()">Save preferences</button>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Add render + save handlers**

```javascript
var NOTIF_EVENTS = [
  ['plan_approval', 'Plan approvals'],
  ['brief_submit',  'Brief submissions'],
  ['key_expiry',    'API key expiry warnings'],
  ['credit_threshold','AI credit threshold reached'],
  ['weekly_digest', 'Weekly digest'],
  ['member_joined', 'New member joined']
];
function renderNotif() {
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem('panya_admin_notif') || '{}'); } catch (e) {}
  var html = NOTIF_EVENTS.map(function(ev) {
    var key = ev[0], s = saved[key] || {};
    var em = s.email !== false ? 'checked' : '';
    var ia = s.inapp !== false ? 'checked' : '';
    return '<tr><td>' + ev[1] + '</td>' +
      '<td style="text-align:center"><input type="checkbox" data-ev="' + key + '" data-ch="email" ' + em + '></td>' +
      '<td style="text-align:center"><input type="checkbox" data-ev="' + key + '" data-ch="inapp" ' + ia + '></td></tr>';
  }).join('');
  document.getElementById('notif-body').innerHTML = html;
}
function saveNotif() {
  var data = {};
  document.querySelectorAll('#notif-body input[type=checkbox]').forEach(function(cb) {
    var ev = cb.getAttribute('data-ev'), ch = cb.getAttribute('data-ch');
    data[ev] = data[ev] || {};
    data[ev][ch] = cb.checked;
  });
  localStorage.setItem('panya_admin_notif', JSON.stringify(data));
  window.toast('Notification preferences saved', 'success', 2500);
}
document.addEventListener('DOMContentLoaded', renderNotif);
```

- [ ] **Step 4: Verify** — open Notifications tab, toggle a box, Save → toast; reload → toggle state persists.

- [ ] **Step 5: Commit**

```bash
git add admin.html
git commit -m "feat(admin): add Notifications preferences tab"
```

### Task A4: Add Roles panel to the Team tab

**Files:** Modify `admin.html` Team panel (`#tab-team`, ends ~`admin.html:461`).

- [ ] **Step 1: Rename the tab label** — at `admin.html:286` change `Team` to `Team &amp; Roles`.

- [ ] **Step 2: Add the Roles section** — inside `#tab-team`, after the members `.section` closes (before `</div><!-- tab-team -->` at `admin.html:461`):

```html
<div class="section">
  <div class="section-head"><span class="section-title">Roles &amp; Permissions</span></div>
  <table class="data-table">
    <thead><tr><th>Capability</th><th style="text-align:center">Admin</th><th style="text-align:center">Editor</th><th style="text-align:center">Viewer</th></tr></thead>
    <tbody>
      <tr><td>Create &amp; edit plans</td><td style="text-align:center"><input type="checkbox" checked disabled></td><td style="text-align:center"><input type="checkbox" checked></td><td style="text-align:center"><input type="checkbox"></td></tr>
      <tr><td>Edit brands</td><td style="text-align:center"><input type="checkbox" checked disabled></td><td style="text-align:center"><input type="checkbox" checked></td><td style="text-align:center"><input type="checkbox"></td></tr>
      <tr><td>Manage billing</td><td style="text-align:center"><input type="checkbox" checked disabled></td><td style="text-align:center"><input type="checkbox"></td><td style="text-align:center"><input type="checkbox"></td></tr>
      <tr><td>Invite members</td><td style="text-align:center"><input type="checkbox" checked disabled></td><td style="text-align:center"><input type="checkbox"></td><td style="text-align:center"><input type="checkbox"></td></tr>
      <tr><td>View insights</td><td style="text-align:center"><input type="checkbox" checked disabled></td><td style="text-align:center"><input type="checkbox" checked></td><td style="text-align:center"><input type="checkbox" checked></td></tr>
    </tbody>
  </table>
  <div style="padding:var(--space-4) var(--space-6)">
    <button class="btn-sm primary" onclick="window.toast('Role permissions saved','success',2500)">Save roles</button>
  </div>
</div>
```

- [ ] **Step 3: Verify** — open Team & Roles tab, confirm the matrix renders below the member table, Admin column checkboxes are disabled/checked, Save fires toast.

- [ ] **Step 4: Commit**

```bash
git add admin.html
git commit -m "feat(admin): add Roles & Permissions matrix to Team tab"
```

### Task A5: Add the "Audit Log" tab

**Files:** Modify `admin.html` tab bar + append panel after Notifications.

- [ ] **Step 1: Add tab button** — append to `.tab-bar`:

```html
<div class="tab" onclick="switchTab('audit', this)">Audit Log</div>
```

- [ ] **Step 2: Add panel** — after the Notifications panel:

```html
<!-- Audit Log tab -->
<div class="tab-panel" id="tab-audit">
  <div class="section">
    <div class="section-head">
      <span class="section-title">Audit Log</span>
      <div style="display:flex;gap:var(--space-2)">
        <select class="btn-sm" id="audit-member" onchange="filterAudit()">
          <option value="">All members</option>
          <option>Patiphan S.</option><option>Nattaya K.</option>
          <option>Wilasinee R.</option><option>Somchai P.</option>
        </select>
        <select class="btn-sm" id="audit-action" onchange="filterAudit()">
          <option value="">All actions</option>
          <option>plan</option><option>brand</option><option>member</option><option>billing</option>
        </select>
      </div>
    </div>
    <table class="data-table">
      <thead><tr><th>Time</th><th>Member</th><th>Action</th><th>Target</th></tr></thead>
      <tbody id="audit-body"></tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 3: Add seed data + filter**

```javascript
var AUDIT_ROWS = [
  ['Just now', 'System', 'billing', 'OpenAI key expiry warning (3 days)'],
  ['2 hours ago', 'Patiphan S.', 'plan', 'Created "Bonchon May 2026"'],
  ['Yesterday, 4:12 PM', 'Nattaya K.', 'plan', 'Submitted Haier Jun brief for review'],
  ['14 May, 11:30 AM', 'Patiphan S.', 'brand', 'Added MK Restaurant to Brand Library'],
  ['13 May, 3:00 PM', 'System', 'plan', 'Central Retail Apr plan marked complete'],
  ['12 May, 9:15 AM', 'Somchai P.', 'member', 'Joined workspace as Viewer'],
  ['10 May, 2:40 PM', 'Wilasinee R.', 'billing', 'Updated Pro plan payment method']
];
function renderAudit() {
  var m = document.getElementById('audit-member').value;
  var a = document.getElementById('audit-action').value;
  var html = AUDIT_ROWS.filter(function(r) {
    return (!m || r[1] === m) && (!a || r[2] === a);
  }).map(function(r) {
    return '<tr><td style="color:var(--text-muted);font-size:12px">' + r[0] + '</td>' +
      '<td>' + r[1] + '</td>' +
      '<td><span class="role-badge role-editor">' + r[2] + '</span></td>' +
      '<td style="font-size:13px">' + r[3] + '</td></tr>';
  }).join('');
  document.getElementById('audit-body').innerHTML = html || '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:var(--space-6)">No matching entries</td></tr>';
}
function filterAudit() { renderAudit(); }
document.addEventListener('DOMContentLoaded', renderAudit);
```

- [ ] **Step 4: Verify** — open Audit Log tab, confirm 7 rows render; select member "Nattaya K." → only her row; select action "plan" → plan rows; combined filter that matches nothing shows "No matching entries".

- [ ] **Step 5: Commit**

```bash
git add admin.html
git commit -m "feat(admin): add filterable Audit Log tab"
```

---

## PART B — Brand Library Evaluation Log (`brand-library.html`)

The brand panels are `#panel-bonchon` (`brand-library.html:429`), `#panel-haier` (538), `#panel-central`, `#panel-mk`. Each has a Sample Captions section near its end. The Evaluation Log section goes AFTER Sample Captions in each panel. An existing drawer overlay is at `brand-library.html:873` (`#brand-drawer`) — the new "Add details" drawer is a separate, simpler overlay.

### Task B1: Add Evaluation Log CSS

**Files:** Modify `brand-library.html` `<style>` block (after the `.caption-sample`/`.score-pill` rules, ~`brand-library.html:173`).

- [ ] **Step 1: Insert styles**

```css
/* ── Evaluation Log ─────────────────────────────── */
.eval-entry {
  background: var(--bg-surface); border: 1px solid var(--border-default);
  border-radius: var(--r-lg); padding: var(--space-4) var(--space-5);
  margin-bottom: var(--space-3); box-shadow: var(--shadow-xs);
}
.eval-entry-head { display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3); }
.eval-chips { display: flex; gap: var(--space-2); }
.eval-date { margin-left: auto; font-size: var(--text-xs); color: var(--text-muted); }
.eval-scores { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-3); }
.eval-overall { font-family: var(--font-mono); font-size: var(--text-2xl); font-weight: 700; color: var(--brand); }
.eval-sub { display: flex; gap: var(--space-3); }
.eval-sub-item { text-align: center; }
.eval-sub-val { font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 700; color: var(--text-primary); }
.eval-sub-lbl { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.eval-caption { font-size: var(--text-sm); color: var(--text-secondary); line-height: var(--leading-relaxed); margin-bottom: var(--space-3); }
.eval-actions { display: flex; gap: var(--space-2); align-items: center; }
.eval-results-badge { font-size: var(--text-xs); font-weight: 600; color: var(--green); background: var(--green-m); padding: 2px var(--space-2); border-radius: var(--r-full); }
.eval-delta { font-size: var(--text-xs); color: var(--text-muted); margin-left: var(--space-2); }
/* Add-details drawer (reuses .modal-* lookalike) */
.eval-drawer-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 300; align-items: center; justify-content: center; }
.eval-drawer-overlay.open { display: flex; }
.eval-drawer-box { background: var(--bg-base); border-radius: var(--r-xl); box-shadow: var(--shadow-xl); width: 460px; max-width: calc(100vw - 32px); overflow: hidden; }
.eval-drawer-head { display: flex; align-items: center; justify-content: space-between; padding: var(--space-5) var(--space-6); border-bottom: 1px solid var(--border-subtle); }
.eval-drawer-head h3 { font-size: var(--text-lg); font-weight: 700; }
.eval-drawer-body { padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); }
.eval-metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
.eval-verdict-row { display: flex; gap: var(--space-2); }
.eval-verdict-btn { flex: 1; padding: 8px; border: 1.5px solid var(--border-default); border-radius: var(--r-md); background: var(--bg-base); cursor: pointer; font-size: var(--text-sm); font-family: var(--font-ui); }
.eval-verdict-btn.active { border-color: var(--brand); background: var(--brand-m); color: var(--brand); font-weight: 600; }
.eval-drawer-foot { display: flex; justify-content: flex-end; gap: var(--space-3); padding: var(--space-4) var(--space-6); border-top: 1px solid var(--border-subtle); }
```

- [ ] **Step 2: Verify** — reload `brand-library.html`; no visual change yet, but confirm no console errors (`preview_console_logs`).

- [ ] **Step 3: Commit**

```bash
git add brand-library.html
git commit -m "feat(brand-library): add Evaluation Log styles"
```

### Task B2: Add the Evaluation Log section to the Bonchon panel (seeded entries)

**Files:** Modify `brand-library.html` — insert after Bonchon's Sample Captions section closes (`brand-library.html:534`, before `</div><!-- /panel-bonchon -->`).

- [ ] **Step 1: Insert the section**

```html
<div class="brand-section">
  <div class="brand-section-title">Evaluation Log</div>
  <div id="evallog-bonchon">
    <!-- entry 1 -->
    <div class="eval-entry" data-brand="bonchon" data-id="bc1">
      <div class="eval-entry-head">
        <div class="eval-chips"><span class="chip">Facebook</span><span class="chip">Promotion</span></div>
        <span class="eval-date">15 Jan 2025</span>
      </div>
      <div class="eval-scores">
        <div class="eval-overall">67</div>
        <div class="eval-sub">
          <div class="eval-sub-item"><div class="eval-sub-val">67</div><div class="eval-sub-lbl">Hook</div></div>
          <div class="eval-sub-item"><div class="eval-sub-val">70</div><div class="eval-sub-lbl">Brand</div></div>
          <div class="eval-sub-item"><div class="eval-sub-val">72</div><div class="eval-sub-lbl">CTA</div></div>
          <div class="eval-sub-item"><div class="eval-sub-val">63</div><div class="eval-sub-lbl">Platform</div></div>
          <div class="eval-sub-item"><div class="eval-sub-val">60</div><div class="eval-sub-lbl">Clarity</div></div>
        </div>
      </div>
      <div class="eval-caption">ดื่มฉลองส่งท้ายปีกับ Tiger 100 Rally Pro แบบจัดเต็ม — กรอบทุกคำ อร่อยทุกกัด 🍗🔥 #Bonchon #CrispyWings</div>
      <div class="eval-actions" data-results="">
        <button class="btn btn-sm btn-secondary" onclick="openEvalDetails('bonchon','bc1')">+ Add details</button>
        <button class="btn btn-sm btn-ghost" onclick="toast('Result exported.','success')">Export Result</button>
      </div>
    </div>
    <!-- entry 2 -->
    <div class="eval-entry" data-brand="bonchon" data-id="bc2">
      <div class="eval-entry-head">
        <div class="eval-chips"><span class="chip">Instagram</span><span class="chip">Entertainment</span></div>
        <span class="eval-date">8 Jan 2025</span>
      </div>
      <div class="eval-scores">
        <div class="eval-overall">84</div>
        <div class="eval-sub">
          <div class="eval-sub-item"><div class="eval-sub-val">88</div><div class="eval-sub-lbl">Hook</div></div>
          <div class="eval-sub-item"><div class="eval-sub-val">85</div><div class="eval-sub-lbl">Brand</div></div>
          <div class="eval-sub-item"><div class="eval-sub-val">82</div><div class="eval-sub-lbl">CTA</div></div>
          <div class="eval-sub-item"><div class="eval-sub-val">83</div><div class="eval-sub-lbl">Platform</div></div>
          <div class="eval-sub-item"><div class="eval-sub-val">80</div><div class="eval-sub-lbl">Clarity</div></div>
        </div>
      </div>
      <div class="eval-caption">กรอบทุกคำ อร่อยทุกกัด 🍗🔥 Bonchon Wings วันนี้ที่สาขาใกล้บ้านคุณ #Bonchon #CrispyWings</div>
      <div class="eval-actions" data-results="">
        <button class="btn btn-sm btn-secondary" onclick="openEvalDetails('bonchon','bc2')">+ Add details</button>
        <button class="btn btn-sm btn-ghost" onclick="toast('Result exported.','success')">Export Result</button>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Verify** — open `brand-library.html`, Bonchon panel; confirm the Evaluation Log section renders two entries with scores below Sample Captions.

- [ ] **Step 3: Commit**

```bash
git add brand-library.html
git commit -m "feat(brand-library): add seeded Evaluation Log section to Bonchon"
```

### Task B3: Add the "Add details" drawer + persistence JS

**Files:** Modify `brand-library.html` — add the drawer overlay markup just before `</body>`, and JS in the inline `<script>`.

- [ ] **Step 1: Add the drawer markup** (before `</body>`):

```html
<div class="eval-drawer-overlay" id="eval-drawer" onclick="if(event.target===this)closeEvalDetails()">
  <div class="eval-drawer-box">
    <div class="eval-drawer-head">
      <h3>Add published results</h3>
      <button class="modal-close" onclick="closeEvalDetails()">×</button>
    </div>
    <div class="eval-drawer-body">
      <div class="eval-metric-grid">
        <div><label class="modal-label">Reach</label><input class="modal-input" id="ev-reach" type="number" placeholder="0"></div>
        <div><label class="modal-label">Likes</label><input class="modal-input" id="ev-likes" type="number" placeholder="0"></div>
        <div><label class="modal-label">Comments</label><input class="modal-input" id="ev-comments" type="number" placeholder="0"></div>
        <div><label class="modal-label">Shares</label><input class="modal-input" id="ev-shares" type="number" placeholder="0"></div>
        <div><label class="modal-label">Engagement rate %</label><input class="modal-input" id="ev-er" type="number" placeholder="0"></div>
      </div>
      <div>
        <label class="modal-label">Verdict</label>
        <div class="eval-verdict-row" id="ev-verdict">
          <button class="eval-verdict-btn" data-v="win" onclick="selectVerdict(this)">🏆 Win</button>
          <button class="eval-verdict-btn" data-v="neutral" onclick="selectVerdict(this)">⚪ Neutral</button>
          <button class="eval-verdict-btn" data-v="under" onclick="selectVerdict(this)">⚠️ Under</button>
        </div>
      </div>
      <div>
        <label class="modal-label">Why did it work / flop?</label>
        <textarea class="drawer-textarea" id="ev-note" placeholder="e.g. promo timing nailed it"></textarea>
      </div>
    </div>
    <div class="eval-drawer-foot">
      <button class="btn btn-sm btn-ghost" onclick="closeEvalDetails()">Cancel</button>
      <button class="btn btn-sm btn-primary" onclick="saveEvalDetails()">Save results</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add the JS** (in the inline `<script>`):

```javascript
var _evalCtx = { brand: null, id: null, verdict: null };
function openEvalDetails(brand, id) {
  _evalCtx = { brand: brand, id: id, verdict: null };
  ['ev-reach','ev-likes','ev-comments','ev-shares','ev-er','ev-note'].forEach(function(f){ document.getElementById(f).value=''; });
  document.querySelectorAll('#ev-verdict .eval-verdict-btn').forEach(function(b){ b.classList.remove('active'); });
  var saved = getEvalResults(brand, id);
  if (saved) {
    document.getElementById('ev-reach').value = saved.reach || '';
    document.getElementById('ev-likes').value = saved.likes || '';
    document.getElementById('ev-comments').value = saved.comments || '';
    document.getElementById('ev-shares').value = saved.shares || '';
    document.getElementById('ev-er').value = saved.er || '';
    document.getElementById('ev-note').value = saved.note || '';
    if (saved.verdict) {
      _evalCtx.verdict = saved.verdict;
      var btn = document.querySelector('#ev-verdict .eval-verdict-btn[data-v="' + saved.verdict + '"]');
      if (btn) btn.classList.add('active');
    }
  }
  document.getElementById('eval-drawer').classList.add('open');
}
function closeEvalDetails() { document.getElementById('eval-drawer').classList.remove('open'); }
function selectVerdict(btn) {
  document.querySelectorAll('#ev-verdict .eval-verdict-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  _evalCtx.verdict = btn.getAttribute('data-v');
}
function evalKey(brand) { return 'panya_eval_results_' + brand; }
function getEvalResults(brand, id) {
  try { return (JSON.parse(localStorage.getItem(evalKey(brand)) || '{}'))[id] || null; } catch (e) { return null; }
}
function saveEvalDetails() {
  var brand = _evalCtx.brand, id = _evalCtx.id;
  var all = {};
  try { all = JSON.parse(localStorage.getItem(evalKey(brand)) || '{}'); } catch (e) {}
  all[id] = {
    reach: document.getElementById('ev-reach').value,
    likes: document.getElementById('ev-likes').value,
    comments: document.getElementById('ev-comments').value,
    shares: document.getElementById('ev-shares').value,
    er: document.getElementById('ev-er').value,
    note: document.getElementById('ev-note').value,
    verdict: _evalCtx.verdict
  };
  localStorage.setItem(evalKey(brand), JSON.stringify(all));
  decorateEvalEntry(brand, id, all[id]);
  closeEvalDetails();
  toast('Results saved', 'success');
}
function decorateEvalEntry(brand, id, res) {
  var entry = document.querySelector('.eval-entry[data-brand="' + brand + '"][data-id="' + id + '"]');
  if (!entry) return;
  var actions = entry.querySelector('.eval-actions');
  actions.setAttribute('data-results', '1');
  var existing = actions.querySelector('.eval-results-badge');
  if (existing) existing.parentNode.removeChild(existing.nextSibling && existing.nextSibling.classList && existing.nextSibling.classList.contains('eval-delta') ? existing.nextSibling : existing);
  // rebuild trailing badge + delta + pin
  actions.querySelectorAll('.eval-results-badge, .eval-delta, .eval-pin').forEach(function(n){ n.remove(); });
  var badge = document.createElement('span');
  badge.className = 'eval-results-badge';
  badge.textContent = 'Results added ✓';
  actions.appendChild(badge);
  var delta = document.createElement('span');
  delta.className = 'eval-delta';
  var er = parseFloat(res.er || '0');
  delta.textContent = 'Real ER: ' + (res.er || '0') + '% · ' + (er >= 8 ? 'High' : er >= 4 ? 'Mid' : 'Low');
  actions.appendChild(delta);
  if (res.verdict === 'win') {
    var pin = document.createElement('button');
    pin.className = 'btn btn-sm btn-ghost eval-pin';
    pin.textContent = '📌 Pin as Sample';
    pin.onclick = function() { pinAsSample(brand, id); };
    actions.appendChild(pin);
  }
}
```

- [ ] **Step 3: Verify** — Bonchon panel, click "+ Add details" on entry bc1, fill reach 5000 / ER 9, choose 🏆 Win, note "great timing", Save → drawer closes, toast fires, entry now shows "Results added ✓", "Real ER: 9% · High", and a "📌 Pin as Sample" button. Reload → reopen drawer for bc1 shows saved values.

- [ ] **Step 4: Commit**

```bash
git add brand-library.html
git commit -m "feat(brand-library): add Add-details drawer + results persistence"
```

### Task B4: "Pin as Sample" → promote winner into Sample Captions + restore on load

**Files:** Modify `brand-library.html` inline `<script>`.

- [ ] **Step 1: Add pin + restore-on-load JS**

```javascript
function pinAsSample(brand, id) {
  var entry = document.querySelector('.eval-entry[data-brand="' + brand + '"][data-id="' + id + '"]');
  if (!entry) return;
  var caption = entry.querySelector('.eval-caption').textContent;
  var platform = entry.querySelector('.eval-chips .chip').textContent;
  var res = getEvalResults(brand, id) || {};
  // Find the Sample Captions section in this brand's panel
  var panel = entry.closest('.brand-detail-panel');
  var sampleSection = null;
  panel.querySelectorAll('.brand-section-title').forEach(function(t) {
    if (t.textContent.trim() === 'Sample Captions') sampleSection = t.parentNode;
  });
  if (!sampleSection) return;
  var div = document.createElement('div');
  div.className = 'caption-sample';
  div.innerHTML = caption +
    '<div class="caption-meta"><span class="chip">' + platform + '</span>' +
    '<span class="score-pill ex">Real: ' + (res.er || '0') + '% ER</span></div>';
  sampleSection.appendChild(div);
  toast('Pinned to Sample Captions', 'success');
}
// Restore result decorations on page load
function restoreEvalResults() {
  document.querySelectorAll('.eval-entry').forEach(function(entry) {
    var brand = entry.getAttribute('data-brand'), id = entry.getAttribute('data-id');
    var res = getEvalResults(brand, id);
    if (res) decorateEvalEntry(brand, id, res);
  });
}
document.addEventListener('DOMContentLoaded', restoreEvalResults);
```

- [ ] **Step 2: Verify** — with bc1 marked Win (from B3), click "📌 Pin as Sample" → a new caption card appears in the Sample Captions section above, tagged "Real: 9% ER", toast fires. Reload the page → bc1 still shows "Results added ✓" badge (restore works).

- [ ] **Step 3: Commit**

```bash
git add brand-library.html
git commit -m "feat(brand-library): pin winning post to Sample Captions + restore on load"
```

### Task B5: Replicate the Evaluation Log section to the other three brands

**Files:** Modify `brand-library.html` — Haier (`#panel-haier`), Central (`#panel-central`), MK (`#panel-mk`) panels.

- [ ] **Step 1: Add a section to each remaining panel**, after each panel's Sample Captions section. Use the same markup as Task B2 Step 1, changing `data-brand` and `data-id` prefixes and ids, the container id, and the seed content per brand:
  - Haier: container `id="evallog-haier"`, `data-brand="haier"`, ids `ha1`/`ha2`, captions about Haier appliances, platform chips Facebook/Instagram.
  - Central: container `id="evallog-central"`, `data-brand="central"`, ids `ce1`/`ce2`.
  - MK: container `id="evallog-mk"`, `data-brand="mk"`, ids `mk1`/`mk2`.

  Each entry must keep the same structure: `.eval-entry-head` (chips + date), `.eval-scores` (`.eval-overall` + five `.eval-sub-item` Hook/Brand/CTA/Platform/Clarity), `.eval-caption`, and `.eval-actions` with `onclick="openEvalDetails('<brand>','<id>')"` and the Export button. Example Haier entry 1:

```html
<div class="eval-entry" data-brand="haier" data-id="ha1">
  <div class="eval-entry-head">
    <div class="eval-chips"><span class="chip">Facebook</span><span class="chip">Product</span></div>
    <span class="eval-date">12 Jan 2025</span>
  </div>
  <div class="eval-scores">
    <div class="eval-overall">59</div>
    <div class="eval-sub">
      <div class="eval-sub-item"><div class="eval-sub-val">55</div><div class="eval-sub-lbl">Hook</div></div>
      <div class="eval-sub-item"><div class="eval-sub-val">62</div><div class="eval-sub-lbl">Brand</div></div>
      <div class="eval-sub-item"><div class="eval-sub-val">61</div><div class="eval-sub-lbl">CTA</div></div>
      <div class="eval-sub-item"><div class="eval-sub-val">58</div><div class="eval-sub-lbl">Platform</div></div>
      <div class="eval-sub-item"><div class="eval-sub-val">60</div><div class="eval-sub-lbl">Clarity</div></div>
    </div>
  </div>
  <div class="eval-caption">แอร์ Haier ประหยัดไฟเบอร์ 5 เย็นเร็วทันใจ รับหน้าร้อนนี้ ❄️ #Haier #ประหยัดไฟ</div>
  <div class="eval-actions" data-results="">
    <button class="btn btn-sm btn-secondary" onclick="openEvalDetails('haier','ha1')">+ Add details</button>
    <button class="btn btn-sm btn-ghost" onclick="toast('Result exported.','success')">Export Result</button>
  </div>
</div>
```

  Add a second entry (`ha2`, different date/scores/caption) using the same structure. Repeat the whole pattern for Central (`ce1`,`ce2`) and MK (`mk1`,`mk2`).

- [ ] **Step 2: Verify** — switch through Haier, Central, MK in the brand list; each shows its Evaluation Log with two entries; "+ Add details" opens the drawer scoped to that brand+id; saving on Haier ha1 does not affect Bonchon entries.

- [ ] **Step 3: Commit**

```bash
git add brand-library.html
git commit -m "feat(brand-library): add Evaluation Log to Haier, Central, MK panels"
```

---

## Self-Review notes (spec coverage)

- Spec §5 (Admin): General ✓ A1, AI ✓ A2, Notifications ✓ A3, Roles ✓ A4, Audit Log ✓ A5. Overview/Billing/Integrations/Security unchanged ✓.
- Spec §6 (Eval Log): placement after Sample Captions ✓ B2/B5; entry card with overall + 5 sub-scores ✓ B2; Add details drawer with metrics + verdict + note ✓ B3; persistence ✓ B3; predicted-vs-actual delta + "Results added" badge ✓ B3; Pin → Sample Captions ✓ B4; restore on load ✓ B4.
- Spec §7 persistence keys: General `panya_admin_general`, AI `panya_admin_ai`, Notifications `panya_admin_notif`, eval results `panya_eval_results_<brand>`. (Spec named `panya_admin_settings` / `panya_eval_log_<brand>` generically; the plan uses these concrete per-area keys — equivalent and clearer.)
- Function name consistency: `openEvalDetails` / `closeEvalDetails` / `saveEvalDetails` / `decorateEvalEntry` / `getEvalResults` / `pinAsSample` / `restoreEvalResults` used consistently across B3/B4/B5.
- No backend / no real ML — represented via pin affordance only (matches §4 non-goals).
```