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

// CREATE, READ, UPDATE, DELETE (CRUD)

app.use(express.json())

// Rotas
app.post("/edit/save", (request, response) => {
    const { id, title, pageqty} = request.body

    const sql = `
        UPDATE books
        SET title = '${title}', pageqty = '${pageqty}'
        WHERE id = ${id}
    `
    conn.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        response.redirect("/")
    })
})

app.get("/", (request, response) => {
    const sql = 'SELECT * FROM books'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const books = data

        response.render("home", { books })
    })
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

app.get("/edit/:id", (request, response) => {
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

        response.render('edit', { book })
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

        response.render('book', { book })
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