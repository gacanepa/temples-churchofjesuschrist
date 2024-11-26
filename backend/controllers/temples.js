import { StatusCodes } from 'http-status-codes';
import Temple from '../models/Temple.js';

export const getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find({ isDeleted: false });
    res.status(StatusCodes.OK).json(temples);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const getTempleById = async (req, res) => {
  const { id } = req.params;

  try {
    const temple = await Temple.findOne({ _id: id, isDeleted: false });
    res.status(StatusCodes.OK).json(temple);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const createTemple = async (req, res) => {
  const temple = req.body;

  const newTemple = await Temple.create(temple);

  try {
    await newTemple.save();
    res.status(StatusCodes.CREATED).json(newTemple);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateTemple = async (req, res) => {
  const {
    name,
    country,
    continent,
    pictureUrl,
    address,
    status,
    milestones,
    latitude,
    longitude,
  } = req.body;
  
  const existingTemple = await Temple.findOne({
    _id: req.params.id,
    isDeleted: false,
  });

  existingTemple.name = name;
  existingTemple.country = country;
  existingTemple.continent = continent;
  existingTemple.pictureUrl = pictureUrl;
  existingTemple.address = address;
  existingTemple.status = status;
  existingTemple.milestones = milestones;
  existingTemple.latitude = latitude;
  existingTemple.longitude = longitude;

  try {
    await existingTemple.save();
    res.status(StatusCodes.OK).json(updatedTemple);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const softDeleteTemple = async (req, res) => {
  const { id } = req.params;

  const existingTemple = await Temple.findOne({
    _id: id,
    isDeleted: false,
  });

  existingTemple.isDeleted = true;

  try {
    await existingTemple.save();
    res.status(StatusCodes.OK).json({ message: 'Temple deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const hardDeleteTemple = async (req, res) => {
  const { id } = req.params;
  const existingTemple = await Temple.findOne({ _id: id });

  try {
    await existingTemple.remove();
    res.status(StatusCodes.OK).json({ message: 'Temple deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
