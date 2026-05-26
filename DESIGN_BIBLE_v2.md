# DESIGN BIBLE v2
**Brand:** Panya  
**Version:** 2.0 — Based on Figma reference (node 86:281)  
**Status:** Active — replaces DESIGN_BIBLE.md v1

---

## 1. Brand Identity

### Logo Files

| File | Usage |
|---|---|
| `logo-normal.svg` | Default — orange icon + black wordmark. Use on white/light backgrounds |
| `logo-orange.svg` | All orange — icon + wordmark. Use on white backgrounds, secondary usage |
| `logo-white.svg` | All white — icon + wordmark. Use on dark/colored backgrounds |
| `logo-black.svg` | All black — icon only (no wordmark). Use on light backgrounds when minimal |
| `logo-icon-only.svg` | Icon only (spiral mark). Use for favicons, avatars, loading states |

### Logo Usage Rules
- Sidebar: use `logo-normal.svg`, scale to height 28px
- Never distort, recolor, or apply effects to logo
- Minimum clear space: 8px on all sides
- Never place logo on busy backgrounds

### Brand Mark
The Panya logo mark is a spiral/swirl shape — organic, flowing, unique. It represents the intelligence loop concept at the core of the product.

---

## 2. Color System

### Core Palette

```css
/* Page & Layout */
--color-bg-page:       #F2F2F2   /* outer page background — always this, never white */
--color-bg-surface:    #FFFFFF   /* cards, panels, sidebar */
--color-bg-muted:      #F5F5F5   /* brand cards, secondary surfaces */
--color-bg-elevated:   #FAFAFA   /* user row, secondary elements */

/* Text */
--color-text-primary:     #181D27  /* headings, strong labels */
--color-text-secondary:   #414651  /* body text, dates */
--color-text-tertiary:    #535862  /* section labels, nav items */
--color-text-muted:       #717680  /* timestamps, placeholders, captions */
--color-text-white:       #FFFFFF  /* text on colored backgrounds */

/* Brand / Primary */
--color-brand:            #E96B38  /* primary orange — CTAs, active states, logo */
--color-brand-dark:       #DC6803  /* darker orange — active nav text */
--color-brand-bg:         #FDF0EB  /* brand tint — active nav background */
--color-brand-border:     #FF956A  /* brand border for gradient buttons */

/* Borders */
--color-border-default:   #D5D7DA  /* standard borders, tag borders */
--color-border-secondary: #E9EAEB  /* subtle dividers, card separators */

/* Status — Success */
--color-success:          #17B26A
--color-success-bg:       #ECFDF5

/* Status — Error */
--color-error:            #D92D20
--color-error-bg:         #FEF3F2  /* Needs Attention panel background */
--color-error-border:     #FECDCA

/* Status — Warning */
--color-warning:          #DC6803
--color-warning-bg:       #FFFAEB  /* score circle background */
--color-warning-score:    #F79009  /* AVG score number color */

/* Accent — Blue Light (สร้างแผนใหม่) */
--color-blue:             #0086C9
--color-blue-bg:          #F0F9FF
--color-blue-border:      #B9E6FE

/* Accent — Purple (แต่งแคปชัน) */
--color-purple:           #7A5AF8
--color-purple-bg:        #F4F3FF
--color-purple-border:    #D9D6FE

/* Accent — Yellow (ขอไอเดียใหม่ / ไอเดียใหม่) */
--color-yellow:           #CA8504
--color-yellow-bg:        #FEFBE8
--color-yellow-border:    #FEEE95
```

### Color Usage Rules
- **Page background is always `#F2F2F2`** — never full white page
- Cards and panels float on this gray with `#FFFFFF` background
- Brand orange `#E96B38` is used for: active nav, primary CTAs, logo, key accents
- Each quick action has its own accent color (blue/purple/yellow) — do not mix
- Avoid using brand orange for destructive/error states — use red

---

## 3. Typography

### Font Stack

