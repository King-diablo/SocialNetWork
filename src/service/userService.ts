import { supabase } from "../config/database"
import { getErrorMessage } from "../util/errorHelper";

interface createPostPayload {
    userId: string,
    userName: string,
    content: string,
    isMedia: boolean,
    mediaPath?: string,
}

export const CreatePost = async (postData: createPostPayload) => {
    const { data, status, statusText, error } = await supabase
        .from('Post')
        .insert({
            user_id: postData.userId,
            userName: postData.userName,
            content: postData.content,
            isMedia: postData.isMedia,
            mediaPath: postData.mediaPath
        })

    if (error) {
        const err = getErrorMessage(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
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
            from: err.from,
        }
    }

    return data;
}

export const GetPostById = async (id: number) => {

    const { data, error } = await supabase
        .from('Post')
        .select()
        .eq("id", id);

    if (error) {

        const err = getErrorMessage(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        }
    }

    return data;
}

export const DeletePost = async (id: number) => {

    const { data, status, statusText, error } = await supabase
        .from('Post')
        .delete()
        .eq('id', id)

    if (error) {
        const err = getErrorMessage(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        }
    }

    console.log(data, status, statusText, error);


    return { data, status, statusText };
}

export const CreateMedia_Image = async (file: ArrayBuffer, name: string, fileType: string): Promise<mediaResult | App_Error> => {
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
        return {
            message: err.message,
            from: err.from,
        }
    }

    return { message: "uploaded succesfuly", data }
}

export const CreateMedia_Video = async (file: ArrayBuffer, name: string, fileType: string): Promise<mediaResult | App_Error> => {
    const { data, error } = await supabase
        .storage
        .from('Post')
        .upload(`vid/${name}`, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: fileType
        })

    if (error) {
        const err = getErrorMessage(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        }
    }

    return { message: "uploaded succesfuly", data }
}

export const DeleteAccount = async (id: number) => {
    const { data, status, statusText, error } = await supabase
        .from('Users')
        .delete()
        .eq('id', id)

    if (error) {
        const err = getErrorMessage(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        }
    }

    console.log(data, status, statusText, error);


    return { data, status, statusText };
}

export const GetMediaLink = async (path: string): Promise<string> => {

    const { data } = supabase
        .storage
        .from('Post')
        .getPublicUrl(path)

    return data.publicUrl
}