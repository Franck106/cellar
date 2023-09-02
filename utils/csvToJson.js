const fs = require('node:fs');

exports.csvToJson = function (path) {
  try {
    const content = fs.readFileSync(path, 'utf-8');
    const lines = content.split('\n');
    const headers = lines.shift().split(',');
    const bottles = [];
    lines.forEach((line) => {
      const rawBottle = line.split(',');
      const bottle = rawBottle.reduce((acc, value, index) => {
        return Object.assign({
          ...acc,
          [headers[index]]: value,
        });
      }, {});
      bottles.push(bottle);
    });
    console.log(`Read file ${path} done!`);
    return bottles;
  } catch (error) {
    console.log(`Oups error reading file ${path}`, error);
    return [];
  }
};
