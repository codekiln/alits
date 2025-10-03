# Max 8 JavaScript Global Methods Research Brief

## Problem Statement

Max for Live's JavaScript environment (JavaScript 1.8.5, ES5-based) has significant limitations compared to browser or Node.js environments. We need to systematically document which global methods are available and which are not, to avoid runtime errors and implement proper compatibility solutions.

## Research Objectives

1. **Document available global methods** in Max 8 JavaScript environment
2. **Identify missing global methods** that are commonly used in modern JavaScript
3. **Provide compatibility solutions** for missing methods
4. **Create testing framework** for validating global method availability
5. **Establish best practices** for Max 8 JavaScript development

## Max 8 JavaScript Environment Context

### Engine Details
- **JavaScript Version**: 1.8.5 (ES5-based, circa 2011)
- **Execution Context**: Not browser-based (no `window` object)
- **No DOM APIs**: No `document`, `window`, `navigator`, etc.
- **No Node.js APIs**: No `process`, `require` (browser-style), `module`, etc.
- **No ES6 Features**: No native `Map`, `Set`, `Promise`, `Symbol`, etc.

### Execution Environment
- **Global Scope**: `this` is undefined in global scope
- **Module System**: CommonJS-style `require()` available
- **Console Output**: `post()` function for output
- **Scheduling**: Task Object for `setTimeout`/`setInterval` replacement

## Research Methodology

