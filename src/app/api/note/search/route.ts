import { connectToDb } from "@/lib/dbConnect";
import NoteModel from "@/models/note.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
    await connectToDb();

    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q'); // Changed from 'title' to 'q' for more flexibility
        const searchType = searchParams.get('type') || 'all'; // 'title', 'body', 'all'
        const limit = parseInt(searchParams.get('limit') || '50');
        const skip = parseInt(searchParams.get('skip') || '0');

        if (!query || query.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Search query is required"
                },
                {
                    status: 400
                }
            );
        }

        // Build search filter based on search type
        let searchFilter:any = {};
        
        switch (searchType) {
            case 'title':
                searchFilter = {
                    author: session?.user?._id,
                    title: { $regex: query, $options: 'i' } // Case-insensitive regex search
                };
                break;
            case 'body':
                searchFilter = {
                    author: session?.user?._id,
                    body: { $regex: query, $options: 'i' }
                };
                break;
            case 'all':
            default:
                searchFilter = {
                    author: session?.user?._id,
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { body: { $regex: query, $options: 'i' } }
                    ]
                };
                break;
        }

        // Add filters for active notes only (exclude archived if needed)
        searchFilter.status = 'active';

        // Execute search with pagination
        const notes = await NoteModel.find(searchFilter)
            .sort({ updatedAt: -1 }) // Sort by most recently updated
            .limit(limit)
            .skip(skip)
            .lean(); // Use lean() for better performance

        // Get total count for pagination
        const totalCount = await NoteModel.countDocuments(searchFilter);

        return NextResponse.json(
            {
                success: true,
                message: `Found ${notes.length} note${notes.length === 1 ? '' : 's'}`,
                notes: notes,
                pagination: {
                    total: totalCount,
                    limit: limit,
                    skip: skip,
                    hasMore: skip + limit < totalCount
                },
                searchQuery: query,
                searchType: searchType
            },
            {
                status: 200
            }
        );

    } catch (error: any) {
        console.log("An error occurred in search function", error);
        return NextResponse.json(
            {
                success: false,
                error: "An error occurred while searching notes",
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            {
                status: 500
            }
        );
    }
}