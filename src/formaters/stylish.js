import _ from 'lodash';

const helper = (values) => `\n${values.flat().join('\n')}`;

const getSign = (elType) => {
  if (elType === 'added') {
    return '+';
  }
  if (elType === 'deleted') {
    return '-';
  }
  return ' ';
};

const spacer = '    ';
const replacer = ' ';

const getIndent = (curDepth) => replacer.repeat(curDepth * spacer.length).slice(0, -2);

export default (object) => {
  const iter = (node, depth) => {
    const result = node.reduce((acc, el) => {
      const sign = getSign(el.type);
      switch (el.type) {
        case 'nested':
          acc.push(`${getIndent(depth)}  ${el.name}: {${helper(iter(el.value, depth + 1))}\n  ${getIndent(depth)}}`);
          break;
        case 'changed':
          if (!_.isPlainObject(el.value1)) {
            acc.push(`${getIndent(depth)}- ${el.name}: ${el.value1}`);
          } else if (_.isPlainObject(el.value1)) {
            acc.push(`${getIndent(depth)}- ${el.name}: {${helper(iter([el.value1], depth + 1))}\n  ${getIndent(depth)}}`);
          }
          if (!_.isPlainObject(el.value2)) {
            acc.push(`${getIndent(depth)}+ ${el.name}: ${el.value2}`);
          } else if (_.isPlainObject(el.value2)) {
            acc.push(`${getIndent(depth)}+ ${el.name}: {${helper(iter([el.value2], depth + 1))}\n  ${getIndent(depth)}}`);
          }
          break;
        default:
          if (el.name === undefined || el.value === undefined) {
            /* eslint-disable-next-line */
            for (const [key, value] of Object.entries(el)) {
              if (_.isPlainObject(value)) {
                acc.push(`${getIndent(depth)}  ${key}: {${helper(iter([value], depth + 1))}\n  ${getIndent(depth)}}`);
              } else {
                acc.push(`${getIndent(depth)}  ${key}: ${value}`);
              }
            }
          } else if (!_.isPlainObject(el.value)) {
            acc.push(`${getIndent(depth)}${sign} ${el.name}: ${el.value}`);
          } else {
            acc.push(`${getIndent(depth)}${sign} ${el.name}: {${helper(iter([el.value], depth + 1))}\n  ${getIndent(depth)}}`);
          }
          break;
      }
      return acc;
    }, []);
    return result;
  };
  return iter(object, 1);
};
