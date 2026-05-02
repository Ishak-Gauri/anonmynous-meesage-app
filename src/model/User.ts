import mongoose,{Schema,Document} from "mongoose";

//Defining Interface for Message
export interface Message extends Document
{
    content:string;
    createdAt:Date;
    updatedAt:Date;
}
//Defining Schema for Message
const MessageSchema:Schema<Message> = new Schema
(
    {
        content:
        {
            type:String,
            required:[true,"Enter your content"],
        },
    },

    {timestamps:true},
)

//Defining Interface for User
export interface User extends Document
{
    username:string;
    email:string;
    password:string;
    verifycode:string;
    verifycodeExpiry:Date;
    isVerified:boolean;
    isAllowedtoMessage:boolean;
    messages:Message[];
}

//Defining Schema for User
const UserSchema:Schema<User>= new Schema
(
    {
        username:
        {
            type:String,
            required:[true,"username is required"],
            trim:true,
            unique:true,
        },

        email:
        {
            type:String,
            required:[true,"email is required"],
            unique:true,
            match:[/^\S+@\S+\.\S+$/,"Enter a valid email address"],
            trim:true,
            lowercase:true,
        },
       
        password:
        {
            type:String,
            required:[true,"Password is required"],
        },

        verifycode:
        {
           type:String,
           required:[true,"verification code is required"],
        },
        
        verifycodeExpiry:
        {
            type:Date,
            required:[true,"verify code expiry Date is required"],
        },

        isVerified:
        {
            type:Boolean,
            default:false,
        },

        isAllowedtoMessage:
        {
            type:Boolean,
            required:[true,"user msut be allowed to message"],
            default:true,
        },

       messages:[MessageSchema],
    }
);

const UserModel= mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",UserSchema);
export default UserModel;