#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/reader.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format [type]', 'output format (default: "JSON")')
  .argument('<firstFilePath>')
  .argument('<secondFilePath>')
  .action((firstFilePath, secondFilePath) => {
    const options = program.opts();
    let formatName = '';
    switch (options.format) {
      case 'plain':
        formatName = 'plain';
        break;
      case 'stylish':
        formatName = 'stylish';
        break;
      case 'json':
      default:
        formatName = 'json';
        break;
    }
    const diff = genDiff(firstFilePath, secondFilePath, formatName);
    console.log(diff);
  });
program.parse();

// test: gendiff __fixtures__/file1.yml __fixtures__/file2.yml
// test2: gendiff -f plain ./__fixtures__/file1.json __fixtures__/file2.json
// test3: gendiff -f stylush ./__fixtures__/file1.json __fixtures__/file2.json
// test4: gendiff -f json ./__fixtures__/file1.json __fixtures__/file2.json
