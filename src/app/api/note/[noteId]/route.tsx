import { connectToDb } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/models/note.model";

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

    const note = await NoteModel.findById(noteId);

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
    // if (note.userId !== session.user.id) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Access denied"
    //     },
    //     {
    //       status: 403
    //     }
    //   );
    // }

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