#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../reader.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format [type]', 'output format')
  .argument('<firstFilePath>')
  .argument('<secondFilePath>')
  .action((firstFilePath, secondFilePath) => {
    const [firstFileData, secondFileData] = genDiff(firstFilePath, secondFilePath);
    console.log(firstFileData, secondFileData);
  });
program.parse();
