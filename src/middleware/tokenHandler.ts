import { NextFunction, Request, Response } from "express";
import { Decrypt } from "../util/token";
import { getErrorMessage } from "../util/errorHelper";

interface customRequest extends Request {
    user: signedInUser
}

export const DecryptToken = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return res.status(403).json({ message: 'token required', status: 'error' });
    try {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        const data = Decrypt(token);

        if (typeof (data) === "object" && "id" in data) {
            (req as customRequest).user = data as signedInUser;
            return next();
        } else {
            res.status(400).json({ status: "error", message: "an error occured while decoding token" });
        }
    } catch (err) {
        const error = getErrorMessage(err);
        console.error(error);
        res.status(500).json({ error: error.message, status: "error" });
    }
}
