const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log({ DB });

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
