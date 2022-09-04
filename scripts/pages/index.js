function displayData(photographers, version) {
    const photographersSection = document.querySelector(".photographer_section");

    const Photographers = photographers.map(photographer => new PhotographersFactory(photographer, version))
    

    Photographers.forEach((photographer) => {
        const Template = new HomePhotographerCard(photographer)
        photographersSection.appendChild(Template.createPhotographerCard());
    });
}

async function init() {
    // Récupère les datas des photographes
    // const oldPhotographers = await (new Api("/data/oldPhotographers.json")).get("photographers");
    // displayData(oldPhotographers, "oldJson");
    const photographers = await (new Api("/data/photographers.json")).get("photographers");
    displayData(photographers, "newJson");
}

init();