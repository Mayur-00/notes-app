import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import NoteModel from "@/models/note.model";
import mongoose from "mongoose";

export async function GET() {
  await connectToDb();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

   
     //  ObjectId conversion
     const userId = new mongoose.Types.ObjectId(session?.user?._id);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID not found" },
        { status: 400 }
      );
    }

    const notes = await NoteModel.aggregate([
      {
        $match: { 
          author: userId
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    if(!notes){
      return NextResponse.json(
        {
          success:false,
          error:"an error occured while getting notes"
        },
        {
          status:500
        }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Notes fetched successfully",
        notes: notes
      },
      {
        status: 200
      }
    );

  } catch (error) {
    console.error("Error getting notes:", error);

    return NextResponse.json(
      { 
        success: false,
        error: "Internal server error" 
      },
      { status: 500 }
    );
  };
};