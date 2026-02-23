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

You can import annual, country-level average grid intensity data from [Electricity Maps](https://www.electricitymaps.com) into your projects directly from CO2.js. For example, if you wanted to use the average grid intensity for **Australia for all available years** in a project, then you can do so by using the code below:

```js
import { yearly2025, yearly2024, yearly2023, yearly2022, yearly2021 } from '@tgwf/co2/data/electricity-maps';

const data2025 = yearly2025.data["AU"]
const data2024 = yearly2024.data["AU"]
const data2023 = yearly2023.data["AU"]
const data2022 = yearly2022.data["AU"]
const data2021 = yearly2021.data["AU"]

console.log({ data2025, data2024, data2023, data2022, data2021 })
```

Electricity Maps also provides information for some grid regions (for example CAISO in the United States, or Northern India). To access these regions, developers should use the appropriate zone ID for the region they wish to access.

Data is available for:

- All Electricity Maps zones (see the [full list of available zones](https://github.com/thegreenwebfoundation/co2.js/blob/main/data/fixtures/electricity-maps-zones.js))
- The calendar years 2021, 2022, 2023, 2024, and 2025

## Returns

For any given Electricity Maps zone, the following data is returned:

- `zone` - An `object` that details information about the zone. This object will include:
  - `zoneName` - A `string` with the full zone name.
  - `countryName` - <span class="badge align-middle badge-success my-0">Optional</span> When the zone represents a region within a country, the country name is also included.
- `carbonIntensity` - An `object` returning the carbon intensity for the zone. This object will include:
  - `value` - A `number` representing the carbon intensity for the zone.
  - `unit` - A `string` representing the unit of measurement for the carbon intensity value.
- `renewableEnergy` - An `object` returning the portion of renewable energy used by the zone. This object will include:
  - `value` - A `number` representing the renewanable energy usage of the zone.
  - `unit` - A `string` representing the unit of measurement for the renewable energy value.
- `carbonFreeEnergy` - An `object` returning the portion of carbon free energy used by the zone. This object will include:
  - `value` - A `number` representing the carbon free energy usage of the zone.
  - `unit` - A `string` representing the unit of measurement for the carbon free energy value.

### Accessing other Electricity Maps data

While we are able to provide annual grid data from Electricity Maps in CO2.js, users wishing to utilise data at higher-than-yearly resolution (e.g monthly, hourly etc.), or [other historical and forecasted datapoints](https://www.electricitymaps.com/data) should contact Electricity Maps to access this data via their paid API. To do so, visit the Electricity Maps website for [pricing and details](https://www.electricitymaps.com/pricing).


## Licenses

The annual grid intensity data is republished from Electricity Maps under the [Open Database License (ODbL)](https://opendatacommons.org/licenses/odbl/summary/). Users of this data through CO2.js must:

- Attribute: Credit Electricity Maps as the source
- Share-Alike: Keep derivative works under the same license
- Keep open: Provide unrestricted versions if using DRM

For full details on Electricity Maps methodology see: [https://www.electricitymaps.com/data/methodology](https://www.electricitymaps.com/data/methodology)
For full detail on the ODbL see: [https://opendatacommons.org/licenses/odbl/summary/](https://opendatacommons.org/licenses/odbl/summary/)
