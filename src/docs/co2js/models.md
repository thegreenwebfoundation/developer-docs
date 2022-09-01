---
title: Models
description: This guide will show you how use the different carbon estimation models available in CO2.js.
eleventyNavigation:
  key: models
  title: Models
  order: 3
---

# Models

There are a few different models that can be used to measure digital carbon emissions. CO2.js includes two of these - the [OneByte][soberDigital] model, and the [Sustainable Web Design][swd] model.  This guide will show you how use the different carbon estimation models available in CO2.js.

This guide will not go into the details of each model. If you'd like to learn more about the OneByte or Sustainable Web Design models then take a look at [Methodologies for calculating website carbon](/co2js/explainer/methodologies-for-calculating-website-carbon/).
## Using the OneByte model <span class="badge align-middle badge-secondary badge-lg">Default</span>

CO2.js uses the OneByte model by default. So once you have loaded the CO2.js library into you'll be ready to use this model.

```js
import { co2 } from '@tgwf/co2'

const oneByte = new co2({ model: "1byte" })
```

## Using the Sustainable Web Design model

If you want to use the Sustainable Web Design model, then you'll need to let CO2.js know. This can be done by passing in a `model` parameter with a value of `"swd"` when you initiate a new `co2()` object.

```js
import { co2 } from '@tgwf/co2'

const swd = new co2({ model: "swd" })
```

<aside class="alert  alert-warning">
  <div>
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <p>Note: The model parameter is <b>case sensitive</b>, meaning that using <code>{ model: "SWD" }</code> will not work. In this event, the OneByte model will be used instead.</p>
  </div>
</aside>

[soberDigital]: https://theshiftproject.org/en/lean-ict-2/
[swd]: https://sustainablewebdesign.org/calculating-digital-emissions
