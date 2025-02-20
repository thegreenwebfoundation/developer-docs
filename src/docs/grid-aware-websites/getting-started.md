---
title: Getting started
description: This guide will show you how to quickly get started with the Grid-aware Websites core library.
eleventyNavigation:
  key: getting-started
  title: Getting started
  order: 2
---

# Getting started

This guide will show you how to quickly get started with the Grid-aware Websites core library.

## Before you start

### Node version

The Grid-aware websites core library requires [Node.js](https://nodejs.org/) version 18 or higher.

You can check whether or not you have Node installed by running `node --version` in a terminal application. If the command is not found or it reports a number lower than 18, you will need to download and install Node.js before moving on to the next step.

### Electricity Maps API

You will also require an API key to access the [Electricity Maps API](https://api-portal.electricitymaps.com/).

## Installation

Make a directory for your project, and then inside of that directory setup your project using NPM.

```bash
#Create a new directory
mkdir gaw-example
# Navigate into the new directory
cd gaw-example

# Initiate NPM as the package manager for your project
npm init -y
# Set the type of this project to use ESM (ECMAScript Modules).
npm pkg set type="module"
```

### Install the Grid-aware Websites library

`@greenweb/grid-aware-websites` is published on NPM, and can be installed into your project using the following command:

```bash
npm install @greenweb/grid-aware-websites
```

## Start using the Grid-aware Websites library

You can now start using the Grid-aware Websites library in your project. In this example, we will use it to get the latest information about Taiwan's energy grid.

### Create a new file

Staying in your terminal, run the following command to create a new file where we'll write our code.

```bash
touch index.js
```

### Import the Grid-aware Websites library

Open the `index.js` file you just created in your code editor of choice. From here, we can start using the Grid-aware Websites library by importing it at the top of the file.

```js
import { PowerBreakdown, GridIntensity } from '@greenweb/grid-aware-websites`
```

For the purpose of this demonstration, we've imported *both* of the functions that the Grid-aware Websites library exposes.

### Using the `PowerBreakdown` function

The `PowerBreakdown` class allows you to check the current power consumption breakdown of a regional grid to determine if grid-aware changes should be applied. With this approach, developers can specify if they wish to use data for all low-carbon energy (renewables + nuclear), or only renewable energy. The default mode is using only renewable energy.

A minimum threshold can also be specified. This is the minimum percentage of renewable/low-carbon energy being used by the grid. By default this value is set to 50 percent - meaning that at least 50% of the energy on the grid must come from renewables/low-carbon sources otherwise the gridAware: true flag will be returned.

In the code example below, we set the zone we want to get data for (Taiwan - `"TW"`) and provide an API key to access data from the Electricity Maps API.

```js
import { PowerBreakdown } from "@greenweb/grid-aware-websites";

const zone = "DE"; // The zone ID string or lat-lon object of the region you'd like to get grid intensity data for
const apiKey = "you_api_key";

const powerBreakdown = new PowerBreakdown();
const gridData = await powerBreakdown.check(zone, apiKey);

// If we get an error, we can check for that and return nothing.
if (gridData.status === "error") {
  console.error(error.message)
}

// If we've got data back using the Grid-aware Websites library, let's console log that out.
console.log(gridData)
```

Save the `index.js` file and run the file using the `node index.js` command in your terminal. If the request succeeded, you should see a response similar to the one below:

```json
{
  status: 'success',
  region: 'TW',
  gridAware: true,
  data: { 
    mode: 'renewable', 
    minimumPercentage: 50, 
    renewablePercentage: 24 
  }
}
```

You will notice the `gridAware` property that is returned in the response. When using this library to determine if grid-aware changes should be applied to a website, you would check against this property (`true` for apply changes, `false` for don't apply changes).

#### `PowerBreakdown` - Options

In the example above, we have used the `PowerBreakdown` function with the default configuration. However, we can change the type of data that is used as well as specify the minimum percentage for our chosen fuel mix before grid-awareness is triggered (i.e. `gridAware` is set to `true`).

- **mode** `string` <div class="badge gap-2 align-middle my-0">Optional</div>: The energy data we want to use - either "renewable" or "low-carbon". Default: "renewable".
- **minimumPercentage** `number` <div class="badge gap-2 align-middle my-0">Optional</div>: The minimum percentage of the chosen fuel mix before grid-awareness should be triggered. Default: 50.

You can set options when creating a new instance of `PowerBreakdown`, or by using the `.setOptions` function that it exposes. You can see how this can be implemented in the example snippet below.

```js
const options = {
  mode: 'low-carbon',
  minimumPercentage: 75 // The minimum percentage of the chosen fuel mix before grid-awareness should be triggered.
}

// Create a new instance of PowerBreakdown using the options above
const powerBreakdown = new PowerBreakdown(options);

powerBreakdown.setOptions({
  minimumPercentage: 60 // Here we've changed the minimum percentage to 60
})
```

### Using the `GridIntensity` function

The `GridIntensity` class allows you to check the current grid intensity of a regional grid to determine if grid-aware changes should be applied. It allows for developers to specific if they would like to set their own grid intensity limit, or compare the current grid intensity to the annual average for the region being checked. The default mode is average-based comparison.

We can edit our previous code to use the `GridIntensity` class instead. To do this, replace the `PowerBreakdown` function call with `GridIntensity`. All other parts of the code can remain the same.

```diff
- import { PowerBreakdown } from "@greenweb/grid-aware-websites";
+ import { GridIntensity } from "@greenweb/grid-aware-websites";

const zone = "TW"; // Set Taiwan (TW) as the zone we want to check for.
const apiKey = "you_api_key"; // Set your own Electricity Maps API key here.

// Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
- const powerBreakdown = new PowerBreakdown();
- const gridData = await powerBreakdown.check(zone, apiKey);
+ const gridIntensity = new GridIntensity();
+ const gridData = await gridIntensity.check(zone, apiKey);

// If we get an error, we can check for that and return nothing.
if (gridData.status === "error") {
  console.error(error.message)
}

// If we've got data back using the Grid-aware Websites library, let's console log that out.
console.log(gridData)
```

Save the `index.js` file and run the file using the `node index.js` command in your terminal. If the request succeeded, you should see a response similar to the one below:

```json
{
  status: 'success',
  region: 'TW',
  gridAware: false,
  data: { 
    mode: 'average', 
    carbonIntensity: 448, 
    averageIntensity: 644.36 
  }
}
```

Again, in this example we would use the value of the `gridAware` property to determine if grid-aware changes should be made to a website.

#### `GridIntensity` - Options

In the example above, we have used the `GridIntensity` function with the default configuration. However, we can change the how grid awareness is determined within the function as well as specify a minimum value for carbon intensity for for the same purpose (i.e. `gridAware` is set to `true`).

- **mode** `string` <div class="badge gap-2 align-middle my-0">Optional</div>: The type of comparison used to determine grid-awareness - either "average" or "limit". Default: "average".
- **minimumIntensity** `number` <div class="badge gap-2 align-middle my-0">Optional</div>: Only used if `mode === "limit"`. The minimum grid intensity value (grams CO2e/kWh) before grid-awareness is triggered. Default: 400.

You can set options when creating a new instance of `GridIntensity`, or by using the `.setOptions` function that it exposes. You can see how this can be implemented in the example snippet below.

```js
const options = {
  mode: 'limit',
  minimumIntensity: 250
}

// Create a new instance of GridIntensity using the options above
const gridIntensity = new GridIntensity(options);

gridIntensity.setOptions({
  minimumIntensity: 100 // Here we've changed the minimum intensity to 100
})
```

#### Understanding the difference between `"average"` and `"limit"` modes

When using the `GridIntensity` function, the default mode is set to `average`. In this case, the function will:

1. Get the current grid intensity for the provided zone.
2. Compare the current grid intensity to the average grid intensity for that zone (if available). This comparison is done by using the average annual grid intensity data from the [CO2.js library](/co2js/data).
3. If the current grid intensity is **greater than** the average, it will return `gridAware: true`. Otherwise, it will return `gridAware: false`.

Alternately, when the mode is set to `limit`, the function will:

1. Get the current grid intensity for the provided zone.
2. Compare that value to the limit set by the developer.
3. If the current grid intensity is **greater than** the set limit, it will return `gridAware: true`. Otherwise, it will return `gridAware: false`.

<!-- ## Using this on a real website

The examples above show how to return data using the `@greenweb/grid-aware-websites` library.

As this project evolves, we will have examples and tutorials of how to use this library in a real website context. -->
