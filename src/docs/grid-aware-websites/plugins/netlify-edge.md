---
title: "Netlify Edge Plugin"
description: "This page will introduce the Netlify Edge plugin for the Grid-aware Websites library."
eleventyNavigation:
  key: netlify-edge
  title: "Netlify Edge Functions"
  #     parent: overview
  sectionTitle: Plugins
  order: 4
---

# Grid-aware Websites - Netlify Edge Plugin

This plugin provides useful helper functions that can be used when setting up the [`@greenweb/grid-aware websites`](/grid-aware-websites/overview/) library using [Netlify Edge Functions](https://docs.netlify.com/platform/primitives/#edge-functions).

After you have installed the `@greenweb/grid-aware-websites` package ([see steps](/grid-aware-websites/getting-started/)), you can use this plugin to:

- Fetch the location of a user based on `geo` data that is exposed by the Netlify Edge platform.

## Installation

In your Netlify project, you can import the plugin directly into your edge function using an online package repository like ESM.sh. You would do this at the top of your functions file.

```js
import { getLocation } from "https://esm.sh/@greenweb/gaw-plugin-netlify-edge@latest";
```

## Fetching location

You can use this plugin to fetch the country of a website visitor. This information can then be passed into the `@greenweb/grid-aware-websites` library to enable it to retrieve data about the user's energy grid and make a determination if grid-aware website changes should be applied.

### Fetch user country

Import the library into your Netlify Edge Functions code, and the use the `getLocation` function to retrieve a users country based on the Netlify context object.

```js
import { getLocation } from "https://esm.sh/@greenweb/gaw-plugin-netlify-edge@latest";

export default async (request, context) => {
  // Use the getLocation function to check for the user's country in the request object
  const location = getLocation(context);

  // If there's an error, process the request as normal
  if (location.status === "error") {
      return new Response('There was an error');
  }

  // Otherwise we can get the "country" variable 
  const { country } = location;
  return new Response(`The country is ${country}.`)
}
```

### Using this with the Grid-aware Websites library

The code below shows a simple implementation of this plugin alongside the Grid-aware Websites core library in a Cloudflare Worker.

```js
import { gridAwarePower } from "https://esm.sh/@greenweb/grid-aware-websites@latest";
import { getLocation } from "https://esm.sh/@greenweb/gaw-plugin-netlify-edge@latest";

const apiKey = "you_api_key"; // Set your own Electricity Maps API key here.

export default async (request, context) => {
  // Use the getLocation function to check for the user's country in the request object
  const location = getLocation(context);

  // If there's an error, process the request as normal
  if (location.status === "error") {
      return new Response('There was an error');
  }

  // Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
    const gridData = await gridAwarePower(country, apiKey);

    // If we get an error, we can check for that and return nothing.
    if (gridData.status === "error") {
        return new Response('There was an error')
    }

    // If we've got data back using the Grid-aware Websites library, let's return that to the browser
    return new Response(gridData)
}
```

## Examples

Below are some examples of the Grid-aware Websites library and Netlify Edge Functions plugin being used.

### Demo sites

- [Netlify Edge Functions Grid-aware Websites Demo](https://github.com/thegreenwebfoundation/grid-aware-websites-demo-netlify/tree/main)
