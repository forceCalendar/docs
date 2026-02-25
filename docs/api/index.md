---
title: API Reference
sidebar_label: API Reference
description: Quick links to all ForceCalendar API documentation.
---

# API Reference

## Core (`@forcecalendar/core`)

| Class | Description |
|-------|-------------|
| [Calendar](/docs/core/calendar) | Main orchestrator -- navigation, views, event CRUD, timezones, plugins |
| [Event](/docs/core/event) | Event model with normalization, validation, colors, metadata |
| [EventStore](/docs/core/event-store) | Indexed storage with range queries and overlap detection |
| [StateManager](/docs/core/state-manager) | Immutable state with subscriptions and undo/redo |
| [TimezoneManager](/docs/core/timezone) | IANA timezone conversion and formatting |
| [RecurrenceEngine](/docs/core/recurrence) | RFC 5545 RRULE expansion |
| [ICSHandler / ICSParser](/docs/core/ics) | iCalendar (.ics) import/export |
| [EventSearch](/docs/core/search) | Full-text search with fuzzy matching |
| [DateUtils](/docs/core/date-utils) | Date calculation and formatting utilities |

## Interface (`@forcecalendar/interface`)

| Component / Class | Description |
|-------------------|-------------|
| [`<forcecal-main>`](/docs/interface/forcecal-main) | Primary calendar Web Component with month/week/day views |
| [`<forcecal-event-form>`](/docs/interface/event-form) | Modal dialog for creating events |
| [BaseComponent](/docs/interface/base-component) | Base class for custom components |

## Salesforce

| Topic | Description |
|-------|-------------|
| [Setup & Deploy](/docs/salesforce/setup) | Build, deploy, and configure in Lightning |
| [Apex Controller](/docs/salesforce/apex-controller) | Server-side CRUD with CRUD/FLS enforcement |
| [LWC Component](/docs/salesforce/lwc-component) | Lightning Web Component wrapper |
