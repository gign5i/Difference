import _ from 'lodash';

export default (values) => {
  const iter = (node, depth) => {
    const [buffer] = [...node];
    if (_.isObject(buffer.value)) {
      iter(buffer.value, depth + 1);
    }
    return _.sortBy(node, node.name);
  };
  return iter(values, 1);
};
