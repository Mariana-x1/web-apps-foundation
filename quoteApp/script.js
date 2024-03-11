const quoteDisplay = document.querySelector(".quote");
const authorDisplay = document.querySelector(".author");
const newQuoteBtn = document.querySelector("#new-quote-btn");

// Event listener for the button to fetch a random quote
newQuoteBtn.addEventListener("click", fetchRandomQuote);

// Display a default static quote
const defaultQuote =
  "You can't use up creativity.  The more you use, the more you have.";
const defaultAuthor = "Maya Angelou";

quoteDisplay.textContent = defaultQuote;
authorDisplay.textContent = `- ${defaultAuthor}`;

// Function to fetch a random quote from the API
async function fetchRandomQuote() {
  try {
    const response = await fetch("https://dummy-apis.netlify.app/api/quote");
    const data = await response.json();

    // Update the quote and author elements with the fetched data
    quoteDisplay.textContent = data.quote;
    authorDisplay.textContent = `- ${data.author}`;
  } catch (error) {
    console.error("Error fetching quote:", error);
    // Handle error gracefully, e.g., display a message to the user
    quoteDisplay.textContent = "Failed to fetch quote. Please try again later.";
    authorDisplay.textContent = "";
  }
}
