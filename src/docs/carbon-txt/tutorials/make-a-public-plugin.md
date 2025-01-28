---
title: "Make a public carbon.txt plugin"
description: "In this tutorial, you will learn how to make a public plugin that can be used with the carbon.txt CLI."
eleventyNavigation:
  key: make-public-plugin
  title: "Make a public carbon.txt plugin"
  #     parent: overview
  sectionTitle: Tutorials
  order: 14
---

# {{ title }}

## Overview

In this tutorial, you will learn how to make a public plugin that extends the functionality of the carbon.txt validator when used via the command line interface (CLI), as well as how to then publish that plugin so that others can also use it.

For this tutorial, we will create a plugin that checks if the files linked to in a carbon.txt file can be accessed online.

### Before you start

<aside class="alert bg-base-200 text-base-content">
<p>Before doing this tutorial, we recommend that you complete the <a href="/carbon-txt/tutorials/make-a-private-plugin">Make a private carbon.txt plugin</a> tutorial. This tutorial extends on the code and concepts explained in that tutorial, and so it is recommend you complete that one first.</p>
</aside>

Before getting started, it will help to have an understanding of the [carbon.txt syntax](https://carbontxt.org/syntax).

For the purposes of this tutorial, we will use the [uv Python package manager](https://docs.astral.sh/uv/) to install the carbon.txt validator in a new project. In the next few steps, we will setup our project.

1. Follow the [installation steps](https://docs.astral.sh/uv/getting-started/installation/) to install uv on your system.

```bash
mkdir carbon-txt-check-online
cd carbon-txt-check-online
```

3. Initiate a project using uv to create a Python package, and specify the Python version to use.

```bash
uv init --package carbon-txt-check-online --python 3.11
```

4. Install the carbon.txt validator into the project

```bash
uv add carbon-txt
```

You can check that the carbon.txt validator has been successfully installed by running the `uv tool run carbon-txt` command. This will return some documentation for the different commands available with the carbon.txt validator.

It is also worth being aware that under the hood, the carbon.txt validator uses [Pluggy](https://pluggy.readthedocs.io/), a widely used framework for building plugin systems, based around exposing a set of "hooks", at various stages of the lifecycle of running the validator.

## Making a public plugin

The plugin we are building in this tutorial will:

1. Read the content of a carbon.txt file that is discovered by the validator
2. When it finds a `url` property, it will send a HTTP request to that URL to see if the file is reachable.

We are building a plugin that we intend to share with others, so that they can also use it with the carbon.txt validator. To do this, we will need to specify how our plugin is consumed by using a `pyproject.toml` file, and also adhere to the folder structure conventions for published Python packages. Since we're using `uv` for this tutorial, we will rely on it to help us with this work.

<aside class="alert bg-base-200 text-base-content">
<p>We're using <code>carbon-txt-check-online</code> for this example, but please bear in mind you'll need a different name (that one's taken for creating a demo plugin for these docs!).</p>
</aside>

### Creating our `pyproject.toml` file

When we ran the `uv init` command earlier, `uv` setup our Python project and also created a `pyproject.toml` file for us. Open this file in your text editor. It will look something like this:

```toml
[project]
name = "carbon-txt-check-online"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.11"
dependencies = ["carbon-txt>=0.0.13"]
```

Let's update the description, so that it reflects what our plugin will do. We will also need to update our project dependencies to include `httpx` which we will use later to make HTTP requests that check if a file is available online. Our updated `pyproject.toml` file will look like this:

```toml
[project]
name = "carbon-txt-check-online"
version = "0.1.0"
description = "A demonstration carbon.txt plugin that checks whether linked documents in a carbon.txt file are still online."
readme = "README.md"
requires-python = ">=3.11"
dependencies = ["httpx", "carbon-txt"]
```

#### Add the entry points to be recognised as a plugin

Adding a project entry point will inform the carbon.txt validator on how to use our plugin. Add the lines below to the end of your `pyproject.toml` file.

```toml
[project.entry-points.carbon_txt]
check_online = "carbon_txt_check_online"
```

The line `[project.entry-points.carbon_txt]` is a way of flagging up that this plugin can be considered a valid entry point for the `carbon_txt` project.

Beneath it, the `carbon_txt_check_online` is the path to the python file that contains a python module that our plugin will be downloaded into when used in a project.

#### Add a build backend

Adding a build backend allows us to publish this project to a public Python repository like Pypi. For the purpose of this tutorial, we will use the default build backend. We do not need to know what hatchling is, but if you want to know then the [Python packaging guide as some helpful info](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/#declaring-the-build-backend). Add these lines to the end of your `pyproject.toml` file.

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

Once you've completed those steps, your `pyproject.toml` file should look like the one below.

```toml
[project]
name = "carbon-txt-check-online"
version = "0.1.0"
description = "A demonstration carbon.txt plugin that checks whether linked documents in a carbon.txt file are still online."
readme = "README.md"
requires-python = ">=3.11"
dependencies = ["httpx", "carbon-txt"]

[project.entry-points.carbon_txt]
check_online = "carbon_txt_check_online"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

### Creating our project structure

The `uv init` command we ran earlier also created the project structure for our package. It should look like this.

```
tree ./carbon-txt-check-online/


./carbon-txt-check-online/
├── README.md
├── pyproject.toml
├── src
    └── carbon_txt_check_online
        └── __init__.py
```

We've already updated the content of the `pyproject.toml` here. Now, let's update the code that will run for our plugin. To do this, we will edit the `src/carbon_txt_check_online/__init__.py` file.

### Adding our plugin code

The carbon.txt validator comes with documentation about the different plugin hooks available. This can be found at [https://carbon-txt-validator.readthedocs.io/en/latest/plugin_hooks.html](https://carbon-txt-validator.readthedocs.io/en/latest/plugin_hooks.html).

From these docs, we can see that there is a hook called `process_document` that fires for every single `Disclosure` object found in a carbon.txt file. The [carbon.txt syntax](https://carbontxt.org/syntax) specifies that each `Disclosure` object must contain a `doc_type` and `url` property. So, for our plugin, we will trigger it to run using the `process_document` hook, and then look for value of the `url` property.

Inside our `src/carbon_txt_check_online/__init__.py` file, we import `logging`, `httpx`, and the `hookimpl` decorator from the `carbon_txt.plugins` module. We then implement a method _with the same name as our desired hook_ (`process_document`), and add the `@hookimpl` decorator applied to the method. This is how the carbon.txt validator plugin system knows to run it.

The final code for our plugin will look like this:

```python
# saved to ./src/carbon_txt_check_online/__init__.py

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

### Testing that it works

Assuming you have put the code in the correct place, if you are in that project structure, you should now be able to run `carbon-txt` validator binary, and see your plugin in use.

Inside the `carbon-txt-check-online` folder that we created at the start of this project, run the `carbon-txt plugins` command to see a list of active plugins:

```bash
uv run carbon-txt plugins
```

Your plugin should be visible:

```bash
Active plugins:

 - carbon_txt_check_online
```

Now we can also test that our plugin returns works using the carbon.txt validator. To do this, we will run the carbon.txt validator using `uv` and ask it to validate a domain that contains a carbon.txt file. Notice how we are not explicitly telling the carbon.txt validator to use a plugin, but we expect that it will be using the plugin that we've just created.

```bash
uv run carbon-txt validate domain used-in-tests.carbontxt.org
```

Our output should look something like the output below, with the extra `Results of processing linked documents in the carbon.txt file` section being the additional information the _our plugin_ is adding to the carbon.txt validator response.

```bash
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

{'carbon_txt_check_online': [{'url': 'https://used-in-tests.carbontxt.org/our-climate-record', 'file_online': True}]}
```

## Publishing the plugin for others to use

Publishing a software package to a repository like Pypi is beyond the scope of this documentation, but the [guide on PyPa, Packaging Python Projects](https://packaging.python.org/en/latest/tutorials/packaging-projects/) is a helpful resource.

### Using plugins that aren't published on Pypi

If you have created a plugin, but do not want to/are not ready to publish it on Pypi, then you can still shared it for others to use if it is hosted on a public repository like Github.

Normally if you wanted to use this new external plugin, `carbon-txt-check-online` in a different project, and you have published it to Pypi, your `pyproject.toml` file might look like this:

```toml
dependencies = [
    "some-other-dependency",
    "carbon-txt",
    "carbon-txt-check-online"
]
```

If you have uploaded the code to somewhere like Github, you can take advantage of git support in `pyproject.toml` files, to fetch it from a site like Github instead.

You can point to the GitHub repository instead by adding an `@`, and then listing the URL of the repository using the special `git+https` protocol to denote that this is a package to download from GitHub. If a project is accessible in your browser at this url `https://github.com/thegreenwebfoundation/carbon-txt-check-online`, then the `git+https` link would be `git+https://github.com/thegreenwebfoundation/carbon-txt-check-online.git`. This means your list of dependencies will look like this instead:

```toml
dependencies = [
    "some-other-dependency",
    "carbon-txt",
    "carbon-txt-check-online @ git+https://github.com/thegreenwebfoundation/carbon-txt-check-online.git",
]
```

When you next try to install the dependencies in your project, the other projects will be downloaded from PyPi as usual, but because of the extra git link, the `carbon-txt-check-online` project will be downloaded from GitHub instead.

This is very handy for testing external plugins before 'officially' publishing them!

## Source code

If you want to see the completed external plugin, there is a demo plugin to download and learn from on github at:

[https://github.com/thegreenwebfoundation/carbon-txt-check-online](https://github.com/thegreenwebfoundation/carbon-txt-check-online)
