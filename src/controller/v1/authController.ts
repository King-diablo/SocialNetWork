import { Request, Response } from "express";
import { createUser, LoginUser } from "../../service/authService";
import { Encrypt } from "../../util/token";

export const signUp = async (req:Request, res:Response) => {
    const userData = req.body as createUserPayload;
    try {
        const response = await createUser(userData);

        if ("id" in response) {
            const token = await Encrypt(response);

            return res.status(200).json({ status: "success", message: "created account successfuly", response, token });
        } else {
            return res.status(400).json({ status: "error", response });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "an error has occured"});
    }

}

export const login = async (req: Request, res: Response) => {
    const userData = req.body as loginUserpayload;    

    try {
        const response = await LoginUser(userData);

        if ("email" in response) {
            const token = await Encrypt(response);
            return res.status(200).json({ status: "success", message: "logged in succesfuly", response, token });
        } else {
            return res.status(400).json({ status: "error", response });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "an error has occured" });
    }
}
