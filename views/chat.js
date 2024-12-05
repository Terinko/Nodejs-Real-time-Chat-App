window.onload = function() {

    var messages = [];
    var socket = io.connect('https://33t0l0lc-3700.use.devtunnels.ms/');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var localKey = document.getElementById("key");

    //message listener
    socket.on('message', function (data) {
        if(data.Key == localKey.value || data.Key == null){
            if(data.message) {
                messages.push(data);
                var html = '';
                for(var i=0; i<messages.length; i++) {
                    html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                    html += messages[i].message + '<br />';
                }
                content.innerHTML = html;
                content.scrollTop = content.scrollHeight;
            } else {
                console.log("There is a problem:", data);
                socket.emit('send', { message: "Please include a message before hitting send", username: "System" });
            }
        }
    });
    // button to send message to socket
    sendButton.onclick = function() {
        //console.log(localKey.value);
    	if(name.value == "") {
            alert("Please type your name!");
        } else {
        var text = field.value;
        socket.emit('send', { message: text, username: name.value, Key : localKey.value });
        field.value = '';
        }
    };
    // set enter key listener 
    field.addEventListener('keypress', function (e) {
	    var key = e.which || e.keyCode;
	    if (key === 13) { 
	    	sendButton.onclick();
    	}
	});
}

