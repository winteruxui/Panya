// Panya Screenshot Uploader — Figma Plugin (main thread)

// ─── Metadata ────────────────────────────────────────────────────────────────

const SECTION_PREFIXES = {
  'auth_':         'Auth',
  'dashboard_':    'Dashboard',
  'plans_':        'Plans',
  'contenttools_': 'Content Tools',
  'brandlibrary_': 'Brand Library',
  'insights_':     'Insights',
  'askpanya_':     'Ask Panya',
  'admin_':        'Admin',
};

// Preserve order for page creation
const SECTION_ORDER = ['Auth','Dashboard','Plans','Content Tools','Brand Library','Insights','Ask Panya','Admin'];

const DESCRIPTIONS = {
  auth_signin_default:          'Sign-in form — email input + Send Magic Link button',
  auth_signin_sent:             'Magic link sent — "Check your inbox" confirmation state',
  auth_signup_default:          'Request Access form — name, email, role selection',
  auth_signup_agency_selected:  'Agency role selected — Agency Name field revealed',
  auth_signup_success:          'Access request submitted — success confirmation',
  dashboard_default:            'Main dashboard — KPI cards, Active Plans, Quick Actions',
  dashboard_user_popup:         'User popup open — Sign out menu above username row',
  plans_default:                'Plans list — table view with search and status filters',
  plans_filter_active:          'Plans filtered — status chip active, filtered rows shown',
  plans_new_step1_context:      'New Plan wizard — Step 1: name, brand, audience, budget',
  plans_new_step2_brief:        'New Plan wizard — Step 2: content brief and pillars',
  plans_new_step3_content:      'New Plan wizard — Step 3: idea cards and content planning',
  plans_new_step4_media:        'New Plan wizard — Step 4: media table and calendar scheduling',
  plans_new_step5_summary:      'New Plan wizard — Step 5: summary before final submit',
  plans_detail_tab_overview:    'Plan detail — Overview tab: ideas, feedback, calendar',
  plans_detail_tab_content:     'Plan detail — Content tab: full content list',
  plans_detail_tab_feedback:    'Plan detail — Feedback tab: voting and comments',
  plans_success:                'Plan created — success confirmation with plan summary',
  contenttools_caption_studio_default:   'Caption Studio — textarea input + generated caption cards',
  contenttools_caption_studio_edit_tab:  'Caption Studio — Rewrite tab',
  contenttools_checker_hook:             'Content Checker — Hook Score sub-panel',
  contenttools_checker_policy:           'Content Checker — Policy Check sub-panel',
  contenttools_hashtag_builder:          'Hashtag Builder — input form + hashtag results',
  contenttools_idea_spark:               'Idea Spark — brief form + generated idea cards',
  contenttools_text_tools_polish:        'Text Tools — Thai-English Polish sub-panel',
  contenttools_text_tools_summarizer:    'Text Tools — Brief Summarizer sub-panel',
  brandlibrary_default:         'Brand Library — first brand selected, detail panel open',
  brandlibrary_brand2_selected: 'Brand Library — second brand selected',
  brandlibrary_drawer_add:      'Brand Library — Add Brand drawer open',
  insights_default:             'Insights — KPI cards, chart, platform breakdown, top posts',
  askpanya_empty_state:         'Ask Panya — empty: dropdowns unselected, button disabled',
  askpanya_ready_state:         'Ask Panya — brand + platform selected, Start button active',
  askpanya_active_chat:         'Ask Panya — active chat view with conversation history',
  admin_tab_overview:           'Admin — Overview tab: KPI cards, team summary, activity',
  admin_tab_team:               'Admin — Team tab: member list with roles',
  admin_tab_billing:            'Admin — Billing tab: plan and payment info',
  admin_tab_integrations:       'Admin — Integrations tab: connected services',
  admin_tab_security:           'Admin — Security tab: 2FA, session management',
  admin_modal_invite:           'Admin — Invite Team Member modal',
  admin_modal_remove_confirm:   'Admin — Remove member confirmation dialog',
};

