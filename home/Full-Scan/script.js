const searchButton = document.getElementById("submit-button");
const searchLoader = document.getElementById("search-loader");
const searchHandler = document.getElementById("search-object");


    // Add the click event listener
searchButton.onclick = () => {
      // Toggle the "none-show" class on the loader
      setTimeout(() => {
        searchLoader.classList.remove("none-show");
      }, 500);
};
searchHandler.onclick = () => {
    searchLoader.classList.add("none-show");
};