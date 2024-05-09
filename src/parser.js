import yaml from 'js-yaml';

export default (fileData, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(fileData);
    case 'yaml':
    case 'yml': {
      const loadedYaml = yaml.load(fileData);
      const toJson = JSON.stringify(loadedYaml, null, 2);
      return JSON.parse(toJson);
    }
    default:
      throw Error(`Format ${fileformat} is not supported!`);
  }
};
