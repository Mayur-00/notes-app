import { connectToDb } from "@/lib/dbConnect";
import UserModel from "@/models/user.mode";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest){
    await connectToDb();

    try {
        const {username, token} = await req.json();

        if(!username || !token){
            return NextResponse.json({
                success:false,
                message:"please provide usename and token"
            },
        {
            status:400
        });

        };

        const user = await UserModel.findOne({username:username});

        if(!user){
            return NextResponse.json({
                success:false,
                message:"user not found",

            },
        {
            status:500
        });
        };

            // Check if user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        {
          success: true,
          message: "User is already verified",
        },
        {
          status: 200,
        }
      );
    }

    // Check if verification code exists
    if (!user.verificationCode) {
      return NextResponse.json(
        {
          success: false,
          message: "No verification code found for this user",
        },
        {
          status: 400,
        }
      );
    }

        const isTokenValid = user.verificationCode === token;
        const isTokenExpired = new Date(user.verifyCodeExpiry) < new Date();

    if (isTokenValid && !isTokenExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "user verified successfully",
        },
        {
          status: 200,
        }
      );
    }else if (isTokenExpired){
        
        return Response.json(
            {
                success:false,
                message:"verification code expired"
            },
            {
                status:400
            }
        );
    }else{
        
        return Response.json(
            {
                success:false,
                message:"Invalid verification code"
            },
            {
                status:400
            }
        );
    };


        
    } catch (error:any) {
        console.log("An error occured while verifying code", error);

    return Response.json(
      {
        success: false,
        message: "Cannot verify User",
      },
      {
        status: 500,
      }
    );
    }
}