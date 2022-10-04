---
title: Installation
description: This guide will show you how to quickly get started with CO2.js in a variety of ways.
eleventyNavigation:
  key: install
  title: Installation
  order: 2
---

# Installation

This guide will show you how to quickly get started with CO2.js in a variety of ways.

## Using NPM

If you're working in a project that already uses NPM, then you can install CO2.js as a dependency.

```bash
npm install @tgwf/co2
```

## Using Skypack

To get started with CO2.js quickly in the browser, you can import the library using Skypack.

```js
import tgwf from 'https://cdn.skypack.dev/@tgwf/co2';
```

## Using a JS CDN

You can get the latest version of CO2.js using one of the content delivery networks below. This comes in handy if you want to use CO2.js in projects that aren't using Node JS or NPM.

### jsDelivr

You can find the package at [https://www.jsdelivr.com/package/npm/@tgwf/co2](https://www.jsdelivr.com/package/npm/@tgwf/co2).

- CommonJS compatible build `https://cdn.jsdelivr.net/npm/@tgwf/co2@latest/dist/cjs/index-node.min.js`
- ES Modules compatible build `https://cdn.jsdelivr.net/npm/@tgwf/co2@latest/dist/esm/index.js`
- IIFE compatible build `https://cdn.jsdelivr.net/npm/@tgwf/co2@latest/dist/iife/index.js`

### Unpkgd

You can find the package at [https://unpkg.com/browse/@tgwf/co2@latest/](https://unpkg.com/browse/@tgwf/co2@latest/).

- CommonJS compatible build `https://unpkg.com/@tgwf/co2@latest/dist/cjs/index-node.min.js`
- ES Modules compatible build `https://unpkg.com/@tgwf/co2@latest/dist/esm/index.js`
- IIFE compatible build `https://unpkg.com/@tgwf/co2@latest/dist/iife/index.js`

## Build it yourself

You can also build the CO2.js library from the source code. This allows you to make code changes should you need to do so. To build CO2.js:

1. Go to the [CO2.js repository](https://github.com/thegreenwebfoundation/co2.js) on GitHub.
1. Clone or fork the repository.
1. Navigate to the folder on your machine and run `npm run build` in your terminal.
1. Once the build has finished running, you will find a `/dist` folder has been created. Inside you can find:
  
    - `dist/cjs` - A CommonJS compatible build.
    - `dist/esm` - An ES Modules compatible build.
    - `dist/iife` - An Immediately Invoked Function Expression (IIFE) version of the library.