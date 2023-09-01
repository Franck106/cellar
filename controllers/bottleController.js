const fs = require('fs');
const Bottle = require('../models/bottleModel');
const { csvTojsonSync } = require('../utils/csvToJson');

// const bottles = JSON.parse(
//   fs.readFileSync(`${__dirname}/../devData/bottles.json`)
// );

const bottleJSON = csvTojsonSync('./devData/bottles.csv');

const idRegex = /^[0-9a-fA-F]{24}$/;

exports.checkId = (req, res, next, val) => {
  console.log(`Checking ID ${val}`);
  if (!idRegex.test(req.params.id)) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  const bottle = req.body;
  if (!bottle.name) {
    return res.status(400).json({
      status: 'failed',
      message: 'Bottle must have a name',
    });
  }
  next();
};

exports.getAllBottles = async (req, res) => {
  const bottlesDB = await Bottle.find();
  res.status(200).json({
    status: 'success',
    results: bottlesDB.length,
    data: bottlesDB,
  });
};

exports.getAllBottlesCSV = (_req, res) => {
  return res.status(200).json({
    status: 'success',
    results: bottleJSON.length,
    data: bottleJSON,
  });
};

// Find in file
// exports.getBottle = (req, res) => {
//   console.log(req.params.id);
//   const id = req.params.id * 1;

//   const bottle = bottles.find((b) => b.id === id);

//   res.status(200).json({
//     status: 'success',
//     data: bottles[id],
//   });
// };

// Find in MongoDB
exports.getBottle = async (req, res) => {
  const id = req.params.id;
  try {
    const bottle = await Bottle.findById(id);
    if (!bottle) {
      return res.status(404).json({
        status: 'failed',
        message: 'not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: bottle,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
};

// Save to file
// exports.createBottle = (req, res) => {
//   const newId = bottles[bottles.length - 1].id + 1;
//   const newBottle = Object.assign({ id: newId }, req.body);
//   bottles.push(newBottle);
//   fs.writeFile(
//     `${__dirname}/../devData/bottles.json`,
//     JSON.stringify(bottles),
//     (err) => {
//       res.status(201).json({ status: 'success', data: newBottle });
//     }
//   );
// };

// Save to MongoDB
exports.createBottle = async (req, res) => {
  const bottle = new Bottle(req.body);
  await bottle.save();
  res.status(201).json({
    status: 'success',
    data: bottle,
  });
};
