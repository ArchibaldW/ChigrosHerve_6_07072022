class MediaCard {
  constructor(media) {
    this._media = media
  }

  createMediaCard(index) {
    const article = document.createElement('article');
    article.innerHTML = ''
    if (this._media.picture) {
      article.innerHTML += `
      <img class="media hover-shadow" onclick="displayLightboxModal();currentSlide(${index})" 
        src="/assets/medias/${this._media.photographerId}/${this._media.picture}" alt="${this._media.title}" 
        tabindex="1" role="link">`
    } else if (this._media.video) {
      article.innerHTML += `
      <video type="video/mp4" tabindex="1" alt="${this._media.title}" role="link" 
        class="media hover-shadow" onclick="displayLightboxModal();currentSlide(${index})">
        <source src="/assets/medias/${this._media.photographerId}/${this._media.video}"></source>
      </video>`
    }
    article.innerHTML +=
      `
      <div class="flex justify_space_between" data-date="${this._media.date}" data-id="${this._media.id}">
        <div class="article_title">${this._media.title}</div>
        <div class="article_likes hide_full"><span class="likes_number" tabindex="1" likes">${this._media.likes}</span><i class="fa-solid fa-heart"></i><i class="fa-regular fa-heart"></i></div>
      </div>
      `
    return (article);
  }

  createPhotographerLightboxCard(index) {
    const article = document.createElement('article');
    article.classList.add("slide")
    article.innerHTML = ''
    if (this._media.picture) {
      article.innerHTML += `
      <img onclick="displayLightboxModal();currentSlide(${index})" src="/assets/medias/${this._media.photographerId}/${this._media.picture}" alt="${this._media.title}">`
    } else if (this._media.video) {
      article.innerHTML += `<video controls onclick="displayLightboxModal();currentSlide(${index})"><source src="/assets/medias/${this._media.photographerId}/${this._media.video}"></source></video>`
    }
    article.innerHTML +=
      `
      <div class="article_title">${this._media.title}</div>
      `
    return (article);
  }
}