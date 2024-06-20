import { AuthError } from "@supabase/supabase-js";

export const getErrorMessage = (error: any) => {
    let message = "unknow error has occured";
    let stack = "unknow error stack"
    let errorName = "unknow-server";

    if (!error) return { message, stack, errorName }

    if (typeof error === "string")
        message = error;

    if (error instanceof Error) {
        message = error.message;
        stack = error.stack as string;
        errorName = error.name
    }

    if (typeof error === "object") {
        message = error.message;
        stack = error?.stack as string;
        errorName = error?.name
    }

    if (error instanceof AuthError) {
        message = error.code ?? error.message;
        stack = error.stack as string;
        errorName = error.name
    }

    return {message, stack, errorName};
}