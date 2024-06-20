
import { createClient } from '@supabase/supabase-js'
import { EVN } from '../util/env';

const url = EVN.DATABASE_URL;
const secret = EVN.DATABASE_SECRET;

if (!url && !secret) throw new Error("Database url and or secret is missing");



// Create a single supabase client for interacting with your database
export const supabase = createClient(url as string, secret as string);