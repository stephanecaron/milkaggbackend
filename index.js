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
    console.log (req.body.myNewPlayer)
    let player = req.body.myNewPlayer
    dbcall.query(`INSERT INTO milkaggdb (playerNameValue, playerCharacterValue, playerSeedValue) VALUES ('${player.playerNameValue}', '${player.playerCharacterValue}', '${player.playerSeedValue}');`, function(error, result) {
        if (error) throw error;
        res.status(200).json(result.insertId)
    });
});



app.get('/getall', (req, res) => {
    dbcall.query(`SELECT * FROM milkaggdb`, function (error, result) {
        if (error) throw error;
        res.status(200).json(result)
        console.log ('sent all players to user')
    })
})

app.delete('/delete', (req, res) => {
    console.log (req.query.id)
    try {
      dbcall.query(`DELETE FROM milkaggdb WHERE id=${req.query.id};`)
    } catch (error) {
        throw error;
    }
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