const INTERACTIONS = {
  auth_signin_default:          '• Type email → Send Magic Link enables\n• Google SSO button (wired as toast)\n• "Request access" link → signup.html',
  auth_signin_sent:             '• "Continue to Dashboard" → dashboard.html\n• "Use a different email" → resets form',
  auth_signup_default:          '• Select role card → agency field shows/hides\n• Fill form → button enables\n• Submit → success state',
  auth_signup_agency_selected:  '• Agency Name field visible\n• Switch to Client → field hides again',
  auth_signup_success:          '• "Back to sign in" → signin.html',
  dashboard_default:            '• Click plan card → plans-detail.html\n• "New Plan" button → plans-new.html\n• Click username row → sign out popup\n• Brand filter chips → filters plan grid',
  dashboard_user_popup:         '• "Sign out" → clears token, goes to signin.html\n• Click outside popup → closes menu',
  plans_default:                '• Status chips → filter table\n• Click plan row → plans-detail.html\n• "Create Plan" → plans-new.html\n• Search input → filters by name',
  plans_filter_active:          '• Active chip highlighted; table filtered\n• Click chip again → resets',
  plans_new_step1_context:      '• Fill name, brand, audience, budget\n• "Next" → Step 2\n• "Save as Draft" → saves and exits',
  plans_new_step2_brief:        '• Add content pillars\n• Next / Back navigation',
  plans_new_step3_content:      '• Add/edit/delete idea cards\n• Next / Back navigation',
  plans_new_step4_media:        '• Schedule posts in calendar\n• Next / Back navigation',
  plans_new_step5_summary:      '• Review summary\n• "Create Plan" → plan-success.html\n• Back → Step 4',
  plans_detail_tab_overview:    '• Tabs: Overview / Content / Feedback\n• Vote chips on feedback items\n• Calendar shows scheduled content',
  plans_detail_tab_content:     '• Content list with edit/delete actions',
  plans_detail_tab_feedback:    '• Voting buttons on feedback items',
  plans_success:                '• "View Plan" → plans-detail.html\n• "Create Another Plan" → plans-new.html',
  contenttools_caption_studio_default:  '• Sidebar → switch tool\n• Sub-tabs: Generate / Rewrite\n• Textarea + Generate button\n• Copy / Use in Plan on cards',
  contenttools_caption_studio_edit_tab: '• Rewrite tab: goal buttons + Regenerate\n• Copy output button',
  contenttools_checker_hook:            '• Sub-tabs: Hook Score / Policy Check\n• Paste content + Run Score',
  contenttools_checker_policy:          '• Policy violations highlighted in output\n• Export Report button',
  contenttools_hashtag_builder:         '• Input brand/topic → Build Set\n• Select hashtags + Copy Selected',
  contenttools_idea_spark:              '• Fill brief → Spark generates ideas\n• "Add to Plan" on idea cards',
  contenttools_text_tools_polish:       '• Sub-tabs: Polish / Brief Summarizer\n• Paste text → before/after view',
  contenttools_text_tools_summarizer:   '• Paste brief → summarized output',
  brandlibrary_default:         '• Click brand in list → loads detail\n• "+ Add Brand" → opens drawer\n• Edit / Export buttons on brand',
  brandlibrary_brand2_selected: '• Detail panel updates to selected brand',
  brandlibrary_drawer_add:      '• Fill brand info + Save\n• × button → closes drawer',
  insights_default:             '• Date range selector → filters period\n• Brand chips → filters by brand\n• Chart hover → tooltip\n• Export button → downloads data',
  askpanya_empty_state:         '• Select Brand → activates choice\n• Select Platform → activates choice\n• Both selected → button turns purple (#6366F1)',
  askpanya_ready_state:         '• "Start asking →" → enters chat view\n• Dropdowns still changeable',
  askpanya_active_chat:         '• Type + Send → AI response\n• History sidebar → loads past chat\n• Context bar → change brand/platform\n• "+ New" → fresh conversation',
  admin_tab_overview:           '• Tabs → switch Admin sections\n• Alert banner has Dismiss button',
  admin_tab_team:               '• "Invite Member" → invite modal\n• Remove button → confirm dialog\n• Edit role dropdown per member',
  admin_tab_billing:            '• Upgrade / Cancel Plan actions',
  admin_tab_integrations:       '• Connect / Disconnect integrations',
  admin_tab_security:           '• 2FA toggle, session management',
  admin_modal_invite:           '• Fill email + role → Send Invite\n• Cancel / × → closes',
  admin_modal_remove_confirm:   '• Confirm → removes member\n• Cancel → closes without action',
};

// ─── Layout constants ─────────────────────────────────────────────────────────

const FRAME_W     = 1440;
const COL_GAP     = 160;   // gap between frame right edge and annotation left edge
const ROW_GAP     = 200;   // extra vertical gap between rows
const FRAMES_PER_ROW = 3;
const PAGE_PAD    = 100;
const ANNOT_W     = 320;
const ANNOT_OFFSET = 40;   // gap between frame right and annotation left

// ─── State ────────────────────────────────────────────────────────────────────

let pendingFiles = [];
let currentIndex = 0;
let sectionFrames = {}; // section → { col, row, maxRowH }
let createdPages = {};  // section → PageNode

// ─── Entry point ─────────────────────────────────────────────────────────────

figma.showUI(__html__, { width: 440, height: 560, title: 'Panya Screenshot Uploader' });

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'start':
      await handleStart(msg.files);
      break;
    case 'file-data':
      await handleFileData(msg);
      break;
    case 'cancel':
      figma.closePlugin('Cancelled.');
      break;
  }
};

// ─── Handlers ─────────────────────────────────────────────────────────────────

async function handleStart(files) {
  pendingFiles = files; // [{name, width, height}] — bytes sent separately
  currentIndex = 0;
  sectionFrames = {};
  createdPages = {};

  // Pre-load fonts
  try {
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
  } catch (e) {
    // fallback to Roboto if Inter not available
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Roboto', style: 'Bold' });
  }

  // Create all pages upfront (in defined order)
  for (const sectionName of SECTION_ORDER) {
    const existing = figma.root.children.find(p => p.name === sectionName);
    if (existing) {
      createdPages[sectionName] = existing;
    } else {
      const page = figma.createPage();
      page.name = sectionName;
      createdPages[sectionName] = page;
    }
    sectionFrames[sectionName] = { col: 0, row: 0 };
  }

  figma.ui.postMessage({ type: 'ready', total: pendingFiles.length });

  // Request first file's bytes
  requestNext();
}

