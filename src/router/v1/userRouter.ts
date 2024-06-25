import express from "express";
import { createPost, deleteAccount, deletePost, getAllPosts, getPostById, updateProfile } from "../../controller/v1/userController";
import { DecryptToken } from "../../middleware/tokenHandler";
import multer from "multer";

const media = multer({ dest: "./uploads" });


const router = express.Router();

router.get("/post", getAllPosts);

router.get("/post/:id", DecryptToken, getPostById);

router.post("/update", DecryptToken, updateProfile);

router.post("/post", DecryptToken, media.single("media"), createPost);

router.delete("/post/:id", DecryptToken, deletePost);

router.delete("/account/:id", DecryptToken, deleteAccount);

export default router