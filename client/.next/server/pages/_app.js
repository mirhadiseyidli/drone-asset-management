/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var _styles_App_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/App.css */ \"./src/styles/App.css\");\n/* harmony import */ var _styles_App_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_App_css__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);\naxios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    const [isAuthenticated, setIsAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [csrfToken, setCsrfToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // Loading state to manage UI while fetching data\n    const fetchAuthAndCsrf = async ()=>{\n        try {\n            // Fetch CSRF token\n            // const csrfResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/csrf-token`, { withCredentials: true });\n            const csrfResponse = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"http://localhost:5002/api/csrf-token\", {\n                withCredentials: true\n            });\n            setCsrfToken(csrfResponse.data.csrfToken);\n            // Check if user is authenticated\n            // const authResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/check-auth`, { withCredentials: true });\n            const authResponse = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"http://localhost:5002/api/check-auth\", {\n                withCredentials: true\n            });\n            if (authResponse.data.user) {\n                setIsAuthenticated(true);\n            } else {\n                setIsAuthenticated(false);\n            }\n        } catch (error) {\n            console.error(\"Error during authentication or fetching CSRF token:\", error);\n            setIsAuthenticated(false);\n        } finally{\n            setLoading(false); // Stop loading once authentication check is complete\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchAuthAndCsrf();\n    }, []);\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Loading...\"\n        }, void 0, false, {\n            fileName: \"/Users/Mirhadi.Seyidli/Skydio/drone-asset-management/client/src/pages/_app.js\",\n            lineNumber: 38,\n            columnNumber: 12\n        }, this); // Show a loading state while authentication is being checked\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen flex flex-col relative h-screen w-full bg-white \",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex-grow z-10\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps,\n                isAuthenticated: isAuthenticated,\n                csrfToken: csrfToken\n            }, void 0, false, {\n                fileName: \"/Users/Mirhadi.Seyidli/Skydio/drone-asset-management/client/src/pages/_app.js\",\n                lineNumber: 44,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/Mirhadi.Seyidli/Skydio/drone-asset-management/client/src/pages/_app.js\",\n            lineNumber: 43,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/Mirhadi.Seyidli/Skydio/drone-asset-management/client/src/pages/_app.js\",\n        lineNumber: 42,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFDbEI7QUFDQztBQUUzQixTQUFTRyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLE1BQU0sQ0FBQ0MsaUJBQWlCQyxtQkFBbUIsR0FBR1AsK0NBQVFBLENBQUM7SUFDdkQsTUFBTSxDQUFDUSxXQUFXQyxhQUFhLEdBQUdULCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ1UsU0FBU0MsV0FBVyxHQUFHWCwrQ0FBUUEsQ0FBQyxPQUFPLGlEQUFpRDtJQUUvRixNQUFNWSxtQkFBbUI7UUFDdkIsSUFBSTtZQUNGLG1CQUFtQjtZQUNuQix3SEFBd0g7WUFDeEgsTUFBTUMsZUFBZSxNQUFNWCxpREFBUyxDQUFDLHdDQUF3QztnQkFBRWEsaUJBQWlCO1lBQUs7WUFDckdOLGFBQWFJLGFBQWFHLElBQUksQ0FBQ1IsU0FBUztZQUV4QyxpQ0FBaUM7WUFDakMsd0hBQXdIO1lBQ3hILE1BQU1TLGVBQWUsTUFBTWYsaURBQVMsQ0FBQyx3Q0FBd0M7Z0JBQUVhLGlCQUFpQjtZQUFLO1lBQ3JHLElBQUlFLGFBQWFELElBQUksQ0FBQ0UsSUFBSSxFQUFFO2dCQUMxQlgsbUJBQW1CO1lBQ3JCLE9BQU87Z0JBQ0xBLG1CQUFtQjtZQUNyQjtRQUNGLEVBQUUsT0FBT1ksT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMsdURBQXVEQTtZQUNyRVosbUJBQW1CO1FBQ3JCLFNBQVU7WUFDUkksV0FBVyxRQUFRLHFEQUFxRDtRQUMxRTtJQUNGO0lBRUFWLGdEQUFTQSxDQUFDO1FBQ1JXO0lBQ0YsR0FBRyxFQUFFO0lBRUwsSUFBSUYsU0FBUztRQUNYLHFCQUFPLDhEQUFDVztzQkFBSTs7Ozs7a0JBQWtCLDZEQUE2RDtJQUM3RjtJQUVBLHFCQUNFLDhEQUFDQTtRQUFJQyxXQUFVO2tCQUNiLDRFQUFDRDtZQUFJQyxXQUFVO3NCQUNiLDRFQUFDbEI7Z0JBQVcsR0FBR0MsU0FBUztnQkFBRUMsaUJBQWlCQTtnQkFBaUJFLFdBQVdBOzs7Ozs7Ozs7Ozs7Ozs7O0FBSS9FO0FBRUEsaUVBQWVMLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9zcmMvcGFnZXMvX2FwcC5qcz84ZmRhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0ICcuLi9zdHlsZXMvQXBwLmNzcyc7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICBjb25zdCBbaXNBdXRoZW50aWNhdGVkLCBzZXRJc0F1dGhlbnRpY2F0ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY3NyZlRva2VuLCBzZXRDc3JmVG9rZW5dID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTsgLy8gTG9hZGluZyBzdGF0ZSB0byBtYW5hZ2UgVUkgd2hpbGUgZmV0Y2hpbmcgZGF0YVxuXG4gIGNvbnN0IGZldGNoQXV0aEFuZENzcmYgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEZldGNoIENTUkYgdG9rZW5cbiAgICAgIC8vIGNvbnN0IGNzcmZSZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMfS9hcGkvY3NyZi10b2tlbmAsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pO1xuICAgICAgY29uc3QgY3NyZlJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjUwMDIvYXBpL2NzcmYtdG9rZW4nLCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcbiAgICAgIHNldENzcmZUb2tlbihjc3JmUmVzcG9uc2UuZGF0YS5jc3JmVG9rZW4pO1xuXG4gICAgICAvLyBDaGVjayBpZiB1c2VyIGlzIGF1dGhlbnRpY2F0ZWRcbiAgICAgIC8vIGNvbnN0IGF1dGhSZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMfS9hcGkvY2hlY2stYXV0aGAsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pO1xuICAgICAgY29uc3QgYXV0aFJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjUwMDIvYXBpL2NoZWNrLWF1dGgnLCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcbiAgICAgIGlmIChhdXRoUmVzcG9uc2UuZGF0YS51c2VyKSB7XG4gICAgICAgIHNldElzQXV0aGVudGljYXRlZCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldElzQXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBhdXRoZW50aWNhdGlvbiBvciBmZXRjaGluZyBDU1JGIHRva2VuOicsIGVycm9yKTtcbiAgICAgIHNldElzQXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpOyAvLyBTdG9wIGxvYWRpbmcgb25jZSBhdXRoZW50aWNhdGlvbiBjaGVjayBpcyBjb21wbGV0ZVxuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoQXV0aEFuZENzcmYoKTtcbiAgfSwgW10pO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIDxkaXY+TG9hZGluZy4uLjwvZGl2PjsgLy8gU2hvdyBhIGxvYWRpbmcgc3RhdGUgd2hpbGUgYXV0aGVudGljYXRpb24gaXMgYmVpbmcgY2hlY2tlZFxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBmbGV4IGZsZXgtY29sIHJlbGF0aXZlIGgtc2NyZWVuIHctZnVsbCBiZy13aGl0ZSBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1ncm93IHotMTBcIj5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSBpc0F1dGhlbnRpY2F0ZWQ9e2lzQXV0aGVudGljYXRlZH0gY3NyZlRva2VuPXtjc3JmVG9rZW59IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJheGlvcyIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiaXNBdXRoZW50aWNhdGVkIiwic2V0SXNBdXRoZW50aWNhdGVkIiwiY3NyZlRva2VuIiwic2V0Q3NyZlRva2VuIiwibG9hZGluZyIsInNldExvYWRpbmciLCJmZXRjaEF1dGhBbmRDc3JmIiwiY3NyZlJlc3BvbnNlIiwiZ2V0Iiwid2l0aENyZWRlbnRpYWxzIiwiZGF0YSIsImF1dGhSZXNwb25zZSIsInVzZXIiLCJlcnJvciIsImNvbnNvbGUiLCJkaXYiLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./src/styles/App.css":
/*!****************************!*\
  !*** ./src/styles/App.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();