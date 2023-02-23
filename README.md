# [eCommerce Design](https://github.com/app-generator/design-ecommerce) `FIGMA`

Free **[eCommerce Design](https://github.com/app-generator/design-ecommerce)** Template styled with **Bootstrap 5** using a simple codebase and best practices.

- 👉 [See DEMO](https://www.figma.com/file/zEQqvdGW9gDz6LtXIIcHHv/eComm---v1.0.0) - `FIGMA version`

<br />

![Simple eCommerce - FIGMA Project](https://user-images.githubusercontent.com/51070104/220924854-85321144-433f-48b5-bc40-a93fd4c4dafa.png)

<br />

## Features

- 🚀 [Bootstrap 5](https://www.admin-dashboards.com/bootstrap-5-templates/) 
- ⚙️ `Gulp Tooling` (simple usage, no fancy tools)
- ✅ **Easy Customization** (below files are already integrated)
  - `Primary/secondary` colors in [variables.scss](#)
  - `Add your own code` in [custom.scss](#)
- ✅ Sections
  - ✅ [Section_1](#), styled in [#](#)
  - ✅ [Section_2](#), styled in [#](#)

<br />

## How To use it

> Compile the project

```bash
$ yarn       # install modules
$ gulp       # start for development
$ gulp scss  # recompile SCSS
```

The design should be visible in the browser.

<br />

## How To Customize 

> ✅ `Step 1`: Open & Edit `assets\scss\variables.scss`. This file allows to set the primary and seconday colors of the website

```sass
/*
* Global Styling (edit below variables) 
* Warn: once edited, the SCSS needs to be recompiled
*/
$primary:   #FF7A00 !default; // primary color
$secondary: #00D2C4 !default; // secondary
$info:      #17c1e8 !default; 
$success:   #82d616 !default;
$warning:   #fbcf33 !default;
$danger:    #ea0606 !default;
```

> ✅ `Step 2`: Add custom styles to `assets\scss\custom.scss`. This file, initially shipped empty, should contain your own code CSS code.

```sass
.your-awesome-class {
    color: red;
}
```

> ✅ `Step 3`: Recompile SCSS via `GULP`

```bash
$ gulp scss
```

At this point, the new styles should be visible in the website.

<br />

## Section_1

> Section_1 screen here

<br />

## Section_2

> Section_2 screen here

<br />

--- 
Core Bootstrap Project for `FIGMA` - Open-Source project crafted by [AppSeed](https://appseed.us/).
