[contributors-shield]: https://img.shields.io/github/contributors/jamiestegman/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/jamiestegman/ui-maker/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jamiestegman/repo.svg?style=for-the-badge
[forks-url]: https://github.com/jamiestegman/ui-maker/network/members
[stars-shield]: https://img.shields.io/github/stars/jamiestegman/repo.svg?style=for-the-badge
[stars-url]: https://github.com/jamiestegman/ui-maker/stargazers
[issues-shield]: https://img.shields.io/github/issues/jamiestegman/repo.svg?style=for-the-badge
[issues-url]: https://github.com/jamiestegman/ui-maker/issues
[license-shield]: https://img.shields.io/github/license/jamiestegman/repo.svg?style=for-the-badge
[license-url]: https://github.com/jamiestegman/ui-maker/blob/master/LICENSE.txt

<br/>
<p align="center">
  <a href="https://github.com/jamiestegman/ui-maker">
    <img src="./src/images/logo.png" alt="Logo" width="100" height="100">
  </a>

  <h1 align="center">UI Maker</h1>

  <span align="center">
  ![GitHub](https://img.shields.io/github/license/jamiestegman/ui-maker)
  ![GitHub issues](https://img.shields.io/github/issues/jamiestegman/ui-maker)
  </span>

  <p align="center">
    UI Maker is an app that allows React devs to streamline development by visually creating components and generating ready-made code that they can paste into their projects.
    <br />
    <br />
    <a href="https://jamiestegman.github.io/ui-maker">Live Site</a>
    ·
    <a href="https://github.com/jamiestegman/ui-maker/issues">Report Bug</a>
    ·
    <a href="https://github.com/jamiestegman/ui-maker/issues">Request Feature</a>
  </p>
</p>

<br/>

## Table of Contents
  <ol>
    <li><a href="#features">Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
  </ol>

<br/>

## Features

- 🚀 **Fast**: Built using only React hooks and functional components.
- 😊 **Simple**: With no signup required, you can easily access UI Maker any time, any place.
- 👋 **Clear**: An easy-to-navigate UI, allowing for full usage with next to no learning time.
- 👫 **Cross-browser**: Works for most browsers, regardless of version.
- 📲 **Mobile-friendly**: Supports mobile devices and touch screens.


### Built With

* [React.js](https://reactjs.org/)
* [styled-components](https://styled-components.com/)

<br/>

## Getting Started

1. Visit the [live site](https://jamiestegman.github.io/ui-maker) and click 'Get Started'.
2. Choose a component type that you'd like to create.
3. Use the interface on the left to modify the preview on the right and turn options on or off using the switch to the left of the option name.
4. When you're satisfied with what you've created, click 'View Code' at the top of the preview pane.
  * Note: To instantly copy all code for the component, press the clipboard icon that appears in the top right.
5. Paste the code into a *ComponentName.js* file in your project and import it wherever you'd like to use it.

### Prerequisites

The code that UI Maker currently provides is designed to be integrated into a project using **React** and [styled-components](https://styled-components.com/).

<br/>

## Usage

Once you have pasted the code into a *ComponentName.js* file somewhere in your project, simply import it using:

```sh
import ComponentName from './ComponentName.js';
```
Simply replace './ComponentName.js' with the relative path of the new file that you've created.


### Props

Out of the box, UI Maker components have support for various props that you're able to pass in.

<ul>
  <li>
    <strong>Button</strong>
    <ul>
      <li><i>loading</i>: Shows a loading spinner and sets the button to a disabled state.</li>
    </ul>
  </li>
</ul>

<br/>

## Roadmap

So far, **UI Maker** supports creating *Button* components, however support for other components will likely be added with time.

These may include (but are not limited to):

* Dropdown/Popover
* Card/Panel
* Nav Menu
* Snackbar

Alongside the addition of other components, there are also ideas of including support for animations, other code types and the ability to share created components with others.

<br/>

## License

Distributed under the MIT License. See `LICENSE` for more information.