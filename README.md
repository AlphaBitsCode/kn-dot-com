# Kent Nguyen [dot] com

A personal portfolio website for Kent Nguyen, serial tech entrepreneur and venture partner. Built with modern web technologies to showcase professional background, patents, and contact information.

## ✨ Features

- **About Page** - Professional background and experience overview
- **Sand Battery Patent Page** - USPTO patent information and download
- **Contact Page** - Contact information and communication channels
- **Dark Mode Support** - Seamless theme switching via next-themes
- **Responsive Design** - Mobile-first approach for optimal viewing on all devices
- **Accessible Components** - Built with Radix UI primitives for WCAG compliance
- **Custom Components** - Footer and PhotographySection components

## 🛠️ Tech Stack

### Core Framework
- **React 18** - UI library with TypeScript for type safety
- **Vite** - Fast development server and optimized production builds
- **TypeScript** - Static typing for improved developer experience

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible, customizable UI components built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management for dark/light mode

### Routing & State
- **React Router DOM** - Client-side routing with BrowserRouter
- **TanStack Query** - Powerful server state management

### Form Handling & Validation
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code quality and consistency checks
- **PostCSS** - CSS processing with Autoprefixer
- **SWC** - Fast TypeScript/JavaScript compilation via Vite plugin

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**/**pnpm** as package manager
- **Git** - [Download Git](https://git-scm.com/)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kn-dot-com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

## 💻 Development

### Starting Development Server

```bash
npm run dev
```

The Vite dev server will start on port 8080 with hot module replacement (HMR) enabled.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Building for Development

```bash
npm run build:dev
```

Creates a development build with development-specific configuration.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deployment.

### Linting Code

```bash
npm run lint
```

Run ESLint to check code quality and consistency.

## 📁 Project Structure

```
kn-dot-com/
├── src/
│   ├── components/          # Custom React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Footer.tsx      # Site footer component
│   │   └── PhotographySection.tsx
│   ├── pages/              # Route pages
│   │   ├── About.tsx               # Home/About page (/)
│   │   ├── SandBatteryPatent.tsx   # Patent download page
│   │   ├── KentNguyenContact.tsx   # Contact page
│   │   └── NotFound.tsx            # 404 error page
│   ├── hooks/              # Custom React hooks
│   │   ├── use-mobile.tsx  # Mobile detection hook
│   │   └── use-toast.ts    # Toast notification hook
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # Helper functions (cn, etc.)
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # Application entry point
│   └── vite-env.d.ts       # Vite type definitions
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── tsconfig.node.json      # TypeScript config for Node.js
```

## 🎯 Key Pages & Components

### Pages

- **About (`/`)**
  - Home page displaying professional background
  - Experience overview and venture partner information
  - Entry point for the portfolio

- **Sand Battery Patent (`/sand-battery-patent-download`)**
  - USPTO patent information display
  - Patent download functionality
  - Technical documentation access

- **Contact (`/kent-nguyen-contact/`)**
  - Contact information and communication channels
  - Professional networking details

- **NotFound (`*`)**
  - 404 error page for invalid routes
  - Navigation back to main pages

### Custom Components

- **Footer**
  - Site-wide footer component
  - Copyright and navigation links

- **PhotographySection**
  - Custom section for photography portfolio
  - Responsive image gallery

### UI Components (shadcn/ui)

The project includes a comprehensive set of pre-built UI components in `src/components/ui/`:
- Accordion, Alert, Avatar, Badge, Button, Calendar, Card, Carousel
- Checkbox, Collapsible, Command, Context Menu, Dialog, Dropdown
- Form, Hover Card, Input, Label, Menubar, Navigation Menu
- Pagination, Popover, Progress, Radio Group, Resizable
- Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton
- Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server on port 8080 |
| `npm run build` | Create optimized production build |
| `npm run build:dev` | Create development build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🎨 Customization

### Theming

The project supports dark/light mode switching via `next-themes`. Theme state is managed globally and persists across sessions.

### Styling

Styles are handled through Tailwind CSS utility classes. Custom styles can be added via:
- Tailwind utility classes in component className
- Global CSS in `src/index.css`
- Component-specific styles using Tailwind directives

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add the route in `src/App.tsx` above the catch-all `*` route
3. Follow existing page patterns for consistency

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new components
- Follow existing component patterns
- Maintain consistent naming conventions
- Use Tailwind utility classes for styling
- Keep components small and focused

### Component Organization

- Place reusable components in `src/components/`
- Use `src/components/ui/` for shadcn/ui components
- Create route-specific pages in `src/pages/`
- Extract custom hooks to `src/hooks/`

### Import Order

```typescript
// 1. React imports
import { useState } from "react";

// 2. Third-party imports
import { useRouter } from "react-router-dom";

// 3. Component imports (use @ alias for src/)
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
```

## 🌐 Deployment

The project builds to a static `dist/` directory suitable for deployment to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Simply run `npm run build` and deploy the `dist/` directory.

## 📄 License

This project is private and proprietary.

## 👤 Author

**Kent Nguyen**
- Serial Tech Entrepreneur
- Venture Partner

---

Built with ❤️ using React, TypeScript, and Vite
