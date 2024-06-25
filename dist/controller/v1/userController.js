"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.deletePost = exports.createPost = exports.updateProfile = exports.getPostById = exports.getAllPosts = void 0;
const userService_1 = require("../../service/userService");
const errorHelper_1 = require("../../util/errorHelper");
const promises_1 = __importDefault(require("fs/promises"));
const handleError = (err, res) => {
    const error = (0, errorHelper_1.getErrorMessage)(err);
    console.log(error);
    res.status(500).json({ errorMessage: error.message, name: error.from, status: "error" });
};
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, userService_1.GetAllPost)();
        res.status(200).json(posts);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const post = yield (0, userService_1.GetPostById)(id);
        if (!post)
            return res.status(200).json({ message: "no post found with the specified id", post: {} });
        res.status(200).json(post);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.getPostById = getPostById;
const updateProfile = (req, res) => {
};
exports.updateProfile = updateProfile;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    if ("user" in req) {
        const user = req.user;
        const userId = user.id;
        const userName = user.userName;
        try {
            let response = null;
            let isMedia = Boolean(req.file);
            console.log(isMedia);
            if (isMedia) {
                const medaiContent = yield doMediaUpload(req.file, user);
                const link = medaiContent.mediaLink;
                if (typeof (link) === "string") {
                    console.log("hasMedia", content, userId, isMedia, userName, link);
                    response = yield (0, userService_1.CreatePost)({ content, userId, isMedia, userName, mediaPath: link });
                    res.status(201).json(response);
                }
            }
            else {
                if (!content)
                    return res.status(404).json({ status: "error", messgae: "content is required" });
                console.log("noMedia", content, userId, isMedia, userName);
                response = yield (0, userService_1.CreatePost)({ content, userId, isMedia, userName });
                res.status(201).json(response);
            }
        }
        catch (err) {
            const error = (0, errorHelper_1.getErrorMessage)(err);
            console.log(error);
            res.status(500).json({ message: error.message, reason: error.from });
        }
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        if (!id)
            return res.status(404).json({ status: "error", message: "invalid id" });
        yield (0, userService_1.DeletePost)(id);
        res.status(200).json({ status: "success", messgae: "post was deleted succesfuly" });
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.deletePost = deletePost;
const deleteAccount = (req, res) => {
};
exports.deleteAccount = deleteAccount;
const doMediaUpload = (file, user) => __awaiter(void 0, void 0, void 0, function* () {
    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const videoMimeTypes = ['video/mp4', 'video/x-matroska', 'video/avi', 'video/webm'];
    const isImage = (mimeType) => imageMimeTypes.includes(mimeType);
    const isVideo = (mimeType) => videoMimeTypes.includes(mimeType);
    const mimeType = file === null || file === void 0 ? void 0 : file.mimetype;
    const path = file === null || file === void 0 ? void 0 : file.path;
    const data = yield promises_1.default.readFile(path);
    let result = null;
    const fileName = `${user === null || user === void 0 ? void 0 : user.userName}_${Date.now()}`;
    let mediaLink = null;
    if (mimeType) {
        if (isImage(mimeType)) {
            console.log(`${file === null || file === void 0 ? void 0 : file.filename} is an image with MIME type: ${mimeType}`);
            result = yield (0, userService_1.CreateMedia_Image)(data.buffer, fileName, mimeType);
        }
        else if (isVideo(mimeType)) {
            console.log(`${file === null || file === void 0 ? void 0 : file.filename} is a video with MIME type: ${mimeType}`);
            result = yield (0, userService_1.CreateMedia_Video)(data.buffer, fileName, mimeType);
        }
        else {
            console.log(`${file === null || file === void 0 ? void 0 : file.filename} is neither an image nor a video.`);
            result = "Unable to post content";
        }
    }
    if (result && typeof (result) !== "string" && "data" in result) {
        mediaLink = yield (0, userService_1.GetMediaLink)(result.data.path);
    }
    // create a new data in Post database and add the mediaUrl to it
    promises_1.default.rm(path);
    return { result, mediaLink };
});
