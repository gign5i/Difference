import _ from 'lodash';
import { getSorted } from './helper.js';
import formater from './formaters/index.js';

const getDiffInfo = (dataA, dataB) => {
  const keys1 = Object.keys(dataA);
  const keys2 = Object.keys(dataB);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (_.isPlainObject(dataA[key]) && _.isPlainObject(dataB[key])) {
      return { name: key, type: 'nested', value: getDiffInfo(dataA[key], dataB[key]) };
    } else if (!Object.hasOwn(dataB, key)) {
      return { name: key, type: 'deleted', value: dataA[key] };
    } else if (!Object.hasOwn(dataA, key)) {
      return { name: key, type: 'added', value: dataB[key] };
    } else if (dataA[key] !== dataB[key]) {
      return {
        name: key, type: 'changed', value1: dataA[key], value2: dataB[key],
      };
    } else {
      return { name: key, type: 'unchanged', value: dataA[key] };
    }
  });
};

const getDiff = (fstFileData, scndFileData, format) => {
  const currentInfo = getDiffInfo(fstFileData, scndFileData);
  const sortedResult = getSorted(currentInfo);
  return formater(sortedResult, format);
};

export default getDiff;
