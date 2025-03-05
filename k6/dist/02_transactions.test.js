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
  "default": () => (/* binding */ _02_transactions_test),
  options: () => (/* binding */ options)
});

;// CONCATENATED MODULE: external "k6"
const external_k6_namespaceObject = require("k6");
;// CONCATENATED MODULE: external "k6/http"
const http_namespaceObject = require("k6/http");
var http_default = /*#__PURE__*/__webpack_require__.n(http_namespaceObject);
;// CONCATENATED MODULE: ./src/02_transactions.test.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



// Configuration options for the load test
var options = {
  // Stages for ramping up/down VUs
  stages: [{
    duration: '30s',
    target: 20
  },
  // Ramp up to 20 VUs over 30s
  {
    duration: '1m',
    target: 20
  },
  // Stay at 20 VUs for 1 minute
  {
    duration: '30s',
    target: 0
  } // Ramp down to 0 VUs over 30s
  ],
  thresholds: {
    // Define performance thresholds
    http_req_duration: ['p(95)<1000'],
    // 95% of requests should be below 1s
    http_req_failed: ['rate<0.05'] // Error rate should be below 5%
  }
};

// Sample transaction data
var createTransaction = function createTransaction() {
  return {
    amount: Math.floor(Math.random() * 1000),
    description: "Transaction ".concat(new Date().toISOString()),
    type: Math.random() > 0.5 ? 'deposit' : 'withdrawal'
  };
};

// Environment variables (can be overridden with K6_VARS)
var API_BASE_URL = __ENV.API_BASE_URL || 'http://localhost:3000/api';
var WALLET_ID = __ENV.WALLET_ID || 'test-wallet-id';
/* harmony default export */ const _02_transactions_test = (function () {
  // Create transaction payload
  var payload = JSON.stringify(createTransaction());

  // Set headers
  var params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  // Send POST request
  var res = http_default().post("".concat(API_BASE_URL, "/wallets/").concat(WALLET_ID, "/transactions"), payload, params);

  // Verify the response
  (0,external_k6_namespaceObject.check)(res, {
    'status is 201': function statusIs201() {
      return res.status === 201;
    },
    // Expecting 201 Created
    'transaction created': function transactionCreated() {
      try {
        var body = JSON.parse(res.body);
        return body && _typeof(body) === 'object' && body.id !== undefined;
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
//# sourceMappingURL=02_transactions.test.js.map