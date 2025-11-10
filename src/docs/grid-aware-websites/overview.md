---
tags: main
libraryName: Grid-aware Websites
title: Overview
description: Understand more about the Grid-aware Websites project, the toolkit and code libraries that it includes, and how to implement them on your own websites.
eleventyNavigation:
  key: overview
  title: Overview
  order: 1
---

# Grid-aware Websites - Overview

We’re creating a toolkit to enable developers and designers to understand more about the electricity a visitor is consuming when on their website and adjust the design accordingly. We call websites that respond to the electricity grid in this way grid-aware.

## What's in the toolkit?

The toolkit, which is currently under development, will consist of:

- An open-source code library.
- Technical documentation including explainer guides, tutorials and case studies.
- A UX/UI catalogue of design ideas.

## What's a grid-aware website? How impactful are they?

We've got answers to these questions, and many more, in the FAQ section of [this project's homepage on our website](https://www.thegreenwebfoundation.org/tools/grid-aware-websites/#whats-a-gaw).

## Case studies

Below are some public case studies from people who've used the Grid-aware Websites code and UI/UX toolkit in real world projects. If you've done the same, and would like to share your experience, please [contact us](https://www.thegreenwebfoundation.org/support-form/?wpf2192_9=Another%20subject) via our website.

<ul class="list-disc px-0 prose-lg flex gap-6 flex-wrap">
{%- for post in caseStudies.gaw -%}
            <li class="card w-full md:w-96 bg-base-100 shadow-xl not-prose">
            <figure class="not-prose"><img src="{% postFeatureImage post.featured_media %}" alt="" class=" not-prose" loading="lazy"/></figure>
             <div class="card-body not-prose">
    <h3 class="card-title not-prose">{{ post.title.rendered | safe }}
    </h3>
    <span>{{ post.excerpt.rendered | safe }}</span>
    <div class="card-actions justify-end not-prose">
      <a href="{{ post.link }}" class="btn btn-secondary">Read more</a>
    </div>
  </div>
                </li>
          {%- endfor -%}
</ul>

## Using Grid-aware Websites

<p>This toolkit is open-source and free for you to use. The code library and plugins are licensed <a href="https://github.com/thegreenwebfoundation/co2.js/blob/main/LICENSE" target="_blank" rel="noreferrer noopener">Apache 2.0</a> (<a href="https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)" target="_blank" rel="noreferrer noopener">What does this mean?</a>).</p>

<p>We welcome <a href="https://www.thegreenwebfoundation.org/tools/contribute/">contributions</a> and <a href="https://www.thegreenwebfoundation.org/contact/">info on how this tool helped you solve a problem.</a></p>

<p>We work as a non-profit entity to further the mission of a fossil-free internet, using a small amount of funding carefully for the public benefit. Our work is made possible by the generous donations of grant funders, and also those that use our tools. If you find our work helpful, either as an individual or an organisation, <a href="https://www.thegreenwebfoundation.org/donate/">please consider a donation</a> to help us maintain and progress our work.</p>

<p>You can also enquire about retainers for accessing technical advice or funding specific features via our <a href="https://www.thegreenwebfoundation.org/services/">services page</a>.</p>

## Keep updated

To follow the Grid-aware Websites project, you can:

- <a href="https://www.linkedin.com/company/9184998" class="btn btn-primary">Follow us on LinkedIn</a>
- <a href="https://www.thegreenwebfoundation.org/newsletter/" class="btn btn-neutral">Subscribe to our montlhy newsletter</a>

## Licenses

The code for Grid-aware Websites core library and plugins are licensed [Apache 2.0](https://github.com/thegreenwebfoundation/grid-aware-websites/blob/main/LICENSE). ([What does this mean?](<https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)>))
