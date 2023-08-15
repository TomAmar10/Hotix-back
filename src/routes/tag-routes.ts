import express from "express";
import controller from "../controller/tag-controller";

const router = express.Router();

router.get("/all", controller.getAllTags);
router.post("/single/add", controller.addTag);

export default router;
