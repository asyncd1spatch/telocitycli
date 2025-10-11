import packageJson from "./package.json" with { type: "json" };

const {
  name: title,
  version,
  description,
  author: copyright,
} = packageJson;
const publisher = copyright;

const targets = [
  {
    target: "bun-windows-x64",
    outfile: `${title}-${version}-windows-x64.exe`,
  },
  {
    target: "bun-linux-x64",
    outfile: `${title}-${version}-linux-x64`,
  },
  {
    target: "bun-darwin-arm64",
    outfile: `${title}-${version}-macos-arm64`,
  },
];

for (const buildTarget of targets) {
  console.log(`Building for ${buildTarget.target}...`);

  const compileOptions = {
    target: buildTarget.target,
    outfile: buildTarget.outfile,
  };

  if (buildTarget.target.startsWith("bun-windows")) {
    compileOptions.windows = {
      title,
      publisher,
      version,
      description,
      copyright,
      hideConsole: false,
      // icon: "./icon.ico",
    };
  }

  await Bun.build({
    entrypoints: ["./start.ts"],
    outdir: "./dist",
    format: "esm",
    minify: true,
    define: {
      __IS_COMPILED__: "true",
    },
    compile: compileOptions,
  });
}

console.log("All builds completed successfully!");
