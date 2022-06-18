import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;

/*connect mongoose to database, for CRUD operations on documents within it*/
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) }))
    .catch((error) => console.log(error.message));
// mongoose.set('useFindAndModify', false);


/*Middleware*/
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Pet-Memories-Application');
});


