const clickableAfter5Seconds = document.getElementById("clickableAfter5Seconds");
function btn2Function(){
    document.getElementById("btn2Response").innerHTML ="Oh! You Clicke Me!";
}
function btn3Function(){
    document.getElementById("btn3Response").innerHTML ="Oh! You Clicke Me!";
}
function btn3Function2(){
    document.getElementById("btn3Response").innerHTML = "Oh! You Doble Clicked Me!";
}
function btn4Function(){
    document.getElementById("btn4Response").innerHTML ="Oh! You Clicke Me!";
}
function btn4Function2(){
    document.getElementById("btn4Response").innerHTML = "Oh! You Doble Clicked Me!";
}
function btn4Function3(){
    document.getElementById("btn4Response").innerHTML = "Oh! You Right Clicked Me!";
}
function mouseDown(){
    document.getElementById("btn5Response").innerHTML ="mousedown";
}
function mouseUp(){
    document.getElementById("btn5Response").innerHTML ="mouseup";
}
function mouseEnter(){
    document.getElementById("btn6Response").innerHTML = "mouseenter";
}
function mouseLeave(){
    document.getElementById("btn6Response").innerHTML = "mouseleave";
}
function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("dvi2Response").innerHTML = coords;
}
function showCoords2(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("dvi3Response").innerHTML = coords;
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }