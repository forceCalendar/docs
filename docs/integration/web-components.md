# Web Components Integration

The `@forcecalendar/interface` library provides a framework-agnostic `<force-calendar>` web component that can be used in any modern web environment.

## Installation

```bash
npm install @forcecalendar/interface
```

## Basic Usage

```html
<script type="module" src="node_modules/@forcecalendar/interface/dist/index.js"></script>

<force-calendar 
  view="week" 
  timezone="America/Los_Angeles">
</force-calendar>
```

## Framework Integration

Because ForceCalendar is a standard Web Component, it works seamlessly with:

- **React**: Use standard refs to interact with the component.
- **Vue**: Bind props and listen to events natively.
- **Angular**: Easy integration via `CUSTOM_ELEMENTS_SCHEMA`.
- **Vanilla JS**: Manipulate via standard DOM APIs.

## Customization

The interface supports CSS variables for theming:

```css
force-calendar {
  --fc-primary-color: #0070d2;
  --fc-border-radius: 4px;
}
```
