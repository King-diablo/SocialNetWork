import express from "express";
import { createPost, deleteAccount, deletePost, starPost, updateProfile } from "../../controller/v1/userController";

const router = express.Router();


router.post("/update", updateProfile)
.post("/createPost", createPost)
.post("/startPost/:id", starPost);

router.delete("/delete", deleteAccount)
.delete("/post/:id", deletePost);

export default router;