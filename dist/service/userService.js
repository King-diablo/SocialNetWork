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
exports.createMedai = exports.DeletePost = exports.GetAllPost = exports.createPost = void 0;
const database_1 = require("../config/database");
const errorHelper_1 = require("../util/errorHelper");
const createPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, status, statusText, error } = yield database_1.supabase
        .from('Post')
        .insert({ user_id: "9cac90f7-29ae-4392-be6c-4eaab8ce012e", userName: 'kingDiablo', content: "testPost 007" });
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.errorName,
        };
    }
    return { message: "post created successfuly", status, postStatus: statusText };
});
exports.createPost = createPost;
const GetAllPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield database_1.supabase
        .from('Post')
        .select();
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.errorName,
        };
    }
    return data;
});
exports.GetAllPost = GetAllPost;
const DeletePost = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, status, statusText, error } = yield database_1.supabase
        .from('Post')
        .delete()
        .eq('id', 23);
    if (error) {
        const err = (0, errorHelper_1.getErrorMessage)(error);
        console.log(err.stack);
        return {
            message: err.message,
            from: err.errorName,
        };
    }
    return { data, status, statusText };
});
exports.DeletePost = DeletePost;
const createMedai = (file, name, fileType) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log(err.stack);
        return {
            message: err.message,
            from: err.errorName,
        };
    }
    return { message: "uploaded succesfuly", data };
});
exports.createMedai = createMedai;
