import _ from 'lodash';

const styleHelper = (values) => `\n${values.flat().join('\n')}`;

const getSign = (elType) => {
  if (elType === 'A') {
    return '+';
  }
  if (elType === 'D') {
    return '-';
  }
  return ' ';
};

export default (object) => {
  const spacer = '    ';
  const replacer = ' ';

  const iter = (node, depth) => {
    const result = node.reduce((acc, el) => {
      const getIndent = (curDepth) => replacer.repeat(curDepth * spacer.length).slice(0, -2);
      const sign = getSign(el.type);
      let fixedValue = '';
      switch (el.type) {
        case 'N':
          fixedValue = styleHelper(iter(el.value, depth + 1));
          acc.push(`${getIndent(depth)}  ${el.name}: {${fixedValue}\n  ${getIndent(depth)}}`);
          break;
        case 'C':
          if (!_.isPlainObject(el.value1)) {
            acc.push(`${getIndent(depth)}- ${el.name}: ${el.value1}`);
            acc.push(`${getIndent(depth)}+ ${el.name}: ${el.value2}`);
          } else if (_.isPlainObject(el.value1)) {
            fixedValue = styleHelper(iter([el.value1], depth + 1));
            acc.push(`${getIndent(depth)}- ${el.name}: {${fixedValue}\n  ${getIndent(depth)}}`);
            acc.push(`${getIndent(depth)}+ ${el.name}: ${el.value2}`);
          }
          break;
        default:
          if (el.name === undefined || el.value === undefined) {
            /* eslint-disable-next-line */
            for (const [key, value] of Object.entries(el)) {
              if (_.isPlainObject(value)) {
                fixedValue = styleHelper(iter([value], depth + 1));
                acc.push(`${getIndent(depth)}  ${key}: {${fixedValue}\n  ${getIndent(depth)}}`);
              } else {
                acc.push(`${getIndent(depth)}  ${key}: ${value}`);
              }
            }
          } else if (!_.isPlainObject(el.value)) {
            acc.push(`${getIndent(depth)}${sign} ${el.name}: ${el.value}`);
          } else {
            fixedValue = styleHelper(iter([el.value], depth + 1));
            acc.push(`${getIndent(depth)}${sign} ${el.name}: {${fixedValue}\n  ${getIndent(depth)}}`);
          }
          break;
      }
      return acc;
    }, []);
    return result;
  };
  return iter(object, 1);
};
