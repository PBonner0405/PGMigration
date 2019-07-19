const dotenv = require('dotenv')
const express = require('express')
const { Client, Pool } = require('pg')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const client = new Client({
  host: process.env.HOSTNAME,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

const pool = new Pool({
  host: process.env.HOSTNAME,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.static('public'))

dotenv.config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

pool.connect().then(result => {   //connect to postgre server
  console.log("DB Connected::",hostname,":", process.env.DB_PORT," ", process.env.DB_NAME );

  console.log("server starting ... ");
  app.listen(port);               //start node server (for migration it's not required)
  console.log("Server started on port:", port);

  //Create Chatting Room Table 
  pool.query("CREATE TABLE IF NOT EXISTS chatting_room(id SERIAL PRIMARY KEY, customer INTEGER, shopper INTEGER, driver INTEGER, chat_hist INTEGER)", (err, res) => {
    if(err ==null) console.log("chatting room table created", res);
    else console.log("creating chatting room table failed...");
  });
  pool.query("CREATE TABLE IF NOT EXISTS chat_history(id SERIAL PRIMARY KEY, sender INTEGER, receiver INTEGER, content VARCHAR(40), img VARCHAR(100), vid VARCHAR(100), viewed INTEGER, createdAt TIMESTAMP NOT NULL DEFAULT NOW())", (err, res) => {
    if(err ==null) console.log("chathistory table created", res);
    else console.log("chat history table failed...");
  });
  //Create Chatting Room Table 

})