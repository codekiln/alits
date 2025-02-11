title:	Feature request: Max for Live compatibility - make it possible to compile all js assets to the root directory (not lib/) for use in Max for Live
state:	OPEN
author:	codekiln
labels:	
comments:	0
assignees:	
projects:	
milestone:	
number:	28
--
Thanks for scaffolding out this ecosystem of repositories for using typescript with max!

## tl;dr Requested Feature Description
* make it possible for an application to configure `maxmsp.config.json` so as to not have `maxmsp` compiled assets put in subdirectories or expect the `lib/*` structure, so that Max for Live users can utilize it without needing to manually update their Max search path. 

## Context
I'm trying to write an Ableton Max for Live plugin with your template over at https://github.com/codekiln/alits. It's the first time I've made a Max for Live plugin, so please forgive me in advance if I've misunderstood something about Max, Max for Live, etc.  

Like most Ableton users, I don't have a standalone license to Max, and as a result, I can't create a Max Project file with the path references to the compiled artifacts in subdirectories. 

For example, `lib/${effectivePath}/${alias}_index.js` will not be available to the users of my Max for Live device unless I provide instructions to them to edit their [[c74/max/File Browser]] and add a path for each folder individually, because while Max for Live is capable of opening Max Projects, it's not capable of saving or editing them.

I realize that Max's unique javascript model requires each js file to be uniquely named, and I think the aliasing functionality might be sufficient to meet that requirement without needing folders in the case of Max for Live.

## Feature Request

If `apps/kebricide/maxmsp.config.json` has:
```json
{
  "output_path": "",
  "dependencies": {
    "@my-username/my-library": {
      "alias": "myLibrary",
      "files": ["index.js"],
      "path": ""
    }
  }
}
```

and `apps/kebricide/tsconfig.json` has:
```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES5",
    "ignoreDeprecations": "5.0",
    "strict": true,
    "noImplicitAny": true,
    "sourceMap": false,
    "outDir": "./Project",
    "baseUrl": "src",
    "types": ["maxmsp"],
    "lib": ["es5"]
  },
  "include": ["./src/**/*.ts"]
} 
```

then currently, `pnpm dev` -> `maxmsp dev` ends up calling `postBuild()` which results in: 
```
apps/kebricide/Project/@my-username-my-library/myLibrary_index.js
apps/kebricide/Project/kebricide.js
apps/kebricide/Project/maxmsp-test.amxd
```
instead of:
```
apps/kebricide/Project/myLibrary_index.js
apps/kebricide/Project/index.js
apps/kebricide/Project/maxmsp-test.amxd
```

Also, of course, `myLibrary_index.js` would need to have its require statements updated so as to no longer expect the results to be located in a subdirectory.

I will likely implement the changes in a fork as they are necessary for my use case. I'd love to submit a PR if you are welcome to that. Please let me knokw if you have any advice or guidance in this matter.
