---
title: Functions - perVisitTrace
description: This guide will show you how to use the perVisitTrace function to calculate carbon emissions that are available in CO2.js.
eleventyNavigation:
  key: functions-pervisit-trace
  title: perVisitTrace
  sectionTitle: Functions
  order: 5.4
---

# Functions - perVisitTrace <div class="badge badge-warning gap-2 align-middle">Sustainable Web Design only</div>

The `perVisitTrace()` function is an extension of `perVisit()` which allows for certain inputs to be adjusted. This allows for more accurate, scenario specific estimates to be produced using the Sustainable Web Design Model.

<aside class="alert alert-info">
<p>This function returns a result which includes details of all the variables that were used in the calculation. Since this function allows developers to deviate from the standard Sustainable Web Design Model, we strongly recommend that it is made clear to the end user what values have changed as part of the calculation.</p></aside>

## Accepted parameters

The `perVisitTrace()` function accepts the following parameters:

- **bytes** `number` <div class="badge gap-2 align-middle my-0">Required</div>: The value of bytes to estimate emissions for.
- **green hosting** `boolean` <span class="badge align-middle badge-success my-0">Optional</span>: if the data being measured is served from a green web host.
- **options**: `object` <span class="badge align-middle badge-success my-0">Optional</span> - A JavaScript object containing any Sustainable Web Design specific variables to be change.

### The `options` parameter

The `options` parameter can contain any of the following keys. These can be used to adjust the values used by the Sustainable Web Design Model's calculation.

- `dataReloadRatio` <span class="badge align-middle badge-success my-0">Optional</span> – a `number` between 0 and 1 representing the percentage of data that is downloaded by return visitors. This is the complement of the data cache ratio from the Sustainable Web Design model, i.e. dataReloadRatio = 1 - dataCacheRatio.
- `firstVisitPercentage` <span class="badge align-middle badge-success my-0">Optional</span> – a `number` between 0 and 1 representing the percentage of new visitors.
- `returnVisitPercentage` <span class="badge align-middle badge-success my-0">Optional</span> – a `number` between 0 and 1 representing the percentage of returning visitors.
- `greenHostingFactor` <div class="badge badge-warning gap-2 align-middle">Sustainable Web Design Model v4 only</div> - The portion of hosting services powered by renewable or zero-carbon energy, between 0 and 1. If the `green hosting` boolean above is set to `true` then the `greenHostingFactor` will always be `1`.
- `gridIntensity` <span class="badge align-middle badge-success my-0">Optional</span> – an `object` that can contain the following keys:
  - `device` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.
  - `dataCenter` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.
  - `networks` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.

Below is an example which shows both kinds of accepted inputs in use.

```js
const options = {
  dataReloadRatio: 0.6,
  firstVisitPercentage: 0.9,
  returnVisitPercentage: 0.1,
  gridIntensity: {
    device: 565.629, // Here we have set the grid intensity at the device location using a number.
    dataCenter: { country: "TWN" }, // Here we have set the data center grid intensity using a country code.
    networks: 442,
  },
};
```

## Result

The `perVisitTrace()` function returns an object with the following keys:

- `co2` - A `number` representing the carbon emissions calculated in grams
- `green` - A `boolean` indicating whether the calculation was based on data being hosted in a green data center
- `variables` - An `object`` that details all the other variables used in the calculation. This object will include:
  - `description` - A static `string` explaining what is being shown.
  - `bytes` - A `number` showing the bytes that were passed into the function.
  - `greenHostingFactor` <span class="badge badge-warning gap-2 align-middle">Sustainable Web Design Model v4 only</span> - A `number` representing the portion of hosting services powered by renewable or zero-carbon energy.
  - `gridIntensity` – an `object` that can contain the following keys:
    - `device` – A `number` representing the carbon intensity for this segment (in grams per kilowatt-hour) used in the calculation.
    - `dataCenter` – A `number` representing the carbon intensity for this segment (in grams per kilowatt-hour) used in the calculation.
    - `networks` – A `number` representing the carbon intensity for this segment (in grams per kilowatt-hour) used in the calculation.
    - `production` - A `number` representing the carbon intensity for this segment (in grams per kilowatt-hour) used in the calculation.
  - `dataReloadRatio` – a `number` between 0 and 1 representing the percentage of data that is downloaded by return visitors. This is the complement of the data cache ratio from the Sustainable Web Design model, i.e. dataReloadRatio = 1 - dataCacheRatio.
  - `firstVisitPercentage` – a `number` between 0 and 1 representing the percentage of new visitors.
  - `returnVisitPercentage` – a `number` between 0 and 1 representing the percentage of returning visitors.
