import { connectToDb } from "@/lib/dbConnect"
import NoteModel from "@/models/note.model";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST (req:NextRequest) {

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
        
            const userid = session.user._id;

        const {noteId} = await req.json();

        if(!noteId){
            return NextResponse.json(
                {
                    success:false,
                    error:"provide note id"
                },
                {
                    status:403
                }
            )
        };

        
        const remove = await NoteModel.findOneAndDelete({_id:noteId, author:userid});

        if(!remove){
            return NextResponse.json(
                {
                    success:false,
                    error:"an error occured while removing note"
                },
                {
                    status:500
                }
            )
        }

        console.log(remove);

        return NextResponse.json(
            {
                success:true,
                message:"note removed successfully"
            },
            {
                status:200
            }
        );
        
        
    } catch (error:any) {
        console.log("an error occured in delete-note function", error);
        
        return NextResponse.json(
            {
                success:false,
                error:"internal server error"
            },
            {
                status:500
            }
        );
        
    }


}