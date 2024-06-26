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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediaLink = exports.DeleteAccount = exports.CreateMedia_Video = exports.CreateMedia_Image = exports.DeletePost = exports.GetPostById = exports.GetAllPost = exports.CreatePost = void 0;
const database_1 = require("../config/database");
const errorHelper_1 = require("../util/errorHelper");
const CreatePost = (postData) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, status, statusText, error } = yield database_1.supabase
        .from('Post')
        .insert({
        user_id: postData.userId,
        userName: postData.userName,
        content: postData.content,
        isMedia: postData.isMedia,
        mediaPath: postData.mediaPath
    });
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        };
    }
    return { message: "post created successfuly", status, postStatus: statusText };
});
exports.CreatePost = CreatePost;
const GetAllPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield database_1.supabase
        .from('Post')
        .select();
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        };
    }
    return data;
});
exports.GetAllPost = GetAllPost;
const GetPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield database_1.supabase
        .from('Post')
        .select()
        .eq("id", id);
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        };
    }
    return data;
});
exports.GetPostById = GetPostById;
const DeletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, status, statusText, error } = yield database_1.supabase
        .from('Post')
        .delete()
        .eq('id', id);
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        };
    }
    console.log(data, status, statusText, error);
    return { data, status, statusText };
});
exports.DeletePost = DeletePost;
const CreateMedia_Image = (file, name, fileType) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield database_1.supabase
        .storage
        .from('Post')
        .upload(`img/${name}`, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: fileType
    });
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        return {
            message: err.message,
            from: err.from,
        };
    }
    return { message: "uploaded succesfuly", data };
});
exports.CreateMedia_Image = CreateMedia_Image;
const CreateMedia_Video = (file, name, fileType) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield database_1.supabase
        .storage
        .from('Post')
        .upload(`vid/${name}`, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: fileType
    });
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        };
    }
    return { message: "uploaded succesfuly", data };
});
exports.CreateMedia_Video = CreateMedia_Video;
const DeleteAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, status, statusText, error } = yield database_1.supabase
        .from('Users')
        .delete()
        .eq('id', id);
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.from,
        };
    }
    console.log(data, status, statusText, error);
    return { data, status, statusText };
});
exports.DeleteAccount = DeleteAccount;
const GetMediaLink = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = database_1.supabase
        .storage
        .from('Post')
        .getPublicUrl(path);
    return data.publicUrl;
});
exports.GetMediaLink = GetMediaLink;
