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

## Installation

In your Cloudflare Workers project, install this plugin by running the following command:

```bash
npm install @greenweb/gaw-plugin-cloudflare-workers
```

## Quickstart

The easiest way to use this plugin is by utilising the `gridAwareAuto` functionality that it provides. As a minimum, you would need to have the below code in your Cloudflare Worker.

Install this library in your project using `npm install @greenweb/gaw-plugin-cloudflare-workers`.

<aside class="alert alert-info text-base-content">
    <p>
        <strong>Note:</strong>
        This plugin currently uses the <a href="https://portal.electricitymaps.com/developer-hub/api/reference#latest-carbon-intensity-level">Electricity Maps Carbon Aware Websites API</a> as the source of grid intensity data. This API is currently only available under a paid plan, but we are in conversation with Electricity Maps on ways to make this data available in some kind of free version. You can
        track the progress of this issue on
        <a href="https://github.com/thegreenwebfoundation/grid-aware-websites/issues/21">GitHub</a>.
    </p>
</aside>

Replace your Cloudflare Worker with the following code.

```js
import gridAwareAuto from "@greenweb/gaw-plugin-cloudflare-workers";

export default {
  async fetch(request, env, ctx) {
    return gridAwareAuto(request, env, ctx);
  },
};
```

This code will:

