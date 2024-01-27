const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitte");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")

let apiQuotes = [];

function newQuote(){
    loading();
    const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    quoteText.textContent = quotes.text;
    if(!quotes.author){
        quoteAuthor.textContent = "Unkwon";
    }
    else{
        quoteAuthor.textContent = quotes.author;
    }
    complete();
    
}

async function getQuotes(){
    loading();
    const apiUrl = "https://type.fit/api/quotes";

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error){
        alert(error);
    }
}


function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, "_blank");
}

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();