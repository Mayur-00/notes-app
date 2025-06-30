import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import NoteModel from "@/models/note.model";

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


    const userId = new mongoose.Types.ObjectId(session?.user?._id);
    const verifiedNoteId = new mongoose.Types.ObjectId(noteId);
    

    if (!userId || !verifiedNoteId) {
      return NextResponse.json(
        {
          success: false,
          error: "validation failed",
        },
        {
          status: 500,
        }
      );
    };

    const note = await NoteModel.findById(verifiedNoteId);

    if(note.author === userId){
        if(note.isArchieved){

            note.isArchieved = false;
            const savedNote =   await note.save();
            
            return NextResponse.json(
                {
                    success:true,
                    message:"note successfully removed from archieve folder"
                },
                {
                    status:201
                }
            );

        }
    }else{
        
        return NextResponse.json(
            {
                success:false,
                error:"access denied"
            },
            {
                status:403
            }
        );
    };




  } catch (error: any) {
    console.log("an error occured in remote-note function", error);

    return NextResponse.json(
        {
            success:false,
            error:"an error occured "
        },
        {
            status:500
        }
    );
  };
};
