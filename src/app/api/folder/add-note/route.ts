import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import NoteModel from "@/models/note.model";


export async function POST (req:NextRequest) {
    await connectToDb();

    try {

        const session = await getServerSession(authOptions);

        if(!session || !session.user ||!session.user._id){
            return NextResponse.json(
                {
                    success:false,
                    error:"unAuthorized"
                },
                {
                    status:401
                }
            )
        };

        const {noteId, folderId}:{noteId:string, folderId:string} = await req.json();

        if(!noteId || !folderId ){
            return NextResponse.json(
                {
                    success:false,
                    error:"noteId or folderId not found",

                },
                {
                    status:403
                }
            );
        };
        const validnoteId = new mongoose.Types.ObjectId(noteId);
        const validFolderId = new mongoose.Types.ObjectId(folderId);

        // Ensure the note belongs to the authenticated user
        const note = await NoteModel.findOneAndUpdate(
            { _id: validnoteId, author: session.user._id },
            { $set: { folderId: validFolderId } },
            { new: true }
        );



        if (!note) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Note not found",
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message:"note added to folder successfully"
            },
            {
                status: 200
            }
        );

    } catch (error) {

        console.log("an error occured in add-note-to-folder function", error)
        return NextResponse.json(
            {
                success: false,
                error: (error as Error).message || "Internal Server Error",
            },
            {
                status: 500
            }
        );
    }
}