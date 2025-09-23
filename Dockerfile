# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.187.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 18, 20, 22
# bookworm has ARM support
ARG VARIANT="22-bookworm"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT} AS base

# https://blog.hyperknot.com/p/corepacks-packagemanager-field
# https://github.com/nodejs/corepack/issues/485
ENV COREPACK_ENABLE_AUTO_PIN=0

# https://turbo.build/repo/docs/telemetry
ENV TURBO_TELEMETRY_DISABLED=

# https://consoledonottrack.com/
ENV DO_NOT_TRACK=1

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Create pnpm store directory with correct permissions
RUN mkdir -p $PNPM_HOME && chown -R node:node $PNPM_HOME && chmod -R 755 $PNPM_HOME

# necessary because of https://github.com/nodejs/corepack/issues/612
# https://github.com/npm/cli/issues/8075#issuecomment-2628545611
RUN npm install -g corepack@latest --force
RUN corepack --version
RUN corepack enable
RUN node -v

RUN corepack use pnpm@latest
RUN corepack enable pnpm

# Configure pnpm
RUN pnpm config set store-dir $PNPM_HOME

COPY . /app
WORKDIR /app

# Install dependencies with BuildKit cache mount for better performance
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --no-frozen-lockfile

# Configure Git for Ableton Live files during build
RUN if [ -f "scripts/setup-ableton-git.sh" ]; then \
        chmod +x scripts/setup-ableton-git.sh && \
        ./scripts/setup-ableton-git.sh --global; \
    fi

CMD ["sleep", "infinity"]