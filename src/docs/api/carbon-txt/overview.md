---
tags: apiMain
libraryName: Carbon.txt validation API
title: Overview
description: Use this API to lookup and validate carbon.txt files.
hasTabs: true
eleventyNavigation:
  key: carbon-txt-api-overview
  title: Overview
  order: 1
---

# Carbon.txt validation API

The carbon.txt validation API allows you to validate the syntax and content of carbon.txt files, and to look up the carbon.txt file for a given domain.

# Authentication

To use the carbon.txt validation API, you will need to authenticate using a Green Web Foundation API key, available by logging into the [Green Web Portal](https://admin.thegreenwebfoundation.org). Register or log into an existing account, then navigate to the API keys section in the main navigation - ou will be asked to provide some information on your planned use case, and to accept our privacy policy before creating your first key. You may create up to a maximum of 3 API keys by default.

Once you have created a key, you can use it to authenticate your requests to the carbon.txt validation API by passing the `X-Api-Key` header with your requests. By default, requests are rate limited to 2 per second per API key.

If you need more keys, or a raised rate limit, please <a href="mailto:support@greenweb.org?subject=API%20key%20enquiry">get in touch</a> with our support team and we'll be happy to help.


[Interactive OpenAPI documentation](https://carbon-txt-api.greenweb.org/api/docs) for the API is also available, and has full details of all request and response parameters.

# Usage

The carbon.txt validation API allows carbon.txt files to be validated by direct upload, provided at a specific URL, or a fully qualified domain name.

All carbon.txt validation endpoints are available from the [carbon-txt-api.greenweb.org](https://carbon-txt-api.greenweb.org) domain.

## Validating a carbon.txt file by direct upload

To validate a carbon.txt file by uploading contents directly, make a POST request to the `/api/validate/file` endpoint, passing a JSON-encoded body with the carbon.txt file contents encoded as the `text_contents` parameter. An example with CURL:


```bash
curl -X POST \
    -H "Content-Type: application/json" \
    -H "X-Api-Key: gwf_xxxxxxx.xxxxxxxxxxxxxxxxx" \
    --data "{\"text_contents\": \"version='0.5'\n[org]\ndisclosures=[{ doc_type='web-page', url='https://example.com'}]\"  }" \
    https://carbon-txt-api.greenweb.org/api/validate/file
```

## Validating a carbon.txt file by url

To validate a carbon.txt file already available at a public URL, make a POST request to the `/api/validate/url` endpoint, passing a JSON-encoded body with the carbon.txt file url passed as the `url` parameter. An example with CURL:


```bash
curl -X POST \
    -H "Content-Type: application/json" \
    -H "X-Api-Key: gwf_xxxxxxx.xxxxxxxxxxxxxxxxx" \
    --data "{\"url\": \"https://thegreenwebfoundation.org/carbon.txt\"  }" \
    https://carbon-txt-api.greenweb.org/api/validate/url
```

## Looking up the carbon.txt file for a domain

To look up and validate the carbon.txt file for a given domain, make a POST request to the `/api/validate/domain` endpoint, passing a JSON-encoded body with the fully-qualified domain name passed as the `domain` parameter.


This method will search for a carbon.txt at both the paths `/carbon.txt` and `/.well-known/carbon.txt`, and will follow any [delegation rules](https://carbontxt.org/faq) set up in DNS TXT records or HTTP headers on the queried domain.

An example with CURL:


```bash
curl -X POST \
    -H "Content-Type: application/json" \
    -H "X-Api-Key: gwf_xxxxxxx.xxxxxxxxxxxxxxxxx" \
    --data "{\"domain\": \"developers.thegreenwebfoundation.org\"  }" \
    https://carbon-txt-api.greenweb.org/api/validate/domain
```

## Understanding the validator response.

All three methods of validating a carbon.txt file return a response in the same format - a JSON object such as the following:

```json
{
  "success": true,
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
 - The `success` field returns a boolean indicating whether or not a carbon.txt file was succesfully found and parsed.
 - The contents of the carbon txt file, serialized as JSON, inside the `data` field, if the validation was succesful.
  - An array of `logs` which detail the carbon.txt lookup and validation process carried out, for debugging purposes.
  - A `document_data` object, containing any data parsed from linked documents by installed [carbon.txt plugins](https://carbon-txt-validator.readthedocs.io/en/latest/plugins.html). Currently the API provides plugins to parse [CSRD reports](https://finance.ec.europa.eu/financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en) and [AI model cards](https://huggingface.co/docs/hub/model-cards).
  - If you validated a url or domain, a `url` field will be returned with the canonical url of the file found.
  - If you requested a domain which delegates its carbon.txt file to another domain using a DNS TXT record or HTTP header, the `delegation_method` field will indicate the delegation method followed.

