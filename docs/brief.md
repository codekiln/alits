# Project Brief: Alits

## Executive Summary

**Alits** is an idiomatic TypeScript library that transforms the cumbersome Max for Live API into a modern, functional reactive programming experience for Ableton Live developers. The current Max for Live API requires developers to work with string-based paths, manual validation, and callback-heavy patterns that are foreign to modern TypeScript development. Alits abstracts these complexities behind a clean, Observable-based API using RxJS, providing type-safe access to Ableton Live's object model while maintaining the power and flexibility developers need.

## Problem Statement

**Current State & Pain Points:**
The Max for Live API forces developers to work with a string-based, messaging-centric approach that is fundamentally misaligned with modern TypeScript development practices. Developers must construct complex Live Object Model paths manually, validate their existence, and handle asynchronous updates through callback patterns rather than modern Promise or Observable-based approaches.

**Specific Pain Points:**
- **Path Construction Complexity**: Getting object references requires constructing strings like `"live_set tracks 2 clip_slots 0 clip"` and validating they exist
- **String-Based API**: All property access uses `.get('property_name')` instead of direct property access
- **Callback Hell**: Property observation requires setting up callback functions and parsing `IArguments` rather than using modern async/await or Observable patterns
- **No Type Safety**: The API provides no TypeScript type definitions, leading to runtime errors and poor developer experience
- **Validation Overhead**: Every API call requires manual validation to ensure the path exists
- **IDE Limitations**: No autocomplete support for Live Object Model properties and methods
- **AI Coding Barriers**: Current graphical Live Object Model documentation is inaccessible to AI coding assistants

**Impact of the Problem:**
This creates a significant barrier to entry for TypeScript developers wanting to create Max for Live devices, limits the sophistication of applications that can be built, and results in error-prone, hard-to-maintain code. The learning curve is steep, and the development experience is frustrating compared to modern web development standards. Additionally, the lack of programmatic access to the Live Object Model prevents modern development tools and AI assistants from providing effective assistance.

**Why Existing Solutions Fall Short:**
The current Max for Live API is designed around Max/MSP's messaging paradigm and hasn't evolved to meet modern development expectations. There are no alternative libraries that provide a TypeScript-first, Observable-based interface to Ableton Live. The Live Object Model exists only as graphical documentation, making it inaccessible to modern development workflows.

## Proposed Solution

**Core Concept & Approach:**
Alits provides a comprehensive TypeScript API that models every component of the Max for Live Live Object Model as strongly-typed TypeScript classes and interfaces. This transforms the graphical Live Object Model into a programmatically accessible, IDE-friendly, and AI-assistant-compatible API using functional reactive programming with RxJS.

**Comprehensive TypeScript Modeling:**
Every object in Ableton Live's object model gets its own TypeScript class with:
- **Strongly-typed properties**: Each property has proper TypeScript types (string, number, boolean, etc.)
- **Method signatures**: All Live Object Model functions are properly typed with parameter and return types
- **IDE Integration**: Full autocomplete support for all properties, methods, and object relationships
- **AI Coding Support**: The entire Live Object Model becomes accessible to AI coding assistants through TypeScript definitions

**Key Differentiators:**
- **Complete Type Safety**: Every Live Object Model component modeled in TypeScript with proper types
- **Observable-Based**: Property observation returns RxJS Observables instead of requiring callback setup
- **IDE Autocomplete**: Full IntelliSense support for all Live Object Model properties and methods
- **AI Coding Compatible**: TypeScript definitions enable AI assistants to understand and suggest Live Object Model usage
- **Intuitive API**: Methods like `track.get_clips()` instead of constructing string paths
- **Modern Patterns**: Uses async/await and functional reactive programming paradigms
- **Modular Architecture**: Core library plus specialized packages for different device types

**Why This Solution Will Succeed:**
The solution addresses the fundamental mismatch between Max/MSP's messaging paradigm and modern TypeScript development. By providing a familiar, type-safe interface with complete IDE and AI support, it dramatically lowers the barrier to entry while maintaining access to all Live API functionality. The comprehensive TypeScript modeling makes the Live Object Model accessible to modern development tools for the first time.

**High-Level Vision:**
A comprehensive TypeScript ecosystem for Ableton Live development that transforms the graphical Live Object Model into a programmatically accessible, strongly-typed API. Starting with core object model access and expanding to specialized libraries for different device types and use cases, all with full IDE and AI coding assistant support.

