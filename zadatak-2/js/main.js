let currentQuoteIndex = -1;
const quotesObj = {
  1: { quote: "glupi quote 1", author: "glupi author 1" },
  2: { quote: "glupi quote 2", author: "glupi author 2" },
  3: { quote: "glupi quote 3", author: "glupi author 3" },
  4: { quote: "glupi quote 4", author: "glupi author 4" },
  5: { quote: "glupi quote 5", author: "glupi author 5" },
  6: { quote: "glupi quote 6", author: "glupi author 6" },
  7: { quote: "glupi quote 7", author: "glupi author 7" },
  8: { quote: "glupi quote 8", author: "glupi author 8" },
  9: { quote: "glupi quote 9", author: "glupi author 9" },
  10: { quote: "glupi quote 10", author: "glupi author 10" },
};

function getRandomQuote() {
  let randomQuoteIndex;
  do {
    randomQuoteIndex =
      Math.floor(Math.random() * Object.keys(quotesObj).length) + 1;
  } while (randomQuoteIndex === currentQuoteIndex);

  currentQuoteIndex = randomQuoteIndex;
  return quotesObj[currentQuoteIndex];
}

function displayRandomQuote() {
  const randomQuote = getRandomQuote();

  const quoteParagraph = document.getElementById("quote");
  const authorParagraph = document.getElementById("author");

  if (quoteParagraph && authorParagraph) {
    quoteParagraph.textContent = randomQuote.quote;
    authorParagraph.textContent = randomQuote.author;
  } else {
    console.error("Paragraph element not found.");
  }
}

function generateNewQuote() {
  displayRandomQuote();
}

document.addEventListener("DOMContentLoaded", displayRandomQuote);

const newQuoteBtn = document.getElementById("newQuoteBtn");
if (newQuoteBtn) {
  newQuoteBtn.addEventListener("click", generateNewQuote);
} else {
  console.error("Button element not found.");
}
