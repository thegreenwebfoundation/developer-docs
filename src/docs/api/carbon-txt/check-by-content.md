---
libraryName: Carbon.txt validator API
title: Check by file content
description: Use this API to validate the contents of a carbon.txt file.
hasTabs: true
eleventyNavigation:
  key: carbon-txt-api-check-by-content
  title: Check by file content
  order: 5
---

# Validating carbon.txt file content

To validate a carbon.txt file by uploading contents directly, make a `POST` request to the `/api/validate/file` endpoint, passing a JSON-encoded body with the carbon.txt file contents encoded as the `text_contents` parameter. 

{% set endpoint = 'file' %}
{% include 'partials/carbon-txt-endpoint.njk' %}

## Payload

The request should include a JSON-encoded body with the carbon.txt file contents encoded as the `text_contents` parameter.

<seven-minute-tabs>
   <ol role="tablist" aria-label="Select a programming language to preview">
    <li><a href="#js" role="tab" aria-selected="true">JavaScript</a></li>
    <li><a href="#curl" role="tab">cURL</a></li>
   </ol>

   <div id="js" role="tabpanel">
{% set code %}
fetch("https://carbon-txt-api.greenweb.org/api/validate/file", {
  method: "POST",
  headers: {
    "X-Api-Key": gwf_xxxxxxx.xxxxxxxxxxxxxxxxx,
  },
  body: JSON.stringify({ text_contents: `version="0.5"
    last_updated=2026-06-01
    
    [org]
    disclosures = [
        { doc_type="web-page", url="https://example.com" },
    ]` 
  })
})
{% endset %}

{% codeSnippet code, 'js' %}

   </div>

   <div id="curl" role="tabpanel">
{% set code %}
curl -X POST \
    -H "Content-Type: application/json" \
    -H "X-Api-Key: gwf_xxxxxxx.xxxxxxxxxxxxxxxxx" \
    --data "{\"text_contents\": \"version='0.5'\n[org]\ndisclosures=[{ doc_type='web-page', url='https://example.com'}]\"  }" \
    https://carbon-txt-api.greenweb.org/api/validate/file
{% endset %}

{% codeSnippet code, 'curl' %}

   </div>
   </seven-minute-tabs>

{% set successCodeBlock %}
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
 - The `success` field returns `true`, indicating carbon.txt content was succesfully parsed.
 - The contents of the carbon.txt file, serialized as JSON, inside the `data` field.
 - An array of `logs` which detail the carbon.txt lookup and validation process carried out, for debugging purposes.
 - A `document_data` object, containing any data parsed from linked documents by installed [carbon.txt plugins](https://carbon-txt-validator.readthedocs.io/en/latest/plugins.html). Currently the API provides plugins to parse [CSRD reports](https://finance.ec.europa.eu/financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en) and [AI model cards](https://huggingface.co/docs/hub/model-cards).
{% endset %}

{% include 'partials/carbon-txt-results.njk' %}
