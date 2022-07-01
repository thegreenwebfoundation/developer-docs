module.exports = {
  content: ['./src/**/*.{njk,md}', './.eleventy.js'],
  daisyui: {
    themes: [{
      tgwf: {
        "primary": "#65B54C",
        "secondary": "#476F22",
        "accent": "#F48C26",
        "neutral": "#1B1A18",
        "base-100": "#FFFFFF",
        "info": "#3377FF",
        "success": "#8AC850",
        "warning": "#FBDA56",
        "error": "#FE3E3E",
      },
    }, ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
};