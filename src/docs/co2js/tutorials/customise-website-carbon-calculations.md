---
title: "Customise website carbon calculations"
description: "In this tutorial, you will use CO2.js to adjust the variables that are used by website carbon calculations to produce a case specific output."
eleventyNavigation:
  key: customise-website-carbon-calculations
  title: "Customise website carbon calculations"
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

In your project, use the lines below to initialise CO2.js.

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
- The global average grid intensity is used for all segments. Green hosted data centers use a grid intensity of 50 g/kWh.

<aside class="alert alert-info">
<p>💡 Learn more about the system segments used in the Sustainable Web Design model on the <a class="text-inherit" href="/co2js/explainer/methodologies-for-calculating-website-carbon#the-sustainable-web-design-model">Methodologies for calculating website carbon</a> page.</p></aside>

We can create a JavaScript object to change these variables before passing them into CO2.js.

```js
const options = {
  dataReloadRatio: 0.6,
  firstVisitPercentage: 0.9,
  returnVisitPercentage: 0.1,
  gridIntensity: {
    device: 565.629,
    dataCenter: { country: "TWN" },
    network: 442,
  },
};
```

Here we have created an object within which we have set some key-values to adjust the constants used by the Sustainable Web Design calculation.

- `dataReloadRatio` <span class="badge align-middle badge-success my-0">Optional</span> – a `number` between 0 and 1 representing the percentage of data that is downloaded by return visitors.
- `firstVisitPercentage` <span class="badge align-middle badge-success my-0">Optional</span> – a `number` between 0 and 1 representing the percentage of new visitors.
- `returnVisitPercentage` <span class="badge align-middle badge-success my-0">Optional</span> – a `number` between 0 and 1 representing the percentage of returning visitors.
- `gridIntensity` <span class="badge align-middle badge-success my-0">Optional</span> – an `object` that can contain the following keys:
  - `device` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.
  - `dataCenter` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.
  - `network` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.

<aside class="alert alert-info">
<p>💡 When the <code>green</code> parameter (the 2nd parameter) passed into the <code>perByteTrace</code> or <code>perVisitTrace</code> function is set to <code>true</code>, the grid intensity used for <code>datacenter</code> is set to 50 gCO2e/kWh. This value is applied regardless of any other custom value that is set by the user.</p></aside>

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
    network: 442,
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

- `co2` - The result of the carbon emissions calculation in grams
- `green` - Whether the calculation was based on data being hosted in a green data center
- `variables` - A JavaScript object that details all the other variables used in the calculation.

This provides a way for developers to validate the calculation, as well as to show users the inputs that went into the calculation alongside the result.

## Request for feedback

At present, both these functions should be considered experimental. Their APIs could change in future versions for CO2.js. We hope that they are a useful addition to the library for developers, and eventually plan to make them the recommended way to generate carbon emissions estimates.

In the meantime, we encourage you to try them out and leave us your feedback in the [CO2.js Github repository](https://github.com/thegreenwebfoundation/co2.js/issues).

## Wrapping up

You now know how to use CO2.js to change the variables used in the Sustainable Web Design model calculations.

From here you can:

- Try using the `perByteTrace` function.
- Change the `greenHost` variable to `true` and see how green hosting effects carbon emissions.
