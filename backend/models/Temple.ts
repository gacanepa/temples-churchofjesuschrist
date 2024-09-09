import mongoose from 'mongoose';
/*
When using --moduleResolution set to node16 or nodenext, you need to include the .js extension
in your import statements for TypeScript files that will be transpiled to JavaScript.
*/
import { CONTINENTS, STATUSES } from './constants.js';

const publicOpenHouseSchema = new mongoose.Schema({
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

const dedicationSchema = new mongoose.Schema({
  publicOpenHouse: {
    type: publicOpenHouseSchema,
    required: true,
  },
  dedicationDate: {
    type: String,
    required: true,
  },
  dedicatedBy: {
    type: String,
    required: true,
  },
  prayerUrl: {
    type: String,
    required: true,
  },
});

const milestoneSchema = new mongoose.Schema({
  announcedDate: {
    type: String,
    required: true,
  },
  groudBreakingDate: {
    type: String,
    required: true,
  },
  dedications: {
    type: [dedicationSchema],
    required: true,
  },
});

const templeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  continent: {
    type: String,
    enum: CONTINENTS,
    required: true,
  },
  pictureUrl: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  milestones: {
    type: milestoneSchema,
    required: true,
  },
  status: {
    type: String,
    enum: STATUSES,
    required: true,
  },
}, {
  timestamps: true,
});

const Temple = mongoose.model('Temple', templeSchema);

export default Temple;