### Live Object Model to TypeScript Example

**Current Max for Live API (Problematic):**
```typescript
// Current approach - string-based, no type safety, callback-heavy
const track = new LiveAPI((args) => {
  const argsArray = arrayfromargs(args);
  console.log('Track color changed:', argsArray[1]);
}, "live_set tracks 0");

// Manual path construction and validation
const clipPath = `${track.unquotedpath} arrangement_clips 0`;
const clip = new LiveAPI(() => {}, clipPath);

// String-based property access
const clipName = clip.get('name');
const clipLength = clip.get('length');

// Callback-based observation
track.property = 'color';
```

**Proposed Alits API (Solution):**
```typescript
// Modern TypeScript approach - type-safe, Observable-based, intuitive
import { LiveSet, Track, Clip } from 'alits';

const liveSet = new LiveSet();
const track = await liveSet.get_track(0);

// Type-safe property access with autocomplete
const trackName: string = await track.get_name();
const trackColor: number = await track.get_color();

// Observable-based property observation
track.observe_color().subscribe(newColor => {
  console.log('Track color changed:', newColor);
});

// Intuitive object relationships with full type safety
const clips: Clip[] = await track.get_arrangement_clips();
const firstClip = clips[0];

// Type-safe clip properties
const clipName: string = await firstClip.get_name();
const clipLength: number = await firstClip.get_length();

// Type-safe method calls
await firstClip.add_new_notes([
  { pitch: 60, start_time: 0, duration: 1, velocity: 100 }
]);
```

**Benefits of the TypeScript Approach:**
- **IDE Autocomplete**: Full IntelliSense support for all properties and methods
- **Type Safety**: Compile-time error checking prevents runtime errors
- **AI Coding Support**: AI assistants can understand and suggest proper Live Object Model usage
- **Modern Patterns**: Observable-based reactive programming instead of callbacks
- **Intuitive API**: Object-oriented approach mirrors the actual Live Object Model structure
- **Better Documentation**: TypeScript definitions serve as living documentation

### Max for Live Development: Before and After Alits

The transformation that Alits brings to Max for Live development is best illustrated through a real-world example: building a Drum Key Remapper device. This comparison demonstrates the fundamental paradigm shift from Max/MSP's messaging-centric approach to modern TypeScript development.

#### Real-World Example: Drum Key Remapper Device

**Application Concept:**
A Max for Live MIDI effect device that automatically renames each Drum Pad to the MIDI key that triggers it when placed on a track containing a Drum Rack. Pads with no sample remain unchanged.

**Detailed Analysis:**
For comprehensive implementation details, see:
- **[Classical Max for Live Implementation](./brief-M4L-drum-key-remapper-classical-example.md)** - Complete step-by-step guide for building this device using current Max for Live JavaScript API
- **[Alits Implementation](./brief-M4L-drum-key-remapper-alits-example.md)** - Same device reimagined using the proposed Alits TypeScript library

#### Classical Max for Live Implementation (Current State)

The current approach requires developers to navigate Max/MSP's messaging paradigm, which presents significant challenges for modern developers:

**Device Setup Challenges:**
- Must use `live.thisdevice` object to trigger initialization after device loads
- Cannot safely call `LiveAPI` in JavaScript global scope
- Requires manual bang connections in the Max patcher
- No modern module system or dependency management

**Path Construction Complexity:**
```javascript
// Manual path construction with string concatenation
const track = new LiveAPI("this_device canonical_parent");
const devicePath = track.unquotedpath + " devices " + i;
const padPath = basePath + " drum_pads " + padIndex;

// Fragile string-based navigation
const clipPath = `${track.unquotedpath} arrangement_clips 0`;
```

**String-Based Property Access:**
```javascript
// All property access requires string parameters
const clipName = clip.get('name');
const clipLength = clip.get('length');
const padNote = pad.get('note');

// Manual validation required for every object
if (track.id !== 0 && track.info !== "No object") {
  // Safe to use
}
```

**Callback-Based Observation:**
```javascript
// Complex callback setup for property observation
const track = new LiveAPI((args) => {
  const argsArray = arrayfromargs(args);
  console.log('Track color changed:', argsArray[1]);
}, "live_set tracks 0");

track.property = 'color'; // Observer setup
```

