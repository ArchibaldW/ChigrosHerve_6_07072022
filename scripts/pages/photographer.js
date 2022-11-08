let photographerData = null

const photographerId = parseInt(new URLSearchParams(window.location.search).get("id"))

let textArray = {
    likes: "Popularité",
    title: 'Titre',
    date: "Date"
}

/**
 * Compare two numbers
 * @param {number} number1 
 * @param {number} number2 
 * @return {number}
 */
function compareNumbers(number1, number2) {
    return number1 < number2 ? 1 : number1 > number2 ? -1 : 0
}

/**
 * Compare two texts
 * @param {string} text1 
 * @param {string} text2 
 * @return {number}
 */
function compareText(text1, text2) {
    return text1.localeCompare(text2)
}

/**
 * Compare two dates passed as string
 * @param {string} string1 
 * @param {string} string2 
 * @return {number}
 */
function compareDates(string1, string2) {
    const date1 = new Date(string1)
    const date2 = new Date(string2)
    return date1 < date2 ? 1 : date1 > date2 ? -1 : 0
}

/**
 * Retrieve all medias and sort them with functions depending of the filter
 * @param {string} filter 
 * @return {Array<any>}
 */
async function sortMedias(filter) {
    const medias = await (new Api("/data/photographers.json")).get("medias", photographerId);
    medias.sort((mediaA, mediaB) => {
        if (filter === "title") {
            return compareText(mediaA.title, mediaB.title)
        } else if (filter === "likes") {
            return compareNumbers(mediaA.likes, mediaB.likes)
        } else if (filter === "date") {
            return compareDates(mediaA.date, mediaB.date)
        }
    })
    return medias
}

/**
 * Close the dropdown menu
 */
function closeDropdown() {
    document.getElementById('sort').classList.remove('dropdown_open');
    document.querySelector('#dropbtn').setAttribute('aria-selected', false)
    document.querySelector(".dropdown-content").classList.remove('show');
    document.querySelector('.fa-solid.fa-chevron-up').classList.remove('show');
    document.querySelector('.fa-solid.fa-chevron-down').classList.add('show')
}


/**
 * Open the dropdown menu
 */
function openDropdown() {
    document.getElementById('sort').classList.add('dropdown_open');
    document.querySelector('#dropbtn').setAttribute('aria-selected', true)
    document.querySelector(".dropdown-content").classList.add("show");
    document.querySelector('.fa-solid.fa-chevron-up').classList.add('show')
    document.querySelector('.fa-solid.fa-chevron-down').classList.remove('show');
}

/**
 * Set the text of the dropdown button according to the choosen text
 * @param {string} text 
 */
 function setDropdownText(text) {
    document.querySelector(".dropbtn-text").textContent = textArray[text]
}

/**
 * If click outside of the dropdown, close the dropdown menu
 * @param {any} event 
 */
window.onclick = function (event) {
    if (!event.target.matches('#dropbtn') && document.getElementById('sort').classList.contains('dropdown_open')) {
        closeDropdown()
    }
}


/**
 * Update likes values of the like/price insert bottom left of the page
 * @param {Array<any>} medias 
 */
 function updateLikePriceInsert(medias) {
    let totalLikes = 0
    medias.forEach(media => {
        totalLikes += media.likes
    })
    document.querySelector('#like_price_insert span:first-child').innerHTML = `<span id="total_likes">${totalLikes}</span><i class="fa-solid fa-heart"></i>`
}

/**
 * Set first values of the like/price insert bottom left of the page
 * @param {Array<any>} medias 
 */
function setLikePriceInsert(medias) {
    const parentNode = document.getElementById("like_price_insert")
    let totalLikes = 0
    medias.forEach(media => {
        totalLikes += media.likes
    })
    parentNode.querySelector("span:first-child").innerHTML = `<span id="total_likes">${totalLikes}</span><i class="fa-solid fa-heart"></i>`
    parentNode.querySelector("span:last-child").innerHTML = `${photographerData[0].price}€ /jour`
}

/**
 * Reset page media and display new mediasData array
 * @param {Array<any>} mediasData 
 */
 function displayMediasData(mediasData) {
    const mediasSection = document.getElementById("photograph_medias");
    const mediasSlides = document.getElementById("media_slides");
    mediasSection.innerHTML = ''
    mediasSlides.innerHTML = ''
    const medias = mediasData.map(media => new MediasFactory(media))
    medias.forEach((media, index) => {
        const template = new MediaCard(media)
        mediasSection.appendChild(template.createMediaCard(index))
        mediasSlides.appendChild(template.createPhotographerLightboxCard(index))
    })
}

/**
 * 
 * @param {HTMLElement} radioValue 
 * @param {Array<any>} radios 
 */
async function radioListernerAction(radioElement, radios) {
    setDropdownText(radioElement.value)
    radios.forEach(radio => {
        radio.parentElement.classList.remove("hide")
    })
    radioValue.parentElement.classList.add("hide")
    const medias = await sortMedias(radioElement.value)
    displayMediasData(medias)
    initLikesListeners()
    updateLikePriceInsert(medias)
    initMediasLikes();
}

/**
 * Init radios and dropdown listeners
 */
function initRadiosDropdownListeners() {
    const radios = document.querySelectorAll("input[name='sort']");
    radios.forEach((radio) => {
        radio.addEventListener('change', async () => {
            await radioListernerAction(radio, radios)
        });
    });
    const dropdownChoice = document.querySelectorAll("#myDropdown div")
    dropdownChoice.forEach((choice, index) => {
        choice.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                const radio = choice.querySelector("input[name='sort']")
                radio.checked = true
                await radioListernerAction(radio, radios)
            }
            if (index === dropdownChoice.length -1){
                closeDropdown()
            }
        })
    })
}

/**
 * Display the photographer datas at top of the page
 */
async function displayPhotographerData() {
    const photographersSection = document.getElementById("photograph_header");
    photographerData = await (new Api("/data/photographers.json")).get("photographers", photographerId);
    const photographer = photographerData.map(photographer => new PhotographersFactory(photographer))
    const template = new PagePhotographerCard(photographer[0], photographersSection)
    template.createPhotographerCard();
}

/**
 * First init of the photographer page
 */
async function init() {
    await displayPhotographerData(photographerId);
    const mediasData = await sortMedias("likes")
    displayMediasData(mediasData)//
    initRadiosDropdownListeners();
    initLikesListeners();
    setLikePriceInsert(mediasData)
    initMediasLikes();
}

init();