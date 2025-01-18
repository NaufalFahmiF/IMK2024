import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections, getPublicProfile, updateProfile, searchProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/search", protectRoute, searchProfile);
router.get("/:username", protectRoute, getPublicProfile);

router.put("/profile", protectRoute, updateProfile);

export default router;
