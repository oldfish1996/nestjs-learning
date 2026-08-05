import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const [doc, contentPath] = process.argv.slice(2);

if (!doc || !contentPath) {
  console.error('Usage: node scripts/append-lark-doc-from-xml.mjs <doc-url-or-token> <content.xml>');
  process.exit(1);
}

const content = readFileSync(contentPath, 'utf8');

const output = execFileSync(
  'lark-cli',
  ['docs', '+update', '--api-version', 'v2', '--doc', doc, '--command', 'append', '--content', content],
  {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 10,
  },
);

process.stdout.write(output);
