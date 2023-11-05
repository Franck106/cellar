import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';
import { getBottlesFromCsv } from './utils/csvToJson';
import Bottle from './models/bottleModel';

dotenv.config();

const PORT = process.env.PORT;
const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD || ''
);
console.log({ DB });
mongoose.connect(DB || '').then(() => console.log('DB connection successful!'));

(async function initDB() {
  const bottles = await getBottlesFromCsv('./devData/bottles.csv');
  console.log(`${bottles.length} bottles to load...`);

  const reset = await Bottle.deleteMany();
  console.log({ reset });

  await Bottle.create(bottles);
  const totalBottlesLoaded = await Bottle.estimatedDocumentCount();

  console.log(`${totalBottlesLoaded} documents loaded to DB!`);
})();

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
