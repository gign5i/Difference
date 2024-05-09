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

export default (object) => {
  const iter = (node, depth) => {
    const result = node.reduce((acc, el) => {
      if (el.type === 'nested') {
        if (_.isObject(el.value)) {
          el.value.flatMap((subEl) => {
            const subResult = iter([subEl], depth + 1);
            const arrResults = subResult.split('\n');
            if (subResult !== '') {
              arrResults.map((element) => acc.push(`Property '${`${el.name}.${element.slice(10)}`}`));
            }
            return subEl;
          });
        }
      } else if (el.type === 'changed') {
        acc.push(`Property '${el.name}' was updated. From ${helper(el.value1)} to ${helper(el.value2)}`);
      } else if (el.type === 'added') {
        acc.push(`Property '${el.name}' was added with value: ${helper(el.value)}`);
      } else if (el.type === 'deleted') {
        acc.push(`Property '${el.name}' was removed`);
      }
      return acc;
    }, []);
    return result.join('\n');
  };
  return iter(object, 1);
};
