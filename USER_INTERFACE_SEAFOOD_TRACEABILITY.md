# User Interface Style Guide

This guide captures the reusable UI direction for a seafood traceability platform. Use it when adding new pages, redesigning existing screens, or giving instructions to another AI/code generator.

## Product Feel

The interface should feel trustworthy, transparent, ocean-inspired, modern, and operationally efficient. It supports two related experiences:

- Public seafood traceability pages: polished and credible, with easy batch lookup, QR verification, provenance history, and clear trust signals.
- Operations dashboards: calm, compact, scan-friendly, and built for repeated batch, vessel, catch, processing, shipment, and verification workflows.

Avoid playful, overly decorative, or marketing-heavy layouts for operations screens. For public pages, visual richness is welcome, but product identity, origin, traceability evidence, and the verification path should stay central.

## Core Brand

Use `#0B2658` as the primary brand color and `#1558D6` as the secondary brand color. White, soft slate, and subtle blue-tinted backgrounds should carry most of the interface. Supporting colors can change by service domain, but they should stay clean, high-contrast, and secondary to the main blue.

Primary colors:

```css
:root {
  --brand-blue: #0B2658;
  --brand-blue-secondary: #1558D6;
  --brand-white: #FFFFFF;
  --surface: #F8F9FA;
  --surface-soft: #F6F8FF;
  --text: #191C1D;
  --text-muted: #444656;
  --border-soft: #C5C5D9;
}
```

Supporting colors:

```css
:root {
  --success: #10B981;
  --verified-green: #16A34A;
  --ocean-cyan: #0EA5E9;
  --teal: #006D5B;
  --indigo: #4F46E5;
  --warning: #F59E0B;
  --danger: #EF4444;
  --accent-coral: #F25A5A;
}
```

Use color roles consistently:

- Navy `#0B2658`: primary buttons, headers, active navigation, prominent titles, and brand foundations.
- Bright blue `#1558D6`: secondary buttons, links, active filters, section accents, and interactive highlights.
- Green `#16A34A` or `#10B981`: verified batches, passed inspections, compliant records, and successful traceability checks.
- Cyan `#0EA5E9`: ocean-related information, traceability milestones, and informational highlights.
- Teal `#006D5B`: suppliers, fishing vessels, cold-chain operations, and secondary workflow sections.
- Indigo `#4F46E5`: certifications, advanced analytics, and specialized workflows.
- Amber `#F59E0B`: pending verification, missing documentation, temperature alerts, and review-required records.
- Red `#EF4444` or coral `#F25A5A`: failed inspections, recalls, destructive actions, and urgent safety warnings.
- Slate/gray: quiet metadata, table labels, borders, inactive navigation.

Do not create pages dominated by a single flat blue panel. Prefer white surfaces with blue accents, or soft blue backgrounds with white cards.

## Typography

Use `Be Vietnam Pro` everywhere.

```html
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
```

Fallback:

```css
font-family: "Be Vietnam Pro", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
```

Typography rules:

- Page titles: bold or extra-bold, compact, usually `text-lg` to `text-2xl` in admin pages.
- Public landing titles: larger and more assertive, used for seafood product identity or provenance storytelling.
- Labels and table headers: small, semibold/bold, often uppercase with generous tracking.
- Body copy: readable, line-height around `1.6` to `1.8`.
- Metadata: `text-xs` or `text-[11px]`, slate color, semibold.

Avoid negative letter spacing. Keep text practical and readable, especially for bilingual English/Vietnamese labels.

## Layout Principles

Use a clean, spacious layout with predictable navigation.

Operations/dashboard layout:

- Fixed left sidebar, width `w-72`.
- Sticky top header, height around `h-20`, glass white background.
- Main content padding around `p-4`.
- Cards and tables should align to a simple grid and use compact spacing.
- Use horizontal scrolling for wide tables instead of compressing content.

Public traceability layout:

