import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI){
    throw new Error("Please define the mongodb connection string. Connection Failed!");
};
let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
};
async function dbConnect(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose)=> {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;


