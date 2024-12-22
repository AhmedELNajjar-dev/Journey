export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Custom blue
        secondary: '#FBBF24', // Custom yellow
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, theme("colors.slate.950"), theme("colors.blue.950"), theme("colors.slate.950"))',

      },
    },
  },
  plugins: [],
};
