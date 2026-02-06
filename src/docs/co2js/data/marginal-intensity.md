---
title: Data - Marginal intensity
description: This guide will show you how find and use country-level grid intensity data available in CO2.js.
eleventyNavigation:
  key: data-marginal-intensity
  title: Marginal intensity
  sectionTitle: Data
  order: 6.3
---

# Data - Marginal intensity

You can import annual, country-level marginal grid intensity data from the [UNFCCC](https://unfccc.int/) (United Nations Framework Convention on Climate Change) into your projects directly from CO2.js. For example, if you wanted to use the marginal grid intensity for Australia in a project, then you can do so by using the code below:

```js
import { marginalIntensity } from '@tgwf/co2/data';
const { data, type, year } = marginalIntensity;

const { AUS } = data;
console.log({ AUS })
```

All countries are represented by their respective [Alpha-3 ISO country code](https://www.iso.org/obp/ui/#search).

### Using CO2.js v0.16 and older

If you are using CO2.js v0.16 or older in your code, then you should import data using the code sample below:

```js
// Import data from CO2.js
import { marginalIntensity } from "@tgwf/co2"
```

## Licenses

The marginal intensity data is published by the Green Web Foundation, under the Creative Commons ShareAlike Attribution Licence ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)). ([What does this mean?](https://www.tldrlegal.com/license/creative-commons-attribution-share-alike-cc-sa))
