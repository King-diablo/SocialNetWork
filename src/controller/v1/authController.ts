import { Request, Response } from "express";
import { createUser, LoginUser } from "../../service/authService";
import { createPost, DeletePost, GetAllPost } from "../../service/userService";

export const signUp = async (req:Request, res:Response) => {
    const {email, password} = req.body;

    const response = await createUser(email, password);


    res.status(200).json({message: "success", response});
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;    

    const response = await LoginUser(email, password);

    res.status(200).json({ message: "success", response });
}
