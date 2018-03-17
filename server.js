//always include the following 6 lines in Node server
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//for accepting incoming POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//sets up director called "public" that is served by web server
app.use(express.static('public'))

let flashcards = []; //array of flashcard objects
let id = 0;

//if server gets a GET request at this URL it sends the array of items
app.get('/api/flashcards', (req, res) => {
  res.send(flashcards);
});

//if server gets POST request at this URL it reates and returns item
app.post('/api/flashcards', (req, res) => {
  id = id + 1;
  let flashcard = {id:id, frontText:req.body.frontText, backText:req.body.backText, memorized:req.body.memorized, cardHeader:req.body.cardHeader};
  flashcards.push(flashcard);
  res.send(flashcard);
});

//updates item
app.put('/api/flashcards/:id', (req, res) => { //colon means that there is number following it
  let id = parseInt(req.params.id);
  let flashcardsMap = flashcards.map(flashcard => { return flashcard.id; });
  let index = flashcardsMap.indexOf(id);
  let flashcard = flashcards[index];
  flashcard.memorized = req.body.memorized;
  flashcard.frontText = req.body.frontText;
  flashcard.backTezt = req.body.backText;
  flashcard.cardHeader = req.body.cardHeader;
  res.send(item);
});

app.delete('/api/flashcards/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = flashcards.map(flashcard => { return flashcard.id; }).indexOf(id); //gets index of id
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist"); //sends error code
    return;
  }
  flashcards.splice(removeIndex, 1);
  res.sendStatus(200);
});

//Change port number for different apps
app.listen(3001, () => console.log('Server listening on port 3001!'))