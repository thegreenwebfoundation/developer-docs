---
tags: main
libraryName: Carbon.txt
title: Overview
description: carbon.txt makes sustainability data easier to discover and use on the web.
eleventyNavigation:
  key: overview
  title: Overview
  order: 1
---

# Carbon.txt - Overview

<a href="https://carbontxt.org" target="_blank">carbon.txt</a> makes sustainability data easier to discover and use on the web. Carbon.txt is a single, discoverable location on any web domain for public, machine-readable, sustainability data relating to that company.

It’s a web-first, *connect not collect* style approach, of most benefit to those interested in scraping the structured data companies have to publish according to national laws. Designed to be extended by default, we see carbon.txt becoming essential infrastructure for sustainability data services crunching available numbers and sharing the stories it can tell.

## Why carbon.txt?

1. **Discovery of sustainability data continues to be a problem.** Our research with Wikirate made it abundantly clear that without new, webby approaches, sustainability data will continue to be hard to find or out of date.
1. **Changes in the law mean that lots of firms will need to publish all kinds of sustainability data that previously they didn’t have to.** The law literally says they need to publish this data online, free of charge for the public to see, and there are significant GDPR-scale fees for non-compliance.
1. **New standards mean that this data will be comparable, machine-readable, and likely across different parts of the world.** This could make verifying claims and identifying greenwashing easier, if it’s done right.
1. **Carbon.txt is our open-source project to make this sustainability information easier to discover.** Carbon.txt is a spec that defines predictable, consistent places on any website to publish sustainability data so that both humans and machines can find it.

## These docs

The documentation on this website is aimed at developers looking to build additional tooling that extends carbon.txt - primarily through plugins and other extensions to the [carbon.txt validator](https://github.com/thegreenwebfoundation/carbon-txt-validator). General information about carbon.txt for a non-technical audience is available on the <a hreF="htts://carbontxt.org" target="_blank">carbon.txt website</a>.

## Other carbon.txt Tools

Below are a collection of tools that you can use to get started creating a carbon.txt file for your organisation, or to check the contents of an existing carbon.txt file.

<div class="alert bg-secondary text-white">
  <div class="items-start">
    <div>
      <h2 class="text-white font-bold my-3 gap-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="text-white inline flex-shrink-0 w-6 h-6" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <polyline points="12 7 12 12 15 15" />
</svg>Quickstart guide?</h2>
      <p class="text-lg">Learn how to create a carbon.txt file for your organisation, upload it to your domain, and check that it is valid.</p>
    </div>
  </div>
  <div class="flex-none">
    <a href="https://carbontxt.org/quickstart" class="btn btn-lg btn-black hover:bg-primary">Go to guide</a>
  </div>
</div>

<ul class="list-disc px-0 prose-l gap-6 grid grid-cols-2 mt-8 w-100">
            <li class="card bg-base-100 shadow-xl not-prose">
             <div class="card-body not-prose">
    <h3 class="card-title not-prose">File builder
    </h3>
    <span>Create a carbon.txt file for your organisation or website.</span>
    <div class="card-actions justify-end not-prose">
      <a href="https://carbontxt.org/tools/builder" class="btn btn-secondary" target="_blank">Use the builder</a>
    </div>
  </div>
                </li>
            <li class="card bg-base-100 shadow-xl not-prose">
             <div class="card-body not-prose">
    <h3 class="card-title not-prose">Validator
    </h3>
    <span>Check the syntax of a carbon.txt file and view its content.</span>
    <div class="card-actions justify-end not-prose">
      <a href="https://carbontxt.org/tools/validator" class="btn btn-secondary" target="_blank">Use the validator</a>
    </div>
  </div>
                </li>
    <li class="card bg-base-100 shadow-xl not-prose">
        <div class="card-body not-prose">
            <h3 class="card-title not-prose">Python package</h3>
            <span>Create and validate carbon.txt files using our reference implementation in Python.</span>
            <div class="card-actions justify-end not-prose">
                <a href="https://carbon-txt-validator.readthedocs.io/en/latest/" class="btn btn-secondary" target="_blank">Go to the documentation</a>
            </div>
        </div>
    </li>
    <li class="card g-base-100 shadow-xl not-prose">
        <div class="card-body not-prose">
            <h3 class="card-title not-prose">Syntax reference</h3>
            <span>Learn about all the details of the carbon.txt format from our syntax specification.</span>
            <div class="card-actions justify-end not-prose">
                <a href="https://carbontxt.org/tools/syntax" class="btn btn-secondary" target="_blank">Go to the reference</a>
            </div>
        </div>
    </li>
</ul>

## Keep updated

To follow the carbon.txt project, you can:

<a href="https://www.linkedin.com/company/9184998" class="btn btn-primary">Follow us on LinkedIn</a>
<a href="https://www.thegreenwebfoundation.org/newsletter/" class="btn btn-neutral">Subscribe to our montlhy newsletter</a>

## Licenses

The code for carbon.txt validator library is licensed [Apache 2.0](https://github.com/thegreenwebfoundation/grid-aware-websites/blob/main/LICENSE). ([What does this mean?](<https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)>))
