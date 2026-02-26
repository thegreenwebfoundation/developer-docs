---
title: Functions - perByte
description: This guide will show you how to use the perByte function to calculate carbon emissions that are available in CO2.js.
eleventyNavigation:
  key: functions-perbyte
  title: perByte
  sectionTitle: Functions
  order: 5.1
---

# Functions - perByte()

The `perByte()` function can be used with both the [OneByte and Sustainable Web Design Models](/co2js/models/). We recommend using this function, as it will return a CO2 value (in grams) for raw data transfer using a given model. It can be used for calculating emissions from websites, file uploads, streaming etc.

<aside class="alert alert-info">
<p>If you are using the Sustainable Web Design Model and need to change any of the values used in the calculation, we recommend you use the <a class="text-inherit" href="#perbytetrace-sustainable-web-design-only">perByteTrace function.</a> </p></aside>

```js
import { co2 } from "@tgwf/co2";

const oneByte = new co2({ model: "1byte" });

const emissions = oneByte.perByte(1000000);
```

Here we are using the OneByte model, and using the `perByte()` function to check the carbon emissions for transferring 1 million bytes.

## Accepted parameters

The `perByte()` function accepts the following parameters:

- **bytes** `number` <div class="badge gap-2 align-middle my-0">Required</div>: The value of bytes to estimate emissions for.
- **green hosting** `boolean` <span class="badge align-middle badge-success my-0">Optional</span>: if the data being measured is served from a green web host.

## Result

The `perByte()` function returns a floating point decimal value which is the amount of CO2e (in grams) calculated using the function.
