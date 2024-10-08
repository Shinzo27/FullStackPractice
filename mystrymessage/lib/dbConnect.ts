import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected) {
        console.log("Already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.DB_URL || "")
        connection.isConnected = db.connections[0].readyState
        console.log("Db Connected!");
    } catch (error) {
        console.log("Db connection failed! ", error);
        process.exit()
    }
}

export default dbConnect;