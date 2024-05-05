import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Mongo connect')})
    .catch((err) =>{
        console.log(err);
    })

const app =express();
app.use(express.json());

//cookie parser
app.use(cookieParser());


app.listen(3000,()=>{
    console.log(`Server started at 3000`);
})




app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

//post routes

app.use('/api/post',postRoutes)

//comment routes    
app.use('/api/comment',commentRoutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


