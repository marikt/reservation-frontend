#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the library package.json
const libPackageJsonPath = path.join(__dirname, 'projects', 'notado-lib', 'package.json');

// Read the current package.json
const packageJson = JSON.parse(fs.readFileSync(libPackageJsonPath, 'utf8'));

// Parse the current version
const currentVersion = packageJson.version;
console.log(`Current version: ${currentVersion}`);

// Split the version into parts
const versionParts = currentVersion.split('.');
const major = parseInt(versionParts[0], 10);
const minor = parseInt(versionParts[1], 10);
const patch = parseInt(versionParts[2], 10);

// Increment the patch version
const newPatch = patch + 1;
const newVersion = `${major}.${minor}.${newPatch}`;

// Update the version in the package.json
packageJson.version = newVersion;

// Write the updated package.json back to the file
fs.writeFileSync(libPackageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Updated version to: ${newVersion}`);

// Run the lib-dist command
console.log('Running lib-dist...');
try {
  execSync('yarn lib-dist', { stdio: 'inherit' });
  console.log('lib-dist completed successfully');
} catch (error) {
  console.error('Error running lib-dist:', error);
  process.exit(1);
}