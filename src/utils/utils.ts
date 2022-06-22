import robot from 'robotjs';

export const moveRight = (x: number, y: number, coord: string) => new Promise((resolve) => {
  let c = 0;
  const time = setInterval(() => {
    c += (+coord / 10);
    robot.dragMouse(x + c, y);

    if (c === +coord) {
      clearInterval(time);
      resolve(x);
    }
  }, 100);
});

export const moveDown = (x: number, y: number, coord: string) => new Promise((resolve) => {
  let c = 0;
  const time = setInterval(() => {
    c += (+coord / 10);
    robot.dragMouse(x, y + c);

    if (c === +coord) {
      clearInterval(time);
      resolve(x);
    }
  }, 100);
});

export const moveLeft = (x: number, y: number, coord: string) => new Promise((resolve) => {
  let c = 0;
  const time = setInterval(() => {
    c += (+coord / 10);
    robot.dragMouse(x - c, y);

    if (c === +coord) {
      clearInterval(time);
      resolve(x);
    }
  }, 100);
});

export const moveUp = (x: number, y: number, coord: string) => new Promise((resolve) => {
  let c = 0;
  const time = setInterval(() => {
    c += (+coord / 10);
    robot.dragMouse(x, y - c);

    if (c === +coord) {
      clearInterval(time);
      resolve(x);
    }
  }, 100);
});
