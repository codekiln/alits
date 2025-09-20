"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservablePropertyHelperMax8 = void 0;
exports.observeProperty = observeProperty;
exports.observeProperties = observeProperties;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * Max 8-compatible Observable property helper for LiveAPI objects
 * Uses plain objects instead of Map for Max 8 compatibility
 */
var ObservablePropertyHelperMax8 = /** @class */ (function () {
    function ObservablePropertyHelperMax8() {
    }
    /**
     * Observe a property on a LiveAPI object
     * @param liveObject The LiveAPI object to observe
     * @param propertyName The property name to observe
     * @returns Observable that emits when the property changes
     */
    ObservablePropertyHelperMax8.observeProperty = function (liveObject, propertyName) {
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
    ObservablePropertyHelperMax8.createPropertyObservable = function (liveObject, propertyName) {
        var key = "".concat(liveObject.id || 'unknown', ".").concat(propertyName);
        return (0, rxjs_1.fromEventPattern)(function (handler) {
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
        }).pipe((0, operators_1.distinctUntilChanged)(), (0, operators_1.share)());
    };
    /**
     * Observe multiple properties on a LiveAPI object
     * @param liveObject The LiveAPI object to observe
     * @param propertyNames Array of property names to observe
     * @returns Observable that emits when any property changes
     */
    ObservablePropertyHelperMax8.observeProperties = function (liveObject, propertyNames) {
        var _this = this;
        if (!Array.isArray(propertyNames) || propertyNames.length === 0) {
            throw new Error('Property names must be a non-empty array');
        }
        var observables = propertyNames.map(function (name) {
            return _this.observeProperty(liveObject, name).pipe((0, operators_1.map)(function (value) {
                var _a;
                return (_a = {}, _a[name] = value, _a);
            }));
        });
        return new rxjs_1.Observable(function (subscriber) {
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
    ObservablePropertyHelperMax8.createBehaviorSubject = function (liveObject, propertyName, initialValue) {
        var subject = new rxjs_1.BehaviorSubject(initialValue);
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
    ObservablePropertyHelperMax8.cleanup = function (liveObject) {
        var objectId = liveObject.id || 'unknown';
        var keys = Object.keys(this.subscriptions);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (key.startsWith(objectId)) {
                this.subscriptions[key].unsubscribe();
                delete this.subscriptions[key];
            }
        }
    };
    /**
     * Clean up all subscriptions
     */
    ObservablePropertyHelperMax8.cleanupAll = function () {
        var keys = Object.keys(this.subscriptions);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            this.subscriptions[key].unsubscribe();
        }
        this.subscriptions = {};
    };
    /**
     * Get the current value of a property
     * @param liveObject The LiveAPI object
     * @param propertyName The property name
     * @returns Current property value
     */
    ObservablePropertyHelperMax8.getCurrentValue = function (liveObject, propertyName) {
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
    ObservablePropertyHelperMax8.setValue = function (liveObject, propertyName, value) {
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
    ObservablePropertyHelperMax8.subscriptions = {};
    return ObservablePropertyHelperMax8;
}());
exports.ObservablePropertyHelperMax8 = ObservablePropertyHelperMax8;
/**
 * Convenience function for observing a single property
 * @param liveObject The LiveAPI object to observe
 * @param propertyName The property name to observe
 * @returns Observable that emits when the property changes
 */
function observeProperty(liveObject, propertyName) {
    return ObservablePropertyHelperMax8.observeProperty(liveObject, propertyName);
}
/**
 * Convenience function for observing multiple properties
 * @param liveObject The LiveAPI object to observe
 * @param propertyNames Array of property names to observe
 * @returns Observable that emits when any property changes
 */
function observeProperties(liveObject, propertyNames) {
    return ObservablePropertyHelperMax8.observeProperties(liveObject, propertyNames);
}
