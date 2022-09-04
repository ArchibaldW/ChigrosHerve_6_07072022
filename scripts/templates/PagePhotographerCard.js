class PagePhotographerCard {
    constructor(photographer, htmlElement) {
        this._photographer = photographer
        this._htmlElement = htmlElement
    }

    createPhotographerCard() {
        this._htmlElement.innerHTML =
            `
            <div>
                <h1>${this._photographer.name}</h1>
                <h2>${this._photographer.location}</h2>
                <div>${this._photographer.tagline}</div>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src=${this._photographer.picture}>
        `
    }
}