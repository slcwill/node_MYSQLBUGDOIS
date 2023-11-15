const { response } = require("express")
const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

// Definindo Handlebars como template
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// pasta de arquivos estáticos como CSS, imagens
app.use(express.static("public"))

// Trabalhar com dados no formato json
app.use(express.urlencoded({
    extended: true
}))

// CRUD -> CREATE, READ, UPDATE, DELETE

app.use(express.json)

// Rotas
app.get("/", (request, response) => {
    response.render("home")
})

app.get("/register", (request, response) => {
    response.render("register")
})

app.post("/register/save", (request, response) => {
    const { title, pageqty } = request.body // Desestruturação

    const query = `
    INSERT INTO books (title, pageqty)
    VALUES ('${title}', '${pageqty}')
    `

    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.redirect("/")
    })
})

app.get("/book/:id", (request, response) => {
    const id = request.params.id

    const sql = `
         SELECT * FROM books
         WHERE id=${id}
    `

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data[0]

        responde.render("book", {book})
    })
})

app.get("/", (request, response) => {
    const sql = 'SELECT * FROM books'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const books = data

        console.log(books)

        response.render("home", { books })
    })
})

// Conexão com o MySQL
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3307
})

conn.connect((error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL!")

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000!")
    })
})