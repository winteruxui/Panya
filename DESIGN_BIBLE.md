# DESIGN BIBLE
**Style:** Modern Friendly White  
**Reference:** Skooldio.com — course browse page  
**Version:** 1.0

---

## 1. Aesthetic Identity

This design language is called **"Approachable Clarity"**.

The interface must feel professional but not intimidating. Smart but not cold. Like a highly competent friend explaining something complex in a way that just makes sense.

**This is NOT:**
- Corporate SaaS (sterile, impersonal)
- Dark dashboard (heavy, technical)
- Minimal brutalism (cold, distant)
- Luxury premium (exclusive, unapproachable)

**This IS:**
- Warm and readable
- Hierarchy-first — the eye knows where to go immediately
- White space is confidence, not emptiness
- Friendly rounded shapes, never sharp or rigid

---

## 2. Color System

### Base Palette

```
--color-bg-base:      #FFFFFF    /* 70%+ of every page */
--color-bg-surface:   #F9FAFB    /* cards, sidebar, alternate sections */
--color-bg-muted:     #F3F4F6    /* hover zones, dividers, input backgrounds */
```

### Text

```
--color-text-primary:    #111827  /* headings, critical labels */
--color-text-secondary:  #6B7280  /* body copy, descriptions */
--color-text-muted:      #9CA3AF  /* placeholders, timestamps, meta info */
--color-text-inverse:    #FFFFFF  /* text on colored/dark backgrounds */
```

### Primary Accent — One color only

```
--color-accent:          #6366F1  /* indigo — CTAs, active states, links */
--color-accent-hover:    #4F46E5
--color-accent-light:    #EEF2FF  /* badge backgrounds, pill fills, subtle highlights */
--color-accent-border:   #C7D2FE  /* accent-toned borders */
```

### Status

```
--color-success:         #10B981
--color-success-light:   #ECFDF5
--color-warning:         #F59E0B
--color-warning-light:   #FFFBEB
--color-error:           #EF4444
--color-error-light:     #FEF2F2
--color-info:            #3B82F6
--color-info-light:      #EFF6FF
```

### Borders

```
--color-border-default:  #E5E7EB  /* standard 1px borders */
--color-border-strong:   #D1D5DB  /* emphasized borders, hover borders */
--color-border-focus:    #6366F1  /* focus rings */
```

### Color Rules — Non-negotiable

- White must cover ≥ 70% of every page
- Never use `#000000` — use `#111827` as the darkest text
- Accent color is used only for: CTAs, active nav, links, focus states, badges — never for decoration
- No gradient backgrounds on hero sections unless explicitly required
- No dark backgrounds as primary theme
- Never more than one accent color family in the same interface

---

## 3. Typography

### Font Stack

```css
font-family: 'Noto Sans Thai', 'Inter', -apple-system, sans-serif;
```

**Why Noto Sans Thai + Inter:** Supports Thai and Latin characters at the same weights, giving consistent rendering across both languages. Feels friendly and readable — not stiff like system fonts.

**Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
```

### Type Scale

```
--text-xs:    12px   /* meta labels, timestamps, tags */
--text-sm:    14px   /* secondary body, table rows, captions */
--text-base:  16px   /* primary body copy */
--text-lg:    18px   /* card titles, section labels */
--text-xl:    22px   /* sub-headings */
--text-2xl:   28px   /* page titles */
--text-3xl:   36px   /* hero headings */
--text-4xl:   48px   /* hero display — use sparingly */
```

### Font Weights

```
400 — body copy, descriptions, general labels
500 — card titles, active nav items, emphasized body
600 — section headings, sub-headings
700 — page titles, hero headings
800 — large number displays, hero text (use very sparingly)
```

### Line Heights

```
--leading-tight:   1.2  /* large headings only */
--leading-snug:    1.3  /* sub-headings */
--leading-normal:  1.5  /* UI labels, card titles */
--leading-relaxed: 1.6  /* body copy — must breathe */
--leading-loose:   1.75 /* long-form reading text */
```

### Typography Rules

- **Strong hierarchy is mandatory.** Looking at a screenshot, the user must instantly know what is most important without reading. If everything looks the same size — fix it.
- Never set entire sections in the same font size
- Never use ALL CAPS for body text or descriptions
- Section titles always paired with a subtitle/subtext in secondary color
- Long-form descriptions: always `text-base` + `leading-relaxed` + `text-secondary`

---

## 4. Spacing System

**Base unit: 4px**

```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
```

### Layout Dimensions

```
--layout-max-width:       1200px   /* content container max */
--layout-padding-x-sm:   24px     /* mobile horizontal padding */
--layout-padding-x-md:   40px     /* tablet */
--layout-padding-x-lg:   48px     /* desktop */
--layout-section-gap:    64px     /* vertical gap between sections */
--layout-section-gap-lg: 80px     /* for hero/feature sections */
--layout-navbar-height:  64px
--layout-sidebar-width:  260px
```

### Spacing Rules

- Section vertical padding: minimum `64px` top and bottom — never less
- Card padding: `20px–24px`
- Card grid gap: `20px–24px`
- Never cram. White space is intentional, not waste.
- Consistent spacing across similar components — if one card has `24px` padding, all cards have `24px`

---

## 5. Border Radius

```
--radius-sm:   6px    /* small inputs, tight badges */
--radius-md:   8px    /* buttons, inputs, small cards */
--radius-lg:   12px   /* standard cards, image thumbnails */
--radius-xl:   16px   /* large cards, modal panels */
--radius-2xl:  20px   /* feature cards, hero sections */
--radius-full: 9999px /* pills, tags, avatars, toggle switches */
```

**Rule:** Nothing in the UI should have border-radius less than `6px`. Sharp corners feel aggressive and unfriendly.

---

## 6. Shadows

Shadows are used sparingly. Depth comes from borders + subtle shadow, not heavy elevation.

```
--shadow-xs:  0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)
--shadow-md:  0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)
--shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.10), 0 4px 8px rgba(0, 0, 0, 0.04)
--shadow-xl:  0 16px 40px rgba(0, 0, 0, 0.12)
```

**Shadow Rules:**
- Default card: `shadow-sm` + `1px border`
- Card on hover: lift to `shadow-md`
- Dropdown menus and tooltips: `shadow-lg`
- Modals: `shadow-xl`
- Never use `shadow-xl` on cards in a list — it creates visual noise
- No colored shadows

---

## 7. Components

### 7.1 Card

The card is the most important component in this design system. It must feel light and inviting.

```css
/* Base card */
background:    var(--color-bg-base);
border:        1px solid var(--color-border-default);
border-radius: var(--radius-lg);        /* 12px */
padding:       var(--space-6);          /* 24px */
box-shadow:    var(--shadow-sm);
transition:    all 200ms ease;

/* Hover state — mandatory on all clickable cards */
border-color:  var(--color-border-strong);
box-shadow:    var(--shadow-md);
transform:     translateY(-2px);
```

**Card Anatomy (standard content card):**
```
[Thumbnail image — border-radius: 10px, aspect-ratio: 16/9]
[Tag/Badge — pill shape, accent-light bg]
[Card Title — text-lg, weight 600, text-primary]
[Card Description — text-sm, weight 400, text-secondary, 2 lines max]
[Footer row — meta info left / CTA or price right]
```

### 7.2 Button

**Primary Button:**
```css
background:    var(--color-accent);
color:         var(--color-text-inverse);
font-weight:   600;
font-size:     15px;
padding:       12px 24px;
border-radius: var(--radius-md);
border:        none;
transition:    all 150ms ease;

/* Hover */
background:    var(--color-accent-hover);
transform:     translateY(-1px);
box-shadow:    var(--shadow-sm);

/* Active */
transform:     translateY(0);

/* Disabled */
opacity:       0.5;
cursor:        not-allowed;
transform:     none;
```

**Secondary Button:**
```css
background:    var(--color-bg-base);
color:         var(--color-text-primary);
font-weight:   500;
border:        1.5px solid var(--color-border-default);
padding:       11px 24px;
border-radius: var(--radius-md);

/* Hover */
border-color:  var(--color-accent);
color:         var(--color-accent);
```

**Ghost / Text Button:**
```css
background:    transparent;
color:         var(--color-accent);
font-weight:   500;
padding:       8px 16px;
border:        none;

