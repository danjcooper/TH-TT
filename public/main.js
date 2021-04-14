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
  var deck = await loadDeckDataIntoMemory("/public/data/data.csv");

  // shuffle the order of the deck so it's random
  deck = shuffleDeck(deck);

  // This returns an object with two decks split evenly
  playerDecks = splitDeck(deck);


  var playerOneCards = playerDecks.playerOneDeck
  var playerTwoCards = playerDecks.playerTwoDeck

  document.getElementById('getCardInfo').addEventListener('click', (e) => {
    document.getElementById('name').innerText = `Name: ${playerOneCards[0].name}`
    document.getElementById('appearances').innerText = `Appearances: ${playerOneCards[0].appearences}`
    document.getElementById('dates').innerText = `Number of dates: ${playerOneCards[0].dates}`
    document.getElementById('workEthic').innerText = `Work Ethic: ${playerOneCards[0].workEthic}`
    document.getElementById('playerCardImage').hidden = false;
    document.getElementById('playerCardImage').src = playerOneCards[0].image;
})


}

app();

document.getElementById('getCardInfo').addEventListener('click', (e) => {
    document.getElementById('name').innerText = playerDecks.playerOneDeck.name
    document.getElementById('appearances').innerText
    document.getElementById('dates').innerText
    document.getElementById('workEthic').innerText
})
