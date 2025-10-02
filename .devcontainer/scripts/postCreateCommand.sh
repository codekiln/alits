#!/bin/bash
# postCreateCommand.sh
set -e

echo "🚀 Post-create setup (most setup is done in Dockerfile)..."

# Only run if we need to refresh dependencies or fix permissions
if [ ! -d "node_modules" ] || [ ! -w "$PNPM_HOME" ]; then
    echo "🔧 Refreshing dependencies and permissions..."
    pnpm install --frozen-lockfile
fi

# ADD THIS BLOCK to ensure filters are configured GLOBALLY for the 'node' user
echo "🔧 Configuring Ableton Git filters globally for 'node' user..."
if [ -f "scripts/setup-ableton-git.sh" ]; then
    ./scripts/setup-ableton-git.sh --global
fi

echo "✅ Post-create setup complete!"