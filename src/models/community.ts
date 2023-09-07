import { Document, model, Schema } from "mongoose";

export interface ICommunity {
  name: string;
  description: string;
  time_create: Date;
  image: Buffer | string;
  members: Schema.Types.ObjectId[];
  events: Schema.Types.ObjectId[];
  join_request: Schema.Types.ObjectId[];
}

export interface ICommunityModel extends Document, ICommunity {}

const CommunitySchema: Schema = new Schema<ICommunity>(
  {
    name: {
      type: String,
      required: [true, "Missing community name"],
      minLength: [2, "Community name too short"],
      maxLength: [40, "Community name too long"],
    },
    description: {
      type: String,
      required: [true, "Missing description"],
      minLength: [2, "Description too short"],
      maxLength: [70, "Description too long"],
    },
    time_create: {
      type: Date,
      required: [true, "Missing creation time"],
      default: new Date(),
    },
    image: {
      type: String,
    },
    members: [
      {
        ref: "users",
        type: Schema.Types.ObjectId,
        trim: true,
        required: [true, "Missing member ID"],
      },
    ],
    events: [
      {
        ref: "events",
        type: Schema.Types.ObjectId,
        trim: true,
        required: [true, "Missing event ID"],
      },
    ],
    join_request: [
      {
        ref: "users",
        type: Schema.Types.ObjectId,
        trim: true,
        required: [true, "Missing request member ID"],
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const CommunityModel = model<ICommunityModel>(
  "communities", // name of document collection
  CommunitySchema
);
