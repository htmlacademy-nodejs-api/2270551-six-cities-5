import { CHUNK_SIZE } from './const.js';

export const steamCommonOptions: {
  highWaterMark: number;
  encoding: BufferEncoding
} = {
  highWaterMark: CHUNK_SIZE,
  encoding: 'utf-8',
};
