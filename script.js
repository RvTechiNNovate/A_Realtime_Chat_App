const socket = io('http://localhost:3000')
const messageContainer = document.querySelector('.message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

var audio = new Audio("1.mp3")

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value;
    appendMessage(`You: ${message}`, "right");
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message, position) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == "left") {
        audio.play();
    }
}




const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('user-connected', name => {
    appendMessage(`${name} connected `, "left")
})


socket.on('recieve', data => {
    appendMessage(`${data.name}: ${data.message}`, "left")
})


socket.on('user-disconnected', name => {
    appendMessage(`${name} Left the chat`, "left")
})