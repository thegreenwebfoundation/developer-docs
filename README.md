# Green Web Foundation - Developer Docs Website

Welcome to the [developer documentation site](https://developers.thegreenwebfoundation.org/) for Green Web Foundation's open-source libraries. Here, you'll find comprehensive guides and resources to help you understand, use, and contribute to our projects effectively.

## Getting Started

To work on this site locally, follow these steps:

### Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) v20 or later
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

This project is built using the [Eleventy (11ty)](https://www.11ty.dev/) static site generator. The [11ty documentation](https://www.11ty.dev/docs/) has thorough explainers for different bits of functionality that might come in useful when working on this website.

This project's template files are written in Nunjucks and Markdown. If you are using Visual Studio Code as your code editor when working on this project, we recommend that you install the following plugins:

- [Nunjucks for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

### Installation

1. **Clone repository:** Start by cloning this repository to your local machine using Git:

   ```bash
   git clone https://github.com/thegreenwebfoundation/developer-docs
   ```

   If you plan to contribute to this project, then please [create a fork of it](https://github.com/thegreenwebfoundation/developer-docs/fork) in your own Github account before making changes.

2. **Navigate to project directory:** Once the cloning process is complete, navigate to the project directory:

   ```bash
   cd developer-docs
   ```

3. **Install dependencies:** Install the project dependencies using npm:

   ```bash
   npm install
   ```

   Alternatively, if you prefer using yarn:

   ```bash
   yarn install
   ```

### Making Changes

1. **Edit markdown files:** Make changes to the markdown (`.md`) files located in the `src/docs` folder to update the content as needed.

2. **Preview changes:** After making your modifications, run the following command to preview the changes locally:

   ```bash
   npm run dev
   ```

   This will start a local development server, allowing you to view your changes in a web browser. You can now view your changes by visiting [https://localhost:8080](https://localhost:8080).

### Using GitPod

Alternatively, you can open this project in GitPod for a hassle-free development experience.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/thegreenwebfoundation/developer-docs)

## Contributing changes

To contribute changes back to this project, please follow the steps outlined in the [CONTRIBUTING.md](/CONTRIBUTING.md) file in this repository.

By following these steps, you can seamlessly work on this site locally and contribute to improving our developer documentation.
