# Project Overview
`voletra-frontend` is a modern web application built with **Next.js** (App Router). It serves as the frontend for the Voletra project, utilizing **TypeScript** for type safety and **Tailwind CSS** for efficient, utility-first styling.

## Technologies
- **Framework**: Next.js 16.2+
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4+
- **Linting**: ESLint 9+
- **Package Manager**: npm

## Directory Structure
- `src/app/`: Contains the application's routes, layouts, and global styles (App Router).
- `public/`: Static assets like images and fonts.
- `src/components/`: (Recommended) Directory for reusable UI components.

# Building and Running
The following commands are defined in `package.json`:

- **Development**: `npm run dev` - Starts the development server at `http://localhost:3000`.
- **Production Build**: `npm run build` - Compiles the application for production.
- **Production Start**: `npm run start` - Runs the compiled production build.
- **Linting**: `npm run lint` - Performs static analysis to catch potential issues.

# Development Conventions
- **Routing**: Follow the App Router conventions. Use `page.tsx` for routes and `layout.tsx` for shared UI across pages.
- **Styling**: Prefer Tailwind CSS utility classes. Global styles should be modified in `src/app/globals.css`.
- **Type Safety**: Define interfaces and types for all props and data structures. Avoid the use of `any`.
- **Components**: Place reusable components in a `src/components/` directory (create it if it doesn't exist).
- **Import Alias**: Use the `@/*` alias to import from the `src/` directory (e.g., `import MyComponent from '@/components/MyComponent'`).
