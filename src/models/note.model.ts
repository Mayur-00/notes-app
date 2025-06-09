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
    }

},
{
    timestamps:true
}
);



const NoteModel =
  mongoose.models.Note<INote> || mongoose.model<INote>("Note", noteSchema);
export default NoteModel;
