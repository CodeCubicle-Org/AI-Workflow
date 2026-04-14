'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const source = path.join(root, 'skills');

if (!fs.existsSync(source)) {
  console.error('sync-skills: missing directory', source);
  process.exit(1);
}

const mirrors = [path.join(root, '.cursor', 'skills'), path.join(root, '.claude', 'skills')];

for (const dest of mirrors) {
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(source, dest, { recursive: true });
}

console.log('Synced skills/ -> .cursor/skills and .claude/skills');