- Sticky top navigation with white or blue brand treatment.
- Full-width content with responsive padding: `px-4 sm:px-6 lg:px-10 xl:px-16`.
- Main content can use `grid grid-cols-1 lg:grid-cols-3 gap-8`, with a sidebar for batch details, chain-of-custody timeline, or product filters.
- Hero/carousel imagery should be real seafood, fishing vessels, harbors, processing facilities, or supply-chain imagery when available.

Auth layout:

- Centered card over image or soft radial background.
- Glass or white card, max width around `420px`.
- Simple vertical form flow.

## Surfaces

Default page background:

```css
background: #F8F9FA;
color: #191C1D;
```

Public content background can use:

```css
background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 34%, #f7f9ff 100%);
```

Preferred cards:

```html
<section class="bg-white rounded-2xl shadow-sm border border-outline-variant/20 p-5">
  ...
</section>
```

Use these surface styles:

- Operations cards: `bg-white rounded-2xl shadow-sm border border-outline-variant/20`.
- Form sections: `bg-white` or very light slate, `rounded-xl` or `rounded-2xl`, subtle border.
- Landing-page cards: soft blue-tinted gradient, gentle shadow, brand-colored top/left accent.
- Toasts and headers: white with blur, translucent border, soft shadow.

Avoid deeply nested cards. If content is already inside a card, use dividers, rows, or light tinted strips instead of another heavy card.

## Radius, Borders, Shadows

Current UI prefers rounded but not bubbly.

- Buttons: `rounded-lg` or `rounded-xl`.
- Cards: `rounded-xl` or `rounded-2xl`.
- Pills/badges: `rounded-full`.
- Avatars/icons: circular or rounded square depending on context.
- Borders: `border-outline-variant/10` to `/30`, or `border-slate-100`.
- Shadows: use `shadow-sm`, `shadow-md`, or soft custom shadows. Avoid harsh black shadows.

Reusable shadows:

```css
--shadow-soft: 0 8px 22px rgba(0, 0, 0, 0.08);
--shadow-elevated: 0 14px 34px rgba(6, 22, 86, 0.18);
```

## Buttons

Primary action:

```html
<button class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary">
  <span class="material-symbols-outlined text-[18px]">add_circle</span>
  New Batch
</button>
```

Button rules:

- Include Material Symbols icons for clear actions.
- Use blue for primary traceability and operations actions.
- Use green for verified, compliant, success, and positive completion actions.
- Use red only for destructive or urgent actions.
- Use icon-only buttons for compact controls like close, previous, next, fullscreen, menu.
- Keep disabled buttons visibly dimmed: `disabled:opacity-50 disabled:cursor-not-allowed`.
- Add `active:scale-95` only for direct interaction controls where it feels natural.

Secondary buttons:

```html
<button class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 transition-colors">
  <span class="material-symbols-outlined text-[20px]">add_circle</span>
  Add Supplier
</button>
```

## Forms

Forms should be clear, calm, and easy to scan.

Input style:

```html
<input class="w-full rounded-lg bg-slate-50 border border-outline-variant/20 px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all" />
```

Form rules:

- Labels use `text-sm font-semibold text-on-surface-variant mb-2`.
- Required markers use red: `<span class="text-red-500">*</span>`.
- Inputs should have a light background and clear focus ring.
- Group related fields in white sections with headings and icons.
- Use dashed borders for upload zones.
- Use segmented controls for mode switches such as "Wild-caught" vs "Farmed", "Verified" vs "Pending", or "Batch" vs "Shipment".

Upload zone pattern:

```html
<div class="bg-white p-5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/50 transition-all group">
  ...
</div>
```

## Navigation

Operations/sidebar navigation:

- Sidebar background: white.
- Active item: `bg-blue-50 text-primary rounded-xl font-semibold shadow-sm`.
- Inactive item: slate text, hover `bg-slate-50`.
- Section labels: tiny uppercase slate labels with tracking.
- Use Material Symbols for every navigation item.

Public navigation:

- Sticky top bar with white translucent background or blue gradient for legacy landing pages.
- Links are small, semibold, and vertically centered.
- Dropdowns are white, rounded, shadowed, and use hover slate backgrounds.
- The "Trace product" or "Verify batch" action should stand out in navy or bright blue. Reserve green for confirmed verification results.

