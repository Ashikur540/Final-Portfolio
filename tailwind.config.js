module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Inter, sans-serif',
    },
    container: {
      padding: {
        DEFAULT: '1.5rem',
        lg: '3rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    extend: {
      colors: {
        body: '#060212',
        white: '#fff',
        para: '#D2E2EE',
        pink: 'pink',
        green: '#124B47',
        transparent: 'transparent'
      },
      boxShadow: {
        primary: '0px 4px 40px rgba(0, 0, 0, 0.03)',
      },
      backgroundImage: {
        project: "url('/src/Asset/p1.png')",
        videoBg: "url('/src/assets/img/video-bg.png')",
        circle: "url('/src/assets/img/circle.png')",
        explore: "url('/src/assets/img/explore.png')",
      },
    },
  },
  plugins: [],
};