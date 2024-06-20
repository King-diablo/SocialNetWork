import express from "express";
import { login, signUp } from "../../controller/v1/authController";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

export default router;