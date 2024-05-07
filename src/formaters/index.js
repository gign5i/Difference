import stylish from './stylish.js';
import plain from './plain.js';

export default (data, format) => {
  switch (format) {
    case 'plain':
      return plain(data);
    case 'stylish':
      return `{\n${stylish(data).flat().join('\n')}\n}`;
    case 'json':
    default:
      return JSON.stringify(data, null, 2);
  }
};