1. Get the request location.
2. Fetch the current relative grid intensity using the [Electricity Maps API](https://portal.electricitymaps.com/).
3. Return the page to the user.

The `gridAwareAuto` function also accepts an options object as the fourth parameter. This allows for some configuration to be made to the implementation. Accepted options values are:

| Option                  | Type         | Default         | Possible values                                                                         | Description                                                                                                           |
| ----------------------- | ------------ | --------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `contentType`           | String[]     | `['text/html']` | Example: ['text/html', 'text/css']                                                      | Defines the content types that should be processed                                                                    |
| `ignoreRoutes`          | String[]     | `[]`            | Example: ['/wp-admin', '/assets/js']                                                    | A list of routes where grid-aware code should not be applied                                                          |
| `ignoreGawCookie`       | String       | `'gaw-ignore'`  | "gaw-ignore"                                                                            | A cookie that when present will result in grid-aware code being skipped                                               |
| `userOptIn`             | Boolean      | `false`         | true, false                                                                             | Allows developers to specify if users are required to opt-in to the grid-aware website experience                     |
| `locationType`          | String       | `'latlon'`      | "latlon", "country"                                                                     | Type of location data to use                                                                                          |
| `htmlChanges`           | Object       | {}              | {"low": HTMLRewriter, "moderate": HTMLRewriter, "high": HTMLRewriter}                   | An object to capture the different HTML changes that are applied at each different grid intesity level                |
| `htmlChanges.low`       | HTMLRewriter | null            | Custom HTMLRewriter for page modification at low grid intensity level                   |
| `htmlChanges.moderate`  | HTMLRewriter | null            | Custom HTMLRewriter for page modification at moderate grid intensity level              |
| `htmlChanges.high`      | HTMLRewriter | null            | Custom HTMLRewriter for page modification at high grid intensity level                  |
| `defaultView`           | String/null  | `null`          | null, "low", "moderate", "high"                                                         | Default view for the grid-aware website experience                                                                    |
| `gawDataApiKey`         | String       | `''`            | "xyz123"                                                                                | API key for the data source                                                                                           |
| `infoBar`               | Object       | `{}`            | `{target: "", version: "latest", learnMoreLink: "#", popoverText: "", customViews: ""}` | Configuration for the info bar element                                                                                |
| `infoBar.target`        | String       | `''`            | Example: "header", "#info-container"                                                    | Target element for the info bar                                                                                       |
| `infoBar.version`       | String       | `'latest'`      | "latest", "1.0.0"                                                                       | Version of the info bar to use                                                                                        |
| `infoBar.learnMoreLink` | String       | `'#'`           | Example: "https://example.com/learn-more"                                               | Link to learn more about the info bar                                                                                 |
| `infoBar.popoverText`   | String       | `''`            | Example: "This website adapts based on carbon intensity"                                | Provide a custom string of text to be used in the info bar popover element                                            |
| `infoBar.customViews`   | String       | `''`            | Example: "custom-low,custom-moderate,custom-high"                                       | Custom views for the grid-aware website experience                                                                    |
| `kvCacheData`           | Boolean      | `false`         | true, false                                                                             | Whether to cache grid data in KV store. Read [setup instructions](https://developers.thegreenwebfoundation.org/grid-aware-websites/plugins/cloudflare-workers/#storing-grid-data)          |
| `kvCachePage`           | Boolean      | `false`         | true, false                                                                             | Whether to cache modified pages in KV store. Read [setup instructions](https://developers.thegreenwebfoundation.org/grid-aware-websites/plugins/cloudflare-workers/#storing-modified-pages) |
| `debug`                 | String       | `"none"`        | "none", "full", "headers", "logs"                                                       | Activates debug mode which outputs logs and returns additional response headers                                       |
| `dev`                   | Boolean      | `false`         | true, false                                                                             | Whether to enable development mode                                                                                    |
| `devConfig`             | Object       | `{}`            | `{hostname: "", port: "", protocol: ""}`                                                | Configuration for development mode                                                                                    |
| `devConfig.hostname`    | String       | `''`            | Example: "localhost"                                                                    | Hostname for development mode                                                                                         |
| `devConfig.port`        | String       | `''`            | Example: "8080"                                                                         | Port for development mode                                                                                             |
| `devConfig.protocol`    | String       | `''`            | Example: "http"                                                                         | Protocol for development mode                                                                                         |

The following example will run on all HTML pages, but will skip any routes (URLs) that include the `/company/` or `/profile/` strings. It will use Electricity Maps as the data source, and uses an API key which has been set as an environment secret. IF grid-aware changes need to be applied to the page, a `data-grid-aware=true` attribute will be set on the HTML element.

```js
import gridAwareAuto from "@greenweb/gaw-plugin-cloudflare-workers";

export default {
  async fetch(request, env, ctx) {
    return gridAwareAuto(request, env, ctx, {
      // Ignore these routes
      ignoreRoutes: ["/company/", "/profile/"],
      // Use this API key that has been saved as a secret
      gawDataApiKey: env.EMAPS_API_KEY,
      // Configure the grid-aware info bar
      infoBar: {
        target: "#gaw-info-bar",
        learnMoreLink:
          "https://www.thegreenwebfoundation.org/tools/grid-aware-websites/",
        version: "latest",
        popoverText:
          "This website adapts based on your local electricity grid's carbon intensity",
      },
      // Require users to opt-in to grid-aware experience
      userOptIn: false,
      // Set a default view (null means it will be based on actual grid intensity)
      defaultView: null,
      // Make these changes to the web page using HTMLRewriter when the grid intensity is high.
      // All other states (low, moderate) will return the page as normal - no changes applied.
      htmlChanges: {
        high: new HTMLRewriter().on("html", {
          element(element) {
            element.setAttribute("data-grid-aware", "true");
          },
        }),
      },
    });
  },
};
```

## Advanced - Fetching location

If you want to have more control over how grid-awareness is applied to your site, you can use this plugin in conjunction with the core [Grid-aware Websites](https://github.com/thegreenwebfoundation/grid-aware-websites) library.

First, install the Grid-aware Websites library ([see steps](/thegreenwebfoundation/grid-aware-websites/README.md)). After you have installed the `@greenweb/grid-aware-websites` package, you can use this plugin to:

- Fetch the location of a user based from the Cloudflare request.

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
      return new Response("There was an error");
    }

    // Otherwise we can get the "country" variable
    const { country } = location;
    return new Response(`The country is ${country}.`);
  },
};
```

### Using this with the Grid-aware Websites library

The code below shows a simple implementation of this plugin alongside the Grid-aware Websites core library in a Cloudflare Worker.

```js
import { PowerBreakdown } from "@greenweb/grid-aware-websites";
import { getLocation } from "@greenweb/gaw-plugin-cloudflare-workers";

const powerBreakdown = new PowerBreakdown({
  apiKey:  "you_api_key";
});

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
    const gridData = await powerBreakdown.check(country);

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

const country = "TW" // Set the country variable to Taiwan
const powerBreakdown = new PowerBreakdown({
  apiKey:  "you_api_key";
});

export default {
  async fetch(request, env, ctx) {

    // Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
    const gridData = await powerBreakdown.check(country);

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

const country = "TW" // Set the country variable to Taiwan
const powerBreakdown = new PowerBreakdown({
  apiKey:  "you_api_key";
});

export default {
  async fetch(request, env, ctx) {

    // First check if the there's data for the country saved to KV
    const storedData = await fetchDataFromKv(env, country)

    if (storeData) {
      return new Response(storedData)
    }

    // Use the Grid-aware Websites library to fetch data for Taiwan, and check if grid-aware website changes should be applied.
    const gridData = await powerBreakdown.check(country)

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
                          </html>`;

    await saveDataToKv(env, request.url, modifiedPage);

    // If we've got data back using the Grid-aware Websites library, let's return that to the browser
    return new Response(modifiedPage);
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
import {
  savePageToKv,
  fetchPageFromKv,
} from "@greenweb/gaw-plugin-cloudflare-workers";

export default {
  async fetch(request, env, ctx) {
    const storedPage = await fetchPageFromKv(env, request.url);

    if (storedPage) {
      return new Response(storedPage);
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
                          </html>`;

    await saveDataToKv(env, request.url, modifiedPage);

    // If we've got data back using the Grid-aware Websites library, let's return that to the browser
    return new Response(modifiedPage);
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
