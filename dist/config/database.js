"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const env_1 = require("../util/env");
const url = env_1.EVN.DATABASE_URL;
const secret = env_1.EVN.DATABASE_SECRET;
if (!url && !secret)
    throw new Error("Database url and or secret is missing");
// Create a single supabase client for interacting with your database
exports.supabase = (0, supabase_js_1.createClient)(url, secret);
