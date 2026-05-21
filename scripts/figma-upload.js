/**
 * Panya App — Figma Upload Script
 * Uploads screenshots as organized frames with annotations.
 *
 * Config: set FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY below
 * or pass as env vars:
 *   FIGMA_TOKEN=xxx FIGMA_FILE=xxx node figma-upload.js
 *
 * Run AFTER screenshot.js has produced ./screenshots/*.png
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'YOUR_FIGMA_ACCESS_TOKEN_HERE';
const FIGMA_FILE  = process.env.FIGMA_FILE  || 'YOUR_FIGMA_FILE_KEY_HERE';

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

// Frame layout
const FRAME_WIDTH   = 1440;
const COL_GAP       = 120;   // horizontal gap between frames
const ROW_GAP       = 200;   // vertical gap between rows (leaves room for annotations)
const FRAMES_PER_ROW = 3;
const PAGE_PADDING  = 80;    // left/top offset on each Figma page

// Annotation style
const ANNOT_OFFSET_X = 40;   // px to the RIGHT of the frame
const ANNOT_WIDTH    = 320;
const LABEL_FONT_SIZE = 14;
const LABEL_COLOR    = { r: 0.42, g: 0.45, b: 0.51, a: 1 }; // #6B7280
const STICKY_BG      = { r: 1, g: 0.98, b: 0.88, a: 1 };    // warm yellow sticky

// ─── PAGE → SECTION MAPPING ──────────────────────────────────────────────────

// Each PNG filename prefix maps to a Figma page name
const SECTION_MAP = {
  auth:         'Auth',
  dashboard:    'Dashboard',
  plans:        'Plans',
  contenttools: 'Content Tools',
  brandlibrary: 'Brand Library',
  insights:     'Insights',
  askpanya:     'Ask Panya',
  admin:        'Admin',
};

// Human-readable descriptions for each screenshot state
const DESCRIPTIONS = {
  auth_signin_default:           'Sign-in form — email input + Send Magic Link button',
  auth_signin_sent:              'Magic link sent — "Check your inbox" confirmation state',
  auth_signup_default:           'Request Access form — name, email, role selection',
  auth_signup_agency_selected:   'Agency role selected — Agency Name field revealed',
  auth_signup_success:           'Access request submitted — success confirmation state',

  dashboard_default:             'Main dashboard — KPI cards, Active Plans, Quick Actions',
  dashboard_user_popup:          'User popup open — Sign out menu above username row',

  plans_default:                 'Plans list — table view with search and status filters',
  plans_filter_active:           'Plans filtered — status chip active, filtered rows shown',
  plans_new_step1_context:       'New Plan wizard — Step 1: Plan name, brand, audience, budget',
  plans_new_step2_brief:         'New Plan wizard — Step 2: Content brief and pillars',
  plans_new_step3_content:       'New Plan wizard — Step 3: Idea cards and content planning',
  plans_new_step4_media:         'New Plan wizard — Step 4: Media table and calendar scheduling',
  plans_new_step5_summary:       'New Plan wizard — Step 5: Summary before final submit',
  plans_detail_tab_overview:     'Plan detail — Overview tab: ideas, feedback, calendar',
  plans_detail_tab_content:      'Plan detail — Content tab: full content list',
  plans_detail_tab_feedback:     'Plan detail — Feedback tab: voting and comments',
  plans_success:                 'Plan created — success confirmation with plan summary',

  contenttools_caption_studio_default:  'Caption Studio — textarea input + generated caption cards',
  contenttools_caption_studio_edit_tab: 'Caption Studio — Edit Caption tab',
  contenttools_checker_hook:            'Content Checker — Hook sub-panel',
  contenttools_checker_policy:          'Content Checker — Policy sub-panel',
  contenttools_hashtag_builder:         'Hashtag Builder — input form + hashtag results',
  contenttools_idea_spark:              'Idea Spark — brief form + generated idea cards',
  contenttools_text_tools_polish:       'Text Tools — Polish sub-panel: before/after view',
  contenttools_text_tools_summarizer:   'Text Tools — Brief Summarizer sub-panel',

  brandlibrary_default:          'Brand Library — first brand selected, detail panel open',
  brandlibrary_brand2_selected:  'Brand Library — second brand selected',
  brandlibrary_modal_step1:      'Add Brand modal — Step 1: brand name and logo',
  brandlibrary_modal_step2:      'Add Brand modal — Step 2: brand identity (voice, colors)',
  brandlibrary_modal_step3:      'Add Brand modal — Step 3: guidelines and details',

  insights_default:              'Insights — KPI cards, bar chart, platform breakdown, top posts',
  insights_brand_filter_active:  'Insights — brand filter chip active, filtered data view',

  askpanya_empty_state:          'Ask Panya — empty state, dropdowns unselected, button disabled',
  askpanya_ready_state:          'Ask Panya — brand + platform selected, Start button active',
  askpanya_active_chat:          'Ask Panya — active chat view with conversation history',

  admin_tab_overview:            'Admin — Overview tab: KPI cards, team summary, activity',
  admin_tab_team:                'Admin — Team tab: member list with roles',
  admin_tab_billing:             'Admin — Billing tab: plan and payment info',
  admin_tab_integrations:        'Admin — Integrations tab: connected services',
  admin_tab_security:            'Admin — Security tab: 2FA, session management',
  admin_modal_invite:            'Admin — Invite Team Member modal',
  admin_modal_remove_confirm:    'Admin — Remove member confirmation dialog',
};

// Key interactions per screen (for sticky notes)
const INTERACTIONS = {
  auth_signin_default:           '• Type email → Send Magic Link button enables\n• Click "Sign in with Google" → OAuth (not wired in wireframe)\n• Click "Request access" → goes to signup.html',
  auth_signin_sent:              '• Click "Continue to Dashboard" → dashboard.html\n• Click "Use a different email" → back to form state',
  auth_signup_default:           '• Select role card → agency name field shows/hides\n• Fill form → Request Access button enables\n• Submit → success state',
  auth_signup_agency_selected:   '• Agency Name field visible when Agency Team selected\n• Switching to Client hides the field',
  auth_signup_success:           '• No further interactions — confirmation page only',

  dashboard_default:             '• Click plan card → plans-detail.html\n• Click "New Plan" → plans-new.html\n• Click username row → sign out popup\n• Click brand filter chips → filters plan grid',
  dashboard_user_popup:          '• Click "Sign out" → clears token, redirects to signin.html\n• Click outside popup → closes menu',

  plans_default:                 '• Click status filter chips → filters table rows\n• Click plan row → plans-detail.html\n• Click "Create Plan" → plans-new.html\n• Search input → filters by plan name',
  plans_filter_active:           '• Active chip highlighted; table shows filtered subset\n• Click chip again → resets filter',
  plans_new_step1_context:       '• Fill Plan Name, Brand, Audience, Budget\n• Click Next → Step 2\n• Click "Save as Draft" → saves and exits',
  plans_new_step2_brief:         '• Add content pillars\n• Click Next → Step 3 / Back → Step 1',
  plans_new_step3_content:       '• Add/edit/delete idea cards\n• Click Next → Step 4 / Back → Step 2',
  plans_new_step4_media:         '• Schedule posts in calendar\n• Click Next → Step 5 / Back → Step 3',
  plans_new_step5_summary:       '• Review plan summary\n• Click "Create Plan" → plan-success.html\n• Click Back → Step 4',
  plans_detail_tab_overview:     '• Click tabs (Overview / Content / Feedback) to switch views\n• Vote chips on feedback items\n• Calendar shows scheduled content',
  plans_detail_tab_content:      '• Content list with edit/delete actions',
  plans_detail_tab_feedback:     '• Voting buttons on feedback items',
  plans_success:                 '• Click "View Plan" → plans-detail.html\n• Click "Create Another Plan" → plans-new.html\n• Next Actions sidebar items are clickable',

  contenttools_caption_studio_default:  '• Click tool in sidebar → switches active tool\n• Click sub-tabs (Caption Variations / Edit Caption)\n• Textarea input + Generate button\n• Copy/Use buttons on caption cards',
  contenttools_caption_studio_edit_tab: '• Edit Caption tab shows editable output\n• Copy / Regenerate buttons',
  contenttools_checker_hook:            '• Sub-tabs: Hook / Policy\n• Paste content + run check',
  contenttools_checker_policy:          '• Policy violations highlighted in output',
  contenttools_hashtag_builder:         '• Input brand/topic → Generate hashtags\n• Copy set button',
  contenttools_idea_spark:              '• Fill brief fields → Spark button generates ideas\n• Idea cards with use/discard actions',
  contenttools_text_tools_polish:       '• Sub-tabs: Polish / Brief Summarizer\n• Paste text → before/after comparison output',
  contenttools_text_tools_summarizer:   '• Paste brief → summarized version output',

  brandlibrary_default:          '• Click brand in list → loads detail panel on right\n• Click "+ Add Brand" → opens 3-step modal\n• Edit/delete buttons on selected brand',
  brandlibrary_brand2_selected:  '• Detail panel updates to show selected brand info',
  brandlibrary_modal_step1:      '• Enter brand name + upload logo\n• Click Next → Step 2 / Cancel → closes modal',
  brandlibrary_modal_step2:      '• Define brand voice, select colors\n• Click Next → Step 3 / Back → Step 1',
  brandlibrary_modal_step3:      '• Add guidelines\n• Click Save → creates brand / Back → Step 2',

  insights_default:              '• Date range selector → filters data period\n• Brand filter chips → filters by brand\n• Chart hover → tooltip with detail values\n• Export button → downloads data',
  insights_brand_filter_active:  '• Filtered charts and tables reflect selected brand only\n• Click chip again → removes filter',

  askpanya_empty_state:          '• Select Brand dropdown → activates selection\n• Select Platform dropdown → activates selection\n• Both selected → "Start asking" button turns purple',
  askpanya_ready_state:          '• Click "Start asking →" → enters chat view\n• Dropdowns can still be changed before starting',
  askpanya_active_chat:          '• Type in message input + Send → AI response appears\n• Click conversation in history sidebar → loads that chat\n• Context bar dropdowns → change brand/platform mid-chat\n• "+ New" button → starts fresh conversation',

  admin_tab_overview:            '• Click admin tabs to switch sections\n• Alert banner has dismiss button',
  admin_tab_team:                '• "Invite Team Member" → opens invite modal\n• Remove button → opens confirm dialog\n• Edit role dropdown per member',
  admin_tab_billing:             '• Plan upgrade/downgrade actions',
  admin_tab_integrations:        '• Connect / disconnect integrations',
  admin_tab_security:            '• Enable 2FA, manage sessions',
  admin_modal_invite:            '• Fill email + role → Send Invite button\n• Cancel / × → closes modal',
  admin_modal_remove_confirm:    '• Confirm → removes member\n• Cancel → closes without action',
};

// ─── Figma API helpers ────────────────────────────────────────────────────────

function apiRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'api.figma.com',
      path: `/v1/${endpoint}`,
      method,
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(opts, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(new Error(`Parse error: ${raw.slice(0,200)}`)); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// Upload image bytes to Figma and get an imageHash back
function uploadImage(pngBuffer) {
  return new Promise((resolve, reject) => {
    const boundary = '----FigmaBoundary' + Date.now();
    const header = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="image"; filename="frame.png"\r\nContent-Type: image/png\r\n\r\n`
    );
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([header, pngBuffer, footer]);

    const opts = {
      hostname: 'api.figma.com',
      path: `/v1/images/${FIGMA_FILE}`,
      method: 'POST',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      },
    };
    const req = https.request(opts, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.meta && parsed.meta.images) {
            resolve(Object.values(parsed.meta.images)[0]);
          } else {
            reject(new Error(`Image upload failed: ${raw.slice(0,300)}`));
          }
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Read actual PNG dimensions
function getPngDimensions(buffer) {
  // PNG header: bytes 16-23 are width and height (big endian uint32)
  const w = buffer.readUInt32BE(16);
  const h = buffer.readUInt32BE(20);
  return { w, h };
}

// ─── Build Figma node tree for one section ───────────────────────────────────

async function buildSectionNodes(sectionKey, files) {
  const nodes = [];
  let col = 0, row = 0;

  for (const file of files) {
    const name = path.basename(file, '.png');
    const desc = DESCRIPTIONS[name] || name.replace(/_/g, ' ');
    const interactions = INTERACTIONS[name] || '';

    const pngBuf = fs.readFileSync(file);
    const { w: origW, h: origH } = getPngDimensions(pngBuf);

    // Scale to FRAME_WIDTH
    const scale = FRAME_WIDTH / origW;
    const frameH = Math.round(origH * scale);

    const x = PAGE_PADDING + col * (FRAME_WIDTH + COL_GAP + ANNOT_WIDTH + ANNOT_OFFSET_X * 2);
    const y = PAGE_PADDING + row * (frameH + ROW_GAP);

    console.log(`  uploading image: ${name}…`);
    const imageHash = await uploadImage(pngBuf);

    // Screenshot frame
    nodes.push({
      type: 'FRAME',
      name: name.replace(/_/g, ' '),
      x, y,
      width: FRAME_WIDTH,
      height: frameH,
      fills: [{
        type: 'IMAGE',
        imageHash,
        scaleMode: 'FILL',
      }],
      strokes: [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }],
      strokeWeight: 1,
      cornerRadius: 8,
    });

    // Label below frame (filename)
    nodes.push({
      type: 'TEXT',
      name: `label_${name}`,
      x,
      y: y + frameH + 16,
      width: FRAME_WIDTH,
      height: 24,
      characters: name.replace(/_/g, ' '),
      style: {
        fontFamily: 'Inter',
        fontSize: LABEL_FONT_SIZE,
        fontWeight: 600,
        fills: [{ type: 'SOLID', color: LABEL_COLOR }],
      },
    });

    // Sticky annotation to the RIGHT
    const stickyX = x + FRAME_WIDTH + ANNOT_OFFSET_X;
    const stickyY = y;
    const stickyContent = `📄 ${name.replace(/_/g, ' ')}\n\n${desc}\n\n──────────────\nInteractions:\n${interactions || '—'}`;

    nodes.push({
      type: 'STICKY',
      name: `annot_${name}`,
      x: stickyX,
      y: stickyY,
      width: ANNOT_WIDTH,
      text: {
        characters: stickyContent,
        style: {
          fontFamily: 'Inter',
          fontSize: 13,
          fills: [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2, a: 1 } }],
        },
      },
      fills: [{ type: 'SOLID', color: STICKY_BG }],
    });

    col++;
    if (col >= FRAMES_PER_ROW) {
      col = 0;
      row++;
    }
  }

  return nodes;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  if (FIGMA_TOKEN === 'YOUR_FIGMA_ACCESS_TOKEN_HERE') {
    console.error('❌  Set FIGMA_TOKEN env var or edit FIGMA_TOKEN in this file.');
    process.exit(1);
  }
  if (FIGMA_FILE === 'YOUR_FIGMA_FILE_KEY_HERE') {
    console.error('❌  Set FIGMA_FILE env var or edit FIGMA_FILE in this file.');
    process.exit(1);
  }

  // Read all PNGs grouped by section
  const allFiles = fs.readdirSync(SCREENSHOTS_DIR)
    .filter(f => f.endsWith('.png'))
    .map(f => path.join(SCREENSHOTS_DIR, f));

  const bySection = {};
  for (const [prefix, label] of Object.entries(SECTION_MAP)) {
    bySection[label] = allFiles.filter(f =>
      path.basename(f).startsWith(prefix + '_') || path.basename(f) === prefix + '.png'
    );
  }

  console.log('\n🎨  Connected to Figma file:', FIGMA_FILE);
  console.log('📂  Sections to upload:');
  for (const [label, files] of Object.entries(bySection)) {
    console.log(`   ${label}: ${files.length} screenshot(s)`);
  }

  // Get current file to find existing pages
  const fileData = await apiRequest('GET', `files/${FIGMA_FILE}?depth=1`);
  const existingPages = fileData.document.children.map(p => ({ id: p.id, name: p.name }));
  console.log('\n📄  Existing Figma pages:', existingPages.map(p => p.name).join(', '));

  // Create or find a page per section, then POST nodes
  for (const [label, files] of Object.entries(bySection)) {
    if (!files.length) {
      console.log(`\n⏭️   Skipping "${label}" — no screenshots found`);
      continue;
    }

    console.log(`\n📤  Uploading section: "${label}" (${files.length} frames)…`);

    // Find or create the page
    let page = existingPages.find(p => p.name === label);
    if (!page) {
      const createResult = await apiRequest('POST', `files/${FIGMA_FILE}/pages`, { name: label });
      page = { id: createResult.id, name: label };
      console.log(`   Created page "${label}" (id: ${page.id})`);
    } else {
      console.log(`   Using existing page "${label}" (id: ${page.id})`);
    }

    // Build and upload nodes
    const nodes = await buildSectionNodes(label, files);

    const postResult = await apiRequest('POST', `files/${FIGMA_FILE}/nodes`, {
      nodes: nodes.map(n => ({ ...n, pageId: page.id })),
    });

    if (postResult.error) {
      console.error(`   ❌  Upload error for "${label}":`, postResult.error);
    } else {
      console.log(`   ✓  ${nodes.filter(n => n.type === 'FRAME').length} frames added to "${label}"`);
    }
  }

  console.log('\n✅  All sections uploaded!');
  console.log(`   Open: https://www.figma.com/file/${FIGMA_FILE}\n`);
}

run().catch(err => {
  console.error('\n❌  Fatal error:', err.message);
  process.exit(1);
});
