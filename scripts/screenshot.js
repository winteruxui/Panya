/**
 * Panya App — Full Screenshot Script
 * Uses Playwright to capture every page and state.
 * Run: node screenshot.js
 */

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = 3939;
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, 'screenshots');
const APP_DIR = path.join(__dirname, '..');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function shot(page, name) {
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
  console.log(`  ✓  ${name}.png`);
}

async function goto(page, url) {
  await page.goto(`${BASE}/${url}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
}

function startServer() {
  return new Promise((resolve, reject) => {
    const srv = spawn(
      'npx',
      ['http-server', APP_DIR, '-p', String(PORT), '--cors', '-c-1', '--silent'],
      { shell: true, stdio: 'pipe' }
    );
    setTimeout(() => resolve(srv), 2500);
    srv.on('error', reject);
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n🚀  Starting local server…');
  const server = await startServer();

  console.log(`✓  Server on ${BASE}\n`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await ctx.newPage();

  try {

    // ── AUTH ────────────────────────────────────────────────────────────────
    console.log('📸  AUTH');

    await goto(page, 'signin.html');
    await shot(page, 'auth_signin_default');

    // Sent state: type email and click send
    await page.fill('#email-input', 'demo@agency.com');
    await page.click('#send-btn');
    await page.waitForTimeout(300);
    await shot(page, 'auth_signin_sent');

    await goto(page, 'signup.html');
    await shot(page, 'auth_signup_default');

    // Trigger agency name field (click Agency Team role card)
    await page.click('.role-card[data-role="agency"]');
    await page.waitForTimeout(300);
    await shot(page, 'auth_signup_agency_selected');

    // Success state: fill all fields then submit
    await page.fill('input[type="text"]', 'Test User').catch(() => {});
    await page.fill('input[type="email"]', 'test@agency.com').catch(() => {});
    await page.waitForTimeout(200);
    await page.click('#submit-btn');
    await page.waitForTimeout(400);
    await shot(page, 'auth_signup_success');

    // ── DASHBOARD ──────────────────────────────────────────────────────────
    console.log('\n📸  DASHBOARD');

    await goto(page, 'dashboard.html');
    await shot(page, 'dashboard_default');

    // User popup: click .user-row
    await page.click('.user-row').catch(() => {});
    await page.waitForTimeout(300);
    await shot(page, 'dashboard_user_popup');
    // Close popup
    await page.keyboard.press('Escape');
    await page.click('body', { position: { x: 400, y: 400 } }).catch(() => {});
    await page.waitForTimeout(200);

    // ── PLANS ───────────────────────────────────────────────────────────────
    console.log('\n📸  PLANS');

    await goto(page, 'plans.html');
    await shot(page, 'plans_default');

    // Click a filter chip (e.g. "Feedback Pending")
    const chip = page.locator('.chip, .filter-chip, .status-chip').nth(1);
    if (await chip.count()) {
      await chip.click();
      await page.waitForTimeout(300);
      await shot(page, 'plans_filter_active');
      await chip.click(); // reset
    }

    // Plans New — all 5 wizard steps
    await goto(page, 'plans-new.html');
    await shot(page, 'plans_new_step1_context');

    // Step 2
    const nextBtn = page.locator('button:has-text("Next"), .btn-next, [onclick*="nextStep"], [onclick*="goToStep(2)"]').first();
    if (await nextBtn.count()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
      await shot(page, 'plans_new_step2_brief');

      await nextBtn.click();
      await page.waitForTimeout(300);
      await shot(page, 'plans_new_step3_content');

      await nextBtn.click();
      await page.waitForTimeout(300);
      await shot(page, 'plans_new_step4_media');

      await nextBtn.click();
      await page.waitForTimeout(300);
      await shot(page, 'plans_new_step5_summary');
    } else {
      // Fallback: use JS to jump to each step
      for (let s = 2; s <= 5; s++) {
        await page.evaluate((step) => {
          if (typeof goToStep === 'function') goToStep(step);
          else if (typeof showStep === 'function') showStep(step);
        }, s);
        await page.waitForTimeout(400);
        const names = ['','','brief','content','media','summary'];
        await shot(page, `plans_new_step${s}_${names[s]}`);
      }
    }

    // Plans Detail — all 3 tabs
    await goto(page, 'plans-detail.html');
    await shot(page, 'plans_detail_tab_overview');

    for (const tabName of ['content', 'feedback']) {
      await page.evaluate((t) => switchTab(t), tabName);
      await page.waitForTimeout(350);
      await shot(page, `plans_detail_tab_${tabName}`);
    }

    // Plan Success
    await goto(page, 'plan-success.html');
    await shot(page, 'plans_success');

    // ── CONTENT TOOLS ───────────────────────────────────────────────────────
    console.log('\n📸  CONTENT TOOLS');

    await goto(page, 'content-tools.html');
    await shot(page, 'contenttools_caption_studio_default');

    // Caption Studio — tab 2: Rewrite
    await page.evaluate(() => switchSubtab('caption', 'rewrite', document.querySelector('.subtab:not(.active)')));
    await page.waitForTimeout(300);
    await shot(page, 'contenttools_caption_studio_edit_tab');

    // Content Checker — Hook subpanel
    await page.evaluate(() => switchTool('checker'));
    await page.waitForTimeout(400);
    await shot(page, 'contenttools_checker_hook');

    // Content Checker — Policy subpanel
    await page.evaluate(() => switchSubtab('checker', 'policy', document.querySelector('[onclick*="policy"]')));
    await page.waitForTimeout(300);
    await shot(page, 'contenttools_checker_policy');

    // Hashtag Builder
    await page.evaluate(() => switchTool('hashtag'));
    await page.waitForTimeout(400);
    await shot(page, 'contenttools_hashtag_builder');

    // Idea Spark
    await page.evaluate(() => switchTool('spark'));
    await page.waitForTimeout(400);
    await shot(page, 'contenttools_idea_spark');

    // Text Tools — Polish
    await page.evaluate(() => switchTool('text'));
    await page.waitForTimeout(400);
    await shot(page, 'contenttools_text_tools_polish');

    // Text Tools — Brief Summarizer
    await page.evaluate(() => switchSubtab('text', 'brief', document.querySelector('[onclick*="brief"]')));
    await page.waitForTimeout(300);
    await shot(page, 'contenttools_text_tools_summarizer');

    // ── BRAND LIBRARY ───────────────────────────────────────────────────────
    console.log('\n📸  BRAND LIBRARY');

    await goto(page, 'brand-library.html');
    await shot(page, 'brandlibrary_default');

    // Select second brand
    const brandItems = page.locator('.brand-item, .brand-list-item');
    if (await brandItems.count() >= 2) {
      await brandItems.nth(1).click();
      await page.waitForTimeout(300);
      await shot(page, 'brandlibrary_brand2_selected');
    }

    // Add Brand drawer
    await page.click('[onclick="openDrawer(\'add\')"]');
    await page.waitForTimeout(400);
    await shot(page, 'brandlibrary_drawer_add');

    // Close drawer
    await page.click('.drawer-close').catch(() => {});

    // ── INSIGHTS ────────────────────────────────────────────────────────────
    console.log('\n📸  INSIGHTS');

    await goto(page, 'insights.html');
    await shot(page, 'insights_default');

    // Brand filter chip
    const insightChip = page.locator('.chip, .brand-chip, .filter-chip').nth(1);
    if (await insightChip.count()) {
      await insightChip.click();
      await page.waitForTimeout(300);
      await shot(page, 'insights_brand_filter_active');
      await insightChip.click();
    }

    // ── ASK PANYA ───────────────────────────────────────────────────────────
    console.log('\n📸  ASK PANYA');

    await goto(page, 'ask-panya.html');
    await shot(page, 'askpanya_empty_state');

    // Select brand + platform to activate button
    await page.selectOption('#empty-brand', 'Bonchon').catch(() => {});
    await page.selectOption('#empty-platform', 'Instagram').catch(() => {});
    await page.waitForTimeout(300);
    await shot(page, 'askpanya_ready_state');

    // Enter chat view
    await page.click('#empty-start-btn').catch(() => {});
    await page.waitForTimeout(400);
    await shot(page, 'askpanya_active_chat');

    // ── ADMIN ────────────────────────────────────────────────────────────────
    console.log('\n📸  ADMIN');

    await goto(page, 'admin.html');
    await shot(page, 'admin_tab_overview');

    // All tabs — click the .tab divs directly (switchTab needs element ref)
    const adminTabEls = page.locator('.tab');
    const adminTabNames = ['overview', 'team', 'billing', 'integrations', 'security'];
    for (let i = 1; i < 5; i++) {
      await adminTabEls.nth(i).click();
      await page.waitForTimeout(350);
      await shot(page, `admin_tab_${adminTabNames[i]}`);
    }

    // Invite modal — navigate to Team tab first
    await adminTabEls.nth(1).click();
    await page.waitForTimeout(300);
    await page.click('[onclick="openInviteModal()"]');
    await page.waitForTimeout(400);
    await shot(page, 'admin_modal_invite');
    await page.click('.modal-close').catch(() => {});
    await page.waitForTimeout(200);

    // Remove member confirm dialog — button is on Team tab
    await page.locator('.tab').nth(1).click();
    await page.waitForTimeout(300);
    await page.click('[onclick*="confirmRemove"]');
    await page.waitForTimeout(400);
    await shot(page, 'admin_modal_remove_confirm');
    await page.locator('.modal-cancel').first().click().catch(() => {});

  } finally {
    await browser.close();
    server.kill();
  }

  // Summary
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png'));
  console.log(`\n✅  Done! ${files.length} screenshots saved to:\n   ${OUT}\n`);
  files.forEach(f => console.log(`   ${f}`));
}

run().catch(err => {
  console.error('\n❌  Error:', err.message);
  process.exit(1);
});
