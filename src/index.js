import axios from "axios";
import Notiflix from "notiflix";
import { ImagesApiService } from "./js/images-service";
import MessagesService from "./js/messages";
import { getImagesMarkup } from "./js/images-markup";
import { LoadMoreBtn } from "./js/loadMoreBtn";

const refs = {
    searchForm: document.querySelector("#search-form"),
    gallery: document.querySelector(".gallery"),
};

const imagesApiService = new ImagesApiService();
const messagesService = new MessagesService();
const loadMoreBtn = new LoadMoreBtn("load-more", onLoadMoreBtn);

refs.searchForm.addEventListener("submit", onFormSubmit);

async function onFormSubmit(e) {
    e.preventDefault();

    clearImageGallery(); //очищаємо поле вводу
    imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    if (imagesApiService.query === "") {
        return messagesService.getInputInfo();
    }
    imagesApiService.resetPage();

    try {
        const { hits, totalHits } = await imagesApiService.fetchImages();
        renderPictures(hits);
        loadMoreBtn.show();
    } catch (error){
        return Notiflix.Notify.failure("Something is wrong...")
    }
}

async function onLoadMoreBtn() {
    loadMoreBtn.loading();
    try {
        const { hits, totalHits } = await imagesApiService.fetchImages();
        getImagesMarkup(hits);
        loadMoreBtn.endLoading();
    } catch (error){
        return Notiflix.Notify.failure("Something is wrong...")
    }

}

function renderPictures(data) {
    const markupGallery = getImagesMarkup(data.hits);
    refs.gallery.insertAdjacentHTML("beforeend", markupGallery)
}

function clearImageGallery() {
    refs.gallery.innerHTML = "";
}
