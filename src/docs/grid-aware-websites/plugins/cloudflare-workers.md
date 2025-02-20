---
title: "Cloudflare Workers Plugin"
description: "This page will introduce the Cloudflare Workers plugin for the Grid-aware Websites library."
eleventyNavigation:
  key: cloudflare-workers
  title: "Cloudflare Workers"
  #     parent: overview
  sectionTitle: Plugins
  order: 20
---

# Grid-aware Websites - Cloudflare Workers Plugin

This plugin provides useful helper functions that can be used when setting up the [`@greenweb/grid-aware websites`](/grid-aware-websites/overview/) library using [Cloudflare Workers](https://workers.cloudflare.com/).

After you have installed the `@greenweb/grid-aware-websites` package ([see steps](/grid-aware-websites/getting-started/)), you can use this plugin to:

- Fetch the location of a user based from the Cloudflare request.

## Installation

In your Cloudflare Workers project, install this plugin by running the following command:

```bash
npm install @greenweb/gaw-plugin-cloudflare-workers
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
    const location = getLocation(request);

    // If there's an error, process the request as normal
    if (location.status === "error") {
        return new Response('There was an error');
    }

    // Otherwise we can get the "country" variable 
    const { country } = location;
    return new Response(`The country is ${country}.`)
  },
};
```

### Using this with the Grid-aware Websites library

The code below shows a simple implementation of this plugin alongside the Grid-aware Websites core library in a Cloudflare Worker.

```js
import { PowerBreakdown } from "@greenweb/grid-aware-websites";
import { getLocation } from "@greenweb/gaw-plugin-cloudflare-workers";

const apiKey = "you_api_key"; // Set your own Electricity Maps API key here.
const powerBreakdown = new PowerBreakdown();

export default {
  async fetch(request, env, ctx) {

    // Use the getLocation function to check for the user's country in the request object
    const location = getLocation(request);

    // If there's an error, return a message
    if (location.status === "error") {
        const response = await fetch(request.url);
        return new Response('There was an error');
    }

    // Otherwise we can get the "country" variable 
    const { country } = location;
    
    // Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
    const gridData = await powerBreakdown.check(country, apiKey);

    // If we get an error, we can check for that and return nothing.
    if (gridData.status === "error") {
        return new Response('There was an error')
    }

    // If we've got data back using the Grid-aware Websites library, let's return that to the browser
    return new Response(gridData)
  },
};
```

## Store grid data in Workers KV

This plugin includes two helper functions that allow for grid data to be stored in Cloudflare Workers KV, and to be subsequently fetched for reuse. This aids in reducing the number of repeat outbound API calls being made for the same data.

### Storing grid data

To setup saving grid data to Cloudflare Workers KV, you will need to create a KV namespace and bind it to your project. In your project, run the following command:

```bash
npx wrangler kv namespace create GAW_DATA_KV
```

If created successfully, you will receive instructions in your terminal for how to update your project's `wrangler.json` configuration file so that it binds to the new KV store you've just created.

<aside class="alert alert-info text-base-content">
<p><strong>Note:</strong> The KV store your create <i>must</i> be called <code>GAW_DATA_KV</code> otherwise the helper functions in the <code>greenweb/gaw-plugins-cloudflare-workers</code> plugin will not be able to work properly.</p>
</aside>

Now, we are ready to start modifying our Workers code to put data in the `GAW_DATA_KV` store. We do this using the `saveDataToKv` function. You can see this in a simplified implementation below:

```js
import { PowerBreakdown } from "@greenweb/grid-aware-websites";
import { saveDataToKv } from "@greenweb/gaw-plugin-cloudflare-workers";

const apiKey = "you_api_key"; // Set your own Electricity Maps API key here.
const country = "TW" // Set the country variable to Taiwan
const powerBreakdown = new PowerBreakdown();

export default {
  async fetch(request, env, ctx) {
    
    // Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
    const gridData = await powerBreakdown.check(country, apiKey);

    // If we get an error, we can check for that and return nothing.
    if (gridData.status === "error") {
        return new Response('There was an error')
    }

    await saveDataToKv(env, country, JSON.stringify(gridData))

    // If we've got data back using the Grid-aware Websites library, let's return that to the browser
    return new Response(gridData)
  },
};
```

This will save the `gridData` response in the `GAW_DATA_KV` using the `country` variable ("TW") as the key. By default, data is saved for 1 hour (`expirationTtl: 3600`). You can override this by passing in an options object as the fourth parameter.

```diff
+ const options = {
+   expirationTtl: 60 * 60 * 6 // Store the data for 6 hours  
+ }

- await saveDataToKv(env, country, JSON.stringify(gridData))
+ await saveDataToKv(env, country, JSON.stringify(gridData), options)
```

### Fetching data from Workers KV

Now that we are storing data for one hour, we can start to use it in our Worker to avoid making repeated outbound API calls. We can do this using the `fetchDataFromKv` function.

In the code below, we first check if there is data stored in the `GAW_DATA_KV` using the key of "TW" (the value of the `country` variable). If there is, we return that, otherwise we fetch the latest data, store it, and return it.

```js
import { PowerBreakdown } from "@greenweb/grid-aware-websites";
import { saveDataToKv, fetchDataFromKv } from "@greenweb/gaw-plugin-cloudflare-workers";

const apiKey = "you_api_key"; // Set your own Electricity Maps API key here.
const country = "TW" // Set the country variable to Taiwan
const powerBreakdown = new PowerBreakdown();

export default {
  async fetch(request, env, ctx) {

    // First check if the there's data for the country saved to KV
    const storedData = await fetchDataFromKv(env, country)

    if (storeData) {
      return new Response(storedData)
    }
    
    // Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
    const gridData = await powerBreakdown.check(country, apiKey)

    // If we get an error, we can check for that and return nothing.
    if (gridData.status === "error") {
        return new Response('There was an error')
    }

    await saveDataToKv(env, country, JSON.stringify(gridData))

    // If we've got data back using the Grid-aware Websites library, let's return that to the browser
    return new Response(gridData)
  },
};
```

## Store modified pages in Workers KV

This plugin includes two helper functions that allow for the HTML content of modified pages to be stored in Cloudflare Workers KV, and to be subsequently fetched for reuse. This aids in reducing running repeated page modifications to return the same content.

### Storing modified pages

To setup saving modified page content to Cloudflare Workers KV, you will need to create a KV namespace and bind it to your project. In your project, run the following command:

```bash
npx wrangler kv namespace create GAW_PAGE_KV
```

If created successfully, you will receive instructions in your terminal for how to update your project's `wrangler.json` configuration file so that it binds to the new KV store you've just created.

<aside class="alert alert-info text-base-content">
<p><strong>Note:</strong> The KV store your create <i>must</i> be called <code>GAW_PAGE_KV</code> otherwise the helper functions in the <code>greenweb/gaw-plugins-cloudflare-workers</code> plugin will not be able to work properly.</p>
</aside>

Now, we are ready to start modifying our Workers code to put data in the `GAW_PAGE_KV` store. We do this using the `savePageToKv` function. You can see this in a simplified implementation below:

```js
import { savePageToKv } from "@greenweb/gaw-plugin-cloudflare-workers";

export default {
  async fetch(request, env, ctx) {
    
    const modifiedPage = `<!DOCTYPE html>
                          <html lang="en">
                          <head>
                              <meta charset="UTF-8">
                              <title>A modified page</title>
                          </head>
                          <body>
                              <h1>This page has changed.</h1>
                          </body>
                          </html>`

    await saveDataToKv(env, request.url, modifiedPage)

    // If we've got data back using the Grid-aware Websites library, let's return that to the browser
    return new Response(modifiedPage)
  },
};
```

This will save the `modifiedPage` content in the `GAW_PAGE_KV` using the `request.url` variable as the key. By default, data is saved for 24 hours (`expirationTtl: 86400`). You can override this by passing in an options object as the fourth parameter.

```diff
+ const options = {
+   expirationTtl: 60 * 60 * 6 // Store the page for 6 hours  
+ }

- await savePageToKv(env, request.url, modifiedPage)
+ await savePageToKv(env, request.url, modifiedPage, options)
```

### Fetching pages from Workers KV

Now that we are storing a modified version of the page for 24 hours, we can start to return it rather than having to manipulate the page again. We can do this using the `fetchPageFromKv` function.

In the code below, we first check if there is page stored in the `GAW_PAGE_KV` using the key of `country.url`. If there is, we return that, otherwise we generate a modified page, store it, and return it.

```js
import { savePageToKv, fetchPageFromKv } from "@greenweb/gaw-plugin-cloudflare-workers";

export default {
  async fetch(request, env, ctx) {

    const storedPage = await fetchPageFromKv(env, request.url)

    if (storedPage) {
      return new Response(storedPage)
    }
    
    const modifiedPage = `<!DOCTYPE html>
                          <html lang="en">
                          <head>
                              <meta charset="UTF-8">
                              <title>A modified page</title>
                          </head>
                          <body>
                              <h1>This page has changed.</h1>
                          </body>
                          </html>`

    await saveDataToKv(env, request.url, modifiedPage)

    // If we've got data back using the Grid-aware Websites library, let's return that to the browser
    return new Response(modifiedPage)
  },
};
```

## Examples

Below are some examples of the Grid-aware Websites library and Cloudflare Workers plugin being used.

### Case studies

- Fershad Irani documents how he has applied grid awareness to his personal website. [Read the blog post](https://fershad.com/writing/making-this-website-grid-aware/). [View the source code](https://github.com/fershad/fershad.com?tab=readme-ov-file#grid-awareness).

### Demo sites

- [Cloudflare Workers Grid-aware Websites Demo](https://github.com/thegreenwebfoundation/grid-aware-websites-demo-cloudflare)
- [fershad.com](https://fershad.com/)
