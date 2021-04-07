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
    "<b>Beep</b> said Blue",
    "to a big green toad", 
    
    "Toad said <b>Croak</b>"/*croak*/,
    "and winked an eye",
    "when Little Blue Truck",
    "went rolling by",
    
    "Sheep said <b>Baaa</b>", /*Baaa*/
    "Cow said, <b>Moo</b>",/*Moo*/
    /*Oink*/ "<b>Oink</b> said a piggy.",
    /*Beep*/ "<b>Beep</b> said Blue",
    
    /*Cluck*/"<b>Cluck</b> said a chicken",
    "and her chick said, <b>Peep</b> " /*Peep*/,
    /*Maaa*/ "<b>Maaa</b> said a goat",
    "Blue said, <b>Beep</b>" /*Beep*/,
    
    /*Neigh*/"<b>Neigh</b> said a horse",
    /*Quack*/ "<b>Quack</b> said a duck",
    /*Beep*/ "<b>Beep</b> said the friendly",
    "Little Blue Truck",
    
    "<b>Honk!!</b>",
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



/*
function sendData(client) {
    var msg = {
        type: "message", 
        text: storylines[0],
        id: client,
        
    };

    serverConnection.send(JSON.stringify(msg));

    

}
*/

function startReading() {
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




