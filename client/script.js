// const server = new WebSocket(`ws://127.0.0.1:9000/websocket`);

const server = new WebSocket(`ws://127.0.0.1:8884/websocket`);

const messagesTag = document.getElementById("messages")
const inputTag = document.getElementById("message")
const btnTag = document.getElementById("send")


server.onopen = function () {
  btnTag.disabled = false
};

server.onmessage = function(event){
    const {data} = event
    // console.log(event)
    generateMessageEntry(data , 'Sever')
}

function generateMessageEntry(msg , type){
    const newMessage = document.createElement('div')
    newMessage.innerText = `${type} says : ${msg}`
    // console.log(newMessage)
    messagesTag.appendChild(newMessage)
    inputTag.value =''
}

btnTag.addEventListener('click' , sendMessage , false)

function sendMessage() {
    const text = inputTag.value
    generateMessageEntry(text , "Client")
    server.send(text)
}