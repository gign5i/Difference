import _ from 'lodash';

const getDiffInfo = (firstData, seconData) => {
  const keys1 = Object.keys(firstData);
  const keys2 = Object.keys(seconData);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (_.isPlainObject(firstData[key]) && _.isPlainObject(seconData[key])) {
      return { name: key, type: 'nested', value: getDiffInfo(firstData[key], seconData[key]) };
    }
    if (!Object.hasOwn(seconData, key)) {
      return { name: key, type: 'deleted', value: firstData[key] };
    }
    if (!Object.hasOwn(firstData, key)) {
      return { name: key, type: 'added', value: seconData[key] };
    }
    if (firstData[key] !== seconData[key]) {
      return {
        name: key, type: 'changed', value1: firstData[key], value2: seconData[key],
      };
    }
    return { name: key, type: 'unchanged', value: firstData[key] };
  });
};

export default getDiffInfo;
