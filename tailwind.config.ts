import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "shimmer": {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
        "shimmer-button": {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        randomShapeSquare: {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0)',
          },
          '50%': {
            transform: 'translate(var(--random-x), var(--random-y)) rotate(var(--random-rotation))',
          },
        },
        moveSymbol: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(5px, -5px)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "shimmer": 'shimmer 8s linear infinite',
        "shimmer-button": 'shimmer-button 8s linear infinite',
        'random-shape-square': 'randomShapeSquare var(--random-speed) ease-in-out infinite',
        'symbol': 'moveSymbol 3s ease-in-out infinite'

      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config