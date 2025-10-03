# Research Brief: Max for Live Test Fixture Setup

## Executive Summary

This research brief provides comprehensive guidance for creating Max for Live test fixtures that integrate with the Alits monorepo's manual testing framework. The brief covers the complete workflow from Live Set creation to .amxd device setup, with specific focus on JavaScript API integration using LiveAPI and MaxMSP 8's js object.

## Research Objectives

1. **Primary Goal**: Create a standardized process for setting up Max for Live test fixtures that can be consistently reproduced across different test scenarios
2. **Secondary Goals**: 
   - Document the complete Live Set creation workflow
   - Provide specific guidance for .amxd device integration
   - Establish best practices for JavaScript API usage within Max for Live
   - Create templates for common test fixture patterns

## Key Findings

### Max for Live Device Creation Process

**1. Live Set Setup Requirements:**
- Ableton Live 11 Suite with Max for Live activated
- Max 8 installed (standalone or bundled with Live)
- Proper file organization in fixtures directory structure

**2. Device Type Selection:**
- **MIDI Effects**: For testing LiveAPI functionality, track manipulation, tempo changes
- **Audio Effects**: For testing audio processing, device chains
- **Instruments**: For testing instrument-specific functionality

**3. JavaScript Integration:**
- Max for Live supports TypeScript compilation directly in the Max environment
- LiveAPI provides access to Live Set properties and methods
- js object enables JavaScript execution within Max patches

### LiveAPI JavaScript API Capabilities

**Core LiveAPI Objects:**
- `live_set`: Access to the entire Live Set
- `live_track`: Individual track manipulation
- `live_scene`: Scene management
- `live_clip`: Clip operations
- `live_device`: Device parameter control

**Key Methods for Test Fixtures:**
```javascript
// Live Set Operations
const liveSet = new LiveAPI('live_set');
liveSet.call('create_midi_track', 0);  // Create MIDI track
liveSet.call('set', 'tempo', 120);     // Set tempo
liveSet.call('get', 'tempo');          // Get current tempo

// Track Operations
const track = new LiveAPI('live_track', 0);
track.call('get', 'name');             // Get track name
track.call('set', 'volume', 0.8);      // Set track volume

// Device Operations
const device = new LiveAPI('live_device', 0);
device.call('get', 'name');            // Get device name
device.call('set', 'parameters', 0, 0.5); // Set parameter value
```

### Max for Live js Object Configuration

**Essential Setup Parameters:**
- `inlets`: Number of input connections
- `outlets`: Number of output connections  
- `autowatch`: Enable automatic file watching for development
- `@external`: Load JavaScript from external file

**File Loading Strategy:**
- Use `@external` parameter to reference compiled JavaScript files
- Maintain ES5 compatibility for Max 8 runtime
- Bundle dependencies using maxmsp-ts compilation pipeline

## Detailed Implementation Guide

### Phase 1: Live Set Creation

**Step 1: Initialize New Live Set**
1. Open Ableton Live
2. Navigate to `File` > `New Live Set`
3. Verify Max for Live is activated in `Preferences` > `Licenses/Maintenance`

**Step 2: Configure Track Structure**
1. Add appropriate track type based on test requirements:
   - MIDI track for LiveAPI testing
   - Audio track for audio processing tests
2. Set track properties (name, color, etc.) for identification

**Step 3: Save Live Set**
1. Navigate to `File` > `Save Live Set As...`
2. Choose fixtures directory: `packages/[package]/tests/manual/[test-name]/fixtures/`
3. Name convention: `[TestName]Fixture.als`

### Phase 2: Max for Live Device Creation

**Step 1: Create Max Device**
1. In Live Browser, navigate to `Max for Live` category
2. Select appropriate device type:
   - `Max MIDI Effect` for LiveAPI tests
   - `Max Audio Effect` for audio processing
   - `Max Instrument` for instrument-specific tests
3. Drag device onto the prepared track

**Step 2: Configure js Object**
1. Open Max editor by clicking `Edit` button on device
2. Add `[js]` object to the patch
3. Configure js object with filename argument:
   ```
   Arguments: [TestName]Test.js [inlets] [outlets] [jsarguments]
   ```
   - **filename**: `[TestName]Test.js` - The compiled JavaScript file in fixtures directory
   - **inlets**: Number of input connections (typically 1)
   - **outlets**: Number of output connections (typically 1)
   - **jsarguments**: Optional arguments passed to JavaScript

