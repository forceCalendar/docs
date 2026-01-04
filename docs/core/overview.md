# The Brain (Core Overview)

Welcome to the inner workings of ForceCalendar! This is what we call the **Core**. 

Imagine the Core is a very organized librarian who lives inside your computer. They don't have a screen or buttons, but they are amazing at keeping track of time.

---

## What does the Brain do?

### 1. It's a Time Traveler (Timezones)
Most computers get confused when you talk about "10:00 AM" because it's a different time in New York than it is in Tokyo.
The Brain is a pro at this. You just tell it where you are, and it makes sure every meeting shows up at the right time for everyone.

### 2. It has an Amazing Memory (Event Store)
The Brain uses something called **Spatial Indexing**. 
- **The old way**: Looking through a giant pile of 1,000 papers to find one date. (Slow! 🐢)
- **Our way**: Like having a perfectly organized filing cabinet where the Brain can find exactly what you need in a split second. (Fast! ⚡)

### 3. It's Great at Patterns (Recurrence)
Do you have a "Pizza Friday" every week? You only have to tell the Brain once. 
It knows that "Every Friday" means this week, next week, and even three years from now! It calculates these dates only when you look at them, so it doesn't get tired.

---

## How to talk to the Brain

If you are a coder, you talk to the Brain like this:

```javascript
import { Calendar } from '@forcecalendar/core';

// Create a new Brain
const myBrain = new Calendar({
  timeZone: 'UTC'
});

// Give the Brain a task
myBrain.addEvent({
  title: 'Eat Ice Cream',
  start: new Date()
});
```

The Brain will now remember that event and help you show it on a calendar later!