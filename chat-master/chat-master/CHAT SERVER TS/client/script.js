const socket = io('http://localhost:3000', {
    extraHeaders: {
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500"
    }
  })
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('user-connect', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('new-user', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})
socket.on('new-message',function(new_message){
    appendMessage(`${new_message}`)
})
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  //socket.on("connected", function(data){console.log(data)})
  const message = messageInput.value
  if(message !== "" ){
    socket.emit('message', name+": "+message)
    //socket.emit('message', message)
    appendMessage(`You: ${message}`)
    }
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}