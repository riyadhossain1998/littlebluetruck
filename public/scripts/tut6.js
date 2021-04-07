// Adapted from https://github.com/shanet/WebRTC-Example

var localVid = $("#localVideo"); //user
var remoteVid = $("#remoteVideo"); //otheruser
var btn1 = $("#btn-client1");
var btn2 = $("#btn-client2");
var theInput = $("#msgInput");
var callBtn = $("#btn-call");
var msgDiv = $("#msgDiv");

var localStream;
var peerConnection;
var serverConnection;

const peerConnectionConfig = {
    iceServers: [
        { urls: "stun:stun.stunprotocol.org:3478" },
        { urls: "stun:stun.l.google.com:19302" }
    ],
};


/*,
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
        { urls: "stun:stun.ekiga.net" },
        { urls: "stun:stun.fwdnet.net" },
        { urls: "stun:stun.ideasip.com" },
        { urls: "stun:stun.iptel.org" },
*/
const MessageType = {
    SERVER_INFO: 0,
    CLIENT1: 1,
    CLIENT2: 2,
    CALL_REQUEST: 3,
};

var count = 0;

btn1.on("click", () => {
    getWebcam();
    btn2.prop("disabled", true);
    initStory();
    destination = "wss://" + location.host + "/client1";
    serverConnection = new WebSocket(destination);
    serverConnection.onmessage = handleMessage;

    
});

btn2.on("click", () => {
    getWebcam();
    btn1.prop("disabled", true);
    initStory();
    destination = "wss://" + location.host + "/client2";
    serverConnection = new WebSocket(destination);
    serverConnection.onmessage = handleMessage;
});

callBtn.on("click", () => {
    start(true);
});
/*
continueStoryButton.on("click", () => {
    ws.onopen = (e) => {
        count++;
        ws.send(storylines[count])
        
    }
    ws.onmessage = (e) => {
        line1.innerHTML = e.data;
    }   
    
});
*/

function getWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            console.log("Got mediastrean", stream)
            localStream = stream;
            localVid.prop("srcObject", stream);
        })
        .catch(error => {
            console.error(error)
        });
}

function initStory() {
    //callBtn.prop('disabled', true);
    startStoryButton.style.display = "none";
    line1.innerHTML = storylines[count];
    line2.innerHTML = storylines[count+1];
    line3.innerHTML = storylines[count+2];
    line4.innerHTML = storylines[count+3];
    continueStoryButton.style.display = "block";
    count = 3;
}


function start(isCaller) {
    peerConnection = new RTCPeerConnection(peerConnectionConfig);
    peerConnection.onicecandidate = gotIceCandidate;
    peerConnection.ontrack = gotRemoteStream;
    peerConnection.addStream(localStream);

    if (isCaller) {
        peerConnection.createOffer().then(createdDescription).catch(errorHandler); // using chained Promises for async
    }
    
   
}

function gotIceCandidate(event) {
    if (event.candidate != null) {
        serverConnection.send(
            JSON.stringify({
                type: MessageType.CALL_REQUEST,
                ice: event.candidate,
                message: "Sending ICE candidate",
            })
        );
    }
}

function createdDescription(description) {
    console.log("got description");

    peerConnection
        .setLocalDescription(description)
        .then(() => {
            serverConnection.send(
                JSON.stringify({
                    type: MessageType.CALL_REQUEST,
                    sdp: peerConnection.localDescription,
                    message: "Requesting call",
                })
            );
        })
        .catch(errorHandler);
}

function gotRemoteStream(event) {
    console.log("got remote stream");
    remoteVid.prop("srcObject", event.streams[0]);
    msgDiv.html("Connected to peer.");
}

function handleMessage(mEvent) {
    var msg = JSON.parse(mEvent.data);

    switch (msg.type) {
        case MessageType.SERVER_INFO:
            msgDiv.html(msg.message);
            break;

            // Message came from Client 1, Handle as Client2
        case MessageType.CLIENT1:
            break;

            // Message came from Client 2, Handle as Client1
        case MessageType.CLIENT2:
            break;

        case MessageType.CALL_REQUEST:
            if (!peerConnection) {
                msgDiv.html("Receiving Call!");
                start(false);
            }

            // Are we on the SDP stage or the ICE stage of the handshake?
            if (msg.sdp) {
                peerConnection
                    .setRemoteDescription(new RTCSessionDescription(msg.sdp))
                    .then(() => {
                        // Only create answers in response to offers
                        if (msg.sdp.type == "offer") {
                            peerConnection
                                .createAnswer()
                                .then(createdDescription)
                                .catch(errorHandler);
                        }
                    })
                    .catch(errorHandler);
            } else if (msg.ice) {
                peerConnection
                    .addIceCandidate(new RTCIceCandidate(msg.ice))
                    .catch(errorHandler);
            }
        default:
            break;
    }
}

function errorHandler(error) {
    console.error(error);
}