Mobile:

- Collapse nav into a menu button.
- Use full-width stacked links.
- Dropdowns become `details` groups or vertically stacked sections.

## Tables and Lists

Tables should prioritize scanning.

Table pattern:

```html
<div class="bg-white rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full min-w-[1000px] text-left border-separate border-spacing-0 bg-white">
      ...
    </table>
  </div>
</div>
```

Rules:

- Header cells: `text-[11px] font-black uppercase tracking-[0.2em] text-outline`.
- Rows: generous vertical padding, subtle dividers, hover `bg-slate-50`.
- Statuses use small uppercase pill badges with border.
- IDs can use monospace, small blue pill style.
- Keep action buttons compact and right-aligned.

## Badges and Status

Badge base:

```html
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase border">
  Status
</span>
```

Use:

- Blue badge: informational or primary.
- Green badge: success/approved/complete.
- Amber badge: pending/waiting.
- Red badge: rejected/error/overdue.
- Slate badge: inactive/neutral.
- Indigo badge: service category, specialist, staff, or premium metadata.

When a state needs attention, a tiny animated dot is acceptable:

```html
<span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
```

## Icons

Use Google Material Symbols, matching existing layouts.

Common icons:

- Dashboard: `dashboard`
- Users: `group`
- Traceability: `qr_code_scanner`, `timeline`, `route`, `fact_check`
- Seafood/product: `set_meal`, `category`, `inventory_2`
- Supplier: `person`, `business`
- Vessel/facility: `sailing`, `factory`, `warehouse`
- Document/upload: `description`, `send`, `upload_file`
- Category: `category`
- Certification: `verified`, `workspace_premium`
- Email: `mail`, `outgoing_mail`
- Settings/branding: `palette`, `image`, `title`
- User/profile: `person`, `account_circle`
- Navigation: `menu`, `menu_open`, `expand_more`, `chevron_left`, `chevron_right`
- Utility: `search`, `close`, `fullscreen`, `arrow_upward`, `visibility`

Icon rules:

- Icons inside buttons should be aligned with `inline-flex items-center gap-2`.
- Icon-only buttons need accessible labels.
- Default icon weight should stay outlined unless active/final state benefits from filled.

## Public Seafood Traceability Pages

Public pages should lead with seafood origin, authenticity, safety evidence, and an easy path to verify a product or batch.

Hero/carousel:

- Full-width, aspect ratio around `16/5`.
- Use authentic fishing, aquaculture, seafood, transport, and processing imagery.
- Provide controls below the carousel rather than overlaying busy images.
- Include direct CTAs such as "Trace this product", "Scan QR code", "View origin", and "Verify batch".

Content sections:

- Use strong section titles with a small blue underline.
- Keep content readable with `prose max-w-none`, `leading-relaxed`, and `break-words`.
- Seafood species, origin, or certification filters can use bright blue, cyan, or teal where helpful.
- Batch summary, catch area, certification, or chain-of-custody panels should appear in a right sidebar on desktop and stack on mobile.

Landing-page legacy accent style:

```css
--accent-gradient: linear-gradient(120deg, rgba(11, 38, 88, 0.95) 0%, rgba(11, 38, 88, 0.82) 55%, rgba(21, 88, 214, 0.9) 100%);
--card-gradient: linear-gradient(160deg, rgba(11, 38, 88, 0.14) 0%, rgba(255, 255, 255, 0.96) 70%, rgba(21, 88, 214, 0.08) 100%);
```

Use coral/red underlines or pills sparingly for recalls, failed checks, temperature excursions, and safety alerts.

## Operations and Workflow Pages

Operations pages should feel like a focused tool for managing seafood batches, suppliers, vessels, facilities, inspections, shipments, certificates, and traceability events.

Use:

- Compact page heading with breadcrumb.
- Search/filter card at top.
- Wide data table below.
- Primary action button on the right.
- Stats cards at top of dashboards.
- Charts inside white cards with minimal legends and soft grid lines.

Stats card pattern:

