import express from "express";
import { login, signUp, validateUser } from "../../controller/v1/authController";
const router = express.Router();


router.post("/validate", validateUser);

router.post("/signup", signUp);

router.post("/login", login);

export default router;