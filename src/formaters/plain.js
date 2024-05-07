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
      switch (el.type) {
        case 'nested':
          if (_.isObject(el.value)) {
            el.value.map((subEl) => {
              const subResult = iter([subEl], depth + 1);
              const arrResults = subResult.split('\n');
              if (subResult !== '') {
                arrResults.map((element) => acc.push(`Property '${`${el.name}.${element.slice(10)}`}`));
              }
              return subEl;
            });
          }
          break;
        case 'changed':
          acc.push(`Property '${el.name}' was updated. From ${helper(el.value1)} to ${helper(el.value2)}`);
          break;
        case 'added':
          acc.push(`Property '${el.name}' was added with value: ${helper(el.value)}`);
          break;
        case 'deleted':
          acc.push(`Property '${el.name}' was removed`);
          break;
        default:
      }
      return acc;
    }, []);
    return result.join('\n');
  };
  return iter(object, 1);
};
