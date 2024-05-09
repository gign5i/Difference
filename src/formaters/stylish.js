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
      if (el.type === 'nested') {
        acc.push(`${getIndent(depth)}  ${el.name}: {${helper(iter(el.value, depth + 1))}\n  ${getIndent(depth)}}`);
      } else if (el.type === 'changed') {
        const checker = (value) => (!_.isPlainObject(value) ? value : `{${helper(iter([value], depth + 1))}\n  ${getIndent(depth)}}`);
        acc.push(`${getIndent(depth)}- ${el.name}: ${checker(el.value1)}`);
        acc.push(`${getIndent(depth)}+ ${el.name}: ${checker(el.value2)}`);
      } else if (el.name === undefined || el.value === undefined) {
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
      return acc;
    }, []);
    return result;
  };
  return iter(object, 1);
};
