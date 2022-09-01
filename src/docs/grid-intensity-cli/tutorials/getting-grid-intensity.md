---
title: Getting grid intensity for a location
description: In this tutorial you will use the Grid Intensity CLI to get both historical and near real-time data for a location.
eleventyNavigation:
  key: getting-grid-intensity
  title: Getting grid intensity for a location
  # parent: overview
  sectionTitle: Tutorials
  order: 10
---
# {{ title }}

## Overview

Knowing the grid intensity for the locations in which your code runs allows you to make better informed decisions about where and/or when to run it.

In this tutorial, you will use the Grid Intensity CLI to:

1. Get historical intensity data for a location.
1. Change data providers, and
1. Get near real-time grid intensity data for a location.

## Before starting

Ensure that you have the [Grid Intensity CLI installed](/grid-intensity-cli/installation) locally.

## Learning goals

- How to use the Grid Intensity CLI to get historical and near real-time data.
- How to change providers using the CLI.
- How to set a location using the CLI.

In this tutorial we will be using the [Ember](https://ember-climate.org/) and [WattTime](https://www.watttime.org/) provider integrations. We will use the Grid Intensity CLI to get data for the country of Portugal.

## Get grid intensity for the last calendar year

To being with, let's get grid intensity data for the last calendar year. By doing this, we can get a snapshot of a country's carbon intensity profile.

Once you have installed the [Grid Intensity CLI](/grid-intensity-cli/installation), run the following command in your terminal.

```bash
grid-intensity --location PT
```

The command above uses the Ember dataset - the default integration for the Grid Intensity CLI. We have used the `--location` flag to request data for Portugal (`PT`).

<div class="alert alert-info">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>When using Ember, you will need to pass either an <a href="https://www.iso.org/obp/ui/#search">Alpha-2 or Alpha-3 ISO country code</a> for the location you want data for.</span>
  </div>
</div>

Running the command above will return data that looks similar to the snippet below.

```json
[
        {
                "emissions_type": "average",
                "metric_type": "absolute",
                "provider": "Ember",
                "location": "PT",
                "units": "gCO2e per kWh",
                "valid_from": "2021-01-01T00:00:00Z",
                "valid_to": "2021-12-31T23:59:00Z",
                "value": 222.632
        }
]
```

Here, we are interested in the value of the `emissions_intensity_gco2_per_kwh` field. This shows us how many grams of CO2 were emitted per kilowatt-hour of electricity generated in Portugal during 2021. The closer this number is to zero, the cleaner a country's grid is.

## Get near real-time grid intensity data

Having historical data for a location is a great first step. But, if we want our code to be _carbon aware_ then we'll need to get more up-to-date information.

To do this, we will use the WattTime API integration.

<aside class="alert  alert-warning"><div>
<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
	<p>Please note that you will first need to create a free WattTime user account to use their API.</p>
</div></aside>

{% include 'snippets/grid-cli/watttime-registration.md' %}

### Using WattTime with the Grid Intensity CLI

Once you have setup your WattTime account, you can run the command below in your terminal.

```bash
grid-intensity --provider WattTime --location PT
```

Here, we use the `--provider` flag to let the CLI know to fetch data from the WattTime API. As before, we have set the `--location` flag to return data for Portugal (`PT`).

Running the command above will return data that looks similar to the snippet below.

```json
[
        {
                "emissions_type": "marginal",
                "metric_type": "relative",
                "provider": "WattTime",
                "location": "PT",
                "units": "percent",
                "valid_from": "2022-08-19T05:00:00Z",
                "valid_to": "2022-08-19T05:05:00Z",
                "value": 71
        }
]
```

Here, we are interested in the value of the `percent` field. This value represents the relative real-time marginal emissions intensity for the _past month_. A lower value here represents a cleaner electricity grid.

## Wrapping up

Now you know how to use different providers to fetch country-level grid intensity data. From here you can:

- Try some of the [other provider integrations](/grid-intensity-cli/explainer/providers/).
- [Export grid intensity information](/grid-intensity-cli/tutorials/export-grid-intensity) to be used by other tools.