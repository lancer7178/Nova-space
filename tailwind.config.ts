import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))', // #FFFFFF // white
        foreground: 'hsl(var(--foreground))', // #111827 // gray-900
        card: {
          DEFAULT: 'hsl(var(--card))', // #3F3F46 // slate-700
          focus: 'hsl(var(--card-focus))', // #27272A // slate-800
          foreground: 'hsl(var(--card-foreground))' // #FFFFFF // white
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))', // #FFFFFF // white
          focus: 'hsl(var(--popover-focus))', // #F3F4F6 // gray-200
          foreground: 'hsl(var(--popover-foreground))' // #111827 // gray-900
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))', // #1E40AF // blue-800
          focus: 'hsl(var(--primary-focus))', // #1E3A8F // blue-900
          foreground: 'hsl(var(--primary-foreground))' // #FFFFFF // white
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',  // #FBBF24 // yellow-400
          focus: 'hsl(var(--secondary-focus))', // #F59E0B // yellow-500
          foreground: 'hsl(var(--secondary-foreground))' // #1E3A8F // blue-900
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))', // #F3F4F6 // gray-200
          focus: 'hsl(var(--muted-focus))', // #E5E7EB // gray-300
          foreground: 'hsl(var(--muted-foreground))' // #6B728 0 // gray-600
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',  // #F472B6 // pink-500
          focus: 'hsl(var(--accent-focus))', // #EC4899 // pink-600
          foreground: 'hsl(var(--accent-foreground))' // #FFFFFF // white
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))', // #F87171 // red-400
          focus: 'hsl(var(--destructive-focus))', // #EF4441 // red-500
          foreground: 'hsl(var(--destructive-foreground))' // #FFFFFF // white
        },
        border: 'hsl(var(--border))', // #E5E7EB // gray-300
        input: 'hsl(var(--input))', // #F3F4F6 // gray-200
        ring: 'hsl(var(--ring))', // #D1D5DB // gray-400
        ringOffset: 'hsl(var(--ring-offset))', // #FFFFFF // white
        backgroundSecondary: 'hsl(var(--background-secondary))', // #F3F4F6  // gray-200
        backgroundTertiary: 'hsl(var(--background-tertiary))', // #E5E7EB  // gray-300
        foregroundSecondary: 'hsl(var(--foreground-secondary))', // #6B7280 // gray-600
        foregroundTertiary: 'hsl(var(--foreground-tertiary))', // #9CA3AF   // gray-500
        foregroundQuaternary: 'hsl(var(--foreground-quaternary))', // #D1D5DB  // gray-400
        foregroundQuinary: 'hsl(var(--foreground-quinary))', // #F3F4F6  // gray-200
        foregroundSenary: 'hsl(var(--foreground-senary))', // #F9FAFB  // gray-50
        foregroundSeptenary: 'hsl(var(--foreground-septenary))', // #FDFDFD  // gray-100
        foregroundOctonary: 'hsl(var(--foreground-octonary))', // #FFFFFF  // white
        foregroundNonary: 'hsl(var(--foreground-nonary))', // #F3F4F6  // gray-200
        chart: {
          '1': 'hsl(var(--chart-1))', // #F87171 // red-400
          '2': 'hsl(var(--chart-2))', // #FBBF24 // yellow-400
          '3': 'hsl(var(--chart-3))', // #34D399 // green-400
          '4': 'hsl(var(--chart-4))', // #60A5FA // blue-400
          '5': 'hsl(var(--chart-5))' // #A78BFA // purple-400 
        }
      },
      borderRadius: {
        lg: 'var(--radius)', // 0.5rem
        md: 'calc(var(--radius) - 2px)', // 0.375rem
        sm: 'calc(var(--radius) - 4px)' // 0.25rem
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"), // For animations
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "hsl(var(--primary))", // #1E40AF  // blue-800
          "primary-focus": "hsl(var(--primary-focus))", // #1E3A8F // blue-900
          "primary-content": "hsl(var(--primary-foreground))", // #FFFFFF // white

          secondary: "hsl(var(--secondary))", // #FBBF24 // yellow-400
          "secondary-focus": "hsl(var(--secondary-focus))", // #F59E0B4 // yellow-500
          "secondary-content": "hsl(var(--secondary-foreground))", // #1E3A8F // blue-900

          accent: "hsl(var(--accent))", // #F472B6 // pink-500
          "accent-focus": "hsl(var(--accent-focus))", // #EC4899 // pink-600
          "accent-content": "hsl(var(--accent-foreground))", // #FFFFFF // white

          neutral: "hsl(var(--card))", // #3F3F46 // slate-700
          "neutral-focus": "hsl(var(--card-focus))", // #27272A // slate-800
          "neutral-content": "hsl(var(--card-foreground))", // #FFFFFF // white

          "base-100": "hsl(var(--background))", // #FFFFFF // white
          "base-200": "hsl(var(--background-secondary))", // #F3F4F6 // gray-200
          "base-300": "hsl(var(--background-tertiary))", // #E5E7EB // gray-300
          "base-content": "hsl(var(--foreground))", // #111827 // gray-900
          "base-100-content": "hsl(var(--foreground-secondary))", // #6B7280 // gray-600
          info: "#3ABFF8", // #3ABFF8 // blue-400
          success: "#36D399", // #36D399 // green-400
          warning: "#FBBD23", // #FBBD23 // yellow-400
          error: "hsl(var(--destructive))", // #F87171 // red-400
          "error-focus": "hsl(var(--destructive-focus))", // #EF4441 // red-500
          "error-content": "hsl(var(--destructive-foreground))", // #FFFFFF // white
        },
      },
    ],
  },
};

export default config;
