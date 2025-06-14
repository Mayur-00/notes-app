import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import NoteModel from "@/models/note.model";
import { Types } from "mongoose";

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

    // Convert session.user.id to ObjectId if needed
    const userId =  session.user._id;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID not found" },
        { status: 400 }
      );
    }

    const notes = await NoteModel.aggregate([
      {
        $match: { 
          author: new Types.ObjectId(userId) // Ensure proper ObjectId conversion
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

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
  }
}