import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import reader from '../src/reader.js';

const expectResult = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('test for JSON format', () => {
  expect(reader(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectResult);
});

test('test for YAML/yml format', () => {
  expect(reader(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expectResult);
});
