const fs = require('fs');
const path = require('path');

// Update mode.service.prod.ts
const modeServicePath = path.join(__dirname, '../projects/notado-lib/src/config/mode.service.prod.ts');
let modeServiceContent = fs.readFileSync(modeServicePath, 'utf8');

// Replace urlPrefix
modeServiceContent = modeServiceContent.replace(
  /public urlPrefix = '\/';(\s*\/\/ public urlPrefix = 'form\/';)?/,
  "// public urlPrefix = '/';\n  public urlPrefix = 'form/';"
);

fs.writeFileSync(modeServicePath, modeServiceContent);
console.log('✅ Updated mode.service.prod.ts to use form/ prefix');

// Update form.module.ts
const formModulePath = path.join(__dirname, '../src/app/zzzmodules/form.module.ts');
let formModuleContent = fs.readFileSync(formModulePath, 'utf8');

// Replace FormMode.DEMO with FormMode.PRODUCTION
formModuleContent = formModuleContent.replace(
  /NotadoLibModule\.forRoot\(environment\.environment, FormMode\.DEMO\),(\s*\/\/ NotadoLibModule\.forRoot\(environment\.environment, FormMode\.PRODUCTION\),)?/,
  "// NotadoLibModule.forRoot(environment.environment, FormMode.DEMO),\n    NotadoLibModule.forRoot(environment.environment, FormMode.PRODUCTION),"
);

fs.writeFileSync(formModulePath, formModuleContent);
console.log('✅ Updated form.module.ts to use PRODUCTION mode');

console.log('🚀 Production mode set successfully!');