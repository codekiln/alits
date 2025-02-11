title:	pull maxmsp-ts into monorepo until original is compatible
state:	OPEN
author:	codekiln
labels:	enhancement
comments:	0
assignees:	codekiln
projects:	
milestone:	
number:	20
--
Until [Feature request: Max for Live compatibility - make it possible to compile all js assets to the root directory (not lib/) for use in Max for Live · Issue #28 · aptrn/maxmsp-ts](https://github.com/aptrn/maxmsp-ts/issues/28) issue is fixed or the MR [Max for Live compatibility - optionally compile js assets to root directory by codekiln · Pull Request #29 · aptrn/maxmsp-ts](https://github.com/aptrn/maxmsp-ts/pull/29/files) [[GitHub/MR]] is merged, pull [updated maxmsp-ts](https://github.com/codekiln/maxmsp-ts) into this monorepo.

## Failing Builds
Until this is merged, builds in CI and in the dev container will fail, since they don't have access to the right version of `maxmsp-ts`. 
 * see https://github.com/codekiln/alits/actions/runs/13240482396/job/36954570963
