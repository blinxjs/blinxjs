### Extending Truss

We can extend the capability of using extensions. There are two types of extensions in Truss
- **Global Extension** - This adds the functionality over all the modules. Global extensions are nothing but a function which methods/property and those methods and properties get added over all the modules.
To register a global extension, Truss provides "use" method, which can be used as:
```javascript
	Truss.use(myCustomExtension);
```
In the above example myCustomExtension is a function which will get called whenever Truss initializes a module. myCustomExtension function will receive the module data as first parameter and it should return methods & properties which it intends to add over module.

- **Module Level Extensions** - Module level extensions are sort of plugins. Inject in the module where required and utilize it. Its usage is very much similar to jQuery plugins.


### Example
In this example we have created event-handler global extension, which adds capability to listen for dom events using configuration. Example:
```javascript
domEvents: {
		"click": [{
			"selectors": ["button"],
			"callback": "incrementCounter"
		}],
		"keyup": [{
			"selectors": [".text-input"],
			"which": [13],
			"extract": {
				value: "val"
			},
			"callback": "showConsoleMessage"
		},{
			"selectors": [".extract-input"],
			"extract": {
				value: "val",
				id: "getData#id",
				style: "attr#style"
			},
			"callback": "showConsoleMessage"
		}]
	}
```


#### How to run application.
Basic System Requirement: Your system should have NodeJs installed and if you dont have browse https://nodejs.org/en/ to dowload the installer. Make sure that node version is atleast 6.1.0. To check node version run this command
```
  node -v
```

Step 1: Install all the required dependencies using
```
  npm install
```
Step 2: Transpile the code.
```
  npm run dev
```
or to run in watch mode
```
  npm run dev:watch
```
Step 3: Run any static server in the appilcation directory and browse to url provided by static server.

If you dont have any static server installed, we recomment using http-server which can be installed using
```
  npm install -g http-server
```
and the run this command in the application directory
```
  http-server
```
By default http-server will listen on port 8080, so to browse the app hit localhost:8080 in your browser.

We highly recomment using Chrome canary which has better devtool support than any other browser. It can be downloaded from https://www.google.com/chrome/browser/canary.html


#### Concerns or Queries
Drop mail to truss-developers@flipkart.com for any kind of questions or support.
