import { supabase } from "../config/database"
import { getErrorMessage } from "../util/errorHelper";

export const createUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                displayName: "king",
                phoneNumber: "07030646205"
            }
        }
    });

    const err = getErrorMessage(error);
    console.log(err.stack);

    if (error) return {
        message: err.message,
        from: err.errorName,
    }

    return data;
}

export const LoginUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    const err = getErrorMessage(error);
    console.log(err.stack);

    if (error) return {
        message: err.message,
        from: err.errorName,
    }

    return data;
}