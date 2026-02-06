---
title: Data - Electricity Maps
description: This guide will show you how find and use country-level grid intensity data available in CO2.js.
eleventyNavigation:
  key: data-electricity-maps
  title: Electricity Maps
  sectionTitle: Data
  order: 6.1
---

# Data - Electricity Maps

You can import annual, country-level average grid intensity data from [Electricity Maps](https://www.electricitymaps.com) into your projects directly from CO2.js. For example, if you wanted to use the average grid intensity for Australia for the year 2025 in a project, then you can do so by using the code below:

```js
import { yearly2025 } from '@tgwf/co2/data/electricity-maps';
const { data, methodology } = averageIntensity;

const { AU } = data;
console.log({ AU })
```

Data is available for:

- All Electricity Maps zones (see the [full list of available zones](https://github.com/thegreenwebfoundation/co2.js/blob/main/data/fixtures/electricity-maps-zones.js))
- The calendar years 2021, 2022, 2023, 2024, and 2025


## Licenses

The annual grid intensity data is republished from Electricity Maps under the [Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/summary/). Users of this data through CO2.js must:

- Attribute: Credit Electricity Maps as the source
- Share-Alike: Keep derivative works under the same license
- Keep open: Provide unrestricted versions if using DRM

For full details on Electricity Maps methodology see: https://www.electricitymaps.com/data/methodology
For full detail on the ODbL see: https://opendatacommons.org/licenses/odbl/summary/

Data at higher-than-yearly resolution (e.g monthly, hourly etc.), or [other historical and forecasted datapoints](https://www.electricitymaps.com/data) are available through Electricity Maps as a paid service. Users requiring this data should visit the Electricity Maps website for [pricing and details](https://www.electricitymaps.com/pricing).
