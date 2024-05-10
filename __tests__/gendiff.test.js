import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import path, { dirname } from 'path';
import reader from '../src/files-reader.js';

const syncReadFile = (filename) => {
  const contents = fs.readFileSync(filename, 'utf-8');
  const arr = contents.split('r?\n');
  return arr.join('\n');
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('First test for small data (YAML/yml, format: stylish)', () => {
  const testData1 = syncReadFile('./__fixtures__/Stylish-format-small.txt');
  expect(reader(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(testData1);
});

test('Second test for big data (JSON, format: stylish)', () => {
  const testData2 = syncReadFile('./__fixtures__/Stylish-format.txt');
  expect(reader(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(testData2);
});

test('Second test for big data (JSON, format: plain)', () => {
  const testData3 = syncReadFile('./__fixtures__/Plain-format.txt');
  expect(reader(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(testData3);
});

test('Second test for big data (JSON, format: json)', () => {
  const testData4 = syncReadFile('./__fixtures__/JSON-format.txt');
  expect(reader(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(testData4);
});
