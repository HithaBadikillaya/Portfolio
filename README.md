# Professional Editorial Portfolio

A high-performance, magazine-style portfolio built with **React 19**, **Vite**, **Tailwind CSS 4**, and **Framer Motion**.

## 🧱 Tech Stack & Justifications

- **React 19**: Utilizing native metadata hoisting for SEO and improved rendering performance.
- **Tailwind CSS 4**: Modern, CSS-first design system with a high-contrast editorial palette.
- **Framer Motion**: industry-standard animations with spring physics for a premium feel.
- **Radix UI**: Accessible, unstyled primitives for full aesthetic control.
- **React Router**: Seamless client-side navigation.

## 🎨 Design Philosophy

- **Magazine Layout**: Oversized serif headings (Playfair Display) combined with functional sans-serif body text (Inter).
- **Paper Aesthetic**: Off-white background (#FCFAF7) and deep black text (#0A0A0A) mimic high-end print media.
- **Gamification**: 
  - **Dynamic Cursor**: Reactions to interactive elements.
  - **Scroll Progress**: Visual feedback for reading length.
  - **Interactive Grids**: cross-hair cursors and parallax hover states.
  - **Easter Egg**: Try the Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`) to trigger the "Hyper-Variant" mode.

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## 🔍 SEO & Accessibility

- **Native Hoisting**: Title and Meta tags are hoisted to the head by React 19.
- **ARIA & Keyboard**: All interactive elements use semantic HTML or Radix primitives.
- **Motion Preference**: Layout animations respect `prefers-reduced-motion`.

## 📁 Project Structure

```
src/
├── components/   # Reusable UI (Layout, Navigation, Cursor, etc.)
├── pages/        # Dramatic editorial page implementations
├── index.css     # Tailwind 4 configuration and global design tokens
└── App.jsx       # Route configuration
```

## 🛠 Deployment

This project is ready for deployment on **Vercel**, **Netlify**, or **GitHub Pages**. Ensure "Single Page App" redirect rules are configured for the router.
