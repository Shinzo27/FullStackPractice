import http from 'http';
import SocketService from './service/socketService';

async function init() {
    const socketService = new SocketService()
    const server = http.createServer()

    socketService.io.attach(server)

    server.listen(8000, ()=>{
        console.log("Server is running on port 8000")
    })

    socketService.initListener()
}

init()