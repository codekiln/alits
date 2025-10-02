# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.187.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 18, 20, 22
# bookworm has ARM support
ARG VARIANT="22-bookworm"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT} AS base

# add verbosity
ENV DEBIAN_FRONTEND=noninteractive

# https://blog.hyperknot.com/p/corepacks-packagemanager-field
# https://github.com/nodejs/corepack/issues/485
ENV COREPACK_ENABLE_AUTO_PIN=0

# https://turbo.build/repo/docs/telemetry
ENV TURBO_TELEMETRY_DISABLED=

# https://consoledonottrack.com/
ENV DO_NOT_TRACK=1

# ---------------------FROM CLAUDE CODE DEVCONTAINER---------------------
# source: https://github.com/anthropics/claude-code/blob/main/.devcontainer/Dockerfile#L3-L82
ARG TZ
ENV TZ="$TZ"

ARG CLAUDE_CODE_VERSION=latest

# Install basic development tools and iptables/ipset
RUN apt-get update && apt-get install -y --no-install-recommends \
  less \
  git \
  procps \
  sudo \
  fzf \
  zsh \
  man-db \
  unzip \
  gnupg2 \
  gh \
  iptables \
  ipset \
  iproute2 \
  dnsutils \
  aggregate \
  jq \
  nano \
  vim \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Ensure default node user has access to /usr/local/share
RUN mkdir -p /usr/local/share/npm-global && \
  chown -R node:node /usr/local/share

ARG USERNAME=node

# Persist bash history.
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  && mkdir /commandhistory \
  && touch /commandhistory/.bash_history \
  && chown -R $USERNAME /commandhistory

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Create workspace and config directories and set permissions
RUN mkdir -p /workspace /home/node/.claude && \
  chown -R node:node /workspace /home/node/.claude

WORKDIR /workspace

ARG GIT_DELTA_VERSION=0.18.2
RUN ARCH=$(dpkg --print-architecture) && \
  wget "https://github.com/dandavison/delta/releases/download/${GIT_DELTA_VERSION}/git-delta_${GIT_DELTA_VERSION}_${ARCH}.deb" && \
  sudo dpkg -i "git-delta_${GIT_DELTA_VERSION}_${ARCH}.deb" && \
  rm "git-delta_${GIT_DELTA_VERSION}_${ARCH}.deb"

# Set up non-root user
USER node

# Install global packages
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin

# Set the default shell to zsh rather than sh
ENV SHELL=/bin/zsh

# Set the default editor and visual
ENV EDITOR=nano
ENV VISUAL=nano

# Default powerline10k theme
ARG ZSH_IN_DOCKER_VERSION=1.2.0
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v${ZSH_IN_DOCKER_VERSION}/zsh-in-docker.sh)" -- \
  -p git \
  -p fzf \
  -a "source /usr/share/doc/fzf/examples/key-bindings.zsh" \
  -a "source /usr/share/doc/fzf/examples/completion.zsh" \
  -a "export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  -x

# Install Claude
RUN npm install -g @anthropic-ai/claude-code@${CLAUDE_CODE_VERSION}

RUN echo ">>> done installing claude code"

# ---------------------PNPM---------------------

ENV PNPM_HOME=/home/node/.pnpm
ENV PATH=$PNPM_HOME:$PATH

USER root
RUN whoami && id && ls -ld /usr/local && ls -ld /usr/local/pnpm || echo "no /usr/local/pnpm yet"
RUN mkdir -p $PNPM_HOME && chown -R node:node $PNPM_HOME /workspace
USER node


# necessary because of https://github.com/nodejs/corepack/issues/612
# https://github.com/npm/cli/issues/8075#issuecomment-2628545611
RUN npm install -g corepack@latest --force
RUN corepack --version
RUN corepack enable
RUN node -v
RUN echo ">>> done installing node"

RUN corepack use pnpm@latest
RUN corepack enable pnpm

# Configure pnpm
RUN pnpm config set store-dir $PNPM_HOME

COPY --chown=node:node . /workspace
WORKDIR /workspace

# Install dependencies with BuildKit cache mount for better performance
# Use cache mount aligned with pnpm store
RUN --mount=type=cache,id=pnpm,target=/home/node/.pnpm/store \
    pnpm install --no-frozen-lockfile

# Configure Git for Ableton Live files during build
RUN if [ -f "scripts/setup-ableton-git.sh" ]; then \
        chmod +x scripts/setup-ableton-git.sh && \
        ./scripts/setup-ableton-git.sh --global; \
    fi

CMD ["sleep", "infinity"]