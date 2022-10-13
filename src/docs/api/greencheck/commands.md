---
title: Commands
description: This guide will show you how to run different commands using the Grid Intensity CLI.
eleventyNavigation:
  key: commands
  title: Commands
  order: 3
---

# Commands

This guide will show you how to run different commands using the Grid Intensity CLI.

## Listing providers

{% include 'snippets/grid-cli/list-providers.md' %}

### See also

For more details about the different providers available in the Grid Intensity CLI, see the [Providers](/grid-intensity-cli/explainer/providers/) section.

## Get grid intensity data

After you've [installed the CLI](/grid-intensity-cli/installation/), you can immediately start getting grid intensity data using the default Ember integration.

```bash
grid-intensity --location PT
```

The command above uses the Ember dataset - the default integration for the Grid Intensity CLI. We have used the `--location` flag to request data for Portugal (`PT`).

### See also

For more details on getting grid intensity data using the CLI, including how to switch between providers, see the [Getting grid intensity for a location](/grid-intensity-cli/tutorials/getting-grid-intensity/) tutorial.

## Exporting grid intensity data

You will use the Grid Intensity CLI `exporter` command to start a Prometheus exporter serving carbon intensity metrics.

```bash
grid-intensity exporter --location PT
```

The command above will start a Prometheus exporter that exposes grid intensity data at `localhost:8000/metrics`. In this example we use the default Ember dataset, and return data for Portugal (`PT`).

### See also

For more details on exporting grid intensity data using the CLI, see the [Exporting grid intensity for a location](/grid-intensity-cli/tutorials/exporting-grid-intensity/) tutorial.
