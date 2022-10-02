function displayContactModal() {
    const modal = document.getElementById("contact_modal");
    modal.focus()
    modal.classList.add("display");
}

function closeContactModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.remove("display");
}

var form = document.querySelector('#contact_modal form');

form.addEventListener('submit', function (e) {
    e.preventDefault()
    var prenom = document.getElementById('firstName').value
    var nom = document.getElementById('lastName').value
    var email = document.getElementById('email').value
    var message = document.getElementById('message').value
    console.log("Prénom : ", prenom, "| Nom : ", nom, "| Mail : ", email, "| Message : ", message)
    form.reset()
    closeModal()
});