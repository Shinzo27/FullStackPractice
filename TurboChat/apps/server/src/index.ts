import http from "http";
import SocketService from "./services/socket";

async function init() {
    const socketService = new SocketService();
    const httpServer = http.createServer();

    socketService.io.attach(httpServer)

    httpServer.listen(8000, ()=>{
        console.log('Server is running on port 8000');
    });

    socketService.initListener();
}

init();