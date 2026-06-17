---
libraryName: Carbon.txt API
title: Authentication
description: Use this API to lookup and validate carbon.txt files.
hasTabs: true
eleventyNavigation:
  key: carbon-txt-api-auth
  title: Authentication
  order: 2
---

# Authentication

To use the carbon.txt API, you will need to authenticate using a Green Web Foundation API key, available by logging into the [Green Web Portal](https://admin.thegreenwebfoundation.org). Register or log into an existing account, then navigate to the API keys section in the main navigation - you will be asked to provide some information on your planned use case, and to accept our privacy policy before creating your first key. You may create a maximum of 3 API keys by default.

Once you have created a key, you can use it to authenticate your requests to the carbon.txt API by passing the `X-Api-Key` header with your requests. By default, requests are rate limited to 2 per second per API key.

If you need more keys, or a raised rate limit, please <a href="mailto:support@greenweb.org?subject=API%20key%20enquiry">get in touch</a> with our support team and we'll be happy to help.

[Interactive OpenAPI documentation](https://carbon-txt-api.greenweb.org/api/docs) for the API is also available, and has full details of all request and response parameters.
