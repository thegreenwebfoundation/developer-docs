---
tags: main
libraryName: CO2.js
title: Overview
description: CO2.js is a JavaScript library that allows developers to estimate the emissions associated with their apps, websites and software.
eleventyNavigation:
  key: overview
  title: Overview
  order: 1
---

# CO2.js - Overview

One day, the internet will be powered by renewable energy. Until that day comes, there’ll be a CO2 cost that comes with every byte of data that’s uploaded or downloaded. By being able to calculate these emissions, developers can be empowered to create more efficient, lower carbon apps, websites, and software.

<div class="alert bg-secondary text-white">
  <div class="items-start">
    <div>
      <h2 class="text-white font-bold my-3 gap-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="text-white inline flex-shrink-0 w-6 h-6" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <polyline points="12 7 12 12 15 15" />
</svg>In a hurry?</h2>
      <p class="text-lg">Check out our quickstart guide: <br/> <a href="https://www.thegreenwebfoundation.org/news/start-calculating-digital-carbon-emissions-in-5-minutes-with-co2-js/" class="text-white"><em>Start calculating digital carbon emissions in 5 minutes with CO2.js</em></a></p>
    </div>
  </div>
  <div class="flex-none">
    <a href="https://www.thegreenwebfoundation.org/news/start-calculating-digital-carbon-emissions-in-5-minutes-with-co2-js/" class="btn btn-lg btn-accent no-underline hover:text-white">Go to guide</a>
  </div>
</div>

## What is CO2.js?

CO2.js is a JavaScript library that allows developers to estimate the emissions associated with their apps, websites and software. At its core, CO2.js takes an input of data, in bytes, and returns an estimate of the carbon emissions produced to move that data over the internet. It can be run in Node.js server environments, in the browser, as well as on some serverless and edge compute runtimes.

## Why use it?

Being able to estimate the carbon emissions associated with digital activities can be of benefit to both development teams and end users. The carbon emissions of the internet are something that is abstract, and out of sight. Using CO2.js allows these emissions to be surfaced, visualised, and presented in ways that make it easier for people to comprehend and act on.

### Use it in apps

It can be used in user-facing applications to give visibility to the carbon impact of user activity in the application. Users uploading files, or downloading content, could be notified of the impacts of those tasks. Large, carbon intensive, data transfers could also be blocked or limited. Users could also have the option to set a carbon budget for their browsing or use of an app, website, or online service.

### Use it in development workflows

Behind the scenes, developers could look to use CO2.js as part of their deployment workflow. In the same way that web developers might set a _performance budget_ for their site, [a carbon budget could also be used](https://css-tricks.com/reduce-your-websites-environmental-impact-with-a-carbon-budget/). If a website or app exceeds a threshold for carbon intensity, then an alert can be raised or a new deployment can be blocked.

### Use it for reporting

The data from CO2.js can also be used as part of internal monitoring tools and dashboards. Office managers and sustainability teams could also use CO2.js to track the carbon intensity of data usage within an office environment. Plugging network data usage into CO2.js can allow for monitoring and reporting on the digital usage footprint of an organisation or business.

## Case studies

The above a just a few examples of the many and varied ways CO2.js can be applied to provide carbon estimates for data transfer. If you’re using CO2.js in production we’d love to hear how! [Contact us](https://www.thegreenwebfoundation.org/support-form/) via our website.

<ul class="list-disc px-0 prose-lg flex gap-6 flex-wrap">
{%- for post in caseStudies -%}
            <li class="card w-full md:w-96 bg-base-100 shadow-xl not-prose">
            <figure class="not-prose"><img src="{% postFeatureImage post.featured_media %}" alt="" class=" not-prose" loading="lazy"/></figure>
             <div class="card-body not-prose">
    <h3 class="card-title not-prose">{{ post.title.rendered | safe }}
    </h3>
    <span>{{ post.excerpt.rendered | safe }}</span>
    <div class="card-actions justify-end not-prose">
      <a href="{{ post.link }}" class="btn btn-secondary text-white no-underline">Read more</a>
    </div>
  </div>
                </li>
          {%- endfor -%}
</ul>

## Licenses

The code for CO2.js is licensed [Apache 2.0](https://github.com/thegreenwebfoundation/co2.js/blob/main/LICENSE). ([What does this mean?](<https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)>))

The carbon intensity data from Ember is published under the Creative Commons ShareAlike Attribution Licence ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)). ([What does this mean?](https://www.tldrlegal.com/license/creative-commons-attribution-share-alike-cc-sa))

The marginal intensity data is published by the Green Web Foundation, under the Creative Commons ShareAlike Attribution Licence ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)). ([What does this mean?](https://www.tldrlegal.com/license/creative-commons-attribution-share-alike-cc-sa))
