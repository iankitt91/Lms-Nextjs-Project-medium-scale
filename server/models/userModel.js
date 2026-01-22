import mongoose,{Document,Model,Schema} from "mongoose";
import bcrypt from 'bcrypt';


const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        validate:{
            validator:function(value){
                return emailRegexPattern.test(value);
            },
            message:"Plese enter valid email",
        },
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:[6,"Password must be of atleast 6 characters"],
        select:false,
    },
    avtar:{
        public_id:{
            type:String
        },
        url:{
            type:String,
        },
    },
    role:{
        type:String,
        default:"user",
    },
    isVerified:{
        type:String,
        default:false,
    },
    courses:[
        {
            courseId:{
                type:String
             }
        }
    ]
},{timestamps:true});

//hash password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const UserModel = mongoose.model("user",UserSchema);

export default UserModel;