```css
font-family: 'IBM Plex Sans Thai', 'IBM Plex Sans', -apple-system, sans-serif;
```

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap');
```

**Why IBM Plex Sans Thai:** Used in the Figma design system. Renders Thai and Latin characters with consistent weight and excellent screen legibility. Professional but approachable.

### Type Scale

```css
--text-xs:       12px   /* timestamps, meta labels, captions */
--text-sm:       14px   /* secondary body, table rows, tags */
--text-md:       16px   /* primary body, nav items, buttons */
--text-lg:       18px   /* section titles, card headings */
--text-xl:       20px   /* metric numbers in cards */
--text-display-xs: 24px /* panel titles (ภาพรวมปัจจุบัน) */
--text-display-sm: 30px /* large panel numbers */
--text-display-md: 36px /* hero metric numbers (score circle) */
```

### Font Weights

```css
--weight-regular:  400   /* body, timestamps, descriptions */
--weight-medium:   500   /* nav items, metric numbers, button text */
--weight-semibold: 600   /* panel titles, card brand names, CTAs */
--weight-bold:     700   /* logo wordmark only */
```

### Line Heights

```css
--leading-xs:  18px  /* for text-xs */
--leading-sm:  20px  /* for text-sm */
--leading-md:  24px  /* for text-md */
--leading-lg:  28px  /* for text-lg */
--leading-xl:  30px  /* for text-xl */
--leading-display-xs: 32px
--leading-display-sm: 38px
--leading-display-md: 44px
```

---

## 4. Spacing

**Base unit: 4px**

```css
--space-none:  0px
--space-xxs:   2px
--space-xs:    4px
--space-sm:    6px
--space-md:    8px
--space-lg:    12px
--space-xl:    16px
--space-2xl:   20px
--space-3xl:   24px
--space-4xl:   32px
--space-5xl:   40px
```

### Layout Dimensions

```css
--sidebar-width:       272px
--content-padding-x:   20px   /* inside white content panels */
--content-padding-y:   20px
--card-padding:        16px 12px
--section-gap:         24px   /* between major sections */
--item-gap:            8px    /* between items in a list */
```

---

## 5. Border Radius

```css
--radius-sm:   6px    /* tags, small badges */
--radius-md:   8px    /* inputs */
--radius-lg:   12px   /* cards, brand cards, panels */
--radius-xl:   12px   /* main content panel, sidebar */
--radius-full: 9999px /* nav items (active pill), buttons, user row, tags */
```

**Critical rule:** Nav active state, action buttons, and user row bottom — all use `border-radius: 9999px` (pill shape). This is the most distinctive visual pattern of this design.

---

## 6. Shadows

Used minimally. The design uses background contrast (gray page / white panels) instead of heavy shadows.

```css
--shadow-none:  none
--shadow-glow:  0 0 2.9px #FFA600   /* "Panya สรุปให้" button glow only */
```

No standard box-shadows on cards. Depth comes from bg color difference between `#F2F2F2` page and `#FFFFFF` cards.

---

## 7. Component Specifications

### 7.1 Sidebar

```
Width: 272px
Background: #FFFFFF
Border-radius right: 12px (rounded-br-xl, rounded-tr-xl)
Padding: 40px 12px 24px 12px

Logo area:
  - SVG logo-normal.svg, height 28px
  - No text next to logo (logo SVG includes wordmark)

Section label ("เครื่องมือ"):
  - font-size: 12px, weight: 400, color: #717680
  - padding: 10px 10px, height: 32px
  - uppercase, no letter-spacing increase needed (Thai)

Nav item default:
  - padding: 10px
  - height: 40px
  - border-radius: 9999px
  - font-size: 16px, weight: 500, color: #535862
  - icon: 20px, color matches text

Nav item active (current page):
  - background: #FDF0EB
  - text color: #DC6803 (brand-dark)
  - font-weight: 600
  - icon color: #DC6803

Nav badge (e.g. Plans count):
  - background: #FAFAFA
  - border: 1px solid #E9EAEB
  - border-radius: 9999px
  - padding: 2px 8px
  - font-size: 12px, weight: 500, color: #414651

Nav item gap: 0 (items stack with no gap — padding handles spacing)

User row (bottom):
  - background: #FAFAFA
  - border-radius: 9999px
  - padding: 6px 10px
  - Avatar: 30px circle, bg #F5F5F5, initial letter, font-weight: 600
  - Email: font-size: 14px, weight: 500, color: #181D27
  - Role: font-size: 12px, weight: 400, color: #535862
  - Chevron: 20px icon, right side

Collapse button (optional):
  - Small orange pill with left-chevron icon
  - Position: absolute, top edge of sidebar, right side
  - Background: #E96B38, padding: 6px, border-radius: 9999px
```

### 7.2 Page Layout

```
Outer: background #F2F2F2, full viewport
Sidebar: fixed left, 272px
Content area: starts at 304px (272 + 32px gap from sidebar)
Content panels: bg #FFFFFF, border-radius: 12px
Content gap: 24px between columns/sections
```

### 7.3 Action Buttons (Quick Actions / Header)

Three distinct color-coded pill buttons, each 150px × 48px:

