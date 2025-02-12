* [ ] copy `packages/my-library` recursively to `packages/alits-core`
* [ ] rename everything about the copied `packages/alits-core` so it doesn't contain `my-library` references anymore
  *  update `apps/kebricide` so it points to `packages/alits-core` instead of `my-library`
* [ ] compilation works at a basic level when utilized in `apps/kebricide/Project/kebricide.amxd`
* even though `apps/maxmsp-test` depends on `packages/my-library`, we won't touch that
