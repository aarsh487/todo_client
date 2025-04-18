import monggose from 'mongoose';
import { DATABASE_URL } from './getEnv';

export const connectDb = async() => {
    try {
        console.log(DATABASE_URL)
        await monggose.connect(DATABASE_URL)
    } catch (error) {
       console.log("Error in connecting to Database") 
    }
}