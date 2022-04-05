                            // Chat Application Using NodeJs and SocketIO :- https://youtu.be/3QNBVG2yqKA
                            // socket.emit = To send the message
                            // socket.on = To receive the message
                            // socket.broadcast.emit = To Notify the other users except sender

// const io = require('socket.io')(8000)
const io = require("socket.io")(8000, {
    cors: {
        origin: "*",
    },
});

// Users Connected
const users = {};

io.on('connection', socket => {                                                 // listen many socket connections
    // Receive event from client
    socket.on('new-user-joined', name=> {                                       // It handle a particular connection
        users[socket.id] = name;

        // Notify others when new user join
        socket.broadcast.emit('user-joined', name);
    });

    // Send Message
    socket.on('send', message=> {
        // Inform others the send message except sender
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
})