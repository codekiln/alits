// Max 8 Debug Build - @alits/core
// Build: 2025-09-21T08:44:21.065Z
// Git: caaa087
// Entrypoint: index-max8.ts
// Minified: No (Debug Build)
// Max 8 Compatible: Yes

'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var max8PromisePolyfill = {};

var hasRequiredMax8PromisePolyfill;

function requireMax8PromisePolyfill () {
	if (hasRequiredMax8PromisePolyfill) return max8PromisePolyfill;
	hasRequiredMax8PromisePolyfill = 1;
	// Max 8 compatible Promise polyfill
	// Uses Max's Task object instead of setTimeout

	(function() {
	    
	    // Check if Promise already exists
	    if (typeof Promise !== 'undefined') {
	        return;
	    }
	    
	    var PENDING = 'pending';
	    var FULFILLED = 'fulfilled';
	    var REJECTED = 'rejected';
	    
	    function Max8Promise(executor) {
	        this.state = PENDING;
	        this.value = undefined;
	        this.handlers = [];
	        
	        var self = this;
	        try {
	            executor(
	                function(value) { self.resolve(value); },
	                function(reason) { self.reject(reason); }
	            );
	        } catch (error) {
	            self.reject(error);
	        }
	    }
	    
	    Max8Promise.prototype.resolve = function(value) {
	        if (this.state === PENDING) {
	            this.state = FULFILLED;
	            this.value = value;
	            this.executeHandlers();
	        }
	    };
	    
	    Max8Promise.prototype.reject = function(reason) {
	        if (this.state === PENDING) {
	            this.state = REJECTED;
	            this.value = reason;
	            this.executeHandlers();
	        }
	    };
	    
	    Max8Promise.prototype.executeHandlers = function() {
	        var self = this;
	        var handlers = this.handlers.slice();
	        this.handlers = [];
	        
	        // Use Max Task object for async execution
	        var task = new Task(function() {
	            handlers.forEach(function(handler) {
	                try {
	                    if (self.state === FULFILLED) {
	                        handler.onFulfilled(self.value);
	                    } else if (self.state === REJECTED) {
	                        handler.onRejected(self.value);
	                    }
	                } catch (error) {
	                    // Handle errors in handlers
	                }
	            });
	        }, this);
	        
	        task.schedule(0); // Execute on next tick
	    };
	    
	    Max8Promise.prototype.then = function(onFulfilled, onRejected) {
	        var self = this;
	        
	        return new Max8Promise(function(resolve, reject) {
	            var handler = {
	                onFulfilled: function(value) {
	                    try {
	                        if (typeof onFulfilled === 'function') {
	                            resolve(onFulfilled(value));
	                        } else {
	                            resolve(value);
	                        }
	                    } catch (error) {
	                        reject(error);
	                    }
	                },
	                onRejected: function(reason) {
	                    try {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected(reason));
	                        } else {
	                            reject(reason);
	                        }
	                    } catch (error) {
	                        reject(error);
	                    }
	                }
	            };
	            
	            if (self.state === PENDING) {
	                self.handlers.push(handler);
	            } else {
	                self.executeHandlers();
	            }
	        });
	    };
	    
	    Max8Promise.prototype.catch = function(onRejected) {
	        return this.then(null, onRejected);
	    };
	    
	    Max8Promise.resolve = function(value) {
	        return new Max8Promise(function(resolve) {
	            resolve(value);
	        });
	    };
	    
	    Max8Promise.reject = function(reason) {
	        return new Max8Promise(function(resolve, reject) {
	            reject(reason);
	        });
	    };
	    
	    Max8Promise.all = function(promises) {
	        return new Max8Promise(function(resolve, reject) {
	            if (!Array.isArray(promises)) {
	                reject(new TypeError('Promise.all requires an array'));
	                return;
	            }
	            
	            if (promises.length === 0) {
	                resolve([]);
	                return;
	            }
	            
	            var results = new Array(promises.length);
	            var completed = 0;
	            
	            promises.forEach(function(promise, index) {
	                Max8Promise.resolve(promise).then(function(value) {
	                    results[index] = value;
	                    completed++;
	                    if (completed === promises.length) {
	                        resolve(results);
	                    }
	                }, reject);
	            });
	        });
	    };
	    
	    // Set global Promise - Max 8 compatible
	    if (typeof commonjsGlobal !== 'undefined') {
	        commonjsGlobal.Promise = Max8Promise;
	    } else if (typeof window !== 'undefined') {
	        window.Promise = Max8Promise;
	    } else {
	        // Fallback for Max 8 environment
	        try {
	            this.Promise = Max8Promise;
	        } catch (e) {
	            // Max 8 doesn't have global 'this', use alternative
	            if (typeof Promise === 'undefined') {
	                // Create global Promise if it doesn't exist
	                eval('Promise = Max8Promise');
	            }
	        }
	    }
	    
	})();
	return max8PromisePolyfill;
}

