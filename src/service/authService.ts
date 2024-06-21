import { User } from "@supabase/supabase-js";
import { supabase } from "../config/database"
import { getErrorMessage } from "../util/errorHelper";


export const createUser = async (userData: createUserPayload): Promise<App_Error | signedInUser> => {

    const {email, password, matric_Number, userName, phoneNumber, department, faculaty, level} = userData;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                matric_Number,
                displayName: userName,
                phoneNumber,
                department,
                faculaty,
                level
            }
        }
    });

    const signUpError = getError(error);

    if (signUpError) return signUpError

    const User: signedInUser = {
        id: data?.user?.id as string,
        email,
        userName,
        phoneNumber,
        department,
        faculaty,
        level,
        matric_Number
    }

    return User;
}

export const LoginUser = async (userData: loginUserpayload) => {
    const {email, password} = userData;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    const logInError = getError(error);

    if (logInError) return logInError;

    const User: signedInUser = {
        id: data?.user?.id as string,
        email,
        userName: getMetadata(data.user as User, "displayName"),
        phoneNumber: getMetadata(data.user as User, "phoneNumber"),
        department: getMetadata(data.user as User, "department"),
        faculaty: getMetadata(data.user as User, "faculaty"),
        level: getMetadata(data.user as User, "level"),
        matric_Number: getMetadata(data.user as User, "matric_Number"),
    }

    return User;
}


const getError = (error: any):App_Error | null => {
    console.log(error);
    const err = getErrorMessage(error);
    console.log("server_Issuse: " +err.stack);

    const appError: App_Error = {
        message: err.message,
        from: err.from,
    }
    if (error) return appError;

    return null;
}

const getMetadata = (obj: User, key: string) => {
    return obj.user_metadata[key];
}