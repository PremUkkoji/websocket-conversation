var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#conversation-container").html("");
}

function connect() {
    var socket = new SockJS('/stomp-websocket-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/chatroom/public', function (response) {
            console.log('Data: ' + response);
            showMessage(response.body);
        });

        stompClient.subscribe('/user/' + $("#sender").val() + '/private', function (response) {
            console.log('Data: ' + response);
            showPrivateMessage(JSON.stringify(response.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
        stompClient = null;
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    let message = $("#message").val();

    stompClient !== null ?
        stompClient.send("/websocketapp/chatroom-message", {}, message) :
        alert("Websocket not connected");
    showMessage("You : " + message);
}

function sendPrivateName() {
    let sender = $("#sender").val();
    let receiver = $("#receiver").val();
    let message = $("#message").val();

    stompClient !== null ?
        stompClient.send("/websocketapp/private-message", {}, JSON.stringify({"senderName": sender, "message": message, "receiverName": receiver})) :
        alert("Websocket not connected");
    showPrivateMessage("You : " + message);
}

function showMessage(message) {
    $("#public-conversation-container").append("<tr><td>" + message + "</td></tr>");
}

function showPrivateMessage(message) {
    $("#private-conversation-container").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
    $( "#sendprivate" ).click(function() { sendPrivateName(); })
});