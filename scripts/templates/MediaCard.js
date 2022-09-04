class MediaCard {
  constructor(media) {
    this._media = media
  }

  createPhotographerCard() {
    const article = document.createElement('article');
    article.innerHTML = ''
    if (this._media.picture) {
      article.innerHTML += `
      <img class="media" src="/assets/medias/${this._media.photographerId}/${this._media.picture}" alt="">`
    } else if (this._media.video) {
      article.innerHTML += `<video class="media"><source src="/assets/medias/${this._media.photographerId}/${this._media.video}"></source></video>`
    }
    article.innerHTML +=
      `
      <div class="flex justify_space_between" data-date="${this._media.date}" data-id="${this._media.id}">
        <div class="article_title">${this._media.title}</div>
        <div class="article_likes hide_full"><span class="likes_number">${this._media.likes}</span><i class="fa-solid fa-heart"></i><i class="fa-regular fa-heart"></i></div>
      </div>
      `
    return (article);
  }
}