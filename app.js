const url = "https://type.fit/api/quotes";

async function getDataJSON() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const searchField = document.querySelector(".search__field");
    const submitButton = document.querySelector(".submit__button");
    const randomButton = document.querySelector(".random");
    const quoteContainer = document.querySelector(".quote__container");
    const quote = quoteContainer.querySelector(".quote");
    const quoteText = quote.querySelector("h1");
    const quoteName = quote.querySelector("p");
    const quoteSub = document.querySelector("sub");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let currentIndex = 0; // Track the current index

    const updateQuote = (index) => {
      const result = data[index];
      const quoteValue = result.text;
      const quoteAuthor = result.author;
      quoteSub.innerText = index;
      quoteText.innerText = "'" + quoteValue + "'";
      quoteName.innerText = quoteAuthor;
    };

    // Initial quote display
    updateQuote(currentIndex);

    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      const val = parseInt(searchField.value);

      if (!isNaN(val) && val >= 0 && val < data.length) {
        currentIndex = val; // Update the current index
        updateQuote(currentIndex);
      } else {
        console.log("Invalid index or no matching result found.");
      }

      searchField.value = ""; // Clear the search field after submitting
    });

    prevButton.addEventListener("click", () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = data.length - 1;
      }
      updateQuote(currentIndex);
    });

    nextButton.addEventListener("click", () => {
      currentIndex++;
      if (currentIndex >= data.length) {
        currentIndex = 0;
      }
      updateQuote(currentIndex);
    });

    randomButton.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * data.length);
      currentIndex = randomIndex;
      updateQuote(currentIndex);
    });
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

getDataJSON();