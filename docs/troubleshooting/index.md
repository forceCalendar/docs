---
sidebar_position: 1
title: Troubleshooting
sidebar_label: Troubleshooting
description: Solutions for common issues with rendering, events, Salesforce deployment, theming, and timezones.
---

# Troubleshooting

## Common Issues

### Calendar not rendering

**Symptom**: `<forcecal-main>` element is in the DOM but nothing appears.

**Causes**:
1. Script not loaded. Check the console for 404 errors on the UMD/ESM bundle.
2. Custom element not registered. Verify `customElements.get('forcecal-main')` returns the class.
3. Zero height. The element needs an explicit `height` attribute or CSS height.

**Fix**:
```html
<forcecal-main view="month" height="600px"></forcecal-main>
```

### Events not showing

**Symptom**: Calendar renders but events are invisible.

**Causes**:
1. Missing `id` field on event data. Every event requires a unique `id`.
2. Invalid dates. Ensure `start` and `end` are valid `Date` objects or ISO strings.
3. Events outside the visible range. Navigate to the correct month/week/day.

**Fix**:
```javascript
cal.addEvent({
  id: crypto.randomUUID(),  // Always provide an id
  title: 'Test',
  start: new Date(),
  end: new Date(Date.now() + 3600000)
});
```

### Salesforce: "Failed to load calendar library"

**Symptom**: Error message in the LWC component.

**Causes**:
1. Static resource not deployed. Run `npm run build` and deploy `dist/`.
2. Static resource name mismatch. Must be named `forcecalendar` (lowercase).
3. Locker Service blocking. Ensure the IIFE bundle does not reference `eval` or blocked APIs.

### Salesforce: Events not loading from Apex

**Symptom**: Calendar loads but shows no events.

**Causes**:
1. Missing object/field permissions. The running user needs Read access to the Event object and all queried fields.
2. `WITH SECURITY_ENFORCED` failing silently. Check that FLS is granted for `Subject`, `StartDateTime`, `EndDateTime`, `IsAllDayEvent`, `Description`, `Location`, `WhoId`, `WhatId`.
3. Date range too narrow. The component fetches a window around the current view.

### CSS tokens not applying

**Symptom**: Custom `--fc-*` variables are ignored.

**Cause**: Shadow DOM encapsulation. CSS custom properties must be set on the `<forcecal-main>` element itself or an ancestor, not on a child selector.

**Fix**:
```css
/* Correct: set on the element */
forcecal-main {
  --fc-primary-color: #7C3AED;
}

/* Wrong: trying to reach into shadow DOM */
forcecal-main .fc-header {
  background: red; /* Will not work */
}
```

### Timezone conversion seems wrong

**Cause**: JavaScript `Date` objects are always in the local timezone. ForceCalendar converts the underlying timestamp but the `Date` object's `toString()` still shows local time.

**Fix**: Use `calendar.formatInTimezone()` to display dates in specific timezones rather than relying on `Date.toString()`.

## Getting Help

- GitHub Issues: [forceCalendar/core](https://github.com/forceCalendar/core/issues) | [forceCalendar/interface](https://github.com/forceCalendar/interface/issues)
