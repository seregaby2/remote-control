import robot from 'robotjs';
import {
  moveDown, moveLeft, moveRight, moveUp,
} from './line';

export const rectangle = (x: number, y: number, width: number, height: number) => {
  robot.mouseToggle('down');

  moveRight(x, y, width)
    .then(() => moveDown(x + width, y, height))
    .then(() => moveLeft(x + width, y + height, width))
    .then(() => moveUp(x, y + height, height))
    .then(() => robot.mouseToggle('up'));
};
