import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
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
const simpleLightBox = new SimpleLightbox(".gallery a", {
    captionsData: 'alt',
    captionDelay: 250,
});

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

        if (totalHits === 0) {
        return messagesService.getNoImagesWarning();
        }

        messagesService.getSuccessInfo(totalHits);

        renderPictures(hits);
        simpleLightBox.refresh();
        loadMoreBtn.show();
    } catch (error){
        return messagesService.getError();
    }
}

async function onLoadMoreBtn() {
    loadMoreBtn.loading();
    try {
        const { hits } = await imagesApiService.fetchImages();
        renderPictures(hits);
        simpleLightBox.refresh();
        loadMoreBtn.endLoading();

        if (hits.length < imagesApiService.perPage) {
            loadMoreBtn.hide();
            messagesService.getEndOfResults();
        }
    } catch (error){
        return messagesService.getError();
    }
}

function renderPictures(data) {
    const markupGallery = getImagesMarkup(data);
    refs.gallery.insertAdjacentHTML("beforeend", markupGallery)
}

function clearImageGallery() {
    refs.gallery.innerHTML = "";
}
