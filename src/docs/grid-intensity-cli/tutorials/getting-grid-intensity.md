---
title: Getting grid intensity for a region
description: In this tutorial you will use the Grid Intensity CLI to get both historical and near-realtime data for a region.
eleventyNavigation:
  key: getting-grid-intensity
  title: Getting grid intensity for a region
  # parent: overview
  sectionTitle: Tutorials
  order: 10
---
# {{ title }}

## Overview

Being aware of the grid intensity for the regions in which your code runs allows you to make better informed decisions about where and/or when to run it.

In this tutorial, you will use the Grid Intensity CLI to:

1. Get historical emissions intensity data for a region.
1. Change data providers, and
1. Get near-realtime grid intensity data for a region.

## Before starting

Ensure that you have the [Grid Intensity CLI installed](/grid-intensity-cli/installation) locally.

## Learning goals

- How to use the Grid Intensity CLI historical and near-realtime data.
- How to change providers using the CLI.

In this tutorial we will be using the [Ember](https://ember-climate.org/) and [WattTime](https://www.watttime.org/) provider integrations. We will use the Grid Intensity CLI to get data for the country of Portugal.

## Get grid intensity for the last calendar year

To being with, let's get grid intensity data for the last calendar year. By doing this, we can get a snapshot of a region's carbon intensity profile.

Once you have installed the [Grid Intensity CLI](/grid-intensity-cli/installation), run the following command in your terminal.

```bash
grid-intensity --region=PT
```

The command above uses the Ember dataset - the default integration for the Grid Intensity CLI. We have used the `--region` flag to request data for Portugal (`PT`).

<div class="alert alert-info">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>When using Ember, you will need to pass either an <a href="https://www.iso.org/obp/ui/#search">Alpha-2 or Alpha-3 ISO country code</a> for the region you want data for.</span>
  </div>
</div>

Running the command above will return data that looks similar to the snippet below.

```json
{
	"country_code_iso_2": "PT",
	"country_code_iso_3": "PRT",
	"country_or_region": "Portugal",
	"year": 2021,
	"latest_year": 2021,
	"emissions_intensity_gco2_per_kwh": 222.632
}
```

Here, we are interested in the value of the `emissions_intensity_gco2_per_kwh` field. This shows us how many grams of CO2 were emitted per kilowatt-hour of electricity generated in a region. The closer to zero this number is, the cleaner a region's electric grid is.

## Get near realtime grid intensity data

Having historical data for a region is a great first step. But, if we want our code to be _carbon aware_ then we'll need to get more up-to-date information.

To do this, we will use the WattTime API integration.

<aside class="alert  alert-warning"><div>
<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
	<p>Please note that you will need to first create a free WattTime user account to use their API.</p>
</div></aside>

{% include 'snippets/watttime-registration.md' %}

### Using WattTime with the Grid Intensity CLI

Once you have setup your WattTime account, you can run the command below in your terminal.

```bash
grid-intensity --provider=watttime.org --region=PT
```

Here, we use the `--provider` flag to let the CLI know that we want to use the WattTime API to fetch data. As before, we have set the `--region` flag to return data for Portugal (`PT`).

Running the command above will return data that looks similar to the snippet below.

```json
{
	"ba": "PT",
	"freq": "300",
	"moer": "",
	"percent": "81",
	"point_time": "2022-07-28T06:00:00Z"
}
```

Here, we are interested in the value of the `percent` field. This value represents the relative realtime marginal emissions intensity for the _past month_. A lower value here represents a cleaner electricity grid.

## Wrapping up

Now you know how to use different providers to fetch regional grid intensity data. From here you can:

- Try some of the [other provider integrations](/grid-intensity-cli/explainer/providers/).
- [Export grid intensity information](/grid-intensity-cli/tutorials/export-grid-intensity) to be used by other tools.