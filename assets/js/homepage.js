const inputField = document.getElementById("search-input");
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  onSearch();
  document.getElementById("form1").submit();
});

inputField.addEventListener("focus", function () {
  displayLastSearches();
});

function onSearch() {
  let id = document.getElementById("id");
  let cne = document.getElementById("cne");
  let cin = document.getElementById("cin");
  let name = document.getElementById("name");
  let section = document.getElementById("section");

  let searchType = "id";
  if (id.checked) {
    searchType = "id";
  }
  if (cne.checked) {
    searchType = "cne";
  }
  if (cin.checked) {
    searchType = "cin";
  }
  if (name.checked) {
    searchType = "name";
  }
  if (section.checked) {
    searchType = "section";
  }
  let inputField = document.getElementById("search-input");
  let searchText =
    "http://localhost:3000/?dataToSearch=" +
    inputField.value +
    "&searchType=" +
    searchType;
  performSearch(searchText, inputField.value);
}

function performSearch(searchText, key) {
  let lastSearches = localStorage.searchHistory
    ? JSON.parse(localStorage.searchHistory)
    : {};
  lastSearches[key] = searchText;
  if (lastSearches.length > 10) {
    lastSearches.shift();
  }
  localStorage.searchHistory = JSON.stringify(lastSearches);
}

function displayLastSearches() {
  let lastSearches = localStorage.searchHistory
    ? JSON.parse(localStorage.searchHistory)
    : {};
  // Destroy any existing popovers
  $(inputField).popover("dispose");

  const suggestionsContent = document.createElement("div");
  suggestionsContent.classList.add("popover-content");
  lastSearches = Object.entries(lastSearches);
  lastSearches.forEach(function ([key, searchLink]) {
    const suggestionItem = document.createElement("a");
    suggestionItem.style.display = "block";
    suggestionItem.textContent = key;
    suggestionItem.href = searchLink; // Add the appropriate URL or action to the link
    suggestionItem.classList.add("search-suggestion"); // Add a CSS class to style the link if needed
    suggestionsContent.appendChild(suggestionItem);
  });

  // Create the popover using Bootstrap Popover
  $(inputField).popover({
    content: suggestionsContent,
    html: true,
    placement: "bottom",
    trigger: "focus",
  });

  // Show the popover
  $(inputField).popover("show");
}
