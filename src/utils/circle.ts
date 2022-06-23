import robot from 'robotjs';

export const moveCircle = (x: number, y: number, r: number)
: Promise<number> => new Promise((resolve) => {
  let xCoord = x;
  let yCoord = y;
  let fi = 0;
  let count = 0;
  robot.dragMouse(x - r, y);
  robot.mouseToggle('down');
  const time = setInterval(() => {
    fi += Math.floor(Math.PI * 2 * 100);
    xCoord = x - r * Math.cos(fi / 10000);
    yCoord = y - r * Math.sin(fi / 10000);
    robot.dragMouse(xCoord, yCoord);
    count += 1;
    console.log(fi, 'fi', Math.floor(Math.PI * 2 * 100) * 100, count);

    if (fi > Math.floor(Math.PI * 2 * 100) * 100) {
      clearInterval(time);
      resolve(x);
    }
  }, 100);
});
