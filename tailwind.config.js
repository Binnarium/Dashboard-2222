module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  purge: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
  ],
  theme: {
    colors: {
      white: '#ffffff',
      gray: '#242C30',
      black: '#212120',
      primary: '#EC541F',
    },
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
