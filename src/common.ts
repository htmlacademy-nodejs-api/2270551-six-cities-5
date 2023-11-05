import { CHUNK_SIZE } from './const.js';

export const steamCommonOptions: {
  highWaterMark: number;
  encoding: BufferEncoding
} = {
  highWaterMark: CHUNK_SIZE,
  encoding: 'utf-8',
};

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

