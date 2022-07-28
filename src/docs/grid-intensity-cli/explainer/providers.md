---
title: Providers
description: The Grid Intensity CLI allows data to be sourced from several providers.
eleventyNavigation:
  key: providers
  # parent: overview
  title: Providers
  sectionTitle: Explanations
  order: 30
---
# {{ title }}

The Grid Intensity CLI allows data to be sourced from several providers. Currently the following integrations are available:

- [WattTime](https://www.watttime.org/)
- [Ember](https://ember-climate.org/)
- [Electricity Maps](https://electricitymaps.com/)
- [UK Carbon Intensity API](https://carbonintensity.org.uk/)

If you would like us to integrate more providers please [open an issue](https://github.com/thegreenwebfoundation/grid-intensity-go/issues).

## Changing providers

When running the Grid Intensity CLI, you can change providers by passing the `--provider` flag, along with the name of the provider you want to use. Alternately, you can set `GRID_INTENSITY_PROVIDER` as an environment variable.

When no provider is set, the CLI will use Ember as the default.

<aside class="alert  alert-warning"><div>
<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
	<p>Please note that some providers require user account and/or API tokens to be set as well.</p>
</div></aside>

## Ember <span class="badge align-middle badge-secondary badge-lg">Default</span>

Ember is an energy think tank that uses data-driven insights to shift the world from coal to clean electricity.

`--provider=ember-climate.org`

Ember is the default provider for the Grid Intensity CLI. The Ember integration returns regional data by country, for the last calendar year.

### Required parameters

When using Ember, you will need to pass either an [Alpha-2 or Alpha-3 ISO country code](https://www.iso.org/obp/ui/#search) for the region you want data for. You can do this using the `--region` flag.

For example, the code below returns data for Taiwan.

```bash
grid-intensity --provider=ember-climate.org --region=TW

# Returns

{
	"country_code_iso_2": "TW",
	"country_code_iso_3": "TWN",
	"country_or_region": "Taiwan (Province of China)",
	"year": 2021,
	"latest_year": 2021,
	"emissions_intensity_gco2_per_kwh": 565.629
}
```

***

## WattTime <div class="badge badge-warning gap-2 align-middle">Registration required</div>

WattTime is a nonprofit that offers technology solutions that make it easy for anyone to achieve emissions reductions without compromising cost, comfort, and function.

`--provider=watttime.org`

### Registration

Before using the WattTime integration, you must first create a user account with WattTime. This will allow you to access and use their API. Details on registering an account are available on the [WattTime website](https://www.watttime.org/api-documentation/#register-new-user).

Once you have created a WattTime account, you must set the `WATT_TIME_USER` and `WATT_TIME_PASSWORD` environment variables. This allows the Grid Intensity CLI to access the WattTime API.

```bash
export WATT_TIME_USER=your-username
export WATT_TIME_PASSWORD=your-password
```

### Required parameters

When using WattTime, you will need to pass a region that is supported by the WattTime API. WattTime's API documentation details how you can [get a list of regions](https://www.watttime.org/api-documentation/#list-of-grid-regions), or [use latitude & longitude](https://www.watttime.org/api-documentation/#determine-grid-region) to find a specific region.

For example, running the command below returns data for California Independent System Operator (North). 

```bash
grid-intensity --provider=watttime.org --region=CAISO_NORTH

# Returns

{
	"ba": "CAISO_NORTH",
	"freq": "300",
	"moer": "887",
	"percent": "38",
	"point_time": "2022-07-28T01:40:00Z"
}
```

### Limitations

Each region will return a `percent` field. This value represents the relative realtime marginal emissions intensity for the _past month_.

If you require Marginal Operating Emissions Rate (MOER) data, this is available for free when querying the `CAISO_NORTH` region but will require a [_WattTime Pro subscription_](https://www.watttime.org/get-the-data/data-plans/) for other regions.


***

## Electrity Map <div class="badge badge-warning gap-2 align-middle">API token required</div>

The Electricity Maps API provides worldwide access to 24/7 grid carbon intensity historically, in real time, and as a forecast for the next 24 hours.

`--provider=electricitymap.org`

### Registration

Before using the Electricy Map integration, you must first [obtain an API key](https://static.electricitymap.org/api/docs/index.html#authentication). This will allow you to access and use their API.

Once you have an Electricity Map API key, you must set the `ELECTRICITY_MAP_API_TOKEN` environment variable. This allows the Grid Intensity CLI to access the Electricity Map API.

```bash
export ELECTRICITY_MAP_API_TOKEN=your-token
```

### Required parameters

When using Electricity Map, you will need to pass a supported region. You can get a [list of all supported regions](https://static.electricitymap.org/api/docs/index.html#zones) using the Electricity Map API.

For example, running the command below will return data for Portugal.

```bash
grid-intensity --provider=electricitymap.org --region=PT

# Returns


```

***

## UK Carbon Intensity API

National Grid ESO have developed a Regional Carbon Intensity forecast for the Great Britain electricity grid.

`--provider=carbonintensity.org.uk`

### Required parameters

The UK Carbon Intensity API integration supports only one region, `--region=UK`. This can be passed to the CLI as an optional parameter.

For example, the code below returns data for the UK.

```bash
grid-intensity --provider=carbonintensity.org.uk

# Returns

{
	"from": "2022-07-28T02:00Z",
	"to": "2022-07-28T02:30Z",
	"intensity": {
		"forecast": 272,
		"actual": 0,
		"index": "high"
	}
}

```