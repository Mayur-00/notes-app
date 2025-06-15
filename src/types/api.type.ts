import mongoose from "mongoose";

export interface ApiReturnObject {
    success?:boolean,
    error?:string,
    message?:string,
    data?:any;
    status?:number;
};

export interface SendEmailParamObj {
    verifyCode:string;
    userId:string
    emailType:string;
    emailId:string;
    username:string

}