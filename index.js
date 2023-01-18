const express = require('express')
                require('dotenv').config()
const res = require('express/lib/response')
const data = require('./db.json')
const cors = require('cors')
const { restart } = require('nodemon')
const port = process.env.PORT
const app = express()
const dbcall = require('./dbcall.js');


app.use(cors({origin:"http://localhost:3000",credentials:true}))
/* app.use(express.json()) */

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
    let player= req.body.data
    console.log (player.playerNameValue + " " + player.playerCharacterValue + " " + player.playerSeedValue)
    dbcall.query(`INSERT INTO milkaggdb (playerNameValue, playerCharacterValue, playerSeedValue) VALUES ('${player.playerNameValue}', '${player.playerCharacterValue}', '${player.playerSeedValue}');`, function(error, result) {
    if (error) throw error;
    });

});



app.get('/getall', (req, res) => {
    dbcall.query(`SELECT * FROM milkaggdb`, function (error, result) {
        if (error) throw error;
        res.status(200).json(result)
        console.log ('sent all players to user')
    })
})

app.delete('/delete', (req, res, err) => {
    console.log (req.query.id)
    dbcall.query(`DELETE FROM milkaggdb WHERE id=${req.query.id};`)
    if (err) throw err;
})

/*  app.delete('/delete', (req, res) => {
    const result = data.playerList.filter(player => player.id !== Number(req.query.id));
    data.playerList = result
    fs.writeFile(fileName, JSON.stringify(data), function writeJSON(err) {
        if (err) return console.log(err);
        })
    return res.status(200).json(data)
 })    */


app.listen(port, () => {
console.log(`Example app listening on ${port}`)
})

