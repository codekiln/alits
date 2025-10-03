var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function () { eval.call("\n(function() {\n  // Check if Promise already exists - typeof returns \"undefined\" for undeclared variables\n  if (typeof Promise !== 'undefined') {\n    return;\n  }\n  \n  // Max Task-based Promise implementation\n  function Max8Promise(executor) {\n    var self = this;\n    self.state = 'pending';\n    self.value = undefined;\n    self.handlers = [];\n    \n    function resolve(result) {\n      if (self.state === 'pending') {\n        self.state = 'fulfilled';\n        self.value = result;\n        self.handlers.forEach(handle);\n        self.handlers = null;\n      }\n    }\n    \n    function reject(error) {\n      if (self.state === 'pending') {\n        self.state = 'rejected';\n        self.value = error;\n        self.handlers.forEach(handle);\n        self.handlers = null;\n      }\n    }\n    \n    function handle(handler) {\n      if (self.state === 'pending') {\n        self.handlers.push(handler);\n      } else {\n        if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {\n          handler.onFulfilled(self.value);\n        }\n        if (self.state === 'rejected' && typeof handler.onRejected === 'function') {\n          handler.onRejected(self.value);\n        }\n      }\n    }\n    \n    this.then = function(onFulfilled, onRejected) {\n      return new Max8Promise(function(resolve, reject) {\n        handle({\n          onFulfilled: function(result) {\n            try {\n              resolve(onFulfilled ? onFulfilled(result) : result);\n            } catch (ex) {\n              reject(ex);\n            }\n          },\n          onRejected: function(error) {\n            try {\n              resolve(onRejected ? onRejected(error) : error);\n            } catch (ex) {\n              reject(ex);\n            }\n          }\n        });\n      });\n    };\n    \n    this.catch = function(onRejected) {\n      return this.then(null, onRejected);\n    };\n    \n    try {\n      executor(resolve, reject);\n    } catch (ex) {\n      reject(ex);\n    }\n  }\n  \n  Max8Promise.resolve = function(value) {\n    return new Max8Promise(function(resolve) {\n      resolve(value);\n    });\n  };\n  \n  Max8Promise.reject = function(reason) {\n    return new Max8Promise(function(resolve, reject) {\n      reject(reason);\n    });\n  };\n  \n  Max8Promise.all = function(promises) {\n    return new Max8Promise(function(resolve, reject) {\n      if (promises.length === 0) {\n        resolve([]);\n        return;\n      }\n      \n      var results = [];\n      var completed = 0;\n      \n      promises.forEach(function(promise, index) {\n        Max8Promise.resolve(promise).then(function(value) {\n          results[index] = value;\n          completed++;\n          if (completed === promises.length) {\n            resolve(results);\n          }\n        }, reject);\n      });\n    });\n  };\n  \n  // Register globally immediately\n  if (typeof global !== 'undefined') {\n    global.Promise = Max8Promise;\n  } else {\n    eval('Promise = Max8Promise');\n  }\n})();\n"); })();
// Test file for Max 8 Promise polyfill integration
// This file uses async/await to test the transformer
function testAsyncFunction() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    resolve("Async test successful");
                })];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, testAsyncFunction()];
                case 1:
                    result = _a.sent();
                    post('[TRANSFORM-TEST] ' + result + '\n');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    post('[TRANSFORM-TEST] Error: ' + error_1.message + '\n');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Max for Live entry point
function bang() {
    main();
}
