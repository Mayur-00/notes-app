import mongoose, {Document} from "mongoose";

export interface IUser extends Document {
    username:string;
    email:string;
    password:string;
    notes:mongoose.Schema.Types.ObjectId[];
    groups:mongoose.Schema.Types.ObjectId[];
    createdAt:Date;
    updatedAt:Date;
};

export interface INote extends Document{
    author:mongoose.Schema.Types.ObjectId;
    title:string;
    body:string;
    createdAt?:Date;
    updatedAt?:Date;
    

};

export interface IGroup extends Document {
    author:mongoose.Schema.Types.ObjectId;
    groupName:string;
    groupAccentColor:string;
    notes:mongoose.Schema.Types.ObjectId[];
    createdAt:Date;
    updatedAt:Date;
};