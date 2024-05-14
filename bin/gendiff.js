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
