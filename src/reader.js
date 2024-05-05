import * as fs from 'fs';
import _ from 'lodash';
import parse from './parser.js';
import getDiff from './results-builder.js';
import { pathBuilder, getTypeFile } from './helper.js';

const getData = (filePath) => parse(fs.readFileSync(filePath, 'utf-8'), getTypeFile(filePath));

const reader = (path1, path2, format) => {
  const paths = [path1, path2];

  const absPaths = paths.map((filePath) => pathBuilder(filePath));

  const data = absPaths.map((absFilepath) => getData(absFilepath));

  const [firstFileData, secondFileData] = data;

  const forstFileDataClone = _.cloneDeep(firstFileData);
  const secondFileDataClone = _.cloneDeep(secondFileData);
  return getDiff(forstFileDataClone, secondFileDataClone, format);
};

export default reader;

