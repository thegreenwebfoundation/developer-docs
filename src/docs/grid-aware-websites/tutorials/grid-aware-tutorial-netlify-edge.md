---
title: "Add Grid-aware Websites to an existing site with Netlify Edge Functions"
description: "In this tutorial, you will learn how to apply the Grid-aware Websites library to an existing website using Netlify Edge Functions."
eleventyNavigation:
  key: grid-aware-tutorial-netlify-edge
  title: "Add Grid-aware Websites to an existing site with Netlify Edge Functions"
  #     parent: overview
  sectionTitle: Tutorials
  order: 11
---

# {{ title }}

## Overview

Using Grid-aware Websites with Netlify Edge Functions allows you to add grid awareness to an existing website that is hosted on, or proxied through, Cloudflare's network.

In this tutorial, you will learn how to:

- Create a new Netlify Edge Functions project
- Add Grid-aware Websites to the Netlify Edge Function
- Use the HTMLRewriter API to make a change to the page
- Publish the Netlify Edge Function to target a specific route on your website

## Before starting

You should have:

- An existing website that is hosted on Netlify
- [Node.js installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on your development machine
- An [Electricity Maps API key](https://www.electricitymaps.com/free-tier-api)

You should also be aware of the limits and pricing of Netlify Edge Functions, available on the [Cloudflare website](https://developers.cloudflare.com/workers/platform/).

<aside class="alert alert-info text-base-content">
    <p>
        <strong>Note:</strong>
        This plugin currently uses the <a href="https://portal.electricitymaps.com/developer-hub/api/reference#latest-carbon-intensity-level">Electricity Maps Carbon Aware Websites API</a> as the source of grid intensity data. This API is currently only available under a paid plan, but we are in conversation with Electricity Maps on ways to make this data available in some kind of free version. You can
        track the progress of this issue on
        <a href="https://github.com/thegreenwebfoundation/grid-aware-websites/issues/21">GitHub</a>.
    </p>
</aside>

<!--<aside class="alert alert-info text-base-content">
<p>For the purposes of this tutorial, we will demonstrate deploying a Netlify Edge Function to run on our own Green Web Foundation domain (`thegreenwebfoundation.org`). <strong>When following along with this tutorial, you should use your own domain</strong>.</p>
</aside>-->

## Adding edge functions to a Netlify project

To begin using Grid-aware Websites on an existing website through Netlify Edge Functions, we will first need to add them to a Netlify project. To do this, you can create a `netlify/edge-functions` folder at the root of your project. The [Netlify docs have instructions](https://docs.netlify.com/build/edge-functions/optional-configuration/#edge-functions-directory) if you want to save your edge functions in a different location.

Within the `netlify/edge-functions` folder, let's create our edge function file. For this demo, we'll call it `gaw.js`.

The `netlify/edge-functions/gaw.js` file will contain the code the runs whenever our function is invoked.

## Configuring our edge function

We can declare the configuration for our edge function from inside the `gaw.js` file we've just created. To do this, add the following code to the file:

```js
export const config = {
  path: "/*",
  onError: "bypass"
}
```

Here, we have configured the edge function to run on every route of our site. We've also configured the edge function to be skipped in the event that an error is encountered.

The Netlify docs have more information about [all the available configuration options](https://docs.netlify.com/build/edge-functions/declarations/#declare-edge-functions-inline) for edge functions.

### Adding the Electricity Maps API

Later in the project, we'll use the Electricity Maps API to get information about the power breakdown of a country's energy grid. For this, you'll need an Electricity Maps API key added to your project. We'll first set this up for our development environment, and later in this tutorial we'll set it up for production.

There are [a few ways to add environment variables](https://docs.netlify.com/build/environment-variables/get-started/) to a Netlify project. We'll use a local `.env` file, and [import it using the Netlify CLI](https://docs.netlify.com/build/environment-variables/get-started/#work-with-env-files). First, create a `.env` file in the root of your project if you don't have one already. Add your Electricity Maps API key as follows:

```txt
EMAPS_API_KEY="<your_api_key>"
```

Then, use [Netlify CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/) to upload the contents of your `.env` file to your project.

```bash
npx netlify env:import .env
```

## Adding Grid-aware Websites to the Edge Function

We can now start coding. To begin, we'll add the Netlify Edge Functions specific plugin for Grid-aware Websites to our `gaw.js` edge function. To do this, add the following code to the `gaw.js` file.

```js
import gridAwareAuto from "https://esm.sh/@greenweb/gaw-plugin-netlify-edge@next";

export default async (request, context) => {
  return gridAwareAuto(request, context);
};
```

This code uses the `gridAwareAuto` helper function to take care of setting up and executing the Grid-aware Websites code. We can deploy this code as it is, and it would run in our project. However, when applying Grid-aware Websites to a project you will probably want to configure the grid aware code a bit more.

### Further grid-aware configuration

The `gridAwareAuto` function accepts an options object as the third parameter. This allows for some configuration to be made to the implementation. Accepted options values are:

<div class="table-wrapper">
    <table class="table-auto">
      <caption>Configuration Options for Grid-Aware Websites</caption>
      <thead>
        <tr>
          <th scope="col">Option</th>
          <th scope="col">Type</th>
          <th scope="col">Required</th>
          <th scope="col">Default</th>
          <th scope="col">Possible values</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>gawDataApiKey</code></td>
          <td>String</td>
          <td>Required</td>
          <td><code>''</code></td>
          <td>"xyz123"</td>
          <td>API key for the Electricity Maps</td>
        </tr>
        <tr>
          <td><code>locationType</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>'latlon'</code></td>
          <td>"latlon", "country"</td>
          <td>Type of location data to use</td>
        </tr>
        <tr>
          <td><code>contentType</code></td>
          <td>String[]</td>
          <td>Optional</td>
          <td><code>['text/html']</code></td>
          <td>Example: ['text/html', 'text/css']</td>
          <td>Defines the content types that should be processed</td>
        </tr>
        <tr>
          <td><code>ignoreRoutes</code></td>
          <td>String[]</td>
          <td>Optional</td>
          <td><code>[]</code></td>
          <td>Example: ['/wp-admin', '/assets/js']</td>
          <td>A list of routes where grid-aware code should not be applied</td>
        </tr>
        <tr>
          <td><code>ignoreGawCookie</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>'gaw-ignore'</code></td>
          <td>"gaw-ignore"</td>
          <td>A cookie that when present will result in grid-aware code being skipped</td>
        </tr>
        <tr>
          <td><code>userOptIn</code></td>
          <td>Boolean</td>
          <td>Optional</td>
          <td><code>false</code></td>
          <td>true, false</td>
          <td>Allows developers to specify if users are required to opt-in to the grid-aware website experience</td>
        </tr>
        <tr>
          <td><code>htmlChanges</code></td>
          <td>Object</td>
          <td>Optional</td>
          <td>{}</td>
          <td>{"low": HTMLRewriter, "moderate": HTMLRewriter, "high": HTMLRewriter}</td>
          <td>An object to capture the different HTML changes that are applied at each different grid intesity level</td>
        </tr>
        <tr>
          <td><code>htmlChanges.low</code></td>
          <td>HTMLRewriter</td>
          <td>Optional</td>
          <td>null</td>
          <td>Custom HTMLRewriter for page modification at low grid intensity level</td>
          <td></td>
        </tr>
        <tr>
          <td><code>htmlChanges.moderate</code></td>
          <td>HTMLRewriter</td>
          <td>Optional</td>
          <td>null</td>
          <td>Custom HTMLRewriter for page modification at moderate grid intensity level</td>
          <td></td>
        </tr>
        <tr>
          <td><code>htmlChanges.high</code></td>
          <td>HTMLRewriter</td>
          <td>Optional</td>
          <td>null</td>
          <td>Custom HTMLRewriter for page modification at high grid intensity level</td>
          <td></td>
        </tr>
        <tr>
          <td><code>infoBar</code></td>
          <td>Object</td>
          <td>Optional</td>
          <td><code>{}</code></td>
          <td><code>{target: "", version: "latest", learnMoreLink: "#", popoverText: "", customViews: ""}</code></td>
          <td>Configuration for the info bar element</td>
        </tr>
        <tr>
          <td><code>infoBar.target</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>''</code></td>
          <td>Example: "header", "#info-container"</td>
          <td>Target element for the info bar</td>
        </tr>
        <tr>
          <td><code>infoBar.version</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>'latest'</code></td>
          <td>"latest", "1.0.0"</td>
          <td>Version of the info bar to use</td>
        </tr>
        <tr>
          <td><code>infoBar.learnMoreLink</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>'#'</code></td>
          <td>Example: "https://example.com/learn-more"</td>
          <td>Link to learn more about the info bar</td>
        </tr>
        <tr>
          <td><code>infoBar.popoverText</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>''</code></td>
          <td>Example: "This website adapts based on carbon intensity"</td>
          <td>Provide a custom string of text to be used in the info bar popover element</td>
        </tr>
        <tr>
          <td><code>infoBar.customViews</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>''</code></td>
          <td>Example: "custom-low,custom-moderate,custom-high"</td>
          <td>Custom views for the grid-aware website experience</td>
        </tr>
        <tr>
          <td><code>defaultView</code></td>
          <td>String/null</td>
          <td>Optional</td>
          <td><code>null</code></td>
          <td>null, "low", "moderate", "high"</td>
          <td>Default view for the grid-aware website experience</td>
        </tr>
        <tr>
          <td><code>dev</code></td>
          <td>Boolean</td>
          <td>Optional</td>
          <td><code>false</code></td>
          <td>true, false</td>
          <td>Whether to enable development mode</td>
        </tr>
        <tr>
          <td><code>devConfig</code></td>
          <td>Object</td>
          <td>Optional</td>
          <td><code>{}</code></td>
          <td><code>{hostname: "", port: "", protocol: ""}</code></td>
          <td>Configuration for development mode</td>
        </tr>
        <tr>
          <td><code>devConfig.hostname</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>''</code></td>
          <td>Example: "localhost"</td>
          <td>Hostname for development mode</td>
        </tr>
        <tr>
          <td><code>devConfig.port</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>''</code></td>
          <td>Example: "8080"</td>
          <td>Port for development mode</td>
        </tr>
        <tr>
          <td><code>devConfig.protocol</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>''</code></td>
          <td>Example: "http"</td>
          <td>Protocol for development mode</td>
        </tr>
        <tr>
          <td><code>debug</code></td>
          <td>String</td>
          <td>Optional</td>
          <td><code>"none"</code></td>
          <td>"none", "full", "headers", "logs"</td>
          <td>Activates debug mode which outputs logs and returns additional response headers</td>
        </tr>
      </tbody>
    </table>
</div>

In this tutorial, we want to make a change to the page which will be applied when the grid-aware checks return a result that indicate the grid is dirtier than normal. The `gridAwareAuto` function will perform these checks for us, so we can use the `htmlChanges` option to pass it the changes we want applied.

In the example below we will:

- Set out edge functions to ignore certain routes in our project.
- Add our Electricity Maps API key.
- Set `debug` to "full" so that we see logs in our console and browser.
- Add the `data-grid-aware="true"` to the `<html>` tag when the Electricity Maps API returns a "high" result.

To do this, we'll also need to import the HTMLRewriter tool into our project.

```js
import gridAwareAuto from "https://esm.sh/@greenweb/gaw-plugin-netlify-edge@next";
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request, context) => {
    return gridAwareAuto(request, context, {
      // Ignore these routes
      ignoreRoutes: ["/company/", "/profile/"],
      // Use this API key that has been saved as a secret
      gawDataApiKey: env.EMAPS_API_KEY,
      debug: "full",
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
};
```

### Testing the code

We can now do a first test of our code to ensure it works as expected before moving on. In your terminal, run the command below:

```bash
npx netlify dev
```

This command will use the Netlify CLI to run a version of your project in the development environment.

When the CLI runs, a browser window should open automatically showing your project. In your terminal, you should see log outputs including information about the grid data that has been used to make perform the grid-aware checks.

In order to test that the changes you have made are working, you'll need some way to test your Edge Function from different locations around the World. Unfortunately, the ability to mock geolocation using the Netlify CLI does not work when used with the Grid-aware Websites code. You can, instead, resort to one or more of the following workarounds:

1. Use a VPN service to test a few locations
2. Manually set a fixed value for the `country` variable, and adjust that to test different locations
3. Share your code with a colleague in another location and have them test it
4. Test in production. YOLO. (this suggestion is made in jest, we do not recommend it.)

## Deploying to production

When you're ready, you can deploy your worker to run on your website for the actual path you've configured.

Now, you can run `npx netlify deploy` in your terminal to deploy your Netlify site and edge fuction to production.

### Share your grid-aware website

If you've deployed Grid-aware Websites to your own site we'd love to hear from you! Share your experience with us using the [contact form](https://www.thegreenwebfoundation.org/support-form/?wpf2192_9=Another%20subject) via our website.
