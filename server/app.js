import express from 'express';
export const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

//body-parser
app.use(express.json({limit:"50mb"}));
//cookie-parser
app.use(cookieParser());
//cors-origin
app.use(cors({
    origin:process.env.CORS_ORIGIN,
}))


//testing-api
app.get('/test',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"api endpoint is working"
    });
})

app.all('/*path',(req,res,next)=>{
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.statusCode = 404;
    next(error);
});