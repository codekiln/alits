# postCreateCommand.sh
corepack install
pnpm config set store-dir $PNPM_HOME
pnpm install