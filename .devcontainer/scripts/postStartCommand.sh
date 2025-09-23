#!/bin/bash
# postStartCommand.sh
set -e

echo "🔄 Post-start verification..."

# Quick verification that everything is still working
if [ -f "scripts/setup-ableton-git.sh" ]; then
    echo "🔍 Verifying Ableton Git configuration..."
    ./scripts/setup-ableton-git.sh --verify > /dev/null 2>&1 || {
        echo "⚠️  Ableton Git configuration needs refresh, reconfiguring..."
        ./scripts/setup-ableton-git.sh --global
    }
fi

echo "✅ Development environment ready!"