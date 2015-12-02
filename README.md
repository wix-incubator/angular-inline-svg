# AngularJS inline-svg component [![Build Status](https://travis-ci.org/alonn24/angular-inline-svg.svg?branch=master)](https://travis-ci.org/alonn24/angular-inline-svg)

* Include svg sprites one time at the top of the document.
* Use inline svg symbol using `<use>`.
* It is also possible to use angular binding, translations, directives, etc. in the svg sprite!

# Requirements
- AngularJS

# Usage
[bower](http://bower.io/) for dependency management.  Install and save to bower.json by running:
```
$ bower install angular-inline-svg --save
```
Add the module to your application:
```javascript
<script src="bower_components/angular-inline-svg/dist/ngInlineSvg.min.js"></script>
var myAppModule = angular.module('MyApp', ['inline-svg']);
```

Create a symbol sprite (e.g. `mySvgSymbols.html`) that looks like:
```html
<svg xmlns="http://www.w3.org/2000/svg">
  <g id="myCircle">
     // circle drawing
  </g>
  <g id="myRectange">
     // rectange drawing
  </g>
  <g id="myLogo">
     // logo drawing
  </g>
</svg>
```

Include the directive in your html:
```html
<inline-svg-symbol sprite="mySvgSymbols.html" symbol="'#myCircle'"/>
<inline-svg-symbol sprite="mySvgSymbols.html" symbol="'#myRectange'"/>
<inline-svg-symbol sprite="mySvgSymbols.html" symbol="'#myLogo'"/>
```

# Contribute
## Prepare your environment:
* Install Node.js and npm.
* Install global dev dependencies: npm install -g bower gulp
* Install local dev dependencies: npm install && bower install in repository directory

## Development commands:
* npm run build - to clean, jshint, build and test
* npm run serve - to watch src files to jshint, build and test when changed

When issuing a pull request, please exclude changes from the "dist" folder to avoid merge conflicts.
