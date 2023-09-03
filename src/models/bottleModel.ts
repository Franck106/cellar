import mongoose from 'mongoose';

const bottleShema = new mongoose.Schema({
  name: {
    type: String,
    default: 'unknown',
    required: true,
  },
  color: String,
  quantity: String,
  price: String,
});

const Bottle = mongoose.model('Bottle', bottleShema);

export default Bottle;
