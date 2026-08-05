import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const [contentPath] = process.argv.slice(2);

if (!contentPath) {
  console.error('Usage: node scripts/create-lark-doc-from-xml.mjs <content.xml>');
  process.exit(1);
}

const content = readFileSync(contentPath, 'utf8');

const output = execFileSync(
  'lark-cli',
  ['docs', '+create', '--api-version', 'v2', '--content', content],
  {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 10,
  },
);

process.stdout.write(output);
