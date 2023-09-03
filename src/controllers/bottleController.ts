import fs from 'fs';
import { Request, Response } from 'express';

import Bottle from '../models/bottleModel';

const bottles = JSON.parse(
  fs.readFileSync(`./devData/bottles.json`, { encoding: 'utf-8' })
);

const idRegex = /^[0-9a-fA-F]{24}$/;

export const checkId = (req: Request, res: Response, next: any, val: any) => {
  console.log(`Checking ID ${val}`);
  if (!idRegex.test(req.params.id)) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  next();
};

export const checkBody = (req: Request, res: Response, next: any) => {
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

export const getAllBottles = async (_req: Request, res: Response) => {
  const bottlesDB = await Bottle.find();
  res.status(200).json({
    status: 'success',
    results: bottlesDB.length,
    data: bottlesDB,
  });
};

export const getAllBottlesJSON = (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    results: bottles.length,
    data: bottles,
  });
};

// Find in file
// export const getBottle = (req, res) => {
//   console.log(req.params.id);
//   const id = req.params.id * 1;

//   const bottle = bottles.find((b) => b.id === id);

//   res.status(200).json({
//     status: 'success',
//     data: bottles[id],
//   });
// };

// Find in MongoDB
export const getBottle = async (req: Request, res: Response) => {
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
// export const createBottle = (req, res) => {
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
export const createBottle = async (req: Request, res: Response) => {
  const bottle = new Bottle(req.body);
  await bottle.save();
  res.status(201).json({
    status: 'success',
    data: bottle,
  });
};
