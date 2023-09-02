const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('node:fs');

const app = require('./app');
const { csvToJson } = require('./utils/csvToJson');

dotenv.config();

const PORT = process.env.PORT;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log({ DB });

// Parse CSV synchronously at the start of the app.
const bottles = csvToJson('./devData/bottles.csv');
fs.writeFileSync('./devData/bottles.json', JSON.stringify(bottles), { encoding: 'utf-8' });

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
