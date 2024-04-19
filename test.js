import * as fs from "fs";
import path  from "path"; 
const func = (path1, path2) => {
  let absFilePath1 = path.resolve(path1);
   const file1 = fs.readFileSync(absFilePath1, { encoding: "utf-8" });
   const file2 = fs.readFileSync(path2,  { encoding: "utf-8" });
   console.log(file1, file2);
};
export default func;