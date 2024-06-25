import { Request, Response } from "express";
import { createUser, LoginUser } from "../../service/authService";
import { Encrypt } from "../../util/token";
import { getErrorMessage } from "../../util/errorHelper";

export const signUp = async (req:Request, res:Response) => {
    // recive a token that has the remeaning data for the user
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

export const validateUser = async (req:Request, res:Response) => {
    const {matricNumber, password} = req.body;

    try {
        const payload:RequestInit = {
            
        }
        const response = await fetch("", payload);
        res.json(response);
        //create a token and send it to the user
    } catch (err) {
        const error = getErrorMessage(err);
        console.log(error.stack);
        res.status(500).json(error);
    }
}
