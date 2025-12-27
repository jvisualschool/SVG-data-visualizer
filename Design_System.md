# Design System: Vibe Gallery

This document outlines the design system used in the Vibe Gallery application, providing a foundation for consistent UI/UX across different apps.

## 1. Typography
- **Primary Font**: `Inter`, sans-serif
- **Source**: Google Fonts (Weights: 400, 500, 600, 700)
- **Base Size**: 1rem (1.05rem for Gemini mode)
- **Scale**: Standard Tailwind CSS typography scale.

## 2. Color Palettes (RGB format for CSS Variables)
Colors are implemented using CSS variables in `index.css` and mapped to Tailwind classes.

### 🌑 Dark Mode (Default - Slate Based)
| Variable | RGB Value | Hex (Approx) | Tailwind Use |
| :--- | :--- | :--- | :--- |
| `--c-bg-900` | `15 23 42` | `#0f172a` | `bg-slate-900` (Main BG) |
| `--c-bg-800` | `30 41 59` | `#1e293b` | `bg-slate-800` (Cards) |
| `--c-bg-700` | `51 65 85` | `#334155` | `bg-slate-700` (Accents) |
| `--c-text-white` | `255 255 255` | `#ffffff` | `text-white` |
| `--c-text-300` | `203 213 225` | `#cbd5e1` | `text-slate-300` |
| `--c-text-400` | `148 163 184` | `#94a3b8` | `text-slate-400` |
| `--c-text-500` | `100 116 139` | `#64748b` | `text-slate-500` |

### ☀️ Light Mode
| Variable | RGB Value | Hex (Approx) | Tailwind Use |
| :--- | :--- | :--- | :--- |
| `--c-bg-900` | `255 255 255` | `#ffffff` | Main BG |
| `--c-bg-800` | `248 250 252` | `#f8f9fa` | Cards (`slate-50`) |
| `--c-bg-700` | `226 232 240` | `#e2e8f0` | Accents (`slate-200`) |
| `--c-text-white` | `15 23 42` | `#0f172a` | Main Text (`slate-900`) |

### 🩶 Gray Mode (True Neutral - Zinc Based)
| Variable | RGB Value | Hex (Approx) | Tailwind Use |
| :--- | :--- | :--- | :--- |
| `--c-bg-900` | `24 24 27` | `#18181b` | Main BG (`zinc-950`) |
| `--c-bg-800` | `39 39 42` | `#27272a` | Cards (`zinc-800`) |
| `--c-bg-700` | `63 63 70` | `#3f3f46` | Accents (`zinc-700`) |
| `--c-text-white` | `250 250 250` | `#fafafa` | Main Text (`zinc-50`) |

### ✨ Gemini Mode (Premium/Gradient Theme)
Inspired by Google Gemini, featuring deep navy and holographic gradients.
- **Background**: `linear-gradient(135deg, #0b1628 0%, #141e37 50%, #0f192d 100%)`
- **Text Headers**: `linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)`
- **Buttons**: `linear-gradient(135deg, #4285f4 0%, #9b72cb 50%, #d96570 100%)`
- **Interactive**: Hover effects use glassmorphism with subtle blue/purple glows.

## 3. UI Components & Patterns

### Cards
- **Dark/Light**: Subtle borders, rounded corners (`rounded-xl` or `rounded-2xl`).
- **Gemini Mode**: Transparent backgrounds (`rgba(30, 58, 95, 0.6)`) with subtle inner glows and blue borders.

### Layout & Spacing
- **Container**: Max width `1280px` (standard `xl`).
- **Standard Padding**: `p-4`, `p-6`, or `p-8` depending on context.
- **Grid Labels**: Consistent use of semantic labels and icons (Lucide/Heroicons).

### Scrollbars
- **Custom Style**: Thin (6px), rounded tracks.
- **Visibility**: Subtle transparency (`0.3` opacity), becomes more visible on hover.
- **Gemini specific**: Gradient thumb for the scrollbar.

## 4. Interaction Design
- **Transitions**: `transition-all 0.3s ease` for theme changes and hover states.
- **Hover States**:
    - Default: Brightening or darkening background.
    - Gemini: `translate-y(-1px)` and increased box-shadow/glow.

## 5. Implementation Guide

To implement the 4 themes and the toggle button exactly as in the Vibe Gallery, follow these steps:

### A. CSS Variables (`index.css`)
Add these variables and theme classes to your global CSS file.

