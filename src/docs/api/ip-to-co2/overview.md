---
tags: apiMain
libraryName: IP to CO2 Intensity
title: Overview
description: Use this API to check the carbon intensity of a location based on an IP address.
hasTabs: true
eleventyNavigation:
  key: ip-to-co2-overview
  title: Overview
  order: 1
---

# IP to CO2 Intensity API

The IP to CO2 Intensity API allows you to query an IP address, and return the average annual grid intensity for the region in which the IP address is located.

## Request method

Use the `GET` method for this request.

## Endpoint

The request should be sent to `http://api.thegreenwebfoundation.org/api/v3/ip-to-co2intensity/[ip_address]`.

The `[ip_address]` parameter should be replaced with the IP address you want to query for.

## Parameters

### `[ip_address]`

A valid IP address should be passed to the endpoint.

## Sample request

<seven-minute-tabs>
   <ol role="tablist" aria-label="Select a programming language to preview">
    <li><a href="#js" role="tab" aria-selected="true">JavaScript</a></li>
    <li><a href="#curl" role="tab">cUrl</a></li>
   </ol>

   <div id="js" role="tabpanel">
{% set code %}
fetch("http://api.thegreenwebfoundation.org/api/v3/ip-to-co2intensity/10.0.0.3", {
  method: "GET",
}).then((response) => response.json());
{% endset %}

{% codeSnippet code, 'js' %}

   </div>

   <div id="curl" role="tabpanel">
{% set code %}
curl -X 'GET' \
 'http://api.thegreenwebfoundation.org/api/v3/ip-to-co2intensity/10.0.0.3' \
 -H 'accept: application/json'
{% endset %}

{% codeSnippet code, 'curl' %}

   </div>

   <div>
   <h3>Response</h3>

```json
{
  "country_name": "World",
  "country_code_iso_2": "xx",
  "country_code_iso_3": "xxx",
  "carbon_intensity_type": "avg",
  "carbon_intensity": 442.23,
  "generation_from_fossil": 0.62,
  "year": 2021,
  "checked_ip": "10.0.0.3"
}
```

</div>
</seven-minute-tabs>

## Response object

The response is returned as a JSON object. When the IP being queried cannot be found, the `World` average intensity data is returned.

<seven-minute-tabs>
   <ol role="tablist" aria-label="Select to view response for green, and not green URLs.">
    <li><a href="#green" role="tab" aria-selected="true">Green URL</a></li>
   </ol>

   <div id="green" role="tabpanel">

```json
{
    "country_name": string,
    "country_code_iso_2": string - ISO 3166 Alpha-2 country code,
    "country_code_iso_3": string - ISO 3166 Alpha-3 country code,
    "carbon_intensity_type": string,
    "carbon_intensity": number,
    "generation_from_fossil": number,
    "year": number,
    "checked_ip": string
}
```

   </div>
</seven-minute-tabs>
