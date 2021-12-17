import path from "path";

require('dotenv').config({
    path: path.join(__dirname, '../../.env')
});

export const config = {
    firbase:{
        FIREBASE_DB_URL_ADMIN : process.env['FIREBASE_DB_URL_ADMIN'],
        FIREBASE_API_KEY : process.env['FIREBASE_API_KEY'],
        FIREBASE_AUTH_DOMAIN : process.env['FIREBASE_AUTH_DOMAIN'],
        FIREBASE_DB_URL : process.env['FIREBASE_DB_URL'],
        FIREBASE_PROJECT_ID : process.env['FIREBASE_PROJECT_ID'],
        FIREBASE_STORAGE_BUCKET : process.env['FIREBASE_STORAGE_BUCKET'],
        FIREBASE_MESSAGING_SENDER_ID : process.env['FIREBASE_MESSAGING_SENDER_ID'],
        FIREBASE_APP_ID : process.env['FIREBASE_APP_ID'],
    }
}