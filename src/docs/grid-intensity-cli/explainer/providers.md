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

## Listing providers

{% include 'snippets/grid-cli/list-providers.md' %}

## Changing providers

When running the Grid Intensity CLI, you can change providers by passing the `--provider` flag, along with the name of the provider you want to use. Alternately, you can set `GRID_INTENSITY_PROVIDER` as an environment variable.

When no provider is set, the CLI will use Ember as the default.

<aside class="alert  alert-warning"><div>
<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
	<p>Please note that some providers require user account and/or API tokens to be set as well.</p>
</div></aside>

## Ember <span class="badge align-middle badge-secondary badge-lg">Default</span>

Ember is an energy think tank that uses data-driven insights to shift the world from coal to clean electricity.

`--provider Ember`

Ember is the default provider for the Grid Intensity CLI. The Ember integration returns regional data by country, for the last calendar year.

### Required parameters

When using Ember, you will need to pass either an [Alpha-2 or Alpha-3 ISO country code](https://www.iso.org/obp/ui/#search). You can do this using the `--location` flag.

For example, the code below returns data for Taiwan.

```bash
grid-intensity --provider Ember --location TW

# Returns

[
        {
                "emissions_type": "average",
                "metric_type": "absolute",
                "provider": "Ember",
                "location": "TW",
                "units": "gCO2e per kWh",
                "valid_from": "2021-01-01T00:00:00Z",
                "valid_to": "2021-12-31T23:59:00Z",
                "value": 565.629
        }
]
```

***

## WattTime <div class="badge badge-warning gap-2 align-middle">Registration required</div>

WattTime is a nonprofit that offers technology solutions that make it easy for anyone to achieve emissions reductions without compromising cost, comfort, and function.

`--provider WattTime`

{% include 'snippets/grid-cli/watttime-registration.md' %}

### Required parameters

When using WattTime, you will need to pass a location that is supported by the WattTime API. WattTime's API documentation details how you can [get a list of locations](https://www.watttime.org/api-documentation/#list-of-grid-regions), or [use latitude & longitude](https://www.watttime.org/api-documentation/#determine-grid-region) to find a specific location.

For example, running the command below returns an array data for California Independent System Operator (North). 

```bash
grid-intensity --provider WattTime --location CAISO_NORTH

# Returns

[
        {
                "emissions_type": "marginal",
                "metric_type": "relative",
                "provider": "WattTime",
                "location": "CAISO_NORTH",
                "units": "percent",
                "valid_from": "2022-08-19T07:40:00Z",
                "valid_to": "2022-08-19T07:45:00Z",
                "value": 32
        },
        {
                "emissions_type": "marginal",
                "metric_type": "absolute",
                "provider": "WattTime",
                "location": "CAISO_NORTH",
                "units": "lbCO2e per MWh",
                "valid_from": "2022-08-19T07:40:00Z",
                "valid_to": "2022-08-19T07:45:00Z",
                "value": 918
        }
]
```

### Limitations

Each location will return a `percent` field. This value represents the relative real-time marginal emissions intensity for the _past month_.

If you require absolute Marginal Operating Emissions Rate (MOER) data, this is available for free when querying the `CAISO_NORTH` location as shown above. However, you will require a [_WattTime Pro subscription_](https://www.watttime.org/get-the-data/data-plans/) to obtain this data for other locations.


***

## Electricity Maps <div class="badge badge-warning gap-2 align-middle">API token required</div>

The Electricity Map API provides worldwide access to 24/7 grid carbon intensity historically, in real time, and as a forecast for the next 24 hours.

`--provider ElectricityMap`

### Registration

Before using the Electricity Maps integration, you must first [obtain an API key](https://api-portal.electricitymaps.com/). This will allow you to access and use their API. You can use their free tier for non-commercial use. You can also register for a 30 day trial of their paid API which includes their forecast data.

Once you have an Electricity Map API key, you must set the `ELECTRICITY_MAP_API_TOKEN` and `ELECTRICITY_MAP_API_URL` environment variables. This allows the Grid Intensity CLI to access the Electricity Map API.

```bash
export ELECTRICITY_MAP_API_TOKEN=your-token
export ELECTRICITY_MAP_API_URL=https://api-access.electricitymaps.com/free-tier/
```

### Required parameters

When using Electricity Maps, you will need to pass a supported location. You can get a [list of all supported locations](https://static.electricitymap.org/api/docs/index.html#zones) using the Electricity Map API.

For example, running the command below will return data for Portugal.

```bash
grid-intensity --provider ElectricityMap --location PT

# Returns

[
	{
		"emissions_type": "average",
		"metric_type": "absolute",
		"provider": "ElectricityMap",
		"location": "PT",
		"units": "gCO2e per kWh",
		"valid_from": "2023-07-14T10:00:00Z",
		"valid_to": "2023-07-14T11:00:00Z",
		"value": 155
	}
]
```

***

## UK Carbon Intensity API

National Grid ESO have developed a Regional Carbon Intensity forecast for the Great Britain electricity grid.

`--provider CarbonIntensityOrgUK`

### Required parameters

The UK Carbon Intensity API integration supports only one area, `--location=UK`. This can be passed to the CLI as an optional parameter.

For example, the code below returns data for the UK.

```bash
grid-intensity --provider CarbonIntensityOrgUK  --location UK

# Returns

[
        {
                "emissions_type": "average",
                "metric_type": "absolute",
                "provider": "CarbonIntensityOrgUK",
                "location": "UK",
                "units": "gCO2e per kWh",
                "valid_from": "2022-08-19T07:00:00Z",
                "valid_to": "2022-08-19T07:30:00Z",
                "value": 201
        }
]

```
