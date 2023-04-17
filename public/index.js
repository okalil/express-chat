let socket;

window.onload = () => {
    socket = io()
    socket.on("message", ({ user, text }) => {
        addMessage(user, text)
    })
    socket.on("status", text => {
        document.getElementById("status").innerHTML = text
    })
    socket.on("login", login => {
        const li = document.createElement("li")
        li.textContent = `${login} entrou`
        document.getElementById("mensagens").appendChild(li)
    })
}

function addMessage(user, text) {
    const li = document.createElement("li")
    li.textContent = `${user}: ${text}`
    document.getElementById("mensagens").appendChild(li)
}

function send(event) {
    event.preventDefault()
    const form = event.target;
    const text = form.text.value
    socket.emit('message', text)
    form.reset()
}

let timeout = 0

function keydown() {
    clearTimeout(timeout)
    socket.emit("status", "Está digitando...")
}

function keyup() {
    timeout = setTimeout(() => {
        socket.emit("status", "")
    }, 2000)
}

function sendLogin(event) {
    event.preventDefault()
    const form = event.target;
    const login = form.login.value
    socket.emit('login', login)
    
    form.style.display = 'none';
    document.getElementById("message_form").style.display = 'block'
}
