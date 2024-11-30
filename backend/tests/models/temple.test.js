import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Temple from '../../models/Temple.js';
import { CONTINENTS, STATUS } from '../../constants.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Temple.deleteMany({});
});

describe('Temple Model Test', () => {
  it('should create and save a temple successfully', async () => {
    const validTemple = new Temple({
      name: 'Test Temple',
      country: 'Test Country',
      continent: CONTINENTS[0],
      status: STATUS[0],
      latitude: 0,
      longitude: 0,
    });
    const savedTemple = await validTemple.save();

    expect(savedTemple._id).toBeDefined();
    expect(savedTemple.name).toBe(validTemple.name);
    expect(savedTemple.country).toBe(validTemple.country);
    expect(savedTemple.continent).toBe(validTemple.continent);
    expect(savedTemple.status).toBe(validTemple.status);
    expect(savedTemple.latitude).toBe(validTemple.latitude);
    expect(savedTemple.longitude).toBe(validTemple.longitude);
  });

  it('should fail to create a temple without required fields', async () => {
    const invalidTemple = new Temple({ name: 'Test Temple' });
    let err;
    try {
      await invalidTemple.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.country).toBeDefined();
    expect(err.errors.continent).toBeDefined();
    expect(err.errors.status).toBeDefined();
  });

  it('should fail to create a temple with invalid continent', async () => {
    const invalidTemple = new Temple({
      name: 'Test Temple',
      country: 'Test Country',
      continent: 'Invalid Continent',
      status: STATUS[0],
      latitude: 0,
      longitude: 0,
    });
    let err;
    try {
      await invalidTemple.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.continent).toBeDefined();
    expect(err.errors.continent.message).toBe('Invalid Continent is not a valid continent');
  });

  it('should fail to create a temple with invalid status', async () => {
    const invalidTemple = new Temple({
      name: 'Test Temple',
      country: 'Test Country',
      continent: CONTINENTS[0],
      status: 'Invalid Status',
      latitude: 0,
      longitude: 0,
    });
    let err;
    try {
      await invalidTemple.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.status).toBeDefined();
    expect(err.errors.status.message).toBe('Invalid Status is not a valid status');
  });
});
