import _ from 'lodash';

const helper = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getProperty = (node, propertyPath) => {
  if (propertyPath !== '') {
    return `${propertyPath}.${node.name}`;
  }
  return `${node.name}`;
};

export default (object) => {
  const iter = (node, depth) => node.filter((el) => el.type !== 'unchanged').map((el) => {
    const propertyPath = getProperty(el, depth);
    if (el.type === 'nested') {
      return iter(el.value, propertyPath);
    }
    if (el.type === 'changed') {
      return `Property '${propertyPath}' was updated. From ${helper(el.value1)} to ${helper(el.value2)}`;
    }
    if (el.type === 'added') {
      return `Property '${propertyPath}' was added with value: ${helper(el.value)}`;
    }
    if (el.type === 'deleted') {
      return `Property '${propertyPath}' was removed`;
    }
    return null;
  }).join('\n');
  return iter(object, '');
};
