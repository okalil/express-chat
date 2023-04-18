const express = require('express')
const io = require('socket.io')

const app = express()

app.use(express.static("public"))

const httpServer = require('http').createServer(app)
const socketServer = new io.Server(httpServer)

const PORT = process.env.PORT || 8080

httpServer.listen(PORT, () => console.log('Servidor iniciado na porta: ', PORT))

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

socketServer.on("connect", (socket) => {
    socket.on("message", (text) => {
        socketServer.emit("message", { user: socket.login, text })
    })
    socket.on("status", (text) => {
        socket.broadcast.emit("status", text ? socket.login + " " + text : "")
    })
    socket.on("login", login => {
        socket.broadcast.emit("login", login)
        socket.login = login
    })
})
