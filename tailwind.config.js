module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: '#111827',
        primary: '#7C3AED',
        accent: '#22D3EE'
      },
      boxShadow: {
        soft: '0 6px 20px rgba(15, 23, 42, 0.6)',
        glow: '0 8px 30px rgba(124,58,237,0.18)'
      },
      borderRadius: {
        xl: '14px'
      }
    }
  },
  plugins: []
};
