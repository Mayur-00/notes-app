import mongoose, {Document} from "mongoose";

export interface IUser extends Document {
    username:string;
    email:string;
    password:string;
    isVerified:boolean;
    verificationCode:string;
    verifyCodeExpiry:Date;
    forgotPasswordCode:string;
    forgotPasswordCodeExpiry:Date;
    createdAt:Date;
    updatedAt:Date;
};

export interface INote extends Document{
    author:mongoose.Schema.Types.ObjectId;
    title:string;
    body:string;
    folderId:mongoose.Schema.Types.ObjectId;
    status:string;
    createdAt?:Date;
    updatedAt?:Date;
    

};

export interface IFolder extends Document {
    author:mongoose.Schema.Types.ObjectId;
    FolderName:string;
    accentColor:string;
    parent:mongoose.Schema.Types.ObjectId
    createdAt:Date;
    updatedAt:Date;
};