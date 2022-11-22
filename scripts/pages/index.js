/* eslint-disable no-undef */
/**
 * Display photographers data
 * @param {Array<any>} photographers
 */
function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach(photographer => {
    const template = new HomePhotographerCard(photographer)
    photographersSection.appendChild(template.createPhotographerCard())
  })
}

/**
 * Init index page
 */
async function init () {
  // Récupère les datas des photographes
  // const oldPhotographers = await (new Api("/data/oldPhotographers.json")).get("photographers");
  // displayData(oldPhotographers, "oldJson");
  const photographers = await (new Api('/data/photographers.json')).get('photographers')
  const photographersData = photographers.map(photographer => new PhotographersFactory(photographer, 'newJson'))
  displayData(photographersData)
}

init()
