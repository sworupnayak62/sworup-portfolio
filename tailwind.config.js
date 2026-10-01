/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        asphalt: { DEFAULT: '#0d0e11', 2: '#15171c', 3: '#1e2027' },
        saffron: '#f7b32b',
        marigold: '#e2721b',
        awning: '#2446a8',
        banner: { DEFAULT: '#b3301f', deep: '#8f1f14' },
        steam: { DEFAULT: '#efe9df', dim: '#bdb5a8' },
        kraft: '#caa66c',
        ink: '#17130d',
      },
      fontFamily: {
        brush: ['"Caveat Brush"', 'cursive'],
        marker: ['"Permanent Marker"', 'cursive'],
        body: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
