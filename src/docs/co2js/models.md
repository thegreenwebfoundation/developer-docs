---
title: Models
description: This guide will show you how use the different carbon estimation models available in CO2.js.
eleventyNavigation:
  key: models
  title: Models
  order: 3
---

# Models

There are a few different models that can be used to measure digital carbon emissions. CO2.js includes two of these - the [OneByte][soberDigital] model, and the [Sustainable Web Design][swd] model. This guide will show you how use the different carbon estimation models available in CO2.js.

This guide will not go into the details of each model. If you'd like to learn more about the OneByte or Sustainable Web Design Models then take a look at [Methodologies for calculating website carbon](/co2js/explainer/methodologies-for-calculating-website-carbon/).

## Using the Sustainable Web Design Model <span class="badge align-middle badge-secondary badge-lg">Default - v0.11.0</span>

Since v0.11.0, CO2.js uses the Sustainable Web Design Model by default. After importing CO2.js into your project, you can start using this model right away by initiating a `co2()` object. Alternately, you can pass in the `model: "swd"` option.

```js
import { co2 } from "@tgwf/co2";

const swd = new co2();
// You can also explicitly declare the model
const declaredSwd = new co2({ model: "swd" });
```

## Using the OneByte model

If you want to use the OneByte model, then you'll need to let CO2.js know. This can be done by passing in a `model` parameter with a value of `"1byte"` when you initiate a new `co2()` object.

```js
import { co2 } from "@tgwf/co2";

const oneByte = new co2({ model: "1byte" });
```

[soberDigital]: https://theshiftproject.org/en/lean-ict-2/
[swd]: https://sustainablewebdesign.org/calculating-digital-emissions
