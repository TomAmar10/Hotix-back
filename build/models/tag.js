"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = void 0;
var mongoose_1 = require("mongoose");
var TagSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
});
exports.TagModel = (0, mongoose_1.model)("tags", // name of document collection
TagSchema);
