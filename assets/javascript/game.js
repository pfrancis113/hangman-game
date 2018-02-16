// GLOBAL VARIABLES
//---------------------------------------------------------

// Arrays and variables
var wordOptions = ["david", "abraham", "moses", "isaac", "adam", "caleb", "joshua", "joseph"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];


// Game Counter
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// FUNCTIONS
// --------------------------------------------------------

function startGame (){
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)]; 
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // Resets
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses =[];

    // Populate blanks and successes with appropriate number of blanks
    for (var i=0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    // Change HTML to reflect game conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  "); 
    document.getElementById("guessesRemaining").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;
    //Testing and Debugging
    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

// Compare letters
function checkLetters(letter) {
    // check if letter exists in word  at all
        // alert("Test/Debug " + letter);

    var isLetterInWord = false;

    for (var i=0; i<numBlanks; i++){
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
            // alert("Letter Found Test/Debug")
        }
    }


    // checks where in the word the letter exists and populates blanksAndSuccesses
    if (isLetterInWord){
        for (var i=0; i<numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }

    // if letter not found in word
    else {
        wrongLetters.push(letter);
        guessesLeft--;
    }

    // Testing and Debugging
    console.log(blanksAndSuccesses)
}

function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);
   
    // Update HTML to reflect most recent information
    document.getElementById("guessesRemaining").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" "); 
    
    // check if user won
    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("YOU WON!");
        
        // update win counter in HTML
        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }
    
    //check if user lost
    else if (guessesLeft == 0) {lossCount++;
        alert ("You Lost");
        
        // update loss counter in HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }   
}

    


        
// MAIN PROCESSES
// --------------------------------------------------------

// Initiates code for the first time
startGame();

// Register keyClicks
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    
    // testing/debugging
    console.log(letterGuessed);
}