import stylish from './stylish.js';
import plain from './plain.js'

export default (data, format) => {
  if (format === 'stylish') {
    return `{\n${stylish(data).flat().join('\n')}\n}`;
  } else if (format === 'plain') {
    return plain(data);
  }
}