**Function Calls via Messaging:**
```javascript
// Device function calls require special messaging pattern
device.call("functionName", args...);
```

**Development Pain Points:**
The challenges outlined above represent just a subset of the difficulties developers face with Max for Live JavaScript development. For a comprehensive overview of Max for Live JavaScript limitations and best practices, see:

**[Max for Live JavaScript Overview](./c74___M4L___Concept___LiveAPI%20Overview%20for%20JS.md)** - Complete guide covering:
- ES5-only limitations and syntax constraints
- String-based API challenges and path construction complexity
- Callback-based observation patterns and debugging techniques
- Best practices for Max for Live JavaScript development
- When to use Max JavaScript vs. other approaches

#### Alits Implementation (Proposed Solution)

The same Drum Key Remapper device becomes dramatically simpler and more maintainable with Alits:

**Modern Device Setup:**
```typescript
// Clean imports and modern module system
import { LiveSet, Track, RackDevice, DrumPad } from 'alits';

// Async initialization without manual bang handling
async function init() {
  const liveSet = new LiveSet();
  const track = await liveSet.get_track_for_this_device();
  // Device ready to use
}
```

**Type-Safe Object Navigation:**
```typescript
// Intuitive object relationships with full type safety
const devices = await track.get_devices();
const drumRack = devices.find(d => d instanceof RackDevice && d.is_drum_rack());
const pads: DrumPad[] = await drumRack.get_drum_pads();
```

**Direct Property Access:**
```typescript
// Type-safe property access with autocomplete
const trackName: string = await track.get_name();
const trackColor: number = await track.get_color();
const padNote: number = await pad.get_note();
```

**Observable-Based Reactive Programming:**
```typescript
// Modern reactive patterns with RxJS
track.observe_color().subscribe(newColor => {
  console.log('Track color changed:', newColor);
});

// Automatic updates when pad contents change
pad.observe_note().subscribe(newNote => {
  updatePadName(newNote);
});
```

**Intuitive Method Calls:**
```typescript
// Direct method calls with full type safety
await pad.set_name(noteName);
await clip.add_new_notes([{ pitch: 60, start_time: 0, duration: 1, velocity: 100 }]);
```

#### Key Transformation Benefits

**Developer Experience Revolution:**
- **From ES5 to Modern TypeScript**: Full access to modern language features
- **From String Paths to Object Navigation**: `track.get_devices()` instead of `"live_set tracks 0 devices"`
- **From Callbacks to Observables**: RxJS-based reactive programming
- **From Manual Validation to Type Safety**: Compile-time error checking
- **From No IDE Support to Full IntelliSense**: Autocomplete for all properties and methods

**AI Coding Assistant Compatibility:**
The classical approach creates significant barriers for AI coding assistants:
- String-based APIs are difficult for AI to understand and suggest
- No type definitions mean AI cannot provide accurate autocomplete
- Callback patterns are foreign to modern AI training data
- Manual validation requirements create complex error scenarios

Alits transforms this by providing:
- **Complete TypeScript Definitions**: AI assistants can understand the entire Live Object Model
- **Modern Patterns**: Familiar async/await and Observable patterns
- **Clear Object Relationships**: AI can suggest proper navigation paths
- **Comprehensive Documentation**: TypeScript definitions serve as living documentation

**Code Maintainability:**
- **Classical**: Brittle string paths, manual validation, callback complexity
- **Alits**: Type-safe navigation, automatic error handling, reactive patterns

**Learning Curve:**
- **Classical**: Must learn Max/MSP messaging paradigm, ES5 limitations, manual validation
- **Alits**: Familiar TypeScript patterns, modern async/await, Observable-based reactive programming

This transformation enables developers to focus on creative problem-solving rather than fighting with the underlying API, while making the entire Live Object Model accessible to AI coding assistants for the first time.

### Observability and Reactive Programming with RxJS

A key differentiator of Alits is its integration with RxJS to provide Observable-based reactive programming patterns for the Live Object Model. This transforms the callback-heavy Max for Live API into a modern, stream-based approach that aligns with contemporary TypeScript development practices.

#### Reactive Property Observation

