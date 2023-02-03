---
title: Installation
description: This guide will show you how to install the Grid Intensity CLI using either brew or curl.
eleventyNavigation:
  key: install
  title: Installation
  order: 2
---

# Installation

This guide will show you how to install the Grid Intensity CLI using either brew or curl.

## Using brew

To install using [Homebrew](https://brew.sh/), run the following command:

```bash
brew install thegreenwebfoundation/carbon-aware-tools/grid-intensity
```

## Using curl

To install using curl, run the following command:

```bash
curl -fsSL https://raw.githubusercontent.com/thegreenwebfoundation/grid-intensity-go/main/install.sh | sudo sh
```

## Build it yourself

You can also manually install the CLI using the latest binary release [available on GitHub](https://github.com/thegreenwebfoundation/grid-intensity-go/releases).

Once you have downloaded the tarball, you will need to:

1. Extract the `grid-intensity` binary.
1. Make it executable.
1. Move it to somewhere in your path.

For example:

```bash
tar xzf grid-intensity_0.3.0_Darwin_arm64.tar.gz grid-intensity
chmod +x grid-intensity
sudo mv grid-intensity /usr/local/bin/
```
