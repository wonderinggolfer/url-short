import mongoose from 'mongoose'

// connect to MongdoDB 
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log('DB successfully connected')
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB;