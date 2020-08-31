const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "123456"

//using cors
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


function auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token,JWTSecret,(err, data) => {
            if(err){
                res.status(401);
                res.json({err: "Token inválida!"});
            } else {
                req.token = token;
                req.loggeUser = {id: data.id, email: data.email};
                 next();//responsavel por passar a requisição para a rota que o usuario quer acessar
            }
        });
    }else{
        res.status(401);
        res.json({err:"Token inválida"});
    }
}

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
    ], 
    users: [
        {
            id: 1,
            name: "Victor Lima",
            email: "victordevtb@guiadoprogramador.com",
            password: "nodejs"
        },

        {
            id: 20,
            name: "Guilherme",
            email: "guigg@gmail.com",
            password: "java123"
        }
    ]
}


app.get("/games",auth,(req, res) => {

    let HATEOAS =  [
        {
            href: "http://localhost:8080/game/0",
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:8080/game/0",
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost:8080/auth",
            method: "GET",
            rel: "get_game"
        }
    ]

    res.statusCode = 200
    res.json({games: myDB.games, _links: HATEOAS});
})

app.get("/games/:id",auth,(req,res) =>{

    //set a "ERROR" statusCode
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        
    //checking if this game exists in myDB    
        let id = parseInt(req.params.id)
        
        let HATEOAS =  [
            {
                href: "http://localhost:8080/game/"+id,
                method: "DELETE",
                rel: "delete_game"
            },
            {
                href: "http://localhost:8080/game/"+id,
                method: "PUT",
                rel: "edit_game"
            },
            {
                href: "http://localhost:8080/game/"+id,
                method: "GET",
                rel: "get_game"
            },
            {
                href: "http://localhost:8080/games",
                method: "GET",
                rel: "get_all_game"
            }
        ]

        let game = myDB.games.find(game => game.id == id)

        if(game != undefined){
            res.statusCode = 200
            res.json({game, _links: HATEOAS})
        }else{
            res.sendStatus(404)
        }
    }
})

app.post("/game",auth,(req,res) =>{

    let {title, price, year} = req.body

    myDB.games.push({
        id: 5,
        title,
        price,
        year
    })

    res.sendStatus(201)
})


app.delete("/game/:id",auth,(req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        let id = parseInt(req.params.id)
        let index = myDB.games.findIndex(game => game.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            myDB.games.splice(index,1)
            res.sendStatus(200)
        }
    }   
})

//editing game
app.put("/game/:id", (req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
    
    let id = parseInt(req.params.id)

    let game = myDB.games.find(game => game.id == id)

    //add more validation(price,year e etc...)
    if(game != undefined){

    let {title, price, year} = req.body
            
    if(title != undefined){
        game.title = title
    }     

    if(price != undefined){
        if(price == isNaN(req.body.price)){
            res.sendStatus(404)
       } 
       game.price = price
    }   

    if(year != undefined){
        game.year = year
    } 
    
    res.sendStatus(200)

    }else{
        res.sendStatus(404)
    }
}
})

//rota de login
app.post("/auth",(req,res) => {
    var {email, password} = req.body;

    if(email != undefined){
      let user = myDB.users.find(u => u.email == email);

        if(user != undefined){
            if(user.password == password){
                jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn: '48h'},(err, token) => {
                    if(err){
                        res.status(400);
                        res.json({err: "Falha interna"});
                    } else{
                        res.status(200);
                        res.json({token: token});
                    }
                })
            } else{
                res.status(401);
                res.json({err:"Credenciais inválidas!"});
            }

        } else{
            res.status(404);
            res.json({err: "O email enviado não existe na base de dados!"})
        }
    }else{
        res.status(400);
        res.json({err: "O email enviado é inválido"})
    }
});

app.listen(8080,() => {
    console.log("API executing...")
})