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
  "default": () => (/* binding */ _03_history_test),
  options: () => (/* binding */ options)
});

;// CONCATENATED MODULE: external "k6"
const external_k6_namespaceObject = require("k6");
;// CONCATENATED MODULE: external "k6/http"
const http_namespaceObject = require("k6/http");
var http_default = /*#__PURE__*/__webpack_require__.n(http_namespaceObject);
;// CONCATENATED MODULE: ./src/03_history.test.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



// Configuration options for the load test
var options = {
  // Stages for ramping up/down VUs
  stages: [{
    duration: '30s',
    target: 40
  },
  // Ramp up to 40 VUs over 30s
  {
    duration: '1m30s',
    target: 40
  },
  // Stay at 40 VUs for 1.5 minutes
  {
    duration: '30s',
    target: 0
  } // Ramp down to 0 VUs over 30s
  ],
  thresholds: {
    // Define performance thresholds
    http_req_duration: ['p(95)<700'],
    // 95% of requests should be below 700ms
    http_req_failed: ['rate<0.02'] // Error rate should be below 2%
  }
};

// Environment variables (can be overridden with K6_VARS)
var API_BASE_URL = __ENV.API_BASE_URL || 'http://localhost:3000/api';
var WALLET_ID = __ENV.WALLET_ID || 'test-wallet-id';
/* harmony default export */ const _03_history_test = (function () {
  // Simulate pagination with random page size and number
  var pageSize = [10, 20, 50][Math.floor(Math.random() * 3)];
  var page = Math.floor(Math.random() * 5) + 1; // Pages 1-5

  // Set headers and query parameters
  var params = {
    headers: {
      'Accept': 'application/json'
    },
    // Optional: Add query params for pagination/filtering
    params: _objectSpread({
      page: page.toString(),
      limit: pageSize.toString()
    }, Math.random() > 0.5 ? {
      sort: 'date:desc'
    } : {})
  };

  // Send GET request
  var res = http_default().get("".concat(API_BASE_URL, "/wallets/").concat(WALLET_ID, "/transactions"), params);

  // Verify the response
  (0,external_k6_namespaceObject.check)(res, {
    'status is 200': function statusIs200() {
      return res.status === 200;
    },
    'transactions data is valid': function transactionsDataIsValid() {
      try {
        var body = JSON.parse(res.body);
        return body && _typeof(body) === 'object' && Array.isArray(body.transactions || body.items || body.data || []);
      } catch (_unused) {
        return false;
      }
    },
    'pagination info is present': function paginationInfoIsPresent() {
      try {
        var _body$meta;
        var body = JSON.parse(res.body);
        return body && _typeof(body) === 'object' && (body.totalCount !== undefined || body.total !== undefined || ((_body$meta = body.meta) === null || _body$meta === void 0 ? void 0 : _body$meta.total) !== undefined);
      } catch (_unused2) {
        return false;
      }
    }
  });

  // Sleep between 1-2.5 seconds between requests
  (0,external_k6_namespaceObject.sleep)(Math.random() * 1.5 + 1);
});
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=03_history.test.js.map