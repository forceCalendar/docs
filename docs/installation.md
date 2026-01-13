# Installation

Get ForceCalendar installed in your project.

---

## Step 1: Install Core

The core package provides all the calendar logic with zero dependencies.

```bash
npm install @forcecalendar/core
```

## Step 2: Install Interface (Optional)

If you want the pre-built calendar UI components:

```bash
npm install @forcecalendar/interface
```

---

## Using with Salesforce

To deploy ForceCalendar to your Salesforce org:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/forcecalendar/salesforce.git
   ```
2. **Build the package**:
   ```bash
   npm run build
   ```
3. **Deploy to Salesforce**:
   ```bash
   sf project deploy start
   ```

---

## Quick Start Example

Minimal HTML example using the interface package:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My First Calendar</title>
  <script type="module" src="https://unpkg.com/@forcecalendar/interface"></script>
</head>
<body>
  <force-calendar
    view="month"
    timezone="UTC"
    style="height: 800px;">
  </force-calendar>
</body>
</html>
```

:::tip
Remember to give your `<force-calendar>` element a height. Without explicit dimensions, the component will not be visible.
:::
