
import { connectToDb } from "@/lib/dbConnect";
import UserModel from "@/models/user.mode";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request:NextRequest){
    try {
        const {username, email, password} = await request.json();

        if(!username || !email || !password){
            return NextResponse.json(
                {error:"username, email and password is required!"},
                {status:400}
            );
        };


        await connectToDb();

    const existingUser = await UserModel.findOne({email:email});

    if(existingUser){
        return NextResponse.json(
            {
                error:"user already exist please login"
            },
            {
                status:500
            }
        );
    };

    const newUser = await UserModel.create(
        {
            username,
            email,
            password
        }
    );

   return NextResponse.json(
    {
        success:true,
        message:"user register succesfull",
        data:newUser
    }, 
    {
        status:201
    }
   );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error:"internal server error"
            },
            {
                status:500
            }
        )
        
    }
}