import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import NoteModel from "@/models/note.model";
import mongoose from "mongoose";


export async function PUT(req: NextRequest,  { params }: { params: { id: string } }) {
  await connectToDb();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // const url = new URLSearchParams(req.url);
    // const noteId = url.get("noteid")

    const {updatedTitle, updatedBody, noteId} = await req.json();
    // const noteId = params.id;

    console.log(updatedBody, updatedTitle, noteId)

    if(!updatedTitle || !updatedBody ){

         return NextResponse.json(
        { success: false, error: "provide title and body" },
        { status: 403 }
      );

    }; 
    if(!noteId){
         return NextResponse.json(
        { success: false, error: "note id not found" },
        { status: 403 }
      );
      
    };
    const validNoteId = new mongoose.Types.ObjectId(noteId);
    
    const updatedNote = await NoteModel.findByIdAndUpdate(validNoteId, { title: updatedTitle, body: updatedBody }, { new: true });

    if (!updatedNote) {
      return NextResponse.json(
        {success:false,  error: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success:true,
        message: "Note updated successfully", 
        note: updatedNote 
      },
      { status: 200 }
    );
    


  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      {
        success:false,
        error:"internal server error",
      },
      {
        status:500
      }
    )
  }
}
