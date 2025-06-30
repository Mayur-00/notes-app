import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import NoteModel from "@/models/note.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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

    const archievedNotes = await NoteModel.aggregate([
    {
        $match: {
          author: userId,
          isArchieved:true
        }
    },
    {
        $sort: { 
        createdAt: -1 
        }
    }  
    ]);

    if(!archievedNotes){
        return NextResponse.json(
        {
          success:false,
          error:"an error occured while getting archieved notes"
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
            archievedNotes:archievedNotes
        },
        {
            status:200
        }
    );

  } catch (error: any) {
    console.log("error in get-archieved-notes function", error);

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
