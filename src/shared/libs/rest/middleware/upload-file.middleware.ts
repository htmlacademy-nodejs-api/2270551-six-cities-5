import { Request, Response, NextFunction } from 'express';
import multer, { diskStorage } from 'multer';
import { MiddlewareInterface } from './middleware.interface.js';
import mime from 'mime-types';
import { nanoid } from 'nanoid';


export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
     private uploadDirectory: string,
     private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extantion = mime.extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${extantion}`);
      }
    });

    const uploadSingleFileMiddleware = multer({ storage }).single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
