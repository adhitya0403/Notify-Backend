import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

import connectDB from './config/db.js'; // Assuming you have a database connection setup
import noteRouter from './routes/noteRoutes.js';
import taskRouter from './routes/taskRoutes.js'
import googleRouter from './routes/googleRouter.js';
import rateLimiter from './middleware/rateLimiter.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import passport from './middleware/passport.js'
dotenv.config()


const app = express();

const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}));


//passort.js stuff
app.use(passport.initialize());


app.use(rateLimiter); 


// Routes
app.use('/auth',googleRouter);
app.use('/auth',userRouter);
app.use('/notes',noteRouter);
app.use('/tasks',taskRouter);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});