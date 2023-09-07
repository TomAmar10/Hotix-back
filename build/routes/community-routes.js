"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var community_controller_1 = __importDefault(require("../controller/community-controller"));
var router = express_1.default.Router();
router.get("/single/:communityId", community_controller_1.default.getCommunity);
router.get("/all", community_controller_1.default.getAllCommunities);
router.post("/single/add", community_controller_1.default.addCommunity);
router.patch("/single/update/:communityId", community_controller_1.default.updateCommunity);
router.patch("/single/join-request/:communityId", community_controller_1.default.requestToJoin);
router.delete("/single/delete/:communityId", community_controller_1.default.deleteCommunity);
exports.default = router;
