var moo = new Audio("../sounds/cow.mp3");
//var neigh = new Audio("sounds/");
var croak;
var beep;
var baaa;
var oink;
var honk;
var peep;
var cluck;


// in addeventlistener(function(){play})
//moo.play;


function playSound(animal) {
    var button = document.getElementById(animal);
    button.play();
}