Instead of the classical callback-based approach:
```javascript
// Classical Max for Live - callback-based observation
const track = new LiveAPI((args) => {
  const argsArray = arrayfromargs(args);
  console.log('Track color changed:', argsArray[1]);
}, "live_set tracks 0");
track.property = 'color';
```

Alits provides Observable-based property observation:
```typescript
// Alits - Observable-based reactive programming
track.observe_color().subscribe(newColor => {
  console.log('Track color changed:', newColor);
});

// Multiple property observations with RxJS operators
combineLatest([
  track.observe_color(),
  track.observe_mute(),
  track.observe_volume()
]).subscribe(([color, mute, volume]) => {
  updateTrackDisplay({ color, mute, volume });
});
```

#### Generalized Observability Framework

Alits includes a systematic approach to exposing all Live Object Model observable properties as RxJS streams, enabling:

- **Automatic Property Streaming**: Any Live Object Model property that supports observation becomes an Observable
- **RxJS Operator Integration**: Use `map`, `filter`, `debounce`, `combineLatest`, and other operators for complex reactive logic
- **Memory Management**: Automatic subscription cleanup and resource management
- **Type Safety**: Observable streams maintain full TypeScript type information

#### Real-World Reactive Applications

The reactive capabilities enable sophisticated applications that automatically respond to Live Object Model changes:

- **Live Dashboard**: Real-time updates of track states, clip positions, and device parameters
- **Automated Workflows**: Trigger actions based on complex combinations of Live events
- **Performance Monitoring**: Stream-based analysis of Live performance metrics
- **Dynamic UI**: Reactive interfaces that update automatically as Live state changes

**Detailed Analysis:**
For comprehensive coverage of Alits' observability and RxJS integration, including implementation patterns, utility functions, and advanced reactive programming techniques, see:

**[Observability and RxJS Integration](./brief-M4L-observability-and-rxjs.md)** - Complete guide covering:
- Generalized Observable property observation framework
- RxJS operator integration patterns
- Memory management and subscription cleanup
- Advanced reactive programming techniques for Live Object Model
- Real-world examples of reactive Max for Live applications

### AI Coding Methodology

**The Bootstrapping Challenge:**
Creating a comprehensive TypeScript API for the Live Object Model presents a unique bootstrapping problem: AI coding assistants have limited training data on the Max for Live API, and the [Live Object Model documentation](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model) is primarily graphical and fragmented across individual component pages. This makes it difficult for AI assistants to understand the complete structure and relationships between components.

**API Version Focus:**
Alits will specifically target the **Max 8 Live Object Model API** as documented in the [legacy Max 8 documentation](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model). While a newer version is available, Max 8 is the one that most users with Ableton Live Suite have as of 2025. Updating to Max 9 may come in a future version, but it is not scheduled or a priority right now.

**Component-by-Component Implementation Strategy:**
To solve this bootstrapping problem, we will implement Alits using a systematic, component-by-component approach:

1. **Research & Documentation Phase** (Per Component):
    - THE Research & Documentation STAGE WILL NOT PRODUCE CODE FRAGMENTS BUT DOCUMENTATION OF HIGH-LEVEL DESCRIPTIONS OF THE REQUIRED DETAILS TO CODE LATER
   - Before coding any Live Object Model component, create a dedicated analysis markdown file named `{ComponentName}-analysis.md`
   - Extract and document all properties, methods, relationships, and constraints for that specific component from the [Live Object Model documentation](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model)
   - Include TypeScript interface definitions, Observable patterns, and integration points
   - Document any Max for Live API quirks or special behaviors specific to that component

2. **Information Sharding Process**:
   - The complete Live Object Model documentation is too extensive to work with as a single unit
   - Each component analysis file will contain only the relevant information for that specific component
   - This creates focused, digestible context for AI coding assistants to work with
   - Analysis files serve as living documentation and reference for future development

3. **Test-Driven Development**:
   - Create comprehensive test suites for each component before implementation
   - Tests will validate both the TypeScript API design and the underlying Max for Live API integration
   - Test files will serve as additional documentation and examples for AI assistants

4. **AI Assistant Context Building**:
   - Each analysis file provides focused context about one component's behavior and relationships
   - AI assistants can reference these analysis files to understand component-specific requirements
   - The systematic approach ensures consistent API patterns across all components

