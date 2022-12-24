import Notiflix from "notiflix";

export default class MessagesService {
    constructor() {}

    getNoImagesWarning() {
        return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }

    getInputInfo(e) {
        return Notiflix.Notify.info("Please, enter your request");
    }

    getSuccessInfo(totalHits) {
        return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    }

    getError() {
        return Notiflix.Notify.failure("Something is wrong...");
    }

    getEndOfResults() {
        return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }
}