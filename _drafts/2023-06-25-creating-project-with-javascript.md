## Objective



In this project we will use PenEditor project of and we will turn it to another project.
Which can edit json files with dynamicly transferring them to a table. We want to be able to manupilate data using table.
We will use datatables also. 

The complete work will get defined data as json and let us to manipilate through.

We ai

So I hope it will be a useful application written in javascript.

So basicly I want to turn datables.

I will document the whole process also. Wİth a help of chatgpt.


## Table Of Contents.

## Peneditor

We will use PenEditor project which uses BSD 3-Clause License.

Quote:
BSD 3-clause is a permissive licence. OSI states that it is supported by an important community of developers. 
BSD-3 allows you almost unlimited freedom with the software so long as you include the BSD copyright and license notice in it (found in Fulltext). 


First we need to download and copy the repository. Will clone repository with git.

$ git clone https://github.com/jojowwbb/PenEditor.git


## File Structure

* Source folder src and static folders. And following files.

```
src
static
.gitignore
LICENSE
README.en.md
README.md
babel.config.js
favicon.ico
package.json
webpack.config.js
webpack.config.local.js

```

The main folder contains several files and folders:

* src folder: This folder contains the source code of the React application.
* static folder: This folder likely contains static assets such as images, CSS files, and additional HTML files.
* .gitignore file: This file specifies which files and folders should be ignored by Git version control.
* LICENSE file: This file typically contains the license under which the code is distributed.
* README.en.md and README.md files: These files provide information, instructions, or documentation about the project, possibly in different languages.
* babel.config.js: This file is used to configure Babel, a tool for transpiling modern JavaScript code to be compatible with older browsers.
* favicon.ico: This is the favicon, an icon displayed in the browser tab or bookmark bar for the application.
* package.json file: This file lists the dependencies and other metadata about the project.
* webpack.config.js and webpack.config.local.js files: These files contain the configuration for webpack, a module bundler used to bundle the JavaScript code and other assets for deployment.

The src folder contains the main source code of the React application.

* index.js file: This file is the entry point of the application. It imports the necessary dependencies, sets up the code editors, handles user interactions, and renders the main component.
* template.html file: This file represents a typical HTML template used by the application. It includes a <div> element with the id root, where the React component will be rendered.
* pages folder: This folder contains additional files related to different pages or components used in the application. The specific files you mentioned (bulma.min.css, editor.png, formatting.js, icon.js, index.js, index.less, init.js, lib.js) could be part of the page or component implementations.


* The application appears to be a code editor with HTML, CSS, and JavaScript editors. 
* It allows users to write and run code, format the code, and view the output in a preview window. 
* The code editors are initialized with initial code provided in the init.js file. 
* The application uses React as the underlying JavaScript framework and webpack for bundling the code.


## How Does It Works?

Based on the provided source code, here's an overview of how the application works:

### Initialization:

* When the application starts, the index.js file is executed as the entry point.
* The necessary dependencies are imported, including React, ReactDOM, and other modules.
* The initCodeEditor function from the lib.js file is used to initialize the code editors for HTML, CSS, and JavaScript. These editors are assigned to staticRef.current.html, staticRef.current.css, and staticRef.current.js, respectively.

### User Interface:

* The user interface consists of a header section, code editor sections for HTML, CSS, and JavaScript, a preview section, and a console section.
* The header allows the user to switch between different code editor modes (JS, HTML, CSS) and provides options for saving, formatting, and running the code.
* The code editor sections (<textarea>) are initially populated with code from the init.js file. Users can modify the code in these editors.
* The preview section contains an iframe (<iframe>) that displays the rendered output of the code.
* The console section (<div id="console">) displays log messages, errors, and other console outputs.

### Functionality:

The user can switch between different code editor modes (JS, HTML, CSS) by clicking the corresponding icons in the header.
Code formatting: Clicking the format icon in the header (<IconFormat>) triggers the onFormat function, which formats the code in each editor using the autoFormatRange method.
Downloading code: Clicking the save icon in the header (<IconSave>) triggers the onDownload function. This function generates an HTML file by combining the HTML, CSS, and JavaScript code from the editors and any additional libraries specified in staticRef.current.lib. The generated file is then downloaded using the saveAs function from the file-saver module.
Running the code: Clicking the run icon in the header (<IconRun>) triggers the onRun function, which reloads the content of the preview iframe. This updates the rendered output based on the current state of the HTML, CSS, and JavaScript code.
Auto Run: The application provides an option to automatically run the code whenever changes are made. Enabling the "Auto Run" checkbox triggers the onAutoRun function, which checks if auto-run is enabled and then calls onRun to reload the preview iframe.