**Example Component Analysis Structure:**
```markdown
# Track Component Analysis

## Live Object Model Reference
- Canonical Path: `live_set tracks N`
- Parent: Song
- Children: clip_slots, devices, view

## Properties (TypeScript Mappings)
- name: string (get, set, observe)
- color: number (get, set, observe) - RGB format 0x00rrggbb
- mute: boolean (get, set, observe)

## Methods (TypeScript Mappings)
- get_clip_slots(): Promise<ClipSlot[]>
- observe_color(): Observable<number>

## Integration Points
- Connects to Song via tracks array
- Contains ClipSlot objects in clip_slots array
- Contains Device objects in devices array
```

This methodology ensures that AI coding assistants have the focused, accurate context they need to implement each component correctly, while building a comprehensive knowledge base for the entire Live Object Model.

## Target Users

**Primary User Segment: TypeScript Developers Working with Ableton Live**

**Demographic Profile:**
- Professional music producers, sound designers, and audio engineers working with AI Coding assistants to build max for live devices
- Software developers with TypeScript/JavaScript expertise
- Max for Live device creators looking for modern development tools
- Music technology companies building Live-integrated applications

**Wants (Desired Behaviors and Workflows):**
- Want to build complex audio applications that require programmatic control of Live
- Want to rely heavily on IDE autocomplete and type safety in their development workflow
- Want to use modern web development tools and expect similar developer experiences
- Want to build sophisticated Max for Live devices with modern development practices
- Want to work with Observable patterns and functional reactive programming in Live projects
- Want AI coding assistant compatibility for complex Live API interactions

**Specific Needs and Pain Points:**
- Need type-safe access to Live Object Model properties and methods
- Require IDE autocomplete support for faster development
- Want Observable-based property observation instead of callback patterns
- Need comprehensive documentation and examples for Live Object Model usage
- Currently struggle with Max for Live's string-based API and callback patterns
- IDE autocomplete for Max for Live in TypeScript is not currently available

**Goals They're Trying to Achieve:**
- Create sophisticated Max for Live devices with modern development practices
- Build Live-integrated applications with reliable, maintainable code
- Reduce development time through better tooling and type safety
- Enable AI coding assistants to help with Live Object Model development
- Integrate Live control into web-based music applications

**Secondary User Segment: Max for Live Veterans Seeking Modern Tools**

**Demographic Profile:**
- Experienced Max for Live developers familiar with the current API
- Music producers who have built custom devices but want better development experience
- Educational institutions teaching Max for Live development
- **Non-coders who want to use AI coding tools to build new Ableton Live interfaces**

**Wants (Desired Behaviors and Workflows):**
- Want to start using AI coding tools to build new Ableton Live interfaces
- Want to maintain their existing Max for Live knowledge while gaining modern tooling
- Want better error handling and debugging capabilities
- Want more maintainable code for complex projects
- Want to leverage modern JavaScript/TypeScript ecosystem tools
- Want to modernize their development workflow without losing Max for Live expertise
- **Want to use AI coding assistants to build what they imagine, even without traditional coding skills**

**Specific Needs and Pain Points:**
- Comfortable with Max/MSP messaging paradigm but recognize its limitations
- Build complex devices that push the boundaries of what's possible
- Need better error handling and debugging capabilities
- Require more maintainable code for complex projects
- Want to access modern development tools while staying within the Max ecosystem
- **Currently cannot effectively use AI coding tools due to Max for Live's string-based API limitations**
- **Have creative ideas for Live interfaces but lack the coding skills to implement them**

**Goals They're Trying to Achieve:**
- **Use AI coding tools to build sophisticated Ableton Live interfaces without traditional programming knowledge**
- Modernize their development workflow without losing Max for Live expertise
- Build more reliable and maintainable Max for Live devices
- Access modern development tools while staying within the Max ecosystem
- Share their knowledge more effectively with the broader developer community
- **Bridge the gap between creative vision and technical implementation through AI-assisted development**

## Goals & Success Metrics

**Business Objectives:**
- Complete 80% coverage of the Live Object Model API within 6 months
- Achieve 3+ active developers using Alits for Max for Live device development
- Enable 1+ non-coder music producer to build custom Live interfaces using AI coding tools
- Create a functional TypeScript API that demonstrates the concept works
- Build a foundation for future community contributions

