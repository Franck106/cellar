const fs = require('fs');

const bottles = JSON.parse(
  fs.readFileSync(`${__dirname}/../devData/bottles.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`Checking ID ${val}`);
  if (req.params.id * 1 > bottles.length - 1) {
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

exports.getAllBottles = (req, res) => {
  res.status(200).json(bottles);
};

exports.getBottle = (req, res) => {
  console.log(req.params.id);
  const id = req.params.id * 1;

  const bottle = bottles.find((b) => b.id === id);

  res.status(200).json({
    status: 'success',
    data: bottles[id],
  });
};

exports.createBottle = (req, res) => {
  const newId = bottles[bottles.length - 1].id + 1;
  const newBottle = Object.assign({ id: newId }, req.body);
  bottles.push(newBottle);
  fs.writeFile(
    `${__dirname}/../devData/bottles.json`,
    JSON.stringify(bottles),
    (err) => {
      res.status(201).json({ status: 'success', data: newBottle });
    }
  );
};
