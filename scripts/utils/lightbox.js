/**
 * Open the lightbox modal
 */
function displayLightboxModal() {
  document.getElementById("main").classList.add("hide")
  document.getElementById("header").classList.add("hide")
  document.getElementById("lightbox_modal").classList.add("show");
  document.querySelector('#lightbox_modal .close').focus()
}

/**
 * Trigger the lightbox modal only if the key was "Enter"
 * @param {any} e 
 */
function displayKeyLightboxModal(e) {
  if (e.key === "Enter") {
    displayLightboxModal()
  }
}

/**
 * Close the lightbox modal
 */
function closeLightboxModal() {
  document.getElementById("main").classList.remove("hide")
  document.getElementById("header").classList.remove("hide")
  document.getElementById("lightbox_modal").classList.remove("show");
}



let slideIndex = 0;

/**
 * Show the previous slide
 */
function prevSlide() {
  showSlide(slideIndex -= 1)
}

/**
 * Show the next slide
 */
function nextSlide() {
  showSlide(slideIndex += 1)
}

/**
 * Show the newIndex slide from the lightbox carousel
 * @param {number} newIndex 
 */
function showSlide(newIndex) {
  let slides = document.getElementsByClassName("slide");
  slideIndex = newIndex
  // If we reach over the last slide, so return to the first slide
  if (newIndex > slides.length - 1) {
    slideIndex = 0
  }
  // If we reach over the first slide, so return to the last slide
  if (newIndex < 0) {
    slideIndex = slides.length - 1
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("show");
  }
  slides[slideIndex].classList.add("show");
}

/**
 * Init listeners for lightbox navigation
 */
function initLightboxListeners() {
  document.querySelector('#lightbox_modal .prev').addEventListener('click', () => prevSlide())
  document.querySelector('#lightbox_modal .prev').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      prevSlide()
    }
  })

  document.querySelector('#lightbox_modal .next').addEventListener('click', () => nextSlide())
  document.querySelector('#lightbox_modal .next').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      nextSlide()
    }
  })

  document.querySelector('#lightbox_modal .close').addEventListener('click', () => closeLightboxModal())
  document.querySelector('#lightbox_modal .close').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      closeLightboxModal()
    }
  })
}

initLightboxListeners()