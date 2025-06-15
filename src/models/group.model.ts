import { IFolder } from "@/types/model.types";
import mongoose, { Schema } from "mongoose";


const folderSchema: Schema<IFolder> = new Schema(
    {
        author:{
            type:Schema.Types.ObjectId,
            required:true
        },
        FolderName:{
            type:String,
            required:true,

        },
        accentColor:{
            type:String
        },
        parent:{
            type:Schema.Types.ObjectId,
            ref:"Folder"
        }
    },

{
    timestamps:true
}
);



const FolderModel =
  mongoose.models.Folder<IFolder> || mongoose.model<IFolder>("Folder", folderSchema);
export default FolderModel;
