#!/usr/bin/env bash
set -euo pipefail
# extract what's common between telocity and the generic scaffold

OCORE="../telocity/src/libs/core"
TCORE="./src/libs/core"
OBASECMD="../telocity/src/commands"
TBASECMD="./src/commands"
OTYPE="../telocity/src/libs/types/types.ts"
TTYPE="./src/libs/types/types.ts"
OENTRY="../telocity/src/main.ts"
TENTRY="./src/main.ts"

cp "$OCORE/CLI.ts" "$TCORE/CLI.ts"
cp "$OCORE/context.ts" "$TCORE/context.ts"
cp "$OCORE/config.ts" "$TCORE/config.ts"
cp "$OCORE/index.ts" "$TCORE/index.ts"
cp "$OCORE/validators.ts" "$TCORE/validators.ts"

cp "$OBASECMD/cocommand.ts" "$TBASECMD/cocommand.ts"
cp "$OBASECMD/configcommand.ts" "$TBASECMD/configcommand.ts"
cp "$OBASECMD/helpcommand.ts" "$TBASECMD/helpcommand.ts"

cp "$OTYPE" "$TTYPE"

cp "$OENTRY" "$TENTRY"