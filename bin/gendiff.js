#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/files-reader.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format [type]', 'output format (default: "Stylish")')
  .argument('<firstFilePath>')
  .argument('<secondFilePath>')
  .action((firstFilePath, secondFilePath) => {
    console.log(genDiff(firstFilePath, secondFilePath, program.opts().format));
  });
program.parse();

// test: gendiff __fixtures__/file1.yml __fixtures__/file2.yml
// test2: gendiff -f plain ./__fixtures__/file1.json __fixtures__/file2.json
// test3: gendiff -f stylish ./__fixtures__/file1.json __fixtures__/file2.json
// test4: gendiff -f json ./__fixtures__/file1.json __fixtures__/file2.json
