import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parser.js';
import getDiffInfo from './results-builder.js';
import getSorted from './data-filter.js';
import formater from './formaters/index.js';

const pathBuilder = (filePath) => path.resolve(process.cwd(), filePath);

const getTypeFile = (filePath) => path.extname(filePath).slice(1);

const getData = (filePath) => parse(fs.readFileSync(filePath, 'utf-8'), getTypeFile(filePath));

const getDiff = (fstFileData, scndFileData, format = 'stylish') => {
  const currentInfo = getDiffInfo(fstFileData, scndFileData);
  const sortedResult = getSorted(currentInfo);

  return formater(sortedResult, format);
};

export default (path1, path2, format) => {
  const paths = [path1, path2];

  const absPaths = paths.map((filePath) => pathBuilder(filePath));
  const data = absPaths.map((absFilepath) => getData(absFilepath));

  const [firstFileData, secondFileData] = data;

  const forstFileDataClone = _.cloneDeep(firstFileData);
  const secondFileDataClone = _.cloneDeep(secondFileData);

  return getDiff(forstFileDataClone, secondFileDataClone, format);
};
