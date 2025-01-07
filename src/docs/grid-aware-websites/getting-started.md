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
import { gridAwarePower, gridAwareCO2e } from '@greenweb/grid-aware-websites`
```

For the purpose of this demonstration, we've imported *both* of the functions that the Grid-aware Websites library exposes.

### Using the `gridAwarePower` function

The `gridAwarePower` function returns the current power consumption breakdown of a regional grid to determine if grid-aware changes should be applied. With this approach, developers can specify if they wish to use data for all low-carbon energy (renewables + nuclear), or only renewable energy. The default mode is using only renewable energy.

A minimum threshold can also be specified. This is the minimum percentage of renewable/low-carbon energy being used by the grid. By default this value is set to 50 percent - meaning that at least 50% of the energy on the grid must come from renewables/low-carbon sources otherwise the gridAware: true flag will be returned.

In the code example below, we set the zone we want to get data for (Taiwan - `"TW"`) and provide an API key to access data from the Electricity Maps API.

```js
import { gridAwarePower, gridAwareCO2e } from "@greenweb/grid-aware-websites";

const zone = "TW"; // Set Taiwan (TW) as the zone we want to check for.
const apiKey = "you_api_key"; // Set your own Electricity Maps API key here.

// Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
const gridData = await gridAwarePower(zone, apiKey);

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

### Using the `gridAwareCO2e` function

The `gridAwareCO2e` function allows developers to choose to use the current grid intensity of a regional grid to determine if grid-aware changes should be applied. It allows for developers to specific if they would like to set their own grid intensity limit, or compare the current grid intensity to the annual average for the region being checked. The default mode is average-based comparison.

We can edit our previous code to use the `gridAwareCO2e` function instead. To do this, replace the `gridAwarePower` function call with `gridAwareCO2e`. All other parts of the code can remain the same.

```diff
import { gridAwarePower, gridAwareCO2e } from "@greenweb/grid-aware-websites";

const zone = "TW"; // Set Taiwan (TW) as the zone we want to check for.
const apiKey = "you_api_key"; // Set your own Electricity Maps API key here.

// Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
- const gridData = await gridAwarePower(zone, apiKey);
+ const gridDate = await gridAwareCO2e(zone, apiKey);

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

<!-- ## Using this on a real website

The examples above show how to return data using the `@greenweb/grid-aware-websites` library.

As this project evolves, we will have examples and tutorials of how to use this library in a real website context. -->
