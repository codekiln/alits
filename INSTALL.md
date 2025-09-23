# Installation Guide

This guide covers setting up the development environment and project-specific configurations.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Ableton Live Git Configuration](#ableton-live-git-configuration)
- [Development Environment Setup](#development-environment-setup)
- [Verification](#verification)

## Prerequisites

- Git (version 2.0 or later)
- Ableton Live (any version)
- Command line access

> **Note for Dev Container Users**: If you're using the VS Code dev container, the Ableton Git configuration is automatically set up when the container is created. You can skip the manual setup steps below.

## Ableton Live Git Configuration

This project includes Git configuration for managing Ableton Live files in version control. The setup enables readable diffs for Live Sets, Clips, and Device presets while properly handling binary files.

### Quick Setup

**For Dev Container Users:**
The Ableton Git configuration is automatically set up when the dev container is created. No manual steps required!

**For Local Development:**

1. **Copy the Git attributes file:**
   ```bash
   # The .gitattributes file is already in the project root
   # It defines how Git should handle different Ableton file types
   ```

2. **Configure Git filters:**
   
   **Quick setup (recommended):**
   ```bash
   # Run the automated setup script
   ./scripts/setup-ableton-git.sh
   
   # For global configuration (all repositories)
   ./scripts/setup-ableton-git.sh --global
   ```

   **Manual configuration:**
   
   For project-specific configuration:
   ```bash
   # Gzip filter for XML-based Ableton files (.als, .alc, .adg, .adv)
   git config filter.gzip.clean 'gzip -cn'
   git config filter.gzip.smudge 'gzip -cd'
   git config filter.gzip.required true
   git config diff.gzip.textconv 'gzip -cd'

   # Filter for Max for Live devices (.amxd)
   git config filter.amxd-strip.clean 'awk "(NR>1)"'
   git config filter.amxd-strip.smudge 'cat'
   git config filter.amxd-strip.required true
   git config diff.amxd-strip.textconv 'awk "(NR>1)"'
   ```

   For global configuration (all repositories):
   ```bash
   # Add --global flag to apply to all repositories
   git config --global filter.gzip.clean 'gzip -cn'
   git config --global filter.gzip.smudge 'gzip -cd'
   git config --global filter.gzip.required true
   git config --global diff.gzip.textconv 'gzip -cd'
   
   git config --global filter.amxd-strip.clean 'awk "(NR>1)"'
   git config --global filter.amxd-strip.smudge 'cat'
   git config --global filter.amxd-strip.required true
   git config --global diff.amxd-strip.textconv 'awk "(NR>1)"'
   ```

### What This Configuration Does

| File Type | Purpose | Git Handling | Diff Support |
|-----------|---------|--------------|--------------|
| `.als` | Live Sets | Gzipped XML filter | ✅ Readable |
| `.alc` | Live Clips | Gzipped XML filter | ✅ Readable |
| `.adg` | Device Groups | Gzipped XML filter | ✅ Readable |
| `.adv` | Device Presets | Gzipped XML filter | ✅ Readable |
| `.amxd` | Max for Live | Header strip filter | ✅ JSON diffs |
| `.ask` | Live Skins | Plain text | ✅ Direct |
| `.alp` | Live Packs | Binary | ❌ No diffs |
| `.agr` | Groove Files | Binary | ❌ No diffs |
| `.ams` | Meta Sound | Binary | ❌ No diffs |
| `.asd` | Analysis Files | Excluded | ❌ Auto-generated |

> **Note:** For detailed information about each file type, see [Ableton File Types Documentation](docs/Ableton/Ableton___File.md)

## Development Environment Setup

[Add other project-specific setup instructions here]

## Verification

### Test Ableton Git Configuration

**Using the setup script (recommended):**
```bash
# Test the configuration automatically
./scripts/setup-ableton-git.sh --test

# Show current configuration
./scripts/setup-ableton-git.sh --show

# Verify existing configuration
./scripts/setup-ableton-git.sh --verify
```

**Manual testing:**
1. **Create a test Live Set:**
   ```bash
   # Create a simple .als file or use an existing one
   touch test.als
   ```

2. **Add and commit:**
   ```bash
   git add test.als
   git commit -m "Test Ableton file handling"
   ```

3. **Verify diff works:**
   ```bash
   # Make a change to the file in Ableton Live
   # Then check the diff
   git diff test.als
   ```

4. **Expected result:** You should see readable XML content in the diff, not binary data.

### Troubleshooting

**If diffs show binary data:**
- Verify the Git filters are configured correctly
- Check that the `.gitattributes` file is in the project root
- Ensure the file extensions match exactly (case-sensitive)

**If filters don't work:**
- Verify `gzip` and `awk` are available in your PATH
- Check Git version (2.0+ required)
- Try re-adding files: `git rm --cached <file>` then `git add <file>`

**For Max for Live devices:**
- The filter strips the first line (binary header) to expose JSON
- If you see errors, verify `awk` is available and the syntax is correct for your system

## Additional Resources

- [Ableton File Types Documentation](docs/Ableton/Ableton___File.md) - Detailed explanation of each file type
- [Git Attributes Documentation](https://git-scm.com/docs/gitattributes)
- [Git Filter Documentation](https://git-scm.com/docs/git-config#Documentation/git-config.txt-filterltnamegt)

## Support

If you encounter issues with the Ableton Git configuration:

1. Check the troubleshooting section above
2. Verify your Git version and available tools
3. Review the project's Ableton file type documentation
4. Create an issue with details about your environment and the problem
