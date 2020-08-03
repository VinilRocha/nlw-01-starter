const sqlite3 = require("sqlite3").verbose();

// criar objeto que fará ações no db
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db

// db.serialize(() =>{
//     // Com comandos SQL:

//     // 1 Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places2 (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // 2 Inserir dados na tabela
//     const query = `
//         INSERT INTO places2 (
//             name,
//             image,
//             address,
//             address2,
//             state,
//             city,
//             items
//         )
//             VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "Colectoria",
//         "https://images.unsplash.com/photo-1565204265082-49ca193ed380?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80",
//         "Guilherme, Jardim América",
//         "Nº 260",
//         "Rio do Sul",
//         "Santa Catarina",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err){
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso");
//         console.log(this);
//     }

//     db.run(query, values, afterInsertData)

//     // 3 Deletar um dado

//     // db.run(`DELETE FROM places2 WHERE id = ?`, [4], function(err){
//     //     if (err){
//     //         console.log(err);
//     //     }

//     //     console.log("Registro deletado com sucesso!")
//     // })

//     // 4 Consultar dados
//     db.all(`SELECT * FROM places2`, function(err, rows){
//         if(err){
//             console.log(err);
//         }

//         console.log("Aqui estão seus registros:");
//         console.log(rows);
//     })

// })