---
title: "Advanced - Get segment-level results"
description: "In this tutorial, you will use CO2.js to return carbon estimates for each of the system segments found in the Sustainable Web Design model."
eleventyNavigation:
  key: segment
  title: "Advanced - Get segment-level results"
  # parent: overview
  sectionTitle: Tutorials
  order: 15
---

# {{ title }}

## Overview

The Sustainable Web Design model is a methodology which provides a general framework that can be used to estimate a website's carbon emissions. It calculates uses bytes transferred to extrapolate energy usage numbers for your application as a fraction of the energy used by the total system comprised of:

1. the use-phase energy of datacentres serving content
2. the use-phase energy network transfering the data
3. the use-phase energy of user device an user is accessing content on
4. the total embodied energy used to create all of the above

In this tutorial, you will learn how to return a breakdown of emissions for each segment using the Sustainable Web Design model in CO2.js.

### Methodologies

It is also worth noting that what we will cover in this tutorial only works with the Sustainable Web Design model in CO2.js. Check out the [_Methodologies for calculating website carbon_ page](/co2js/explainer/methodologies-for-calculating-website-carbon) to learn more about the model itself.

## Learning goals

This tutorial assumes you are already familiar with how to [install CO2.js](/co2js/installation) and use it to [perform simple carbon calculations](/co2js/tutorials/getting-started-node).

In this tutorial you will learn:

- How to return a breakdown of emissions by system segment when using the Sustainable Web Design model

## Setting up

You should already have CO2.js installed and setup in your project. If you do not, it is recommended you go through the [Getting Started: NodeJS tutorial](/co2js/tutorials/getting-started-node)

## Initialise CO2.js

To have CO2.js return segment-level emissions estimates can be done by passing a `results` key with the value of "segment" when initialising CO2.js in your project.

```js
const { co2 } = require("@tgwf/co2");
const co2Emission = new co2({ results: "segment" });
```

You can then use CO2.js as usual to perform a calculation. In the example below we're using the `perVisit` function.

```js
const bytesSent = 1000 * 1000 * 1000; // 1GB expressed in bytes
const greenHost = false; // Is the data transferred from a green host?

estimatedCO2 = co2Emission.perVisit(bytesSent, greenHost);
console.log(estimatedCO2);
```

## Output

Running the code above returns the object below:

```bash
# Output:
{
  'consumerDeviceCO2 - first': 139.6278,
  'consumerDeviceCO2 - subsequent': 0.9308520000000001,
  'networkCO2 - first': 37.59210000000001,
  'networkCO2 - subsequent': 0.25061400000000006,
  'productionCO2 - first': 51.01785,
  'productionCO2 - subsequent': 0.34011900000000006,
  'dataCenterCO2 - first': 40.27725,
  'dataCenterCO2 - subsequent': 0.268515,
  total: 270.3051
}
```

You can see that is contains a breakdown of:

- The emissions for each system segment's first and return visit (since we are using the `perVisit` function).
- The `total` carbon emissions for our calculation.

## Wrapping up

You now know to CO2.js to return segment-level carbon estimates when using the Sustainable Web Design model.

From here you can:

- Try using the `perByte` function.
- Try using this with the `perVisitTrace` or `perByteTrace` function. You can read more about those in [this tutorial](/co2/tutorials/customise-website-carbon-calculations).
