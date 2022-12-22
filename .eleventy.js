const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const metagen = require('eleventy-plugin-metagen');
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const img2picture = require('eleventy-plugin-img2picture');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')
const fetch = require('node-fetch').default;

const postCssPlugins = [tailwindcss(require('./tailwind.config.js')), autoprefixer()]

const dev = process.env.NODE_ENV !== 'production'

if (!dev) { postCssPlugins.push(cssnano())}
const slugify = (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'))

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({
    public: './'
  })

  // Process Markdown
  let markdownItOptions = {
    html: true // you can include HTML tags
}

let markdownItAnchorOptions = {
    level: [2,3], // minimum level header -- anchors will only be applied to h2 level headers and below but not h1
}

  eleventyConfig.setLibrary("md", markdownIt(markdownItOptions).use(markdownItAnchor, {...markdownItAnchorOptions, slugify, permalink: markdownItAnchor.permalink.linkInsideHeader({
    symbol: `<span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 24 24" stroke-width="3" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
    <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
  </svg></span>`,
    placement: 'before'
  })}));

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(sitemap, {
    lastModifiedProperty: "modified",
    sitemap: {
      hostname: "https://developers.thegreenwebfoundation.org",
    },
  });
  eleventyConfig.addPlugin(img2picture, {
    eleventyInputDir: 'src',
    imagesOutputDir: 'dist/img',
    urlPath: '/img/',
    extensions: ['jpg', 'png', 'jpeg'],
    formats: ['avif', 'webp', 'jpeg'],
    minWidth: 200,
    maxWidth: 1500,
    widthStep: 150,
    fetchRemote: true, // fetch remote images to optimize and serve them
    cacheOptions: {
      duration: "14d", // cache the fetched remote images for 14 days
      type: "buffer"
    }
  });

  // Filters
  eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
    postcss(postCssPlugins)
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

  eleventyConfig.addNunjucksFilter("nextPage", function (pages, pageUrl) {
    const thisPage = pages.findIndex(page => page.url === pageUrl)
    return pages[thisPage + 1]
  });

  eleventyConfig.addNunjucksFilter("previousPage", function (pages, pageUrl) {
    const thisPage = pages.findIndex(page => page.url === pageUrl)
    return pages[thisPage -1]
  });

  // Shortcodes
  eleventyConfig.addNunjucksShortcode("analytics", function() {
    if (dev) {
      return ''
    }

    return `<script async defer src="https://scripts.withcabin.com/hello.js"></script>`
  })

  eleventyConfig.addNunjucksAsyncShortcode("postFeatureImage", async function (src) {
    if (!src) {
      return ''
    }

    const url = await fetch('https://www.thegreenwebfoundation.org/wp-json/wp/v2/media/' + src).then(data => data.json()).then(data => data.source_url)

    return url
  });

  eleventyConfig.addNunjucksShortcode("languageBadge", function (language) {
    if (language === "javascript") {
      return `<span class="badge badge-large bg-yellow-300 text-slate-900 border-current">JavaScript</span>`
    } else if (language === "go") {
      return `<span class="badge badge-large bg-cyan-600 text-cyan-50 border-current">Go/Golang</span>`
    }

    return ''
  });

  eleventyConfig.addNunjucksShortcode("ghStarsBadge", function (repo) {

    const cleanRepo = repo.replace('https://github.com/', '')
    return `<a href="https://github.com/thegreenwebfoundation/co2.js/stargazers" class="self-center"><img class="my-0 self-center" alt="GitHub stars" src="https://img.shields.io/github/stars/${cleanRepo}?color=%2365B54C&label=Github%20stars&style=for-the-badge"></a>`
  });

  eleventyConfig.addNunjucksShortcode("betaCodeWarning", function (link) {

    const prNumber = link.split('/').pop().trim()
    return `<div class="alert alert-warning">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Warning: The code below is currently experimental. <a href="${link}">Related pull request #${prNumber}</a>.</span>
          </div>
      </div>`
  });

  eleventyConfig.addNunjucksShortcode("generateDocsPath", function (slug) {
    return slug.replace('/docs', '')
  })

  eleventyConfig.addNunjucksShortcode("getPrNumber", function (url) {
    const prNumber = url.split('/').pop().trim()
    return prNumber
  })

  eleventyConfig.addNunjucksShortcode("codeSnippet", function (code, lang) {
    const cleanCode = code.trim()

    if (lang === 'curl') {
      return "```shell\n" + cleanCode + "\n```"
    } else if (lang === 'js') {
      return "```javascript\n" + cleanCode + "\n```"
    }
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