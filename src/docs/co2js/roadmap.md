---
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

{% set issues = co2jsRoadmapCurrent %}
{% include 'partials/roadmapList.njk' %}

## Future Updates

Updates that we would like to work on or include in CO2.js but which require funding or community contribution.

{% set issues = co2jsRoadmapFuture %}
{% include 'partials/roadmapList.njk' %}
