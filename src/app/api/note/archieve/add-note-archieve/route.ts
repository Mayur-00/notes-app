import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import NoteModel from "@/models/note.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  await connectToDb();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const { noteId}:{noteId:string} = await req.json();

    if (!noteId) {
      return NextResponse.json(
        {
          success: false,
          error: "note id not found",
        },
        {
          status: 500,
        }
      );
    }

    const verifiedNoteId = new mongoose.Types.ObjectId(noteId);

    const userid = new mongoose.Types.ObjectId(session?.user?._id);

    if (!userid) {
      return NextResponse.json(
        {
          success: false,
          error: "an error occurred",
        },
        {
          status: 500,
        }
      );
    }

    const note = await NoteModel.findById(verifiedNoteId);

    if (note.author === userid) {
        
        note.isArchieved = true;
        const savedNote = await note.save();

         return NextResponse.json(
        {
            success:true,
            message:"note moved to archieve folder successfully"

        },
        {
            status:201
        }
    );

    };
    
    
    return NextResponse.json(
      {
        success: false,
        message: "Access denied",
      },
      {
        status: 403,
      }
    );

   

  } catch (error: any) {
    console.log("an error occured in add-note-archieve function", error);

    return NextResponse.json(
        {
            success:false,
            error:"an error occured",

        },
        {
            status:500
        }
    )
  }
}
