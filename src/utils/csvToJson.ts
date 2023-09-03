import fs from 'node:fs';
import readline from 'node:readline/promises';

export function csvToJson(path: string) {
  try {
    const content = fs.readFileSync(path, 'utf-8');
    const lines = content.split('\n') || [];
    const headers = lines.shift()?.toLocaleLowerCase().split(',');
    const bottles: any[] = [];
    lines.forEach((line) => {
      const rawBottle = line.split(',');
      const bottle = rawBottle.reduce((acc, value, index) => {
        const prop = headers ? headers[index] : 'default';
        return Object.assign({
          ...acc,
          [prop]: value,
        });
      }, {} as any);
      bottle.name = bottle.name || 'unknown';
      bottles.push(bottle);
    });
    console.log(`Read file ${path} done!`);
    return bottles;
  } catch (error) {
    console.log(`Oups error reading file ${path}`, error);
    return [];
  }
}

export async function csvToJsonAsync(path: string) {
  const bottles: any[] = [];
  const readable = fs.createReadStream(path, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: readable,
    output: process.stdout,
  });
  let isFirstLine = true;
  let headers: string[];

  for await (const line of rl) {
    if (isFirstLine) {
      headers = line.split(',');
      isFirstLine = false;
    } else {
      const rawBottle = line.split(',');

      const bottle = rawBottle.reduce((acc, value, index) => {
        const prop = headers ? headers[index] : 'default';
        return Object.assign({
          ...acc,
          [prop]: value,
        });
      }, {} as any);

      bottle.name = bottle.name || 'unknown';
      bottles.push(bottle);
    }
  }
  return bottles;
}
