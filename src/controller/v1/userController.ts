import { Request, Response } from "express";
import { CreateMedia_Image, CreateMedia_Video, CreatePost, DeletePost, GetAllPost, GetPostById } from "../../service/userService";
import { getErrorMessage } from "../../util/errorHelper";
import fs from "fs/promises";

interface customRequest extends Request {
    user: signedInUser
}

const handleError = (err: any, res: Response) => {
    const error = getErrorMessage(err);
    console.log(error);
    res.status(500).json({ errorMessage: error.message, name: error.from, status: "error" });
}

export const getAllPosts = async (req: Request, res: Response) => {

    try {
        const posts = await GetAllPost();
        res.status(200).json(posts);
    } catch (error) {
        handleError(error, res);
    }
}

export const getPostById = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const post = await GetPostById(id);
        if (!post) return res.status(200).json({ message: "no post found with the specified id", post: {} });
        res.status(200).json(post);
    } catch (error) {
        handleError(error, res);
    }
}

export const updateProfile = (req: Request, res: Response) => {

}

export const createPost = async (req: Request | customRequest, res: Response) => {
    console.log(req.body);

    const { content, isMedia } = req.body;

    if ("user" in req) {
        const user = req.user;

        let response = null;
        if (isMedia) {
            if (!content) return res.status(404).json({ status: "error", messgae: "content is required" });

            response = await CreatePost({ content, userId: user.id, isMedia, userName: user.userName });
            res.status(201).json(response);
        }
        else { }
        // create media post
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;

        if (!id) return res.status(404).json({ status: "error", message: "invalid id" });

        await DeletePost(id);

        res.status(200).json({ status: "success", messgae: "post was deleted succesfuly" });
    } catch (error) {
        handleError(error, res);
    }
}

export const deleteAccount = (req: Request, res: Response) => {

}

export const uploadMedia = async (req: Request, res: Response) => {

    const user = (req as customRequest).user;

    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const videoMimeTypes = ['video/mp4', 'video/x-matroska', 'video/avi', 'video/webm'];

    const isImage = (mimeType: string) => imageMimeTypes.includes(mimeType);

    const isVideo = (mimeType: string) => videoMimeTypes.includes(mimeType);

    const mimeType = req.file?.mimetype;
    
    const path = req.file?.path!;

    const data = await fs.readFile(path);

    let result = null

    const fileName = `${user?.userName}_${Date.now()}`

    if (mimeType) {
        if (isImage(mimeType)) {
            console.log(`${req.file?.filename} is an image with MIME type: ${mimeType}`);
           result =  await CreateMedia_Image(data.buffer, fileName, mimeType);
        } else if (isVideo(mimeType)) {
            console.log(`${req.file?.filename} is a video with MIME type: ${mimeType}`);
            result = await CreateMedia_Video(data.buffer, fileName, mimeType);
        } else {
            console.log(`${req.file?.filename} is neither an image nor a video.`);
            result = "Unable to post content"
        }
    }

    // create a new data in Post database and add the mediaUrl to it

    fs.rm(path);
    res.json({status: "success", result});
}