const express = require("express");
const nunjunks = require("nunjucks");
const server = express();
const db = require("./database/db");

// ligar o server
server.listen(3000);

// configurar pasta public
server.use(express.static("public"));

// habilitar o uso do req.body pra enviar o form
server.use(express.urlencoded({extended: true}));

// template engine
nunjunks.configure("src/views",{
    express: server,
    noCahce: true
})

// configurar caminhos da aplicação
server.get("/", (req, res)=>{
    res.render("index.html", {title: "Seu marketplace de coleta de resíduos"});
})

server.get("/create-point", (req, res)=>{
    res.render("create-point.html");
})

// post do form
server.post("/savepoint", (req, res) =>{
    console.log(req.body);

    // Inserir dados na tabela
    const query = `
        INSERT INTO places2 (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        )
            VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.cityInput,
        req.body.ufInput,
        req.body.items
    ]

    function afterInsertData(err){
        if(err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso");
        res.render("create-point.html",{saved: true});
    }

    db.run(query, values, afterInsertData)
})

server.get("/resultado-busca", (req, res)=>{

    const search = req.query.search

    if (search == ""){
        return res.render("resultado-busca.html", {total: 0})
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places2 WHERE city LIKE '%${search}%'`, function(err, rows){
        if (err){
            console.log(err);
        }
        console.log("Dados coletados com sucesso");
        const total = rows.length
        res.render("resultado-busca.html", {places: rows, total});
    })

})



