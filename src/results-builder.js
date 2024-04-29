import _ from 'lodash';
import { getSorted, getUniqKeys } from './helper.js';

// const getResult = (keys, dataA, dataB) => {
//   const result = keys.flatMap((key) => {
//     const diffArr = [];

//     if (_.has(dataA, key) && _.has(dataB, key)) {
//       if (dataA[key] === dataB[key]) {
//         diffArr.push(`   ${key}: ${dataA[key]}`);
//       }
//       if (dataA[key] !== dataB[key]) {
//         diffArr.push(` - ${key}: ${dataA[key]}`);
//         diffArr.push(` + ${key}: ${dataB[key]}`);
//       }
//     }
//     if (_.has(dataA, key) && !_.has(dataB, key)) {
//       diffArr.push(` - ${key}: ${dataA[key]}`);
//     }
//     if (!_.has(dataA, key) && _.has(dataB, key)) {
//       diffArr.push(` + ${key}: ${dataB[key]}`);
//     }
//     return diffArr;
//   });
//   return result;
// };

// const getDiff = (fstFileData, scndFileData) => {
//   const uniqKeys = getUniqKeys(fstFileData, scndFileData);

//   const result = getResult(uniqKeys, fstFileData, scndFileData);
//   const sortedResult = getSorted(result);

//   return `{\n${sortedResult.join('\n')}\n}`;
// };



const getResult = (dataA, dataB) => {

  const uniqKeys = getUniqKeys(dataA, dataB);
  
  const result = uniqKeys.reduce((acc, key)=>{
    
    const [value1, value2]= [dataA[key], dataB[key]];
    
    if (_.has(dataA, key) && _.has(dataB, key)) {
      if (value1 === value2) {
        const buff1 = {
          name: key, 
          value: value1, 
          status:' '
        };

          acc.push(buff1);

      } else if (_.isObject(value1) && _.isObject(value2)) {
        
        const buff2 = {
          name: key, 
          value: getResult(value1, value2), 
          status:'hasChild'
        };

        acc.push({...buff2});

      } else if (value1 !== value2) {
        acc.push({name: key, value: value1, status:'-'});
        acc.push({name: key, value: value2, status:'+'});
      } 
    }
    if (_.has(dataA, key) && !_.has(dataB, key)) { 
      
      acc.push({name: key, value: value1, status:'-'});
    }
    if (!_.has(dataA, key) && _.has(dataB, key)) {

      acc.push({name: key, value: value2, status:'+'});
    }

    return acc;
  }, []);
  
  return result;
};
const stylish = (object) => {
  let spacer = '    ';
  
  const arr = [];
  const iter = (node, depth) => {
  console.log(depth);

  const result = node.reduce((acc, el) => {
  
    switch (el.status) {
      case 'hasChild':
        console.log('rec:\n', depth,'\n', el.value, typeof el.value);
        // const buff = [];
        const buff = iter(el.value, depth + 1);
        console.log('buff:', buff);
        const currValue = `${`{\n${buff.flat().join('\n')}\n  ${spacer.repeat(depth)}`}}`;
        acc.push(`${spacer.repeat(depth)}  ${el.name}: ${currValue}`);
        // const firstPart = `${spacer.repeat(depth)}  ${el.name}:`;
        // const secondPart = `${iter(el.value, depth + 1)}`;
        // console.log('!!!!:\n', firstPart, secondPart);
        break;
      default:
        acc.push(`${spacer.repeat(depth)}${el.status} ${el.name}: ${el.value}`);
        break;
    }
  return acc;
  }, []);
  return result;
  
}
  
  // iter(object, 1);
  // console.log('arr', iter(object, 1));
  return iter(object, 1);
};

const getDiff = (fstFileData, scndFileData) => {
  const result = getResult(fstFileData, scndFileData);
  // console.log('result:\n', result);
  
  const sortedResult = getSorted(result);
  console.log('sortedResult\n', ...sortedResult);
  // console.log('\n---------------------------------\n');
  const a = [...stylish(sortedResult)];

  // console.log(`{\n${a.join('\n')}\n}`);
  return `{\n${a.flat().join('\n')}\n}`;
};

export default getDiff;
