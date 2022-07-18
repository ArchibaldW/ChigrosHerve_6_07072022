class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
    console.log(photographer)
  }

  createPhotographerCard() {
    const article = document.createElement('article');
    article.innerHTML = 
    `
    <a href="./photographer.html?id=${this._photographer.id}" title="${this._photographer.name}">
      <img src="${this._photographer.picture}" alt="">
      <h2>${this._photographer.name}</h2>
    </a>
    <div>
      <h3>${this._photographer.location}</h3>
      <p>${this._photographer.tagline}</p>
      <p class="price">${this._photographer.price}</p>
    </div>
    `
    return (article);
  }
}