### Truss Router Example

#### init: function
To intiliaze router, Truss needs to be passed.
```
	TrussRouter.init(Truss);
```
------------

#### configure: function
Accepts two parameters
- Routes Config. Route needs to be defined as flat array of routes. Nested route names need to have their full name specified.
```
[
    { name: 'users',      path: '/users', moduleConfig: {}},
    { name: 'users.view', path: '/list', moduleConfig: {}},
    { name: 'users.list', path: '/view', moduleConfig: {}}
];
```
###### name & path
"name" and "path" are the mandatory attributes and should be unique for every route.

###### moduleConfig
moduleConfig is the configuration of module which should be passed to Truss to create instance. Its structure and its should be same as Truss expects.


- Router Options to control the behaviour of router. Sample config:
```
{
        useHash: true,
        hashPrefix: '!',
        defaultRoute: 'home',
        defaultParams: {},
        base: '',
        trailingSlash: false,
        autoCleanUp: true,
        strictQueryParams: true
}
```
###### Use of hash part of URL

Set useHash to true if you want the paths of your routes to be prefixed with a hash. You can also choose a hashPrefix which will be inserted between the path of a route and the hash. Those options will mostly be used by plugins such as router5-history.

###### Default route

When your router instance starts, it will navigate to a default route if such route is defined and if it cannot match the URL against a known route:

defaultRoute: the default route.
defaultParams: the default route params (defaults to {})
See navigation guide for more information.

###### Base path

You can specify what the base path of your application is. By default base is set to an empty string, meaning your route paths won't be prefixed by any path.

###### Optional trailing slashes

By default, the router is in "strict match" mode. If you want trailing slashes to be optional, you can set trailingSlash to a truthy value.

###### Automatic clean up

If autoCleanUp is set to true, the router will automatically clear canDeactivate functions / booleans when their associated segment becomes inactive.

###### Strict query parameters

Query parameters are optional, meaning a route can still be matched if a query parameter defined in its path is not present. However, if extra query parameters are present in the path which is being matched, matching will fail.

If you want the router to still match routes if extra query parameters are present, set strictQueryParams to false.

------------

#### reRegister: function
This function can be used to add more routes once router has been initialized. This accepts the falt route array in param and it should not duplicate any route which has been already registered.


#### start: function
To start the router. This method does not require any parameter.

#### stop: function
To stop router once router has been started.

#### getRouteParams: function
Returns the route parameters. Both url and query params.

#### getCurrentRoute: function
Returns name and path along with current route params.


### Router Example
In this example app, app.js is the entry file and routes.js contains all the routes.


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
