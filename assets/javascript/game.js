window.onload= function () {
    //define all necessary variables.
    var alphabet=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var word;
    var guess;
    var guesses=[];
    var lives;
    var correctGuesses;
    var space;
    var showLives=document.getElementById("lives");
    

    //create working buttons for alphabetical choices.
    var buttons=function(){
        myButtons=document.getElementById("buttons");
        letters=document.createElement('ul');

        for (var i=0; i<alphabet.length; i++){
            letters.id="alphabet";
            list=document.createElement("li");
            list.id="letter";
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }

    //create on key up event to start game
    document.onkeyup= function(event) {
        if (event.keyCode >= 65 && event.keyCode <=90) {
            guesses = event.key
            function forceLower(guesses){
                guesses.value = guesses.value.toLowerCase();
            }
        }
    }

    //create area to store guessed letters
    result=function(){
        wordHold=document.getElementById("hold");
        correct=document.createElement("ul");

        for (var i= 0; i< word.length; i++){
            correct.setAttribute("id", "myword");
            guess=document.createElement("li");
            guess.setAttribute("class", "guess");
            if (word[i] === "-"){
                guess.innerHTML = "-";
                space=1;
            }
            else{
                guess.innerHTML = "_";
            }
            guesses.push(guess);
            wordHold.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // Showcase the amount of lives remaining
    comments=function() {
        showLives.innerHTML = "You have " + lives + "tries left";
        if(lives<1){
            showLives.innerHTML = "Game Over";
        }
        for(var i=0; i <guesses.length; i++){
            if(correctGuesses +space === guesses.length){
                showLives.innerHTML = "You Win!";
            }
        }
    }

    // Create click function for letters
    check=function() {
        list.onclick=function() {
            var guess= (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick=null;
            for (var i=0; i < word.length; i++) {
                if (word[i] === guess) {
                    guesses[i].innerHTML = guess;
                    correctGuesses +=1;
                }
            }
            var j=(word.indexOf(guess));
            if(j === -1){
                lives -= 1;
                comments();
            }
            else {
                comments();
            }
        }
    }

    // Create play function with wordbank
    play = function () {
        words = ["daenerys-targaryen", "jon-snow", "eddard-stark", "tyrion-lannister", "sansa-stark", "jaime-lannister", "arya-stark", "cersei-lannister", "robb-stark", "catelyn-stark", "robert-baratheon", "theon-greyjoy", "khal-drogo", "ygritte", "ramsay-bolton", "sandor-clegane", "gregor-clegane", "petyr-baelish", "joffrey-baratheon", "melisandre", "brienne-of-tarth", "bronn", "bran-stark", "hodor", "samwell-tarly", "jorah-mormont"];

        word=words[Math.floor(Math.random()* words.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        guesses=[];
        lives=10;
        correctGuesses=0;
        space=0;
        result();
        comments();
    }
    play();


    // Make a working reset
    document.getElementById("reset").onclick=function() {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        play();
    }
}