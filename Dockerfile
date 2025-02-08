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

# necessary because of https://github.com/nodejs/corepack/issues/612
# https://github.com/npm/cli/issues/8075#issuecomment-2628545611
RUN npm install -g corepack@latest --force
RUN corepack --version
RUN corepack enable
RUN node -v

RUN corepack use pnpm@latest
RUN corepack enable pnpm

COPY . /app
WORKDIR /app

COPY . .

# preferably, we'd do multi-stage builds here
RUN pnpm install
RUN pnpm build

CMD ["pnpm", "run", "dev"]