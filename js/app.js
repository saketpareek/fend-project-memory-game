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
 })
