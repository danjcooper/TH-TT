var playerOneCards 
var playerTwoCards 

async function loadDeckDataIntoMemory(inputFileLink) {
  if (inputFileLink == undefined) {
    return "Error";
  }

  // Get hte file and load it into memory
  const data = await fetch(inputFileLink);
  const text = await data.text();

  // create an array for each line.
  let parsedText = text.split("\n");

  // Take the header line and put it into an array. this is then used to name the object elements
  let catagories = parsedText[0].split(",");

  // This cleans up any empty returns that can be left over
  for (let i = 0; i < catagories.length; i++) {
    catagories[i] = catagories[i].replace(/\r/g, "");
  }

  // Split each line into an array
  for (let i = 0; i < parsedText.length; i++) {
    parsedText[i] = parsedText[i].split(",");
  }

  var temp = {};
  var outputObject = [];

  // start the loop at 1 to cut off the header
  for (let i = 1; i < parsedText.length; i++) {
    for (let j = 0; j < catagories.length; j++) {
      temp[catagories[j]] = parsedText[i][j];
    }
    outputObject.push(temp); // Push the temp object into the output array of objects
    temp = {}; // clear Temp
  }

  //console.table(outputObject)

  console.log(outputObject)
  return outputObject;
}

function shuffleDeck(cardDeck) {
  let outputDeck = [];
  let usedNumbers = [];

  while (usedNumbers.length != cardDeck.length) {
    // create a random index
    let randomNumber = Math.floor(Math.random() * cardDeck.length);

    // if the used numbers array doesn't have the random number in it's used for the shuffle
    if (usedNumbers.indexOf(randomNumber) == -1) {
      usedNumbers.push(randomNumber);
      outputDeck.push(cardDeck[randomNumber]);
    }
  }
  return outputDeck;
}

function splitDeck(deck) {
  // find the center of the array
  let center = Math.ceil(deck.length / 2);

  let playerDecks = {};
  playerDecks.playerOneDeck = deck.slice(center);
  playerDecks.playerTwoDeck = deck.slice(0, center);

  return playerDecks;
}

async function app() {
  // load the deck into memory
  var deck = await loadDeckDataIntoMemory("/public/data/test.csv");

  // shuffle the order of the deck so it's random
  deck = shuffleDeck(deck);

  // This returns an object with two decks split evenly
  playerDecks = splitDeck(deck);


  playerOneCards = playerDecks.playerOneDeck
  playerTwoCards = playerDecks.playerTwoDeck

  /* //TODO 
    Now the data has been parsed & each player has a deck

    This is where the gameplay will start.
  */



console.table(playerOneCards)
console.table(playerTwoCards)

loadTopCardIntoDOM()


}

app();

// This 
$('p').click(function () {
  if ($(this).attr('id') == 'name') {
    //alert('here you should load up the player info.')
    $('.description').hide()
    console.log('h')
    return
  }
  let value = $(this).attr('id')



  if (parseInt(playerOneCards[0][value]) > parseInt(playerTwoCards[0][value])) {
    /*
    console.log(playerOneCards[0].name, playerOneCards[0][value])
    console.log(playerTwoCards[0].name, playerTwoCards[0][value])
    */
    console.log('player wins')
    updatePlayerDecks('player')
  } else if (parseInt(playerOneCards[0][value]) < parseInt(playerTwoCards[0][value])) {
    /*
    console.log(playerOneCards[0].name, playerOneCards[0][value])
    console.log(playerTwoCards[0].name, playerTwoCards[0][value])
    */
    console.log('computer wins')
    updatePlayerDecks('com')
    
  } else {
    console.log('draw')
    updatePlayerDecks('draw')
  }
    
  

});


function loadTopCardIntoDOM() {
  $('#name').text(playerOneCards[0].name)

  $('#dates .attribute').text(playerOneCards[0].dates)
  $('#episodes .attribute').text(playerOneCards[0].episodes)
  $('#workEthic .attribute').text(playerOneCards[0].workEthic)
  $('#laziness .attribute').text(playerOneCards[0].laziness)
  $('#whoability .attribute').text(playerOneCards[0].whoability)
  $('#drama .attribute').text(playerOneCards[0].drama)

  // Update the deck sizes
  $('#playerOneDeckSize').text(playerOneCards.length + ' cards')
  $('#playerTwoDeckSize').text(playerTwoCards.length + ' cards')
}

function updatePlayerDecks(winner) {
  if (winner == 'player') {
    playerOneCards.push(playerTwoCards[0]) // add the players card to the bottom of your stack
    playerTwoCards.shift() // remove the first element from the losing list
    playerOneCards.push(playerOneCards[0]) // put the top card to the bottom of the list
    playerOneCards.shift() // remove the first element from the losing list aka the card that's now at the bottom
    console.log(playerOneCards,playerTwoCards)
    loadTopCardIntoDOM()
  } else if (winner == 'com') {
    playerTwoCards.push(playerOneCards[0]) // add the players card to the bottom of your stack
    playerOneCards.shift() // remove the first element from the losing list
    playerTwoCards.push(playerTwoCards[0]) // put the top card to the bottom of the list
    playerTwoCards.shift() // remove the first element from the losing list aka the card that's now at the bottom
    console.log(playerOneCards,playerTwoCards)
    loadTopCardIntoDOM()
  } else {
    playerOneCards.push(playerTwoCards[0]) // add the players card to the bottom of your stack
    playerOneCards.shift() // remove the first element from the losing list
    playerTwoCards.push(playerTwoCards[0]) // add the players card to the bottom of your stack
    playerTwoCards.shift() // remove the first element from the losing list
    loadTopCardIntoDOM()
  }
}

$('button').click(function () {
  console.log('ji')
  app()
})