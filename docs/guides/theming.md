---
sidebar_position: 1
title: Theming & CSS Tokens
sidebar_label: Theming
description: Customize ForceCalendar with 50+ CSS custom properties for colors, typography, spacing, and more.
---

# Theming & CSS Tokens

ForceCalendar Interface uses CSS custom properties (tokens) for all visual styling. Override these on the host element or any ancestor to customize the appearance.

## Setting Tokens

### Via CSS

```css
forcecal-main {
  --fc-primary-color: #7C3AED;
  --fc-primary-hover: #6D28D9;
  --fc-font-family: 'Roboto', sans-serif;
  --fc-border-radius-lg: 12px;
}
```

### Via JavaScript

```javascript
import { StyleUtils } from '@forcecalendar/interface';

StyleUtils.setCSSVariables({
  '--fc-primary-color': '#7C3AED',
  '--fc-background': '#FAFAF9'
});
```

### Via Inline Style

```html
<forcecal-main
  style="--fc-primary-color: #7C3AED; --fc-background: #1a1a2e;"
></forcecal-main>
```

## Token Reference

### Colors

| Token | Default | Description |
|-------|---------|-------------|
| `--fc-primary-color` | `#2563EB` | Primary action color |
| `--fc-primary-hover` | `#1D4ED8` | Primary hover state |
| `--fc-primary-light` | `#EFF6FF` | Primary light background |
| `--fc-accent-color` | `#F59E0B` | Accent color |
| `--fc-danger-color` | `#EF4444` | Error/danger color |
| `--fc-success-color` | `#10B981` | Success color |

### Text

| Token | Default | Description |
|-------|---------|-------------|
| `--fc-text-color` | `#111827` | Primary text |
| `--fc-text-secondary` | `#6B7280` | Secondary text |
| `--fc-text-light` | `#9CA3AF` | Light/muted text |

### Backgrounds

| Token | Default | Description |
|-------|---------|-------------|
| `--fc-background` | `#FFFFFF` | Main background |
| `--fc-background-alt` | `#FAFAFA` | Alternate background (headers, stripes) |
| `--fc-background-hover` | `#F3F4F6` | Hover state |
| `--fc-background-active` | `#E5E7EB` | Active/pressed state |

### Borders

| Token | Default | Description |
|-------|---------|-------------|
| `--fc-border-color` | `#E5E7EB` | Default border |
| `--fc-border-color-hover` | `#D1D5DB` | Hover border |
| `--fc-border-width` | `1px` | Border width |
| `--fc-border-radius-sm` | `3px` | Small radius |
| `--fc-border-radius` | `5px` | Default radius |
| `--fc-border-radius-lg` | `8px` | Large radius |
| `--fc-border-radius-full` | `9999px` | Pill/circle |

### Typography

| Token | Default | Description |
|-------|---------|-------------|
| `--fc-font-family` | `Inter, -apple-system, ...` | Font stack |
| `--fc-font-size-xs` | `11px` | Extra small |
| `--fc-font-size-sm` | `12px` | Small |
| `--fc-font-size-base` | `13px` | Body text |
| `--fc-font-size-lg` | `15px` | Large |
| `--fc-font-size-xl` | `18px` | Extra large |
| `--fc-font-size-2xl` | `24px` | Heading |
| `--fc-line-height` | `1.4` | Line height |
| `--fc-font-weight-normal` | `400` | Normal |
| `--fc-font-weight-medium` | `500` | Medium |
| `--fc-font-weight-semibold` | `600` | Semibold |
| `--fc-font-weight-bold` | `700` | Bold |

### Spacing

| Token | Default | Description |
|-------|---------|-------------|
| `--fc-spacing-xs` | `2px` | Tiny gap |
| `--fc-spacing-sm` | `6px` | Small gap |
| `--fc-spacing-md` | `10px` | Medium gap |
| `--fc-spacing-lg` | `14px` | Large gap |
| `--fc-spacing-xl` | `20px` | Extra large |
| `--fc-spacing-2xl` | `28px` | Section spacing |

### Shadows

| Token | Default | Description |
|-------|---------|-------------|
| `--fc-shadow-sm` | `0 1px 1px rgba(0,0,0,0.05)` | Subtle |
| `--fc-shadow` | `0 1px 3px rgba(0,0,0,0.1), ...` | Default |
| `--fc-shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Medium |
| `--fc-shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Large |

### Transitions

| Token | Default | Description |
|-------|---------|-------------|
| `--fc-transition-fast` | `100ms ease-out` | Hover states |
| `--fc-transition` | `150ms ease-out` | Standard |
| `--fc-transition-slow` | `250ms ease-out` | Page transitions |

### Z-Index

| Token | Default | Description |
|-------|---------|-------------|
| `--fc-z-dropdown` | `1000` | Dropdowns |
| `--fc-z-modal` | `2000` | Modals |
| `--fc-z-tooltip` | `3000` | Tooltips |

## Dark Theme Example

```css
.dark forcecal-main,
[data-theme="dark"] forcecal-main {
  --fc-primary-color: #3B82F6;
  --fc-text-color: #E5E7EB;
  --fc-text-secondary: #9CA3AF;
  --fc-text-light: #6B7280;
  --fc-background: #0F1117;
  --fc-background-alt: #1A1D24;
  --fc-background-hover: #1F2937;
  --fc-background-active: #374151;
  --fc-border-color: #2D3139;
  --fc-border-color-hover: #3D4451;
  --fc-shadow: 0 1px 3px rgba(0,0,0,0.3);
}
```

## Salesforce SLDS Theme

```css
/* Match SLDS (Salesforce Lightning Design System) colors */
forcecal-main {
  --fc-primary-color: #0176D3;
  --fc-primary-hover: #014486;
  --fc-font-family: 'Salesforce Sans', Arial, sans-serif;
  --fc-border-radius: 4px;
  --fc-border-radius-lg: 4px;
}
```

## StyleUtils API

`StyleUtils` provides programmatic access to theme utilities:

```javascript
import { StyleUtils } from '@forcecalendar/interface';

// Read a CSS variable
const primary = StyleUtils.getCSSVariable('--fc-primary-color');

// Set CSS variables
StyleUtils.setCSSVariables({
  '--fc-primary-color': '#7C3AED'
}, document.documentElement);

// Color utilities
StyleUtils.darken('#3B82F6', 10);       // Darken by 10%
StyleUtils.lighten('#3B82F6', 10);      // Lighten by 10%
StyleUtils.getContrastColor('#3B82F6'); // '#FFFFFF' (white on blue)
StyleUtils.hexToRgba('#3B82F6', 0.5);  // 'rgba(59, 130, 246, 0.5)'
StyleUtils.sanitizeColor(userInput);     // Safe color or fallback
```
