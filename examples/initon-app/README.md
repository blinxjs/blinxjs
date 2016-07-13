### Truss Example - initOn

##### initOn
- Accepts an object to configure.
- "eventName" is the mandatory field.
- "eventName" is the name of event on which we want to trigger the "callback"
- In case we need to listen for event from some particular module we can pass the container of that module as "eventPublisher"

This example demonstrate the usage of initOn to delay the invocation on render fucntion.

```javascript
"moduleName": "footerModule",
"instanceConfig": {
  "container": "#footer-container",
  "placeholders": {},
  "initOn": {
    "eventName": 'INIT_FOOTER_MODULE',
    "eventPublisher": '#content-container'
  }
},
"module": footerModuleInstance
```
In the above example, footer module is listening for "INIT_FOOTER_MODULE" triggered from module whose container is "#content-container" to invoke its render function.



##### Other features of Truss used in app
- app.js is the entry point for this application.
- Truss.createInstance which can be used to initialize any module.
- Default rendering capabilty of modules. If render function is not available on module and template is exposed to Truss then Truss will compile the template with provided data to generate the html and insert it inside container.
- Custom redering of modules - Modules can define their own render fuction and handle the way it requires to render the view. Modules content and head has its own render fuction in this app.


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
