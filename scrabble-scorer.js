// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
};

function transform(oldStructure) {
    let newStructure = {};
    for (const pointValue in oldStructure) {
        oldStructure[pointValue].forEach(letter => {
            newStructure[letter.toLowerCase()] = Number(pointValue);
        });
    }
    return newStructure;
}

let newPointStructure = transform(oldPointStructure);

function oldScrabbleScorer(word) {
    word = word.toUpperCase();
    let letterPoints = "";
    for (let i = 0; i < word.length; i++) {
        for (const pointValue in oldPointStructure) {
            if (oldPointStructure[pointValue].includes(word[i])) {
                letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            }
        }
    }
    return letterPoints;
}

function initialPrompt() {
    console.log("Let's play some scrabble! Enter a word:");
    const word = input.question("Enter a word to score: ");  
    return word; 
}

function simpleScorer(word) {
    return word.length;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
     if ('AEIOU'.includes(word[i])) {
       score += 3;
     } else {
       score += 1;
     }
   }
   return score;
 }


function scrabbleScorer(word) {
    word = word.toLowerCase();
    let score = 0;
    for (let letter of word) {
        score += newPointStructure[letter] || 0;
    }
    return score;
}

const scoringAlgorithms = [
    {
        name: "Simple Score",
        description: "Each letter is worth 1 point.",
        scorerFunction: simpleScorer
    },
    {
        name: "Bonus Vowels",
        description: "Vowels are worth 3 pts, consonants are worth 1 pt.",
        scorerFunction: vowelBonusScorer
    },
    {
        name: "Scrabble",
        description: "Uses a new Scrabble scoring system based on a streamlined structure.",
        scorerFunction: scrabbleScorer
    }
];

function scorerPrompt() {
    console.log("Which scoring algorithm would you like to use?\n");
    console.log("0 - Simple: One point per character");
    console.log("1 - Bonus Vowels: Vowels are worth 3 points, consonants are worth 1 point");
    console.log("2 - Scrabble: Uses the new Scrabble scoring system");
    let choice = input.question("Enter 0, 1, or 2: ");
    return scoringAlgorithms[choice];
}

function runProgram() {
    let word = initialPrompt();
    const scorerObject = scorerPrompt();
    console.log(`Score for '${word}': ${scorerObject.scorerFunction(word)}`);
}



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