**User Success Metrics:**
- Developers can build Max for Live devices faster than with current string-based API
- Developers report improved development experience with IDE autocomplete support
- AI coding assistants can help users implement Live Object Model features
- Non-coders can successfully build functional Live interfaces using AI coding tools
- Reduction in runtime errors due to type safety improvements

**Key Performance Indicators (KPIs):**
- **API Coverage**: 80% of Live Object Model components implemented within 6 months
- **Active Developers**: 3+ developers actively using Alits for Max for Live development
- **Non-coder Success**: 1+ non-coder successfully building Live interfaces with AI coding tools
- **Documentation Quality**: Analysis files created for all implemented components
- **Test Coverage**: Comprehensive test suites for implemented components
- **AI Coding Success**: AI assistants can effectively help with Live Object Model implementation
- **Developer Experience**: Positive feedback on IDE autocomplete and type safety features
- **Error Reduction**: Measurable reduction in type-related runtime errors

## Project Phases

**Phase-Based Implementation Strategy:**
Alits will be implemented in phases following the Live Object Model hierarchy, starting with core components and building up to specialized device types. Each phase will be released as a functional milestone, allowing for early feedback and iterative improvement.

**Phase 1: Foundation (Months 1-2)**
- **Core Objects**: Application, Song, Song.View
- **Basic Infrastructure**: TypeScript project setup, RxJS integration, testing framework
- **AI Coding Methodology**: Establish analysis file templates and documentation standards
- **Deliverable**: Basic Live Set access with type-safe properties

**Phase 2: Track & Scene Basics (Months 2-3)**
- **Track Layer**: Track, Track.View, Track.ClipSlots, Track.Devices
- **Scene Layer**: Scene, Scene.ClipSlots
- **Special References**: Song.VisibleTracks, Song.SelectedTrack, Track.GroupTrack
- **Deliverable**: Complete track and scene manipulation with Observable patterns

**Phase 3: Clip Layer (Months 3-4)**
- **Clip Components**: ClipSlot, Clip, Clip.View
- **Clip Operations**: Create, delete, and manipulate clips with type safety
- **Deliverable**: Full clip management capabilities

**Phase 4: Device Layer (Months 4-5)**
- **Core Device**: Device, Device.Parameters, Device.View
- **Device I/O**: AudioInputs, AudioOutputs, MidiInputs, MidiOutputs
- **Basic Device Types**: MaxDevice, basic device parameter control
- **Deliverable**: Device parameter manipulation and basic device control

**Phase 5: Advanced Devices (Months 5-6)**
- **Rack Devices**: RackDevice, Chain, ChainMixerDevice
- **Drum Racks**: DrumChain, DrumPad, DrumCellDevice
- **Deliverable**: Complex device routing and drum rack functionality

