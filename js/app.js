/*
* Create a list that holds all of your cards
*/
let cards = [];
cards = $('.deck').find('i');


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

cards = shuffle(cards);

$('.card').each(function(index){
 $(this).html(cards[index]);
});


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/


 /*
Create arrays and variables as follows:
- Let x,
- Array OpenList tht contains the currently open cards,
- Array matchedCards tht contains all the matched cards,
- Let myFuncCalls initialized to 0,
- Let lock initialized to false,
- Let seconds initialized to 60,
- Let previousTarget set to NULL,
- Let movesCounter set to NULL,
- Let starsCount set to 3
*/
let x, openList = [], matchedCards = [], myFuncCalls = 0, lock = false, seconds = 60, previousTarget = null, movesCounter = null, starsCount = 3;


// Displays cards symbol
function displayCard(evt) {
 $(evt).find('i').css('transform', 'rotateY(180deg)');
 $(evt).addClass('open show');
}


// Preventing inner element of card to bubble up
$('.deck').find('i').on('click',function(event){
  event.stopPropagation();
});

/*
Function matchCards that executes the following:
Adds CSS class 'yes' to perform animation on cards that have matched
Adds CSS class 'match' to show the cards have matched
Push matched cards to array matchedCards
Increment moves by 1
*/
function matchCards(card1, card2) {
 card1.parent().addClass('yes');
 card2.parent().addClass('yes');
 card1.addClass('match');
 card2.addClass('match');
 matchedCards.push(card1, card2);
 myFuncCalls = myFuncCalls + 1;
 $('.moves').html(myFuncCalls);
}

/*
Function unmatchCards that executes the following:
Adds CSS class 'no' to perform animation on cards that have not matched
Adds CSS class 'unmatch' to show the cards have matched
Remove class 'no', 'unmatch', 'open' and 'show' to reset the cards to their original position after 600ms
Increment moves by 1
Shows winning modal if matchedCards fill the grid
*/
function unmatchCards(card1, card2) {
 card1.parent().addClass('no');
 card2.parent().addClass('no');
 card1.addClass('unmatch');
 card2.addClass('unmatch');
 setTimeout(function(){
   card1.parent().removeClass('no');
   card2.parent().removeClass('no');
   card1.removeClass('unmatch');
   card2.removeClass('unmatch');
 }, 600);
 setTimeout(function(){
   card1.removeClass('open show');
   card2.removeClass('open show');
 }, 600);
 myFuncCalls = myFuncCalls + 1;
 $('.moves').html(myFuncCalls);
}

// function empties array that resets the value of openList array to 0
function emptyArray() {
 openList.length = 0;
}

/*
Function on clicking any card that executes the following:
- If card is already opened, disable clicking on that card,
- Starts function gameTimer to start the timer
- Execute displayCard function to display the card that is clicked and add the card to openList array by executing addCard function
- If clicked card is equal to NULL, then discard default action on card else check if previously clicked card is equal to the card clicked now, if yes, run function matchCards and empty openList and if no, run function unmatchCards and empty openList
- Decrement stars from starsCount and add difefrent font awesome classes to stars when a number of moves have been executed
*/
$('.card').on('click',function(evt){
 if($(this).hasClass('open')) {
   return false;
 }
 gameTimer();
 displayCard(evt.target);
 addCard($(this));
 if(this === previousTarget) {
   evt.preventDefault();
 } else {
   for (var i=0; i<openList.length; i++) {
     curr = $(openList[i]);
     prev = $(openList[i-1]);
   }
   if (prev.html()) {
     if (curr.html() === prev.html()) {
       matchCards(prev, curr);
       emptyArray();
     }
     else if (prev.html() !== curr.html()) {
       unmatchCards(prev, curr);
       emptyArray();
     }
   }
 }
 if (myFuncCalls >= 18) {
   $('.stars').children('li:nth-child(3)').find('i').removeClass('fas').addClass('far');
   starsCount = 2;
 } if (myFuncCalls >=24) {
   $('.stars').children('li:nth-child(2)').find('i').removeClass('fas').addClass('far');
   starsCount = 1;
 }
 previousTarget=this;
 return false;
});

/*
Function gameTimer that executes the following:
- Executes function currTimer that decrements seconds by 1 and if seconds reach less then 10, it shows the seconds text in red
- When time is up, the showModal function is run
*/

function gameTimer() {
  function currTimer() {
    $('.countdowndiv').text('00:' + --seconds);
    if (seconds < 10) {
      $('.countdowndiv').text('00:0' + seconds);
      $('.countdowndiv').addClass('deadline');
    }
    showModal();
   }
  if (!lock) {
    lock = true;
    currTimer();
    x = setInterval(currTimer,1000);
  }
}
