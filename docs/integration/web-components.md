# The Face (Web Components)

If the **Core** is the brain, then the **Web Component** is the face. It's the part that looks pretty and has buttons you can click!

---

<div class="eli5-card">
  <h3>🌟 The Magical Sticker</h3>
  <p>Think of our Web Component like a <strong>magical sticker</strong>. You can peel it off and stick it on ANY website—whether it's built with React, Vue, or just plain HTML. Once you stick it there, a full, working calendar appears!</p>
</div>

## How to use the Sticker

### 1. Grab the library
First, you need to tell your website where the sticker comes from:

```bash
npm install @forcecalendar/interface
```

### 2. Stick it on your page
You just use a special HTML tag called `<force-calendar>`. It's like a normal `<div>` or `<img>` tag, but it's a whole calendar!

```html
<force-calendar 
  view="month" 
  timezone="America/New_York">
</force-calendar>
```

## How to change its look

You can change how the calendar looks using **CSS Variables**. It's like changing the "theme" of the sticker.

```css
force-calendar {
  /* Change the main color to a nice blue */
  --fc-primary-color: #0070d2;
  
  /* Make the corners rounded */
  --fc-border-radius: 10px;
}
```

## Why Web Components are cool
- **They are lonely (in a good way!)**: They don't let the rest of your website's code mess with their internal styles.
- **They are universal**: They don't care if you use React or Vue. They just work!
- **They are simple**: One tag, and you're done!