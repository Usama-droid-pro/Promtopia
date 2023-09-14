import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Mongodb is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,
            {
                dbName: 'promotopiaDB',
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        isConnected = true;
        console.log("connected successfully")
    }
    catch (err) {
        console.log("Error while connection to database")
        console.log(err)
    }
}   