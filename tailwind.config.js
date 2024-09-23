module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Inter, sans-serif',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '3rem',
      },
    },


    extend: {
      colors: {
        body: '#060212',
        black: "#00031a",
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
        projectOne: "url('/src/assets/p1.png')",
        radialBg: "url('/src/assets/hero-bg.webp')",
        projectTwo: "url('/src/assets/review.png')",
        projectThree: "url('/src/assets/ecommers.png')",
        projectFour: "url('/src/assets/p2.png')",
        me: "url('/src/assets/me.jpg')",

      },
      animation: {
        spin: 'spin 5s linear infinite',
        wiggle: 'wiggle 500ms ease-in-out infinite',
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },

    },
  },
  plugins: [],
};