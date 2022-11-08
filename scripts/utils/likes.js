/**
 * Switch between empty and full heart, change the like number and update the like insert at the bottom of the page
 * @param {HTMLElement} htmlElement 
 * @param {number} likedOrDisliked - 1 for like, -1 for dislike
 */
function domChangesOnLikes(htmlElement, likedOrDisliked) {
  const parent = htmlElement.parentNode
  if (likedOrDisliked === 1) {
    parent.classList.add("hide_empty")
    parent.classList.remove("hide_full")
  } else {
    parent.classList.add("hide_full")
    parent.classList.remove("hide_empty")
  }
  parent.querySelector(".likes_number").innerHTML = parseInt(parent.querySelector(".likes_number").innerHTML) + likedOrDisliked
  document.getElementById("total_likes").innerHTML = parseInt(document.getElementById("total_likes").innerHTML) + likedOrDisliked
}

/**
 * Change the dom for dislike and remove the id from local storage mediasLiked
 * @param {HTMLElement} htmlElement 
 */
function dislikeElement(htmlElement) {
  domChangesOnLikes(htmlElement, -1)
  const parent = htmlElement.parentNode
  const id = parent.parentNode.dataset.id
  let mediasLiked = null
  const localStorageDatas = JSON.parse(localStorage.getItem("mediasLiked"))
  mediasLiked = localStorageDatas.filter(element => parseInt(element) !== parseInt(id))
  localStorage.setItem("mediasLiked", JSON.stringify(mediasLiked))
}

/**
 * Change the dom for like and add the id to local storage mediasLiked
 * @param {HTMLElement} htmlElement 
 */
function likeElement(htmlElement) {
  domChangesOnLikes(htmlElement, 1)
  const parent = htmlElement.parentNode
  const id = parent.parentNode.dataset.id
  let mediasLiked = null
  const localStorageDatas = localStorage.getItem("mediasLiked")
  if (localStorageDatas) {
    mediasLiked = JSON.parse(localStorageDatas)
    mediasLiked.push(id)
  } else {
    mediasLiked = [id]
  }
  localStorage.setItem("mediasLiked", JSON.stringify(mediasLiked))
}

/**
 * Get the mediasLiked item from localStorage to init the likes count on each media
 */
function initMediasLikes() {
  const localStorageDatas = localStorage.getItem("mediasLiked")
  if (localStorageDatas) {
    const mediasLiked = JSON.parse(localStorageDatas)
    mediasLiked.forEach(id => {
      const elementLiked = document.querySelector(`[data-id='${id}'] .fa-regular`)
      if (elementLiked) {
        domChangesOnLikes(elementLiked, 1)
      }
    })
  }
}

/**
 * Init the likes listeners, used each time medias are reloaded
 */
function initLikesListeners() {
  const emptyHeart = document.querySelectorAll(".article_likes > .fa-regular")
  emptyHeart.forEach(htmlElement => {
    htmlElement.addEventListener('click', () => likeElement(htmlElement))
  })
  const fullHeart = document.querySelectorAll(".article_likes > .fa-solid")
  fullHeart.forEach(htmlElement => {
    htmlElement.addEventListener('click', () => dislikeElement(htmlElement))
  })
  const likes = document.querySelectorAll(".article_likes")
  likes.forEach(htmlElement => {
    htmlElement.addEventListener("keydown", (e) => {
      if (e.key === 'Enter') {
        if (htmlElement.classList.contains("hide_empty")) {
          dislikeElement(htmlElement.querySelector(".fa-solid"))
        } else if (htmlElement.classList.contains("hide_full")) {
          likeElement(htmlElement.querySelector(".fa-regular"))
        }
      }
    })
  })
}