import Notiflix from "notiflix";

export default class MessagesService {
    constructor() {

    }

    getNoImagesWarning() {
        return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }

    getInputInfo(e) {
        return Notiflix.Notify.info("Please, enter your request");
    }
}