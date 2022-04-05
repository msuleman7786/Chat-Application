const socket = io('http://localhost:8000')

// DOM
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Append message to user
const append = (message, position)=> {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

// Send message when click on submit
form.addEventListener('submit', (e)=> {
    e.preventDefault();                                             // preventDefault() is use so that the page will not reload
    const message = messageInput.value;
    // Append message to self
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    // Empty the textarea (submit)
    messageInput.value = ''
})
// Send event to server (index.js line 15)
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// Receive broadcast when new user join (index.js line 20)
socket.on('user-joined', name=> {
    append(`${name} joined the chat`, 'right')
})

// Message Received (index.js line 25)
socket.on('receive', data=> {
    append(`${data.name}: ${data.message}`, 'left')
})