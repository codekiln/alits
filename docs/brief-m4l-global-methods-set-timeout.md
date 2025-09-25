# Max for Live Global Methods: setTimeout Alternative

## Problem Statement

Max for Live's JavaScript environment (JavaScript 1.8.5, ES5-based) does not include DOM-specific functions like `setTimeout` and `setInterval`. This creates compatibility issues when using npm packages that rely on these functions, such as Promise polyfills.

## Max 8 JavaScript Environment Limitations

### Missing DOM Functions
- `setTimeout()` - Not available in Max 8
- `setInterval()` - Not available in Max 8  
- `window` object - Max has no window object
- Browser-specific APIs - Not available

### Available Alternatives

#### Task Object for Scheduling
Max provides the **Task Object** as a replacement for `setTimeout`/`setInterval`:

```javascript
// Task Constructor
var tsk = new Task(function, object, arguments);

// Schedule a function to run once with delay
tsk.schedule(delay); // delay in milliseconds

// Repeat a function at intervals
tsk.repeat(interval); // interval in milliseconds

// Cancel scheduled/repeating tasks
tsk.cancel();
```

#### Example: setTimeout Replacement
```javascript
// Instead of: setTimeout(function() { post("Hello"); }, 1000);

var helloTask = new Task(function() {
    post("Hello");
}, this);

helloTask.schedule(1000); // Run after 1 second
```

#### Example: setInterval Replacement
```javascript
// Instead of: setInterval(function() { post("Tick"); }, 500);

var tickTask = new Task(function() {
    post("Tick");
}, this);

tickTask.repeat(500); // Repeat every 500ms
```

## Impact on npm Packages

### Promise Polyfills
Many Promise polyfills (including `es6-promise`) rely on `setTimeout` for:
- Promise resolution scheduling
- Microtask queue management
- Asynchronous execution timing

### Solutions for Max 8 Compatibility

#### Option 1: Custom Promise Implementation
Create a Max 8-compatible Promise implementation using Task objects:

```javascript
function Max8Promise(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];
    
    var self = this;
    executor(function(value) {
        self.resolve(value);
    }, function(reason) {
        self.reject(reason);
    });
}

Max8Promise.prototype.resolve = function(value) {
    if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.executeHandlers();
    }
};

Max8Promise.prototype.reject = function(reason) {
    if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.executeHandlers();
    }
};

Max8Promise.prototype.executeHandlers = function() {
    var self = this;
    var task = new Task(function() {
        self.handlers.forEach(function(handler) {
            handler(self.value);
        });
        self.handlers = [];
    }, this);
    task.schedule(0); // Execute on next tick
};
```

#### Option 2: Synchronous Promise Alternative
For Max 8, consider using synchronous patterns instead of Promises:

```javascript
// Instead of async/await
async function loadData() {
    var data = await fetchData();
    return processData(data);
}

// Use synchronous approach
function loadDataSync() {
    var data = fetchDataSync();
    return processData(data);
}
```

#### Option 3: Conditional Polyfill Loading
Only load Promise polyfills in environments that support them:

```javascript
// Check if setTimeout exists before loading polyfill
if (typeof setTimeout !== 'undefined') {
    // Load es6-promise polyfill
    require('es6-promise/auto');
} else {
    // Use Max 8 compatible alternatives
    // Implement custom Promise or use synchronous patterns
}
```

## Best Practices for Max 8 Compatibility

### 1. Avoid DOM-Dependent Libraries
- Don't use libraries that require `setTimeout`, `setInterval`, or DOM APIs
- Check library dependencies before including them

### 2. Use Max-Specific Alternatives
- Use Task objects for scheduling
- Use Max's built-in objects for timing and delays
- Leverage Max's message passing system

### 3. Test Early and Often
- Test npm packages in Max 8 environment before committing
- Verify that all dependencies are Max 8 compatible
- Use Max 8's JavaScript console for debugging

### 4. Consider Build-Time Solutions
- Use bundlers that can replace DOM functions with Max alternatives
- Create separate builds for Max 8 vs. browser environments
- Use conditional compilation for Max 8 specific code

## References

- [Max 8 JavaScript Global Methods](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal)
- [Max 7 Task Object Documentation](https://docs.cycling74.com/legacy/max7/vignettes/jstaskobject)
- [Cycling '74 Forums: setTimeout Discussion](https://cycling74.com/forums/javascript-settimeout)
- [Max 8 JavaScript Usage](https://docs.cycling74.com/legacy/max8/vignettes/javascript_usage_topic)

## Conclusion

Max for Live's JavaScript environment requires careful consideration of DOM dependencies. When using npm packages, always verify compatibility with Max 8's limited JavaScript runtime and use Max-specific alternatives like the Task Object for scheduling and timing operations.
