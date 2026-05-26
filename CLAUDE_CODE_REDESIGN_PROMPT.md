# CLAUDE CODE PROMPT — Dashboard + Full Redesign
**Reference:** Figma https://www.figma.com/design/kduGWcz3DpsASPtRxYkYZ4/Panya?node-id=86-281
**Design system:** DESIGN_BIBLE_v2.md
**Logo files:** /assets/ folder (copy from project root)

---

## STEP 0 — Setup (do this first)

Copy logo files to your assets folder:
```
logo-normal.svg     → /public/assets/ or /src/assets/
logo-white.svg      → same
logo-orange.svg     → same
logo-black.svg      → same
logo-icon-only.svg  → same
```

Install IBM Plex Sans Thai font. Add to your global CSS or index.html:
```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Add to global CSS:
```css
* { font-family: 'IBM Plex Sans Thai', 'IBM Plex Sans', sans-serif; }
body { background: #F2F2F2; }
```

---

## MAIN PROMPT (paste this to Claude Code)

```
Read DESIGN_BIBLE_v2.md carefully before starting.

PHASE 1 — Dashboard page only. Match Figma node 86:281 exactly.

LOGO: All SVG logo files are in /assets/. Use them as follows:
- Sidebar: <img src="/assets/logo-normal.svg" height="28" />
- Panya button: <img src="/assets/logo-icon-only.svg" width="20" style="filter:brightness(0) invert(1)" />
- Never recreate logo as text or CSS

GLOBAL (apply before anything else):
- Font: IBM Plex Sans Thai, already imported
- Body background: #F2F2F2
- All text must use IBM Plex Sans Thai
- Remove any previously set fonts (Inter, Noto Sans Thai, etc.)

SIDEBAR — exact spec:
- Width: 272px, bg: #FFFFFF, border-radius right: 12px
- Padding: 40px 12px 24px 12px
- Logo: /assets/logo-normal.svg, height 28px, top
- Section label "เครื่องมือ": 12px, #717680, weight 400, height 32px, padding 10px
- Nav items: height 40px, padding 10px, border-radius 9999px (PILL — non-negotiable)
  - Default: bg transparent, text #535862, weight 500, icon 20px
  - Active: bg #FDF0EB, text #DC6803, weight 600
  - Badge: bg #FAFAFA, border 1px #E9EAEB, border-radius 9999px, 12px text #414651
- User row: bg #FAFAFA, border-radius 9999px, padding 6px 10px
  - Avatar: 30px circle, bg #F5F5F5, initial letter, weight 600
  - Email 14px/500 #181D27 + role 12px/400 #535862
  - Chevron-down 20px right

DASHBOARD PAGE LAYOUT:
- Outer: bg #F2F2F2
- Two columns: left 822px + right 258px, gap 24px
- Both start at top: 132px from page top, left: 304px from left edge
- Left panel: bg #FFFFFF, border-radius 12px, height 749px, overflow hidden
- Right panel: separate structure (header + body)

LEFT PANEL — "ภาพรวมปัจจุบัน":

Panel header (inside left panel):
  - Padding: 20px 20px 12px 20px
  - Title "ภาพรวมปัจจุบัน": font-size 24px, weight 600, color #181D27
  - Subtitle "อัปเดตล่าสุด [date]": 12px, #717680
  - "Panya สรุปให้" button (top right):
    - bg: linear-gradient(-32.64deg, #E96B38 46.62%, #FFAF8E 83.26%)
    - border: 2px solid #FF956A
    - border-radius: 9999px, height: 40px, padding: 8px 18px
    - filter: drop-shadow(0 0 2.9px #FFA600)
    - icon: /assets/logo-icon-only.svg white, 20px + text "Panya สรุปให้" white 16px/600
    - gap: 6px

Stats row (below header, above brand grid):
  - border-top: 1px solid #E9EAEB
  - border-bottom: 1px solid #E9EAEB
  - 4 equal columns, centered content
  - Padding: 4px 0
  - Col 1 — AVG Score:
    - Circle: 84px, bg #FFFAEB, border-radius 9999px
    - Number inside: 36px, weight 600, color #F79009, tracking -0.72px
    - Label "คะแนนเฉลี่ย": 14px, #717680, below circle
  - Col 2 — Growth %:
    - Number: 36px, weight 400, color #17B26A + arrow-up icon 24px same color
    - Label "เพิ่มขึ้น (MoM)": 14px, #717680
  - Col 3 — Total Brands:
    - Number: 36px, weight 400, color #535862
    - Label "แบรนด์ทั้งหมด": 14px, #717680
  - Col 4 — Total Campaigns:
    - Number: 36px, weight 400, color #535862
    - Label "แคมเปญทั้งหมด": 14px, #717680

Brands section header (inside left panel):
  - Padding: 0 20px
  - Title "แบรนด์ทั้งหมด": 18px, weight 600, color #535862
  - Right side: "+ เพิ่มแบรนด์" + "จัดการแบรนด์" secondary outline buttons
    - Both: bg white, border 1px #D5D7DA, border-radius 9999px, height 40px
    - Text 16px/600 #414651, icons 20-24px

Brand cards grid:
  - 3 columns, gap 16px, padding 0 20px
  - Each card: bg #F5F5F5, border-radius 12px, padding 12px 16px
  
  Card structure:
    1. Header row: bg white, border-radius 9999px, padding 2px
       - Left: Avatar 40px circle (brand image) + brand name 16px/600 #181D27
       - Right: chevron-right 20px #535862
    
    2. Stats row: border-top+bottom 1px #E9EAEB, padding 4px 0, 2 cols
       - Left: metric number 20px/500 + label 12px/400 #717680
       - Score colors: ≥75 → #17B26A + ↑arrow, ≤49 → #D92D20 + ↓arrow, mid → #181D27
    
    3. Action row: flex, gap 12px
       - "ไอเดียใหม่": bg #FEFBE8, border 2px #FEEE95, pill, 8px 10px
         icon magic-wand 20px + text 14px/500 #CA8504
       - "อัพเดทข้อมูล": border 2px #E9EAEB, pill, flex-1, 8px 18px
         text 14px/500 #414651

  After 2 rows of cards: "ดูเพิ่มเติม ↓" text button (16px #535862, chevron-down 24px)

RIGHT PANEL — "ต้องดำเนินการ":
  Width: 258px, height: 749px, border-radius: 12px

  Header section: bg #FEF3F2, border-radius 12px 12px 0 0, padding 12px 16px 8px
    - Count badge: bg #D92D20, border-radius 14px, ~28px, white text 16px/600
    - Title "ต้องดำเนินการ": 18px, weight 600, color #D92D20

  Body: bg #FFFFFF, border-radius 0 0 12px 12px, padding 24px 20px
  
  Per attention item: padding 12px 0, border-bottom 1px #E9EAEB (not last)
    Row 1: flex justify-between
      - Status dot 8px + label 14px/500 (left)
      - Chevron-right 20px (right)
      Status colors:
        Red dot #D92D20: "ได้รับฟีดแบ็กแล้ว"
        Blue dot #0086C9: "รอรีวิว"
        Orange dot #DC6803: "กำลังแพลน"
    
    Row 2: Tags flex wrap gap 7px
      Each: bg white, border 1px #D5D7DA, border-radius 9999px, padding 3px 8px
      12px/400 #414651

    Row 3: timestamp "อัปเดตล่าสุด [date]" 12px/400 #717680

HEADER BAR (top, above panels):
  - Position: absolute top 21px left 304px, width 1104px
  - bg: white, border-radius 12px, padding 23px 20px 16px
  - Left: greeting small + date medium
    - "สวัสดีตอนเช้า, [Name]": 12px/400 #535862
    - Date: 16px/500 #414651
  - Right: 3 action buttons (flex gap 16px)
    สร้างแผนใหม่: bg #F0F9FF, border 2px #B9E6FE, text #0086C9
    แต่งแคปชัน: bg #F4F3FF, border 2px #D9D6FE, text #7A5AF8
    ขอไอเดียใหม่: bg #FEFBE8, border 2px #FEEE95, text #CA8504
    All: height 48px, border-radius 9999px, width 150px, 16px/500

PHASE 2 — After Dashboard approved:
Apply same design system to ALL other pages:
- Same sidebar spec (no changes)
- Same page bg #F2F2F2
- Same white panel cards
- Same font IBM Plex Sans Thai
- Same pill buttons and nav style
- Same color tokens from DESIGN_BIBLE_v2.md

RULES:
1. Explain approach in Thai before writing code
2. List all files you will modify
3. Wait for approval
4. Work file by file
5. One-line summary per file after done
6. Do not start Phase 2 until I approve Phase 1 result
```

---

## PHASE 2 PROMPT (send after Dashboard looks correct)

```
Dashboard is approved. Now apply DESIGN_BIBLE_v2.md to ALL remaining pages.
Keep Dashboard unchanged. Apply same system to:
- Sidebar (already done, just verify consistency)
- Plans (list + wizard steps + open plan)
- Content Tools (all tools)
- Brand Library
- Insights
- Admin
- Ask Panya
- Sign in / Sign up

Same rules: list files first, wait approval, work file by file.
```

---

*Ready to paste to Claude Code — use Phase 1 first, verify, then Phase 2*
