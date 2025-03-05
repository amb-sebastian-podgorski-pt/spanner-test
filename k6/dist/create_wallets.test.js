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
  "default": () => (/* binding */ create_wallets_test),
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
;// CONCATENATED MODULE: external "k6/data"
const data_namespaceObject = require("k6/data");
;// CONCATENATED MODULE: external "https://jslib.k6.io/papaparse/5.1.1/index.js"
const index_js_namespaceObject = require("https://jslib.k6.io/papaparse/5.1.1/index.js");
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_namespaceObject);
;// CONCATENATED MODULE: ./src/create_wallets.test.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }




// @ts-ignore

var API_BASE_URL = __ENV.API_BASE_URL || 'https://perftest-371677414206.europe-central2.run.app/api';
function getPersonIds() {
  return new data_namespaceObject.SharedArray('persons', function () {
    return index_js_default().parse(open("persons.alloydb.csv"), {
      header: true
    }).data;
  });
}
var data = getPersonIds();
function addWallet(index, personId) {
  var wallet = JSON.stringify({
    name: 'WALLET_' + index,
    currency: 'EUR'
  });
  return http_default().post("".concat(API_BASE_URL, "/persons/").concat(personId, "/wallets"), wallet, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    tags: {
      name: 'addWallet'
    }
  });
}
var options = {
  scenarios: {
    persons: {
      executor: 'shared-iterations',
      vus: 50,
      iterations: 100000,
      maxDuration: '5m'
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01']
  }
};
/* harmony default export */ const create_wallets_test = (function () {
  var currentIndex = (execution_default()).scenario.iterationInInstance;
  var personId = data[currentIndex].id;
  var res = addWallet(currentIndex, personId);

  // console.log(personId)

  (0,external_k6_namespaceObject.check)(res, {
    'status is 200': function statusIs200() {
      return res.status === 200;
    },
    'wallet data is valid': function walletDataIsValid() {
      try {
        var body = JSON.parse(res.body);
        return body && _typeof(body) === 'object' && body.id !== undefined && body.name !== undefined && body.currency !== undefined && body.balance !== undefined;
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
//# sourceMappingURL=create_wallets.test.js.map