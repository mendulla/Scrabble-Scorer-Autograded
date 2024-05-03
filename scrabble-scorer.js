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

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   const word = input.question("Enter a word to score: ");  // Prompt user to enter a word
   return word  // Display the scores for each letter
};
//simpleScorer function//

function simpleScorer(word) {
   return word.length;
 }

 //vowelBonusScorer function//
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

// scoringAlgorithms array //

const scoringAlgorithms = [
   {
     name: "Simple Score",
     description: "Each letter is worth 1 point.",
     scoringFunction: simpleScorer
   },
   {
     name: "Bonus Vowels",
     description: "Vowels are worth 3 pts, consonants are worth 1 pt.",
     scoringFunction: vowelBonusScorer
   },
   {
     name: "Scrabble",
     description: "Uses the old Scrabble scoring system.",
     scoringFunction: oldScrabbleScorer
   }
 ];

 // scorerPrompt function //
function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n");
   console.log("0 - Simple: One point per character");
   console.log("1 - Bonus Vowels: Vowels are worth 3 points, consonants are worth 1 point");
   console.log("2 - Scrabble: Uses the old Scrabble scoring system");
   let choice = input.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[choice];
}

function transform() {};

let newPointStructure; 

let scrabbleScorer; //this is going to be a function

// runProgram function //

function runProgram() {
  //initialPrompt();
  let word = initialPrompt();
  const scorerObject = scorerPrompt();
  //const word = input.question("Enter a word to score: ");
 console.log(`Score for '${word}': ${scorerObject.scoringFunction(word)}`);
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
