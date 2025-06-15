import { INote } from "@/types/model.types";
import mongoose, { Schema } from "mongoose";


const noteSchema: Schema<INote> = new Schema(
{
    author:{
        type:Schema.Types.ObjectId,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    folderId:{
        type:Schema.Types.ObjectId,
        ref:"Folder"
    },
    status: { 
    type: String, 
    enum: ['active', 'archived', 'deleted'], 
    default: 'active',
    index: true 
  },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }

},
{
    timestamps:true
}
);

noteSchema.index({ author: 1, createdAt: -1 });
noteSchema.index({ author: 1, status: 1, updatedAt: -1 });
noteSchema.index({ author: 1, folderId: 1 });
noteSchema.index({ title: 'text', body: 'text' })

const NoteModel =
  mongoose.models.Note<INote> || mongoose.model<INote>("Note", noteSchema);
export default NoteModel;
