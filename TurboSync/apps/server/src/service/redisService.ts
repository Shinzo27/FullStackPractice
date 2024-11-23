import { createClient } from "redis"

class RedisService {
    private _client: any;

    constructor(){
        this._client = createClient({
            url: "redis://localhost:6379"
        })
    }

    public async getUser(roomId: string){
        const user = await this._client.get(roomId)
        return user
    }

    public async setUser(roomId: string, user: string){
        await this._client.set(roomId, user)
    }

    public initListener(){
        this._client.on("connect", ()=>{
            console.log("Redis connected")
        })

        this._client.on("error", (err:any)=>{
            console.log("Redis error", err)
        })
    }
    public get client(){
        return this._client
    }
}

export default RedisService