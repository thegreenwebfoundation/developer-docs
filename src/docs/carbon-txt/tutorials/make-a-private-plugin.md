---
title: "Make a private plugin to use with the carbon.txt CLI"
description: "In this tutorial, you will learn how to make a private plugin that can be used with the carbon.txt CLI."
eleventyNavigation:
  key: make-private-plugin
  title: "Make a private plugin to use with the carbon.txt CLI"
  #     parent: overview
  sectionTitle: Tutorials
  order: 13
---

# {{ title }}

## Overview

In this tutorial, you will learn how to make a private plugin that extends the functionality of the carbon.txt validator when used via the command line interface (CLI). For this tutorial, we will create a plugin that checks if the files linked to in a carbon.txt file can be accessed online.

### Before you start

Before getting started, it will help to have an understanding of the [carbon.txt syntax](https://carbontxt.org/syntax).

For the purposes of this tutorial, we will use the [uv Python package manager](https://docs.astral.sh/uv/) to install the carbon.txt validator in a new project. In the next few steps, we will setup our project.

1. Follow the [installation steps](https://docs.astral.sh/uv/getting-started/installation/) to install uv on your system.
2. Create a new folder for the plugin we're building, and navigate into that directory.

```bash
mkdir carbon-txt-private-plugin
cd carbon-txt-private-plugin
```

3. Initiate a project using uv, and specify the Python version to use.

```bash
uv init --python 3.11
```

4. Install the carbon.txt validator into the project

```bash
uv add carbon-txt
```

You can check that the carbon.txt validator has been successfully installed by running the `uv tool run carbon-txt` command. This will return some documentation for the different commands available with the carbon.txt validator.

It is also worth being aware that under the hood, the carbon.txt validator uses [Pluggy](https://pluggy.readthedocs.io/), a widely used framework for building plugin systems, based around exposing a set of "hooks", at various stages of the lifecycle of running the validator.

## Making one-off projects for internal use

The plugin we are building in this tutorial will:

1. Read the content of a carbon.txt file that is discovered by the validator
2. When it finds a `url` property, it will send a HTTP request to that URL to see if the file is reachable.

We can do this without installing any other dependencies because the carbon.txt validator bundles the [httpx](https://www.python-httpx.org/) HTTP client library, so we can use that to send the appropriate request.

### Using the right plugin hook

The carbon.txt validator comes with documentation about the different plugin hooks available. This can be found at [https://carbon-txt-validator.readthedocs.io/en/latest/plugin_hooks.html](https://carbon-txt-validator.readthedocs.io/en/latest/plugin_hooks.html).

From these docs, we can see that there is a hook called `process_document` that fires for every single `Disclosure` object found in a carbon.txt file. The [carbon.txt syntax](https://carbontxt.org/syntax) specifies that each `Disclosure` object must contain a `doc_type` and `url` property. So, for our plugin, we will trigger it to run using the `process_document` hook, and then look for value of the `url` property.

### Writing the code

In our project folder, let's create a new folder called `my_plugins`, and inside that folder create a Python file called `check_file_online.py` and open it in your text editor of choice.

Inside our file, we import `logging`, `httpx`, and the `hookimpl` decorator from the `carbon_txt.plugins` module. We then implement a method _with the same name as our desired hook_ (`process_document`), and add the `@hookimpl` decorator applied to the method. This is how the carbon.txt validator plugin system knows to run it.

The final code for our plugin will look like this:

```python
# saved to ./my_plugins/check_file_online.py

import logging

import httpx
from carbon_txt.plugins import hookimpl

# every plugin needs a name
plugin_name = "carbon_txt_check_online"


@hookimpl
def process_document(document, logs):
    # we send a HEAD request, as we are not trying to download the file.
    # and check the contents - we just want to see that it's reachable
    response = httpx.head(document.url, follow_redirects=True)

    if response.status_code == 200:
        logs.append(f"{plugin_name}: File is online: {document.url}")
        file_online = True
    else:
        logs.append(f"{plugin_name}: File is offline: {document.url}")
        file_online = False

    check_results = {
        "url": document.url,
        "file_online": file_online,
    }

    # because processing a document can result in multiple results being
    # returned we always return a list of results
    results = [check_results]

    return {
        # return the logs so we see the output in response seen by the user
        "logs": logs,
        # return the name of the plugin, so we can tell the output plugins apart
        "plugin_name": plugin_name,
        # return the results of prcoessing the document - in our case a
        # check to see if it's online
        "document_results": results,
    }


```

## Testing that it works

Now we have a file, we can test that it works using the carbon.txt validator. To do this, we will run the carbon.txt validator using `uv` and ask it to validate a domain that contains a carbon.txt file. We will also tell it to use plugins from our newly created `my_plugins` directory.

Make sure you run the command below from inside the `carbon-txt-private-plugin` folder that we created at the start of this tutorial.

```bash
uv tool run carbon-txt validate domain used-in-tests.carbontxt.org --plugins-dir my_plugins/
```

Our output should look something like the output below, with the extra `Results of processing linked documents in the carbon.txt file` section being the additional information the _our plugin_ is adding to the carbon.txt validator response.

```
Attempting to resolve domain: used-in-tests.carbontxt.org
Trying a DNS delegated lookup for domain used-in-tests.carbontxt.org
Checking if a carbon.txt file is reachable at https://used-in-tests.carbontxt.org/carbon.txt
New Carbon text file found at: https://used-in-tests.carbontxt.org/carbon.txt
Carbon.txt file parsed as valid TOML.
Parsed TOML was recognised as valid Carbon.txt file.

✅ Carbon.txt file syntax is valid!

-------


CarbonTxtFile(upstream=Upstream(providers=[]), org=Organisation(disclosures=[Disclosure(domain='used-in-tests.carbontxt.org', doc_type='sustainability-page', url='https://used-in-tests.carbontxt.org/our-climate-record')]))
-------

Results of processing linked documents in the carbon.txt file:

[{'domain': 'used-in-tests.carbontxt.org', 'url': 'https://used-in-tests.carbontxt.org/our-climate-record', 'file_online': True}]
```
