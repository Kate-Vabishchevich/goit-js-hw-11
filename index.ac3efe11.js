({searchForm:document.querySelector("#search-form")}).searchForm.addEventListener("submit",(function(e){e.preventDefault();e.currentTarget.elements.searchQuery.value})),fetch("https://pixabay.com/api/?key=32106886-cb1cc02bd30eab36270ed5df7&q=cat&image_type=photo&orientation=horizontal&safesearch=true").then((e=>e.json())).then(console.log);
//# sourceMappingURL=index.ac3efe11.js.map
