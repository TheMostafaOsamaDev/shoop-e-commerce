import { BadRequestException } from '@nestjs/common';
import { join } from 'path';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';

export const resizeAndSaveImages = async (
  imageBuffer: Buffer,
  endpoint: 'product',
  fileName: string,
) => {
  const sizes = { sm: 200, md: 500, lg: 1000 };
  const savedPaths: string[] = [];
  let path = '/public/';
  const mimetype = fileName.split('.').pop();
  const uniqueName = uuid();
  const imageName = `${uniqueName}.${mimetype}`;

  if (endpoint === 'product') {
    path += 'products';
  }

  try {
    for (const [key, size] of Object.entries(sizes)) {
      const resizedImagePath = join(`./${path}/_${key}_${imageName}`);
      await sharp(imageBuffer).resize(size).toFile(resizedImagePath);
      savedPaths.push(resizedImagePath);
    }
    return imageName;
  } catch (error) {
    console.log(error);
    throw new BadRequestException('Failed to resize and save the image');
  }
};
