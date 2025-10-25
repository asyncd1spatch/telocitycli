#!/usr/bin/env bun
import { $ } from "bun";
import { dirname, join } from "node:path";

const sourceRoot = "../telocity";
const targetRoot = ".";

const filesToCopy = [
  "src/libs/core/CLI.ts",
  "src/libs/core/context.ts",
  "src/libs/core/config.ts",
  "src/libs/core/index.ts",
  "src/libs/core/validators.ts",
  "src/libs/core/utils.ts",

  "src/commands/cocommand.ts",
  "src/commands/configcommand.ts",
  "src/commands/helpcommand.ts",

  "src/libs/types/types.ts",

  "src/main.ts",
];

console.log("Extracting common files from telocity...");

const copyPromises = filesToCopy.map(async (relativeFilePath) => {
  const sourcePath = join(sourceRoot, relativeFilePath);
  const targetPath = join(targetRoot, relativeFilePath);

  const targetDir = dirname(targetPath);
  await $`mkdir -p ${targetDir}`;

  await $`cp ${sourcePath} ${targetPath}`;

  console.log(`  ✅ Copied ${relativeFilePath}`);
});

await Promise.all(copyPromises);

console.log("\nExtraction complete!");
