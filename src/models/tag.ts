import { Document, model, Schema } from "mongoose";

export interface ITag {
  name: String;
  hebrew: String;
  color: string;
}

export interface ITagModel extends Document, ITag {}

const TagSchema: Schema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: [true, "Missing tag name"],
      minLength: [1, "Tag name too short"],
      maxLength: [20, "Tag name too long"],
    },
    hebrew: {
      type: String,
      required: [true, "Missing tag name"],
      minLength: [1, "Tag name too short"],
      maxLength: [20, "Tag name too long"],
    },
    color: {
      type: String,
      default: "#ccc", 
    },
  },
  {
    versionKey: false,
  }
);

export const TagModel = model<ITagModel>(
  "tags", // name of document collection
  TagSchema
);
