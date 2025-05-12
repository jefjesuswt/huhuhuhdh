require('dotenv').config()
import { mkdirSync, writeFileSync } from "fs";

const targetPath = './src/environments/environment.ts';

const fileContent = `
  export const environment = {
    baseUrl: '${process.env['baseUrl']}'
  }
`;

mkdirSync('./src/environments', {recursive: true});

console.log('environments files created');

writeFileSync(targetPath, fileContent);
