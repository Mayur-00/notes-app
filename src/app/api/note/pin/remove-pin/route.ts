import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import NoteModel from "@/models/note.model";

export async function PUT(req: NextRequest) {
  await connectToDb();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }


    const noteid = new URLSearchParams(req.url).get('note');

    if(!noteid){
        return NextResponse.json(
            {
                success:false,
                error:"Provide noteid "
            },
            {
                status:403
            }
        )
    };

    const validNoteId = new mongoose.Types.ObjectId(noteid);
     const userId = new mongoose.Types.ObjectId(session?.user?._id);
    

    const updatedNote = await NoteModel.findOneAndUpdate({_id:validNoteId, author:userId }, {isPinned:false}, {new:true});

    if(!updatedNote){
        return NextResponse.json(
            {
                success:false,
                error:"failed to unPin note"
            },
            {
                status:500
            }
        );
    };


    return NextResponse.json(
        {
            success:true,
            message:"note unPinned successfully"
        },
        {
            status:200
        }
    );

  } catch (error: any) {
    console.log("an error occured in remove-pin function", error);
    return NextResponse.json(
        {
            success:false,
            message:error?error.message :"internal server error"
        },
        {
            status:500
        }
    )
  }
}
