---
layout: layouts/default.njk
templateEngineOverride: njk,md
---

# Welcome to The Green Web Foundation's Documentation Site

## What you'll find here

This site is a collection of documentation for the open source libraries maintained by The Green Web Foundation. Here you will find tutorials, guides, and explainers to help you implement our libraries into your solutions.

## What libraries are documented?

Currently, the libraries below have some documentation you can reference:

<ul class="list-disc px-0 prose-lg">
{%- for main in collections.main -%}
            <li class="list-disc flex gap-5 px-0 prose-lg"><a href="{{main.url}}">{{ main.data.libraryName }}</a> 
                {%- for language in main.data.languages -%}
                  {% languageBadge language %}
                {%- endfor -%}
                  {% ghStarsBadge main.data.repository %}
                </li>
          {%- endfor -%}
</ul>

<script defer src="https://buttons.github.io/buttons.js"></script>