```
สร้างแผนใหม่:
  bg: #F0F9FF, border: 2px solid #B9E6FE, text: #0086C9
  icon: plus-square (24px, same color)

แต่งแคปชัน:
  bg: #F4F3FF, border: 2px solid #D9D6FE, text: #7A5AF8
  icon: file-search (24px, same color)

ขอไอเดียใหม่:
  bg: #FEFBE8, border: 2px solid #FEEE95, text: #CA8504
  icon: magic-wand (24px, same color)

All three:
  height: 48px, border-radius: 9999px, padding: 8px 18px
  font-size: 16px, font-weight: 500
  gap between icon and text: 6px
  overflow: hidden
```

### 7.4 "Panya สรุปให้" Special Button

```
background: linear-gradient(-32.64deg, #E96B38 46.62%, #FFAF8E 83.26%)
border: 2px solid #FF956A
border-radius: 9999px
filter: drop-shadow(0 0 2.9px #FFA600)
height: 40px, padding: 8px 18px
text: white, font-size: 16px, font-weight: 600
icon: logo-white.svg icon mark, 20px (logo-icon-only.svg with white fill)
```

### 7.5 Brand Cards

Each brand has its own card on the overview section:

```
Outer card:
  background: #F5F5F5
  border-radius: 12px
  padding: 12px 16px
  display: flex, flex-col, gap: 12px

Header row (brand identity):
  background: #FFFFFF
  border-radius: 9999px
  padding: 2px
  display: flex, justify-between, align-items: center
  
  Avatar: 40px circle, brand avatar image, border: 1px solid rgba(0,0,0,0.08)
  Brand name: font-size: 16px, weight: 600, color: #181D27
  Chevron-right: 20px icon, color: #535862

Stats row:
  border-top: 1px solid #E9EAEB
  border-bottom: 1px solid #E9EAEB
  padding: 4px 0
  display: flex, 2 columns equal width

  Per metric:
    Number: font-size: 20px, weight: 500
    Label: font-size: 12px, weight: 400, color: #717680
    Alignment: center

  Score colors:
    High (≥75): #17B26A + ↑ arrow (success green)
    Low (<50):  #D92D20 + ↓ arrow (error red)
    Neutral:    #181D27 (no arrow)

Action row:
  display: flex, gap: 12px

  ไอเดียใหม่ button:
    bg: #FEFBE8, border: 2px solid #FEEE95
    border-radius: 9999px, padding: 8px 10px
    text: #CA8504, font-size: 14px, weight: 500
    icon: magic-wand 20px

  อัพเดทข้อมูล button:
    border: 2px solid #E9EAEB
    border-radius: 9999px, flex: 1, padding: 8px 18px
    text: #414651, font-size: 14px, weight: 500
```

### 7.6 Needs Attention Panel

```
Container:
  width: 258px (right panel)
  border-radius: 12px top

Header:
  background: #FEF3F2
  border-radius: 12px 12px 0 0
  padding: 12px 16px 8px
  display: flex, gap: 8px, align-items: center

  Count badge:
    background: #D92D20
    border-radius: 14px
    size: ~28px
    text: white, font-size: 16px, weight: 600

  Title "ต้องดำเนินการ":
    font-size: 18px, weight: 600, color: #D92D20

Body:
  background: #FFFFFF
  border-radius: 0 0 12px 12px
  padding: 24px 20px
  overflow-y: auto

Per attention item:
  padding: 12px 0
  border-bottom: 1px solid #E9EAEB (except last item)
  display: flex, flex-col, gap: 12px

  Status row:
    display: flex, justify-between, align-items: center
    
    Status dot: 8px circle
      red dot (#D92D20): ได้รับฟีดแบ็ก
      blue dot (#0086C9): รอรีวิว
      orange dot (#DC6803): กำลังแพลน
    
    Status label: font-size: 14px, weight: 500, color matches dot
    Chevron-right: 20px

  Tags row:
    display: flex, gap: 7px, flex-wrap: wrap

    Each tag:
      bg: #FFFFFF
      border: 1px solid #D5D7DA
      border-radius: 9999px
      padding: 3px 8px
      font-size: 12px, weight: 400 (medium in Figma = medium), color: #414651

  Timestamp:
    font-size: 12px, weight: 400, color: #717680
```

### 7.7 Overview Stats Bar

Inside the left panel, above brand cards:

```
Container:
  border-top: 1px solid #E9EAEB
  border-bottom: 1px solid #E9EAEB
  display: flex, 4 columns equal width
  padding: 4px 0

AVG Score column:
  Score circle: 84px diameter, bg: #FFFAEB, border-radius: 9999px
  Number inside: font-size: 36px, weight: 600, color: #F79009, tracking: -0.72px
  Label: font-size: 14px, weight: 400, color: #717680

Growth column:
  Number: font-size: 36px, weight: 400, color: #17B26A, tracking: -0.72px
  Arrow-up icon: 24px, same color
  Label: font-size: 14px, color: #717680

Other columns (brands / campaigns count):
  Number: font-size: 36px, weight: 400, color: #535862
  Label: font-size: 14px, color: #717680
```

