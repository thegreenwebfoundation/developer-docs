---
title: "Advanced - Customise website carbon calculations"
description: "In this tutorial, you will use CO2.js to adjust the variables that are used by website carbon calculations to produce a case specific output."
eleventyNavigation:
  key: customise-website-carbon-calculations
  title: "Advanced - Customise website carbon calculations"
  # parent: overview
  sectionTitle: Tutorials
  order: 14
---

# {{ title }}

## Overview

The Sustainable Web Design model is a methodology which provides a general framework that can be used to estimate a website's carbon emissions. Being able to adjust the underlying variables used in the model allows developers to return more accurate, scenario specific carbon estimates.

In this tutorial, you will learn how to adjust the variables used by the Sustainable Web Design model in CO2.js. Then, you will calculate the CO2 emissions of transferring 1 gigabyte (GB) of data.

### Methodologies

It is also worth noting that what we will cover in this tutorial only works with the Sustainable Web Design model in CO2.js. Check out the [_Methodologies for calculating website carbon_ page](/co2js/explainer/methodologies-for-calculating-website-carbon) to learn more about the model itself.

## Learning goals

This tutorial assumes you are already familiar with how to [install CO2.js](/co2js/installation) and use it to [perform simple carbon calculations](/co2js/tutorials/getting-started-node).

In this tutorial you will learn:

- How to change the variables used by the Sustainable Web Design model in CO2.js
- How to use these changed variables to produce website carbon estimates

## Setting up

You should already have CO2.js installed and setup in your project. If you do not, it is recommended you go through the [Getting Started: NodeJS tutorial](/co2js/tutorials/getting-started-node)

## Initialise CO2.js

```js
const { co2 } = require("@tgwf/co2");
const co2Emission = new co2();
```

## Special functions which allow for variables to be changed

CO2.js includes `perByteTrace` and `perVisitTrace` function. These function accepts three inputs:

- bytes: `number` - The bytes you want to calculate CO2 for.
- green: `boolean` <span class="badge align-middle badge-success my-0">Optional</span> - Whether the bytes are transferred from a green host. By default, this value is `false`.
- options: `object` <span class="badge align-middle badge-success my-0">Optional</span> - A JavaScript object containing any Sustainable Web Design specific variables to be change.

## Changing variables

The Sustainable Web Design model applies a number of constants to its carbon emissions calculation. They are:

- What percentage of visits to a site are new visitors
- What percentage of visits to a site are returning visitors
- What percentage of data for return visitors is downloaded
- The global average grid intensity (442 g/kWh) is used for all segments. Green hosted data centers use a grid intensity of 50 g/kWh.

We can create a JavaScript object to change these variables before passing them into CO2.js.

```js
const options = {
  dataReloadRatio: 0.6,
  firstVisitPercentage: 0.9,
  returnVisitPercentage: 0.1,
  gridIntensity: {
    device: 565.629,
    dataCenter: { country: "TWN" },
    networks: 442,
  },
};
```

Here you can see that we have create an object within which we have set some key-values to adjust the constants used by the Sustainable Web Design calculation.

- `dataReloadRatio` – a number between 0 and 1 representing the percentage of data that is downloaded by return visitors.
- `firstVisitPercentage` – a number between 0 and 1 representing the percentage of new visitors.
- `returnVisitPercentage` – a number between 0 and 1 representing the percentage of returning visitors.
- `gridIntensity` – an object that can contain the following keys:
  - `device` – the grid intensity to use for the device segment.
  - `dataCenter` – the grid intensity to use for the data center segment.
  - `networks` – the grid intensity to use for the networks segment.

The values for `device`, `dataCenter`, and `networks` can be either:

- A number representing the carbon intensity for the given segment (in grams per kilowatt-hour). In the example above, we have set `device` and `network` grid intensity in this way.
- An object, which contains a key of country and a value that is an Alpha-3 ISO country code. In the example above, we have set `dataCenter` in this way, using the country code for Taiwan (TWN).

<aside class="alert bg-base-200 text-base-content">
<p>💡 Please note that all the keys above are <b>optional</b>. If a key-value is not set, or an incorrect value is used then the default figure from the Sustainable Web Design model is used.</p>
</aside>

We can now use this object to calculate the carbon emissions of a gigabyte, transferred from a regular (not green) host. In the example below, we've used the `perVisitTrace` function.

```js
const bytesSent = 1000 * 1000 * 1000; // 1GB expressed in bytes
const greenHost = false; // Is the data transferred from a green host?
const options = {
  dataReloadRatio: 0.6,
  firstVisitPercentage: 0.9,
  returnVisitPercentage: 0.1,
  gridIntensity: {
    device: 565.629,
    dataCenter: { country: "TWN" },
    networks: 442,
  },
};

estimatedCO2 = co2Emission.perVisitTrace(bytesSent, greenHost, options);
console.log(estimatedCO2);
```

## Output

Running the code above returns the object below:

```bash
# Output:
{
 co2: 409.0013326080001,
 green: false,
 variables: {
   description: 'Below are the variables used to calculate this CO2 estimate.',
   bytes: 1000000000,
   gridIntensity: {
     description: 'The grid intensity (grams per kilowatt-hour) used to calculate this CO2 estimate.',
     network: 442,
     dataCenter: 573.28,
     production: 442,
     device: 565.629
   },
   dataReloadRatio: 0.6,
   firstVisitPercentage: 0.9,
   returnVisitPercentage: 0.1
 }
}
```

This contains:

- `co2` - The result of the carbon emissions calculation
- `green` - Whether the calculation was based on data being hosted in a green data center
- `variables` - A JavaScript object that details all the other variables used in the calculation.

This provides a way for developers to validate the calculation, as well as to show users the inputs that went into the calculation alongside the result.

## Request for feedback

At present, both these functions should be considered experimental. Their APIs could change in future versions for CO2.js. We hope that they are a useful addition to the library for developers, and eventually plan to make them the recommended way to generate carbon emissions estimates.

In the meantime, we encourage you to try them out and leave us your feedback in the [CO2.js Github repository](https://github.com/thegreenwebfoundation/co2.js/issues).

## Wrapping up

You now know to CO2.js to change the variables used in the Sustainable Web Design model calculations.

From here you can:

- Try using the `perByteTrace` function.
- Change the `greenHost` variable to `true` and see how green hosting effects carbon emissions.
