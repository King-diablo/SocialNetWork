import bcrypt from "bcrypt"
import { EVN } from "./env"

export const encryptPassword = (password: string) => {
    return bcrypt.hash(password, +EVN.SALT_ROUNDS!);
}

export const decryptPassword = (hash: string, password: string) => {
    return bcrypt.compare(password, hash);
}