const { spawnSync } = require("node:child_process");
const { resolve } = require("node:path");

const args = process.argv.slice(2);
const dataSourceIndex = args.indexOf("-d");
if (dataSourceIndex !== -1 && args[dataSourceIndex + 1]) {
  args[dataSourceIndex + 1] = resolve(__dirname, "..", args[dataSourceIndex + 1]);
}

const result = spawnSync(
  process.execPath,
  [require.resolve("typeorm/cli-ts-node-commonjs.js"), ...args],
  { cwd: process.env.INIT_CWD || process.cwd(), stdio: "inherit" },
);

if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
