import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import shortUrl from './routes/shortUrl.js'

dotenv.config();// load from .env to our app
connectDB(); // connect to mongodb before the server starts

const port = process.env.PORT || 5000;

const app = express();



//  middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use('/', shortUrl);


// app.get('/', (req, res) => {
//     res.send('Hello from Express')
// });

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`)
})

