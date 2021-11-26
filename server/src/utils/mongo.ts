import mongoose from 'mongoose';
import config from 'config';

async function connectToMongo() {
  try {
    await mongoose.connect(config.get('dbUri'));
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectToMongo;
