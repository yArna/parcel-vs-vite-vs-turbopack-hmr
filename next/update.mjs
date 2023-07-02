import fs from 'fs';

switch (process.argv.at(-1)) {
  case 'leaf':
    fs.writeFileSync('app/comp0.jsx', `export function Comp0() {
      return <div>{Date.now() - ${Date.now()}}</div>
    }`);
    break;
  case 'root':
    let page = fs.readFileSync('app/page.js', 'utf8');
    fs.writeFileSync('app/page.js', page.replace(/root: (.+)/, `root: {Date.now() - ${Date.now()}}`));
    break;
  default:
    throw new Error('Run with "leaf" or "root" as an argument');
}

