import _ from 'lodash';
import path from 'path';

const pathBuilder = (filePath) => path.resolve(process.cwd(), filePath);

const getTypeFile = (filePath) => path.extname(filePath).slice(1);

const getSorted = (values) => {
  // console.log('values:', values);
  const iter = (node, depth) => {
    const [buff] = [...node];
    if (_.isObject(buff.value)) {
      iter(buff.value, depth + 1);
    }
    // node.sort((a, b) => {
    //   if (a.key < b.key) {
    //     return -1;
    //   }
    //   if (a.key > b.key) {
    //     return 1;
    //   }
    //   return 0;
    // });
    // return node;
  return _.sortBy(node, node.name);
  };
  

  return iter(values, 1);
};

export { getSorted, pathBuilder, getTypeFile };
