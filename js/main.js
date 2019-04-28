// Button stuff
$('#generate').click(function () {
 	doStuff();
});
// Global vars
var names;
var items;
var qIdentifier;
// Load arrays
$(function(){
    $.get('data/names.txt', function(data){
        names = data.split(/\r?\n/);
    });
});
$(function(){
    $.get('data/items.txt', function(data){
        items = data.split(/\r?\n/);
    });
});
// Do the stuff
function doStuff() {
    var firstNum;
    var secNum;
    var answer;
    var qTemplate;
    var nameArray = jQuery.makeArray(names);
    var itemArray = jQuery.makeArray(items);
    var randName = nameArray[Math.floor(Math.random() * nameArray.length)];
    var randItem = itemArray[Math.floor(Math.random() * itemArray.length)];
	var genAppend = document.getElementById('question');
    var getIdentifier = document.getElementById('identifier');
    var qAppend = document.getElementById('totals');
    var qVal = document.getElementById('totals').innerHTML;
    var qToInt = parseInt(qVal, 10);
    var firstNum = Math.floor(Math.random() * 1000) + 500;
    var secNum = Math.floor(Math.random() * 500) + 100;
    var qType = Math.floor(Math.random() * 4) + 1;

    if (qType == 1) {
        qTemplate = randName + " buys " + firstNum + " " + randItem + " from the store. " + secNum + " " + randItem + " were given away to his friends. How many " + randItem + " does he have left?";
        answer = firstNum - secNum;
    } else if (qType == 2) {
        qTemplate = randName + " buys " + firstNum + " " + randItem + " from the store. " + secNum + " was distributed evenly among a group of people. How many " + randItem + " does each person get such that there won't be any split pieces (truncate to whole number)?";
        answer = ~~(firstNum/secNum);
    } else if (qType == 3) {
        qTemplate = randName + " buys " + firstNum + " " + randItem + " from the store. His friend gives him " + secNum + " " + randItem + " . How many " + randItem + " does he have now?";
        answer = firstNum + secNum;
    } else {
        qTemplate = randName + " buys " + firstNum + " " + randItem + " from the store. The store manager tells him that he won the lottery and he can get " + secNum + " times the " + randItem + " he originally bought. How many " + randItem + " does he have now?";
        answer = firstNum * secNum;
    }
    qIdentifier = window.btoa(answer);
    document.getElementById("yourAnswer").reset();
    document.getElementById('aBody').style.display = "";
    document.getElementById('qBody').style.display = "block";
    document.getElementById('correctAnswer').style.display = "none";
    document.getElementById('incorrectAnswer').style.display = "none";
    qAppend.innerHTML = "";
    qAppend.innerHTML += qToInt+1;
    getIdentifier.innerHTML = "";
    getIdentifier.innerHTML += qIdentifier;
    genAppend.innerHTML = "";
    genAppend.innerHTML += qTemplate;
}
// Prevents page from being refreshed when enter key is pressed
$('form input').on('keypress', function(e) {
    return e.which !== 13;
});
// Checks if answer and identifier are the same
function checkAnswer() {
    var userAnswer = document.getElementById('iAnswer').value;
    var encodeAnswer = window.btoa(userAnswer);
    if (encodeAnswer == qIdentifier) {
        var cAppend = document.getElementById('corrects');
        var cVal = document.getElementById('corrects').innerHTML;
        var cToInt = parseInt(cVal, 10);
        cAppend.innerHTML = "";
        cAppend.innerHTML += cToInt+1;
        document.getElementById('incorrectAnswer').style.display = "none";
        document.getElementById('correctAnswer').style.display = "block";
        document.getElementById('aBody').style.display = "none";
    } else {
        document.getElementById('correctAnswer').style.display = "none";
        document.getElementById('incorrectAnswer').style.display = "block";
        document.getElementById('aBody').style.display = "none";
    }
}