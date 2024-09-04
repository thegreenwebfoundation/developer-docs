---
layout: layouts/default.njk
templateEngineOverride: njk,md
---

# Welcome to Green Web Foundation's Documentation Site

## What you'll find here

This site is a collection of documentation for the open source libraries maintained by [Green Web Foundation](https://www.thegreenwebfoundation.org). Here you will find tutorials, guides, and explainers to help you implement our libraries into your solutions.

## Libraries

[Green Web Foundation](https://www.thegreenwebfoundation.org) has built and maintains several libraries. These libraries allow developers to access peer-reviewed carbon estimation calculations, as well as provide interfaces to surface carbon intensity data.

<div class="">

</div>

<ul class="list-disc px-0 prose-lg flex gap-6 flex-wrap">
{%- for main in collections.main -%}
            <li class="card w-full md:w-96 bg-base-100 shadow-xl">
             <div class="card-body">
    <h3 class="card-title">{{ main.data.libraryName }}
                {%- for language in main.data.languages -%}
                  {% languageBadge language %}
                {%- endfor -%}
    </h3>
    <p>{{ main.data.description }}</p>
    <div class="card-actions justify-end">
      <a href="{{ main.url}}" class="btn btn-primary">Get started</a>
      <a href="{{ main.data.repository }}" class="btn btn-black">
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
</svg>
  GitHub
</a>
    </div>
  </div>
                </li>
          {%- endfor -%}
</ul>

## APIs

The Green Web Foundation has several public API endpoints. These APIs are built on top of The Green Web Foundation's dataset, and provide developers with easy access to a range of data.

<ul class="list-disc px-0 prose-lg flex gap-6 flex-wrap">
{%- for main in collections.apiMain -%}
            <li class="card w-full md:w-96 bg-base-100 shadow-xl">
             <div class="card-body">
    <h3 class="card-title">{{ main.data.libraryName }}
                {%- for language in main.data.languages -%}
                  {% languageBadge language %}
                {%- endfor -%}
    </h3>
    <p>{{ main.data.description }}</p>
    <div class="card-actions justify-end">
      <a href="{{ main.url}}" class="btn btn-primary">Get started</a>
      <a href="{{ main.data.repository }}" class="btn btn-black">
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
</svg>
  GitHub
</a>
    </div>
  </div>
                </li>
          {%- endfor -%}
</ul>

<script defer src="https://buttons.github.io/buttons.js"></script>
