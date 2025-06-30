import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/models/note.model";
import { URLSearchParams } from "url";
import mongoose from "mongoose";


export async function GET(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  await connectToDb();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Await params as required in newer Next.js versions
    const noteId = (await params).noteId;
    // const searchparams =  new URLSearchParams(req.url);
    // searchparams.get('token')

    if (!noteId) {
      console.log("noteId not found");
      return NextResponse.json(
        {
          success: false,
          message: "NoteId Not Found"
        },
        {
          status: 400 // Changed from 404 to 400 (Bad Request)
        }
      );
    }

     const verifiedNoteId = new mongoose.Types.ObjectId(noteId);
    
        const userid = new mongoose.Types.ObjectId(session?.user?._id);
    

    const note = await NoteModel.findOne({_id:verifiedNoteId, author:userid});

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          message: "Note not found"
        },
        {
          status: 404
        }
      );
    }

    // Optional: Check if the note belongs to the current user

    // if (note.author !== userid ){
    //   console.log(note.author);
    //   console.log(USERID);
      
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Access denied"
    //     },
    //     {
    //       status: 403
    //     }
    //   );
    // };

    return NextResponse.json(
      {
        success: true,
        message: "Note fetched successfully",
        note: note
      },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error("Error getting note:", error);

    return NextResponse.json(
      { 
        success: false,
        error: "Internal server error" 
      },
      { status: 500 }
    );
  }
}