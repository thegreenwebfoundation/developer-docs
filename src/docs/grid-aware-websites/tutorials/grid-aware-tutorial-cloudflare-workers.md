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

In the code above, we pass the request country and the Electricity Maps API key into the `gridAwarePower` function. This function will return information about the energy grid we have requested data for, as well as a `gridAware` flag - a boolean value indicating whether grid-aware changes should be made to the website.

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

TODO: Missing something here about how to actually test if the changes worked.

## Deploying to production

When you're ready, you can deploy your worker to run on your website for the actual path you've configured.

Before doing that, though, you should first add the `EMAPS_API_KEY` secret to your Cloudflare account so that it can be used by the Worker. You can [learn more about secrets](https://developers.cloudflare.com/workers/configuration/secrets/) in the Cloudflare docs. To add the `EMAPS_API_KEY` secret to your account, run the following command in your terminal.

```bash
npx wrangler secret put EMAPS_API_KEY
```

You'll then be prompted to select the Cloudflare account to add this to - it must be the same account as the domain or zone you are doing to deploy this Worker too eventually. You'll then be asked to add your API key value. Do that, and press enter. If you're deploying the Worker code for the first time, you will also be asked if you want to create a new Worker to assign this secret to. Select `Yes (Y)`. With that done, you should soon see a message confirming that the secret was successfully added.

Now, you can run `npx wrangler deploy` in your terminal to deploy your Worker to production.

TODO: Add an advanced section talking about caching Electricity Maps API data & caching page responses
