/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ create_persons_with_wallets_test),
  options: () => (/* binding */ options)
});

;// CONCATENATED MODULE: external "k6/http"
const http_namespaceObject = require("k6/http");
var http_default = /*#__PURE__*/__webpack_require__.n(http_namespaceObject);
;// CONCATENATED MODULE: external "k6"
const external_k6_namespaceObject = require("k6");
;// CONCATENATED MODULE: external "k6/execution"
const execution_namespaceObject = require("k6/execution");
var execution_default = /*#__PURE__*/__webpack_require__.n(execution_namespaceObject);
;// CONCATENATED MODULE: ./src/create_persons_with_wallets.test.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }




// const API_BASE_URL = __ENV.API_BASE_URL || 'https://perftest-371677414206.europe-central2.run.app/api';
var API_BASE_URL = __ENV.API_BASE_URL || 'http://192.168.1.12:8080/api';
function addPerson(index) {
  var person = JSON.stringify({
    firstName: 'FN' + index,
    lastName: 'LN' + index,
    email: index + '@spanner.1.gmail.com'
  });
  return http_default().post("".concat(API_BASE_URL, "/persons"), person, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    tags: {
      name: 'addPerson'
    }
  });
}
var options = {
  scenarios: {
    persons: {
      executor: 'shared-iterations',
      vus: 5,
      iterations: 100000,
      maxDuration: '5m'
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01']
  }
};
/* harmony default export */ const create_persons_with_wallets_test = (function () {
  var currentIndex = (execution_default()).scenario.iterationInInstance;
  var res = addPerson(currentIndex);

  // console.log(res.status)

  // console.log(JSON.parse(res.body as string).id)

  (0,external_k6_namespaceObject.check)(res, {
    'status is 200': function statusIs200() {
      return res.status === 200;
    },
    'person data is valid': function personDataIsValid() {
      try {
        var body = JSON.parse(res.body);
        return body && _typeof(body) === 'object' && body.id !== undefined && body.firstName !== undefined && body.lastName !== undefined && body.email !== undefined;
      } catch (_unused) {
        return false;
      }
    }
  });
});
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=create_persons_with_wallets.test.js.map