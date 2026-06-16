---
name: Taskly Design System
colors:
  surface: "#f9f9ff"
  surface-dim: "#d3daea"
  surface-bright: "#f9f9ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f0f3ff"
  surface-container: "#e7eefe"
  surface-container-high: "#e2e8f8"
  surface-container-highest: "#dce2f3"
  on-surface: "#151c27"
  on-surface-variant: "#4a4455"
  inverse-surface: "#2a313d"
  inverse-on-surface: "#ebf1ff"
  outline: "#7b7487"
  outline-variant: "#ccc3d8"
  surface-tint: "#732ee4"
  primary: "#630ed4"
  on-primary: "#ffffff"
  primary-container: "#7c3aed"
  on-primary-container: "#ede0ff"
  inverse-primary: "#d2bbff"
  secondary: "#0058be"
  on-secondary: "#ffffff"
  secondary-container: "#2170e4"
  on-secondary-container: "#fefcff"
  tertiary: "#a0002f"
  on-tertiary: "#ffffff"
  tertiary-container: "#c81a42"
  on-tertiary-container: "#ffdedf"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#eaddff"
  primary-fixed-dim: "#d2bbff"
  on-primary-fixed: "#25005a"
  on-primary-fixed-variant: "#5a00c6"
  secondary-fixed: "#d8e2ff"
  secondary-fixed-dim: "#adc6ff"
  on-secondary-fixed: "#001a42"
  on-secondary-fixed-variant: "#004395"
  tertiary-fixed: "#ffdadb"
  tertiary-fixed-dim: "#ffb2b7"
  on-tertiary-fixed: "#40000d"
  on-tertiary-fixed-variant: "#92002a"
  background: "#f9f9ff"
  on-background: "#151c27"
  surface-variant: "#dce2f3"
typography:
  display:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: "700"
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "600"
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-tablet: 24px
---

## Brand & Style

The design system is engineered for high-velocity productivity tailored to students and young professionals. The brand personality is **Encouraging, Efficient, and Orderly**. It balances the functional rigor of a professional tool with the approachable warmth of a lifestyle app.

The aesthetic follows a **Refined Minimalism** approach. It utilizes generous whitespace to reduce cognitive load, ensuring that the user's tasks remain the focal point. Subtle transitions and a soft tactile feel prevent the interface from feeling sterile, fostering a sense of accomplishment and "calm productivity" during high-stress periods.

## Colors

The palette is centered around a vibrant **Vivid Violet** (#7C3AED) as the primary action color, symbolizing focus and creativity.

- **Primary (Purple):** Used for main actions, active states, and brand moments.
- **Secondary (Blue):** Dedicated to secondary information, tags, and progress indicators.
- **Surface & Background:** A crisp White (#FFFFFF) is used for the base layer, while Surface Gray (#F9FAFB) provides subtle grouping for card containers and input backgrounds.
- **Semantic Colors:** Rose (#F43F5E) is reserved exclusively for overdue tasks and destructive actions to maintain a clear visual hierarchy of urgency.

## Typography

This design system utilizes **Inter** for its exceptional legibility on mobile screens and its modern, neutral character.

Hierarchy is established through weight rather than dramatic size shifts to keep the interface compact. **Display** and **Headline** styles use tighter letter spacing and heavier weights to feel grounded. **Body** copy is optimized for readability with a standard 1.5x line height. **Labels** are used for metadata like deadlines, categories, and priority tags, often employing a medium weight to remain legible at small scales.

## Layout & Spacing

This design system follows a **4px soft-grid system**. All layout dimensions, padding, and margins should be multiples of 4.

The mobile layout utilizes a **fluid grid** with a standard 16px side margin. Horizontal scrolling is permitted for category chips and calendar pickers to maximize vertical space. On larger devices (tablets), the margin increases to 24px and content is capped at a readable 720px width to prevent line lengths from becoming too long for task titles.

## Elevation & Depth

Depth is communicated through **Tonal Layers** and **Soft Ambient Shadows**.

1. **Level 0 (Background):** Pure White.
2. **Level 1 (Cards/Inputs):** Surface Gray (#F9FAFB) or White with a 1px border (#F3F4F6).
3. **Level 2 (Active Elements):** Elevated cards use a soft, highly diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.05)) to suggest interactivity.
4. **Level 3 (Modals/Overlays):** Stronger elevation (0px 10px 30px rgba(0, 0, 0, 0.1)) to separate task entry sheets from the main list.

Avoid harsh outlines; use subtle value shifts to define boundaries.

## Shapes

The shape language is **Rounded and Friendly**.

A consistent 12px-16px radius is applied to all primary containers.

- **Standard Radius:** 12px (0.75rem) for smaller cards and input fields.
- **Large Radius:** 16px (1rem) for main task cards and bottom sheets.
- **Pill Shape:** Fully rounded corners for chips, tags, and the Floating Action Button (FAB) to make them appear "touchable" and distinct from structural containers.

## Components

### Buttons

- **Primary:** Solid Purple fill with White text. Bold weight. Height: 48px or 56px for mobile accessibility.
- **Secondary:** Light Purple ghost background (#F5F3FF) with Purple text.
- **FAB:** A circular or pill-shaped Purple button with a '+' icon, positioned at the bottom right.

### Cards

Task cards utilize a White background with a 1px #F3F4F6 border. They feature a generous 16px internal padding. The task title (Title-LG) is primary, with metadata (Labels) aligned to the bottom or right.

### Inputs

Text inputs use a Surface Gray (#F9FAFB) fill with no border in their resting state, shifting to a White fill with a 2px Purple border on focus. Placeholders are Slate Gray (#9CA3AF).

### Navigation

A **Bottom Navigation Bar** is the primary navigation pattern. It features a blur effect (Backdrop Filter) and 4-5 key destinations: Today, Inbox, Calendar, and Profile. Icons should be 24px, line-style (2px stroke), becoming solid when active.

### Accessibility

- Minimum touch target for all interactive elements is 44x44px.
- Contrast ratios for text must meet WCAG AA standards (4.5:1).
- Overdue tasks must use both color (Rose) and an icon (Clock/Alert) to ensure information is not conveyed by color alone.
