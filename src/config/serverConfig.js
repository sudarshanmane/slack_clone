import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DEV_DB_URL = process.env.DEV_DB_URL;

export const PROD_DB_URL = process.env.PROD_DB_URL;

export const JWT_SCERET = process.env.JWT_SCERET;

export const MAIL_ID = process.env.MAIL_ID;

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const REDIS_PORT = process.env.REDIS_PORT;

export const REDIS_HOST = process.env.REDIS_URL;
