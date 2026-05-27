/** @type {import('tailwindcss').Config} */
export default {
  content: ['./admin.html', './src/admin/**/*.{js,jsx}'],
  important: '.admin-root',
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1220', 800: '#1E293B' },
        gold: { DEFAULT: '#C9A45C', soft: '#d9b878', deep: '#a8853e' },
        ivory: { DEFAULT: '#F8F5EF', warm: '#efeae0' },
        slate: { DEFAULT: '#64748B', light: '#94a3b8' },
        border: 'rgba(11, 18, 32, 0.08)',
        background: '#F8F5EF',
        foreground: '#1E293B',
        primary: { DEFAULT: '#C9A45C', foreground: '#0B1220' },
        secondary: { DEFAULT: '#0B1220', foreground: '#F8F5EF' },
        muted: { DEFAULT: '#efeae0', foreground: '#64748B' },
        accent: { DEFAULT: '#efeae0', foreground: '#0B1220' },
        destructive: { DEFAULT: '#b91c1c', foreground: '#fff' },
        card: { DEFAULT: '#ffffff', foreground: '#1E293B' },
        popover: { DEFAULT: '#ffffff', foreground: '#1E293B' },
        ring: '#C9A45C',
        input: 'rgba(11, 18, 32, 0.16)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { lg: '4px', md: '3px', sm: '2px' },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 200ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' }), require('tailwindcss-animate')],
  corePlugins: { preflight: false }, // Don't reset public site CSS
};
