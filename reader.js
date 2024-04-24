import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getTypeFile = (filePath) => path.extname(filePath).slice(1);

const parse = (fileData, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(fileData);
    default:
      return 'Not today!';
  }
};

const getData = (filePath) => parse(fs.readFileSync(filePath, 'utf-8'), getTypeFile(filePath));

const buildFullPath = (curPath) => path.resolve(process.cwd(), curPath);

const getSorted = (values) => {
  values.sort((a, b) => {
    if (a.slice(3, 4) < b.slice(3, 4)) {
      return -1;
    }
    if (a.slice(3, 4) > b.slice(3, 4)) {
      return 1;
    }
    return 0;
  });
};
//--------------------------------------

const getDiff = (fstFileData, scndFileData) => {
  const keys = [..._.keys(fstFileData), ..._.keys(scndFileData)];
  const result = [];
  _.uniq(keys).map((key) => {
    if (_.has(fstFileData, key) && _.has(scndFileData, key)) {
      if (fstFileData[key] === scndFileData[key]) {
        result.push(`   ${key}: ${fstFileData[key]}`);
      }
      if (fstFileData[key] !== scndFileData[key]) {
        result.push(` - ${key}: ${fstFileData[key]}`);
        result.push(` + ${key}: ${scndFileData[key]}`);
      }
    }
    if (_.has(fstFileData, key) && !_.has(scndFileData, key)) {
      result.push(` - ${key}: ${fstFileData[key]}`);
    }
    if (!_.has(fstFileData, key) && _.has(scndFileData, key)) {
      result.push(` + ${key}: ${scndFileData[key]}`);
    }
  });
  const sortedResult = getSorted(result);

  return `{\n${sortedResult.join('\n')}\n}`;
};

//--------------------------------------
const reader = (path1, path2) => {
  const paths = [path1, path2];

  const absPaths = paths.map((filePath) => buildFullPath(filePath));

  const data = absPaths.map((absFilepath) => getData(absFilepath));

  const [firstFileData, secondFileData] = data;

  const forstFileDataClone = _.cloneDeep(firstFileData);
  const secondFileDataClone = _.cloneDeep(secondFileData);

  return getDiff(forstFileDataClone, secondFileDataClone);
};
export default reader;

// test: gendiff __fixtures__/file1.json __fixtures__/file2.json
// test2: gendiff ./__fixtures__/file1.json __fixtures__/file2.json
