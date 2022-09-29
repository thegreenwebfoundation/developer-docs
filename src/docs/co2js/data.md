---
title: Data
description: This guide will show you how find and use country-level grid intensity data available in CO2.js.
eleventyNavigation:
  key: data
  title: Data
  order: 4
---

# Data

Sourcing carbon intensity data shouldn’t be the remit of developers. For that reason, CO2.js now includes yearly average grid intensity data from [Ember](https://ember-climate.org/data/data-explorer/), as well as marginal intensity data from the [UNFCCC](https://unfccc.int/) (United Nations Framework Convention on Climate Change).

## Average and mariginal intensity explained

Average emissions intensity uses the fuel mix of the entire electricity grid and can be used to derive estimates for the carbon footprint of a digital product or service. You’ll see average intensity used in the majority of carbon reporting standards and tooling. This makes it useful if you were to use CO2.js to feed in data to other carbon reporting tools.

Marginal intensity, on the other hand, looks at where the additional electricity to power a device, product or service would come from. In almost all cases it would be from a fossil-fuel power source, and so marginal intensity figures tend to be higher than average intensity figures. The Green Software Foundation is one group that uses marginal intensity as part of its specification.

## Where to find the data

The raw data files (in CSV) format, can be found in the `data` folder in the [CO2.js repository](https://github.com/thegreenwebfoundation/co2.js/tree/main/data). We have written a generation script that parses the raw data files, and outputs grid intensity data in unminified JSON and CommonJS formats. The generated output can be found in the `data/output` folder of the CO2.js repository.

## Using emissions intensity data

You can also import annual, country-level marginal or average grid intensity data into your projects directly from CO2.js. For example, if you wanted to use the average grid intensity for Australia in a project, then you can do so by using the code below:

```js
import { averageIntensity } from '@tgwf/co2';
const { data, type, source, year } = averageIntensity;

const { AUS } = data;
console.log({ AUS })
```

Likewise, if you want to use annual marginal intensity for Australia:

```js
import { marginalIntensity } from '@tgwf/co2';
const { data, type, source, year } = marginalIntensity;

const { AUS } = data;
console.log({ AUS })
```

All countries are represented by their respective [Alpha-3 ISO country code](https://www.iso.org/obp/ui/#search).
