var express = require("express");
var app = express();
var port = process.env.PORT || 3700;

// Serve the HTML file at the '/' endpoint
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/page.html');
});

// Use the '/public' directory to serve static files
app.use(express.static(__dirname + '/views'));

// Start the server on the specified port
var midPort = app.listen(port, function () {
    console.log('Node.js listening on port ' + port);
});

// Set up Socket.IO to listen on the same port
var io = require('socket.io')(midPort);

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.emit('message', { message: 'Welcome to the Real Time Web Chat' });

    socket.on('send', function (data) {
        io.emit('message', data); // Broadcast to all connected clients
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});
