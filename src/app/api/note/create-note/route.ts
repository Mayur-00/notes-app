import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/user.mode";
import NoteModel from "@/models/note.model";
import { ApiReturnObject } from "@/types/api.type";
import next from "next";
// import { title, body } from "process";

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

    const userid = session.user._id
    const { title, body } = await req.json();
    console.log(title, body)

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if(!trimmedBody ||!trimmedTitle){
       return NextResponse.json(
        {
          success: false,
          error: "Title and Body are required",
        },
        {
          status: 400,
        }
      );
    }

   
   const newNote = await NoteModel.create({
      author: userid,
      title: trimmedTitle,
      body: trimmedBody
    });

    return NextResponse.json({
      success:true,
      message:"Note Created Successfully",
      note:newNote
    },
  {
    status:201
  });

    
  } catch (error:any) {
   console.error("Error creating note:", error);
  

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Duplicate entry" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
