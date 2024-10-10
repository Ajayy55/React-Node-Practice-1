import mongoose from 'mongoose';

export const dbConnection=async()=>{

    try {
            await mongoose.connect(`${process.env.URI}/DesinersX`);
            console.log('Mongo DB connected ..!');
            
        } catch (error) {
            console.log('MongoDb failed to connect', error);
        }

}