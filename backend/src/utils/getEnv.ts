import dotenv from 'dotenv';
dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
   const value = process.env[key] || defaultValue;
   if(value === undefined){
    throw Error("Missing String enviroment variable for" + key);
   }
   
   return value;
}

export const DATABASE_URL = getEnv("DATABASE_URL");
export const PORT = getEnv("PORT");
export const JWT_SECRET = getEnv("JWT_SECRET");