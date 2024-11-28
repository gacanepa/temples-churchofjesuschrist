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
    const temple = await Temple.findById({
      _id: id,
      isDeleted: false,
    });
    res.status(StatusCodes.OK).json(temple);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

export const createTemple = async (req, res) => {
  const {
    name,
    country,
    continent,
    pictureUrl,
    status,
    address,
    milestones,
    isDeleted,
    latitude,
    longitude,
  } = req.body;

  if (!name || !country || !continent || !status) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Missing required fields' });
  }

  const templeData = {
    name,
    country,
    continent,
    pictureUrl,
    status,
    address,
    milestones,
    isDeleted,
    latitude,
    longitude,
  };

  try {
    const newTemple = await Temple.create(templeData);
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

  const updatedTemple = {};
  
  const existingTemple = await Temple.findById({
    _id: req.params.id,
    isDeleted: false,
  });

  if (!existingTemple) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Temple not found' });
  }

  if (name) updatedTemple.name = name ?? existingTemple.name;
  if (country) updatedTemple.country = country ?? existingTemple.country;
  if (continent) updatedTemple.continent = continent ?? existingTemple.continent;
  if (pictureUrl) updatedTemple.pictureUrl = pictureUrl ?? existingTemple.pictureUrl;
  if (address) updatedTemple.address = address ?? existingTemple.address;
  if (status) updatedTemple.status = status ?? existingTemple.status;
  if (milestones) updatedTemple.milestones = milestones ?? existingTemple.milestones;
  if (latitude) updatedTemple.latitude = latitude ?? existingTemple.latitude;
  if (longitude) updatedTemple.longitude = longitude ?? existingTemple.longitude;

  try {
    const updatedTempleData = await Temple.findByIdAndUpdate(
      { _id: req.params.id },
      updatedTemple,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.OK).json(updatedTempleData);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const softDeleteTemple = async (req, res) => {
  const { id } = req.params;

  const existingTemple = await Temple.findById({
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
