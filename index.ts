// import Jimp from 'jimp';
import robot from 'robotjs';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { httpServer } from './src/http_server/index';
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
    let { x, y } = robot.getMousePos();

    const [command, coord, coord1] = data.split(' ');

    if (command === 'mouse_up') {
      y -= +coord;
      robot.moveMouse(x, y);
    }

    if (command === 'mouse_right') {
      x += +coord;
      robot.moveMouse(x, y);
    }

    if (command === 'mouse_left') {
      x -= +coord;
      robot.moveMouse(x, y);
    }

    if (command === 'mouse_down') {
      y += +coord;
      robot.moveMouse(x, y);
    }
    if (command === 'mouse_position') {
      stream.write(`mouse_position ${x}px, ${y}px`);
    }
    if (command === 'draw_square') {
      robot.mouseToggle('down');

      moveRight(x, y, coord)
        .then(() => moveDown(x + +coord, y, coord))
        .then(() => moveLeft(x + +coord, y + +coord, coord))
        .then(() => moveUp(x, y + +coord, coord))
        .then(() => robot.mouseToggle('up'));
    }

    ws.send(command);

    console.log(command, x, y, coord, coord1);
  });

  ws.on('close', () => {
    console.log('clietn offline');
  });
});
