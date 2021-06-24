// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

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
  console.log("Let's play some scrabble!");
  let currentWord = input.question("Enter a word:");
  // let score = oldScrabbleScorer(currentWord);
  // console.log(score);

  return currentWord;
};

let simpleScore = function (word) {
  return word.length;
};

let vowelBonusScore = function (word) {
  let score = 0;
  for(let i = 0; i < word.length; i++) {
    if(word[i].toLowerCase() === 'a'||
    word[i].toLowerCase() === 'e'||
    word[i].toLowerCase() === 'i'||
    word[i].toLowerCase() === 'o'||
    word[i].toLowerCase() === 'u') {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};

let scrabbleScore = function (word, structure = newPointStructure) {
  console.log(structure);
  let score = 0;
  for(let i = 0; i < word.length; i++) {
    console.log(typeof score);
    score += Number(structure[word[i]]);
  }
  return score;
};

const scoringAlgorithms = [
  {
    name : "Simple Score",
    description : "Each letter is worth 1 point", 
    scoreFunction : simpleScore
  }, 
  {
    name : "Vowel Bonus Score",
    description : "Vowels are 3 pts, consonants are 1 pt.",
    scoreFunction : vowelBonusScore
  }, 
  {
    name: "Scrabble Score",
    description: "The traditional scoring algorithm.",
    scoreFunction : scrabbleScore
  }
];

function scorerPrompt() {
  console.log("Which scorer would you like to use? ");
  for(let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i} : ${scoringAlgorithms[i].name} - ${scoringAlgorithms[i].description}`);
  }

  let chosenIndex = input.question("Which number do you choose?");
  while(Number(chosenIndex) < 0 || 
      Number(chosenIndex) >= 3 ||
      isNaN(chosenIndex)) {
    chosenIndex = input.question("Invalid: Please choose 0 - 2: ");
  }
  return scoringAlgorithms[Number(chosenIndex)];
}

function transform(structure) {
  let newStructure = {};
  for(let num in structure) {
    for(let i = 0; i < structure[num].length; i++) {
      newStructure[structure[num][i].toLowerCase()] = Number(num);
    }
  }

  return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let currentWord = initialPrompt();
   let scorerObject = scorerPrompt();
   let score = scorerObject.scoreFunction(currentWord);
   console.log(typeof score);
   console.log(`Users score for ${currentWord} is ${score}`);
   
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

