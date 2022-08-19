---
title: Exporting grid intensity data
description: In this tutorial you will use the Grid Intensity CLI exporter to start a Prometheus server exporting carbon intensity metrics.
eleventyNavigation:
  key: export-grid-intensity
  title: Exporting grid intensity data
  # parent: overview
  sectionTitle: Tutorials
  order: 20
---
# {{ title }}

## Overview

Exporting grid intensity data allows you and your code to respond to changes in grid intensity over time. It also allows developers to create dashboards and monitoring tools that visualise grid intensity data, making it easier for non-technical teams to consume.

In this tutorial, you will use the Grid Intensity CLI `exporter` command to start a Prometheus server exporting carbon intensity metrics.

## Before starting

Ensure that you have the [Grid Intensity CLI installed](/grid-intensity-cli/installation) locally.

## Learning goals

- How to use the Grid Intensity CLI `exporter` command.
- How to extract grid intensity data from the export.

In this tutorial we will be using the [UK Carbon Intensity API](https://carbonintensity.org.uk/) provider integration. We will use the Grid Intensity CLI to export data for the United Kingdom.

## Using the `exporter` command

Let's use the `exporter` command to start a [Prometheus](https://prometheus.io/) server on localhost port 8000. There is no need to be familiar with Prometheus for the purposes of this tutorial.

Running the command below will start the exporter.

```bash
grid-intensity exporter --provider=CarbonIntensityOrgUK --region=UK
```

Here, we have used the `--provider` flag to set the UK Carbon Intensity API as our data source. We also use the `--region` flag to tell the exporter what region we want to get data for.

When the `exporter` command runs successfully, you will see the following message:

```bash
Using provider "CarbonIntensityOrgUK" with region "UK"
Metrics available at :8000/metrics
```

Now, if you visit `localhost:8000/metrics` in our browser we will be presented with a page full of data and stats.

## Extracting the relevant data

The Prometheus exporter which we have running on `localhost:8000/metrics` exposes _a lot_ of data. For our purposes, we are interested in the grid intensity data that has been returned from the UK Carbon Intensity API.

In this tutorial we'll use the `curl` command in our terminal to fetch this data. In reality, you would add the Prometheus server as a data source to a tool like Grafana.

Ensure that your Prometheus server is still running at `localhost:8000/metrics`, then run the following command in your terminal.

```bash
curl -s http://localhost:8000/metrics | grep grid

# Returns
# HELP grid_intensity_carbon_average Average carbon intensity for the electricity grid in this region.
# TYPE grid_intensity_carbon_average gauge
grid_intensity_carbon_average{provider="CarbonIntensityOrgUK",region="UK",units="gCO2e per kWh"} 201
```

Here we can see that the current average grid intensity data in the UK is `201`. 

<div class="alert alert-info">
  <p>Data from the UK Carbon Intensity API is updated every 30 minutes. So, if you were to leave the server running, and rerun the above command at a later time then you should see a different grid intensity value returned.</p>
</div>

## Wrapping up

Now you know how to use the `exporter` command to expose grid intensity on a local server. From here you can:

- Use Docker to [deploy the exporter](https://github.com/thegreenwebfoundation/grid-intensity-go#docker-image) to a [Kubernetes](https://github.com/thegreenwebfoundation/grid-intensity-go#kubernetes) or [Nomad](https://github.com/thegreenwebfoundation/grid-intensity-go#nomad) cluster.
- Use the Prometheus exporter as a data source for a [Grafana visualisation](https://prometheus.io/docs/visualization/grafana/).
