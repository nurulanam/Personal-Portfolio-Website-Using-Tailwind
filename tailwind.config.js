/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        red: {
          main: '#F44336',
        },
        gray: {
          main: '#414141',
        },
        black: {
          main: '#121212',
        }
      },
      container: {
        center: true,
      }
    },
  },
  plugins: [],
}

