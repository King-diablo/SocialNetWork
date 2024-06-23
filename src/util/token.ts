
import jwt, { JwtPayload } from "jsonwebtoken"; 
import { EVN } from "./env";

export const Encrypt = async (payload: signedInUser) => {

    const token = jwt.sign(payload, EVN.SECRET as string, {expiresIn: "2h"});
    return token;
}

export const Decrypt = (token: string): string | JwtPayload | signedInUser => {
    const data = jwt.verify(token, EVN.SECRET as string);
    return data;
}