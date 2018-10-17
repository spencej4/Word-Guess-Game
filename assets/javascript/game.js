let randoWords = ["poutine", "blog", "beard", "hashtag", "portlandia", "fixie", "pug", "flannel", "coffee", "selfie", "typewriter", "polaroid", "mustache"];
let initializeDisplay = document.getElementById('initializeDisplay');
let gameDisplay = document.getElementById('gameDisplay');
let winsDisplay = document.getElementById('winsDisplay');
let lossesDisplay = document.getElementById('lossesDisplay');
let imageDisplay = document.getElementById('imageDisplay');
let promptResetDisplay = document.getElementById('promptReset');
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

    selectImage: function () {
        switch (true) {
            case this.secretWord === 'pug':
                $('#image').attr('src', 'assets/images/pug.jpeg');
                break;
            case this.secretWord === 'beard':
                $('#image').attr('src', 'assets/images/beard.jpeg');
                break;
            case this.secretWord === 'poutine':
                $('#image').attr('src', 'assets/images/poutine.jpg');
                break;
            case this.secretWord === 'hashtag':
                $('#image').attr('src', 'assets/images/hashtag.jpg');
                break;
            case this.secretWord === 'typewriter':
                $('#image').attr('src', 'assets/images/typewriter.jpg');
                break;
            case this.secretWord === 'polaroid':
                $('#image').attr('src', 'assets/images/polaroid.jpeg');
                break;
            case this.secretWord === 'mustache':
                $('#image').attr('src', 'assets/images/mustache.jpg');
                break;
            case this.secretWord === 'fixie':
                $('#image').attr('src', 'assets/images/fixie.jpeg');
                break;
            case this.secretWord === 'coffee':
                $('#image').attr('src', 'assets/images/coffee.jpeg');
                break;
            case this.secretWord === 'portlandia':
                $('#image').attr('src', 'assets/images/portlandia.jpg');
                break;
        }

    },

    initializeGame: function () {
        this.active = true; /* make the game active */
        this.selectSecretWord(); /*initialize functions*/
        this.selectImage();
        this.hideInitialize();
        this.showGame();
        this.showWord();
        this.showStats();
        this.createMaxNumGuesses();
        this.createNumGuessesRemaining();
        this.promptReset();
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

    unblurImage: function () {
        // user has not yet guessed the word
        if (!this.userGuessedWord) {
            // decrement blurCounter
            this.blurCounter = this.blurCounter - 1;
            // apply new blurCounter value to imageDisplay css filter
            document.getElementById('imageDisplay').style.filter = `blur(${this.blurCounter}px)`;
        } else if (this.numGuessesRemaining === 0) {
            // user has lost game, unblur the photo
            document.getElementById('imageDisplay').style.filter = `blur(0px)`;
        } else if (this.userGuessedWord) {
            // user has won the game, unblur the photo
            document.getElementById('imageDisplay').style.filter = `blur(0px)`;
        }
    },

    showStats: function () {
        winsDisplay.textContent = (`Wins: ${this.wins}`);
        lossesDisplay.textContent = (`Losses: ${this.losses}`);
        numLettersGuessedDisplay.textContent = (`# of letters guessed: ${this.numLettersGuessed}`);
        numGuessesRemainingDisplay.textContent = (`# of guesses remaining: ${this.numGuessesRemaining}`)
        lettersGuessedDisplay.textContent = (`Letters guessed: ${this.lettersGuessed}`);
        wordDisplay.textContent = (this.answerArray.join(" "));
        console.log(`Answer array: ${this.answerArray}`);
    },

    createMaxNumGuesses: function () {
        this.numTotalGuesses = this.secretWord.length + 3;
        console.log(`Total guesses: ${this.numTotalGuesses}`);
    },

    createNumGuessesRemaining: function () {
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
        for (var j = 0; j < this.secretWord.length; j++) {
            // if an index of secretWord matches letter
            if (this.secretWord[j] === letter) {
                // set the value of this index in answer array to letter
                this.answerArray[j] = letter;
                this.playSuccessSound();
            }
        }
        if (!this.answerArray.includes("_")) {
            console.log(`You've won!`);
            this.userGuessedWord = true;
            this.wins++;
        } else if (this.numLettersGuessed >= this.numTotalGuesses) {
            this.active = false;
            this.losses = this.losses + 1;
            // console.log(`You've guessed too many times. You guessed ${this.numLettersGuessed}`);
            this.reset();
        }
    },

    playSuccessSound: function () {
        let myAudio = document.createElement("audio");
        myAudio.src = "assets/sounds/success.mp3";
        myAudio.play();
    },

    promptReset: function() {
        if(this.userGuessedWord === true) {
            this.promptResetDisplay.style.display = 'block';
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