import mongoose from 'mongoose';
import {
  CONTINENTS,
  STATUS,
} from '../constants.js';

const PublicOpenHouseSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
}, { _id: false });

const DedicationSchema = new mongoose.Schema({
  dedicationDate: {
    type: Date,
    min: ['1836-03-27', 'Kirtland Temple was dedicated on March 27, 1836'],
  },
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
    required: [true, 'Name is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
  continent: {
    type: String,
    required: [true, 'Continent is required'],
    enum: {
      values: CONTINENTS,
      message: '{VALUE} is not a valid continent',
    },
  },
  pictureUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: STATUS,
      message: '{VALUE} is not a valid status',
    },
  },
  latitude: {
    type: Number,
    min: [-90, 'Latitude must be between -90 and 90'],
    max: [90, 'Latitude must be between -90 and 90'],
  },
  longitude: {
    type: Number,
    min: [-180, 'Longitude must be between -180 and 180'],
    max: [180, 'Longitude must be between -180 and 180'],
  },
  milestones: MilestonesSchema,
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Temple = mongoose.model('Temple', TemplesSchema);

export default Temple;
