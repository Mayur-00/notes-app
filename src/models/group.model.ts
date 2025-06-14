import { IGroup, INote } from "@/types/model.types";
import mongoose, { Schema } from "mongoose";


const groupSchema: Schema<IGroup> = new Schema(
    {
        author:{
            type:Schema.Types.ObjectId,
            required:true
        },
        groupName:{
            type:String,
            required:true,

        },
        groupAccentColor:{
            type:String
        },
        notes:[
            {
                type:Schema.Types.ObjectId
            }
        ]

    },

{
    timestamps:true
}
);



const GroupModel =
  mongoose.models.Group<IGroup> || mongoose.model<IGroup>("Group", groupSchema);
export default GroupModel;