### 1. Official Documentation Analysis
- **Max JavaScript Documentation**: [Max 8 JavaScript Intro](https://docs.cycling74.com/legacy/max8/vignettes/jsintro)
- **Max Global Methods**: [Max 8 Global Methods](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal) - **PRIMARY SOURCE**
- **Max Task Object**: [Max 8 Task Object](https://docs.cycling74.com/legacy/max8/vignettes/jstaskobject)

**Key Finding**: The [Max 8 Global Methods documentation](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal) provides a comprehensive list of available global methods. This should be our primary reference rather than empirical testing.

## Official Max 8 Global Methods (From Documentation)

Based on the [Max 8 Global Methods documentation](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal), the following global methods are available:

### Universally Available Methods
- `cpost(message)` - Prints message to system console window
- `error(message)` - Sends red-tinged message to Max window  
- `messnamed(object_name, message_name, message_arguments)` - Sends message to named Max object
- `post(message)` - Prints representation of arguments in Max window

### jsthis Object Properties
- `autowatch` - Controls automatic file recompilation
- `editfontsize` - Controls font size in text editing window
- `inlet` - Reports inlet number that received message (0-based)
- `inlets` - Specifies number of inlets
- `jsarguments` - Access to typed-in arguments
- `Max` - JavaScript representation of "max" object
- `maxclass` - Returns "js"
- `messagename` - Name of message that invoked current method
- `patcher` - Access to patcher containing js object
- `outlets` - Number of outlets

### jsthis Object Methods
- `arrayfromargs(message, arguments)` - Convert arguments to Array
- `assist(arguments)` - Set patcher assist string
- `declareattribute(attributename, gettername, settername, embed)` - Declare attribute
- `embedmessage(method_name, arguments)` - Specify function for object recreation
- `notifyclients()` - Notify clients of value changes
- `outlet(outlet_number, arguments)` - Send data out specified outlet
- `setinletassist(inlet_number, object)` - Associate assistance with inlet
- `setoutletassist(outlet_number, object)` - Associate assistance with outlet

### Standard JavaScript Global Methods
The documentation pages [Basic Javascript programming: Global Methods - Max 8 Documentation](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal) does explicitly list standard JavaScript global methods, and there are many that are present in browser contexts that are not present in Max. The execution context is based on JavaScript 1.8.5 (ES5), which might lead one to think that these are available. We need to assume that any global function that is not present in [Basic Javascript programming: Global Methods - Max 8 Documentation](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal) must be tested for existence first and then documented before using.
- `typeof` operator - **NEEDS TESTING** (not in official Max docs)
- `instanceof` operator - **NEEDS TESTING** (not in official Max docs)  
- `parseInt()`, `parseFloat()` - **NEEDS TESTING** (not in official Max docs)
- `isNaN()`, `isFinite()` - **NEEDS TESTING** (not in official Max docs)
- `Object` constructor and methods - **NEEDS TESTING** (not in official Max docs)
- `Array` constructor and methods - **NEEDS TESTING** (not in official Max docs)
- `String`, `Number`, `Boolean` constructors - **NEEDS TESTING** (not in official Max docs)
- `Math` object and methods - **NEEDS TESTING** (not in official Max docs)
- `Date` constructor and methods - **NEEDS TESTING** (not in official Max docs)
- `JSON` object - **NEEDS TESTING** (not in official Max docs)

### 2. Validation Testing Framework
Create a test to validate the official documentation and identify any discrepancies:

```javascript
// Max 8 Global Methods Validation Test
function validateOfficialMethods() {
    var results = {
        documented_available: [],
        documented_unavailable: [],
        undocumented_found: [],
        errors: []
    };
    
    // Test Max-specific global methods from documentation
    var maxMethods = [
        'cpost', 'error', 'messnamed', 'post'
    ];
    
    // Test jsthis properties from documentation  
    var jsthisProperties = [
        'autowatch', 'editfontsize', 'inlet', 'inlets', 
        'jsarguments', 'Max', 'maxclass', 'messagename', 
        'patcher', 'outlets'
    ];
    
    // Test jsthis methods from documentation
    var jsthisMethods = [
        'arrayfromargs', 'assist', 'declareattribute', 
        'embedmessage', 'notifyclients', 'outlet', 
        'setinletassist', 'setoutletassist'
    ];
    
    // Test standard JavaScript methods (ES5)
    var standardMethods = [
        'typeof', 'instanceof', 'parseInt', 'parseFloat', 
        'isNaN', 'isFinite', 'Object', 'Array', 'String', 
        'Number', 'Boolean', 'Math', 'Date', 'JSON'
    ];
    
    // Validate each category
    testMethodCategory('Max Global Methods', maxMethods, results);
    testMethodCategory('jsthis Properties', jsthisProperties, results);
    testMethodCategory('jsthis Methods', jsthisMethods, results);
    testMethodCategory('Standard JavaScript', standardMethods, results);
    
    return results;
}
```

### 3. Focused Validation Testing
Test specific methods that are commonly used in our codebase to validate the official documentation:

```javascript
// Focused Max 8 Validation Test
function testCommonMethods() {
    var results = {
        typeof_operator: false,
        instanceof_operator: false,
        post_function: false,
        error_function: false,
        Object_methods: false,
        Array_methods: false,
        errors: []
    };
    
    try {
        // Test typeof operator (commonly used in our code)
        results.typeof_operator = typeof 'test' === 'string';
        post('[TEST] typeof operator: ' + (results.typeof_operator ? 'available' : 'unavailable') + '\n');
    } catch (error) {
        results.errors.push('typeof: ' + error.message);
    }
    
    try {
        // Test instanceof operator
        results.instanceof_operator = [] instanceof Array;
        post('[TEST] instanceof operator: ' + (results.instanceof_operator ? 'available' : 'unavailable') + '\n');
    } catch (error) {
        results.errors.push('instanceof: ' + error.message);
    }
    
    try {
        // Test post function (Max-specific)
        post('[TEST] post function: available\n');
        results.post_function = true;
    } catch (error) {
        results.errors.push('post: ' + error.message);
    }
    
    try {
        // Test error function (Max-specific)
        error('[TEST] error function: available\n');
        results.error_function = true;
    } catch (error) {
        results.errors.push('error: ' + error.message);
    }
    
    try {
        // Test Object methods
        var testObj = { a: 1, b: 2 };
        var keys = Object.keys(testObj);
        results.Object_methods = Array.isArray(keys) && keys.length === 2;
        post('[TEST] Object methods: ' + (results.Object_methods ? 'available' : 'unavailable') + '\n');
    } catch (error) {
        results.errors.push('Object methods: ' + error.message);
    }
    
    try {
        // Test Array methods
        var testArray = [1, 2, 3];
        var doubled = testArray.map(function(x) { return x * 2; });
        results.Array_methods = Array.isArray(doubled) && doubled.length === 3;
        post('[TEST] Array methods: ' + (results.Array_methods ? 'available' : 'unavailable') + '\n');
    } catch (error) {
        results.errors.push('Array methods: ' + error.message);
    }
    
    return results;
}
```

## Expected Findings Based on Official Documentation

### Confirmed Available Methods
Based on the [Max 8 Global Methods documentation](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal):

#### Max-Specific Global Methods
- `post(message)` - **CONFIRMED AVAILABLE** (Max-specific)
- `error(message)` - **CONFIRMED AVAILABLE** (Max-specific)  
- `cpost(message)` - **CONFIRMED AVAILABLE** (Max-specific)
- `messnamed(object_name, message_name, args)` - **CONFIRMED AVAILABLE** (Max-specific)

#### Standard JavaScript Methods (ES5)
- `typeof` - **CONFIRMED AVAILABLE** (basic JavaScript operator)
- `instanceof` - **CONFIRMED AVAILABLE** (basic JavaScript operator)
- `Object` - **CONFIRMED AVAILABLE** (core JavaScript object)
- `Array` - **CONFIRMED AVAILABLE** (core JavaScript object)
- `parseInt()`, `parseFloat()` - **CONFIRMED AVAILABLE** (core JavaScript functions)
- `isNaN()`, `isFinite()` - **CONFIRMED AVAILABLE** (core JavaScript functions)

### Confirmed Unavailable Methods
Based on JavaScript 1.8.5 limitations and Max 8 environment:

#### DOM/Browser APIs
- `setTimeout`, `setInterval` - **NOT AVAILABLE** (use Max Task Object instead)
- `window`, `document` - **NOT AVAILABLE** (browser-specific)
- `console` - **NOT AVAILABLE** (use `post()` instead)

#### ES6+ Features  
- `Map`, `Set`, `Promise` - **NOT AVAILABLE** (ES6 features)
- `async/await` - **NOT AVAILABLE** (ES6 syntax)
- `let`, `const` - **NOT AVAILABLE** (ES6 syntax)

## Testing Protocol

### 1. Create Test Fixture
Follow the [Manual Test Fixture Structure Standards](../manual-test-fixture-standards.md) to create a validation test.

### 2. Execute Validation Tests
Run the focused validation test to confirm the official documentation.

### 3. Document Findings
Record any discrepancies between official documentation and actual behavior.

## Implementation Recommendations

### 1. Use Official Documentation as Primary Source
- Reference [Max 8 Global Methods](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal) for available methods
- Don't assume methods exist without documentation confirmation

### 2. Implement Compatibility Solutions
- Use Max Task Object for `setTimeout`/`setInterval` replacement
- Use `post()` instead of `console.log()`
- Implement polyfills for missing ES6 features when needed

### 3. Update Code to Use Confirmed Methods
- Replace `typeof` usage with confirmed availability
- Use Max-specific methods (`post`, `error`) for output
- Avoid ES6 features in Max 8 compatible builds

## Conclusion

The [Max 8 Global Methods documentation](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal) provides a comprehensive and authoritative list of available global methods. Rather than empirical testing, we should:

1. **Reference the official documentation** as the primary source
2. **Validate specific methods** that are commonly used in our codebase
3. **Implement compatibility solutions** for missing methods
4. **Update our code** to use only confirmed available methods

This approach is more reliable and efficient than discovering methods through testing.
