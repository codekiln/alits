title: Pull maxmsp-ts into monorepo temporarily for M4L compatibility
type: pull_request
base: main
author: codekiln
--
This PR temporarily pulls maxmsp-ts into our monorepo to address Max for Live compatibility issues until aptrn/maxmsp-ts#28 is resolved or aptrn/maxmsp-ts#29 is merged.

## Why
Currently, our CI builds are failing because they can't access the correct version of maxmsp-ts that supports compiling assets to the root directory for Max for Live compatibility. This is blocking development and CI pipelines.

## Changes
- Adds maxmsp-ts package to monorepo workspace
- Updates kebricide to use workspace version (`@codekiln/maxmsp-ts: "workspace:*"`) instead of external dependency
- Maintains compatibility with Max for Live by allowing compilation to root directory

### Migration Plan
Once aptrn/maxmsp-ts#28 is fixed or PR #29 is merged upstream, we will:
1. Remove the local maxmsp-ts package
2. Switch back to using the npm published version
3. Update all dependent packages accordingly

### Testing
- [ ] Verify CI builds pass with workspace version
- [x] Confirm Max for Live compatibility works
- [x] Test kebricide builds with workspace dependency

### Related Issues
- Fixes CI build failures (see job [36954570963](https://github.com/codekiln/alits/actions/runs/13240482396/job/36954570963))
- Temporary solution for aptrn/maxmsp-ts#28
- Implements #20

This is a temporary solution until upstream changes are merged.