async function handleFileData(msg) {
  const { name, bytes, width, height } = msg;
  const frameName = name.replace('.png', '');

  // Determine section
  let section = 'Auth'; // default
  for (const [prefix, sectionName] of Object.entries(SECTION_PREFIXES)) {
    if (frameName.startsWith(prefix)) { section = sectionName; break; }
  }

  const page = createdPages[section];
  if (!page) { requestNext(); return; }

  figma.currentPage = page;

  // Scale dimensions: PNG is @2x, design frame is 1440px
  const scale = FRAME_W / width;
  const frameH = Math.round(height * scale);

  // Layout position
  const pos = sectionFrames[section];
  const colWidth = FRAME_W + ANNOT_OFFSET + ANNOT_W + COL_GAP;

  // Calculate y based on previous rows — store max height per row
  if (!pos.rowHeights) pos.rowHeights = {};
  if (!pos.rowHeights[pos.row]) pos.rowHeights[pos.row] = 0;
  pos.rowHeights[pos.row] = Math.max(pos.rowHeights[pos.row], frameH);

  let y = PAGE_PAD;
  for (let r = 0; r < pos.row; r++) {
    y += (pos.rowHeights[r] || 800) + ROW_GAP + 60; // 60 = label height
  }
  const x = PAGE_PAD + pos.col * colWidth;

  // ── Create screenshot frame ──
  const img = figma.createImage(new Uint8Array(bytes));
  const frame = figma.createFrame();
  frame.resize(FRAME_W, frameH);
  frame.x = x;
  frame.y = y;
  frame.name = frameName.replace(/_/g, ' ');
  frame.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FILL' }];
  frame.strokeWeight = 1;
  frame.strokes = [{ type: 'SOLID', color: { r: 0.88, g: 0.88, b: 0.88 } }];
  frame.cornerRadius = 6;
  frame.clipsContent = false;

  // ── Label below frame ──
  const labelText = frameName.replace(/_/g, ' ');
  const label = figma.createText();
  label.x = x;
  label.y = y + frameH + 14;
  label.resize(FRAME_W, 28);
  label.characters = labelText;
  try { label.fontName = { family: 'Inter', style: 'Semi Bold' }; } catch(e) {}
  label.fontSize = 13;
  label.fills = [{ type: 'SOLID', color: { r: 0.42, g: 0.45, b: 0.51 } }];

  // ── Annotation sticky (right of frame) ──
  const annotX = x + FRAME_W + ANNOT_OFFSET;
  const annotY = y;
  const desc = DESCRIPTIONS[frameName] || frameName.replace(/_/g, ' ');
  const ints = INTERACTIONS[frameName] || '—';
  const annotContent = `📄 ${frameName.replace(/_/g, ' ')}\n\n${desc}\n\n─────────────────\nInteractions:\n${ints}`;

  const annotBg = figma.createFrame();
  annotBg.resize(ANNOT_W, 20); // will grow with text
  annotBg.x = annotX;
  annotBg.y = annotY;
  annotBg.name = `note_${frameName}`;
  annotBg.fills = [{ type: 'SOLID', color: { r: 1, g: 0.98, b: 0.87 } }];
  annotBg.strokeWeight = 1;
  annotBg.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.85, b: 0.7 } }];
  annotBg.cornerRadius = 8;

  const annotText = figma.createText();
  annotText.x = 14;
  annotText.y = 14;
  annotText.resize(ANNOT_W - 28, 100);
  annotText.textAutoResize = 'HEIGHT';
  annotText.characters = annotContent;
  try { annotText.fontName = { family: 'Inter', style: 'Regular' }; } catch(e) {}
  annotText.fontSize = 12;
  annotText.lineHeight = { value: 18, unit: 'PIXELS' };
  annotText.fills = [{ type: 'SOLID', color: { r: 0.18, g: 0.18, b: 0.2 } }];
  annotBg.appendChild(annotText);

  // Resize annotBg to fit text
  annotBg.resize(ANNOT_W, annotText.height + 28);

  // ── Advance layout position ──
  pos.col++;
  if (pos.col >= FRAMES_PER_ROW) {
    pos.col = 0;
    pos.row++;
  }

  // Report progress
  figma.ui.postMessage({
    type: 'progress',
    done: currentIndex + 1,
    total: pendingFiles.length,
    name: frameName,
    section,
  });

  currentIndex++;
  requestNext();
}

function requestNext() {
  if (currentIndex >= pendingFiles.length) {
    // All done — zoom to first created page
    const firstPage = createdPages['Auth'] || figma.root.children[0];
    if (firstPage) figma.currentPage = firstPage;
    figma.ui.postMessage({ type: 'done', total: pendingFiles.length });
    return;
  }
  figma.ui.postMessage({ type: 'request-file', index: currentIndex, name: pendingFiles[currentIndex].name });
}
