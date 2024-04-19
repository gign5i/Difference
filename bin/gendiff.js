#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../test.js';


program
    .description('Compares two configuration files and shows a difference.')
    .version('0.1')
    .option('-f, --format [type]', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filePath1, filePath2) => genDiff(filePath1, filePath2));
program.parse();

