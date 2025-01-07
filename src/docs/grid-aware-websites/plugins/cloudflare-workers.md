---
title: "Cloudflare Workers Plugin"
description: "This page will introduce the Cloudflare Workers plugin for the Grid-aware Websites library."
eleventyNavigation:
  key: cloudflare-workers
  title: "Cloudflare Workers"
  #     parent: overview
  sectionTitle: Plugins
  order: 4
---

# Grid-aware Websites - Cloudflare Workers Plugin

This plugin provides useful helper functions that can be used when setting up the [`@greenweb/grid-aware websites`](/grid-aware-websites/overview/) library using [Cloudflare Workers](https://workers.cloudflare.com/).

After you have installed the `@greenweb/grid-aware-websites` package ([see steps](/grid-aware-websites/getting-started/)), you can use this plugin to:

- Fetch the location of a user based on `cf` header values that are sent along in each Cloudflare request.

## Installation

In your Cloudflare Workers project, install this plugin by running the following command:

```bash
npm install @greenweb/gaw-plugin-cloudflare-workers`
```

## Fetching location

You can use this plugin to fetch the country of a website visitor. This information can then be passed into the `@greenweb/grid-aware-websites` library to enable it to retrieve data about the user's energy grid and make a determination if grid-aware website changes should be applied.

### Fetch user country

Import the library into your Cloudflare Workers code, and the use the `getLocation` function to retrieve a users country based on the Cloudflare request object.

```js
import { getLocation } from "@greenweb/gaw-plugin-cloudflare-workers";

export default {
  async fetch(request, env, ctx) {

    // Use the getLocation function to check for the user's country in the request object
    const cfData = getLocation(request);

    // If there's an error, process the request as normal
    if (cfData.status === "error") {
        const response = await fetch(request.url);
        return new Response(response.body, response);
    }

    // Otherwise we can get the "country" variable 
    const { country } = cfData;
    console.log(country);
  },
};
```

### Using this with the Grid-aware Websites library

The code below shows a simple implementation of this plugin alongside the Grid-aware Websites core library in a Cloudflare Worker.

```js
import { gridAwarePower } from "@greenweb/grid-aware-websites";
import { getLocation } from "@greenweb/gaw-plugin-cloudflare-workers";

const apiKey = "you_api_key"; // Set your own Electricity Maps API key here.

export default {
  async fetch(request, env, ctx) {

    // Use the getLocation function to check for the user's country in the request object
    const cfData = getLocation(request);

    // If there's an error, return a message
    if (cfData.status === "error") {
        const response = await fetch(request.url);
        return new Response('There was an error');
    }

    // Otherwise we can get the "country" variable 
    const { country } = cfData;
    
    // Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
    const gridData = await gridAwarePower(country, apiKey);

    // If we get an error, we can check for that and return nothing.
    if (gridData.status === "error") {
        return new Response('There was an error')
    }

    // If we've got data back using the Grid-aware Websites library, let's return that to the browser
    return new Response(gridData)
  },
};
```

## Examples

Below are some examples of the Grid-aware Websites library and Cloudflare Workers plugin being used.

### Case studies

- Fershad Irani documents how he has applied grid awareness to his personal website. [Read the blog post](https://fershad.com/writing/making-this-website-grid-aware/). [View the source code](https://github.com/fershad/fershad.com?tab=readme-ov-file#grid-awareness).

### Demo sites

- [Cloudflare Workers Grid-aware Websites Demo](https://github.com/thegreenwebfoundation/grid-aware-websites-demo-cloudflare)
