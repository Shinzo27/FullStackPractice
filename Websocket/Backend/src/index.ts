import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import express from 'express'

const app = express()
const server = require('http').createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send a welcome message to the client
    ws.send('Welcome to the WebSocket server!');

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log('Received:', message);

        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});