"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityModel = void 0;
var mongoose_1 = require("mongoose");
var CommunitySchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            trim: true,
            required: [true, "Missing member ID"],
        },
    ],
    events: [
        {
            ref: "events",
            type: mongoose_1.Schema.Types.ObjectId,
            trim: true,
            required: [true, "Missing event ID"],
        },
    ],
    join_request: [
        {
            ref: "users",
            type: mongoose_1.Schema.Types.ObjectId,
            trim: true,
            required: [true, "Missing request member ID"],
        },
    ],
}, {
    versionKey: false,
});
exports.CommunityModel = (0, mongoose_1.model)("communities", // name of document collection
CommunitySchema);
