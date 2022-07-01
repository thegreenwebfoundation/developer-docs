const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const metagen = require('eleventy-plugin-metagen');

const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("public");

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(metagen);

  // Filters
  eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
    postcss([tailwindcss(require('./tailwind.config.js')), autoprefixer()])
      .process(cssCode)
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null)
      );
  });

  eleventyConfig.addNunjucksFilter("getDocumentsFromCollection", function (collection, value) {
    const docs = collection.filter(doc => doc.data.repo === value)
    return docs
  });

  // Shortcodes
  eleventyConfig.addNunjucksShortcode("languageBadge", function (language) {
    if (language === "javascript") {
      return `<span class="self-center badge badge-large bg-yellow-300 text-slate-900 border-current">JavaScript</span>`
    } else if (language === "go") {
      return `<span class="self-center badge badge-large bg-cyan-600 text-cyan-50 border-current">Go/Golang</span>`
    }

    return ''
  });

  eleventyConfig.addNunjucksShortcode("ghStarsBadge", function (repo) {

    const cleanRepo = repo.replace('https://github.com/', '')
    return `<a href="https://github.com/thegreenwebfoundation/co2.js/stargazers" class="self-center"><img class="my-0 self-center" alt="GitHub stars" src="https://img.shields.io/github/stars/${cleanRepo}?color=%2365B54C&label=Github%20stars&style=for-the-badge"></a>`
  });

  eleventyConfig.addNunjucksShortcode("generateDocsPath", function (slug) {
    return slug.replace('/docs', '')
  })

  eleventyConfig.addNunjucksShortcode("getPrNumber", function (url) {
    const prNumber = url.split('/').pop().trim()
    return prNumber
  })

  eleventyConfig.addWatchTarget('styles/**/*.css');
  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};