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

To check if a single domain is green hosted, you can pass the following parameters into the `check` function:

- domain: `string` the website domain you want to check for green hosting.
- options: `object` <span class="badge align-middle badge-success my-0">Optional since v0.15.0</span> An object of domain check options. It may contain the following keys
  - verbose: `boolean` indicate where you want to receive the full JSON payload from the API, or a simpler true/false result.
  - userAgentIdentifier: `string` representing the app, site, or organisation that is making the request.

### Changing the type of response received

When checking a single domain, you can choose to receive the result as:

1. A `boolean` value (`true` for green hosted, `false` for not), or
2. An `object` containing the full JSON payload the is returned from the Green Web Dataset.

#### Return a boolean response <span class="badge align-middle badge-success my-0">Default</span>

The default behaviour of the `check` function for a single domain in CO2.js is to return a boolean (true/false) response whenever a domain is queried. You can also explicitly set this by setting `verbose: false` in the options that are passed into the function.

Adding the code below to the `hosting.js` file allows us to check if the domain `google.com` is served from a green web host and return a boolean response.

```js
const options = {
  verbose: false,
  userAgentIdentifier: "myGreenApp",
};
hosting.check("google.com", options).then((result) => {
  console.log(result);
});
```

Running the code above returns the following result:

```bash
node hosting.js

# Output:
# true
```

#### Return a verbose response

Alternately, you can choose to return a verbose response when checking a domain. This will return all the information available for that domain's hosting provider in the Green Web Dataset. The response will be returned as a JSON object. To do this, you will need to set `verbose: true` in the options that are passed into the function.

Adding the code below to the `hosting.js` file allows us to check if the domain `google.com` is served from a green web host and return a boolean response.

```js
const options = {
  verbose: true,
  userAgentIdentifier: "myGreenApp",
};
hosting.check("google.com", options).then((result) => {
  console.log(result);
});
```

Running the code above returns the following result:

```bash
node hosting.js

# Output:
# {
#  url: 'google.com',
#  hosted_by: 'Google Inc.',
#  hosted_by_website: 'https://www.google.com',
#  partner: null,
#  green: true,
#  hosted_by_id: 595,
#  modified: '2024-05-02T06:01:59',
#  supporting_documents: [
#    {
#     id: 108,
#      title: 'Sustainability at Google',
#      link: 'https://sustainability.google'
#    },
#    {
#      id: 139,
#      title: 'Independent verification of Google 2020 Reporting',
#      link: 'https://s3.nl-ams.scw.cloud/tgwf-web-app-live/uploads/Google_Cloud_-_3degrees_cloud_services_review_statement_final.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=SCWT1WBAW6NZ5SW5GYJ8%2F20240502%2Fnl-ams%2Fs3%2Faws4_request&X-Amz-Date=20240502T071323Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=1bc5b6f5bbe461b13fb694a7787fede307226386891d0b87ac1914fa95a27684'
#    },
#    ... results truncated for readability
#  ]
# }
```

## Check multiple domains for green hosting

To check if more than one domain is green hosted, you can pass the following parameters into the `check` function:

- domains: `array` an array of strings representing website domain you want to check for green hosting.
- options: `object` <span class="badge align-middle badge-success my-0">Optional since v0.15.0</span> An object of domain check options. It may contain the following keys
  - verbose: `boolean` indicate where you want to receive the full JSON payload from the API, or a simpler true/false result.
  - userAgentIdentifier: `string` representing the app, site, or organisation that is making the request.

### Changing the type of response received

When checking a multiple domains, you can choose to receive the result as:

1. A `array` of strings corresponding to any green domains found by the check, or
2. An `object` containing the full JSON payload the is returned from the Green Web Dataset.

#### Return an array response <span class="badge align-middle badge-success my-0">Default</span>

The default behaviour of the `check` function for multiple domains in CO2.js is to return an array of strings corresponding to the queried domains that were identified as green in the Green Web Dataset. You can also explicitly set this by setting `verbose: false` in the options that are passed into the function.

Adding the code below to the `hosting.js` file allows us to check if the domains `google.com` and `pchome.com` are served from a green web host and return a boolean response.

```js
const options = {
  verbose: false,
  userAgentIdentifier: "myGreenApp",
};
hosting.check(["google.com", "pchome.com"], options).then((result) => {
  console.log(result);
});
```

Running the code above returns the following result:

```bash
node hosting.js

# Output:
# ["google.com"]
```

#### Return a verbose response

Alternately, you can choose to return a verbose response when checking multiple domains. This will return all the information available for those domain's hosting provider in the Green Web Dataset. The response will be returned as a JSON object. To do this, you will need to set `verbose: true` in the options that are passed into the function.

Adding the code below to the `hosting.js` file allows us to check if the domain `google.com` is served from a green web host and return a boolean response.

```js
const options = {
  verbose: true,
  userAgentIdentifier: "myGreenApp",
};
hosting.check("google.com", options).then((result) => {
  console.log(result);
});
```

Running the code above returns the following result:

```bash
node hosting.js

# Output:
# {
#   "google.com": {
# url: 'google.com',
# hosted_by: 'Google Inc.',
# hosted_by_website: 'https://www.google.com',
# partner: null,
# green: true,
# hosted_by_id: 595,
# modified: '2024-05-02T06:01:59',
# supporting_documents: [
#   {
#    id: 108,
#     title: 'Sustainability at Google',
#     link: 'https://sustainability.google'
#   },
#   {
#     id: 139,
#     title: 'Independent verification of Google 2020 Reporting',
#     link: 'https://s3.nl-ams.scw.cloud/tgwf-web-app-live/uploads/Google_Cloud_-_3degrees_cloud_services_review_statement_final.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=SCWT1WBAW6NZ5SW5GYJ8%2F20240502%2Fnl-ams%2Fs3%2Faws4_request&X-Amz-Date=20240502T071323Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=1bc5b6f5bbe461b13fb694a7787fede307226386891d0b87ac1914fa95a27684'
#   },
#   ... results truncated for readability
# ]
#    },
#  'pchome.com': {
#   url: 'pchome.com',
#   hosted_by: null,
#   hosted_by_website: null,
#   partner: null,
#   green: false,
#   hosted_by_id: null,
#   modified: '2024-05-02T07:16:10.504512'
#   },
# }
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
