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
    const checker = (value) => (!_.isPlainObject(value) ? value : `{${helper(iter([value], depth + 1))}\n  ${getIndent(depth)}}`);
    return node.flatMap((el) => {
      const sign = getSign(el.type);
      const subResults = [];
      if (el.type === 'nested') {
        return `${getIndent(depth)}  ${el.name}: {${helper(iter(el.value, depth + 1))}\n  ${getIndent(depth)}}`;
      }
      if (el.type === 'changed') {
        return `${getIndent(depth)}- ${el.name}: ${checker(el.value1)}\n${getIndent(depth)}+ ${el.name}: ${checker(el.value2)}`;
      }
      if (el.name === undefined || el.value === undefined) {
        /* eslint-disable-next-line */
        for (const [key, value] of Object.entries(el)) {
          subResults[subResults.length] = `${getIndent(depth)}  ${key}: ${checker(value)}`;
        }
        return subResults;
      }
      return `${getIndent(depth)}${sign} ${el.name}: ${checker(el.value)}`;
    });
  };
  return iter(object, 1);
};
