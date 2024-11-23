import http from 'http';
import SocketService from './service/socketService';
import RedisService from './service/redisService';

async function init() {
    const socketService = new SocketService()
    const redisService = new RedisService()
    const server = http.createServer()

    socketService.io.attach(server)

    server.listen(8000, ()=>{
        console.log("Server is running on port 8000")
    })
    
    redisService.initListener()
    socketService.initListener()
}

init()