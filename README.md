# ng-parsel

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

> Convert your Angular components to JSON

![ng-parsel logo](https://github.com/kreuzerk/ng-parsel/blob/main/docs/logo.svg)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is this module about](#what-is-this-module-about)
- [Getting started](#getting-started)
  - [Install](#install)
  - [Init configuration](#init-configuration)
  - [Parse codebase](#parse-codebase)
    - [Parse script](#parse-script)
    - [NPX](#npx)
- [Configuration](#configuration)
- [Component type](#component-type)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is this module about

This module extracts the most important information of your Angular code base and converts it into JSON. Having the most important parts of your Angular code base as JSON can be very useful to perform custom analysis or to display APIs. Displaying APIs is especially useful for library authors that want to illustrate their library in a component showcase.

## Getting started

### Install

Install ng-parsel as a dev dependency in your repository.

```bash
npm i -D @angular-experts/ng-parsel
```

### Init configuration

Once installed you can use npx to create an initial configuration for ng-parsel.

```bash
npx @angular-experts/ng-parsel init
```

Running this command will create a `.parselrc.json` configuration file in the root of your repository. Check the initial configuration and adjust if needed. The configuration properties and their meaning are explained in the [configuration section](#configuration).

### Parse codebase

To parse the code base you can either create a parse script in your `package.json`which calls `ng-parsel` or you can use npx.

#### Parse script

Add the following script to your `package.json`.

```json
"parse": "@angular-experts/ng-parsel parse"
```

Once added, you can open up a terminal and run the following command.

```bash
npm run parse
```

#### NPX

To parse your code base with npx you can run the follwoing command inisde a terminal of your choice.

```bash
npx @angular-experts/ng-parsel parse
```

## Configuration

ng-parsel offers the following configurations.

| Property        | Default value | Description                                                                                                                                                                                                                                                                |
| --------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| src             | 'src'         | Glob to query all the src files that should be parsed                                                                                                                                                                                                                      |
| out             | 'ng-parsel'   | Output directory                                                                                                                                                                                                                                                           |
| parseComponents | true          | If set to `true` ng-parsel will parse Angular Components and include them in the output.                                                                                                                                                                                   |
| parsePipes      | true          | If set to `true` ng-parsel will parse Angular Pipes and include them in the output.                                                                                                                                                                                        |
| parseDirectives | true          | If set to `true` ng-parsel will parse Angular Directives and include them in the output.                                                                                                                                                                                   |
| parseModules    | true          | If set to true ng-parsel will parse Angular Modules and include them in the output.                                                                                                                                                                                        |
| parseSpecs      | true          | If set to true ng-parsel will parse Angular Directives and include them in the output. All files that end with `.spec.ts` are considered testing files                                                                                                                     |
| singleFile      | true          | If set to to `true` the output will be written to a `ng-parsel.json` file in the output directory. If set to false, ng-parsel will generate multiple output files, one for each `componentType`. (Find out more on component types in the [next section](#component-type)) |

## Component type

Currently ng-parsel classifies each file into one of the following `NgParselOutputType`.

- Component
- Pipes
- Modules
- Directives
- Specs
- Unknown

Unknown files will not be parsed. If you need support for additional types please raise an issue or open a PR.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://medium.com/@kevinkreuzer"><img src="https://avatars.githubusercontent.com/u/5468954?v=4?s=100" width="100px;" alt="Kevin Kreuzer"/><br /><sub><b>Kevin Kreuzer</b></sub></a><br /><a href="https://github.com/angular-experts-io/ng-parsel/commits?author=kreuzerk" title="Code">💻</a> <a href="https://github.com/angular-experts-io/ng-parsel/issues?q=author%3Akreuzerk" title="Bug reports">🐛</a> <a href="#content-kreuzerk" title="Content">🖋</a> <a href="https://github.com/angular-experts-io/ng-parsel/commits?author=kreuzerk" title="Documentation">📖</a> <a href="#design-kreuzerk" title="Design">🎨</a> <a href="#ideas-kreuzerk" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-kreuzerk" title="Maintenance">🚧</a> <a href="#platform-kreuzerk" title="Packaging/porting to new platform">📦</a> <a href="#research-kreuzerk" title="Research">🔬</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
