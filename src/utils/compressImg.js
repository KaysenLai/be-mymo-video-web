import sharp from 'sharp';

const compressImage = async (fileBuffer, width) => {
  const compressedImg = await sharp(fileBuffer).resize({ width }).toBuffer();
  return compressedImg;
};

export default compressImage;
