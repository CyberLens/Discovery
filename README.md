# DiscØvery - CyberLens Software Tool

## A network security analysis and visualization tool

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

DiscØvery is security analysis tool for IoT and 5G systems. It is the active fork of [ASTo](https://github.com/Or3stis/apparatus). DiscØvery is build with
[electron](http://electron.atom.io/) and
[cytoscape.js](http://js.cytoscape.org/). The icons are provided by Google's [Material Design](https://material.io/icons/).

The application is in alpha stage. The focus now is to improve the core functionality of the application along with the introduction of additional features, to reach beta stage.

## Features

1. Graph-based visualization of IoT systems.
1. Model IoT systems in design and implementation engineering phases.
1. An automatic model transition between the two engineering phases.
1. Model IoT system state.
1. Automate implementation phase models generation using pcap-ng files.
1. Perform model-based vulnerability identification through CVE databases.
1. Generate automated model-based security insights.
1. Attribute-based pattern identification.
1. Search through graphs using a variety of options (concepts, modules, attributes).
1. Togglable Light and Dark theme.

Some screenshots

![DiscØvery home](https://github.com/CyberLens/Disc0very/blob/master/assets/screenShot1.png)

![DiscØvery UI 1](https://github.com/CyberLens/Disc0very/blob/master/assets/screenShot2.png)

![DiscØvery UI 2](https://github.com/CyberLens/Disc0very/blob/master/assets/screenShot3.png)

![DiscØvery UI 2](https://github.com/CyberLens/Disc0very/blob/master/assets/screenShot4.png)

## Console

DiscØvery has a command line console available on the bottom right corner of the app. You gain focus on the console by pressing the keybinding `cmd + l` for macOs and `ctrl + l` for Windows/Linux. If you type `help`, it will display a list of console options.

The console can be used to search for specific objects in the graph or perform operations. Raw text is used as search input. For example, if you type `device`, DiscØvery will highlight all the nodes in the graph that have the word `device` as an attribute.

All console commands must be preceded with a `:`. For example, typing `:insights` will perform the security insights functions. On the other hand, typing `insights` (without the `:`) will perform a search operation on the graph elements with the keyword `insights`.

## Color themes

DiscØvery supports a light and a dark color theme. The colors themes are based on Atom's [One Dark](https://github.com/atom/one-dark-syntax) and [One Light](https://github.com/atom/one-light-syntax). To switch between themes use the toggle button on the bottom left corner.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer. To download and install the app, type the following in your terminal:

```bash
# Clone this repository
git clone https://github.com/CyberLens/Disc0very.git
# Navigate into the repository
cd Disc0very
# Install dependencies
npm install
```

Different mode operations of the app.

```bash
# To run the app in the default mode
npm start
# To run the app in developer mode
npm run dev
# To build the app into binary
npm run dist
```

Because the app is still in prototype stage, it is best to keep up to date with the most recent commits. To do so, before starting the app, type:

```bash
# inside the Disc0very directory

# update to the latest
git pull
```

Once the app starts, the first window (home screen) will ask you to choose which modeling phase would you like to use. After you select a phase, you will be presented with three choices. The first is to create a new graph. The second choice is to load an existing graph. The third option is the debug app, which loads a default graph used for debugging purposes.

You will find some example graphs in the `sample` folder.

\- _Note in performance_. If you render a graph with more than a thousand nodes, depending on your hardware, you might detect some performance issues. The reason is that the default label rendering of nodes and edges in DiscØvery is quite expensive. Rendering label on nodes and edges along with directional arrows is CPU expensive. To improve performance, you can hide the labels and the directional arrows by pressing the `label` button.

You can find more information about Cytoscape's performance optimizations in this [link](http://js.cytoscape.org/#performance).

## Privacy Notice

The Software does not collect personal information of any kind.

The only network operation the application performs is when the vulnerability identification process is used. The vulnerability identification makes a network request to 'https://cve.circl.lu/api/search/' (can be changed in the settings), which maintains its own analytics.

## Contributing

If you want to contribute to the project,  that's great 😃. Check the [contributing](https://github.com/CyberLens/Disc0very/blob/master/CONTRIBUTING.md) guide. The application is being developed on macOs. That means that new commits might introduce breaking changes in other platforms. Especially commits that involve access to the file system. If something is not working, don't hesitate to create an [issue](https://github.com/CyberLens/Disc0very/issues).


## Thanks

A shoutout to [@NOMNUDS](https://github.com/NOMNUDS) and [@nickarg](https://github.com/nickarg) who provide the much-needed feedback on Windows.

### License [MIT](LICENSE.md)
