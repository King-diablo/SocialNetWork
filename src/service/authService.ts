import { User } from "@supabase/supabase-js";
import { supabase } from "../config/database"
import { getErrorMessage } from "../util/errorHelper";
import { decryptPassword, encryptPassword } from "../util/passwordGenerator";


export const createUser = async (userData: createUserPayload): Promise<App_Error | signedInUser> => {

    const { email, password, matricNumber, userName, phoneNumber, department, faculaty, level } = userData;

    const response = await LoginUser({ email, password });

    let customError = null;

    if ("email" in response) {
        customError = getError("user already exist");
    }

    const hashedPassword = await encryptPassword(password);

    let creatingUserData = null;
    let creatingUserError = null

    if (!customError) {
        const { data, error } = await supabase
            .from("Users")
            .insert({ email, password: hashedPassword, userName, phoneNumber, department, faculaty, level, matricNumber})
            .select()
            .limit(1)
            .single()

            creatingUserData = data;
            creatingUserError = error;
    }


    const signUpError = getError(creatingUserError) ?? customError;

    if (signUpError) return signUpError

    const id = creatingUserData.id;
    const role = creatingUserData.role;

    const User: signedInUser = {
        id: id,
        email,
        userName,
        phoneNumber,
        department,
        faculaty,
        level,
        matricNumber,
        role,
    }

    return User;
}

export const LoginUser = async (userData: loginUserpayload) => {
    const { email, password } = userData;



    const { data, error } = await supabase
        .from("Users")
        .select()
        .eq("email", email)
        .limit(1)
        .single()

    let isUser = null;

    if (data)
        isUser = await decryptPassword(data.password, password);

    const logInError = getError(error) ?? getError(isUser ? null : "password is incorrect");

    if (logInError) return logInError;

    const User: signedInUser = {
        id: data.id,
        email,
        userName: data.userName,
        phoneNumber: data.phoneNumber,
        department: data.department,
        faculaty: data.faculaty,
        level: data.level,
        matricNumber: data.matricNumber,
        role: data.role
    }

    return User;
}


const getError = (error: any): App_Error | null => {
    console.log(error);
    const err = getErrorMessage(error);
    console.log("server_Issuse: " + err.stack);

    const appError: App_Error = {
        message: err.message,
        from: err.from,
    }
    if (error) return appError;

    return null;
}