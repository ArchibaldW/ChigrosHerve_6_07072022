class PagePhotographerCard {
    constructor(photographer, htmlElement) {
        this._photographer = photographer
        this._htmlElement = htmlElement
    }

    createPhotographerCard() {
        this._htmlElement.innerHTML =
            `
            <div>
                <h1 tabindex="0">${this._photographer.name}</h1>
                <h2 tabindex="0">${this._photographer.location}</h2>
                <div tabindex="0">${this._photographer.tagline}</div>
            </div>
            <button id="open_contact_btn" class="contact_button">Contactez-moi</button>
            <img tabindex="0" width="150px" src=${this._photographer.picture} alt="Photo de ${this._photographer.name}">
        `
    }
}