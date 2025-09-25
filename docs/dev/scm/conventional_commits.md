# Conventional Emoji Commits Specification

This document contains the official [Conventional Emoji Commits](https://conventional-emoji-commits.site/full-specification/specification) specification for the Alits project, which merges [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with [Gitmoji](https://gitmoji.dev/specification) for enhanced commit message clarity and standardization.

## Summary

The Conventional Emoji Commits specification is an adaptation of the Conventional Commits specification, adding a splash of color to your commits through emojis. It provides an easy set of rules for creating an explicit commit history, making it easier to write automated tools on top of. This convention dovetails with [SemVer](http://semver.org/), by describing the features, fixes, and breaking changes made in commit messages.

## The Conventional Emoji Commits Specification

The Conventional Emoji Commits specification merges the clarity of [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with the visual expressiveness of [Gitmoji](https://gitmoji.dev/specification), providing both human and machine-readable meaning to commit messages.

## Format

The commit message should be structured as follows:

```
<emoji> <type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. **✨ feat**: a commit of the type `✨ feat` introduces a new feature to the codebase (this correlates with `MINOR` in Semantic Versioning).
2. **🩹 fix**: a commit of the type `🩹 fix` patches a bug in your codebase (this correlates with `PATCH` in Semantic Versioning).
3. **🚨 BREAKING CHANGE**: a commit that has a footer `🚨 BREAKING CHANGE:`, or appends a `❗` after the type/scope, introduces a breaking API change (correlating with `MAJOR` in Semantic Versioning). A `🚨 BREAKING CHANGE` can be part of commits of any _type_.
4. _types_ other than `✨ feat` and `🩹 fix` are allowed, for example `📚 docs:`, `♻️ refactor:`, `🧪 test:`, `🔧 build:`, `🎨 style:`, `⚡️ perf:`, `♿️ a11y:`, and others.
5. _footers_ other than `🚨 BREAKING CHANGE: <description>` may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

Additional types are not mandated by the Conventional Emoji Commits specification, and have no implicit effect in Semantic Versioning (unless they include a BREAKING CHANGE). A scope may be provided to a commit's type, to provide additional contextual information and is contained within parenthesis, e.g., `🩹 fix(parser): add ability to parse arrays`.

## Examples

### Commit message with description and breaking change footer
```
✨ feat: allow provided config object to extend other configs

🚨 BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### Commit message with `❗` to draw attention to breaking change
```
✨ feat❗: send an email to the customer when a product is shipped
```

### Commit message with scope and `❗` to draw attention to breaking change
```
✨ feat(api)❗: send an email to the customer when a product is shipped
```

### Commit message with both `❗` and BREAKING CHANGE footer
```
🔧 chore❗: drop support for Node 6

🚨 BREAKING CHANGE: use JavaScript features not available in Node 6.
```

### Commit message with no body
```
📚 docs: correct spelling of CHANGELOG
```

### Commit message with scope
```
✨ feat(lang): add Polish language
```

### Commit message with multi-paragraph body and multiple footers
```
🩹 fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

## Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

1. Commits MUST be prefixed with an emoji and a type, which consists of a noun, `✨ feat`, `🩹 fix`, etc., followed by the OPTIONAL scope, OPTIONAL `❗`, and REQUIRED terminal colon and space.
2. The type `✨ feat` MUST be used when a commit adds a new feature to your application or library.
3. The type `🩹 fix` MUST be used when a commit represents a bug fix for your application.
4. A scope MAY be provided after a type. A scope MUST consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., `🩹 fix(parser):`.
5. A description MUST immediately follow the colon and space after the type/scope prefix. The description is a short summary of the code changes, e.g., `🩹 fix: array parsing issue when multiple spaces were contained in string`.
6. A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
7. A commit body is free-form and MAY consist of any number of newline separated paragraphs.
8. One or more footers MAY be provided one blank line after the body. Each footer MUST consist of a word token, followed by either a `:<space>` or `<space>#` separator, followed by a string value (this is inspired by the [git trailer convention](https://git-scm.com/docs/git-interpret-trailers)).
9. A footer's token MUST use `-` in place of whitespace characters, e.g., `Acked-by` (this helps differentiate the footer section from a multi-paragraph body). An exception is made for `🚨 BREAKING CHANGE`, which MAY also be used as a token.
10. A footer's value MAY contain spaces and newlines, and parsing MUST terminate when the next valid footer token/separator pair is observed.
11. Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the footer.
12. If included as a footer, a breaking change MUST consist of the uppercase text `🚨 BREAKING CHANGE`, followed by a colon, space, and description, e.g., `🚨 BREAKING CHANGE: environment variables now take precedence over config files`.
13. If included in the type/scope prefix, breaking changes MUST be indicated by a `❗` immediately before the `:`. If `❗` is used, `🚨 BREAKING CHANGE:` MAY be omitted from the footer section, and the commit description SHALL be used to describe the breaking change.
14. Types other than `✨ feat` and `🩹 fix` MAY be used in your commit messages, e.g., `📚 docs: update ref docs.`
15. The units of information that make up Conventional Emoji Commits MUST NOT be treated as case sensitive by implementors, with the exception of `🚨 BREAKING CHANGE` which MUST be uppercase.
16. `🚨 BREAKING-CHANGE` MUST be synonymous with `🚨 BREAKING CHANGE`, when used as a token in a footer.

## Why Use Conventional Emoji Commits

- **Automatically generating CHANGELOGs** with visual context
- **Automatically determining a semantic version bump** (based on the types of commits landed)
- **Communicating the nature of changes** to teammates, the public, and other stakeholders with immediate visual cues
- **Triggering build and publish processes**
- **Making it easier for people to contribute to your projects**, by allowing them to explore a more structured and visually clear commit history

## Alits Project Specific Implementation

### Commit Types Used in Alits

- `✨ feat`: A new feature
- `🩹 fix`: A bug fix
- `📚 docs`: Documentation only changes
- `🎨 style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `♻️ refactor`: A code change that neither fixes a bug nor adds a feature
- `🧪 test`: Adding missing tests or correcting existing tests
- `🔧 chore`: Changes to the build process or auxiliary tools and libraries
- `🔨 build`: Changes that affect the build system or external dependencies
- `👷 ci`: Changes to our CI configuration files and scripts
- `⚡️ perf`: A code change that improves performance
- `♿️ a11y`: Accessibility improvements
- `🔒 security`: Security-related changes
- `🚀 release`: Release-related changes
- `🔄 revert`: Reverts a previous commit

### Project-Specific Scopes

- `core`: Changes to `@alits/core` package
- `tracks`: Changes to `@alits/tracks` package
- `clips`: Changes to `@alits/clips` package
- `devices`: Changes to `@alits/devices` package
- `racks`: Changes to `@alits/racks` package
- `drums`: Changes to `@alits/drums` package
- `docs`: Documentation changes
- `build`: Build system changes
- `ci`: CI/CD pipeline changes
- `test`: Test-related changes

### Task Reference Requirements

Each commit must reference the task being worked on in the footer:
- **JIRA**: `AB-1234 The Jira Ticket Title`
- **GitHub Issues**: `#123 The GitHub Issue Title`
- **Story Files**: `docs/stories/1.2.development-workflow-standards.md`

### Example Commit Messages

```
✨ feat(core): add LiveSet abstraction with async/await API

Implements basic LiveSet class with LiveAPI integration and error handling.
Adds TypeScript interfaces for LOM objects and proper async constructor pattern.

docs/stories/1.1.foundation-core-package-setup.md
```

```
🩹 fix(tracks): resolve track selection Observable memory leak

Fixes unsubscription issue in observeSelectedTrack() method that was causing
memory leaks in long-running applications.

🚨 BREAKING CHANGE: observeSelectedTrack() now returns a different Observable type

docs/stories/1.2.track-selection-implementation.md
```

```
📚 docs: update API documentation

Adds comprehensive examples for LiveSet usage and Observable patterns.
Updates README with installation and usage instructions.

docs/stories/1.3.api-documentation-update.md
```

```
♻️ refactor(devices): simplify device parameter handling

Extracts common parameter validation logic into utility functions.
Reduces code duplication across device classes.

docs/stories/1.4.device-refactoring.md
```

## Tools and Libraries

- [commitlint](https://commitlint.js.org/) - Lint commit messages
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) - Generate changelogs from git metadata
- [semantic-release](https://github.com/semantic-release/semantic-release) - Fully automated version management and package publishing
- [husky](https://typicode.github.io/husky/) - Git hooks made easy

## Further Reading

- [Conventional Emoji Commits Website](https://conventional-emoji-commits.site/)
- [Conventional Commits Website](https://www.conventionalcommits.org/)
- [Gitmoji Guide](https://gitmoji.dev/)
- [Semantic Versioning](http://semver.org/)