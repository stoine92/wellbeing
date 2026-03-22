# HA | Wisdom Wellbeing — Resource Centre

A single page application. The app displays wellbeing resources grouped by category, with filtering and sorting functionality.

---

## Getting Started

### Prerequisites

- Node.js v20+
- npm v10+

### Installation

```bash
npm install
```

### Running the app

```bash
npm run dev
```

### Running tests

```bash
npm test
```

### Building for production

```bash
npm run build
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 8 | Build tool & dev server |
| TanStack Query v5 | Async data fetching & caching |
| Radix UI | Accessible dialog & collapsible primitives |
| MUI Icons | Icon library |
| SCSS Modules | Component-scoped styling |
| Vitest | Unit test runner |
| React Testing Library | Component & hook testing |
| date-fns | Date formatting |

---

## Features Implemented

### Core
- Resources displayed and grouped by category on first load
- Each card shows: thumbnail, title, tags (max 3), and read/watch time

### Feature 1 — Resource Detail Dialog
Clicking the info icon on any card opens a modal displaying the full resource data: hero image with gradient overlay, category badge, title, description, duration, date uploaded, and tags.

### Feature 2 — Filter by Title & Topic
A sidebar (and mobile-accessible panel) allows users to filter resources in real time by title or by topic tag. The subtitle updates dynamically to reflect the number of matching results.

### Feature 3 — Sort by Category / Date
Users can sort resources alphabetically by category or by upload date, in ascending or descending order.

---

## Architecture Decisions

### Custom Hooks
Logic is separated from presentation via custom hooks:
- `useFilter` — manages title and tag filter state, returns filtered resources
- `useSortOrder` — manages sort key and direction state, returns a sorted copy of the array without mutating the original

### Pure Utility Functions
Business logic is extracted into pure, independently testable functions:
- `groupByCategory` — groups a flat resource array into a `Record<Category, Resource[]>`
- `formatDuration` — formats minutes into a human-readable string with a category-aware label (`read` or `watch`)
- `formatDate` — formats ISO date strings into readable display format

### TypeScript
Strict typing throughout. The `Category` type is a union of the six valid categories, used to type the `groupByCategory` return value and `formatDuration` label map — so adding a new category would surface all the places that need updating.

### TDD Approach
Tests were written alongside or before implementation where possible. All utility functions, custom hooks, and key components have test coverage.

---

## Testing

Tests are written with Vitest and React Testing Library. Coverage includes:

- `fetchResources` — async resolution, data shape, valid categories
- `groupByCategory` — grouping logic, empty inputs, no category bleeding
- `formatDuration` — all categories, hours/minutes formatting, edge cases
- `useFilter` — title filter, tag filter, combined filters, undefined inputs
- `useSortOrder` — category sort, date sort, asc/desc, no mutation of original array
- `ResourceCard` — renders correctly, dialog opens on click, shows full resource data
- `Resources` — loading state, empty state, grouped rendering, correct section count
- `FilterAndSort` — renders all fields, calls correct handlers, reflects current values

> **Note on testing:** Testing is an area I'm actively developing. The test suite was built with assistance from Claude (Anthropic) to ensure correct patterns and good coverage. I'm transparent about this — the understanding of what to test and why is my own, and I'm comfortable walking through and explaining every test in the codebase.

---

## What I Would Have Done With More Time

### Active Filter & Sort Indicators
Visual indicators on the filter/sort fields showing when they are active — for example, a highlighted border or a badge count. This gives users immediate feedback that their view is filtered.

### Clear All Filters Button
A single button to reset all filter and sort state back to defaults. Essential UX for any filtering interface.

### Skeleton Loading States
Rather than a plain "Loading..." text, I would have built skeleton components that mimic the shape of the actual cards — giving a polished perceived performance feel while data loads.

### Image Fallbacks
A placeholder image for resources with missing or broken thumbnails, particularly in the dialog where the hero image is prominent. Also defensive handling for any other missing data fields.

### Navigation & Footer
A proper header with the HA brand logo, navigation links, and a footer with contact information and legal copy — to make the app feel like a real product page rather than a standalone widget.

### Accessibility Audit
A full pass with a screen reader and keyboard-only navigation to ensure all interactions — especially the dialog and filter controls — meet WCAG AA standards end to end.

### Responsive Polish
The layout adapts to mobile via the collapsible filter panel, but I would have given more time to fine-tuning spacing, card layouts, and touch targets at smaller breakpoints.

---

## Project Structure

```
src/
├── components/
│   ├── Buttons/
│   ├── Dialog/
│   ├── FilterAndSort/
│   ├── Form/
│   ├── hooks/
│   │   ├── useFilter.ts
│   │   └── useSortOrder.ts
│   ├── Layout/
│   └── Resources/
│       ├── ResourceCard.tsx
│       └── Resources.tsx
├── lib/
│   └── fetchResources.ts
├── pages/
│   └── Home.tsx
├── styles/
│   ├── globals.scss
│   └── mixins.scss
└── data/
    └── resources.json
```