**Modular Library Architecture:**
Following the modular approach outlined in the idea file, Alits will be structured as a collection of focused libraries grounded in the actual Live Object Model structure from the [Max 8 documentation](https://docs.cycling74.com/legacy/max8/vignettes/live_object_model):

**Core Foundation Libraries:**
- **`alits-core`**: Foundation objects - Application, Application.View, Song, Song.View
- **`alits-tracks`**: Track layer - Track, Track.View, Track.ClipSlots, Track.Devices, Track.ArrangementClips
- **`alits-scenes`**: Scene management - Scene, Scene.ClipSlots
- **`alits-clips`**: Clip layer - ClipSlot, Clip, Clip.View

**Device-Specific Libraries:**
- **`alits-devices`**: Base device functionality - Device, Device.View, Device.Parameters, DeviceIO
- **`alits-racks`**: Rack devices - RackDevice, RackDevice.View, Chain, ChainMixerDevice
- **`alits-drums`**: Drum rack functionality - DrumChain, DrumPad, DrumCellDevice
- **`alits-simpler`**: Simpler device - SimplerDevice, SimplerDevice.View, Sample
- **`alits-stock-devices`**: Common stock devices - Eq8Device, CompressorDevice, WavetableDevice, PluginDevice, etc.

**Specialized Libraries:**
- **`alits-control-surface`**: Control surface integration - ControlSurface
- **`alits-cue-points`**: Cue point management - CuePoint
- **`alits-groove`**: Groove functionality - GroovePool, Groove
- **`alits-tuning`**: Tuning system - TuningSystem
- **`alits-logging`**: Logging utilities for Ableton Live
- **`alits`**: Meta-package that references the entire collection

**Library Boundary Analysis:**
Each library is designed around natural LOM component groupings:
- **Core libraries** follow the hierarchical structure (Application → Song → Track → Scene → Clip)
- **Device libraries** group by device type and complexity (base devices → racks → drums → specific devices)
- **Specialized libraries** contain standalone or rarely-used components
- **Boundaries minimize cross-dependencies** while maintaining logical groupings

**Phase Success Criteria:**
Each phase is considered complete when:
1. All planned components have TypeScript classes with full type definitions
2. Analysis files are created for each component following AI Coding Methodology
3. Comprehensive test suites demonstrate functionality
4. Observable patterns are implemented for all observable properties
5. IDE autocomplete works correctly for all implemented features
6. AI coding assistants can effectively help with component implementation

**Key Rationale & Trade-offs:**
- **Hierarchical approach** - Follows the natural Live Object Model structure
- **Incremental value** - Each phase delivers functional capabilities
- **Modular architecture** - Allows users to import only what they need
- **Early feedback** - Phases enable testing and validation before full implementation
- **Realistic timeline** - 6-month target aligns with hobby project constraints

**Key Assumptions:**
- Core components (Song, Track, Clip) provide sufficient value for initial adoption
- Modular architecture will enable community contributions to specific device types
- Phase-based approach allows for iterative improvement based on user feedback
- Each phase builds naturally on the previous phase's foundation

## MVP Scope

**Core Features (Must Have):**
- **Phase 1 & 2 Components**: Application, Song, Song.View, Track, Track.View, Scene, Scene.ClipSlots
- **Type-Safe Property Access**: Methods like `get_name()`, `get_color()`, `set_mute()` with proper TypeScript types
- **Observable Property Observation**: RxJS-based property observation methods like `observe_color()` returning Observables
- **IDE Autocomplete Support**: Full TypeScript definitions enabling IntelliSense for all implemented components
- **Component Analysis Documentation**: Analysis files for each implemented component following the AI Coding Methodology
- **Basic Test Suite**: Unit tests for core functionality demonstrating the API works
- **Max 8 Compatibility**: Full compatibility with Max 8 Live Object Model API
- **Core Library Structure**: `alits-core` and `alits-tracks` libraries with proper modular architecture

**Out of Scope for MVP:**
- Clip layer (ClipSlot, Clip, Clip.View) - Phase 3
- Device layer (Device, DeviceParameters) - Phase 4
- Advanced devices (RackDevice, DrumChain, etc.) - Phase 5
- Specialized components (CuePoint, GroovePool, TuningSystem)
- Control Surface integration
- Advanced error handling and logging
- Documentation website
- NPM package publishing
- Community contribution workflows

**AI Coding Workflow & Standards (MVP Critical):**
The MVP must establish the foundation for autonomous AI-assisted development of each component:

- **Component Analysis Template**: Standardized markdown template for documenting each Live Object Model component before implementation
- **Coding Standards Document**: TypeScript coding conventions, naming patterns, and architectural guidelines that AI assistants can follow
- **AI Coding Workflow**: Step-by-step process for using AI assistants to implement each component autonomously
- **Testing Standards**: Unit test patterns and coverage requirements that ensure AI-generated code meets quality standards
- **Documentation Standards**: How to write analysis files that provide AI assistants with the focused context they need
- **Code Review Process**: How to validate AI-generated code against Live Object Model requirements and project standards

**MVP Success Criteria:**
The MVP is successful when a developer can:
1. Create a TypeScript Max for Live device that uses Alits
2. Access Song and Track properties with full IDE autocomplete support
3. Observe Track color changes using Observable patterns
4. Manipulate Scene properties with type-safe methods
5. Build a functional device that demonstrates the core concept works
6. Use AI coding assistants effectively with the TypeScript API
7. Import only the libraries they need (`alits-core`, `alits-tracks`)
8. **Follow established AI coding workflow to implement new components autonomously**
9. **Apply coding standards consistently across all AI-generated code**

## Coding Conventions & Standards

**Development Standards for AI-Assisted Implementation:**

Alits follows strict coding conventions designed to ensure consistency across AI-generated code and maintain high code quality. These standards are critical for enabling autonomous AI-assisted development of Live Object Model components.

**Core Conventions:**

- **TypeScript-First Design**: All public APIs use camelCase methods with explicit return types (`Promise<T>`, `Observable<T>`)
- **Object-Oriented Wrapping**: External API never exposes raw string paths; all functions work with Alits objects
- **RxJS Integration**: Observable-based property observation for all Live Object Model properties with `observe` access
- **Async/Await Patterns**: Asynchronous getters and setters return Promises, avoiding callback-style APIs
- **Systematic Logging**: Centralized logging utility with levels (debug, info, warn, error) integrated with Max console
- **Unit Testing Focus**: Comprehensive unit tests with mocked LiveAPI, limited integration testing due to M4L constraints

**AI Coding Workflow Standards:**

- **Component Analysis Documentation**: Each Live Object Model component requires a dedicated analysis file before implementation
- **Test-Driven Development**: Unit tests created before implementation to validate TypeScript API design
- **Consistent Naming Patterns**: PascalCase for classes, camelCase for methods, following modern TypeScript conventions
- **Resource Management**: Proper Observable subscription cleanup and LiveAPI resource management

**Quality Assurance:**

- **Type Safety**: All methods must return explicit types with compile-time error checking
- **Error Handling**: Invalid objects throw typed errors instead of requiring manual validation
- **Documentation**: TypeScript definitions serve as living documentation for AI assistants
- **Code Review Process**: Validation against Live Object Model requirements and project standards

**Detailed Implementation Guidelines:**

For comprehensive coding conventions, architectural guidelines, and AI coding workflow standards, see:

**[Coding Conventions & Standards](./brief-coding-conventions.md)** - Complete guide covering:
- TypeScript naming conventions and type safety requirements
- RxJS integration patterns and Observable design principles
- Testing strategy with mocked LiveAPI and unit test patterns
- Logging conventions with Max console integration
- API parameter design and object-oriented wrapping principles
- AI coding workflow standards for autonomous component implementation

These conventions ensure that AI coding assistants can implement Live Object Model components consistently while maintaining the high code quality standards required for a production TypeScript library.

## Technical Requirements & Constraints

**Core Technical Requirements:**
- **TypeScript 5.6+**: Modern TypeScript features for advanced type safety and developer experience
- **RxJS 7.0+**: Observable-based reactive programming for property observation
- **Max for Live API Compatibility**: Full compatibility with Max 8 Live Object Model API
- **Node.js 22+**: Modern JavaScript runtime for development and testing (as specified in Dockerfile)
- **ES Modules**: Modern module system for clean imports and tree-shaking

**Monorepo Infrastructure:**
- **Turborepo**: High-performance build system for monorepo management
- **pnpm**: Fast, disk space efficient package manager with workspace support
- **Rollup**: Module bundler for creating optimized packages with tree-shaking
- **Jest**: Testing framework for unit tests and component validation
- **Prettier**: Code formatting for consistent style across all packages
- **Changesets**: Version management and publishing workflow for packages

**Development Environment Requirements:**
- **Dev Containers**: Docker-based development environment with VS Code integration
- **Ableton Live 11+**: Target environment for Max for Live device development
- **Max 8**: Required for Live Object Model API access
- **VS Code**: Primary IDE with TypeScript support and dev container integration
- **Git**: Version control for collaborative development

**Package Architecture:**
- **Modular Packages**: Separate packages for different Live Object Model components (`@alits/core`, `@alits/tracks`, etc.)
- **Scoped NPM Packages**: `@alits/*` namespace for package organization
- **Dual Module Support**: Both CommonJS and ES Module outputs for maximum compatibility
- **TypeScript Declarations**: Full `.d.ts` files for all packages

**Performance Constraints:**
- **Low Latency**: Property observation must not introduce noticeable delay
- **Memory Efficiency**: Observable subscriptions must be properly managed to prevent leaks
- **Bundle Size**: Modular architecture must enable tree-shaking for minimal bundle sizes
- **Build Performance**: Turborepo caching must enable fast incremental builds

**Compatibility Constraints:**
- **Max 8 API Only**: Focus exclusively on Max 8 Live Object Model, not Max 9
- **TypeScript Only**: No JavaScript fallback - TypeScript is required for type safety
- **Node.js 18+**: Minimum Node.js version for development (as specified in package.json engines)
- **Modern Browsers**: ES2020+ support for development tools and documentation

