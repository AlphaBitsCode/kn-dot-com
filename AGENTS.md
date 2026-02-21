# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is Kent Nguyen's personal portfolio website - a modern React application built with Vite, TypeScript, and shadcn/ui components. The site showcases Kent's work as a tech entrepreneur and includes sections for services, timeline, clients, and contact information. It features a dedicated page for his Sand Battery patent download.

## Development Commands

### Core Development Workflow
```bash
# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Lint codebase
npm run lint

# Preview production build locally
npm run preview
```

### Package Management
The project uses both npm (package-lock.json) and bun (bun.lockb) lock files. When installing dependencies, use:
```bash
# Install dependencies
npm install
# or
bun install
```

## Architecture Overview

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM v6
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: CSS transitions with Intersection Observer API

### Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Minimal shadcn/ui reusable components
│   └── PhotographySection.tsx  # Specific sections
├── pages/               # Route components
│   ├── About.tsx        # Main homepage ('/')
│   ├── NotFound.tsx     # 404 page
│   ├── KentNguyenContact.tsx # Contact page
│   └── SandBatteryPatent.tsx  # Patent download page
├── hooks/               # Custom React hooks
│   └── use-toast.ts     # Toast hook
├── lib/                 # Utility functions
│   └── utils.ts         # Tailwind class merging utility
├── App.tsx              # Root component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind configuration
```

### Key Architectural Patterns

**Component Organization**: Components follow a clear separation with UI components in `components/ui/` (shadcn/ui) and feature components as section-specific files (e.g., `HeroSection.tsx`, `NavBar.tsx`).

**Styling Architecture**: Uses Tailwind CSS with a comprehensive design system including:
- CSS custom properties for theming (light/dark mode)
- Custom utility classes for common patterns
- Component-level styling with Tailwind classes
- Custom animations using CSS keyframes and Tailwind

**Route Structure**: Simple routing with:
- `/` - Main portfolio homepage mapped to `About.tsx`
- `/sand-battery-patent-download` - Patent information and download mapped to `SandBatteryPatent.tsx`
- `/kent-nguyen-contact/` - Contact page mapped to `KentNguyenContact.tsx`
- 404 fallback for unknown routes (`*`) mapped to `NotFound.tsx`

**Animation System**: Custom scroll-based animations using:
- `useScrollAnimation` hook with Intersection Observer API
- CSS classes `.animate-on-scroll` and `.is-visible` for reveal animations
- Tailwind animation utilities for micro-interactions

## Development Patterns

### Component Patterns
- All components use TypeScript with `React.FC` typing
- Components follow shadcn/ui patterns with `forwardRef` for UI components
- Consistent use of Tailwind classes with `cn()` utility for conditional styling
- Custom hooks for reusable logic (scroll animations, mobile detection)

### Styling Conventions
- Use CSS custom properties (`--background`, `--foreground`, etc.) for theming
- Tailwind utility classes for component styling
- Custom CSS classes in `@layer components` for reusable patterns
- Responsive design with mobile-first approach using Tailwind breakpoints

### State Management
- React Query for any future server state needs
- Local component state with `useState` for UI interactions
- Context providers already set up (TooltipProvider, QueryClientProvider)

## Configuration Details

### Vite Configuration
- Development server runs on `host: "::"` and `port: 8080`
- Path alias `@/*` resolves to `./src/*`
- React SWC plugin for fast compilation
- Component tagging enabled in development mode

### TypeScript Configuration
- Relaxed TypeScript settings: `noImplicitAny: false`, `strictNullChecks: false`
- Path mapping configured for `@/*` imports
- Separate configs for app and Node environments

### Tailwind Configuration
- Custom color palette with CSS variables
- Custom font families: Inter (sans) and Manrope (headings)
- Custom animations and keyframes
- Typography plugin configured

### ESLint Configuration
- React hooks and refresh plugins enabled
- Unused variables rule disabled
- Modern flat config format

## File Naming and Import Patterns

- Components use PascalCase: `HeroSection.tsx`, `NavBar.tsx`
- Pages use PascalCase: `Index.tsx`, `NotFound.tsx`
- Utilities and hooks use camelCase: `utils.ts`, `useScrollAnimation.tsx`
- All imports use `@/` alias for src directory references
- Default exports for components and pages

## Asset Management

- Static assets in `public/` directory
- Images referenced with relative paths from public (e.g., `images/kent_2.jpg`)
- Patent PDF available at `/USPTO.12-130086-B1.pdf`
- External links to blog at `blog.kentnguyen.com`

## Key Features to Maintain

When working with this codebase:
- Preserve the scroll animation system - components with `animate-on-scroll` class are animated on scroll
- Maintain responsive design patterns across all screen sizes
- Keep the clean section-based homepage structure
- Preserve the patent download functionality
- Maintain dark mode compatibility via CSS custom properties
