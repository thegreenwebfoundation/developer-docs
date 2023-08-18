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

<aside class="alert alert-info">
<p>If you are using the Sustainable Web Design model and need to change any of the values used in the calculation, we recommend you use the <a class="text-inherit" href="#perbytetrace-sustainable-web-design-only">perByteTrace function.</a> </p></aside>

```js
import { co2 } from "@tgwf/co2";

const oneByte = new co2({ model: "1byte" });

const emissions = oneByte.perByte(1000000);
```

Here we are using the OneByte model, and using the `perByte()` function to check the carbon emissions for transferring 1 million bytes.

### Accepted parameters

The `perByte()` function accepts the following parameters:

- **bytes** `number` <div class="badge gap-2 align-middle my-0">Required</div>: The value of bytes to estimate emissions for.
- **green hosting** `boolean` <span class="badge align-middle badge-success my-0">Optional</span>: if the data being measured is served from a green web host.

### Result

The `perByte()` function returns a floating point decimal value which is the amount of CO2e (in grams) calculated using the function.

## perByteTrace <div class="badge badge-warning gap-2 align-middle">Sustainable Web Design only</div>

The `perByteTrace()` function is an extension of `perByte()` which allows for certain inputs to be adjusted. This allows for more accurate, scenario specific estimates to be produced using the Sustainable Web Design model.

<aside class="alert alert-info">
<p>This function returns a result which includes details of all the variables that were used in the calculation. Since this function allows developers to deviate from the standard Sustainable Web Design model, we strongly recommend that it is made clear to the end user what values have changed as part of the calculation.</p></aside>

### Accepted parameters

The `perByteTrace()` function accepts the following parameters:

- **bytes** `number` <div class="badge gap-2 align-middle my-0">Required</div>: The value of bytes to estimate emissions for.
- **green hosting** `boolean` <span class="badge align-middle badge-success my-0">Optional</span>: if the data being measured is served from a green web host.
- **options**: `object` <span class="badge align-middle badge-success my-0">Optional</span> - A JavaScript object containing any Sustainable Web Design specific variables to be change.

#### The `options` parameter

The `options` parameter can contain any of the following keys. These can be used to adjust the values used by the Sustainable Web Design model's calculation.

- `gridIntensity` <span class="badge align-middle badge-success my-0">Optional</span> – an `object` that can contain the following keys:
  - `device` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.
  - `dataCenter` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.
  - `networks` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.

Below is an example which shows both kinds of accepted inputs in use.

```js
const options = {
  gridIntensity: {
    device: 565.629, // Here we have set the grid intensity at the device location using a number.
    dataCenter: { country: "TWN" }, // Here we have set the data center grid intensity using a country code.
    networks: 442,
  },
};
```

### Result

The `perByteTrace()` function returns an object with the following keys:

- `co2` - A `number` representing the carbon emissions calculated in grams
- `green` - A `boolean` indicating whether the calculation was based on data being hosted in a green data center
- `variables` - An `object`` that details all the other variables used in the calculation. This object will include:
  - `description` - A static `string` explaining what is being shown.
  - `bytes` - A `number` showing the bytes that were passed into the function.
  - `gridIntensity` – an `object` that can contain the following keys:
    - `device` – A `number` representing the carbon intensity (in grams per kilowatt-hour) used in the calculation.
    - `dataCenter` – A `number` representing the carbon intensity (in grams per kilowatt-hour) used in the calculation.
    - `networks` – A `number` representing the carbon intensity (in grams per kilowatt-hour) used in the calculation.

## perVisit <div class="badge badge-warning gap-2 align-middle">Sustainable Web Design only</div>

The `perVisit()` function can only be used with the Sustainable Web Design models. This function includes assumptions the model authors have made [about website visitors and caching](https://sustainablewebdesign.org/calculating-digital-emissions/#:~:text=Returning%20visitors%20are%20assumed%20to%20be%2025%25%2C%20loading%202%25%20of%20data.) as part its calculation. For that reason, we recommend only using it if you are comfortable with those assumptions. The `perVisit()` function is best used for calculating website carbon emissions.

<aside class="alert alert-info">
<p>If you need to change any of the values used in the calculation, we recommend you use the <a class="text-inherit" href="#pervisittrace-sustainable-web-design-only">perVisitTrace function.</a> </p></aside>

```js
import { co2 } from "@tgwf/co2";

