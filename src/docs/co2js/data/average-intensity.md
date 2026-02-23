---
title: Data - Average intensity
description: This guide will show you how find and use country-level grid intensity data available in CO2.js.
eleventyNavigation:
  key: data-average-intensity
  title: Average intensity
  sectionTitle: Data
  order: 6.2
---

# Data - Average intensity

You can import annual, country-level average grid intensity data from [Ember Climate](https://ember-climate.org/data/data-explorer/) into your projects directly from CO2.js. For example, if you wanted to use the average grid intensity for Australia in a project, then you can do so by using the code below:

```js
import { averageIntensity } from '@tgwf/co2/data';
const { data } = averageIntensity;

const { AUS } = data;
console.log(AUS)
```

All countries are represented by their respective [Alpha-3 ISO country code](https://www.iso.org/obp/ui/#search).

## Returns

The code above will return a `number` representing the grid carbon intensity in grams of CO2e per kilowatt-hour.

## Using CO2.js v0.16 and older

If you are using CO2.js v0.16 or older in your code, then you should import data using the code sample below:

```js
// Import data from CO2.js
import { marginalIntensity } from "@tgwf/co2"
```

## Licenses

The carbon intensity data from Ember is published under the Creative Commons ShareAlike Attribution Licence ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)). ([What does this mean?](https://www.tldrlegal.com/license/creative-commons-attribution-share-alike-cc-sa))
