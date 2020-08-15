const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//our "pseudo" database in json

let myDB = {
    games: [
        {
            id: 1,
            title: "BubbleShot",
            year: 2020,
            price: 10
        },
        {
            id: 2,
            title: "Zelda",
            year: 2020,
            price: 30
        },
        {
            id: 3,
            title: "Need For Speed",
            year: 2020,
            price: 50
        },
        {
            id: 4,
            title: "Jazz Jack The Rabbit",
            year: 2020,
            price: 30
        }
    ]
}


app.get("/games",(req, res) => {
    res.statusCode = 200
    res.json(myDB.games)
})

app.get("/games/:id",(req,res) =>{

    //set a "ERROR" statusCode
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        
    //checking if this game exists in myDB    
        let id = parseInt(req.params.id)
        
        let game = myDB.games.find(game => game.id == id)

        if(game != undefined){
            res.statusCode = 200
            res.json(game)
        }else{
            res.sendStatus(404)
        }
    }
})

app.listen(8080,() => {
    console.log("API executing...")
})