### Additional Functionality:

The application listens for messages sent via the window.postMessage method. If a message is received with a type of "log", "error", "info", or "warn", it appends the message content to the console section for displaying the console output.
This overview provides a general understanding of how the application works based on the provided source code. However, please note that there might be additional functionality or details not covered here, and the actual behavior of the application could be more complex or involve additional components or modules outside the provided files.

### Breakdown

template.html: This file represents a typical HTML template used as the entry point for the React application. It contains the basic structure of an HTML document, including the <head> and <body> sections. The <div id="root"></div> within the <body> tag is where the React application will be rendered.

index.js: This file is the entry point of the React application. It imports necessary dependencies (React and ReactDOM) and the App component from the ./pages/runjs file. The ReactDOM.render() function is used to render the App component into the HTML element with the id of "root", which is defined in template.html.


pages folder:

* bulma.min.css: This file appears to be a CSS file, possibly containing styles based on the Bulma CSS framework. It may be used for styling components or the overall application.
* editor.png: This file is likely an image file, potentially representing an icon or graphic related to the editor functionality.
* formatting.js: This file might contain JavaScript code related to formatting or manipulating the code within the editor or application.
* icon.js: This file could be a JavaScript module responsible for managing icons within the application, such as importing and rendering icon components.
* index.js: This file likely represents the main JavaScript file for the "runjs" page or component. It might contain the logic and JSX code responsible for rendering the content and functionality of the "runjs" page.
* index.less: This file may be a LESS stylesheet, used for styling the "runjs" page or component.
* init.js: This file could include initialization code or setup routines for the "runjs" page or component.
* lib.js: This file might contain utility functions or helper code used within the "runjs" page or component.

Please note that the exact functionality and purpose of these files can only be determined by reviewing their contents in detail. The information provided here is based on the filenames and the common conventions in React applications.


## .gitignore

The .gitignore file you provided contains patterns to specify files and directories that should be ignored by Git and not tracked in version control. Here's the breakdown of the patterns:

node_modules/: This pattern indicates that the node_modules directory, which typically contains the dependencies installed for a Node.js project, should be ignored. This is because dependencies can be easily reinstalled using the package.json file and the package-lock.json file (which is also ignored, as we'll see next).

.DS_Store: This pattern refers to a file created by macOS Finder to store custom attributes of a folder, such as the position of icons or window settings. It is specific to macOS and is typically not relevant for version control.

dist/: This pattern suggests that the dist directory, which often contains the bundled and optimized version of the application for production, should be ignored. This directory is typically generated during the build process and may not be required in version control since it can be recreated.

package-lock.json: This pattern specifies that the package-lock.json file, which is automatically generated by npm (Node Package Manager) or Yarn to lock down the versions of installed dependencies, should be ignored. This file is used to ensure consistent installations across different environments but is not typically required in version control, as it can be regenerated based on the package.json file.

By adding these patterns to the .gitignore file, the intention is to exclude these files and directories from being tracked by Git, keeping the repository cleaner and focused on the essential codebase.


## Breakdown


src: This is likely the source code directory where the main code of the project resides. It usually contains the application's JavaScript, CSS, and other assets.

static: React app, the "static" folder typically contains the static assets that are part of the finished build of the application. These assets could include images, CSS files, fonts, or other resources that are not dynamically generated by the application. During the development process, the static assets from this folder are usually copied or processed and then included in the final build of the React app. The purpose of this folder is to store the static files that will be served to users when they access the application.

.gitignore: This file is used by Git to specify which files and directories should be ignored and not tracked by version control. It typically includes files generated during the development process or containing sensitive information.

LICENSE: This file contains the license under which the project is distributed. It outlines the permissions and restrictions for using the codebase.

README.en.md and README.md: These files provide information about the project. README files often include a description of the project, installation instructions, usage examples, and other important details.

babel.config.js: This file is used for configuring Babel, a tool that helps convert modern JavaScript code into a compatible version that can run in older browsers or environments.

favicon.ico: This is the icon file that is displayed in the browser tab or bookmark bar for the corresponding website or web application.

package.json: This file is specific to Node.js projects and contains metadata about the project, as well as a list of dependencies and scripts required for building, testing, and running the application.

webpack.config.js: This file is used to configure Webpack, a popular module bundler. It defines how the project's assets are transformed, processed, and bundled for deployment.

webpack.config.local.js: This file might be an additional configuration file specific to local development. It could contain settings or overrides for the Webpack configuration used during local development.

These are the general functions of the files you provided, but please note that the specific contents and purposes may vary depending on the project and its development workflow.

## Other Notes.

* Readme says it uses React, CodeMirror, Bulma.css.
* npm install downloads a package and it's dependencies.
* https://www.stackchief.com/tutorials/npm%20install%20%7C%20how%20it%20works
* package.json
Lets check package.json. We see names of has babel, react, less.
* babel.config.js
* .gitignore file has this:

```
### Node Js ###
node_modules/
.DS_Store
dist/
package-lock.json
```

* webpack.config.js
* webpack.config.local.js
Also has favicon.ico, README.md and LICENSE.

## Source Code

Source Code depicts a basic React App.
There are two files named index.js and template.html and pages folder.

* template.html has typical html file with typical head with body which has <div id="root"></div> can be used by react.

```
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>PenEditor -- A simple editor</title>
		<meta name="keywords" content="code editor,html,css,javascript,jsedito,pen editor,PenEditor,peneditor,codepen,编辑器,代码编辑器" />
		<meta name="description" content="PenEditor(https://jojowwbb.github.io/pen/index.html):code editor,playground.一个极简的在线html/css/javascript代码编辑,演示平台" />
		<style>
			html,
			body {
				width: 100%;
				height: 100%;
				background: #323b44;
			}
		</style>
	</head>
	<body>
		<div id="root"></div>
	</body>
</html>
```

index.js cals react .

```
import React from "react";
import ReactDom from "react-dom";

import App from "./pages/runjs";

ReactDom.render(<App></App>, document.getElementById("root"));
```

Pages folder has following files.

```
bulma.min.css
editor.png
formatting.js
icon.js
index.js
index.less
init.js
lib.js
```

index.js and init.js is as follows.

index.js
```
import React, { useEffect, useCallback, useRef, useState } from "react";
import { saveAs } from "file-saver";
import Tooltip from "react-tooltip-lite";
import init from "./init";

import "./bulma.min.css";
import "./index.less";

import logo from "./editor.png";

import { initCodeEditor, createNode } from "./lib";

import { IconJavascript, IconHtml, IconCss, IconSave, IconFormat, IconRun } from "./icon";

export default () => {
	let [mode, setMode] = useState("js");
	let [isAuto, setAuto] = useState(false);

	let staticRef = useRef({
		isAuto: false,
		js: null,
		css: null,
		html: null,
		lib: ["https://unpkg.com/babel-standalone/babel.min.js", "https://unpkg.com/react/umd/react.development.js", "https://unpkg.com/react-dom/umd/react-dom.development.js"],
	});

	const onDownload = useCallback(() => {
		let lib = ``;
		staticRef.current.lib.map((item) => {
			lib += `<script src="${item}"></script>`;
		});
		let reset = ``;
		var html = `
				<!DOCTYPE html>
		<html lang="en">
			<head><style>${reset}</style><style>${staticRef.current.css.getValue()}</style></head>
			<body>${staticRef.current.html.getValue()}${lib}<script type="text/babel" data-presets="react">${staticRef.current.js.getValue()}</script></body>
		</html>`;

		var blob = new Blob([html], { type: "text/html; charset=utf-8" });
		saveAs(blob, `PenEditor-${new Date().getTime()}.html`);
	}, []);

	const onFormat = useCallback((type) => {
		let editor = staticRef.current[type];
		editor.execCommand("selectAll");
		editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
		editor.execCommand("goDocEnd");
	}, []);

	const onLoad = useCallback(() => {
		let iframe = document.getElementById("preview"),
			html = staticRef.current.html.getValue(),
			css = staticRef.current.css.getValue(),
			js = staticRef.current.js.getValue();
		var preview;
		if (iframe.contentDocument) {
			preview = iframe.contentDocument;
		} else if (iframe.contentWindow) {
			preview = iframe.contentWindow.document;
		} else {
			preview = iframe.document;
		}
		let lib = `<script src="static/console.js"></script>`;
		staticRef.current.lib.map((item) => {
			lib += `<script src="${item}"></script>`;
		});
		preview.open();
		preview.write(`${lib}${html}<script  type="text/babel" data-presets="react">${js}</script>`);
		preview.close();
		preview.head.innerHTML = `
			<link rel="stylesheet" href="./static/view.css">
			<style>${css}</style>
		`;
	}, []);

	const onRun = useCallback(() => {
		let iframe = document.getElementById("preview");
		iframe.contentWindow.location.reload(true);
	}, []);

	const onAutoRun = useCallback(() => {
		console.log(staticRef.current.isAuto);
		if (staticRef.current.isAuto) {
			onRun();
		}
	}, [isAuto]);

	useEffect(() => {
		window.addEventListener("message", function (data) {
			if (data.data && ["log", "error", "info",'warn'].includes(data.data.type)) {
				let console = document.getElementById("console");
				console.appendChild(createNode(data.data.data));
				console.scrollTop = console.scrollHeight;
			}
		});

		staticRef.current.js = initCodeEditor(document.getElementById("js"), "javascript", init.javascript, onAutoRun);
		staticRef.current.html = initCodeEditor(document.getElementById("html"), "htmlmixed", init.html, onAutoRun);
		staticRef.current.css = initCodeEditor(document.getElementById("css"), "css", init.css, onAutoRun);

		onFormat("js");
		onFormat("css");
		onFormat("html");

		onRun();
	}, []);

	return (
		<div className="runjs">
			<div className="runjs__header">
				<div class="nav center" style={{ paddingLeft: 20, width: 240 }}>
					<img style={{ height: 36 }} src={logo} alt="" />
					<div style={{ width: 40 }}></div>
					<Tooltip content="JS Editor">
						<div class={mode == "js" ? "tool-icon selected" : "tool-icon"} onClick={() => setMode("js")}>
							<IconJavascript></IconJavascript>
						</div>
					</Tooltip>
					<Tooltip content="Html Editor">
						<div class={mode == "html" ? "tool-icon selected" : "tool-icon"} onClick={() => setMode("html")}>
							<IconHtml></IconHtml>
						</div>
					</Tooltip>
					<Tooltip content="Css Editor">
						<div class={mode == "css" ? "tool-icon selected" : "tool-icon"} name="css" onClick={() => setMode("css")}>
							<IconCss></IconCss>
						</div>
					</Tooltip>
				</div>
				<div class="tool center" style={{ flex: 1 }}>
					<input
						onKeyDown={(e) => {
							if (e.keyCode == 13) {
								staticRef.current.lib.push(e.target.value);
								e.target.value = "";
							}
						}}
						placeholder="cdn js"
						type="text"
						style={{ width: 400 }}
					/>
					<label class="checkbox">
						<input
							checked={isAuto}
							onChange={(e) => {
								staticRef.current.isAuto = e.currentTarget.checked;
								setAuto(e.currentTarget.checked);
							}}
							type="checkbox"
							style={{ marginRight: 5 }}
						/>
						Auto Run
					</label>
				</div>
				<div class="menu" style={{ flex: 1 }}>
					<Tooltip content="Save as html file">
						<div class="tool-icon" onClick={onDownload}>
							<IconSave></IconSave>
						</div>
					</Tooltip>
					<Tooltip content="Format code">
						<div
							class="tool-icon"
							onClick={() => {
								onFormat("js");
								onFormat("html");
								onFormat("css");
							}}>
							<IconFormat></IconFormat>
						</div>
					</Tooltip>
					<Tooltip content="Run code">
						<div class="tool-icon" onClick={onRun}>
							<IconRun></IconRun>
						</div>
					</Tooltip>
				</div>
			</div>
			<div className="runjs__editor">
				<div id="html-wrap" style={{ visibility: mode == "html" ? "visible" : "hidden" }}>
					<textarea class="form-control" id="html"></textarea>
				</div>
				<div id="css-wrap" style={{ visibility: mode == "css" ? "visible" : "hidden" }}>
					<textarea class="form-control" id="css"></textarea>
				</div>
				<div id="js-wrap" style={{ visibility: mode == "js" ? "visible" : "hidden" }}>
					<textarea class="form-control" id="js"></textarea>
				</div>
			</div>
			<div className="runjs__preview">
				<iframe onLoad={onLoad} id="preview" src="./static/view.html" seamless width="100%" height="100%"></iframe>
			</div>
			<div className="runjs__console" id="console"></div>
		</div>
	);
};

```

init.js
```
export default {
	css: `body{
        background:#36404a;
        width:100%;
        height:100%;
    }
    .blend{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
    }
    h3{
        color:#fff;
    }
    p{
        color:rgba(255,255,255,0.75);
    }`,
	html: `<div id="root"></div>`,
	javascript: `function App() {
        console.log('Pen Editor');
        console.info('a simple code editor');
        console.warn('a simple code editor');
        console.error('a simple code editor');
        return (
            <div className="blend">
                <h3>Pen Editor</h3>
                <p>a simple code editor</p>
            </div>
        );
    }
    ReactDOM.render(<App />, document.getElementById("root"));
`,
};

```







* bulma.min.css is css of bulma.
* 



$ npm install


$ npm run dev

