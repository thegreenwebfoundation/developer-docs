---
tags: apiMain
libraryName: Carbon.txt API
title: Overview
description: Use this API to lookup and validate carbon.txt files.
hasTabs: true
eleventyNavigation:
  key: carbon-txt-api-overview
  title: Overview
  order: 1
---

# Carbon.txt API

The carbon.txt API allows you to validate the syntax and content of carbon.txt files, and to look up the carbon.txt file for a given domain.

{% include 'partials/carbon-txt-overview.njk' %}

## These docs

The documentation in this section is aimed at developers looking to use the carbon.txt API provided by the Green Web Foundation to discover, validate, and parse carbon.txt files and their contents. General information about carbon.txt for a non-technical audience is available on the [carbon.txt website](https://carbontxt.org).

This documentation covers:

- [Authenticating](/api/carbon-txt-/authentication) requests made to the carbon.txt API
- Using the carbon.txt API to discover and parse carbon.txt files on a [given web domain](/api/carbon-txt-/check-by-domain)
- Using the carbon.txt API to discover and parse carbon.txt files at a [specific public URL](/api/carbon-txt-/check-by-url)
- Using the carbon.txt API to parse [carbon.txt content directly](/api/carbon-txt-/check-by-content)

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
    <li class="card bg-base-100 shadow-xl not-prose">
        <div class="card-body not-prose">
            <div>
                <h3 class="card-title not-prose">Syntax reference</h3>
                <span>Learn about all the details of the carbon.txt format from our syntax specification.</span>
            </div>
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
