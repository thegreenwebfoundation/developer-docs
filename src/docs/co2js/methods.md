---
title: Methods
description: This guide will show you how to use the different methods to calculate carbon emissions that are available in CO2.js.
eleventyNavigation:
  key: methods
  title: Methods
  order: 4
---

# Methods

CO2.js exposes two functions that developers can use to return CO2 estimates. This guide will show you how to use the different methods to calculate carbon emissions, and give a brief explanation for each.

## perByte()

The `perByte()` function can be used with both the [OneByte and Sustainable Web Design models](/co2js/models/). We recommend using this function, as it will return a CO2 value (in grams) for raw data transfer using a given model. It can be used for calculating emissions from websites, file uploads, streaming etc.

```js
import { co2 } from '@tgwf/co2'

const oneByte = new co2()

const emissions = oneByte.perByte(1000000);
```

Here we are using the OneByte model, and using the `perByte()` function to check the carbon emissions for transferring 1 million bytes.

### Accepted parameters

The `perByte()` function accepts the following parameters:

- **bytes** <div class="badge gap-2 align-middle">Required</div> <div class="badge badge-ghost gap-2 align-middle">Number</div>: The value of bytes to estimate emissions for.
- **green hosting** <div class="badge badge-ghost gap-2 align-middle">Boolean</div>: `true` if the data being measured is served from a green web host.

## perVisit <div class="badge badge-warning gap-2 align-middle">Sustainable Web Design only</div>

The `perVisit()` function can only be used with the Sustainable Web Design models. This function includes assumptions the model authors have made [about website visitors and caching](https://sustainablewebdesign.org/calculating-digital-emissions/#:~:text=Returning%20visitors%20are%20assumed%20to%20be%2025%25%2C%20loading%202%25%20of%20data.) as part its calculation. For that reason, we recommend only using it if you are comfortable with those assumptions. The `perVisit()` function is best used for calculating website carbon emissions.

```js
import { co2 } from '@tgwf/co2'

const swd = new co2()

const emissions = swd.perVisit(1000000);
```

Here we are using the Sustainable Web Design model, and using the `perVisit()` function to check the carbon emissions for transferring 1 million bytes.

### Accepted parameters

The `perVisit()` function accepts the following parameters:

- **bytes** <div class="badge gap-2 align-middle">Required</div> <div class="badge badge-ghost gap-2 align-middle">Number</div>: The value of bytes to estimate emissions for.
- **green hosting** <div class="badge badge-ghost gap-2 align-middle">Boolean</div>: `true` if the data being measured is served from a green web host.