const swd = new co2({ model: "swd" });

const emissions = swd.perVisit(1000000);
```

Here we are using the Sustainable Web Design model, and using the `perVisit()` function to check the carbon emissions for transferring 1 million bytes.

### Accepted parameters

The `perVisit()` function accepts the following parameters:

- **bytes** `number` <div class="badge gap-2 align-middle my-0">Required</div>: The value of bytes to estimate emissions for.
- **green hosting** `boolean` <span class="badge align-middle badge-success my-0">Optional</span>: if the data being measured is served from a green web host.

## perVisitTrace <div class="badge badge-warning gap-2 align-middle">Sustainable Web Design only</div>

The `perVisitTrace()` function is an extension of `perVisit()` which allows for certain inputs to be adjusted. This allows for more accurate, scenario specific estimates to be produced using the Sustainable Web Design model.

<aside class="alert alert-info">
<p>This function returns a result which includes details of all the variables that were used in the calculation. Since this function allows developers to deviate from the standard Sustainable Web Design model, we strongly recommend that it is made clear to the end user what values have changed as part of the calculation.</p></aside>

### Accepted parameters

The `perVisitTrace()` function accepts the following parameters:

- **bytes** `number` <div class="badge gap-2 align-middle my-0">Required</div>: The value of bytes to estimate emissions for.
- **green hosting** `boolean` <span class="badge align-middle badge-success my-0">Optional</span>: if the data being measured is served from a green web host.
- **options**: `object` <span class="badge align-middle badge-success my-0">Optional</span> - A JavaScript object containing any Sustainable Web Design specific variables to be change.

#### The `options` parameter

The `options` parameter can contain any of the following keys. These can be used to adjust the values used by the Sustainable Web Design model's calculation.

- `dataReloadRatio` <span class="badge align-middle badge-success my-0">Optional</span> – a `number` between 0 and 1 representing the percentage of data that is downloaded by return visitors.
- `firstVisitPercentage` <span class="badge align-middle badge-success my-0">Optional</span> – a `number` between 0 and 1 representing the percentage of new visitors.
- `returnVisitPercentage` <span class="badge align-middle badge-success my-0">Optional</span> – a `number` between 0 and 1 representing the percentage of returning visitors.
- `gridIntensity` <span class="badge align-middle badge-success my-0">Optional</span> – an `object` that can contain the following keys:
  - `device` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.
  - `dataCenter` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.
  - `networks` <span class="badge align-middle badge-success my-0">Optional</span> – A `number` representing the carbon intensity for the given segment (in grams per kilowatt-hour). Or, an `object`, which contains a key of country and a value that is an Alpha-3 ISO country code.

Below is an example which shows both kinds of accepted inputs in use.

```js
const options = {
  dataReloadRatio: 0.6,
  firstVisitPercentage: 0.9,
  returnVisitPercentage: 0.1,
  gridIntensity: {
    device: 565.629, // Here we have set the grid intensity at the device location using a number.
    dataCenter: { country: "TWN" }, // Here we have set the data center grid intensity using a country code.
    networks: 442,
  },
};
```

### Result

The `perByteTrace()` function returns an object with the following keys:

- `co2` - A `number` representing the carbon emissions calculated in grams
- `green` - A `boolean` indicating whether the calculation was based on data being hosted in a green data center
- `variables` - An `object`` that details all the other variables used in the calculation. This object will include:
  - `description` - A static `string` explaining what is being shown.
  - `bytes` - A `number` showing the bytes that were passed into the function.
  - `gridIntensity` – an `object` that can contain the following keys:
    - `device` – A `number` representing the carbon intensity for this segment (in grams per kilowatt-hour) used in the calculation.
    - `dataCenter` – A `number` representing the carbon intensity for this segment (in grams per kilowatt-hour) used in the calculation.
    - `networks` – A `number` representing the carbon intensity for this segment (in grams per kilowatt-hour) used in the calculation.
    - `production` - A `number` representing the carbon intensity for this segment (in grams per kilowatt-hour) used in the calculation.
  - `dataReloadRatio` – a `number` between 0 and 1 representing the percentage of data that is downloaded by return visitors.
  - `firstVisitPercentage` – a `number` between 0 and 1 representing the percentage of new visitors.
  - `returnVisitPercentage` – a `number` between 0 and 1 representing the percentage of returning visitors.
