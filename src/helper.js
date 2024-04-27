import _ from 'lodash';

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
  return values;
};

const getUniqKeys = (dataA, dataB) => _.uniq([..._.keys(dataA), ..._.keys(dataB)]);

export { getUniqKeys, getSorted };
