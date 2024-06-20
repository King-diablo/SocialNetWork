import { supabase } from "../config/database"
import { getErrorMessage } from "../util/errorHelper";


export const createPost = async () => {
    const { data, status, statusText, error } = await supabase
        .from('Post')
        .insert({ user_id: "9cac90f7-29ae-4392-be6c-4eaab8ce012e", userName: 'kingDiablo', content: "testPost 007" })

    if (error) {

        const err = getErrorMessage(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.errorName,
        }
    }

    return { message: "post created successfuly", status, postStatus: statusText }
}

export const GetAllPost = async () => {

    const { data, error } = await supabase
        .from('Post')
        .select()

    if (error) {

        const err = getErrorMessage(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.errorName,
        }
    }

    return data;
}


export const DeletePost = async () => {

    const { data, status, statusText, error } = await supabase
        .from('Post')
        .delete()
        .eq('id', 23)

    if (error) {

        const err = getErrorMessage(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.errorName,
        }
    }

    return { data, status, statusText };
}

export const createMedai = async (file: ArrayBuffer, name: string, fileType: string) => {
    const { data, error } = await supabase
        .storage
        .from('Post')
        .upload(`img/${name}`, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: fileType
        })

    if (error) {
        const err = getErrorMessage(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.errorName,
        }
    }

    return { message: "uploaded succesfuly", data }
}