var name = "Little Blue Truck";
var author1 = "Alice Schertle";
var author2 = "Jill McElmurry"

var storylines = [
    "Horn went <b>Beep</b>"/*beep*/,
    "Engine purred",
    "Friendliest sounds",
    "you ever heard",

    "Little Blue Truck",
    "came down the road.",
    /*beep*/"() said Blue",
    "to a big green toad", 
    
    "Toad said"/*croak*/,
    "and winked an eye",
    "when Little Blue Truck",
    "went rolling by",
    
    "Sheep said", /*Baaa*/
    "Cow said, ",/*Moo*/
    /*Oink*/ "said a piggy.",
    /*Beep*/ "said Blue",
    
    /*Cluck*/"said a chicken",
    "and her chick said, " /*Peep*/,
    /*Maaa*/ "said a goat",
    "Blue said, " /*Beep*/,
    
    /*Neigh*/"said a horse",
    /*Quack*/ "said a duck",
    /*Beep*/ "said the friendly",
    "Little Blue Truck",
    
    "Honk!!",
    "Yelled a dump truck",
    "Coming through",
    "I've big important things to do",
    
    "I haven't got time",
    "to pass the day",
    "with every duck",
    "along the way",
    
    "ROOOM! went the Dump",
    "around a curve",
    "He saw a puddle",
    "and he tried to swerve",
    
    "Into the mud",
    "rolled the big fat truck", 
    "and his big important ",
    "wheels got STUCK",
    
    "His heavy-duty",
    "dump-truck tires",
    "were sunk down deep",
    "in muck and mire",
     
    // 1:11

    "",
    "",
    "",
    "",    
    "",
    "",
    "",
    "",
    "",
    "",
    "",

];

var startStoryButton = document.getElementById("startStory");
var continueStoryButton = document.getElementById("continue");

var line1 = document.getElementById("line1");
var line2 = document.getElementById("line2");
var line3 = document.getElementById("line3");
var line4 = document.getElementById("line4");
var count = 0;

var dst1 = 'ws://' + location.host + '/client1';
var dst2 = 'ws://' + location.host + '/client2';

ws1 = new WebSocket(dst1);
ws2 = new WebSocket(dst2);

startStoryButton.on("click", () => {
    startStoryButton.style.display = "none";
    
    ws1.onopen = function(event) {
        ws.send(storylines[0])
    }

    ws2.onopen = function(event) {
        ws.send(storylines[0])
    }

    ws1.onmessage = function(event) {
        var msg = event.data;
        line1.innerHTML += msg;
        
        
    }
    ws2.onmessage = function(event) {
        var msg = event.data;
        line1.innerHTML += msg;
        
        
    }
});

function sendData(client) {
    var msg = {
        type: "message", 
        text: storylines[0],
        id: client,
        
    };

    serverConnection.send(JSON.stringify(msg));

    

}
/*

function startReading() {
    console.log(clients);
    destination = 'ws://' + location.host + '/client1';
    ws = new WebSocket(destination);
    ws.onopen = (e) => {
        ws.send("Attempt to Connect")
        
    } 
    ws.onmessage = (e) => {
        msgDic.html(e.data)
    }
    startStoryButton.style.display = "none";
    line1.innerHTML = storylines[count];
    line2.innerHTML = storylines[count+1];
    line3.innerHTML = storylines[count+2];
    line4.innerHTML = storylines[count+3];
    continueStoryButton.style.display = "block";
    count = 3;
}
function continueStory() {
    line1.innerHTML = storylines[count+1];
    line2.innerHTML = storylines[count+2];
    line3.innerHTML = storylines[count+3];
    line4.innerHTML = storylines[count+4];
    count += 4;

    if(count >= storylines.length) {
        count = 0;
        continueStoryButton.style.display = "none";
        startStoryButton.style.display = "block";
    }
}

Plan: 
    Read from lines, use 

*/
