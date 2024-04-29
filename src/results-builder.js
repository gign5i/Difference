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
  let spacer = '  ';

  const arr = [];
  const iter = (node, depth) => {

  node.map((el, depth) => {
    switch (el.status) {
      case ' ':
        arr.push(`${spacer}${el.status} ${el.name}: ${el.value}`);
        break;
      case '+':
        arr.push(`${spacer}${el.status} ${el.name}: ${el.value}`);
        break;
      case '-':
        arr.push(`${spacer}${el.status} ${el.name}: ${el.value}`);
        break;
        case 'hasChild':
        
        // console.log('rec:\n', depth,'\n', el.value);
        const buff = [];
        buff.push(stylish(el.value));
        let newSpace = spacer.length * depth;
        const anoter = `${spacer.repeat(newSpace)}${buff.flat().join(`\n${spacer.repeat(newSpace)}`)}`;
        // console.log('aff:',anoter, typeof anoter);
        arr.push(`${spacer}  ${el.name}: {\n${anoter}\n  ${spacer.repeat(newSpace)}}`);

        break;
    }

  
  });
  
}

  iter(object, 0);
  console.log('arr', arr);
  return arr;
};

const getDiff = (fstFileData, scndFileData) => {
  const result = getResult(fstFileData, scndFileData);
  // console.log('result:\n', result);
  
  const sortedResult = getSorted(result);
  // console.log('sortedResult\n', sortedResult);
  // console.log('\n---------------------------------\n');
  const a = [...stylish(sortedResult)];

  // console.log(`{\n${a.join('\n')}\n}`);
  return `{\n${a.flat().join('\n')}\n}`;
};

export default getDiff;
