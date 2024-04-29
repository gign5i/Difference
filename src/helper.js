import _ from 'lodash';

// const getSorted = (values) => {
//   values.sort((a, b) => {
//     if (a.slice(3, 4) < b.slice(3, 4)) {
//       return -1;
//     }
//     if (a.slice(3, 4) > b.slice(3, 4)) {
//       return 1;
//     }
//     return 0;
//   });
//   return values;
// };

// const getUniqKeys = (dataA, dataB) => _.uniq([..._.keys(dataA), ..._.keys(dataB)]);
const getSorted = (values) => {

  const iter = (node, depth) => {
    // console.log(`depth: ${depth} | node:`, node);
    console.log(`-------${depth}-------`);
    node.sort((a, b) => {
      // console.log('aName,:',a.name,a.value);
      // console.log('bName', b.name, b.value);
      if(_.isObject(a.value)){
        console.log(a.name, a.value);
        // const [buff] = [...a.value];
        // iter(buff, depth + 1);
      } else if(_.isObject(b.value)){
        console.log(b.name, b.value);
      }
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      
      return 0;
    });
    
    const [buff] = [...node];
    // console.log('buff.value:',buff.name,':',buff.value);
    if(_.isObject(buff.value)){
      // console.log('if:',buff.name,':', buff.value);
      iter(buff.value, depth+1);
    }
  
    return node;
  }
  return iter(values, 1);
  };

const getUniqKeys = (dataA, dataB) => _.uniq([..._.keys(dataA), ..._.keys(dataB)]);

export { getUniqKeys, getSorted };
