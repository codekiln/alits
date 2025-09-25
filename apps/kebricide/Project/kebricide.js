"use strict";
// Test namespace import from alits-core
var alits = require("alits_index.js");
inlets = 1;
outlets = 1;
autowatch = 1;
function bang() {
    post("Testing namespace import: " + alits.greet() + "\n");
}
bang();
// Required for Max compatibility
var module = {};
module.exports = {};
