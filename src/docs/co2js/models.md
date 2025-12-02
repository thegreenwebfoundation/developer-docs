---
title: Models
description: This guide will show you how use the different carbon estimation models available in CO2.js.
eleventyNavigation:
  key: models
  title: Models
  order: 3
---

# Models

There are a few different models that can be used to measure digital carbon emissions. CO2.js includes two of these - the [OneByte][soberDigital] model, and the [Sustainable Web Design Model][swd]. This guide will show you how use the different carbon estimation models available in CO2.js.

This guide will not go into the details of each model. If you'd like to learn more about the OneByte or Sustainable Web Design Models then take a look at [Methodologies for calculating website carbon](/co2js/explainer/methodologies-for-calculating-website-carbon/).

## Using the Sustainable Web Design Model <span class="badge align-middle badge-secondary badge-lg">Default - v0.11.0</span>

Since v0.11.0, CO2.js uses the Sustainable Web Design Model by default. After importing CO2.js into your project, you can start using this model right away by initiating a `co2()` object. Alternately, you can pass in the `model: "swd"` option. This will use [version 3 of the Sustainable Web Design Model](https://sustainablewebdesign.org/estimating-digital-emissions-version-3) by default.

```js
import { co2 } from "@tgwf/co2";

const swd = new co2();
// You can also explicitly declare the model
const declaredSwd = new co2({ model: "swd" });
```
### Using Sustainable Web Design Model version 3

You can explicitly set the Sustainable Web Design Model version 3  when initiating the a new instance of the `co2()` object.

```js
import { co2 } from "@tgwf/co2";

const swdmV3 = new co2({ model: "swd", version: 3 });
```

### Using Sustainable Web Design Model version 4 <span class="badge align-middle badge-secondary badge-lg">Since v0.16.0</span>

In May 2024, version 4 of the Sustainable Web Design Model was published for initial community feedback. The update includes a change to the estimation formula, introduces separation between operational and embodied emissions, and updates the underlying data that forms the foundation of the model. We have covered the changes made in [this helpful blog post](https://www.thegreenwebfoundation.org/news/understanding-the-latest-sustainable-web-design-model-update/).

CO2.js v0.16 sees the inclusion of Sustainable Web Design Model version 4 as one of the models that can be used in CO2.js. Developers will be required to explicitly opt-in to using Sustainable Web Design Model version 4, but will have access to all the same functions that can be accessed in version 3. Switching to version 4 should create minimal disruption for most developers, with only the returned values when using `perByteTrace` and `perVisitTrace` functions changing.

The code sample below shows how to use SWDM version 4 in CO2.js to estimate 1000 bytes using the `perByte` function. Note that the version number has been explicitly declared (`version: 4`) when initiating a new `co2()` instance.

```js
import { co2 } from "@tgwf/co2";

const swdmV4 = new co2({ model: "swd", version: 4 });
const bytes = 1000;

const estimate = swdmV4.perByte(1000);
```

Learn more about the [different methods available when using the Sustainable Web Design Model](/co2js/methods/), including how to adjust variables used within the model.

## Using the OneByte model

If you want to use the OneByte model, then you'll need to let CO2.js know. This can be done by passing in a `model` parameter with a value of `"1byte"` when you initiate a new `co2()` object.

```js
import { co2 } from "@tgwf/co2";

const oneByte = new co2({ model: "1byte" });
```

[soberDigital]: https://theshiftproject.org/en/lean-ict-2/
[swd]: https://sustainablewebdesign.org/estimating-digital-emissions
