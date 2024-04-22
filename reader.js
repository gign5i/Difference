import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getTypeFile = (filePath) => path.extname(filePath).slice(1);

const parse = (fileData, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(fileData);
    default:
      return 'Other type of file';
  }
};

const getData = (filePath) => parse(fs.readFileSync(filePath, 'utf-8'), getTypeFile(filePath));

const buildFullPath = (curPath) => path.resolve(process.cwd(), curPath);
//--------------------------------------

const getDiff = (fstFileData, scndFileData) => {
  const result = [];
  const keys = [..._.keys(fstFileData), ..._.keys(scndFileData)];
  _.uniq(keys).map((key) => {
    if (_.has(fstFileData, key) && _.has(scndFileData, key)) {
      if (fstFileData[key] === scndFileData[key]) {
        result.push(`  ${key}: ${fstFileData[key]}`);
      }
      if (fstFileData[key] !== scndFileData[key]) {
        result.push(`- ${key}: ${fstFileData[key]}`);
        result.push(`+ ${key}: ${scndFileData[key]}`);
      }
    }
    if (_.has(fstFileData, key) && !_.has(scndFileData, key)) {
      result.push(`- ${key}: ${fstFileData[key]}`);
    }
    if (!_.has(fstFileData, key) && _.has(scndFileData, key)) {
      result.push(`+ ${key}: ${scndFileData[key]}`);
    }
  });
  const sortedResult = result.sort((a, b) => {
    if (a.slice(2, 3) < b.slice(2, 3)) {
      return -1;
    }
    if (a.slice(2, 3) > b.slice(2, 3)) {
      return 1;
    }
    return 0;
  });
  return `{\n${sortedResult.join('\n')}\n}`;
};

//--------------------------------------
const reader = (path1, path2) => {

  const paths = [path1, path2];

  const absPaths = paths.map((path) => buildFullPath(path));

  const data = absPaths.map((path) => getData(path));

  const [firstFileData, secondFileData] = data;

  const forstFileDataClone = _.cloneDeep(firstFileData);
  const secondFileDataClone = _.cloneDeep(secondFileData);

  return getDiff(forstFileDataClone, secondFileDataClone);
};
export default reader;

// test: gendiff __fixtures__/file1.json __fixtures__/file2.json
// test2: gendiff ./__fixtures__/file1.json __fixtures__/file2.json
