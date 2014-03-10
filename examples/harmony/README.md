
# example.js

``` javascript
import { increment as inc } from './increment';
var a = 1;
inc(a); // 2
```

# increment.js

``` javascript
module "math" {
	export function add() {
		var sum = 0, i = 0, args = arguments, l = args.length;
		while (i < l) {
			sum += args[i++];
		}
		return sum;
	}
}

import { add } from 'math';
export function increment(val) {
    return add(val, 1);
};
```

# js/output.js

``` javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/ 	
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "js/";
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************!*\
  !*** ./example.js ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_IMPORTED_MODULE_0_47__ = __webpack_require__(/*! ./increment */ 1), inc = __WEBPACK_IMPORTED_MODULE_0_47__["increment"];
	var a = 1;
	inc(a); // 2

/***/ },
/* 1 */
/*!**********************!*\
  !*** ./increment.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	{ /* harmony module */ var __WEBPACK_LOCAL_MODULE_0__ = {}; !(function(exports) {{
		{function add() {
			var sum = 0, i = 0, args = arguments, l = args.length;
			while (i < l) {
				sum += args[i++];
			}
			return sum;
		};Object.defineProperty(exports, "add", {configurable: false, enumerable: true, get: function() { return add; }});}
	}}.call(this, __WEBPACK_LOCAL_MODULE_0__))}var add = __WEBPACK_LOCAL_MODULE_0__["add"];
	{function increment(val) {
	    return add(val, 1);
	};Object.defineProperty(exports, "increment", {configurable: false, enumerable: true, get: function() { return increment; }});};

/***/ }
/******/ ])
```

# Info

## Uncompressed

```
Hash: fbde5bc19aab9bff626c
Version: webpack 1.1.0-beta3
Time: 58ms
    Asset  Size  Chunks             Chunk Names
output.js  2556       0  [emitted]  main       
chunk    {0} output.js (main) 334 [rendered]
    > main [0] ./example.js 
    [0] ./example.js 73 {0} [built]
    [1] ./increment.js 261 {0} [built]
        harmony import ./increment [0] ./example.js 1:0-47
```

## Minimized (uglify-js, no zip)

```
Hash: 1b6641bb47aaa55ff2a2
Version: webpack 1.1.0-beta3
Time: 131ms
    Asset  Size  Chunks             Chunk Names
output.js   605       0  [emitted]  main       
chunk    {0} output.js (main) 334 [rendered]
    > main [0] ./example.js 
    [0] ./example.js 73 {0} [built]
    [1] ./increment.js 261 {0} [built]
        harmony import ./increment [0] ./example.js 1:0-47
```