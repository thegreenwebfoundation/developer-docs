---
title: "Getting started: Impact Framework"
description: "In this tutorial, you will install and use CO2.js within the [Impact Framework](https://if.greensoftware.foundation/). You learn how to estimate the carbon emssions of loading a webapge of your choosing."
eleventyNavigation:
  key: getting-started-if
  title: "Getting started: Impact Framework"
  # parent: overview
  sectionTitle: Tutorials
  order: 12
---

# {{ title }}

## Overview

At its core, CO2.js takes an input of bytes and returns in carbon estimate in grams. In doing so, it provides a way for developers to estimate the carbon cost of data transfer.

In this tutorial, you will use CO2.js within the [Impact Framework](https://if.greensoftware.foundation/) (IF) to estimate carbon footprint of loading a webpage of your choosing.

## Learning goals

- Basics of the impact framework
- How to install the impact framework
- How to use CO2.js within the impact framework
- Estimate carbon emissions of a webpage of your choosing

## Impact Framework Basics

IF is an open source project driven by the [Green Software Foundation](https://greensoftware.foundation/). It aims to make environmental impacts of software simpler and more transparent to measure and share. IF evolves around a cli tool with a plugin system. Plugins are what makes IF powerful. They provide the functionality for measuring impacts of various types of software and can be written by everyone. There is also a [plugin which makes CO2.js usable](https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/co2js) within IF.

IF plugins are like functions that take a set of input parameters and return a set of output parameters. Plugins can be chained, such that the outputs of one plugin are passed as inputs to the subsequent plugin. Such a chain of plugins is called pipeline. A pipeline is defined in a manifest file, which we will see below.

A manifest file can be run with the IF cli tool if all the necessary plugins are preinstalled.

### CO2.js plugin

The CO2.js plugin can be used to estimate carbon emissions for a given number of transferred bytes. The plugin offers access to the `SWD` and the `1byte` model. If used with the `SWD` model, it calls the `perVisit` method to estimate the carbon emissions of the bytes transferred. If additional options are passed, the `perVisitTrace` method is called instead. With the `1byte` model the `perBytes` method is used.

You can check out the [_Methodologies for calculating website carbon_ page](/co2js/explainer/methodologies-for-calculating-website-carbon) to learn more about both models, and [_Methods_ page](/co2js/methods) for more information on the used methods. For additional information and usage instructions of the plugin, please refer to its [readme](https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/co2js).

### Green hosting plugin

The green hosting plugin offers access to CO2.js's hosting check function. It takes a domain and checks whether it is hosted green or not. More details can be found in the plugin's [readme](https://github.com/wr24-greenit/if-webpage-plugins/blob/main/src/lib/green-hosting/README.md).

Next, we will install the impact framework and then use it to run a pipeline for estimating the carbon impact of loading a webpage of your choosing.

## Prerequisites

You will need to have the following setup on your machine:

- Node version 18 or later
- NPM version 8 or later

## Setting up

First, we install the impact framework (IF). To install the cli tool, run

```bash
npm install -g @grnsft/if
```

To install the plugins necessary for this tutorial, run

```bash
npm install -g @grnsft/if-unofficial-plugins
```

This package includes the CO2.js plugin. To estimate the carbon impact of a webpage we need additional plugins that you can install by cloning the repo with

```bash
git clone https://github.com/wr24-greenit/if-webpage-plugins.git
```

and install the package by running

```bash
npm install
npm lnk
```

inside the cloned repo.

Please note: To make this tutorial easily accessible we included documentation on the installation process of the IF and plugins here. Since the IF is still an evolving project this may be subject to change and the above commands may get outdated. If you experience difficulties, please check the [original documentation by the IF team](https://if.greensoftware.foundation/users/quick-start) on how to install IF.

## Manifest file

Now that we are all set up, we define a manifest file, that uses the CO2.js and the green hosting plugin to define a pipeline to measure the carbon footprint of loading a webpage.

Let us first look at the pipeline part of the manifest together with its inputs and config options. We are chaining three plugins:
The measure webpage plugin, that we have not introduced yet, the green hosting, and the CO2.js plugin. The measure webpage plugin essentially takes in a url and measures how many bytes need to be transferred to load the webpage in a browser. It comes with a couple of config options that are described in detail [here](https://github.com/wr24-greenit/if-webpage-plugins/blob/main/src/lib/measure-webpage/README.md). The plugins are executed in the order defined in the pipeline.

The inputs are passed to the first plugin which potentially modifies them or add additional parameters. The set of updated inputs is then returned. IF takes care of passing the on to the next plugin. This repeats until the last plugin of the pipeline is executed and produced the final output.

Our pipeline does the following:

1. The measure webpage plugin is executed first. It gets the inputs defined below, returns them and adds the number of bytes that were transferred to load the webpage (plus some additional parameters)
2. These outputs are passed to the green hosting plugin, which returns them and adds the result of the green hosting check.
3. Finally, all values are passed to the CO2.js plugin, which estimates the carbon emissions.

In the inputs below we also pass options for the `SWD` model as inputs. We tell it to assume that 10% of visitors are returning visitors, while 90% are visiting just once.

Aside: Don't be irritated by th input values `timestamp` and `duration`. They are IF specific and should serve the purpose of correctly labelling the time of the computation. It would be correct to change them to the time and duration of the pipeline execution. But we will ignore this for now.

Additionally, config options are passed to the plugins. The CO2.js plugin is told to use the `SWD` model. The measure webpage plugin is told to scroll the page to the bottom, such that all lazy loaded contents are also loaded and included in the measurement.

```yaml
pipeline:
  - measure-webpage
  - green-hosting
  - co2js
config:
  co2js:
    type: swd
  measure-webpage:
    scrollToBottom: true
inputs:
  - timestamp: '2024-01-01T00:00:00Z'
    duration: 1
    url: https://www.thegreenwebfoundation.org/
    options: # swd model options (co2js plugin)
      firstVisitPercentage: 0.9
      returnVisitPercentage: 0.1
```

## Measuring the carbon footprint of a webpage

Now, that we have discussed the pipeline in more detail, let's have a look at the final manifest file. It includes additional information. The plugins section specifies the plugins that are used in the pipeline. The tree section contains the information about our pipeline. It can potentially include multiple children and thus multiple pipelines, but we do not need this for our use case.

Compared to the pipeline discussed above, we have added two more plugins that are not doing much. They are only there to adjust the timestamp and duration to the actual time and duration of measurment.

```yaml
name: if-measure-webpage-tutorial
description: example manifest for estimating carbon emissions of a webpage
tags:
initialize:
  outputs:
    - yaml
  plugins:
    'timer-start':
      method: TimerStart
      path: '@wr24-greenit/if-webpage-plugins'
    'timer-stop':
      method: TimerStop
      path: '@wr24-greenit/if-webpage-plugins'
    'green-hosting':
      method: GreenHosting
      path: '@wr24-greenit/if-webpage-plugins'
    'measure-webpage':
      method: MeasureWebpage
      path: '@wr24-greenit/if-webpage-plugins'
    'co2js':
      method: Co2js
      path: '@grnsft/if-unofficial-plugins'
tree:
  children:
    child:
      pipeline:
        - timer-start
        - measure-webpage
        - timer-stop
        - green-hosting
        - co2js
      config:
        co2js:
          type: swd
        measure-webpage:
          scrollToBottom: true
      inputs:
        - timestamp: '2024-01-01T00:00:00Z' # will be replaced by the actual timestamp
          duration: 1 # will be replaced by the time it took to execute the measure-webpage plugin
          resets: [true] # tells the timer-stop method to replace timestamp and duration
          url: https://www.thegreenwebfoundation.org/
          options: # swd model options (co2js plugin)
            firstVisitPercentage: 0.9
            returnVisitPercentage: 0.1
```

To use this manifest file to measure a webpage of your choosing, you have to copy it to a file and save it, say as `measure-webpage.yaml`. Put the url of the page you want to measure inside the `url` field.

Now, you can run it by executing

```bash
if-run --manifest <path/to/measure-webpage.yaml> --output <path/to/measure-webpage-results>
```

With `--output` you define a path at which IF is storing the results of the manifest run. Open it and check the values reported in the `outputs` section. The field `carbon-operational` holds the estimated carbon impact of loading the specified webpage in grams.

Your `outputs` should look similar to the example below.

```yaml
outputs:
  - timestamp: '2024-07-13T06:04:16.024Z'
    duration: 21.369
    url: https://www.thegreenwebfoundation.org/
    options:
      firstVisitPercentage: 0.9
      returnVisitPercentage: 0.1
      dataReloadRatio: 0.06075740549457618
    network/data/bytes: 528594
    network/data/resources/bytes:
      document: 18237
      stylesheet: 37314
      script: 58992
      image: 381556
      xhr: 820
      font: 29859
      other: 1816
    green-web-host: true
    carbon-operational: 0.16578192040610404 # final result: estimated co2 emissions in grams
```
