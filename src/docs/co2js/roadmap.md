---
tags: main
libraryName: CO2.js
title: Roadmap
description: This page contains links to different Github issues that track the various ideas and plans we've got for the CO2.js library.
eleventyNavigation:
  key: roadmap
  title: Roadmap
  order: 6
---

# CO2.js - Roadmap

We publish our roadmap to give the CO2.js community visibility on future features and enhancements we have planned, and what we need help and funding for. Features for which we are seeking funding – something that we rely heavily on as a non-profit organisation – are highlighted. We'd love to hear from organisations that are interested in feature sponsorship.

## Planned Updates

Updates that we have planned for releases in the near future.

<ul class="list-disc px-0 flex gap-6 flex-wrap">
{%- for issue in co2jsRoadmapCurrent -%}
            <li class="card w-full md:w-96 bg-base-100 shadow-xl">
             <div class="card-body justify-between">
    <div>
      <h3 class="card-title">{{ issue.title | safe }}
      </h3>
      {% if issue.milestone.title %}
      <div>
        <div class="badge badge-outline">Release {{ issue.milestone.title }}</div>
      </div>
      {% endif %}
      <div class="flex flex-wrap gap-2">
        <p class="prose prose-sm">Comments: {{ issue.comments }}</p>
        <p class="prose prose-sm">Reactions: {{ issue.reactions.total_count }}</p>
      </div>
      <p>Contributed by: <span class="roadmap-issue-contributor"><img class="sm:invisible md:visible" src="{{ issue.user.avatar_url }}" loading="lazy"> <a href="{{ issue.user.html_url }}">{{ issue.user.login }}</a></small>
    </div>
    <div class="card-actions justify-between">
    {%- if issue.fundingRequired -%}
      <a href="https://www.thegreenwebfoundation.org/donate/" class="btn btn-secondary text-white">Funding Required</a>
    {%- endif -%}
    <a href="{{ issue.url }}" class="btn btn-black text-white">
      View on Github
    </a>
    </div>

  </div>
                </li>
          {%- endfor -%}
</ul>

## Future Updates

Updates that we would like to work on or include in CO2.js but which require funding or community contribution.

<ul class="list-disc px-0 flex gap-6 flex-wrap">
{%- for issue in co2jsRoadmapFuture -%}
            <li class="card w-full md:w-96 bg-base-100 shadow-xl">
             <div class="card-body justify-between">
    <div>
      <h3 class="card-title">{{ issue.title | safe }}
      </h3>
      <div>
        <div class="badge badge-outline">Release {{ issue.milestone.title }}</div>
      </div>
      <div class="flex flex-wrap gap-2">
        <p class="prose prose-sm">Comments: {{ issue.comments }}</p>
        <p class="prose prose-sm">Reactions: {{ issue.reactions.total_count }}</p>
      </div>
      <p>Contributed by: <span class="roadmap-issue-contributor"><img class="sm:invisible md:visible" src="{{ issue.user.avatar_url }}" loading="lazy"> <a href="{{ issue.user.html_url }}">{{ issue.user.login }}</a></small>
    </div>
    <div class="card-actions justify-between">
    {%- if issue.fundingRequired -%}
      <a href="https://www.thegreenwebfoundation.org/donate/" class="btn btn-secondary text-white">Funding Required</a>
    {%- endif -%}
    <a href="{{ issue.url }}" class="btn btn-black  text-white">
      View on Github
    </a>
    </div>

  </div>
                </li>
          {%- endfor -%}
</ul>