/* Hover */
background:    var(--color-accent-light);
```

**Button Sizes:**
```
sm:   padding 8px 16px,  font-size 13px, height 32px
md:   padding 12px 24px, font-size 15px, height 40px  /* default */
lg:   padding 14px 32px, font-size 16px, height 48px
```

### 7.3 Badge / Tag / Pill

```css
/* Default pill */
background:    var(--color-bg-muted);
color:         var(--color-text-secondary);
font-size:     12px;
font-weight:   500;
padding:       4px 10px;
border-radius: var(--radius-full);
display:       inline-flex;
align-items:   center;
gap:           4px;

/* Accent variant */
background:    var(--color-accent-light);
color:         var(--color-accent);

/* Success variant */
background:    var(--color-success-light);
color:         var(--color-success);

/* Warning variant */
background:    var(--color-warning-light);
color:         var(--color-warning);

/* Error variant */
background:    var(--color-error-light);
color:         var(--color-error);
```

### 7.4 Input / Form Field

```css
background:    var(--color-bg-base);
border:        1.5px solid var(--color-border-default);
border-radius: var(--radius-md);
padding:       10px 14px;
font-size:     15px;
color:         var(--color-text-primary);
transition:    border-color 150ms ease, box-shadow 150ms ease;

/* Placeholder */
color:         var(--color-text-muted);

/* Focus */
border-color:  var(--color-border-focus);
box-shadow:    0 0 0 3px var(--color-accent-light);
outline:       none;

/* Error */
border-color:  var(--color-error);
box-shadow:    0 0 0 3px var(--color-error-light);

/* Disabled */
background:    var(--color-bg-surface);
color:         var(--color-text-muted);
cursor:        not-allowed;
```

### 7.5 Navigation Bar

```css
/* Navbar container */
background:       var(--color-bg-base);
border-bottom:    1px solid var(--color-border-default);
height:           var(--layout-navbar-height); /* 64px */
padding:          0 48px;
display:          flex;
align-items:      center;
position:         sticky;
top:              0;
z-index:          100;

/* Nav item */
color:            var(--color-text-secondary);
font-size:        15px;
font-weight:      500;
padding:          4px 2px;
transition:       color 150ms ease;

/* Nav item hover */
color:            var(--color-text-primary);

/* Nav item active */
color:            var(--color-accent);
/* + bottom border */
border-bottom:    2px solid var(--color-accent);
```

### 7.6 Sidebar / Filter Panel

```css
background:    var(--color-bg-surface);
border-right:  1px solid var(--color-border-default);
width:         var(--layout-sidebar-width); /* 260px */
padding:       24px 20px;

/* Filter section title */
font-size:     12px;
font-weight:   600;
color:         var(--color-text-muted);
text-transform: uppercase;
letter-spacing: 0.05em;
margin-bottom: 12px;

/* Filter option */
font-size:     14px;
font-weight:   400;
color:         var(--color-text-secondary);
padding:       6px 8px;
border-radius: var(--radius-sm);
cursor:        pointer;

/* Filter option hover */
background:    var(--color-bg-muted);
color:         var(--color-text-primary);

/* Filter option active/selected */
background:    var(--color-accent-light);
color:         var(--color-accent);
font-weight:   500;
```

### 7.7 Divider

```css
border: none;
border-top: 1px solid var(--color-border-default);
margin: var(--space-6) 0;
```

---

## 8. Section Anatomy

Every section on a page follows this structure:

```
[Section Eyebrow]   ← optional: 12px, accent color, weight 600, uppercase, letter-spacing
[Section Title]     ← text-2xl to text-3xl, weight 700, text-primary
[Section Subtitle]  ← text-base, weight 400, text-secondary, max-width 560px
[Content]
```

**Example:**
```html
<div class="section">
  <span class="eyebrow">COURSES</span>
  <h2 class="section-title">All Online Courses</h2>
  <p class="section-subtitle">
    Learn new skills from industry experts at your own pace.
  </p>
  <div class="card-grid">
    <!-- cards -->
  </div>
</div>
```

```css
.section {
  padding: var(--space-16) 0; /* 64px vertical */
}

.eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 8px;
}

.section-title {
  font-size: var(--text-2xl); /* 28px */
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 12px;
  line-height: var(--leading-tight);
}

.section-subtitle {
  font-size: var(--text-base);
  font-weight: 400;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  max-width: 560px;
  margin-bottom: var(--space-8);
}
```

---

## 9. Grid Layouts

### Card Grid

```css
.card-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, 1fr); /* desktop */
}

