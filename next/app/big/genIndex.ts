import fs from "fs";

let indexCode="";

for (let i = 0; i < 1500; i++) {
  indexCode += `import { Comp${i} } from './comp${i}.jsx'\n`;
}

indexCode += `export default function App() {
    return <div>
     `;

for (let i = 0; i < 1500; i++) {
  indexCode += `<Comp${i}/>\n`;
}

indexCode += `
</div>
}
   `;

fs.writeFileSync("./index.jsx", indexCode);
