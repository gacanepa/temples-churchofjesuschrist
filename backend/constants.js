export const SOUTH_AMERICA = 'South America';
export const EUROPE = 'Europe';
export const ASIA = 'Asia';
export const AFRICA = 'Africa';
export const NORTH_AMERICA = 'North America';
export const OCEANIA = 'Oceania';

export const CONTINENTS = [
  SOUTH_AMERICA,
  EUROPE,
  ASIA,
  AFRICA,
  NORTH_AMERICA,
  OCEANIA,
];

export const ANNOUNCED = 'Announced';
export const UNDER_CONSTRUCTION = 'Under Construction';
export const DEDICATED = 'Dedicated';
export const IN_OPERATION = 'In Operation';
export const CLOSED = 'Closed';

export const STATUS = [
  ANNOUNCED,
  UNDER_CONSTRUCTION,
  DEDICATED,
  IN_OPERATION,
  CLOSED,
];

// Rate limiting
export const RATE_LIMIT_TIME_WINDOW = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;
export const RATE_LIMIT_MESSAGE = 'Too many requests, please try again later';

// Session configuration
export const COOKIE_MAX_AGE = 3600000; // 1 hour
