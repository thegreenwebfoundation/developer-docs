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

Using Grid-aware Websites with Cloudflare Workers allows you to add grid awareness to an existing website that is hosted on, or proxied through, Cloudflare's network.

In this tutorial, you will learn how to:

- Create a new Cloudflare Workers project
- Add Grid-aware Websites to the Cloudflare Worker
- Use the HTMLRewriter API to make a change to the page
- Publish the Cloudflare Worker to target a specific route on your website

## Before starting

You should have:

- An existing website that is hosted on Cloudflare or have domain DNS records that are proxied through Cloudflare's network
- [Node.js installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on your development machine
- An [Electricity Maps API key](https://www.electricitymaps.com/free-tier-api)

You should also be aware of the limits and pricing of Cloudflare Workers, available on the [Cloudflare website](https://developers.cloudflare.com/workers/platform/).

<aside class="alert alert-info text-base-content">
    <p>
        <strong>Note:</strong>
        This plugin currently uses the <a href="https://portal.electricitymaps.com/developer-hub/api/reference#latest-carbon-intensity-level">Electricity Maps Carbon Aware Websites API</a> as the source of grid intensity data. This API is currently only available under a paid plan, but we are in conversation with Electricity Maps on ways to make this data available in some kind of free version. You can
        track the progress of this issue on
        <a href="https://github.com/thegreenwebfoundation/grid-aware-websites/issues/21">GitHub</a>.
    </p>
</aside>

<aside class="alert alert-info text-base-content">
<p>For the purposes of this tutorial, we will demonstrate deploying a Cloudflare Worker to run on our own Green Web Foundation domain (`thegreenwebfoundation.org`). <strong>When following along with this tutorial, you should use your own domain</strong>.</p>
</aside>

## Creating a new Cloudflare Workers project

To begin using Grid-aware Websites on an existing website through Cloudflare Workers, we will first create a new Cloudflare Workers project on our development machine. You can do this by using the Cloudflare Wrangler CLI to setup a project using a template which we have prepared.

You can save the Cloudflare Worker anywhere, it _does not_ need to be in the same folder as your project.

```bash
npm create cloudflare@latest -- --template thegreenwebfoundation/gaw-cloudflare-template <DESTINATION_FOLDER_NAME>
```

This will clone the template onto your computer. You can replace `<DESTINATION_FOLDER_NAME>` with the name of your project. During the setup process you will be asked:

- `Do you want to use git for version control?`, select `yes`
- `Do you want to deploy your application?`, select `no`

After the project is cloned, you can navigate to the destination folder. Your project will have a folder structure like this:

```text
grid-aware-worker/
├── src/
│   └── index.js
├── wrangler.json
├── package.json
├── package-lock.json
├── .dev.vars
└── node_modules/
```

The `src/index.js` file contains the Worker code that we will modify to add grid awareness to our website. The `wrangler.json` file is where we can make any [configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) changes for the Cloudflare Worker setup. And the `.dev.vars` file can be used to store secrets (like our Electricity Maps API key) for use in development.

## Configuring our worker

### Setting routes

Before we start writing code, we'll first configure our worker to run on the route we want it to apply to. For demonstration purposes, we will show this grid-aware code being applied to our entire Green Web Foundation website. To do that, we include the following configuration inside of the `wrangler.json` file. _Note: You should replace the `pattern`, and `zone_name` with your own desired route._

```json
"routes": [
  {
   "pattern": "www.thegreenwebfoundation.org/*",
   "zone_name": "thegreenwebfoundation.org"
  }
 ]
```

For more information about routes, and how to configure them for Cloudflare Workers, [refer to the Cloudflare documentation](https://developers.cloudflare.com/workers/configuration/routing/routes/).

### Adding the Electricity Maps API for development

Later in the project, we'll use the Electricity Maps API to get information about the power breakdown of a country's energy grid. For this, you'll need an Electricity Maps API key added to your project. We'll first set this up for our development environment, and later in this tutorial we'll set it up for production.

Open the `.dev.vars` file in the root of the project. There you will see a variable `EMAPS_API_KEY` already present. Update the value of that variable to your own Electricity Maps API key.

```txt
EMAPS_API_KEY="<your_api_key>"
```

## Adding Grid-aware Websites to the Worker

Before we begin writing code, we will install the Cloudflare Workers specific plugin for Grid-aware Websites. Since we already have that setup in our template, we can install it by running the `npm install` command in our project.

The Cloudflare Workers plugin contains a handy function that takes care of setting up and executing the Grid-aware Websites code in our Worker.

## Writing some code

Now that we have the main dependencies for this project installed, we can write some code in the `src/index.js` file. First, though, let's walk through the code that is already there in that file.

```js
import gridAwareAuto from "@greenweb/gaw-plugin-cloudflare-workers";

export default {
  async fetch(request, env, ctx) {
    return gridAwareAuto(request, env, ctx, {
      gawDataApiKey: env.EMAPS_API_KEY,
    });
  },
};
```

- On the first line of our file, we import the `gridAwareAuto` function from the Grid-aware Websites Cloudflare Workers plugin.
- Later on in the file, we return the result of the `gridAwareAuto` function from our Worker. We can do this because the function is setup to return a response even if it encounters an error.
- When using the function we pass in the Cloudflare Workers parameters (`request`, `env`, and `ctx`) as well as an options object. Inside of this object we configure our worker to use our Electricity Maps API key.

### Further configuration

The worker we have setup will run on our assigned route, but it will just return the original page regardless of the results of the grid-aware checks that it runs. The `gridAwareAuto` function accepts an options object as the fourth parameter. This allows for some configuration to be made to the implementation. Accepted options values are:

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
          <td><code>kvCacheData</code></td>
          <td>Boolean</td>
          <td>Optional</td>
          <td><code>false</code></td>
          <td>true, false</td>
          <td>Whether to cache grid data in KV store. Read <a href="https://developers.thegreenwebfoundation.org/grid-aware-websites/plugins/cloudflare-workers/#storing-grid-data">setup instructions</a></td>
        </tr>
        <tr>
          <td><code>kvCachePage</code></td>
          <td>Boolean</td>
          <td>Optional</td>
          <td><code>false</code></td>
          <td>true, false</td>
          <td>Whether to cache modified pages in KV store. Read <a href="https://developers.thegreenwebfoundation.org/grid-aware-websites/plugins/cloudflare-workers/#storing-modified-pages">setup instructions</a></td>
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

```js
import gridAwareAuto from "@greenweb/gaw-plugin-cloudflare-workers";

export default {
  async fetch(request, env, ctx) {
    return gridAwareAuto(request, env, ctx, {
      // Use this API key that has been saved as a secret
      gawDataApiKey: env.EMAPS_API_KEY,
      // A CSS selector for the element where the grid-aware info bar will be inserted.
      infoBar: {
        target: "#gaw-info-bar",
        learnMoreLink:
          "https://www.thegreenwebfoundation.org/tools/grid-aware-websites/",
        version: "latest",
        popoverText:
          "This website adapts based on your local electricity grid's carbon intensity",
      },
      debug: "full",
      // Make these changes to the web page using HTMLRewriter
      htmlChanges: new HTMLRewriter().on("html", {
        element(element) {
          element.setAttribute("data-grid-aware", "true");
        },
      }),
    });
  },
};
```

In the example above, we use the `htmlChanges` option to pass a new instance of the HTMLRewriter to the function. We use the HTMLRewriter to add a data attribute (`data-grid-aware="true"`) to the HTML tag of the page. You can learn more about [Cloudflare's HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/) on their documentation site.

We have also set the `debug: "full"` option for visibility during testing, and configure the [info bar](https://github.com/thegreenwebfoundation/gaw-web-component) to be added to the website inside the `#gaw-info-bar` wrapper element.

### Testing the code

We can now do a first test of our code to ensure it works as expected before moving on. In your terminal, run the command below:

```bash
npx wrangler dev
```

This command will download and run Cloudflare's Wrangler tool from NPM. If you have never used Wrangler before, it will open your web browser so you can login to your Cloudflare account.

Go to [http://localhost:8787](http://localhost:8787) to view your Worker. In your terminal, you should see log outputs including information about the grid data that has been used to make perform the grid-aware checks.

In order to test that the changes you have made are working, you'll need some way to test your Worker from different locations around the World. At the time of writing, there is no way to change the geolocation of a request within the Wrangler API. You can, instead, resort to one or more of the following workarounds:

1. Use a VPN service to test a few locations
2. Manually set a fixed value for the `country` variable, and adjust that to test different locations
3. Share your code with a colleague in another location and have them test it
4. Test in production. YOLO. (this suggestion is made in jest, we do not recommend it.)

<aside class="alert alert-info text-base-content">
    <h4>Handling errors</h4>
    <p>The <code>gridAwareAuto</code> is configure to handle errors. In the case that any errors occur when running the function, it will default to returning the regular web page without any changes applied.</p>
</aside>

## Deploying to production

When you're ready, you can deploy your worker to run on your website for the actual path you've configured.

Before doing that, though, you should first add the `EMAPS_API_KEY` secret to your Cloudflare account so that it can be used by the Worker. You can [learn more about secrets](https://developers.cloudflare.com/workers/configuration/secrets/) in the Cloudflare docs. To add the `EMAPS_API_KEY` secret to your account, run the following command in your terminal.

```bash
npx wrangler secret put EMAPS_API_KEY
```

You'll then be prompted to select the Cloudflare account to add this to - it must be the same account as the domain or zone you are doing to deploy this Worker too eventually. You'll then be asked to add your API key value. Do that, and press enter. If you're deploying the Worker code for the first time, you will also be asked if you want to create a new Worker to assign this secret to. Select `Yes (Y)`. With that done, you should soon see a message confirming that the secret was successfully added.

Now, you can run `npx wrangler deploy` in your terminal to deploy your Worker to production.

Once your worker has been successfully deployed, it will be active and running on routes you configured earlier in this tutorial. You can find information about your deployed worker including logs, mertics, settings etc. via your Cloudflare dashboard.

## Real world examples

We use this function on our own Green Web Foundation Grid-aware Websites project page.

- View [the page](https://www.thegreenwebfoundation.org/tools/grid-aware-websites/)
- View [Cloudflare Workers source code](https://github.com/thegreenwebfoundation/gwf-gaw-cloudflare-worker/blob/main/src/index.js)

### Share your grid-aware website

If you've deployed Grid-aware Websites to your own site we'd love to hear from you! Share your experience with us using the [contact form](https://www.thegreenwebfoundation.org/support-form/?wpf2192_9=Another%20subject) via our website.
