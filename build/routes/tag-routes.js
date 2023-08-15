"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var tag_controller_1 = __importDefault(require("../controller/tag-controller"));
var router = express_1.default.Router();
router.get("/all", tag_controller_1.default.getAllTags);
router.post("/single/add", tag_controller_1.default.addTag);
exports.default = router;
