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
        
        // console.log("buff:", buff2.value, typeof buff2.value);
        
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
  let spaser = '  ';
  // console.log(object);
  const arr = [];
  const iter = (node, depth) => {

  node.map((el, depth) => {
    switch (el.status) {
      case ' ':
        arr.push(`${spaser}${el.status} ${el.name}: ${el.value}`);
        break;
      case '+':
        arr.push(`${spaser}${el.status} ${el.name}: ${el.value}`);
        break;
      case '-':
        arr.push(`${spaser}${el.status} ${el.name}: ${el.value}`);
        break;
      case 'hasChild':
        
        console.log('rec:\n', depth,'\n', el.value);
        arr.push(`${spaser}  ${el.name}: {\n${spaser.repeat(spaser.length * depth)}${iter(el.value, depth + 1)}`);
        // arr.push(`${spaser}  ${el.name}:${spaser.repeat(spaser.length * depth)}${[...el.value]}`);

        
        break;
    }
  
  });
  console.log(`{\n${arr.join('\n')}\n}`);
  return arr;
 
}

  return iter(object, 0);
  
};

const getDiff = (fstFileData, scndFileData) => {


  const result = getResult(fstFileData, scndFileData);
  // console.log('result:\n', result);
  
  const sortedResult = getSorted(result);
  console.log('sortedResult', ...sortedResult);
  console.log('\n---------------------------------\n');
  stylish(sortedResult);

  // return `{\n${a.join('\n')}\n}`;
};

export default getDiff;
