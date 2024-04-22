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

const func = (object1, object2) => {
  const newObject1 = _.cloneDeep(object1);
  const newObject2 = _.cloneDeep(object2);
  const result = [];
  const keys = [..._.keys(newObject1), ..._.keys(newObject2)];

  _.uniq(keys).map((key) => {
    if (_.has(newObject1, key) && _.has(newObject2, key)) {
      if (newObject1[key] === newObject2[key]) {
        result.push(`  ${key}: ${newObject1[key]}`);
      }
      if (newObject1[key] !== newObject2[key]) {
        result.push(`- ${key}: ${newObject1[key]}`);
        result.push(`+ ${key}: ${newObject2[key]}`);
      }
    }
    if (_.has(newObject1, key) && !_.has(newObject2, key)) {
      result.push(`- ${key}: ${newObject1[key]}`);
    }
    if (!_.has(newObject1, key) && _.has(newObject2, key)) {
      result.push(`+ ${key}: ${newObject2[key]}`);
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

  return func(firstFileData, secondFileData);
};
export default reader;

// test: gendiff __fixtures__/file1.json __fixtures__/file2.json
// test2: gendiff ./__fixtures__/file1.json __fixtures__/file2.json
