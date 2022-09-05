function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.add("display");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.remove("display");
}

var form = document.querySelector('#contact_modal form');

form.addEventListener('submit', function (e) {
    e.preventDefault()
    var prenom = document.getElementById('prenom').value
    var nom = document.getElementById('nom').value
    var email = document.getElementById('email').value
    var message = document.getElementById('message').value
    console.log("Prénom : ", prenom, "| Nom : ", nom, "| Mail : ", email, "| Message : ", message)
    form.reset()
    closeModal()
});