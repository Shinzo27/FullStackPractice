import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, WebSocket } from 'ws';

// Initialize Express app
const app = express();
const port = 3000;

// Create an HTTP server from the Express app
const server = createServer(app);

// Create a WebSocket server attached to the HTTP server
const wss = new Server({ server });

// Serve a simple index.html file
app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html');
});

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
  
    ws.on('message', function message(data, isBinary) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    });
  
    ws.send('Hello! Message From Server!!');
  });

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});