### Truss Example - listensTo[RE_PLAY]

##### listensTo[RE_PLAY]
- Accepts an array of objects to configure.
- "eventName" and "callback" are the mandatory fields.
- "eventName" is the name of event on which we want to trigger the "callback" function.
- "callback" is the name of function present on module which needs to be invoked whenever the mentioned event is triggered.
- In case we need to listen for event from some particular module we can pass the container of that module as "eventPublisher"
- We can also provide a type of listensTo. Default is PLAY_AFTER_RENDER if its not provided.
- When type is provided as RE_PLAY, callback function will only be called after render but everytime callback function will be called, it will receive all the data which has been emitted till now in param as array.

app.js is the entry point for this application. Example demonstrate listensTo type "KEEP_ON".

- Function Invocation on event trigger using listensTo. Example:
```javascript
{
            "moduleName": "contentModule",
            "instanceConfig": {
                "container": "#content-container",
                "placeholders": {},
                "initOn": {
                    eventName: 'INIT_CONTENT_MODULE',
                    eventPublisher: '#header-container'
                },
                "listensTo" : [{
                    eventName: "ADD_TIMESTAMP",
                    eventPublisher: '#header-container',
                    callback: 'addTimestamp',
                    type: "RE_PLAY"
                }]
            },
            "module": contentModuleInstance
}
```
In the above example contentModule is listening for event "ADD_TIMESTAMP" from '#header-container'.
Whenver the event willbe triggered, it will invoke 'addTimestamp' function of the module.



##### Other features of Truss used in app
- Truss.createInstance which can be used to initialize any module.
- Default rendering capabilty of modules. If render function is not available on module and template is exposed to Truss then Truss will compile the template with provided data to generate the html and insert it inside container.
- Custom redering of modules - Modules can define their own render fuction and handle the way it requires to render the view. Modules content and head has its own render fuction in this app.
- Delayed render using initOn - Rendering of a module can be delayed using listensTo config. Whenever the event stated in the config is triggered, it will invoke the render function of module. Example:

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
