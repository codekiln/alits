# Manual Testing Agents Guide

## Overview

This document provides guidance for AI agents working on manual test fixtures, particularly for Max for Live development environments. It outlines the specific considerations, workflows, and best practices for effective human-AI collaboration in manual testing.

**📋 Standards**: All fixtures follow the [Manual Test Fixture Structure Standards](../../../docs/manual-test-fixture-standards.md) defined in the root docs folder.

## Agent Roles and Responsibilities

### QA Agent (Primary)
- **Role**: Test architecture review and quality gate decisions
- **Responsibilities**:
  - Review manual test fixtures for completeness
  - Validate Max 8 compatibility requirements
  - Ensure systematic testing approaches
  - Provide quality gates for test readiness

### Dev Agent (Implementation)
- **Role**: Code implementation and debugging
- **Responsibilities**:
  - Implement manual test fixtures
  - Debug Max 8 compatibility issues
  - Build and bundle packages for testing
  - Fix issues based on human feedback

### Analyst Agent (Research)
- **Role**: Research and documentation
- **Responsibilities**:
  - Research Max for Live limitations
  - Document compatibility requirements
  - Analyze testing workflows
  - Provide technical guidance

## Max for Live Specific Considerations

### Environment Constraints
- **JavaScript Engine**: Max 8 uses JavaScript 1.8.5 (ES5-based)
- **No DOM APIs**: No `setTimeout`, `setInterval`, `window` object
- **No ES6 Features**: No native `Map`, `Set`, `Promise` support
- **File Size**: No documented limits, but large bundles may cause issues

### Debugging Limitations
- **Minified Code**: Makes error tracing impossible
- **No Source Maps**: Max 8 doesn't support source maps
- **Limited Console**: Basic `post()` function for output
- **No DevTools**: No browser-like debugging tools

## Workflow Standards for Agents

### 1. Build Identification System
Every agent should ensure build identification is included:

```javascript
function printBuildInfo() {
    post('[BUILD] Entrypoint: LiveSetBasicTest\n');
    post('[BUILD] Git: ' + getGitInfo() + '\n');
    post('[BUILD] Timestamp: ' + new Date().toISOString() + '\n');
    post('[BUILD] Source: @alits/core debug build\n');
    post('[BUILD] Max 8 Compatible: Yes\n');
}
```

### 2. Non-Minified Debug Builds
- **Always use non-minified builds** for Max 8 testing
- **Include source maps** for development builds
- **Separate debug builds** from production builds
- **Clear error messages** with line numbers

### 3. Systematic Problem Solving
- **Avoid quick fixes** and hand-crafted solutions
- **Implement systematic solutions** with proper root cause analysis
- **Document assumptions** and limitations
- **Test actual limitations** scientifically rather than assuming

## Agent-Specific Guidelines

### QA Agent Guidelines

#### Review Checklist
- [ ] Build identification is included
- [ ] Non-minified debug build is used
- [ ] All dependencies are Max 8 compatible
- [ ] Error handling is comprehensive
- [ ] Console output is informative
- [ ] Test coverage is adequate
- [ ] No regression in existing functionality

#### Quality Gates
- **PASS**: All tests pass in Max 8 environment
- **CONCERNS**: Minor issues that don't block testing
- **FAIL**: Critical issues that prevent testing
- **WAIVED**: Issues explicitly accepted with justification

### Dev Agent Guidelines

#### Implementation Standards
- **Use production builds** from `dist/` directory
- **Avoid hand-crafted minimal versions**
- **Implement proper error handling**
- **Include comprehensive logging**
- **Follow TypeScript best practices**

#### Debugging Protocol
1. **Identify root cause** of issues
2. **Implement systematic solutions**
3. **Test in Max 8 environment**
4. **Document changes and rationale**
5. **Update build identification**

#### Git Workflow Standards
- **Targeted staging**: Use `git add <specific-files>` instead of `git add -A`
- **Review before commit**: Always run `git status` to verify staged files
- **Conventional commits**: Use emoji prefixes and proper commit message format
- **Focused commits**: Make commits that represent logical units of work
- **Clear commit messages**: Include story reference and descriptive summary

### Analyst Agent Guidelines

#### Research Protocol
- **Document Max for Live limitations** with official sources
- **Research compatibility requirements** systematically
- **Analyze testing workflows** for efficiency
- **Provide technical guidance** based on evidence

#### Documentation Standards
- **Cite official sources** for limitations
- **Provide clear examples** of solutions
- **Document assumptions** and rationale
- **Update documentation** as new information emerges

## Communication Protocols

### Human to Agent
- **Be specific** about error messages and console output
- **Include build context** (git hash, timestamp)
- **Describe the testing environment** (Max version, Live version)
- **Provide step-by-step reproduction** steps
- **Ask for systematic solutions** rather than quick fixes

### Agent to Human
- **Provide build identification** for every change
- **Explain the root cause** of issues
- **Document assumptions** and limitations
- **Suggest systematic solutions** with rationale
- **Ask clarifying questions** when needed

## Common Anti-Patterns to Avoid

### 1. Quick Fixes
- **Don't**: Create hand-crafted minimal versions
- **Do**: Fix the root cause systematically

### 2. Assumptions About Limitations
- **Don't**: Assume file size limits without evidence
- **Do**: Test actual limitations scientifically

### 3. Minified Code for Testing
- **Don't**: Use minified builds for debugging
- **Do**: Use non-minified debug builds

### 4. Whack-a-Mole Debugging
- **Don't**: Fix symptoms without understanding causes
- **Do**: Implement systematic solutions

### 5. Indiscriminate Git Staging
- **Don't**: Use `git add -A` without reviewing changes
- **Do**: Use targeted `git add <specific-files>` and review with `git status`

## Tools and Resources

### Max for Live Documentation
- [Max JavaScript Documentation](https://docs.cycling74.com/legacy/max8/vignettes/jsintro)
- [Max Global Methods](https://docs.cycling74.com/legacy/max8/vignettes/jsglobal)
- [Task Object for Scheduling](https://docs.cycling74.com/legacy/max7/vignettes/jstaskobject)

### Development Tools
- **TypeScript**: For type-safe development
- **Rollup**: For bundling with source maps
- **Git**: For version control and build identification
- **pnpm**: For package management

### Git Best Practices
- **Use targeted git add**: Always use `git add <specific-files>` instead of `git add -A`
- **Review changes**: Check `git status` before committing to ensure only intended files are staged
- **Commit granularity**: Make focused commits with clear, descriptive messages
- **Follow conventional commits**: Use emoji prefixes and proper commit message format

### Testing Infrastructure
- **Manual Test Fixtures**: For Max 8 compatibility testing
- **Build Identification**: For tracking changes
- **Console Output**: For debugging and feedback
- **Progress Documentation**: For tracking development

## Success Metrics

### Effective Agent Performance
- **Clear communication** with human testers
- **Systematic problem solving** rather than quick fixes
- **Comprehensive documentation** of issues and solutions
- **Reproducible testing** procedures
- **Scalable debugging** workflows

### Quality Assurance
- **All tests pass** in target environment
- **No regression** in existing functionality
- **Clear error messages** for debugging
- **Comprehensive test coverage** of functionality
- **Production-ready** code quality

## Conclusion

Effective agent performance in manual testing requires:
1. **Clear role definition** and responsibilities
2. **Systematic approaches** to problem solving
3. **Comprehensive documentation** and communication
4. **Scalable debugging** workflows
5. **Quality-focused** development practices

By following these guidelines, agents can provide effective support for manual testing workflows in Max for Live environments.
