# Installation

Ready to give your app a brain and a face? Let's get ForceCalendar installed!

---

## 🧠 Step 1: Install the Brain
If you want to handle the logic yourself, start here.

```bash
npm install @forcecalendar/core
```

## 🎨 Step 2: Install the Face
If you want the pretty calendar component, grab the interface.

```bash
npm install @forcecalendar/interface
```

---

## ☁️ Step 3: Using with Salesforce
ForceCalendar is a best friend to Salesforce. To get it into your Org:

1. **Clone the repo**:
   ```bash
   git clone https://github.com/forcecalendar/salesforce.git
   ```
2. **Build the magic**:
   ```bash
   npm run build
   ```
3. **Deploy to Salesforce**:
   ```bash
   sf project deploy start
   ```

---

## 🚀 Quick Start Example

Want to see it in action right now? Paste this into your HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My First Calendar</title>
  <!-- Load the Face -->
  <script type="module" src="https://unpkg.com/@forcecalendar/interface"></script>
</head>
<body>
  <!-- Use the Sticker -->
  <force-calendar 
    view="month" 
    timezone="UTC"
    style="height: 800px;">
  </force-calendar>
</body>
</html>
```

<div class="eli5-card">
  <h3>💡 Pro Tip</h3>
  <p>Remember to give your <code>&lt;force-calendar&gt;</code> a height! If you don't, it will be invisible because it doesn't know how tall it should be.</p>
</div>