requireMax8PromisePolyfill();

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function isFunction(value) {
    return typeof value === 'function';
}

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if (isFunction(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}

var config = {
    Promise: undefined};

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function (handle) {
        return (clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        {
            throw err;
        }
    });
}

function noop() { }

function errorContext(cb) {
    {
        cb();
    }
}

var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) ;
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
function handleUnhandledError(error) {
    {
        reportUnhandledError(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

function identity(x) {
    return x;
}

function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

function isInteropObservable(input) {
    return isFunction(input[observable]);
}

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();

function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

function innerFrom(input) {
    if (input instanceof Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable(function (subscriber) {
        var obs = obj[observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(Subscriber));

function map(project, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}

var ObjectUnsubscribedError = createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                }
                try {
                    for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var observer = _c.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
            return EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription(function () {
            _this.currentObservers = null;
            arrRemove(observers, subscriber);
        });
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

function distinctUntilChanged(comparator, keySelector) {
    if (keySelector === void 0) { keySelector = identity; }
    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
    return operate(function (source, subscriber) {
        var previousKey;
        var first = true;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            var currentKey = keySelector(value);
            if (first || !comparator(previousKey, currentKey)) {
                first = false;
                previousKey = currentKey;
                subscriber.next(value);
            }
        }));
    });
}
function defaultCompare(a, b) {
    return a === b;
}

var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(Subject));

function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection;
        var resetConnection;
        var subject;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = undefined;
        };
        var reset = function () {
            cancelReset();
            connection = subject = undefined;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return operate(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection &&
                refCount > 0) {
                connection = new SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                innerFrom(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return;
    }
    if (on === false) {
        return;
    }
    var onSubscriber = new SafeSubscriber({
        next: function () {
            onSubscriber.unsubscribe();
            reset();
        },
    });
    return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}

function fromEventPattern(addHandler, removeHandler, resultSelector) {
    return new Observable(function (subscriber) {
        var handler = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue = addHandler(handler);
        return isFunction(removeHandler) ? function () { return removeHandler(handler, retValue); } : undefined;
    });
}

/**
 * Observable property helper for LiveAPI objects
 * Creates RxJS observables for LiveAPI object properties
 */
var ObservablePropertyHelper = /** @class */ (function () {
    function ObservablePropertyHelper() {
    }
    /**
     * Observe a property on a LiveAPI object
     * @param liveObject The LiveAPI object to observe
     * @param propertyName The property name to observe
     * @returns Observable that emits when the property changes
     */
    ObservablePropertyHelper.observeProperty = function (liveObject, propertyName) {
        if (!liveObject || typeof liveObject !== 'object') {
            throw new Error('LiveAPI object must be a valid object');
        }
        if (!propertyName || typeof propertyName !== 'string') {
            throw new Error('Property name must be a non-empty string');
        }
        var key = "".concat(liveObject.id || 'unknown', ".").concat(propertyName);
        // Return existing observable if already created
        if (this.subscriptions[key]) {
            return this.createPropertyObservable(liveObject, propertyName);
        }
        return this.createPropertyObservable(liveObject, propertyName);
    };
    /**
     * Create a property observable for a LiveAPI object
     * @param liveObject The LiveAPI object
     * @param propertyName The property name
     * @returns Observable for the property
     */
    ObservablePropertyHelper.createPropertyObservable = function (liveObject, propertyName) {
        "".concat(liveObject.id || 'unknown', ".").concat(propertyName);
        return fromEventPattern(function (handler) {
            // Subscribe to property changes
            if (liveObject.addListener) {
                liveObject.addListener(propertyName, handler);
            }
            else if (liveObject.on) {
                liveObject.on("change:".concat(propertyName), handler);
            }
            else {
                // Fallback: poll the property value
                var interval = setInterval(function () {
                    var currentValue = liveObject[propertyName];
                    if (currentValue !== undefined) {
                        handler(currentValue);
                    }
                }, 100); // Poll every 100ms
                // Store interval for cleanup
                liveObject._pollInterval = interval;
            }
        }, function (handler) {
            // Unsubscribe from property changes
            if (liveObject.removeListener) {
                liveObject.removeListener(propertyName, handler);
            }
            else if (liveObject.off) {
                liveObject.off("change:".concat(propertyName), handler);
            }
            else if (liveObject._pollInterval) {
                clearInterval(liveObject._pollInterval);
                delete liveObject._pollInterval;
            }
        }).pipe(distinctUntilChanged(), share());
    };
    /**
     * Observe multiple properties on a LiveAPI object
     * @param liveObject The LiveAPI object to observe
     * @param propertyNames Array of property names to observe
     * @returns Observable that emits when any property changes
     */
    ObservablePropertyHelper.observeProperties = function (liveObject, propertyNames) {
        var _this = this;
        if (!Array.isArray(propertyNames) || propertyNames.length === 0) {
            throw new Error('Property names must be a non-empty array');
        }
        var observables = propertyNames.map(function (name) {
            return _this.observeProperty(liveObject, name).pipe(map(function (value) {
                var _a;
                return (_a = {}, _a[name] = value, _a);
            }));
        });
        return new Observable(function (subscriber) {
            var subscriptions = observables.map(function (obs) {
                return obs.subscribe(function (change) {
                    subscriber.next(change);
                });
            });
            return function () {
                subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
            };
        });
    };
    /**
     * Create a behavior subject for a property with initial value
     * @param liveObject The LiveAPI object
     * @param propertyName The property name
     * @param initialValue Initial value for the behavior subject
     * @returns BehaviorSubject for the property
     */
    ObservablePropertyHelper.createBehaviorSubject = function (liveObject, propertyName, initialValue) {
        var subject = new BehaviorSubject(initialValue);
        var observable = this.observeProperty(liveObject, propertyName);
        var subscription = observable.subscribe(function (value) {
            subject.next(value);
        });
        // Store subscription for cleanup
        var key = "".concat(liveObject.id || 'unknown', ".").concat(propertyName, ".behavior");
        this.subscriptions[key] = subscription;
        return subject;
    };
    /**
     * Clean up all subscriptions for a LiveAPI object
     * @param liveObject The LiveAPI object
     */
    ObservablePropertyHelper.cleanup = function (liveObject) {
        var e_1, _a;
        var objectId = liveObject.id || 'unknown';
        var keys = Object.keys(this.subscriptions);
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                if (key.startsWith(objectId)) {
                    this.subscriptions[key].unsubscribe();
                    delete this.subscriptions[key];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Clean up all subscriptions
     */
    ObservablePropertyHelper.cleanupAll = function () {
        var e_2, _a;
        var keys = Object.keys(this.subscriptions);
        try {
            for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                var key = keys_2_1.value;
                this.subscriptions[key].unsubscribe();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.subscriptions = {};
    };
    /**
     * Get the current value of a property
     * @param liveObject The LiveAPI object
     * @param propertyName The property name
     * @returns Current property value
     */
    ObservablePropertyHelper.getCurrentValue = function (liveObject, propertyName) {
        if (!liveObject || typeof liveObject !== 'object') {
            throw new Error('LiveAPI object must be a valid object');
        }
        return liveObject[propertyName];
    };
    /**
     * Set a property value on a LiveAPI object
     * @param liveObject The LiveAPI object
     * @param propertyName The property name
     * @param value The new value
     */
    ObservablePropertyHelper.setValue = function (liveObject, propertyName, value) {
        if (!liveObject || typeof liveObject !== 'object') {
            throw new Error('LiveAPI object must be a valid object');
        }
        if (liveObject.set) {
            liveObject.set(propertyName, value);
        }
        else {
            liveObject[propertyName] = value;
        }
    };
    ObservablePropertyHelper.subscriptions = {};
    return ObservablePropertyHelper;
}());
/**
 * Convenience function for observing a single property
 * @param liveObject The LiveAPI object to observe
 * @param propertyName The property name to observe
 * @returns Observable that emits when the property changes
 */
function observeProperty(liveObject, propertyName) {
    return ObservablePropertyHelper.observeProperty(liveObject, propertyName);
}
/**
 * Convenience function for observing multiple properties
 * @param liveObject The LiveAPI object to observe
 * @param propertyNames Array of property names to observe
 * @returns Observable that emits when any property changes
 */
function observeProperties(liveObject, propertyNames) {
    return ObservablePropertyHelper.observeProperties(liveObject, propertyNames);
}

/**
 * LiveSet abstraction for interacting with Ableton Live's LiveAPI
 * Provides async/await API for Live Object Model operations
 */
var LiveSetImpl = /** @class */ (function () {
    function LiveSetImpl(liveObject) {
        this.tracks = [];
        this.scenes = [];
        this.tempo = 120;
        this.timeSignature = { numerator: 4, denominator: 4 };
        if (!liveObject) {
            throw new Error('LiveAPI object is required');
        }
        this.liveObject = liveObject;
        this.id = liveObject.id || "liveset_".concat(Date.now());
        this.initializeLiveSet();
    }
    /**
     * Initialize the LiveSet with current LiveAPI data
     */
    LiveSetImpl.prototype.initializeLiveSet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.loadTracks()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadScenes()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.loadTempo()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loadTimeSignature()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error('Failed to initialize LiveSet:', error_1);
                        errorMessage = error_1 instanceof Error ? error_1.message : String(error_1);
                        throw new Error("Failed to initialize LiveSet: ".concat(errorMessage));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Load tracks from LiveAPI
     */
    LiveSetImpl.prototype.loadTracks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_2, errorMessage;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!(this.liveObject.tracks && Array.isArray(this.liveObject.tracks))) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, Promise.all(this.liveObject.tracks.map(function (trackObj) { return __awaiter(_this, void 0, void 0, function () {
                                var track;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            track = new TrackImpl(trackObj);
                                            return [4 /*yield*/, track.initialize()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, track];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.tracks = _b.sent();
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.error('Failed to load tracks:', error_2);
                        errorMessage = error_2 instanceof Error ? error_2.message : String(error_2);
                        throw new Error("Failed to load tracks: ".concat(errorMessage));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Load scenes from LiveAPI
     */
    LiveSetImpl.prototype.loadScenes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_3, errorMessage;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!(this.liveObject.scenes && Array.isArray(this.liveObject.scenes))) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, Promise.all(this.liveObject.scenes.map(function (sceneObj) { return __awaiter(_this, void 0, void 0, function () {
                                var scene;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            scene = new SceneImpl(sceneObj);
                                            return [4 /*yield*/, scene.initialize()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, scene];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.scenes = _b.sent();
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        console.error('Failed to load scenes:', error_3);
                        errorMessage = error_3 instanceof Error ? error_3.message : String(error_3);
                        throw new Error("Failed to load scenes: ".concat(errorMessage));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Load tempo from LiveAPI
     */
    LiveSetImpl.prototype.loadTempo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errorMessage;
            return __generator(this, function (_a) {
                try {
                    if (this.liveObject.tempo !== undefined) {
                        this.tempo = this.liveObject.tempo;
                    }
                }
                catch (error) {
                    console.error('Failed to load tempo:', error);
                    errorMessage = error instanceof Error ? error.message : String(error);
                    throw new Error("Failed to load tempo: ".concat(errorMessage));
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Load time signature from LiveAPI
     */
    LiveSetImpl.prototype.loadTimeSignature = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errorMessage;
            return __generator(this, function (_a) {
                try {
                    if (this.liveObject.time_signature_numerator && this.liveObject.time_signature_denominator) {
                        this.timeSignature = {
                            numerator: this.liveObject.time_signature_numerator,
                            denominator: this.liveObject.time_signature_denominator
                        };
                    }
                }
                catch (error) {
                    console.error('Failed to load time signature:', error);
                    errorMessage = error instanceof Error ? error.message : String(error);
                    throw new Error("Failed to load time signature: ".concat(errorMessage));
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Get a track by index
     * @param index Track index
     * @returns Track at the specified index
     */
    LiveSetImpl.prototype.getTrack = function (index) {
        if (index >= 0 && index < this.tracks.length) {
            return this.tracks[index];
        }
        return null;
    };
    /**
     * Get a track by name
     * @param name Track name
     * @returns Track with the specified name
     */
    LiveSetImpl.prototype.getTrackByName = function (name) {
        return this.tracks.find(function (track) { return track.name === name; }) || null;
    };
    /**
     * Get a scene by index
     * @param index Scene index
     * @returns Scene at the specified index
     */
    LiveSetImpl.prototype.getScene = function (index) {
        if (index >= 0 && index < this.scenes.length) {
            return this.scenes[index];
        }
        return null;
    };
    /**
     * Get a scene by name
     * @param name Scene name
     * @returns Scene with the specified name
     */
    LiveSetImpl.prototype.getSceneByName = function (name) {
        return this.scenes.find(function (scene) { return scene.name === name; }) || null;
    };
    /**
     * Set the tempo
     * @param tempo New tempo value
     */
    LiveSetImpl.prototype.setTempo = function (tempo) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!this.liveObject.set) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.liveObject.set('tempo', tempo)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.liveObject.tempo = tempo;
                        _a.label = 3;
                    case 3:
                        this.tempo = tempo;
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.error('Failed to set tempo:', error_4);
                        errorMessage = error_4 instanceof Error ? error_4.message : String(error_4);
                        throw new Error("Failed to set tempo: ".concat(errorMessage));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set the time signature
     * @param numerator Time signature numerator
     * @param denominator Time signature denominator
     */
    LiveSetImpl.prototype.setTimeSignature = function (numerator, denominator) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!this.liveObject.set) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.liveObject.set('time_signature_numerator', numerator)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.liveObject.set('time_signature_denominator', denominator)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.liveObject.time_signature_numerator = numerator;
                        this.liveObject.time_signature_denominator = denominator;
                        _a.label = 4;
                    case 4:
                        this.timeSignature = { numerator: numerator, denominator: denominator };
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        console.error('Failed to set time signature:', error_5);
                        errorMessage = error_5 instanceof Error ? error_5.message : String(error_5);
                        throw new Error("Failed to set time signature: ".concat(errorMessage));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Observe tempo changes
     * @returns Observable that emits tempo changes
     */
    LiveSetImpl.prototype.observeTempo = function () {
        return observeProperty(this.liveObject, 'tempo');
    };
    /**
     * Observe time signature changes
     * @returns Observable that emits time signature changes
     */
    LiveSetImpl.prototype.observeTimeSignature = function () {
        return ObservablePropertyHelper.observeProperties(this.liveObject, ['time_signature_numerator', 'time_signature_denominator']).pipe(map(function (values) { return ({
            numerator: values.time_signature_numerator || 4,
            denominator: values.time_signature_denominator || 4
        }); }));
    };
    /**
     * Clean up resources
     */
    LiveSetImpl.prototype.cleanup = function () {
        ObservablePropertyHelper.cleanup(this.liveObject);
        this.tracks.forEach(function (track) { return track.cleanup(); });
        this.scenes.forEach(function (scene) { return scene.cleanup(); });
    };
    return LiveSetImpl;
}());
/**
 * Track implementation
 */
var TrackImpl = /** @class */ (function () {
    function TrackImpl(liveObject) {
        this.name = '';
        this.volume = 1;
        this.pan = 0;
        this.mute = false;
        this.solo = false;
        this.devices = [];
        this.clips = [];
        this.liveObject = liveObject;
        this.id = liveObject.id || "track_".concat(Date.now());
    }
    TrackImpl.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.name = this.liveObject.name || '';
                        this.volume = this.liveObject.volume || 1;
                        this.pan = this.liveObject.pan || 0;
                        this.mute = this.liveObject.mute || false;
                        this.solo = this.liveObject.solo || false;
                        return [4 /*yield*/, this.loadDevices()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadClips()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TrackImpl.prototype.loadDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.liveObject.devices && Array.isArray(this.liveObject.devices))) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, Promise.all(this.liveObject.devices.map(function (deviceObj) { return __awaiter(_this, void 0, void 0, function () {
                                var device;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            device = new DeviceImpl(deviceObj);
                                            return [4 /*yield*/, device.initialize()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, device];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.devices = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    TrackImpl.prototype.loadClips = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.liveObject.clips && Array.isArray(this.liveObject.clips))) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, Promise.all(this.liveObject.clips.map(function (clipObj) { return __awaiter(_this, void 0, void 0, function () {
                                var clip;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            clip = new ClipImpl(clipObj);
                                            return [4 /*yield*/, clip.initialize()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, clip];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.clips = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    TrackImpl.prototype.cleanup = function () {
        ObservablePropertyHelper.cleanup(this.liveObject);
        this.devices.forEach(function (device) { return device.cleanup(); });
        this.clips.forEach(function (clip) { return clip.cleanup(); });
    };
    return TrackImpl;
}());
/**
 * Scene implementation
 */
var SceneImpl = /** @class */ (function () {
    function SceneImpl(liveObject) {
        this.name = '';
        this.color = 0;
        this.isSelected = false;
        this.liveObject = liveObject;
        this.id = liveObject.id || "scene_".concat(Date.now());
    }
    SceneImpl.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.name = this.liveObject.name || '';
                this.color = this.liveObject.color || 0;
                this.isSelected = this.liveObject.is_selected || false;
                return [2 /*return*/];
            });
        });
    };
    SceneImpl.prototype.cleanup = function () {
        ObservablePropertyHelper.cleanup(this.liveObject);
    };
    return SceneImpl;
}());
/**
 * Device implementation
 */
var DeviceImpl = /** @class */ (function () {
    function DeviceImpl(liveObject) {
        this.name = '';
        this.type = '';
        this.parameters = [];
        this.liveObject = liveObject;
        this.id = liveObject.id || "device_".concat(Date.now());
    }
    DeviceImpl.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.name = this.liveObject.name || '';
                this.type = this.liveObject.type || '';
                if (this.liveObject.parameters && Array.isArray(this.liveObject.parameters)) {
                    this.parameters = this.liveObject.parameters.map(function (paramObj) { return ({
                        id: paramObj.id || "param_".concat(Date.now()),
                        liveObject: paramObj,
                        name: paramObj.name || '',
                        value: paramObj.value || 0,
                        min: paramObj.min || 0,
                        max: paramObj.max || 1,
                        unit: paramObj.unit || ''
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    DeviceImpl.prototype.cleanup = function () {
        ObservablePropertyHelper.cleanup(this.liveObject);
    };
    return DeviceImpl;
}());
/**
 * Clip implementation
 */
var ClipImpl = /** @class */ (function () {
    function ClipImpl(liveObject) {
        this.name = '';
        this.length = 0;
        this.startTime = 0;
        this.isPlaying = false;
        this.isRecording = false;
        this.liveObject = liveObject;
        this.id = liveObject.id || "clip_".concat(Date.now());
    }
    ClipImpl.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.name = this.liveObject.name || '';
                this.length = this.liveObject.length || 0;
                this.startTime = this.liveObject.start_time || 0;
                this.isPlaying = this.liveObject.is_playing || false;
                this.isRecording = this.liveObject.is_recording || false;
                return [2 /*return*/];
            });
        });
    };
    ClipImpl.prototype.cleanup = function () {
        ObservablePropertyHelper.cleanup(this.liveObject);
    };
    return ClipImpl;
}());

/**
 * MIDI note name mapping
 */
var NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
/**
 * MIDI note utilities for conversion between note numbers and names
 */
var MIDIUtils = /** @class */ (function () {
    function MIDIUtils() {
    }
    /**
     * Convert MIDI note number to note name
     * @param noteNumber MIDI note number (0-127)
     * @returns Note name with octave (e.g., "C4", "F#3")
     */
    MIDIUtils.noteNumberToName = function (noteNumber) {
        if (isNaN(noteNumber) || noteNumber < 0 || noteNumber > 127) {
            throw new Error("Invalid MIDI note number: ".concat(noteNumber, ". Must be between 0 and 127."));
        }
        var octave = Math.floor(noteNumber / 12) - 1;
        var noteIndex = noteNumber % 12;
        var noteName = NOTE_NAMES[noteIndex];
        return "".concat(noteName).concat(octave);
    };
    /**
     * Convert note name to MIDI note number
     * @param noteName Note name (e.g., "C4", "F#3", "Bb2")
     * @returns MIDI note number (0-127)
     */
    MIDIUtils.noteNameToNumber = function (noteName) {
        if (!noteName || typeof noteName !== 'string') {
            throw new Error('Note name must be a non-empty string');
        }
        // Parse note name (e.g., "C4", "F#3", "Bb2", "C-1")
        var match = noteName.match(/^([A-Z])([#b]?)(-?\d+)$/i);
        if (!match) {
            throw new Error("Invalid note name format: ".concat(noteName, ". Expected format like \"C4\", \"F#3\", \"Bb2\", or \"C-1\""));
        }
        var _a = __read(match, 4), baseNote = _a[1], accidental = _a[2], octaveStr = _a[3];
        var octave = parseInt(octaveStr, 10);
        if (octave < -1 || octave > 9) {
            throw new Error("Invalid octave: ".concat(octave, ". Must be between -1 and 9."));
        }
        // Find base note index
        var baseNoteIndex = NOTE_NAMES.findIndex(function (note) { return note === baseNote.toUpperCase(); });
        if (baseNoteIndex === -1) {
            throw new Error("Invalid base note: ".concat(baseNote));
        }
        // Apply accidental
        var noteIndex = baseNoteIndex;
        if (accidental === '#') {
            noteIndex = (noteIndex + 1) % 12;
        }
        else if (accidental === 'b') {
            noteIndex = (noteIndex - 1 + 12) % 12;
        }
        // Calculate MIDI note number
        var midiNoteNumber = (octave + 1) * 12 + noteIndex;
        if (midiNoteNumber < 0 || midiNoteNumber > 127) {
            throw new Error("Resulting MIDI note number ".concat(midiNoteNumber, " is out of range (0-127)"));
        }
        return midiNoteNumber;
    };
    /**
     * Get detailed MIDI note information
     * @param noteNumber MIDI note number (0-127)
     * @returns Detailed MIDI note information
     */
    MIDIUtils.getMIDINoteInfo = function (noteNumber) {
        if (noteNumber < 0 || noteNumber > 127) {
            throw new Error("Invalid MIDI note number: ".concat(noteNumber, ". Must be between 0 and 127."));
        }
        var octave = Math.floor(noteNumber / 12) - 1;
        var noteIndex = noteNumber % 12;
        var noteName = NOTE_NAMES[noteIndex];
        var fullName = "".concat(noteName).concat(octave);
        return {
            number: noteNumber,
            name: fullName,
            octave: octave,
            noteName: noteName
        };
    };
    /**
     * Get all note names in a given octave
     * @param octave Octave number (-1 to 9)
     * @returns Array of note names in the octave
     */
    MIDIUtils.getNotesInOctave = function (octave) {
        if (octave < -1 || octave > 9) {
            throw new Error("Invalid octave: ".concat(octave, ". Must be between -1 and 9."));
        }
        return NOTE_NAMES.map(function (note) { return "".concat(note).concat(octave); });
    };
    /**
     * Check if a note name is valid
     * @param noteName Note name to validate
     * @returns True if the note name is valid
     */
    MIDIUtils.isValidNoteName = function (noteName) {
        try {
            this.noteNameToNumber(noteName);
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    /**
     * Get the frequency of a MIDI note number
     * @param noteNumber MIDI note number (0-127)
     * @returns Frequency in Hz
     */
    MIDIUtils.noteToFrequency = function (noteNumber) {
        if (noteNumber < 0 || noteNumber > 127) {
            throw new Error("Invalid MIDI note number: ".concat(noteNumber, ". Must be between 0 and 127."));
        }
        // A4 = 440 Hz = MIDI note 69
        return 440 * Math.pow(2, (noteNumber - 69) / 12);
    };
    /**
     * Convert frequency to MIDI note number
     * @param frequency Frequency in Hz
     * @returns MIDI note number (0-127)
     */
    MIDIUtils.frequencyToNote = function (frequency) {
        if (frequency <= 0) {
            throw new Error('Frequency must be positive');
        }
        // A4 = 440 Hz = MIDI note 69
        var noteNumber = 69 + 12 * Math.log2(frequency / 440);
        var roundedNote = Math.round(noteNumber);
        if (roundedNote < 0 || roundedNote > 127) {
            throw new Error("Frequency ".concat(frequency, " Hz results in MIDI note ").concat(roundedNote, " which is out of range (0-127)"));
        }
        return roundedNote;
    };
    return MIDIUtils;
}());

exports.BehaviorSubject = BehaviorSubject;
exports.LiveSet = LiveSetImpl;
exports.MIDIUtils = MIDIUtils;
exports.Observable = Observable;
exports.ObservablePropertyHelper = ObservablePropertyHelper;
exports.Subject = Subject;
exports.distinctUntilChanged = distinctUntilChanged;
exports.map = map;
exports.observeProperties = observeProperties;
exports.observeProperty = observeProperty;
exports.share = share;
//# sourceMappingURL=index-max8-debug.js.map
