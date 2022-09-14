---
title: "Getting started: In the browser"
description: "In this tutorial, you will use CO2.js in the browser to calculate the CO2 emissions of transferring 1 gigabyte (GB) of data."
relatedPR: 
eleventyNavigation:
  key: getting-started-browser
  title: "Getting started: In the browser"
  # parent: overview
  sectionTitle: Tutorials
  order: 10
---
# {{ title }}

## Overview

In this tutorial, you will use CO2.js in the browser to calculate the CO2 emissions of transferring 1 gigabyte (GB) or data.

## Before starting

You can follow along with this tutorial in your local development environment, or by using the button below to launch the project in Gitpod.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/thegreenwebfoundation/gitpod-node-starter)

### Methodologies

It is also worth noting that currently CO2.js uses the Sustainable Web Design model as the default when calculating carbon emissions.a Check out the [_Methodologies for calculating website carbon_ page](/co2js/explainer/methodologies-for-calculating-website-carbon) to learn more about both models.

## Learning goals

- How to install CO2.js using a CDN or NPM
- How to initiate CO2.js in your code
- How to calculate emissions per byte using CO2.js
- Display the results on a web page

## Setting up

In the root of your project, create an `index.html` file. Open this file in your code editor of choice. We will write the rest of this tutorial inside this `index.html` file.

Here's some boilerplate code to get started with. Copy this into the `index.html` file you just created.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My CO2.js calculator</title>

    <script type="module">
      <!-- Our code will go here -->
    </script>
</head>
<body>
    <h1>The carbon emissions of 1 gigabyte</h1>
    <p>Sending a gigabyte, had a carbon footprint of <span id="result">???????</span> grams of CO2</p>
</body>
</html>
```

## Initialise CO2.js

So that we can get to writing code sooner, we will use [Skypack](https://www.skypack.dev/) in this tutorial to download the CO2.js library.

<aside class="alert bg-base-200 text-base-content"><p>You can also install CO2.js using NPM, or build it yourself. See the <a href="https://developers.thegreenwebfoundation.org/co2js/installation/" class="link">installation guide</a> for details.</p></aside>

In the `index.html` file you just created, add the following line inside the `<script>` block in the head of the page. 

```js
import tgwf from 'https://cdn.skypack.dev/@tgwf/co2';
```

## Calculating emissions per byte

CO2.js includes a `perByte()` function. This function accepts two variables:

- bytes:  `number` - The bytes you want to calculate CO2 for.
- green: `boolean` - Whether the bytes are transferred from a green host. By default, this value is `false`.

<aside class="alert bg-base-200 text-base-content">
<p>💡 If you are unsure about whether bytes are transferred from a green host, it is best to assume they *are not.*</p>
</aside>

Adding the code below to the `<script>` block allows us to calculate the carbon emissions of a gigabyte, transferred from a regular (not green) host. Be sure to add this code _after_ the import statement.

```js
const emissions = new tgwf.co2()
const bytesSent = (1000 * 1000 * 1000) // 1GB expressed in bytes
const greenHost = false // Is the data transferred from a green host?

let estimatedCO2 = emissions.perByte(bytesSent, greenHost).toFixed(3) // We use toFixed(3) here to set the result to 3 decimal places.

document.getElementById('result').innerHTML = estimatedCO2
```

In the code above, you are:

- Initialising the `co2.js` library.
- Setting a variable for the bytes you want to check.
- Setting a variable for green hosting status.
- Passing these variables to the `perByte` function, which returns a carbon estimate.
- Outputting the results to an element on the page.

When you're done, the `<script>` block should look like this:

```html
<script type="module">
  import tgwf from 'https://cdn.skypack.dev/@tgwf/co2';
  const emissions = new tgwf.co2()
  const bytesSent = (1000 * 1000 * 1000) // 1GB expressed in bytes
  const greenHost = false // Is the data transferred from a green host?

  let estimatedCO2 = emissions.perByte(bytesSent, greenHost).toFixed(3)

  document.getElementById('result').innerHTML = estimatedCO2
</script>
```

## Running the code

To find out how much carbon 1GB of data produces, open the `index.html` page in a web browser.

If you're following along in GitPod, you can run `python -m http.server 8000` to start a local server.

## Wrapping up

You now know the carbon impact of a gigabyte, and can display it on a web page.

From here you can:

- Try adjusting the `bytesSent` variable.
- Change the `greenHost` variable to `true` and see how green hosting effects carbon emissions.
- Add a form to input and calculate different values.