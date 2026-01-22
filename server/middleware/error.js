import ErrorHandler from "../utils/errorhandler.js";

export const errorMiddleware = (err,req,res,next) =>{
    err.status = err.status || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongodb id
    if(err.name==='CastError'){
        const message = `Resources Not Found ${err.path}`;
        err = new ErrorHandler(message,400); 
    }

    //duplicate key error
    if(err.code===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    //wrong jwt error
    if(err.name==='JsonWebTokenError'){
        const message = `Json web token is invalid, Try again`;
        err = new ErrorHandler(message,400);
    }

    //jwt expired error
    if(err.name==='TokenExpiredError'){
        const message = `Json web token is Expired, Try again`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.status).json({
        success:false,
        message:err.message
    });
}