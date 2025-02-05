---
title: "Add Grid-aware Websites to an existing site with Cloudflare Workers"
description: "In this tutorial, you will learn how to apply the Grid-aware Websites library to an existing website using Cloudflare Workers."
eleventyNavigation:
  key: grid-aware-tutorial-cloudflare-workers
  title: "Add Grid-aware Websites to an existing site with Cloudflare Workers"
  #     parent: overview
  sectionTitle: Tutorials
  order: 10
---

# {{ title }}

## Overview

Using Grid-aware Websites with Cloudflare Workers allows you to add grid awareness to an existing website that is hosted on or proxied through Cloudflare's network.

In this tutorial, you will learn how to:

- Create a new Cloudflare Workers project
- Add Grid-aware Websites to the Cloudflare Worker
- Use the Grid-aware Websites library with the Electricity Maps API to determine if grid-aware view
- Use the HTMLRewriter API to remove content from the page when a grid-aware view is recommended
- Publish the Cloudflare Worker to target a specific route on your website

## Before starting

You should have:

- An existing website that is hosted on Cloudflare or have domain DNS records that are proxied through Cloudflare's network
- [Node.js installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on your development machine
- An [Electricity Maps API key](https://www.electricitymaps.com/free-tier-api)

You should also be aware of the limits and pricing of Cloudflare Workers, available on the [Cloudflare website](https://developers.cloudflare.com/workers/platform/).

For the purposes of this tutorial, we will demonstrate deploying a Cloudflare Worker to run on our own Green Web Foundation domain (`greenwebfoundation.org`). When following along with this tutorial, you should use your own domain.

## Creating a new Cloudflare Workers project

To begin using Grid-aware Websites on an existing website through Cloudflare Workers, we will first create a new Cloudflare Workers project on our development machine. You can do that by fellowing the steps below, or by visiting the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/get-started/guide/).

In a new terminal window, run the command below. We've called our project `grid-aware-worker`, but you can give it whatever name you like.

```bash
npm create cloudflare@latest -- grid-aware-worker
```

Running this command will present you with a series of prompts to setup your Cloudflare Worker project. Once you have completed the prompts, you can move into the project folder.

```bash
cd grid-aware-worker
```

Your project will have a folder structure like this:

```
grid-aware-worker/
├── src/
│   └── index.js          
├── wrangler.json         
├── package.json          
├── package-lock.json     
└── node_modules/         
```

The `src/index.js` file contains the Worker code that we will modify to add grid awareness to our website.

## Configuring our worker

### Setting routes

Before we start writing code, we'll first configure our worker to run on the route we want it to apply to. We want to apply this Worker to the `/tools/grid-aware-websites/` path on the `greenwebfoundation.org` domain. To do that, we include the following configuration inside of the `wrangler.json` file. You should replace the pattern, and zone_name with your own desired route.

```json
"routes": [
  {
   "pattern": "www.thegreenwebfoundation.org/tools/grid-aware-websites/",
   "zone_name": "thegreenwebfoundation.org"
  }
 ]
```

For more information about routes, and how to configure them for Cloudflare Workers, [refer to the Cloudflare documentation](https://developers.cloudflare.com/workers/configuration/routing/routes/).

### Adding the Electricity Maps API for development

Later in the project, we'll use the Electricity Maps API to get information about the power breakdown of a country's energy grid. For this, you'll need an Electricity Maps API key added to your project. We'll first set this up for our development environment, and later in this tutorial we'll set it up for production. To do this securely, we'll create a `.dev.vars` file in the root directory of our project. Inside that file you can add your Electricity Maps API key as a variable- here, we've named the variable `EMAPS_API_KEY`.

```txt
EMAPS_API_KEY="<your_api_key>"
```

## Adding Grid-aware Websites to the Worker

Before we begin writing code, we will first install the Grid-aware Websites core library and the Cloudflare Workers plugin into our project. In a terminal window run the following NPM commands:

```bash
npm install @greenweb/grid-aware-websites
npm install @greenweb/gaw-plugin-cloudflare-workers
```

The Grid-aware Websites library's main function is to fetch data about a given location from a specified data source (in our case the Electricity Maps API), and based on that information return a flag indicating if grid-aware changes should be applied to a website. The Cloudflare Workers plugin has some specific functionality that makes it easier to work with Cloudflare Workers.

## Writing some code

Now that we have the main dependencies for this project installed, we can write some code in the `src/index.js` file. What we will do is:

1. Get the location (country) of a website request
2. Run grid-awareness checks of that country's energy grid
3. Based on the result of that check:
  3.1 Return the website as usual
  3.2 Modify the website before returning it to the user

### Importing our dependencies

At the top of the `src/index.js` file, we will first import the Grid-aware Websites library and Cloudflare Workers plugin.

```js
import { gridAwarePower } from '@greenweb/grid-aware-websites';
import { getLocation } from '@greenweb/gaw-plugin-cloudflare-workers';
```

Here, we are importing the `gridAwarePower` function from the main library. This function allows us to fetch data about the fuel-mix of a country's electricity grid from the Electricity Maps API. Fuel-mix is a term used to describe the balance of renewable, low-carbon, and fossil fuel energy used to generate the electricity of a particular region or electricity grid.

The `getLocation` function that we import from the Cloudflare Workers plugin will be used to return the country code of the incoming website request. We'll use this country code to fetch the fuel-mix data mentioned above.

Further down in the `src/index.js` file, you should see some boilerplate for a Cloudflare Worker. Delete everything that is inside the `async fetch(request, env, ctx)` function. You should end up with a file that looks like this:

```js
import { gridAwarePower } from '@greenweb/grid-aware-websites';
import { getLocation } from '@greenweb/gaw-plugin-cloudflare-workers';

export default {
 async fetch(request, env, ctx) {
    
 }
}
```

### Getting a website visitor's country

We'll now add some code into that `fetch` function to:

- Fetch the requested URL
- Check that the response is a HTML page
- Get the country of the visitor making the request
- Return that data in a response

Your Workers fetch function should look like this:

```js
export default {
 async fetch(request, env, ctx) {
  // First fetch the request
  const response = await fetch(request.url);
  // Then check if the request content type is HTML.
  const contentType = response.headers.get('content-type');

  // If the content is not HTML, then return the response without any changes.
  if (!contentType || !contentType.includes('text/html')) {
   return new Response(response.body, {
    ...response,
   });
  }

  // If the content type is HTML, we get the country the request came from
  const location = await getLocation(request);
  const { country } = location;

  // If the country data does not exist, then return the response without any changes.
  if (!country) {
   return new Response(response.body, {
    ...response,
   });
  }

  // We return a response - this is just to check that it works. We'll remove it soon.
  return new Response(`Request from country code ${country}.`)
 }
}
```

Let's step through this code.

**Fetch the requested URL and check if it is a HTML page**

We start by fetching the requested URL and checking its mime-type. We do this because, for this tutorial, we are only worried about modifying the content of the web page the user has requested. We _could_ apply this Cloudflare Worker to an API response instead - in which case we would check if the content type is `application/json`.

We do these steps first because if the response is not a HTML page, then we want to return it back to the browser as soon as possible without running any other code.

**Get the request's country**

We then use the `gaw-plugin-cloudflare-workers` to fetch the location from the Cloudflare `request` object that we have access to via the `fetch` function.

### Testing the code

We can now do a first test of our code to ensure it works as expected before moving on. In your terminal, run the command below:

```bash
npx wrangler dev
```

This command will download and run Cloudflare's Wrangler tool from NPM. If you have never used Wrangler before, it will open your web browser so you can login to your Cloudflare account.

Go to [http://localhost:8787](http://localhost:8787) to view your Worker. If everything works, you should see the `Request from country code ...` output in the browser.

### Checking if grid-awareness should be applied

Now that we're getting the country of the request, we can use that value with the Grid-aware Websites library to get information about the fuel mix of that country's energy grid. The Grid-aware Websites library will then return a flag indicating if grid-aware changes should be made to the web page or not.

Let's start by removing the response that returns the country code.

```diff
- return new Response(`Request from country code ${country}.`)
```

Replace it with the code below, which:

```js
const gridData = await gridAwarePower(country, env.EMAPS_API_KEY, {
  mode: 'low-carbon'
});

// If there's an error getting data, return the web page without any modifications
if (gridData.status === 'error') {
 return new Response(response.body, {
  ...response,
  headers: {
   ...response.headers,
  },
 });
}

// Otherwise, return the grid data in the response
return new Response(`Grid data: ${JSON.stringify(gridData, null, 2)}`)
```

In the code above, we pass the request country and the Electricity Maps API key into the `gridAwarePower` function. This function will return information about the energy grid we have requested data for, as well as a `gridAware` flag - a boolean value indicating whether grid-aware changes should be made to the website. You might have also noticed that we have specified a `mode` property which we passed into the function via an object. This `mode` property tells the `gridAwarePower` function that we want to use data from Electricity Maps that shows "low-carbon" energy (that is renewables + nuclear). You can learn more about the modes available, and other options, on the [Getting Starting page](/grid-aware-websites/getting-started/#using-the-gridawarepower-function).

Again, we can test that everything works so far by running the `npx wrangler dev` command in our project. Now, when you go to [http://localhost:8787](http://localhost:8787), you should see the contents `gridData` object in the browser.

### Making changes to the web page if grid-aware changes are recommended

If the `gridData.gridAware` flag returns as `true`, that indicates to us that the website visitor is in a region where more than 50% of the energy is being delivered by fossil fuel sources.

In this case, we will want to make some changes to our web page to make it less power hungry on the users device. To do this quickly in a Cloudflare Worker, we can use the [HTMLRewriter API](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/). This API allows us to parse the HTML in the response, manipulate it, and then return the adjusted HTML back to the user in the response.

If you're not familiar with the HTMLRewriter, you should check out the docs linked to above. In our Cloudflare Worker, we will write some code to remove an `iframe` that we have on the `/tools/grid-aware-websites` page of our website at the time of writing.

Remove the `Grid data:` response at the end of the Worker.

```diff
- return new Response(`Grid data: ${JSON.stringify(gridData, null, 2)}`)
```

Replace it with the HTMLRewriter code below:

```js
// If the grid aware flag is triggered (gridAware === true), then we'll return a modified HTML page to the user.
if (gridData.gridAware) {
  const modifyHTML = new HTMLRewriter()
  .on('iframe', {
   element(element) {
    element.remove();
   },
  })

 // Transform the response using the HTMLRewriter API, and set appropriate headers.
 let modifiedResponse = new Response(modifyHTML.transform(response).body, {
  ...response,
  headers: {
   ...response.headers,
   'Content-Type': 'text/html;charset=UTF-8'
  },
 });

 return modifiedResponse
}

return new Response(response.body, {
  ...response,
  headers: {
   ...response.headers,
  },
 }); 
```

The code above creates a new instance of the HTMLRewriter API that looks for and removes all `iframe` elements. You can chain these steps to make other changes to a web page, even adding content.

Then, pass the response into the instance of the HTMLRewriter that we've just created, and return the modified response alongside addition headers.

Otherwise, if the `gridData.gridAware` flag is returned as `false`, we just return the initial response without any modifications.

## Putting it all together

The final code in your Cloudflare Worker should look like this:

```js
import { gridAwarePower } from '@greenweb/grid-aware-websites';
import { getLocation } from '@greenweb/gaw-plugin-cloudflare-workers';

export default {
 async fetch(request, env, ctx) {
    // First fetch the request
  const response = await fetch(request.url);
  // Then check if the request content type is HTML.
  const contentType = response.headers.get('content-type');

  // If the content is not HTML, then return the response without any changes.
  if (!contentType || !contentType.includes('text/html')) {
   return new Response(response.body, {
    ...response,
   });
  }

  // If the content type is HTML, we get the country the request came from
  const location = await getLocation(request);
  const { country } = location;

  // If the country data does not exist, then return the response without any changes.
  if (!country) {
   return new Response(response.body, {
    ...response,
   });
  }

  const gridData = await gridAwarePower(country, env.EMAPS_API_KEY, {
    mode: 'low-carbon'
  });

  // If there's an error getting data, return the web page without any modifications
  if (gridData.status === 'error') {
  return new Response(response.body, {
    ...response,
    headers: {
    ...response.headers,
    },
  });
  }

  // If the grid aware flag is triggered (gridAware === true), then we'll return a modified HTML page to the user.
  if (gridData.gridAware) {
    const modifyHTML = new HTMLRewriter().on('iframe', {
      element(element) {
        element.remove();
      },
    })

    // Transform the response using the HTMLRewriter API, and set appropriate headers.
    let modifiedResponse = new Response(modifyHTML.transform(response).body, {
      ...response,
      headers: {
      ...response.headers,
      'Content-Type': 'text/html;charset=UTF-8'
      },
    });

    return modifiedResponse
  }

  return new Response(response.body, {
    ...response,
    headers: {
    ...response.headers,
    },
  }); 
 }
}
```

### Testing the completed worker

Now, when you run `npx wrangler dev` and visit [http://localhost:8787](http://localhost:8787), you should see the web page showing the domain you configured at the start of this tutorial. You can then use the address bar to navigate to the path on which you configured the Worker code to execute. For us, that is `http://localhost:8787/tools/grid-aware-websites/`.

In order to test that the changes you have made are working, you'll need some way to test your Worker from different locations around the World. At the time of writing, there is no way to change the geolocation of a request within the Wrangler API. You can, instead, resort to one or more of the following workarounds:

1. Use a VPN service to test a few locations
2. Manually set a fixed value for the `country` variable, and adjust that to test different locations
3. Share your code with a colleague in another location and have them test it
4. Test in production. YOLO. (this suggestion is made in jest, we do not recommend it.)

## Deploying to production

When you're ready, you can deploy your worker to run on your website for the actual path you've configured.

Before doing that, though, you should first add the `EMAPS_API_KEY` secret to your Cloudflare account so that it can be used by the Worker. You can [learn more about secrets](https://developers.cloudflare.com/workers/configuration/secrets/) in the Cloudflare docs. To add the `EMAPS_API_KEY` secret to your account, run the following command in your terminal.

```bash
npx wrangler secret put EMAPS_API_KEY
```

You'll then be prompted to select the Cloudflare account to add this to - it must be the same account as the domain or zone you are doing to deploy this Worker too eventually. You'll then be asked to add your API key value. Do that, and press enter. If you're deploying the Worker code for the first time, you will also be asked if you want to create a new Worker to assign this secret to. Select `Yes (Y)`. With that done, you should soon see a message confirming that the secret was successfully added.

Now, you can run `npx wrangler deploy` in your terminal to deploy your Worker to production.

---

## Advanced

In this next section, we will cover some more advanced functionality which can be added to the Cloudflare Worker we've just created. That is:

- How to store and use data from Electricity Maps API to avoid making multiple requests for the same data.
- How to store and retrieve the modified version of the web page to avoid running HTMLRewriter each time.

These are quality of life improvements to our code but while the are not critical, they may have performance and usage benefits especially for websites that received a lot of traffic. You can implement none, one, or both of these additional bits of functionality in your project. As such, each section below is written as individual components, so apologies in advance for any duplicated content.

### Storing and reusing live grid data

In the example below, we will update our Cloudflare Worker function to store the data response from the Electricity Maps API for one hour, and reuse that data for subsequent requests. To do this, we will use another Cloudflare product called [Workers KV](https://developers.cloudflare.com/kv/) - a low-latency key-value store. Workers KV has a generous free plan, however you [should be aware of the limitations](https://developers.cloudflare.com/kv/platform/limits/) when using it.

We will use Workers KV to store the response from the Electricity Maps API in the following format - `key: zone ID, value: API data`. Then, the next time we have a request from a location with the same zone ID, we can use this stored data rather than making another outbound API request.

To do this, we will use some helper functions that are part of the `greenweb/gaw-plugins-cloudflare-workers` library. These functions are - `saveDataToKv` and `fetchDataFromKv`.

#### Storing data in Workers KV

To setup saving grid data to Cloudflare Workers KV, you will need to create a KV namespace and bind it to your project. In your project, run the following command:

```bash
npx wrangler kv namespace create GAW_DATA_KV
```

If created successfully, you will receive instructions in your terminal for how to update your project's `wrangler.json` configuration file so that it binds to the new KV store you've just created.

<aside class="alert alert-info text-base-content">
<p><strong>Note:</strong> The KV store your create <i>must</i> be called <code>GAW_DATA_KV</code> otherwise the helper functions in the <code>greenweb/gaw-plugins-cloudflare-workers</code> plugin will not be able to work properly.</p>
</aside>

Now, we are ready to start modifying our Workers code to put data in the `GAW_DATA_KV` store. In the `src/index.js` of your project, change the import statements at the start of the file, and then make the code changes below:

```diff
- import { getLocation } from '@greenweb/gaw-plugin-cloudflare-workers';
+ import { getLocation, saveDataToKv, fetchDataFromKv } from '@greenweb/gaw-plugin-cloudflare-workers';
```

```diff
  const gridData = await gridAwarePower(country, env.EMAPS_API_KEY, {
    mode: 'low-carbon'
  });

  // If there's an error getting data, return the web page without any modifications
  if (gridData.status === 'error') {
    return new Response(response.body, {
      ...response,
      headers: {
      ...response.headers,
      },
    });
  }

+ // Save the gridData to the KV store. By default, data is cached for 1 hour.
+ await saveDataToKv(env, country, JSON.stringify(gridData))
```

Here, we import the two functions we'll need into our project. Then further down in our code, we use the `saveDataToKv` function to store the `gridData` JSON which we've got from the API. The key we use to store this is the `country` constant. By default, this data will be stored for one (1) hour before it expires. This duration can be shortened or extended by passing in an additional options parameter into the `saveDataToKv` function. [Learn more about how to do that in the plugin docs](/grid-aware-websites/plugins/cloudflare-workers/#store-grid-data).

#### Fetching data in Workers KV

Now that we are storing data for one hour, we can start to use it in our Worker to avoid making repeated outbound API calls. To do this, make the following changes to your code:

```diff
- const gridData = await gridAwarePower(country, env.EMAPS_API_KEY, {
-    mode: 'low-carbon'
-  });
+ // First check if the there's data for the country saved to KV
+ let gridData = await fetchDataFromKv(env, country);

+ // If no cached data, fetch it using the `gridAwarePower` function
+ if (!gridData) {
+   gridData = await gridAwarePower(country, env.EMAPS_API_KEY, {
+     "mode": "low-carbon"  
+   });
+ }

  // If there's an error getting data, return the web page without any modifications
  if (gridData.status === 'error') {
    return new Response(response.body, {
      ...response,
      headers: {
      ...response.headers,
      },
    });
  }

  // Save the gridData to the KV store. By default, data is cached for 1 hour.
  await saveDataToKv(env, country, JSON.stringify(gridData))
```

Here, we first check the `GAW_DATA_KV` to see if there's information stored for based on the value of the `country` parameter we pass it. If there is not, only then do we use the `gridAwarePower` function to make a request to the Electricity Maps API for data about that country's grid.

### Storing and reusing modified page content

In the example below, we will update our Cloudflare Worker function to store the modified page content, and reuse that as the response for subsequent requests where it is needed. To do this, we will use another Cloudflare product called [Workers KV](https://developers.cloudflare.com/kv/) - a low-latency key-value store. Workers KV has a generous free plan, however you [should be aware of the limitations](https://developers.cloudflare.com/kv/platform/limits/) when using it.

We will use Workers KV to store the HTML content that is modified using HTMLRewriter in the following format - `key: page URL, value: modified HTML content`. Then, the next time we need to return a modified version for that page, we can use this stored data rather than rerunning the HTMLRewriter again.

To do this, we will use some helper functions that are part of the `greenweb/gaw-plugins-cloudflare-workers` library. These functions are - `savePageToKv` and `fetchPageFromKv`.

#### Storing modified pages in Workers KV

To setup saving modified page content to Cloudflare Workers KV, you will need to create a KV namespace and bind it to your project. In your project, run the following command:

```bash
npx wrangler kv namespace create GAW_PAGE_KV
```

If created successfully, you will receive instructions in your terminal for how to update your project's `wrangler.json` configuration file so that it binds to the new KV store you've just created.

<aside class="alert alert-info text-base-content">
<p><strong>Note:</strong> The KV store your create <i>must</i> be called <code>GAW_PAGE_KV</code> otherwise the helper functions in the <code>greenweb/gaw-plugins-cloudflare-workers</code> plugin will not be able to work properly.</p>
</aside>

Now, we are ready to start modifying our Workers code to put data in the `GAW_PAGE_KV` store. In the `src/index.js` of your project, change the import statements at the start of the file, and then make the code changes below:

```diff
- import { getLocation } from '@greenweb/gaw-plugin-cloudflare-workers';
+ import { getLocation, savePageToKv, fetchPageFromKv } from '@greenweb/gaw-plugin-cloudflare-workers';
```

```diff
  if (gridData.gridAware) {
    const modifyHTML = new HTMLRewriter().on('iframe', {
      element(element) {
        element.remove();
      },
    })

    // Transform the response using the HTMLRewriter API, and set appropriate headers.
    let modifiedResponse = new Response(modifyHTML.transform(response).body, {
      ...response,
      headers: {
      ...response.headers,
      'Content-Type': 'text/html;charset=UTF-8'
      },
    });

+   // Store the modified response in the KV. By default, data is cached for 24 hours.
+   await savePageToKv(env, request.url, modifiedResponse.clone());

    return modifiedResponse
  }
```

Here, we import the two functions we'll need into our project. Then further down in our code, we use the `savePageToKv` function to store a clone of the modified response. The key we use to store this is the `request.url` value. By default, this data will be stored for 24 hours before it expires. This duration can be shortened or extended by passing in an additional options parameter into the `savePageToKv` function. [Learn more about how to do that in the plugin docs](/grid-aware-websites/plugins/cloudflare-workers/#store-modified-pages-in-workers-kv).

#### Fetching and returning a modified page from KV

Now that we are storing a modified version of the page for 24 hours, we can start to return it the next time we need to make grid-aware changes. This avoids us having to repeatedly run the HTMLRewriter API to return the same content. To do this, make the following changes to your code:

```diff
  if (gridData.gridAware) {

+   // Check if the response is already stored in KV
+   const cachedResponse = await fetchPageFromKv(env, request.url);
+
+   // If there's a cached response, return that
+   if (cachedResponse) {
+     return new Response(cachedResponse, {
+       ...response,
+       headers: {
+         ...response.headers,
+         'Content-Type': 'text/html;charset=UTF-8',
+       }
+     });
+   }

    const modifyHTML = new HTMLRewriter().on('iframe', {
      element(element) {
        element.remove();
      },
    })

    // Transform the response using the HTMLRewriter API, and set appropriate headers.
    let modifiedResponse = new Response(modifyHTML.transform(response).body, {
      ...response,
      headers: {
      ...response.headers,
      'Content-Type': 'text/html;charset=UTF-8'
      },
    });

    // Store the modified response in the KV. By default, data is cached for 24 hours.
    await savePageToKv(env, request.url, modifiedResponse.clone());

    return modifiedResponse
  }
```

Here, we first check the `GAW_PAGE_KV` to see if there's a modified version of the page stored based on the value of the `request.url` parameter we pass it. If there is, we return the content from the KV. If there is not, only then do we use the HTMLRewriter API modify the page before returning it.
