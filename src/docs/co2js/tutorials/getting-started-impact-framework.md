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

- Understand the basics of the impact framework
- How to install the impact framework
- How to use CO2.js within the impact framework
- Estimate carbon emissions of a webpage of your choosing

## Impact Framework Basics

IF is an open source project driven by the [Green Software Foundation](https://greensoftware.foundation/). It aims to make environmental impacts of software simpler and more transparent to measure and share. IF works on a command line tool with a plugin ecosystem. These plugins are what make IF powerful. They provide the functionality for measuring impacts of various types of software and can be written by everyone. There is also a [plugin which makes CO2.js usable](https://github.com/TNG/if-webpage-plugins/blob/main/src/lib/co2js) within IF.

IF plugins are like functions that take a set of input parameters and return a set of output parameters. Plugins can be chained, such that the outputs of one plugin is passed into a subsequent plugin as an input. Such a chain of plugins is called a pipeline. A pipeline is defined in a manifest file, which we will see below.

A manifest file can be run with the IF cli tool if all the necessary plugins are preinstalled.

### CO2.js plugin

The CO2.js plugin can be used to estimate carbon emissions for a given number of transferred bytes. The plugin offers access to both the Sustainable Web Design (`SWD`) and the OneByte (`1byte`) models. If used with the `SWD` model, it calls the `perVisit` method to estimate the carbon emissions of the bytes transferred. If additional options are passed, the `perVisitTrace` method is called instead. With the `1byte` model the `perByte` method is used.

You can check out the [_Methodologies for calculating website carbon_ page](/co2js/explainer/methodologies-for-calculating-website-carbon) to learn more about both models, and [_Methods_ page](/co2js/methods) for more information on the used methods. For additional information and usage instructions of the plugin, please refer to its [readme](https://github.com/TNG/if-webpage-plugins/blob/main/src/lib/co2js/README.md).

### Green hosting plugin

The green hosting plugin offers access to CO2.js's hosting check function. It takes a domain and checks whether it is hosted green or not. More details can be found in the plugin's [readme](https://github.com/TNG/if-webpage-plugins/blob/main/src/lib/green-hosting/README.md).

Next, we will install the impact framework and then use it to run a pipeline for estimating the carbon impact of loading a webpage of your choosing.

## Prerequisites

You will need to have the following setup on your machine:

- Node version 18 or later
- NPM version 8 or later

## Setting up

First, we install the impact framework (IF) globally on our system using NPM. To install the cli tool, run

```bash
npm install -g @grnsft/if
```

To install the plugins necessary for this tutorial, run

```bash
npm install -g @tngtech/if-webpage-impact
```

This installs the CO2.js plugin, the Webpage Impact plugin and the Green Hosting plugin to measure the data we need.

Please note: To make this tutorial easily accessible we included documentation on the installation process of the IF and plugins here. Since the IF is still an evolving project this may be subject to change and the above commands may get outdated. If you experience difficulties, please check the [original documentation by the IF team](https://if.greensoftware.foundation/users/quick-start) on how to install IF.

## Manifest file

Now that we are all set up, we can define a manifest file, that uses the CO2.js and the green hosting plugin to define a pipeline for measuring the carbon footprint of loading a webpage.

Let us first look at the pipeline part of the manifest together with its inputs and config options. We are chaining three plugins:

- The Webpage Impact plugin ([plugin readme](https://github.com/TNG/if-webpage-plugins/tree/main/src/lib/webpage-impact))
- The Green Hosting plugin ([plugin readme](https://github.com/TNG/if-webpage-plugins/blob/main/src/lib/green-hosting/README.md))
- The CO2.js plugin ([plugin readme](https://github.com/TNG/if-webpage-plugins/blob/main/src/lib/co2js/README.md))

The Webpage Impact plugin essentially takes in a url and measures how many bytes need to be transferred to load the webpage in a browser. It comes with a couple of config options that are described in detail [here](https://github.com/TNG/if-webpage-plugins/tree/main/src/lib/webpage-impact).

The plugins are executed in the order defined in the pipeline. The inputs are passed to the first plugin which potentially modifies them or adds additional parameters. The set of updated inputs is then returned. IF takes care of passing them on to the next plugin. This repeats until the last plugin of the pipeline is executed and produces the final output.

### Our pipeline

Our pipeline does the following:

1. The Webpage Impact plugin is executed first. It gets the inputs defined below, returns them and adds the number of bytes that were transferred to load the webpage (plus some additional parameters)
2. These outputs are passed to the Green Hosting plugin, which returns them and adds the result of the green hosting check.
3. Finally, all values are passed to the CO2.js plugin, which estimates the carbon emissions based on the model specified.

Translating this pipeline in the language of the manifest file, yields the following definition

```yaml
pipeline:
  observe:
    - webpage-impact
    - green-hosting
  compute:
    - co2js
```

The first two plugins make observations (gather data). The CO2.js plugin computes the estimated carbon impact with this data.

## Measuring the carbon footprint of a webpage

Using this pipeline inside of a IF manifest file will allow us to set up an IF run which loads a web page, scrolls to the bottom, checks for green hosting, and then estimates the carbon emissions of that test using the Sustainable Web Design Model.

First, let's create a folder in which we'll keep our manifest file as well as the output for this project.

```bash
mkdir if-measure-webpage-tutorial
cd if-measure-webpage-tutorial
```

Inside of this folder, create a YAML file which will contain our IF manifest. You can name this whatever you want, but for this tutorial we'll call it `manifest.yml`.

The manifest file we'll create includes additional information on top of the pipeline we specified earlier. The `plugins` section specifies the plugins that are used in the pipeline. The `tree` section contains the information about our pipeline. It can potentially include multiple children and thus multiple pipelines, but we do not need this for our use case.

Plugins can have config options. Please note, that we use them to tell the CO2.js plugin to use the `SWD` model in version 4. The Webpage Impact plugin is told to load the url `www.thegreenwebfoundation.org` and scroll the page to the bottom, such that all lazy loaded contents are also loaded and included in the measurement.

The pipeline gets inputs, potentially multiple. We only need one input, that consists of multiple values, the options for the `SWD` model that the CO2.js plugin needs as inputs. We tell the model to assume that 10% of visitors are returning visitors, while 90% are visiting just once.

Our final `manifest.yml` file looks like this:

```yaml
name: if-measure-webpage-tutorial
description: example manifest for estimating carbon emissions of a webpage
tags:
initialize:
  outputs:
    - yaml
  plugins:
    'green-hosting':
      method: GreenHosting
      path: '@tngtech/if-webpage-plugins'
    'webpage-impact':
      method: WebpageImpact
      path: '@tngtech/if-webpage-plugins'
      config:
        scrollToBottom: false
        url: https://www.thegreenwebfoundation.org/
    'co2js':
      method: Co2js
      path: '@tngtech/if-webpage-plugins'
      config:
        type: swd
        version: 4
tree:
  children:
    child:
      pipeline:
        observe:
          - webpage-impact
          - green-hosting
        compute:
          - co2js
      inputs:
        - options: # swd model options (co2js plugin)
            firstVisitPercentage: 0.9
            returnVisitPercentage: 0.1
```

Please note: this manifest was tested with version 1.0.0 of IF. Future versions may introduce changes, that require updates to the manifest.

Now, you can run it by executing the following command from inside the `if-measure-webpage-tutorial` folder we created earlier.

```bash
if-run --manifest ./manifest.yml --output ./output.yml
```

This will create an output file in the root of the current folder. You can change this to a different file path if you wish. Open the `output.yml` file and check the values reported in the `outputs` section. The field `carbon-operational` holds the estimated carbon impact of loading the specified webpage in grams.

Your `inputs` and `outputs` should look similar to the example below.

```yaml
inputs:
  - options:
      firstVisitPercentage: 0.9
      returnVisitPercentage: 0.1
    timestamp: '2025-01-19T15:10:56.312Z'
    duration: 7.38
    url: https://www.thegreenwebfoundation.org/
    network/data/bytes: 450696
    network/data/resources/bytes:
      Document: 20428
      Stylesheet: 39425
      Script: 63448
      Image: 294447
      Font: 30087
      Other: 2040
      XHR: 821
    green-web-host: true
outputs:
  - options:
      firstVisitPercentage: 0.9
      returnVisitPercentage: 0.1
    timestamp: '2025-01-19T15:10:56.312Z'
    duration: 7.38
    url: https://www.thegreenwebfoundation.org/
    network/data/bytes: 450696
    network/data/resources/bytes:
      Document: 20428
      Stylesheet: 39425
      Script: 63448
      Image: 294447
      Font: 30087
      Other: 2040
      XHR: 821
    green-web-host: true
    carbon-operational: 0.055 # final result: estimated co2 emissions in grams
```

We see that, that the two observational plugins added new input values, like `network/data/bytes` from the Webpage Impact plugin and `green-web-host` from the Green Hosting plugin. A timestamp was also added.

These inputs are then passed to the CO2.js plugin, which computes the final result `carbon-operational`, which is in grams of CO2e emissions.
