---
libraryName: Carbon.txt validator API
title: Check by website domain
description: Use this API to validate the contents of a carbon.txt file hosted at a website domain.
hasTabs: true
eleventyNavigation:
  key: carbon-txt-api-check-by-domain
  title: Check by website domain
  order: 4
---

# Validating carbon.txt URL

To validate a carbon.txt file by hosted at a public domain, make a `POST` request to the `/api/validate/domain` endpoint, passing a JSON-encoded body with the carbon.txt file contents encoded as the `domain` parameter. 

{% set endpoint = 'domain' %}
{% include 'partials/carbon-txt-endpoint.njk' %}

## Payload

The request should include a JSON-encoded body with the carbon.txt file contents encoded as the `domain` parameter.

<seven-minute-tabs>
   <ol role="tablist" aria-label="Select a programming language to preview">
    <li><a href="#js" role="tab" aria-selected="true">JavaScript</a></li>
    <li><a href="#curl" role="tab">cURL</a></li>
   </ol>

   <div id="js" role="tabpanel">
{% set code %}
fetch("https://carbon-txt-api.greenweb.org/api/validate/domain", {
  method: "POST",
  headers: {
    "X-Api-Key": gwf_xxxxxxx.xxxxxxxxxxxxxxxxx,
  },
  body: JSON.stringify({ domain: "example.com" })
})
{% endset %}

{% codeSnippet code, 'js' %}

   </div>

   <div id="curl" role="tabpanel">
{% set code %}
curl -X POST \
    -H "Content-Type: application/json" \
    -H "X-Api-Key: gwf_xxxxxxx.xxxxxxxxxxxxxxxxx" \
    --data "{\"domain\": \"example.com/\"  }" \
    https://carbon-txt-api.greenweb.org/api/validate/domain
{% endset %}

{% codeSnippet code, 'curl' %}

   </div>
   </seven-minute-tabs>
   
<div class="alert alert-info my-3">
  <div class="items-start">
    <div>
      <h2 class="font-bold my-3 gap-2 flex items-center">Important</h2>
      <p class="text-lg">Please note that the carbon.txt validator does not follow redirects. It will return a failure result if it encounters a redirect, and will flag this error in the logs.</p>
    </div>
  </div>
</div>


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
