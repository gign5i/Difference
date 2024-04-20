import * as fs from 'fs';
import path from 'path';

const getTypeFile = (filePath) => path.extname(filePath).slice(1);

const parse = (fileData, fileType) => {
  // console.log('parse:\n', fileData, fileType);
  switch (fileType) {
    case 'json':
      return JSON.parse(fileData);
    default:
      return 'Other type of file';
  };
};

const getData = (filePath) => parse(fs.readFileSync(filePath, 'utf-8'), getTypeFile(filePath));

const buildFullPath = (curPath) => path.resolve(process.cwd(), curPath);

const reader = (path1, path2) => {
  // const fileType = getTypeFile(path1);
  // console.log('type:', fileType);

  // const fullPath = buildFullPath(path1);
  // console.log('absPath: ', fullPath);

  // const data = getData(fullPath);

  // console.log(data, typeof data);
  const paths = [path1, path2];

  // const fileTypes = paths.map((path) => getTypeFile(path));
  // console.log(fileTypes);

  const absPaths = paths.map((path) => buildFullPath(path));
  // console.log(absPaths);

  const data = absPaths.map((path) => getData(path));
  // console.log(data);

  return data;
};
export default reader;

// test: gendiff __fixtures__/file1.json __fixtures__/file2.json
