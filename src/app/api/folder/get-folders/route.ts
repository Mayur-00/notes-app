import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import FolderModel from "@/models/folder.model";

export async function GET(req: NextRequest) {
  await connectToDb();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

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
    }

    const allFolders = await FolderModel.aggregate([
    {
        $match: {
          author: userId,
     
        }
    },
    {
        $sort: { 
        createdAt: -1 
        }
    }  
    ]);

    if(!allFolders){
        return NextResponse.json(
        {
          success:false,
          error:"an error occured while getting folders"
        },
        {
          status:500
        }
      );
    };

    return NextResponse.json(
        {
            success:true,
            message:"ok",
            folders:allFolders
        },
        {
            status:200
        }
    );

  } catch (error: any) {
    console.log("error in get-folders function", error);

    return NextResponse.json(
        {
            success:false,
            error:"an error occurred",
        },
        {
            status:500
        }
    )
  }
}
