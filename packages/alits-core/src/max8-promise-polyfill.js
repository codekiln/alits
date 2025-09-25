// Max 8 compatible Promise polyfill
// Uses Max's Task object instead of setTimeout
// Always execute to ensure Promise is properly defined

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
    // Always declare Promise globally to ensure it's accessible
    var Promise = Max8Promise;
