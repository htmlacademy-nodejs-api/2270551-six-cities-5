export const CITIES = {
  paris: {
    name: 'paris',
    coords: { latitude: 48.85661, longitude: 2.351499 },
  },
  cologne: {
    name: 'cologne',
    coords: { latitude: 50.938361, longitude: 6.959974 },
  },
  brussels: {
    name: 'brussels',
    coords: { latitude: 50.846557, longitude: 4.351697 },
  },
  amsterdam: {
    name: 'amsterdam',
    coords: { latitude: 52.370216, longitude: 4.895168 },
  },
  hamburg: {
    name: 'hamburg',
    coords: { latitude: 53.550341, longitude: 10.000654 },
  },
  dusseldorf: {
    name: 'dusseldorf',
    coords: { latitude: 51.225402, longitude: 6.776314 },
  },
} as const;

export const CHUNK_SIZE = 16384; // 16KB

export const MIN_USER_NAME_LENGTH = 1;
export const MAX_USER_NAME_LENGTH = 15;

export const MIN_USER_PASSWORD_LENGTH = 6;
export const MAX_USER_PASSWORD_LENGTH = 12;

export const DEFAULT_AVATAR_URL = 'https://via.placeholder.com/20x20?text=A';

export const MIN_OFFER_TITLE_LENGTH = 1;
export const MAX_OFFER_TITLE_LENGTH = 100;

export const MIN_OFFER_DESCRIPTION_LENGTH = 20;
export const MAX_OFFER_DESCRIPTION_LENGTH = 1024;

export const OFFER_PHOTOS_QUANTITY = 6;

export const OFFER_MIN_RATING = 1;
export const OFFER_MAX_RATING = 5;

export const MIN_ROOM_QUANTITY = 1;
export const MAX_ROOM_QUANTITY = 8;

export const MIN_GUESTS_QUANTITY = 1;
export const MAX_GUESTS_QUANTITY = 10;

export const MIN_RENTAL_PRICE = 100;
export const MAX_RENTAL_PRICE = 100000;

export const DEFAULT_USER_PASSWORD = '123456';
export const DEFAULT_DB_PORT = '27017';

export const EMAIL_REGEX = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
