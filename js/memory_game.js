const cards = document.querySelectorAll('.memory-card');

var hasFlippedCard = false;
var firstCard, secondCard;
var lockBoard = false;

function flipCard()
{
    if (lockBoard) return;//false so execute normally
    if (this === firstCard) return;//normal so execute

    this.classList.toggle('flip');

    if(!hasFlippedCard)
    {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

        //second click
        secondCard = this;
        checkForMatch();
}

function checkForMatch() //do cards match
{
    var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards()//if cards match 
{
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetBoard();
}

function unflipCards()//if cards dont match...then flip back
{
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard()
{
    [hasFlippedCard, lockBoard] = [false, false]; //hasFlippedCard = false...etc
    [firstCard, secondCard] = [null,null];
}

(function shuffleCards()
{
    cards.forEach(
        card => 
        {
            var randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        }
    );
})();//Imidiety invoked function expression(it will execute right after its defination...)

cards.forEach(card => card.addEventListener('click', flipCard));