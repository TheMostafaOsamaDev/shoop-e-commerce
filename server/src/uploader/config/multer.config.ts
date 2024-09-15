import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { memoryStorage } from 'multer';

const filename = async (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error, filename: string) => void,
) => {
  const mimetype: string = file.mimetype.split('/')[1];

  const filename: string = uuid() + '.' + mimetype;

  // await sharpMultiSizeSaver(file.buffer, productDestination, filename);

  cb(null, filename);
};

// export const multerProductConfig = diskStorage({
//   destination: productDestination,
//   filename,
// });

export const multerProductConfig = {
  storage: memoryStorage(),
  // fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
  //   const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  //   if (allowedMimeTypes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error('Invalid file type'));
  //   }
  // },
};
