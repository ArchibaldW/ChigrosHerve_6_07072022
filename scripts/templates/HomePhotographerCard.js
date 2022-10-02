class HomePhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
  }

  createPhotographerCard() {
    const article = document.createElement('article');
    article.id='photographer-'+this._photographer.id
    article.innerHTML = 
    `
    <a href="./photographer.html?id=${this._photographer.id}" title="${this._photographer.name}">
      <img src="${this._photographer.picture}" alt="Photo de ${this._photographer.name}">
      <h2>${this._photographer.name}</h2>
    </a>
    <div>
      <h3 tabindex="0">${this._photographer.location}</h3>
      <p tabindex="0">${this._photographer.tagline}</p>
      <p tabindex="0" class="price">${this._photographer.price}</p>
    </div>
    `
    return (article);
  }
}