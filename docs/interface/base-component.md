---
sidebar_position: 3
title: BaseComponent
---

# BaseComponent

Base class for all ForceCalendar Web Components. Provides Shadow DOM setup, lifecycle management, state, props, event handling, and template rendering.

```javascript
import { BaseComponent } from '@forcecalendar/interface';

class MyCalendarWidget extends BaseComponent {
  static get observedAttributes() {
    return ['title'];
  }

  initialize() {
    // Called once on first connectedCallback
  }

  getStyles() {
    return `
      :host { display: block; }
      .widget { padding: 16px; }
    `;
  }

  template() {
    return `<div class="widget">${this.getAttribute('title')}</div>`;
  }

  afterRender() {
    // DOM is ready, attach listeners
    this.addListener(this.$('.widget'), 'click', this.handleClick);
  }

  handleClick() {
    this.emit('widget-click', { title: this.getAttribute('title') });
  }
}

customElements.define('my-calendar-widget', MyCalendarWidget);
```

## Lifecycle

| Method | When |
|--------|------|
| `initialize()` | Once, on first `connectedCallback` |
| `mount()` | Every `connectedCallback` (calls `render()`) |
| `unmount()` | Every `disconnectedCallback` |
| `cleanup()` | After `unmount` -- removes all tracked listeners |

## Rendering

| Method | Purpose |
|--------|---------|
| `getStyles()` | Return CSS string for Shadow DOM |
| `template()` | Return HTML string |
| `render()` | Called by `mount()` -- applies styles and template to Shadow DOM |
| `afterRender()` | Called after DOM is updated -- attach event listeners here |

`render()` preserves scroll positions and focus across re-renders.

## DOM Utilities

| Method | Description |
|--------|-------------|
| `$(selector)` | `shadowRoot.querySelector` |
| `$$(selector)` | `shadowRoot.querySelectorAll` |

## Event Handling

| Method | Description |
|--------|-------------|
| `addListener(element, event, handler)` | Tracks listener for automatic cleanup |
| `emit(name, detail)` | Dispatches `CustomEvent` with `bubbles: true, composed: true` |

## State and Props

| Method | Description |
|--------|-------------|
| `setState(partial)` | Merge state and re-render |
| `getState()` | Get current state |
| `setProp(key, value)` | Set a prop |
| `getProp(key)` | Get a prop |
