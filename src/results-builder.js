import _ from 'lodash';
import { getSorted } from './helper.js';
// import stylish from './formaters/stylish.js';
// import plain from './formaters/plain.js'
import formater from './formaters/index.js';

const getInfo = (dataA, dataB) => {
  const keys1 = Object.keys(dataA);
  const keys2 = Object.keys(dataB);
  const keys = _.sortBy(_.union(keys1, keys2));

  // N - nested | D - deleted | A - added | C - changed | U - unchanged

  return keys.map((key) => {
    if (_.isPlainObject(dataA[key]) && _.isPlainObject(dataB[key])) {
      return { name: key, type: 'N', value: getInfo(dataA[key], dataB[key]) };
    }
    if (!Object.hasOwn(dataB, key)) {
      return { name: key, type: 'D', value: dataA[key] };
    }
    if (!Object.hasOwn(dataA, key)) {
      return { name: key, type: 'A', value: dataB[key] };
    }
    if (dataA[key] !== dataB[key]) {
      return {
        name: key, type: 'C', value1: dataA[key], value2: dataB[key],
      };
    }
    return { name: key, type: 'U', value: dataA[key] };
  });
};

const getDiff = (fstFileData, scndFileData, format) => {
  const currentInfo = getInfo(fstFileData, scndFileData);
  const sortedResult = getSorted(currentInfo);
  return formater(sortedResult, format);
};

export default getDiff;
