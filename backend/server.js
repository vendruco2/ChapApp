const express = require('express');
const dotenv = require('dotenv');
const chats = require("./data/data.js");
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // to accept JSON data

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/user', userRoutes); // if the user enters /api/user, it will be redirected to userRoutes
app.use("/api/chat", chatRoutes); // if the user enters /api/chat, it will be redirected to chatRoutes
app.use("/api/message", messageRoutes); // if the user enters /api/messages, it will be redirected to chatRoutes

app.use(notFound); // if the user enters a wrong route, this will be executed
app.use(errorHandler); // if there is an error, this will be executed


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`)); // start the server

const io = require('socket.io')(server, {
    pingTimeOut: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => { // when a user connects to the server
    console.log("connected");

    socket.on("setup", (userData) => { // when a user connects to the server
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => { // when a user joins a chat
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing")); // when a user starts typing
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing")); // when a user stops typing

    socket.on("new message", (newMessageRecieved) => { // when a user sends a message
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => { // send the message to all the users in the chatroom
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved); // send the message to the user
        });
    });

    socket.off("setup", () => { // when a user disconnects from the server
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
