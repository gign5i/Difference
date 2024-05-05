import _ from 'lodash';

export default (object) => {
  
  const iter = (node, depth) => {
    const result = node.reduce((acc, el) => {
      switch (el.type) {
        case 'N':
          if (_.isObject(el.value)) {
          el.value.map((subEl) => {
            const subResult = iter([subEl], depth + 1);
            if (subResult !== '') {
            acc.push(`Property '${`${el.name}.${subResult.slice(10)}`}`);
            }
          });
          }
          break;
        case 'C':
          if (_.isObject(el.value1)) {
            acc.push(`Property '${el.name}' was updated. From [complex value] to '${el.value2}'`);
          } else {
            // acc.push(`Property '${el.name}' was updated. From '${el.value1}' to '${el.value2}'`);
            if (typeof el.value1 === 'string' && typeof el.value2 === 'string') {
              acc.push(`Property '${el.name}' was updated. From '${el.value1}' to '${el.value2}'`);
            } else {
              acc.push(`Property '${el.name}' was updated. From ${el.value1} to ${el.value2}`);
            } 
          }
          break;
        case 'A':
          if (_.isObject(el.value)) {
             acc.push(`Property '${el.name}' was added with value: [complex value]`);
          } else {
            if (typeof el.value === 'string') {
              acc.push(`Property '${el.name}' was added with value: '${el.value}'`);
            } else {
              acc.push(`Property '${el.name}' was added with value: ${el.value}`);
            } 
          }  
          break;
        case 'D':
            acc.push(`Property '${el.name}' was removed`);
        break;
      }
      return acc;
    }, []);
    return result.join('\n');
  }
  return iter(object, 1);
};