import _ from 'lodash';
import path from 'path';

const pathBuilder = (filePath) => path.resolve(process.cwd(), filePath);

const getTypeFile = (filePath) => path.extname(filePath).slice(1);

const getSorted = (values) => {
  const iter = (node, depth) => {
    const [buff] = [...node];
    if (_.isObject(buff.value)) {
      iter(buff.value, depth + 1);
    }
    return _.sortBy(node, node.name);
  };
  return iter(values, 1);
};

export { getSorted, pathBuilder, getTypeFile };
