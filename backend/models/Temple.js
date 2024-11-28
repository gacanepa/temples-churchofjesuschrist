import mongoose from 'mongoose';
import {
  CONTINENTS,
  IN_OPERATION,
  NORTH_AMERICA,
  STATUS,
} from '../constants.js';

const PublicOpenHouseSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
}, { _id: false });

const DedicationSchema = new mongoose.Schema({
  dedicationDate: Date,
  dedicatedBy: String,
  prayerUrl: String,
}, { _id: false });

const MilestonesSchema = new mongoose.Schema({
  announcedDate: Date,
  groundbreakingDate: Date,
  dedications: [DedicationSchema],
  publicOpenHouses: [PublicOpenHouseSchema],
}, { _id: false });

const TemplesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
    enum: CONTINENTS,
    default: NORTH_AMERICA,
  },
  pictureUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: STATUS,
    default: IN_OPERATION,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  milestones: MilestonesSchema,
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Temple = mongoose.model('Temple', TemplesSchema);

export default Temple;
