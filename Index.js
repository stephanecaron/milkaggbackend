const express = require('express')
                require('dotenv').config()
const res = require('express/lib/response')
const data = require('./db.json')
const cors = require('cors')
const { restart } = require('nodemon')
const port = process.env.PORT
const app = express()
const fs = require('fs')
const fileName = './db.json'
const file = require(fileName);

file.key = "new value";

app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(express.json())

app.get('/get', (req, res) => {
    console.log(req.query)
    res.send(data.items.filter((identifier) => identifier.id == req.query.id))
    })

app.get('/getall', (req, res) => {
    return res.status(200).json(data)
    })

app.post('/post', (req, res) => {
    let playerData=JSON.parse(req.body.data)
        playerData["id"]="5"
    console.log(playerData)
    data.playerList.push(playerData)

    return res.status(200).json(data)
    })

app.listen(port, () => {
console.log(`Example app listening on ${port}`)

})