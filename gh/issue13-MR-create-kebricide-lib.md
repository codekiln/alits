title: Create Kebricide Max for Live Device Project Structure
type: pull_request
base: main
author: codekiln
--
This PR implements #13 by creating the initial project structure for the Kebricide Max for Live device.

## Changes
- Creates new `apps/kebricide` folder with TypeScript-based Max for Live device structure
- Sets up build pipeline using local fork of maxmsp-ts
- Includes initial device files and configuration

### Project Structure
```
apps/kebricide/
├── Project/              # Compiled JS and device files
│   ├── kebricide.amxd   # Max for Live device
│   ├── kebricide.js     # Compiled from TypeScript
│   └── myLibrary_index.js
├── src/                 # TypeScript source
├── package.json        
├── tsconfig.json       
└── maxmsp.config.json  
```

### Key Features
- Uses local fork of maxmsp-ts for development (`file:../../../maxmsp-ts`) until #20 or aptrn/maxmsp-ts#28 is fixed
- Integrates with workspace library `@my-username/my-library` (tested in Ableton)
- Follows M4L TypeScript project structure from zsteinkamp/m4l-typescript-base using `Project` dir

### Testing
- [x] Verify TypeScript compilation works
- [x] Test device loads in Ableton Live

### Next Steps
- Add core device functionality
- Set up automated testing
- Document development workflow

Closes #13 