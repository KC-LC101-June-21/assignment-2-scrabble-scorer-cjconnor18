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

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  word = input.question("Enter a word to score: ");

   return word;
};

let simpleScore = function(word){
  let points = 0;
  for(i=0; i<word.length;i++){
    points++;
  }
  console.log(`Score for '${word}': ${points}`)
  return points;
};

let vowelBonusScore = function(word){
  word = word.toLowerCase();
  let points = 0;
  let vowels = ['A', 'E', 'I', 'O', 'U'].map((vowel) => vowel. toLowerCase()); //needed change here
  for(i = 0; i < word.length; i++){
    if(vowels.includes(word[i].toLowerCase())) {
      points+=3; 
    } else {
      points+=1;
    }
  }
  console.log(`Score for '${word}': ${points}`)
  return points;
}

let scrabbleScore = function(word, newPointStructure){
  let points = 0;
  let wordArray = word.toLowerCase().split("");

  //removed
  for (let letter in newPointStructure){
    for(i = 0; i < wordArray.length; i++){
      if(letter === wordArray[i]) {
        points += newPointStructure[letter];
      }
    }
  }

  //added for loop
  // for(let i = 0; i < word.length; i++) {
  //   points += newPointStructure[word[i]];
  // }
  

  console.log(`Score for '${word}': ${points}`);
  return points;
};

//Scoring Algorithm objects
let scoringAlgorithm1 = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore
};

let scoringAlgorithm2 = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScore
};

let scoringAlgorithm3 = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: scrabbleScore
};


const scoringAlgorithms = [scoringAlgorithm1, scoringAlgorithm2, scoringAlgorithm3];

//scorerPrompt function
function scorerPrompt() {
  console.log('Which scoring algorithm would you like to use?\n');
  console.log('0 - Simple: One point per character');
  console.log('1 - Vowel Bonus: Vowels are worth 3 points');
  console.log('2 - Scrabble: Uses Scrabble point system.')
  info = input.question('Enter 0, 1, or 2: ');
  
  if(info === '0'){
    simpleScore(word);
  } else if (info === '1') {
    vowelBonusScore(word);
  } else if (info === '2') {
    scrabbleScore(word, newPointStructure);
  }

  return info;
}
//transform function
function transform(oldPointStructure) {
  let newPointStructure = {};

  for (let letter in oldPointStructure) {
    // added let before i(did not approach this one)
    // needed toLowerCase when saving new keys
    for (let i = 0; i < oldPointStructure[letter].length; i++){
      newPointStructure[oldPointStructure[letter][i].toLowerCase()] = Number(letter);
    }
  }
  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);
console.log(newPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
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

