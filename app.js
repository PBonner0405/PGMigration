const dotenv = require('dotenv')
const express = require('express')
const { Client } = require('pg')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const client = new Client({
  host: process.env.HOSTNAME,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public'))

dotenv.config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

client.connect().then(result => {
  console.log("DB Connected::",process.env.HOSTNAME,":", process.env.DB_PORT," ", process.env.DB_NAME );
  console.log("pg connection result::", result);

  app.listen(port).then(res => {
    console.log("server starting ... ", res);
    console.log("Server started on port:", port);
    
  })
})