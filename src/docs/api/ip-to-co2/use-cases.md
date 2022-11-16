---
libraryName: IP to CO2 Intensity
title: Use cases
description: Use this API to check the carbon intensity of an IP address based on its real-world location.
# hasTabs: true
eleventyNavigation:
  key: ip-to-co2-use-cases
  title: Use cases
  order: 2
---

# Use cases for the IP to CO2 Intensity API

The IP to CO2 Intensity API allows developers to surface a wealth of information about a given IP address. This information can be used as the foundations for building carbon-aware websites, apps, and software solutions.

Below are just a few ideas of how you might be able to use the IP to CO2 Intensity API in your projects.

## For Website Audits

Combining data from website auditing tools such as [WebPageTest](https://webpagetest.org) with the IP to CO2 Intensity API can help you a more detailed sustainability profile of how the website is hosted.

With knowledge of the origin IP address of a web page, you can determine what country that page was served from and get an average annual carbon intensity figure for that country's energy grid. With this information, you might be able to start investigating other possible hosting locations. This blog post auditing the COP27 homepage demonstrates [how you might go about doing that](https://fershad.com/writing/cop27-egypt-a-webpage-sustainability-review/#sustainability).

To take this a step further, you can look at each individual request to map where all resources used on a web page were served from. In doing so, you can create a truly holistic sustainability profile of how a web page and all its parts are hosted. Having this information can also help you make more educated decisions about the providers you use. For example, you might switch a third-party service to one that is served from a green location, or that uses a CDN.

## As a first step into building carbon-aware software and tooling

The API is a good entry-point for teams looking to develop carbon-aware sites, apps, and software.

To start with, you can give users of your digital products the power to choose greener locations for certain tasks. Say, for example, you have an app where users upload a file & it gets processed in the cloud. For performance reasons, you've provisioned several cloud locations where this processing might take place. When a user uploads a file, you could present the option of processing data in either the "best available region" or "the greenest region".

In this example, you would use the IP to CO2 Intensity API to check the percentage of energy generated from fossil fuel in each of the cloud regions you use. You can rerun these checks whenever a new region is added, or you change services within a region. These variables can then be set in your code base, and your software can be written to perform a comparison of regions and present users with the appropriate options.

---

These are just a couple of example of how you might use the IP to CO2 Intensity API. If you are already using it in production we’d love to know! [Contact us](https://www.thegreenwebfoundation.org/support-form/).
