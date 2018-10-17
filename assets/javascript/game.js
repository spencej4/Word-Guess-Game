let randoWords = ["poutine", "blog", "beard", "stumptown", "hashtag", "portland", "fixie", "pug", "coldpress", "flannel", "coffee", "selfie", "typewriter", "polaroid", "mustache", "vaporware"];
let initializeDisplay = document.getElementById('initializeDisplay');
let gameDisplay = document.getElementById('gameDisplay');
let winsDisplay = document.getElementById('winsDisplay');
let lossesDisplay = document.getElementById('lossesDisplay');
let imageDisplay = document.getElementById('imageDisplay');
let numLettersGuessedDisplay = document.getElementById('numLettersGuessedDisplay');
let numGuessesRemaining = document.getElementById('numGuessesRemaining');
let lettersGuessedDisplay = document.getElementById('lettersGuessedDisplay');
let wordDisplay = document.getElementById('wordDisplay');

// inform user to press any key to start the game
initializeDisplay.textContent = "Press Any Key To Get Started";

document.onkeyup = function (event) {
    let letter = event.key;

    if (!game.active) {
        game.initializeGame(); /* initialize the game */
    } else if (game.active) {
        game.addLetter(letter);
        game.unblurImage();
        game.showStats();
    }
}

let game = {
    active: false,
    wins: 0,
    losses: 0,
    userGuessedWord: false,
    numLettersGuessed: 0,
    numGuessesRemaining: 0,
    blurCounter: 30,
    lettersGuessed: [],
    answerArray: [],
    secretWord: "",
    numTotalGuesses: 0,

    hideInitialize: function () {
        initializeDisplay.style.display = "none";
    },

    selectSecretWord: function () {
        this.secretWord = randoWords[Math.floor(Math.random() * randoWords.length)];
        console.log(this.secretWord);
    },

    initializeGame: function () {
        this.active = true; /* make the game active */
        this.selectSecretWord(); /*initialize functions*/
        this.hideInitialize();
        this.showGame();
        this.showWord();
        this.showStats();
        this.createMaxNumGuesses();
        this.createNumGuessesRemaining();
    },

    showGame: function () {
        gameDisplay.style.display = 'block';
    },

    showWord: function () {
        // wordDisplay.textContent = ""; /* reset textContent to display nothing */
        for (var i = 0; i < this.secretWord.length; i++) {
            // wordDisplay.textContent += (`_ `); /* draw underlines for the word */
            this.answerArray[i] = "_";
        }
    },

    unblurImage: function() {
        // decrement counter
        this.blurCounter = this.blurCounter - 5;
        // apply new counter value to imageDisplay css filter
        document.getElementById('imageDisplay').style.filter = `blur(${this.blurCounter}px)`;
    },

    showStats: function () {
        winsDisplay.textContent = (`Wins: ${this.wins}`);
        lossesDisplay.textContent = (`Losses: ${this.losses}`);
        numLettersGuessedDisplay.textContent = (`Number of letters guessed: ${this.numLettersGuessed}`);
        numGuessesRemainingDisplay.textContent = (`Number of guesses remaining: ${this.numGuessesRemaining}`)
        lettersGuessedDisplay.textContent = (`Letters guessed: ${this.lettersGuessed}`);
        wordDisplay.textContent = (this.answerArray.join(" "));
        console.log(`Answer array: ${this.answerArray}`);
    },

    createMaxNumGuesses: function () {
        this.numTotalGuesses = this.secretWord.length + 3;
        console.log(`Total guesses: ${this.numTotalGuesses}`);
    },

    createNumGuessesRemaining: function() {
        this.numGuessesRemaining = this.numTotalGuesses;
    },

    addLetter: function (letter) {
        // if letter is not in letters guessed array
        if (this.lettersGuessed.includes(letter) === false) {
            // add it to array
            this.lettersGuessed.push(letter);
            // update array counters
            this.numLettersGuessed = this.numLettersGuessed + 1;
            this.numGuessesRemaining = this.numGuessesRemaining - 1;
            // then call runComparison
            this.runComparison(letter);
        } else {
            // alert user they've already guessed that letter
            $('#flash').flash();
        }
    },

    runComparison: function (letter) {
            // loop through secretWord string
            for (var j=0; j < this.secretWord.length; j++) {
                // if an index of secretWord matches letter
                if (this.secretWord[j] === letter) {
                    // set the value of this index in answer array to letter
                    this.answerArray[j] = letter;
            }
            
        }
        if (!this.answerArray.includes("_")){
            alert(`You've won!`);
        }
        else if (this.numLettersGuessed >= this.numTotalGuesses) {
            this.active = false;
            this.losses = this.losses + 1;
            // console.log(`You've guessed too many times. You guessed ${this.numLettersGuessed}`);
            this.reset();
        }
    },

    reset: function () {
        console.log('reset has run');
        this.userGuessedWord = false;
        this.lettersGuessed = [];
        this.numLettersGuessed = 0;
        this.secretWord = [];
        this.answerArray = [],
        this.numTotalGuesses = 0;
        // wordDisplay.textContent = "";
        this.initializeGame();
    }
};