### 7.8 Tags / Pills

```
Default tag:
  bg: #FFFFFF, border: 1px solid #D5D7DA
  border-radius: 9999px
  padding: 3px 8px
  font-size: 12px, weight: 400–500, color: #414651

Status badge (on plans list):
  bg: color-specific (see status system)
  border-radius: 9999px
  padding: 2px 8px
  font-size: 12px, weight: 500
```

### 7.9 Standard Buttons

```
Primary (solid brand):
  bg: #E96B38, text: white
  border-radius: 9999px, height: 40px
  font-size: 16px, weight: 600, padding: 8px 18px
  hover: bg darken 8%

Secondary (outline):
  bg: white, border: 1px solid #D5D7DA
  border-radius: 9999px, height: 40px
  font-size: 16px, weight: 600, color: #414651
  hover: border-color #535862

Icon + text (like เพิ่มแบรนด์, จัดการแบรนด์):
  Same as secondary, gap: 6px between icon and text
  Icon: 20–24px
```

---

## 8. Status System (Plan Status)

| Status | Thai Label | Color | Dot Color |
|---|---|---|---|
| Planning | กำลังแพลน | #DC6803 | Orange |
| Waiting Review | รอรีวิว | #0086C9 | Blue |
| Got Feedback | ได้รับฟีดแบ็ก | #D92D20 | Red |
| Complete | เสร็จแล้ว | #17B26A | Green |

---

## 9. Logo Usage in Sidebar

```jsx
/* Sidebar logo — use logo-normal.svg */
<img src="/assets/logo-normal.svg" alt="Panya" style={{ height: '28px' }} />

/* White variant — for dark backgrounds */
<img src="/assets/logo-white.svg" alt="Panya" style={{ height: '28px' }} />

/* Icon only — for Panya สรุปให้ button */
<img src="/assets/logo-icon-only.svg" alt="" style={{ width: '20px', filter: 'brightness(0) invert(1)' }} />
```

Copy SVG files to `public/assets/` or `src/assets/`:
- `logo-normal.svg` → sidebar default
- `logo-white.svg` → sidebar on dark, loading screens
- `logo-orange.svg` → marketing, email headers
- `logo-black.svg` → print, monochrome
- `logo-icon-only.svg` → favicon, "Panya สรุปให้" button, loading spinner

---

## 10. Motion

```css
--duration-fast:   100ms  /* hover color changes */
--duration-base:   150ms  /* most UI interactions */
--duration-slow:   200ms  /* panel slide, modal open */
--easing-default:  ease
--easing-smooth:   cubic-bezier(0.4, 0, 0.2, 1)
```

Transitions used:
- Nav item hover: color transition 150ms
- Card hover: border-color 150ms (no transform — clean, flat aesthetic)
- Dropdown open: fade + slight translateY, 200ms

---

## 11. Do's and Don'ts

### ✅ Do
- Use `#F2F2F2` as the page background always
- Use pill shape (`border-radius: 9999px`) for nav items, buttons, tags, user row
- Use IBM Plex Sans Thai for all text
- Use brand orange `#E96B38` for active states and primary CTAs
- Keep Quick Action buttons color-coded (blue / purple / yellow)
- Use `#F5F5F5` muted background for brand cards
- Show score numbers in appropriate colors (green/red/neutral)
- Keep the sidebar clean — no heavy borders or extra decorations

### ❌ Don't
- Don't use a white page background — always use `#F2F2F2`
- Don't use `border-radius: 0–8px` for nav items or action buttons — must be pill
- Don't mix the three quick action colors (blue/purple/yellow)
- Don't add box-shadow to cards — use bg contrast instead
- Don't use old font stack (Noto Sans Thai / Inter) — IBM Plex Sans Thai only
- Don't add uppercase letter-spacing to Thai nav labels
- Don't use heavy gradients except for the "Panya สรุปให้" special button
- Don't show logo as text — always use the SVG file

---

## 12. Claude Code Prompt — One-liner

> "Apply DESIGN_BIBLE_v2.md to all frontend files. Use IBM Plex Sans Thai font, #F2F2F2 page background, #FFFFFF cards, #E96B38 brand orange, pill-shaped nav items and buttons (border-radius: 9999px), and the sidebar spec exactly as documented. Use logo files from /assets/: logo-normal.svg in sidebar, logo-white.svg on dark backgrounds, logo-icon-only.svg for the Panya button. List all files first, wait for approval."

---

*DESIGN_BIBLE_v2.md — Panya 2.0 — Extracted from Figma node 86:281*
