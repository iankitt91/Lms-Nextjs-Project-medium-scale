import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI).then((conn)=>{
            console.log("Database Connected",conn.connection.host);
        })
    }catch(error){
        console.log(error.message);
        setTimeout(connectDB,5000);
    }
}

export default connectDB;