import { AuthError } from "@supabase/supabase-js";

export const getErrorMessage = (error: any) => {
    let message = "unknow error has occured";
    let stack = "unknow error stack"
    let from = "unknow-server";

    let newError: App_Error = { message, stack, from };

    if (!error) return newError;

    if (typeof error === "string")
        message = error;

    if (error instanceof Error) {
        message = error.message;
        stack = error.stack as string;
        from = error.name
    }

    if (typeof error === "object") {
        message = error.message;
        stack = error?.stack as string;
        from = error?.name
    }

    if (error instanceof AuthError) {
        message = error.code ?? error.message;
        stack = error.stack as string;
        from = error.name
    }

    newError = { message, stack, from };

    return newError;
}