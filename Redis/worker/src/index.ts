import { createClient } from 'redis'

const client = createClient()

async function startServer() {
    try {
        await client.connect()
        console.log("Redis connected!");
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    while(1){
        const response = await client.brPop("submissions", 0);
        console.log(response);
        await new Promise((resolve)=> setTimeout(resolve, 1000))
        //send it to pub sub
        console.log("Proccessed users submission!");
    }
}

startServer()
main()