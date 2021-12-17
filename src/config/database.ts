import {ConnectionOptions} from 'typeorm'
import {User, Post, Comment} from '../models'
import * as path from 'path';


require('dotenv').config({
  path: path.join(__dirname, '../../.env')
});

// const config : ConnectionOptions = {
//   type: "postgres",
//   host: process.env.POSTGRES_HOST,
//   port: Number(process.env.POSTGRES_PORT),
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DB,
//   entities: [User, Post, Comment],
//   synchronize: false,
// }
//
// export default config