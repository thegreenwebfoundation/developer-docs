---
title: "Check a domain for carbon.txt"
description: "In this tutorial, you will install CO2.js in a Node environment. Then, you will check a domain to see if they are hosting a valid carbon.txt file."
eleventyNavigation:
  key: check-carbon-txt
  title: "Check a domain for carbon.txt"
  #     parent: overview
  sectionTitle: Tutorials
  order: 14
---

# {{ title }}

## Overview

CO2.js comes with a handy function which lets you check if a web domain hosts a valid carbon.txt file. Under the hood, this function uses the [Greencheck API](/api/carbon-txt/overview/) to return results. You can learn more about the carbon.txt project at [https://carbontxt.org](https://carbontxt.org).

In this tutorial, you will install CO2.js in a Node environment. Then, you will check a domain to see if it hosts a valid carbon.txt file.

## Before starting

You can follow along with this tutorial in your local development environment, or by using the button below to launch the project in Gitpod.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/thegreenwebfoundation/gitpod-node-starter)

### Local development

If you are following along this tutorial locally, you will need to have the following setup on your machine:

- Node version 14 or later
- NPM version 6 or later

## Learning goals

- How to install CO2.js using NPM
- How to lookup if a domain hosts a carbon.txt file

## Setting up

If you are following along using the Gitpod starter template, you can skip this section.

Otherwise, create a new folder locally called `co2js-carbon-txt` and navigate into that folder. Then, initialise NPM.

```bash
mkdir co2js-carbon-txt
cd co2js-carbon-txt
npm init -y
```

Next, create an `check.js` file, and open it in your code editor of choice. We will write the code for this tutorial inside the `check.js` file.

## Installing CO2.js

Inside your project folder, run the following command to install CO2.js as a dependency.

```bash
npm install @tgwf/co2
```

## Initialise CO2.js

In your project’s `check.js` file, add the following code to include the CO2.js carbon-txt module's `check()` function in your code.

```js
const { check } = require("@tgwf/co2/carbon-txt");
```

## Lookup a domain to find a carbon.txt file

To check if a single domain is green hosted, you can pass the following parameters into the `check` function:

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| domain | `string` | <span class="badge align-middle badge-success my-0">Required</span> | the website domain you want to check for green hosting. |
| options | `object` | <span class="badge align-middle badge-success my-0">Required</span> | An object of domain check options. |

The `options` object may contain the following keys:

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| apiKey | `string` | <span class="badge align-middle badge-success my-0">Required</span> | A valid Green Web Foundation API key. You can get one from the [Green Web Portal](http://admin.thegreenwebfoundation.org/provider-portal). |
| verbose | `boolean` |  | indicate where you want to receive the full JSON payload from the API (including logs), or just the core data. Default: `false` |
| userAgentIdentifier | `string` |  | representing the app, site, or organisation that is making the request. |
| customValidator | `string` |  | representing the URL of the carbon.txt validator endpoint (if you do not want to use the Green Web Foundation carbon.txt API endpoint). |

Adding the code below to the `check.js` file allows us to check if the domain `google.com` for a valid carbon.txt file and return the results of the parsed file if found.

```js
const options = {
  apiKey: "my-api-key",
  verbose: false
};
check("google.com", options).then((result) => {
  console.log(result);
});
```

Running the code above returns the following result:

```bash
node check.js

# Output:
# {
#  success: false,
#  errors: [
#    'UnreachableCarbonTxtFile: Unable to find a valid carbon.txt file at the domain google.com'
#  ]
# }
```

If you want to get the full logs from the carbon.txt validator, you can change set `verbose: true` in the options.

{% set successCodeBlock %}
```json
{
  "success": true,
  "url": "https://example.com/carbon.txt",
  "data": {
    "version": "0.5",
    "last_updated": null,
    "upstream": null,
    "org": {
      "disclosures": [
        {
          "doc_type": "web-page",
          "url": "https://example.com",
          "domain": null,
          "valid_until": null,
          "title": null
        }
      ]
    }
  },
  "logs": [
    "Attempting to validate contents of version='0.5'\n[org]\ndisclosures=[{ doc_t",
    "Carbon.txt file parsed as valid TOML.",
    "Parsed TOML was recognised as valid Carbon.txt file with syntax version 0.5.\n",
    "ai-model-card_greenweb: Processing supporting document: https://example.com for None",
    "carbon_txt.process_ai_model_card: Document type web-page seen. Doing nothing",
    "csrd_greenweb: Processing supporting document: https://example.com for None",
    "carbon_txt.process_csrd_document: Document type web-page seen. Doing nothing",
    "ai-model-card_greenweb: Processing supporting document: https://example.com for None",
    "carbon_txt.process_ai_model_card: Document type web-page seen. Doing nothing",
    "csrd_greenweb: Processing supporting document: https://example.com for None",
    "carbon_txt.process_csrd_document: Document type web-page seen. Doing nothing"
  ],
  "document_data": {}
}
```


The object has the following fields:
 - The `success` field returns `true`, indicating a carbon.txt file was found and succesfully parsed.
 - A `url` field will be returned with the canonical url of the file found.
 - The contents of the carbon.txt file, serialized as JSON, inside the `data` field.
 - An array of `logs` which detail the carbon.txt lookup and validation process carried out, for debugging purposes.
 - A `document_data` object, containing any data parsed from linked documents by installed [carbon.txt plugins](https://carbon-txt-validator.readthedocs.io/en/latest/plugins.html). Currently the API provides plugins to parse [CSRD reports](https://finance.ec.europa.eu/financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en) and [AI model cards](https://huggingface.co/docs/hub/model-cards).
 - If you requested a domain which delegates its carbon.txt file to another domain using a DNS TXT record or HTTP header, the `delegation_method` field will indicate the delegation method followed.
{% endset %}

{% include 'partials/carbon-txt-results.njk' %}
