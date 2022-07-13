---
title: "Getting started: NodeJS"
description: "In this tutorial, you will install CO2.js in a Node environment. Then, you will calculate the CO2 emissions of transferring 1 gigabyte (GB) of data."
eleventyNavigation:
  key: getting-started-node
  title: "Getting started: NodeJS"
  # parent: overview
  sectionTitle: Tutorials
  order: 10
---
# {{ title }}

## Overview

At its core, CO2.js takes an input of bytes and returns in carbon estimate in grams. In doing so, it provides a way for developers to estimate the carbon cost of data transfer.

In this tutorial, you will install CO2.js in a Node environment. Then, you will calculate the CO2 emissions of transferring 1 gigabyte (GB) of data.

## Before starting

You can follow along with this tutorial in your local development environment, or by using the button below to launch the project in Gitpod.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/thegreenwebfoundation/gitpod-node-starter)

### Local development

If you are following along this tutorial locally, you will need to have the following setup on your machine:

- Node version 14 or later
- NPM version 6 or later

### Learning goals

- How to install CO2.js using NPM
- How to initiate CO2.js in your code
- How to calculate emissions per byte using CO2.js

## Setting up

If you are following along using the Gitpod starter template, you can skip this section.

Otherwise, create a new folder locally called `co2js-node` and navigate into that folder. Then, initialise NPM.

```bash
mkdir co2js-node
cd co2js-node
npm init -y
```

Next, create an `index.js` file, and open it in your code editor of choice. We will write the code for this tutorial inside the `index.js` file.

## Installing CO2.js

Inside your project folder, run the following command to install CO2.js as a dependency.

```bash
npm install @tgwf/co2
```

## Initialise CO2.js

In your project’s `index.js` file, add the following code to initialise CO2.js.

```js
const { co2 } = require('@tgwf/co2')
const co2Emission = new co2();
```

## Calculating emissions per byte

CO2.js includes a `perByte()` function. This function accepts two variables:

- bytes:  `number` - The bytes you want to calculate CO2 for.
- green: `boolean` - Whether the bytes are transferred from a green host. By default, this value is `false`.

<aside class="alert alert-info">
💡 If you are unsure about whether bytes are transferred from a green host, it is best to assume they *are not.*
</aside>

Adding the code below to the `index.js` file allows us to calculate the carbon emissions of a gigabyte, transferred from a regular (not green) host.

```js
const bytesSent = (1000 * 1000 * 1000) // 1GB expressed in bytes
const greenHost = false // Is the data transferred from a green host?

estimatedCO2 = co2Emission.perByte(bytesSent, greenHost)

console.log(`Sending a gigabyte, had a carbon footprint of ${estimatedCO2.toFixed(3)} grams of CO2`)
```

In the code above, you are:

- Setting a variable for the bytes you want to check.
- Setting a variable for green hosting status.
- Passing these variables to the `perByte` function, which returns a carbon estimate.
- Outputting the results to the console.

## Running the code

To find out how much carbon 1GB of data produces, run the code in node.

```bash
node index.js

# Output:
# Sending a gigabyte, had a carbon footprint of 290.813 grams of CO2
```

## Wrapping up

You now know the carbon impact of a gigabyte.

From here you can:

- Try adjusting the `bytesSent` variable.
- Change the `greenHost` variable to `true` and see how green hosting effects carbon emissions.