// Test namespace import from alits-core
import * as alits from "@alits/core";

inlets = 1;
outlets = 1;
autowatch = 1;

function bang() {
  post("Testing namespace import: " + alits.greet() + "\n");
}

bang();

// Required for Max compatibility
let module = {};
export = {};
