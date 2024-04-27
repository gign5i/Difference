#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/reader.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format [type]', 'output format')
  .argument('<firstFilePath>')
  .argument('<secondFilePath>')
  .action((firstFilePath, secondFilePath) => {
    const result = genDiff(firstFilePath, secondFilePath);
    console.log('result:\n', result);
  });
program.parse();
