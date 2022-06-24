import robot from 'robotjs';
import {
  moveDown, moveLeft, moveRight, moveUp,
} from './line';

export const square = (x: number, y: number, width: number) => {
  robot.mouseToggle('down');

  moveRight(x, y, width)
    .then(() => moveDown(x + width, y, width))
    .then(() => moveLeft(x + width, y + width, width))
    .then(() => moveUp(x, y + width, width))
    .then(() => robot.mouseToggle('up'));
};
