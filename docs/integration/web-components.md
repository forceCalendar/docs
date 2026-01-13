# Web Components

The `@forcecalendar/interface` package provides Web Components that work in any framework or vanilla HTML.

---

## Installation

```bash
npm install @forcecalendar/interface
```

Or use via CDN:

```html
<script type="module" src="https://unpkg.com/@forcecalendar/interface"></script>
```

---

## Basic Usage

Add the `<force-calendar>` element to your HTML:

```html
<force-calendar
  view="month"
  timezone="America/New_York"
  style="height: 600px;">
</force-calendar>
```

---

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `view` | `string` | `month` | View mode: `month`, `week`, `day`, `list` |
| `timezone` | `string` | Browser TZ | IANA timezone identifier |
| `week-starts-on` | `number` | `0` | First day of week (0=Sunday, 1=Monday) |
| `readonly` | `boolean` | `false` | Disable event editing |

---

## Styling with CSS Variables

Customize the appearance using CSS custom properties:

```css
force-calendar {
  --fc-primary-color: #0070d2;
  --fc-border-radius: 8px;
  --fc-font-family: 'Inter', sans-serif;
  --fc-header-bg: #f5f5f5;
  --fc-event-bg: #0070d2;
  --fc-event-text: #ffffff;
}
```

---

## Framework Integration

### React

```jsx
import '@forcecalendar/interface';

function App() {
  return (
    <force-calendar
      view="month"
      timezone="America/New_York"
      style={{ height: '600px' }}
    />
  );
}
```

### Vue

```vue
<template>
  <force-calendar
    view="month"
    timezone="America/New_York"
    style="height: 600px"
  />
</template>

<script>
import '@forcecalendar/interface';
export default { name: 'App' };
</script>
```

### Angular

```typescript
// In your module
import '@forcecalendar/interface';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

```html
<!-- In your template -->
<force-calendar
  view="month"
  timezone="America/New_York"
  style="height: 600px">
</force-calendar>
```

---

## Why Web Components

- **Framework agnostic** - Works with React, Vue, Angular, Svelte, or vanilla HTML
- **Encapsulated styles** - Shadow DOM prevents style conflicts
- **Native browser support** - No framework runtime required
- **Simple API** - Just HTML attributes and CSS variables
