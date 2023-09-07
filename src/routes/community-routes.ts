import express from "express";
import controller from "../controller/community-controller";

const router = express.Router();

router.get("/single/:communityId", controller.getCommunity);
router.get("/all", controller.getAllCommunities);
router.post("/single/add", controller.addCommunity);
router.patch("/single/update/:communityId", controller.updateCommunity);
router.patch("/single/join-request/:communityId", controller.requestToJoin);
router.delete("/single/delete/:communityId", controller.deleteCommunity);

export default router;
