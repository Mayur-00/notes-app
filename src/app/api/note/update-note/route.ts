import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import NoteModel from "@/models/note.model";

export async function PUT(req: NextRequest,  { params }: { params: { id: string } }) {
  await connectToDb();
const noteId = params.id;
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {updatedTitle, updatedBody, noteId} = await req.json();
    // const noteId = params.id;

    if(!updatedTitle || !updatedBody ){
         return NextResponse.json(
        { success: false, error: "provide title and body" },
        { status: 404 }
      );

    }; 
    if(!noteId){
         return NextResponse.json(
        { success: false, error: "note id not found" },
        { status: 404 }
      );

    };
    
    const updatedNote = await NoteModel.findByIdAndUpdate(noteId, { title: updatedTitle, body: updatedBody }, { new: true });

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
  }
}
