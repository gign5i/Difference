import _ from 'lodash';

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
          if (_.isObject(el.value1)) {
            acc.push(`Property '${el.name}' was updated. From [complex value] to '${el.value2}'`);
          } else {
            if (typeof el.value1 === 'string' && typeof el.value2 === 'string') {
              acc.push(`Property '${el.name}' was updated. From '${el.value1}' to '${el.value2}'`);
              break;
            }
            acc.push(`Property '${el.name}' was updated. From ${el.value1} to ${el.value2}`);
          }
          break;
        case 'added':
          if (_.isObject(el.value)) {
            acc.push(`Property '${el.name}' was added with value: [complex value]`);
          } else {
            if (typeof el.value === 'string') {
              acc.push(`Property '${el.name}' was added with value: '${el.value}'`);
              break;
            }
            acc.push(`Property '${el.name}' was added with value: ${el.value}`);
          }
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
