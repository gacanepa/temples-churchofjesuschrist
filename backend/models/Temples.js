import mongoose from 'mongoose';
import {
  CONTINENTS,
  IN_OPERATION,
  NORTH_AMERICA,
  STATUS,
} from '../constants';

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
  milestones: {
    type: {
      announcedDate: {
        type: Date,
      },
      groundbreakingDate: {
        type: Date,
      },
      dedications: [
        {
          dedicationDate: {
            type: Date,
          },
          dedicatedBy: {
            type: String,
          },
          prayerUrl: {
            type: String,
          },
          publicOpenHouse: {
            startDate: {
              type: Date,
            },
            endDate: {
              type: Date,
            },
          }
        },
      ],
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Temples = mongoose.model('Temples', TemplesSchema);
