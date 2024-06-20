import 'dotenv/config'

export const EVN = {
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    SECRET: process.env.SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_SECRET: process.env.DATABASE_SECRET,
}