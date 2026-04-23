export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1B4332',
        'primary-dark': '#132D22',
        accent: '#F4A623',
        surface: '#F9F6F0',
        'text-primary': '#1A1A2E',
        'text-secondary': '#6B7280',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
