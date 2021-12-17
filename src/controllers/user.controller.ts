import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from '../models'
import { getUsers, createUser, IUserPayload, getUser } from '../repositories/user.repository'
// import { initializeApp } from "firebase-admin/app";
import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging";
import * as admin from 'firebase-admin';
import * as path from 'path'
// import {getDatabase} from "firebase-admin/lib/database";
import { getDatabase,ref, onValue,child,get  } from "firebase/database";
// import * as firebase from 'firebase';
let srcPath = path.join(__dirname, "/key.json");
import * as firebase from 'firebase/app';
import {config} from './../config/config'


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
@Tags("User")
export default class UserController {
	@Post("/me")
	public async sendNotification(request:any): Promise<String | null> {
		console.log("\n\n\n Here is you api")
		let requestMessage = `Someone from ${request.countryName}, ${request.stateProv}, ${request.city} `

		if (admin.apps.length === 0) {
			admin.initializeApp({
				credential: admin.credential.cert(srcPath),
				databaseURL: config.firbase.FIREBASE_DB_URL_ADMIN
			});
		}
		const firebaseConfig = {
			apiKey: config.firbase.FIREBASE_API_KEY,
			authDomain: config.firbase.FIREBASE_AUTH_DOMAIN,
			databaseURL: config.firbase.FIREBASE_DB_URL,
			projectId: config.firbase.FIREBASE_PROJECT_ID,
			storageBucket: config.firbase.FIREBASE_STORAGE_BUCKET,
			messagingSenderId: config.firbase.FIREBASE_MESSAGING_SENDER_ID,
			appId: config.firbase.FIREBASE_APP_ID,
		};
		firebase.initializeApp(firebaseConfig)

		const app = initializeApp(firebaseConfig);

		try {
			const db = getDatabase(app);
			const dbRef = ref(db,'Users');
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
			onValue(dbRef, (snapshot:any) => {
				const users = snapshot.val();
				for(const user of Object.keys(users)){
					if(users[user].fcm_token){
						admin.messaging().sendToDevice(users[user].fcm_token, payload, options).then((result:any)=>{
							// console.log("result-----<>",result.results);
							console.log("result-----<>",result[0]);
						}).catch((e : any)=>{
							console.log("Hre is array",e)
						})
					}
				}
			});
			return "Send successfully";
		} catch (e:any) {
			throw new Error(e);
		}

		// var registrationToken = "e_rUlPy_QDimZ-VExo4cjS:APA91bEePBnf1xPT1LaZ_FvW-bJyS8HXGIxdPh0kf1CQItkHX7Fk1i_HoFT9KwDvviXJLKOqJv7PH8KvzpZQ8JSXv4-7pzluuPSm7eN52Vb7LXa9wL45_KVBP_WkKm4ZZ1ZyZwyZv8v_";
		
	}
}