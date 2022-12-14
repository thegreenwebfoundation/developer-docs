---
title: "Check a domain for green hosting"
description: "In this tutorial, you will install CO2.js in a Node environment. Then, you will check the green hosting status of one or more domains."
eleventyNavigation:
  key: check-hosting
  title: "Check a domain for green hosting"
  # parent: overview
  sectionTitle: Tutorials
  order: 13
---

# {{ title }}

## Overview

CO2.js comes with a handy function which lets you check if one domain or an array of domains is served from a green web host. Under the hood, this function uses the [Greencheck API](/api/greencheck/v3/check-single-domain/) to return results.

In this tutorial, you will install CO2.js in a Node environment. Then, you will check the green hosting status of one or more domains.

## Before starting

You can follow along with this tutorial in your local development environment, or by using the button below to launch the project in Gitpod.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/thegreenwebfoundation/gitpod-node-starter)

### Local development

If you are following along this tutorial locally, you will need to have the following setup on your machine:

- Node version 14 or later
- NPM version 6 or later

## Learning goals

- How to install CO2.js using NPM
- How to check green hosting for one domain
- How to check green hosting for multiple domains

## Setting up

If you are following along using the Gitpod starter template, you can skip this section.

Otherwise, create a new folder locally called `co2js-node` and navigate into that folder. Then, initialise NPM.

```bash
mkdir co2js-node
cd co2js-node
npm init -y
```

Next, create an `hosting.js` file, and open it in your code editor of choice. We will write the code for this tutorial inside the `hosting.js` file.

## Installing CO2.js

Inside your project folder, run the following command to install CO2.js as a dependency.

```bash
npm install @tgwf/co2
```

## Initialise CO2.js

In your project’s `hosting.js` file, add the following code to include the CO2.js hosting module in your code.

```js
const { hosting } = require("@tgwf/co2");
```

The hosting module includes a `check()` function. We will be using this to perform our green hosting checks.

## Check one domain for green hosting

To check if a single domain is green hosted, you can pass the domain as a string to the `check()` function.

When checking a single domain, this function returns a `boolean` response (`true` for green hosted, `false` for not).

Adding the code below to the `hosting.js` file allows us to check if the domain `google.com` is served from a green web host.

```js
hosting.check("google.com").then((result) => {
  console.log(result);
});
```

Running the code above returns the following result:

```bash
node hosting.js

# Output:
# true
```

## Check multiple domains for green hosting

To check if more than one domain is green hosted, you can pass them as an array of strings to the `check()` function.

When checking multiple domains, this function returns an `array` of any green domains that are found.

Adding the code below to the `hosting.js` file allows us to check if the domains `google.com`, `facebook.com`, and `twitter.com` are served from a green web hosts.

```js
const domains = ["google.com", "facebook.com", "twitter.com"];

hosting.check(domains).then((result) => {
  console.log(result);
});
```

Running the code above returns the following result:

```bash
node hosting.js

# Output:
# ['google.com', 'facbook.com']
```

## Wrapping up

You now know how to use CO2.js to check one or more domains for green hosting.

## Troubleshooting

### Use a valid domain

The domain/s passed to the `check()` function must not include any protocol, port, or path information.

- `climateaction.tech` <span class="badge align-middle badge-success my-0">Accepted</span>
- `https://climateaction.tech` <span class="badge align-middle badge-error my-0">Incorrect</span>
- `climateaction.tech/events` <span class="badge align-middle badge-error my-0">Incorrect</span>

{% include 'snippets/why-not-green.md' %}
