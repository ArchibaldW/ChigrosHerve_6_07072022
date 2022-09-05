function displayPhotographerData(photographer) {
    const photographersSection = document.getElementById("photograph_header");
    const Photographer = photographer.map(photographer => new PhotographersFactory(photographer))
    const Template = new PagePhotographerCard(Photographer[0], photographersSection)
    Template.createPhotographerCard();
}

function displayMediasData(medias) {
    const mediasSection = document.getElementById("photograph_medias");
    mediasSection.innerHTML = ''
    const Medias = medias.map(media => new MediasFactory(media))
    Medias.forEach(media => {
        const Template = new MediaCard(media)
        mediasSection.appendChild(Template.createPhotographerCard())
    })
}

async function init() {
    // Récupère les datas des photographes
    const id = parseInt(new URLSearchParams(window.location.search).get("id"))
    const photographer = await (new Api("/data/photographers.json")).get("photographers", id);
    displayPhotographerData(photographer);
    const mediasData = await sortMedias("likes", id)
    console.log(mediasData)
    displayMediasData(mediasData)
    initListeners(id);
    setInsert(photographer[0], mediasData)
    initLikes();
}

function setInsert(photographer, medias) {
    const parentNode = document.getElementById("like_price_insert")
    let totalLikes = 0
    medias.forEach(media => {
        totalLikes += media.likes
    })
    parentNode.querySelector("span:first-child").innerHTML = `<span id="total_likes">${totalLikes}</span><i class="fa-solid fa-heart"></i>`
    parentNode.querySelector("span:last-child").innerHTML = `${photographer.price}€ /jour`
}

init();

function initListeners(id) {
    const dropdownText = document.querySelector('.dropbtn-text')
    dropdownText.addEventListener('DOMSubtreeModified', async () => {
        const medias = await sortMedias(Object.keys(filterArray).find(key => filterArray[key] === dropdownText.textContent), id)
        displayMediasData(medias)
    })
    const emptyHeart = document.querySelectorAll(".article_likes > .fa-regular")
    emptyHeart.forEach(htmlElement => {
        htmlElement.addEventListener('click', () => likeElement(htmlElement))
    })
    const fullHeart = document.querySelectorAll(".article_likes > .fa-solid")
    fullHeart.forEach(htmlElement => {
        htmlElement.addEventListener('click', () => dislikeElement(htmlElement))
    })
}

function initLikes() {
    const localStorageDatas = localStorage.getItem("mediasLiked")
    if (localStorageDatas) {
        const mediasLiked = JSON.parse(localStorageDatas)
        mediasLiked.forEach(id => {
            const elementLiked = document.querySelector(`[data-id='${id}'] .fa-regular`)
            if (elementLiked) {
                domChangesLike(elementLiked)
            }
        })
    }
}

function likeElement(htmlElement) {
    domChangesLike(htmlElement)
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

function domChangesLike(htmlElement) {
    const parent = htmlElement.parentNode
    parent.classList.add("hide_empty")
    parent.classList.remove("hide_full")
    parent.querySelector(".likes_number").innerHTML = parseInt(parent.querySelector(".likes_number").innerHTML) + 1
    document.getElementById("total_likes").innerHTML = parseInt(document.getElementById("total_likes").innerHTML) + 1
}

function dislikeElement(htmlElement) {
    domChangesDislike(htmlElement)
    const parent = htmlElement.parentNode
    const id = parent.parentNode.dataset.id
    let mediasLiked = null
    const localStorageDatas = JSON.parse(localStorage.getItem("mediasLiked"))
    mediasLiked = localStorageDatas.filter(element => parseInt(element) !== parseInt(id))
    localStorage.setItem("mediasLiked", JSON.stringify(mediasLiked))
}

function domChangesDislike(htmlElement) {
    const parent = htmlElement.parentNode
    parent.classList.add("hide_full")
    parent.classList.remove("hide_empty")
    parent.querySelector(".likes_number").innerHTML = parseInt(parent.querySelector(".likes_number").innerHTML) - 1
    document.getElementById("total_likes").innerHTML = parseInt(document.getElementById("total_likes").innerHTML) - 1
}

async function sortMedias(filter, id) {
    const medias = await (new Api("/data/photographers.json")).get("medias", id);
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

function compareNumbers(number1, number2) {
    return number1 < number2 ? 1 : number1 > number2 ? -1 : 0
}

function compareText(text1, text2) {
    return text1.localeCompare(text2)
}

function compareDates(string1, string2) {
    const date1 = new Date(string1)
    const date2 = new Date(string2)
    return date1 < date2 ? 1 : date1 > date2 ? -1 : 0
}

let filterArray = []
filterArray['likes'] = 'Popularité'
filterArray['title'] = 'Titre'
filterArray['date'] = 'Date'

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        document.getElementById('sort').classList.remove('dropdown_open');
        document.querySelector(".dropdown-content").classList.remove('show');
        document.querySelector('.fa-solid.fa-chevron-up').classList.remove('show');
        document.querySelector('.fa-solid.fa-chevron-down').classList.add('show')
    }
}

function openDropdown() {
    document.getElementById('sort').classList.add('dropdown_open');
    document.querySelector(".dropdown-content").classList.add("show");
    document.querySelector('.fa-solid.fa-chevron-up').classList.add('show')
    document.querySelector('.fa-solid.fa-chevron-down').classList.remove('show');
}

function dropdownChoice(filter) {
    document.querySelector(".dropbtn-text").textContent = filterArray[filter]
}