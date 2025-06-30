import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import FolderModel from "@/models/folder.model";

export async function POST(req: NextRequest) {
  await connectToDb();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    

    const {folderName, accentColor} = await req.json();
    if (!folderName|| !accentColor) {
      return NextResponse.json(
        {
          success: false,
          error: "folder name and accent colour is required",
        },
        {
          status: 403,
        }
      );
    };


    const userId = new mongoose.Types.ObjectId(session?.user?._id);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "userid validation failed",
        },
        {
          status: 500,
        }
      );
    };

    const existingFolder = await FolderModel.findOne({author:userId,FolderName:folderName });

    if(existingFolder){
          return NextResponse.json(
        {
          success: false,
          error: "folder already exists ",
        },
        {
          status: 403,
        }
      );
    };

    const newFolder = await FolderModel.create(
        {
            author:userId,
            FolderName:folderName,
            accentColor:accentColor
        }
    );

    if(!newFolder){
         return NextResponse.json(
        {
          success: false,
          error: "an error occured while creating folder",
        },
        {
          status: 500,
        }
      );
    };

     return NextResponse.json(
        {
          success: true,
          error: "new folder created successfully",
        },
        {
          status: 201,
        }
      );

  } catch (error: any) {
    console.log("an error occured in create-folder function", error);
     return NextResponse.json(
        {
          success: false,
          error: "an error occured",
        },
        {
            
          status: 500,
        }
      );
  }
}
