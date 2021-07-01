// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const vowels = ['A', 'E', 'I', 'O', 'U'];

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let simpleScoreObj = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: function(word) {
    return simpleScore(word);
  }
};


let vowelBonusScoreObj = { 
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: function(word) {
    return vowelBonusScore(word);
  }
};

let scrabbleScoreObj = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoringFunction: function(word) {
    return scrabbleScore(word);
  }
}

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
   console.log();
   let wordToScore = input.question("Enter a word to score: ");
   let scorer = scorerPrompt();
   scrabbleScore = scorer.scoringFunction(wordToScore);
   console.log();
   console.log(`Score for '${wordToScore}': ${scrabbleScore}`);

};

let simpleScore = function(word) {
  let points = word.length;
  return points;
};


let vowelBonusScore = function(word) {
  let points = 0;
  word = word.toUpperCase();
  for(i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      points += 3;
    } else {
      points ++;
    }
  }

  return points;
};

let scrabbleScore = function(word) {
  word = word.toLowerCase();
  let points = 0;
  for(i = 0; i < word.length; i++) {
    let letter = word[i];
    points = points + newPointStructure[letter];
  }
  return points;
};

const scoringAlgorithms = [simpleScoreObj, vowelBonusScoreObj, scrabbleScoreObj];


function scorerPrompt() {
  console.log("which scoring algorithm would like to use \n");

  for (i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
  }

  let value = input.question("Enter 0, 1, or 2: ");
  return scoringAlgorithms[value];
}

function transform(obj) {
  let newObj = {};
  for (const key in obj) {
    for (i = 0; i < obj[key].length; i++) {
      let newKey = obj[key][i].toLowerCase();
      newObj[newKey] = Number(key);
    }
  }
  return newObj;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