/* Tablet */
@media (max-width: 1024px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile */
@media (max-width: 640px) {
  .card-grid { grid-template-columns: 1fr; }
}
```

### Sidebar + Content Layout

```css
.page-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 40px;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 var(--layout-padding-x-lg);
}

@media (max-width: 768px) {
  .page-layout {
    grid-template-columns: 1fr;
  }
}
```

---

## 10. Motion & Transitions

```
--duration-fast:    100ms   /* hover color changes */
--duration-base:    150ms   /* most interactive states */
--duration-slow:    200ms   /* card hover, panel reveal */
--duration-xslow:   300ms   /* page transitions, modal open */

--easing-default:   ease
--easing-in-out:    cubic-bezier(0.4, 0, 0.2, 1)
--easing-spring:    cubic-bezier(0.34, 1.56, 0.64, 1)  /* bouncy — for success states */
```

**Motion Rules:**
- Never animate on page load if it delays content visibility
- Card hover: `transform translateY(-2px)` + shadow lift, `200ms ease`
- Button hover: `translateY(-1px)`, `150ms ease`
- All color changes: `150ms ease`
- Skeleton loading: shimmer animation `1.5s infinite linear`
- No animation should feel gratuitous — if it doesn't help, remove it

---

## 11. Image Treatment

```css
/* All thumbnails and content images */
border-radius: var(--radius-lg); /* 12px */
object-fit:    cover;
display:       block;

/* Standard card thumbnail ratio */
aspect-ratio:  16 / 9;

/* Avatar */
border-radius: var(--radius-full);
object-fit:    cover;
```

**Image Rules:**
- All thumbnails must have `border-radius: 12px` — no sharp-cornered images
- Use `aspect-ratio` to prevent layout shift
- Lazy load all images below the fold
- Broken image state: show a placeholder with `--color-bg-muted` background + icon

---

## 12. Accessibility Standards

- All interactive elements must have `focus-visible` states using `--color-border-focus`
- Minimum touch target size: `44×44px`
- Color contrast: text on white must meet WCAG AA (4.5:1 for body, 3:1 for large text)
- Never convey meaning through color alone — always pair with icon or label
- All form inputs must have visible labels (no placeholder-only fields)
- Focus ring:
```css
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

---

## 13. Responsive Breakpoints

```
--breakpoint-sm:   640px   /* mobile landscape, small tablet */
--breakpoint-md:   768px   /* tablet */
--breakpoint-lg:   1024px  /* small desktop */
--breakpoint-xl:   1280px  /* standard desktop */
--breakpoint-2xl:  1536px  /* large desktop */
```

**Approach:** Mobile-first. Write base styles for 375px, then override upward.

---

## 14. What NOT to Do

These are hard rules. No exceptions.

| ❌ Never | ✅ Instead |
|---|---|
| Dark backgrounds as primary theme | White (`#FFFFFF`) or near-white (`#F9FAFB`) |
| `border-radius: 0–4px` on cards/buttons | Minimum `6px`, standard `12px` |
| Multiple accent colors | One accent family only (indigo `#6366F1`) |
| Same font size for heading and body | Strong size hierarchy — 12px to 36px scale |
| ALL CAPS body text | Reserve uppercase for eyebrow labels only |
| Heavy box shadows on list cards | `shadow-sm` default, `shadow-md` on hover |
| `#000000` black | Use `#111827` as darkest |
| Gradient decorative backgrounds | Flat white with purposeful color sections |
| No hover states on clickable cards | Every clickable card must have hover feedback |
| Placeholder-only form labels | Always show a visible `<label>` element |
| Icon buttons with no label | Always pair icon with label text |

---

## 15. Quick Prompt for Claude Code

Use this as a starting prompt when asking Claude Code to apply this design:

> "Apply the DESIGN_BIBLE.md design system to this UI. Key rules: white-dominant (#FFFFFF base, #F9FAFB surface), single indigo accent (#6366F1), Noto Sans Thai + Inter font stack, strong typography hierarchy (12px meta to 36px hero), all cards with 12px border-radius + subtle shadow + translateY(-2px) hover, generous section spacing (64px+), pill-shaped badges, no dark backgrounds, no multiple accent colors. All values must use CSS custom properties defined in the design system — no hardcoded hex values in components."

---

*DESIGN_BIBLE.md — v1.0*  
*Reference: Skooldio.com — Approachable Clarity design language*
