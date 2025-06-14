"use client"

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [note, setNote] = useState({
        id: "",
        title: "",
        body: "" // Changed from 'body' to 'content' to match your API
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();

    const fetchNote = async (noteId: string) => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await axios.get(`/api/note/${noteId}`);
            
            if (res.data.success) {
                setNote(res.data.note);
            } else {
                setError("Failed to fetch note");
            }
            
            console.log(res.data);
            console.log(res.data.note);
            
        } catch (error) {
            console.error("Error fetching note:", error);
            setError("Error loading note");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const id = params.id as string;
        
        if (id) {
            fetchNote(id);
        }
    }, [params.id]); // Only depend on params.id, not the fetchNote function

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading note...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {note.title}
                    </h1>
                </div>
                    <div className="text-gray-700 bg-white rounded-lg shadow-sm border border-gray-200 p-2 mt-5 min-h-300 leading-relaxed whitespace-pre-wrap">
                       <h1> {note.body}</h1>
                    </div>
            </div>
        </div>
    );
}

export default Page;