4. **Critical**: The filename argument automatically loads the external JavaScript file
   - According to the [MaxMSP 8 js Object Reference](https://docs.cycling74.com/legacy/max8/refpages/js), specifying a filename as the first argument loads that file as the JavaScript source
   - No additional `@external` parameter needed - the filename argument handles external file loading

5. **Console Output**: The Max console (right panel) automatically displays `post()` messages from JavaScript code
   - No additional `[print]` object needed when console is open
   - All `[Alits/TEST]` prefixed messages will appear directly in the console

**Step 3: Add Control Interface**
1. Add Max objects for test control:
   - `[button]` for initialization
   - `[number]` for parameter input
   - `[message]` for function calls
2. Connect controls to js object using `[prepend]` objects:
   - `[button]` → `[prepend bang]` → `[js]` inlet
   - `[number]` → `[prepend test_tempo]` → `[js]` inlet
   - `[message]` → `[prepend test_function]` → `[js]` inlet
3. **Note**: The test script is generated by AI and should not be modified by human testers

**Step 4: Save Device**
1. In Max editor: `File` > `Save As...`
2. Navigate to fixtures directory
3. Save as `[TestName]Test.amxd`

### Phase 3: JavaScript Integration

**TypeScript Compilation Pipeline:**
1. AI generates TypeScript test file in `src/` directory
2. Turborepo workspace compiles TypeScript to ES5 JavaScript
3. Dependencies bundled using maxmsp-ts configuration
4. Output files placed in `fixtures/` directory

**JavaScript API Usage:**
```typescript
// Max for Live script setup
inlets = 1;
outlets = 1;
autowatch = 1;

// LiveAPI initialization
const liveSet = new LiveAPI('live_set');

// Test function implementation
function bang() {
    // Initialize test
    post('[Alits/TEST] Test initialized\n');
}

function test_tempo(tempo: number) {
    try {
        liveSet.call('set', 'tempo', tempo);
        post(`[Alits/TEST] Tempo set to: ${tempo}\n`);
    } catch (error) {
        post(`[Alits/TEST] Error: ${error.message}\n`);
    }
}

// Required for Max TypeScript compilation
let module = {};
export = {};
```

**Key Points:**
- The `post()` function outputs messages directly to Max console (right panel)
- All `[Alits/TEST]` prefixed messages will appear in the console automatically
- The filename argument in js object automatically loads the compiled JavaScript file
- No additional file loading configuration needed beyond the filename argument
- Console output is visible without additional `[print]` objects when console is open

## File Structure Requirements

### Fixtures Directory Structure
```
packages/[package]/tests/manual/[test-name]/fixtures/
├── [TestName]Fixture.als          # Live Set file
├── [TestName]Test.amxd            # Max for Live device
├── [TestName]Test.js              # Compiled JavaScript
├── alits_[package]_index.js       # Bundled dependencies
└── [additional-resources]         # Any additional files
```

### Workspace Configuration
```
packages/[package]/tests/manual/[test-name]/
├── src/
│   └── [TestName]Test.ts          # TypeScript source
├── fixtures/                      # Compiled output + devices
├── results/                       # Test execution results
├── package.json                   # Workspace package config
├── tsconfig.json                  # TypeScript configuration
├── maxmsp.config.json             # Dependency resolution
├── creation-guide.md              # Human setup instructions
└── test-script.md                 # Test execution guide
```

## Quality Assurance Guidelines

### Pre-Creation Checklist
- [ ] TypeScript source file generated and validated
- [ ] Turborepo workspace configured with proper dependencies
- [ ] JavaScript compilation successful (ES5 compatible)
- [ ] Dependencies bundled correctly
- [ ] Fixtures directory structure created

### Device Creation Checklist
- [ ] Live Set created with appropriate track structure
- [ ] Max for Live device added to correct track type
- [ ] js object configured with external file reference
- [ ] Control interface added for test functions
- [ ] Device saved in fixtures directory
- [ ] Live Set saved in fixtures directory

### Verification Checklist
- [ ] Device loads without JavaScript errors
- [ ] Max console (right panel) shows expected initialization messages
- [ ] Test functions accessible via Max controls
- [ ] LiveAPI calls execute successfully
- [ ] Console output matches expected format with `[Alits/TEST]` prefixes
- [ ] No runtime errors during basic operations
- [ ] Console displays all `post()` messages from JavaScript automatically

## Common Pitfalls and Solutions

### JavaScript Integration Issues
**Problem**: Import errors or module resolution failures
**Solution**: Ensure dependencies are properly bundled using maxmsp-ts configuration

**Problem**: ES6+ syntax errors in Max runtime
**Solution**: Verify TypeScript compilation targets ES5 compatibility

### LiveAPI Access Issues
**Problem**: LiveAPI calls fail or return undefined
**Solution**: Ensure Ableton Live is running and Live Set is active

**Problem**: Permission errors for Live Set modification
**Solution**: Verify Live Set is not locked or in read-only mode

### File Path Issues
**Problem**: js object cannot find external JavaScript file
**Solution**: Ensure the filename argument points to the correct JavaScript file in fixtures directory

**Problem**: Device references missing files after moving
**Solution**: Use Live's "Manage Files" feature to update references

**Problem**: Console output not visible
**Solution**: Ensure Max console (right panel) is open - no additional `[print]` object needed

## Best Practices

### Development Workflow
1. **AI Phase**: Generate TypeScript source, configure workspace, compile JavaScript
2. **Human Phase**: Create Live Set, build Max device, configure js object
3. **Testing Phase**: Execute test script, record results, verify functionality

### File Management
- Keep all fixture files in dedicated fixtures directory
- Use consistent naming conventions across all files
- Maintain separate Live Set and device files for each test
- Document any external dependencies or requirements

### Error Handling
- Implement comprehensive error handling in JavaScript code
- Use structured logging with `[Alits/TEST]` prefixes
- Provide clear error messages for debugging
- Test error scenarios as part of verification process

## Integration with Existing Framework

### Turborepo Workspace Integration
- Each test fixture is an individual Turborepo workspace
- Parallel build support for multiple test fixtures
- Caching and dependency management through Turborepo
- Consistent configuration across all test workspaces

### AI-Human Collaboration
- AI handles complex TypeScript generation and compilation
- AI manages dependency bundling and workspace configuration
- **Human testers should never modify TypeScript/JavaScript test files**
- Human testers focus on Max device creation and test execution
- Any test script issues should be reported back to AI for fixes
- Clear handoff points between AI and human phases

### Quality Gates
- Pre-creation validation of TypeScript source
- Post-creation verification of device functionality
- Test execution with structured result recording
- Integration with existing QA processes

## Future Considerations

### Scalability
- Template system for common test patterns
- Automated fixture generation for repetitive tests
- Integration with CI/CD pipelines for automated verification

### Advanced Features
- Multi-device test fixtures for complex scenarios
- Integration with external testing frameworks
- Performance monitoring and profiling capabilities

### Documentation
- Video tutorials for complex setup procedures
- Interactive guides for common troubleshooting scenarios
- API reference integration with Max for Live documentation

## Documentation References

### Official Documentation

**MaxMSP 8 Core Documentation:**
- [js Object Reference](https://docs.cycling74.com/max8/refpages/js) - Complete reference for the js object including parameters and methods
- [External File Loading](https://docs.cycling74.com/max8/vignettes/js_external) - Guide to loading JavaScript from external files
- [LiveAPI Reference](https://docs.cycling74.com/max8/refpages/liveapi) - Complete LiveAPI object documentation
- [Max for Live Device Creation](https://docs.cycling74.com/max8/vignettes/live_creatingdevices) - Official guide to creating Max for Live devices

**Ableton Live Documentation:**
- [Max for Live Devices Manual](https://www.ableton.com/en/live-manual/12/max-for-live-devices/) - Official Ableton documentation for Max for Live integration
- [Building Max Devices Pack](https://www.ableton.com/en/packs/building-max-devices/) - Free Ableton pack with lessons and examples
- [Max for Live Learning Resources](https://help.ableton.com/hc/en-us/articles/360003276080-Max-for-Live-learning-resources) - Comprehensive learning materials

**Configuration and Setup:**
- [Using Separate Max Installation](https://help.ableton.com/hc/en-us/articles/209070309-Using-a-separate-Max-for-Live-installation) - Guide for using standalone Max with Live
- [Saving Devices in Templates](https://help.ableton.com/hc/en-us/articles/6195586576146-Saving-Max-for-Live-devices-in-Templates) - Best practices for device management
- [Max for Live Device Edit Button](https://help.ableton.com/hc/en-us/articles/20566932990748-Max-for-Live-device-edit-button-in-Live-12-2) - Updated interface information for Live 12.2

### JavaScript API Resources

**LiveAPI Tutorials:**
- [JavaScript in Ableton Live: The Live API](https://adammurray.link/max-for-live/js-in-live/live-api/) - Comprehensive tutorial on LiveAPI usage
- [V8 JavaScript Engine in Live](https://adammurray.link/max-for-live/v8-in-live/live-api/) - Advanced JavaScript integration guide

**Technical References:**
- [MaxMSP 8 JavaScript Documentation](https://docs.cycling74.com/max8/vignettes/js) - Core JavaScript capabilities in Max
- [LiveAPI Object Methods](https://docs.cycling74.com/max8/refpages/liveapi) - Complete method reference for LiveAPI

### Community Resources

**Learning Materials:**
- [Max for Live Community Forum](https://cycling74.com/forums/category/max-for-live) - Community support and examples
- [MaxMSP Tutorials](https://docs.cycling74.com/max8/vignettes/) - Official Max tutorials and examples
- [Ableton User Groups](https://www.ableton.com/en/user-groups/) - Local and online user communities

**Development Tools:**
- [MaxMSP SDK Documentation](https://docs.cycling74.com/max8/vignettes/sdk) - For advanced device development
- [MaxMSP Package Manager](https://docs.cycling74.com/max8/vignettes/packages) - Managing external dependencies

## Conclusion

This research brief provides a comprehensive foundation for creating Max for Live test fixtures within the Alits monorepo framework. The combination of AI-driven TypeScript generation and human-guided Max device creation creates an efficient workflow that maintains code quality while minimizing manual effort. The structured approach ensures consistency across test fixtures while providing flexibility for different testing scenarios.

The key success factors are:
1. Clear separation of AI and human responsibilities
2. Standardized file structure and naming conventions
3. Comprehensive error handling and verification procedures
4. Integration with existing Turborepo and QA frameworks
5. Access to comprehensive documentation and community resources

This approach enables rapid development of test fixtures while maintaining the quality and reliability required for production-ready Max for Live devices.
