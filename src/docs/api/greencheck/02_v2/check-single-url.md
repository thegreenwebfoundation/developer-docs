---
libraryName: Greencheck API
title: v2 - Check single URL
description: Use this API to check if a domain is hosted on a green web host recognised by The Green Web Foundation.
hasTabs: true
eleventyNavigation:
  key: v2-check-single-url
  title: Check single URL
  order: 10
  sectionTitle: Version 2
---

# Query for a single domain

<div class="alert alert-warning">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>While version 2 of this API is still functional, we strongly recommend you use <a href="/api/greencheck/v3/">version 3</a>.</span>
          </div>
      </div>

The Greencheck API provides endpoints that allow developers to query [The Green Web Foundation's dataset](https://datasets.thegreenwebfoundation.org/) of green domains.

The endpoint allows you to check if a single website domain is served from a green web host.

### Request method

Use the `GET` method for this request.

### Endpoint

The request should be sent to `https://api.thegreenwebfoundation.org/greencheck/[hostname]`.

The `[hostname]` parameter should be replaced with the website domain you want to query for.

### Parameters

#### `[hostname]`

A valid hostname should be passed to the endpoint. This parameter must not include any protocol, port, or path information.

- `climateaction.tech` <span class="badge align-middle badge-success">Accepted</span>
- `https://climateaction.tech` <span class="badge align-middle badge-error">Incorrect</span>
- `climateaction.tech/events` <span class="badge align-middle badge-error">Incorrect</span>

## Sample request

<seven-minute-tabs>
   <ol role="tablist" aria-label="Select a programming language to preview">
    <li><a href="#js" role="tab" aria-selected="true">JavaScript</a></li>
    <li><a href="#curl" role="tab">cUrl</a></li>
   </ol>

   <div id="js" role="tabpanel">
{% set code %}
fetch("https://api.thegreenwebfoundation.org/greencheck/climateaction.tech", {
  method: "GET",
}).then((response) => response.json());
{% endset %}

{% codeSnippet code, 'js' %}

   </div>

   <div id="curl" role="tabpanel">
{% set code %}
curl -X 'GET' \
 'http://api.thegreenwebfoundation.org/greencheck/climateaction.tech' \
 -H 'accept: application/json'
{% endset %}

{% codeSnippet code, 'curl' %}

   </div>

   <div>
   <h3>Response</h3>

```json
{
  "url": "climateaction.tech",
  "hosted_by": "Cloudflare",
  "hosted_by_website": "www.cloudflare.com",
  "partner": null,
  "green": true,
  "hosted_by_id": 779,
  "modified": "2022-10-19T15:05:02",
  "supporting_documents": [
    {
      "id": 18,
      "title": "Blog post - The Climate and Cloudflare",
      "link": "https://blog.cloudflare.com/the-climate-and-cloudflare/"
    },
    {
      "id": 21,
      "title": "Cloudflare 2020 Emissions Inventory",
      "link": "https://s3.nl-ams.scw.cloud/tgwf-web-app-live/uploads/Cloudflare_Emissions_Inventory_-_2020.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=SCWK7542V4RH19SJV0RG%2F20221020%2Fnl-ams%2Fs3%2Faws4_request&X-Amz-Date=20221020T015933Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=580cc567fcc50c07f636b1b9915f09ea3f9745a10e3f98cbbf07ff40583a35ee"
    }
  ]
}
```

</div>
</seven-minute-tabs>

## Response object

The response is returned as a JSON object. The content of the returned object depends on if the URL that was queried for is green.

<seven-minute-tabs>
   <ol role="tablist" aria-label="Select to view response for green, and not green URLs.">
    <li><a href="#green" role="tab" aria-selected="true">Green URL</a></li>
    <li><a href="#not-green" role="tab">Not green URL</a></li>
   </ol>

   <div id="green" role="tabpanel">

```json
{
  "url": string,
  "hosted_by": string,
  "hosted_by_website": string,
  "partner": string || null,
  "green": true,
  "hosted_by_id": integer,
  "modified": ISO 8601 formatted date string,
  "supporting_documents": array[
   object{
      "id": integer,
      "title": string
      "link": string
   },
  ]
}
```

   </div>

   <div id="not-green" role="tabpanel">

```json
{
    "green": false,
    "url": string,
    "data": false
}
```

   </div>
</seven-minute-tabs>
