// import Jimp from 'jimp';
import robot from 'robotjs';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { httpServer } from './src/http_server/index';
import { moveCircle } from './src/utils/circle';
import {
  moveDown, moveLeft, moveRight, moveUp,
} from './src/utils/utils';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: 8080,
});

wss.on('connection', (ws) => {
  const stream = createWebSocketStream(ws, {
    encoding: 'utf8',
  });

  let data = '';

  stream.on('readable', () => {
    data = stream.read();
    stream.emit('end');
  });

  stream.on('end', async () => {
    if (!data) { return; }
    let { x, y } = robot.getMousePos();

    const [command, coord1, coord2] = data.split(' ');
    const width = +coord1;
    const height = +coord2;

    if (command === 'mouse_up') {
      y -= width;
      robot.moveMouse(x, y);
    }

    if (command === 'mouse_right') {
      x += width;
      robot.moveMouse(x, y);
    }

    if (command === 'mouse_left') {
      x -= width;
      robot.moveMouse(x, y);
    }

    if (command === 'mouse_down') {
      y += width;
      robot.moveMouse(x, y);
    }
    if (command === 'mouse_position') {
      ws.send(`mouse_position ${x},${y}`);
    }
    if (command === 'draw_square') {
      robot.mouseToggle('down');

      moveRight(x, y, width)
        .then(() => moveDown(x + width, y, width))
        .then(() => moveLeft(x + width, y + width, width))
        .then(() => moveUp(x, y + width, width))
        .then(() => robot.mouseToggle('up'));
    }
    if (command === 'draw_rectangle') {
      robot.mouseToggle('down');

      moveRight(x, y, width)
        .then(() => moveDown(x + width, y, height))
        .then(() => moveLeft(x + width, y + height, width))
        .then(() => moveUp(x, y + height, height))
        .then(() => robot.mouseToggle('up'));
    }

    if (command === 'draw_circle') {
      moveCircle(x, y, width)
        .then(() => robot.mouseToggle('up'));
    }
    // if (!command) { return; }
    // ws.send(command);

    console.log(command, x, y, width, height);
  });

  ws.on('close', () => {
    console.log('clietn offline');
  });
});