```css
:root {
  /* Default (Dark Mode) - Slate based */
  --c-bg-900: 15 23 42;
  --c-bg-800: 30 41 59;
  --c-bg-700: 51 65 85;
  --c-text-white: 255 255 255;
  --c-text-300: 203 213 225;
  --c-text-400: 148 163 184;
  --c-text-500: 100 116 139;
}

.light {
  /* Light Mode */
  --c-bg-900: 255 255 255;
  --c-bg-800: 248 250 252;
  --c-bg-700: 226 232 240;
  --c-text-white: 15 23 42;
  --c-text-300: 71 85 105;
  --c-text-400: 100 116 139;
  --c-text-500: 148 163 184;
}

.gray {
  /* Gray Mode (True neutral gray) */
  --c-bg-900: 24 24 27;
  --c-bg-800: 39 39 42;
  --c-bg-700: 63 63 70;
  --c-text-white: 250 250 250;
  --c-text-300: 212 212 216;
  --c-text-400: 161 161 170;
  --c-text-500: 113 113 122;
}

.gemini {
  /* Gemini Mode */
  --c-bg-900: 11 22 40;
  --c-bg-800: 17 34 64;
  --c-bg-700: 30 58 95;
  --c-text-white: 255 255 255;
  --c-text-300: 200 220 255;
  --c-text-400: 140 160 200;
  --c-text-500: 100 120 160;
}

/* Base Body Style */
body {
  background-color: rgb(var(--c-bg-900));
  color: rgb(var(--c-text-white));
  transition: background-color 0.3s, color 0.3s;
}

/* Gemini Special Background */
.gemini body {
  background: linear-gradient(135deg, rgb(11, 22, 40) 0%, rgb(20, 30, 55) 50%, rgb(15, 25, 45) 100%);
  background-attachment: fixed;
}
```

### B. Theme Switcher React Component
Use the following logic and JSX for the theme toggle button (requires `lucide-react`).

```tsx
import { useState, useEffect } from 'react';
import { Moon, Sun, Monitor, Sparkles } from 'lucide-react';

type Theme = 'dark' | 'light' | 'gray' | 'gemini';

function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Synchronize body class with theme state
    document.body.classList.remove('light', 'gray', 'gemini');
    if (theme !== 'dark') {
      document.body.classList.add(theme);
    }
  }, [theme]);

  const buttonBaseClass = "p-2 rounded-full transition-all duration-300";
  const activeClass = "bg-blue-600 shadow-lg scale-105 text-white";
  const inactiveClass = "hover:bg-slate-700/50 text-white/60";

  return (
    <div 
      className="fixed top-6 right-6 flex gap-1 p-1 rounded-full backdrop-blur-md z-50 border border-slate-700/50 bg-slate-800"
    >
      {/* Dark Theme */}
      <button
        onClick={() => setTheme('dark')}
        className={`${buttonBaseClass} ${theme === 'dark' ? activeClass : inactiveClass}`}
        title="Dark Mode"
      >
        <Moon size={16} />
      </button>

      {/* Light Theme */}
      <button
        onClick={() => setTheme('light')}
        className={`${buttonBaseClass} ${theme === 'light' ? activeClass : inactiveClass}`}
        title="Light Mode"
      >
        <Sun size={16} />
      </button>

      {/* Gray Theme */}
      <button
        onClick={() => setTheme('gray')}
        className={`${buttonBaseClass} ${theme === 'gray' ? activeClass : inactiveClass}`}
        title="Gray Mode"
      >
        <Monitor size={16} />
      </button>

      {/* Gemini Theme */}
      <button
        onClick={() => setTheme('gemini')}
        className={`${buttonBaseClass} ${theme === 'gemini' ? 'shadow-lg scale-105 text-white' : inactiveClass}`}
        style={{
          background: theme === 'gemini' ? 'linear-gradient(135deg, #4285f4 0%, #9b72cb 50%, #d96570 100%)' : 'transparent'
        }}
        title="Gemini Mode"
      >
        <Sparkles size={16} />
      </button>
    </div>
  );
}
```

### C. Tailwind Configuration
Ensure your `tailwind.config.js` uses the CSS variables to maintain theme synchronization.

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        slate: {
          900: 'rgb(var(--c-bg-900) / <alpha-value>)',
          800: 'rgb(var(--c-bg-800) / <alpha-value>)',
          700: 'rgb(var(--c-bg-700) / <alpha-value>)',
          500: 'rgb(var(--c-text-500) / <alpha-value>)',
          400: 'rgb(var(--c-text-400) / <alpha-value>)',
          300: 'rgb(var(--c-text-300) / <alpha-value>)',
        },
        white: 'rgb(var(--c-text-white) / <alpha-value>)',
      }
    }
  }
}
```
