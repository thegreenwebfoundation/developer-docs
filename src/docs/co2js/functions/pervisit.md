---
title: Functions - perVisit
description: This guide will show you how to use the perVisit function to calculate carbon emissions that are available in CO2.js.
eleventyNavigation:
  key: functions-pervisit
  title: perVisit
  sectionTitle: Functions
  order: 5.3
---

# Functions - perVisit <div class="badge badge-warning gap-2 align-middle">Sustainable Web Design Model only</div>

The `perVisit()` function can only be used with the Sustainable Web Design Models. This function includes assumptions the model authors have made [about website visitors and caching](https://sustainablewebdesign.org/calculating-digital-emissions/#:~:text=Returning%20visitors%20are%20assumed%20to%20be%2025%25%2C%20loading%202%25%20of%20data.) as part its calculation. For that reason, we recommend only using it if you are comfortable with those assumptions. The `perVisit()` function is best used for calculating website carbon emissions.

<aside class="alert alert-info">
<p>If you need to change any of the values used in the calculation, we recommend you use the <a class="text-inherit" href="#pervisittrace-sustainable-web-design-only">perVisitTrace function.</a> </p></aside>

```js
import { co2 } from "@tgwf/co2";

const swd = new co2({ model: "swd" });

const emissions = swd.perVisit(1000000);
```

Here we are using the Sustainable Web Design Model, and using the `perVisit()` function to check the carbon emissions for transferring 1 million bytes.

### Accepted parameters

The `perVisit()` function accepts the following parameters:

- **bytes** `number` <div class="badge gap-2 align-middle my-0">Required</div>: The value of bytes to estimate emissions for.
- **green hosting** `boolean` <span class="badge align-middle badge-success my-0">Optional</span>: if the data being measured is served from a green web host.

## Result

The `perVisit()` function returns a floating point decimal value which is the amount of CO2e (in grams) calculated using the function.
