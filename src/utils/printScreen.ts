import Jimp from 'jimp';
import robot from 'robotjs';

export const printScreen = async (x: number, y: number) => {
  const size = 100;
  const image = robot.screen.capture(x - size, y - size, size * 2, size * 2);

  const jimp = new Jimp(image.width, image.height);
  jimp.bitmap.data = image.image;

  const base64Image = await jimp.getBase64Async(Jimp.MIME_PNG);
  const base64 = base64Image.split(',')[1];
  return base64;
};
