import _ from 'lodash';
import { getSorted, getUniqKeys } from './helper.js';

const getResult = (keys, dataA, dataB) => {
  const result = keys.flatMap((key) => {
    const diffArr = [];

    if (_.has(dataA, key) && _.has(dataB, key)) {
      if (dataA[key] === dataB[key]) {
        diffArr.push(`   ${key}: ${dataA[key]}`);
      }
      if (dataA[key] !== dataB[key]) {
        diffArr.push(` - ${key}: ${dataA[key]}`);
        diffArr.push(` + ${key}: ${dataB[key]}`);
      }
    }
    if (_.has(dataA, key) && !_.has(dataB, key)) {
      diffArr.push(` - ${key}: ${dataA[key]}`);
    }
    if (!_.has(dataA, key) && _.has(dataB, key)) {
      diffArr.push(` + ${key}: ${dataB[key]}`);
    }
    return diffArr;
  });
  return result;
};

const getDiff = (fstFileData, scndFileData) => {
  const uniqKeys = getUniqKeys(fstFileData, scndFileData);

  const result = getResult(uniqKeys, fstFileData, scndFileData);
  const sortedResult = getSorted(result);

  return `{\n${sortedResult.join('\n')}\n}`;
};

export default getDiff;
