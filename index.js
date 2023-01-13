const express = require('express')
                require('dotenv').config()
const res = require('express/lib/response')
const data = require('./db.json')
const characters = require('./characterList.json')
const cors = require('cors')
const { restart } = require('nodemon')
const port = process.env.PORT
const app = express()
const fs = require('fs')
const fileName = './db.json'
const file = require(fileName);
const dbcall = require('./dbcall.js');
const { json } = require('express/lib/response')


app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(express.json())

app.get('/get', (req, res) => {
    console.log(req.query)
    res.send(data.items.filter((identifier) => identifier.id == req.query.id))
    })


app.get('/getcharacters', (req, res) => {
    dbcall.query('Select * FROM characterlistdb', function(error, result) {
    if (error) throw error;
    res.status(200).json(result)
    });
});

app.post('/post', (req, res) => {
    let player= JSON.parse(req.body.data)
    console.log (player.playerNameValue + " " + player.playerCharacterValue + " " + player.playerSeedValue)
    dbcall.query(`INSERT INTO milkaggdb (playerNameValue, playerCharacterValue, playerSeedValue) VALUES ('${player.playerNameValue}', '${player.playerCharacterValue}', '${player.playerSeedValue}');`, function(error, result) {
    if (error) throw error;
    });

});



app.get('/getall', (req, res) => {
    return res.status(200).json(data)
    })

/* app.post('/post', (req, res) => {
    console.log(req.body.data)
    let playerData=JSON.parse(req.body.data)
    let highestId = 0;
data.playerList.forEach((player) => {
    if (player.id > highestId) {
        highestId = player.id;
    }
});
    playerData["id"] = highestId + 1;
    data.playerList.push(playerData)
    fs.writeFile(fileName, JSON.stringify(data), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(playerData)
    console.log('writing to' + fileName)
    })
    return res.status(200).json(data)
    }) */

 app.delete('/delete', (req, res) => {
    const result = data.playerList.filter(player => player.id !== Number(req.query.id));
    data.playerList = result
    fs.writeFile(fileName, JSON.stringify(data), function writeJSON(err) {
        if (err) return console.log(err);
        })
    return res.status(200).json(data)
 })   
app.listen(port, () => {
console.log(`Example app listening on ${port}`)



})

