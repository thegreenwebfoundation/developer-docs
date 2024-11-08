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

## Confirmed

Things that we have a detailed spec for and are funded. These are updates that we are committing to releasing.

{% set issues = co2jsRoadmapConfirmed %}
{% include 'partials/roadmapList.njk' %}

## Designing

These are things that we have identified a specific outcome that is to be addressed. However, we’re still working on the details, timings and/or where the funding will come from.

{% set issues = co2jsRoadmapDesigning %}
{% include 'partials/roadmapList.njk' %}

## Exploring

New ideas that we have not yet fully triaged, but that we feel are worth further discussion on how they might be implemented. These are a selection of the issues we are most hopeful for. To see all open issues, see the [CO2.js repository on GitHub](https://github.com/thegreenwebfoundation/co2.js/issues).

{% set issues = co2jsRoadmapExploring %}
{% include 'partials/roadmapList.njk' %}
