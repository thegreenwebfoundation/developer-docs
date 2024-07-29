module.exports = {
  content: ['./src/**/*.{njk,md}', './.eleventy.js'],
  daisyui: {
    themes: [ {
      tgwf: {
        "primary": "#00FF00",
        "secondary": "#0066FF",
        "accent": "#CB2CFF",
        "neutral": "#F4F3F2",
        "base-100": "#FFFFFF",
        "info": "#FFE600",
        "success": "#00FF00",
        "warning": "#0066FF",
        "error": "#CB2CFF",
      },
    } ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
};