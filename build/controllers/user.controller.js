"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const tsoa_1 = require("tsoa");
// import { initializeApp } from "firebase-admin/app";
const app_1 = require("firebase/app");
const admin = __importStar(require("firebase-admin"));
const path = __importStar(require("path"));
// import {getDatabase} from "firebase-admin/lib/database";
const database_1 = require("firebase/database");
// import * as firebase from 'firebase';
let srcPath = path.join(__dirname, "/key.json");
const firebase = __importStar(require("firebase/app"));
const config_1 = require("./../config/config");
/**
 * Send notification to authorized person
 * Request Body : {
    "ipAddress": "43.250.158.114",
    "continentCode": "AS",
    "continentName": "Asia",
    "countryCode": "IN",
    "countryName": "India",
    "stateProv": "Gujarat",
    "city": "Ahmedabad (Shahibaugh)"
}*/
// @Route("users")
let UserController = class UserController {
    sendNotification(request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n\n\n Here is you api");
            let requestMessage = `Someone from ${request.countryName}, ${request.stateProv}, ${request.city} `;
            if (admin.apps.length === 0) {
                admin.initializeApp({
                    credential: admin.credential.cert(srcPath),
                    databaseURL: config_1.config.firbase.FIREBASE_DB_URL_ADMIN
                });
            }
            const firebaseConfig = {
                apiKey: config_1.config.firbase.FIREBASE_API_KEY,
                authDomain: config_1.config.firbase.FIREBASE_AUTH_DOMAIN,
                databaseURL: config_1.config.firbase.FIREBASE_DB_URL,
                projectId: config_1.config.firbase.FIREBASE_PROJECT_ID,
                storageBucket: config_1.config.firbase.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: config_1.config.firbase.FIREBASE_MESSAGING_SENDER_ID,
                appId: config_1.config.firbase.FIREBASE_APP_ID,
            };
            firebase.initializeApp(firebaseConfig);
            const app = app_1.initializeApp(firebaseConfig);
            try {
                const db = database_1.getDatabase(app);
                const dbRef = database_1.ref(db, 'Users');
                const options = {
                    priority: "high",
                    timeToLive: 60 * 60 * 24
                };
                const payload = {
                    notification: {
                        title: "Kanhasoft Portal",
                        body: requestMessage
                    },
                    data: request
                };
                database_1.onValue(dbRef, (snapshot) => {
                    const users = snapshot.val();
                    for (const user of Object.keys(users)) {
                        if (users[user].fcm_token) {
                            admin.messaging().sendToDevice(users[user].fcm_token, payload, options).then((result) => {
                                // console.log("result-----<>",result.results);
                                console.log("result-----<>", result[0]);
                            }).catch((e) => {
                                console.log("Hre is array", e);
                            });
                        }
                    }
                });
                return "Send successfully";
            }
            catch (e) {
                throw new Error(e);
            }
            // var registrationToken = "e_rUlPy_QDimZ-VExo4cjS:APA91bEePBnf1xPT1LaZ_FvW-bJyS8HXGIxdPh0kf1CQItkHX7Fk1i_HoFT9KwDvviXJLKOqJv7PH8KvzpZQ8JSXv4-7pzluuPSm7eN52Vb7LXa9wL45_KVBP_WkKm4ZZ1ZyZwyZv8v_";
        });
    }
};
__decorate([
    tsoa_1.Post("/me"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendNotification", null);
UserController = __decorate([
    tsoa_1.Tags("User")
], UserController);
exports.default = UserController;
