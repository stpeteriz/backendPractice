import  express  from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";

import {handleRegisterPost} from "./controllers/register.js";
import {handleSignInPost} from "./controllers/signin.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleApiCall, handleImagePut } from "./controllers/image.js";

const db = knex({
    client: 'pg',
    connection: {
      host : 'containers-us-west-33.railway.app',
      user : 'postgres',
      password : '5ulqvU87y9nKJGe3lv6L',
      database : 'railway',
      port: 5686
    }
});

db.select('*').from('users').then(data => {
    console.log(data)
});

const app = express();
app.use(express.json());
app.use(cors('frontendtesting-production.up.railway.app',));

app.get('/', (req,res) =>{
    res.json('It is running');
})
app.post('/signin', (req, res) => { handleSignInPost(req, res, db, bcrypt) })
app.post('/register', (req, res) => { handleRegisterPost(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {handleImagePut(req, res, db)})
app.post('/imageurl', (req, res) => {handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is running on port ${process.env.PORT}`)
})


/* Routes
/--> res = this is working
/singin ---> POST request | respond = succes/fail
/register ---> POST req   | respond = user
/profile/:userId --> GET  | respond = user
/image --> PUT updating user info




*/