import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import path, { dirname } from 'path';
import reader from '../src/reader.js';

const syncReadFile = (filename) => {
  const contents = fs.readFileSync(filename, 'utf-8');
  const arr = contents.split('r?\n');
  return arr.join('\n');
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Second test for big data (JSON, format: plain)', () => {
  const testData = syncReadFile('./__fixtures__/Plain-format.txt');
  expect(reader(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(testData);
});
