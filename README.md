# Kent Nguyen [dot] com

Welcome to the source code for [KentNguyen.com](https://kentnguyen.com/), the personal portfolio and contact hub for Kent Nguyen.

## Project Overview

This is a modern React application built with Vite, TypeScript, and shadcn/ui components. The site showcases Kent's work as a tech entrepreneur and includes sections for services, timeline, clients, and contact information. It features a dedicated page for his Sand Battery patent download.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: UI components (minimal shadcn/ui primitives like button, toast, tooltip)
- **Routing**: React Router DOM v6
- **State Management**: TanStack React Query for server state
- **Animations**: CSS transitions with Intersection Observer API

## Development Workflow

### Setup

Install dependencies using bun:
```bash
bun install
```

### Core Commands
```bash
# Start development server
npm run dev
# or
bun run dev

# Build for production
npm run build
# or
bun run build

# Lint codebase
npm run lint
```

## Structure

- `src/pages/`: Contains the main route views (`About.tsx`, `KentNguyenContact.tsx`, `SandBatteryPatent.tsx`)
- `src/components/`: Reusable custom sections and layout components
- `src/components/ui/`: Contains primitive UI components
- `public/`: Static assets such as images and the `sitemap.xml`/`robots.txt`

## License
All Rights Reserved. © 2026 Year of Reckoning.