

const refs = {
    searchForm: document.querySelector("#search-form")
}

const API_KEY = '32106886-cb1cc02bd30eab36270ed5df7'

refs.searchForm.addEventListener("submit", onSearch)

function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.currentTarget.elements.searchQuery.value
}

fetch("https://pixabay.com/api/?key=32106886-cb1cc02bd30eab36270ed5df7&q=cat&image_type=photo&orientation=horizontal&safesearch=true").then(response => response.json()).then(console.log);