```html
<div class="bg-white rounded-2xl shadow-sm border border-outline-variant p-5 flex items-center gap-4">
  <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
    <span class="material-symbols-outlined text-primary text-2xl">event</span>
  </div>
  <div>
    <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Tracked Batches</p>
    <p class="text-3xl font-extrabold text-primary leading-tight">12</p>
  </div>
</div>
```

## Motion and Interaction

Keep motion subtle and purposeful.

Approved motion:

- Hover card lift: `hover:-translate-y-0.5` or `hover:-translate-y-1`.
- Soft shadow increase on hover.
- Dropdown fade/translate.
- Toast slide in/out.
- Carousel fade.
- Smooth scroll for back-to-top.

Avoid excessive animation in admin flows. Never animate layout in a way that moves controls while users are trying to click them.

## Toasts and Feedback

Toast style:

- Position top-right.
- Glass white background.
- Rounded `16px` to `24px`.
- Soft shadow.
- Color-coded icon circle.

Use feedback for successful saves, verification results, validation errors, document uploads, and destructive actions.

## Responsive Rules

Design mobile first, then enhance.

- Use one-column layouts on mobile.
- Switch to two or three columns only when enough width exists.
- Operations sidebar should hide behind overlay below desktop width.
- Tables should scroll horizontally with `min-w-*`.
- Buttons should keep readable labels; allow wrapping if needed.
- Avoid text overlap by using `break-words`, `truncate` only for metadata, and fixed dimensions for icon buttons.

## Accessibility

Required:

- Every icon-only button has an `aria-label`.
- Modal dialogs use `role="dialog"` and `aria-modal="true"`.
- Keep focus rings visible: `focus-visible:ring-2 focus-visible:ring-primary/30`.
- Do not rely on color alone for critical status. Include labels and icons/dots where useful.
- Image alt text should describe the seafood species, catch location, vessel, processing facility, batch, or logo.
- Preserve keyboard access for dropdowns, modals, carousels, and forms.

## Implementation Notes

The project commonly uses Tailwind from local static assets:

```html
<script src="/lib/tailwindcss/tailwindcss-3.4.17.js"></script>
```

Shared Tailwind tokens used in layouts:

```js
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0b2658",
        secondary: "#1558d6",
        "primary-teal": "#006d5b",
        "primary-indigo": "#4f46e5",
        surface: "#f8f9fa",
        "on-surface": "#191c1d",
        "on-surface-variant": "#444656",
        "outline-variant": "#c5c5d9"
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', "sans-serif"],
        headline: ['"Be Vietnam Pro"', "sans-serif"]
      }
    }
  }
};
```

When adding new UI in this repo, prefer existing layout files and conventions even if some file names still use older service-oriented wording:

- Operations dashboard shell: `Views/Layout/_UserLayout.cshtml` or `_AdminLayout.cshtml`.
- Public traceability shell: `Views/Layout/_LayoutLandingPage.cshtml`.
- Shared admin layout CSS: `wwwroot/css/layout/admin-layout.css`.
- Public landing CSS: `wwwroot/css/layout/landing-page-layout.css`.

## Quick Prompt for Future AI

Use this summary when asking another AI to implement UI:

Build the UI for a modern seafood traceability platform. Use Be Vietnam Pro, Material Symbols, navy `#0B2658` as the primary brand color, and bright blue `#1558D6` as the secondary brand color. Use green for verified/compliant states, cyan or teal for ocean and supply-chain information, amber for pending reviews or missing records, and red/coral for recalls, failures, or urgent safety alerts. Use white cards on `#F8F9FA`, slate text, soft borders `#C5C5D9`, rounded-xl/2xl surfaces, subtle shadows, and compact Tailwind layouts. Operations pages should be calm, dense, card/table driven, with a fixed sidebar and glass sticky header. Public pages should explain seafood provenance with real vessel, catch, and processing imagery, QR/batch lookup, verified trust signals, clear chain-of-custody timelines, and responsive grids. Keep accessibility, keyboard focus, mobile responsiveness, and bilingual text spacing in mind.
