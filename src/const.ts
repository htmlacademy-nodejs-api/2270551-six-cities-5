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
