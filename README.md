# AngularJS inline-svg component [![Build Status](https://travis-ci.org/alonn24/angular-inline-svg.svg?branch=master)](https://travis-ci.org/alonn24/angular-inline-svg)

* Include svg sprites one time at the top of the document.
* Add angular binding, translations, directives, etc. to the svg sprite.
* Use inline svg symbol using `<use>`.

# Requirements
- AngularJS

# Usage
We use [bower](http://bower.io/) for dependency management.  Install and save to bower.json by running:
```
$ bower install angular-inline-svg --save
```
Include the script from your `bower_components` folder:
```html
<script type="text/javascript" src="bower_components/angular-inline-svg/dist/ngInlineSvg.min.js"></script>
```
Add the module as a dependency to your application module:
```javascript
var myAppModule = angular.module('MyApp', ['inline-svg'])
```

Create a symbol sprite (e.g. `views/mySvgSymbols.html`) that loks like:
```html
<svg xmlns="http://www.w3.org/2000/svg">
  <g id="mySymbolId">
     // symbol drawing
  </g>
</svg>
```

Include a new symbol in your app:
```html
<inline-svg-symbol
		sprite="views/mySvgSymbols.html"
		symbol="'#mySymbolId'">
</inline-svg-symbol>
```
