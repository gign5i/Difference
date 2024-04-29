import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser.js';
import getDiff from './results-builder.js';
import pathBuilder from './path-builder.js';

const getTypeFile = (filePath) => path.extname(filePath).slice(1);

const getData = (filePath) => parse(fs.readFileSync(filePath, 'utf-8'), getTypeFile(filePath));

const reader = (path1, path2) => {
  const paths = [path1, path2];

  const absPaths = paths.map((filePath) => pathBuilder(filePath));

  const data = absPaths.map((absFilepath) => getData(absFilepath));

  const [firstFileData, secondFileData] = data;

  const forstFileDataClone = _.cloneDeep(firstFileData);
  const secondFileDataClone = _.cloneDeep(secondFileData);

  return getDiff(forstFileDataClone, secondFileDataClone);
};
export default reader;

// test: gendiff __fixtures__/file1.yml __fixtures__/file2.yml
// test2: gendiff ./__fixtures__/file1.json __fixtures__/file2.json
