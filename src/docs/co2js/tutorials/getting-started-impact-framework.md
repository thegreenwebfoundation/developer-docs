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

IF is an open source project driven by the [Green Software Foundation](https://greensoftware.foundation/). It aims to make environmental impacts of software simpler and more transparent to measure and share. IF works on a command line tool with a plugin ecosystem. These plugins are what make IF powerful. They provide the functionality for measuring impacts of various types of software and can be written by everyone. There is also a [plugin which makes CO2.js usable](https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/co2js) within IF.

IF plugins are like functions that take a set of input parameters and return a set of output parameters. Plugins can be chained, such that the outputs of one plugin is passed into a subsequent plugin as an input. Such a chain of plugins is called a pipeline. A pipeline is defined in a manifest file, which we will see below.

A manifest file can be run with the IF cli tool if all the necessary plugins are preinstalled.

### CO2.js plugin

The CO2.js plugin can be used to estimate carbon emissions for a given number of transferred bytes. The plugin offers access to both the Sustainable Web Design (`SWD`) and the OneByte (`1byte`) models. If used with the `SWD` model, it calls the `perVisit` method to estimate the carbon emissions of the bytes transferred. If additional options are passed, the `perVisitTrace` method is called instead. With the `1byte` model the `perByte` method is used.

You can check out the [_Methodologies for calculating website carbon_ page](/co2js/explainer/methodologies-for-calculating-website-carbon) to learn more about both models, and [_Methods_ page](/co2js/methods) for more information on the used methods. For additional information and usage instructions of the plugin, please refer to its [readme](https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/co2js).

### Green hosting plugin

The green hosting plugin offers access to CO2.js's hosting check function. It takes a domain and checks whether it is hosted green or not. More details can be found in the plugin's [readme](https://github.com/wr24-greenit/if-webpage-plugins/blob/main/src/lib/green-hosting/README.md).

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
npm install -g @grnsft/if-unofficial-plugins
```

This package includes the CO2.js plugin. To estimate the carbon impact of a webpage we need additional plugins that you can install by cloning the repo with

```bash
git clone https://github.com/wr24-greenit/if-webpage-plugins.git
```

and install the package by running the commands below inside the cloned repo.

```bash
npm install
npm link
```

Please note: To make this tutorial easily accessible we included documentation on the installation process of the IF and plugins here. Since the IF is still an evolving project this may be subject to change and the above commands may get outdated. If you experience difficulties, please check the [original documentation by the IF team](https://if.greensoftware.foundation/users/quick-start) on how to install IF.

## Manifest file

Now that we are all set up, we can define a manifest file, that uses the CO2.js and the green hosting plugin to define a pipeline for measuring the carbon footprint of loading a webpage.

Let us first look at the pipeline part of the manifest together with its inputs and config options. We are chaining three plugins:

- The MeasureWebpage plugin ([plugin readme](https://github.com/wr24-greenit/if-webpage-plugins/blob/main/src/lib/measure-webpage/README.md))
- The Green Hosting plugin ([plugin readme](https://github.com/wr24-greenit/if-webpage-plugins/blob/main/src/lib/green-hosting/README.md))
- The CO2.js plugin ([plugin readme](https://github.com/Green-Software-Foundation/if-unofficial-plugins/tree/main/src/lib/co2js))

The MeasureWebpage plugin essentially takes in a url and measures how many bytes need to be transferred to load the webpage in a browser. It comes with a couple of config options that are described in detail [here](https://github.com/wr24-greenit/if-webpage-plugins/blob/main/src/lib/measure-webpage/README.md).

The plugins are executed in the order defined in the pipeline. The inputs are passed to the first plugin which potentially modifies them or add additional parameters. The set of updated inputs is then returned. IF takes care of passing them on to the next plugin. This repeats until the last plugin of the pipeline is executed and produces the final output.

### Our pipeline

Our pipeline does the following:

1. The MeasureWebpage plugin is executed first. It gets the inputs defined below, returns them and adds the number of bytes that were transferred to load the webpage (plus some additional parameters)
2. These outputs are passed to the green hosting plugin, which returns them and adds the result of the green hosting check.
3. Finally, all values are passed to the CO2.js plugin, which estimates the carbon emissions based on the model specified.

In the manifest below, you can see the pipeline we have specified. We then set some configuration options for the plugins. The CO2.js plugin is told to use the `SWD` model. The MeasureWebpage plugin is told to scroll the page to the bottom, such that all lazy loaded contents are also loaded and included in the measurement.

In the inputs below we also pass options for the `SWD` model as inputs. We tell the model to assume that 10% of visitors are returning visitors, while 90% are visiting just once. The input values `timestamp` and `duration` are IF specific and should serve the purpose of correctly labelling the time the pipeline is run. Normally these would be changed to match the time we run the pipeline, but for this tutorial we will ignore them. We also set a `url` input, which is required by the MeasureWebpage plugin to run the initial web page test.

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
  - timestamp: "2024-01-01T00:00:00Z"
    duration: 1
    url: https://www.thegreenwebfoundation.org/
    options: # swd model options (co2js plugin)
      firstVisitPercentage: 0.9
      returnVisitPercentage: 0.1
```

## Measuring the carbon footprint of a webpage

Using this pipeline inside of a IF manifest file will allow us to setup an IF run which loads a web page, scrolls to the bottom, checks for green hosting, and then estimates the carbon emissions of that test using the Sustainable Web Design Model.

First, let's create a folder in which we'll keep our manifest file as well as the output for this project.

```bash
mkdir if-measure-webpage-tutorial
cd if-measure-webpage-tutorial
```

Inside of this folder, create a YAML file which will contain our IF manifest. You can name this whatever you want, but for this tutorial we'll call it `manifest.yml`.

The manifest file we'll create includes additional information on top of the pipeline we specified earlier. The `plugins` section specifies the plugins that are used in the pipeline. The `tree` section contains the information about our pipeline. It can potentially include multiple children and thus multiple pipelines, but we do not need this for our use case.

You'll notice that we've added two more plugins to our pipeline. These output a timestamp for the start of the IF run, as well as recording the time the run stops which we then use to output the duration.

Our final `manifest.yml` file looks like this:

```yaml
name: if-measure-webpage-tutorial
description: example manifest for estimating carbon emissions of a webpage
tags:
initialize:
  outputs:
    - yaml
  plugins:
    "timer-start":
      method: TimerStart
      path: "@wr24-greenit/if-webpage-plugins"
    "timer-stop":
      method: TimerStop
      path: "@wr24-greenit/if-webpage-plugins"
    "green-hosting":
      method: GreenHosting
      path: "@wr24-greenit/if-webpage-plugins"
    "measure-webpage":
      method: MeasureWebpage
      path: "@wr24-greenit/if-webpage-plugins"
    "co2js":
      method: Co2js
      path: "@grnsft/if-unofficial-plugins"
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
        - timestamp: "2024-01-01T00:00:00Z" # will be replaced by the actual timestamp
          duration: 1 # will be replaced by the time it took to execute the measure-webpage plugin
          resets: [true] # tells the timer-stop method to replace timestamp and duration
          url: https://www.thegreenwebfoundation.org/
          options: # swd model options (co2js plugin)
            firstVisitPercentage: 0.9
            returnVisitPercentage: 0.1
```

Now, you can run it by executing the following command from inside the `if-measure-webpage-tutorial` folder we created earlier.

```bash
if-run --manifest ./manifest.yml --output ./output.yml
```

This will create an output file in the root of the current folder. You can change this to a different file path if you wish. Open the `output.yml` file and check the values reported in the `outputs` section. The field `carbon-operational` holds the estimated carbon impact of loading the specified webpage in grams.

Your `outputs` should look similar to the example below.

```yaml
outputs:
  - timestamp: "2024-07-13T06:04:16.024Z"
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
