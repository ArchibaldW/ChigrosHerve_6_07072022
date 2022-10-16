const form = document.querySelector('#contact_modal form');
const modal = document.getElementById("contact_modal");


function displayContactModal() {
    console.log("pouet")
    modal.classList.add("display");
    document.getElementById("main").classList.add("hide")
    document.getElementById("header").classList.add("hide")
    document.getElementById("like_price_insert").classList.add("hide")
    document.getElementById("close_modal").focus()
}

function closeContactModal() {
    modal.classList.remove("display");
    document.getElementById("main").classList.remove("hide")
    document.getElementById("header").classList.remove("hide")
    document.getElementById("like_price_insert").classList.remove("hide")
    document.getElementById("open_contact_btn").focus()
}

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

modal.addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        closeContactModal()
    }
})

document.getElementById('close_modal').focus();
document.getElementById('close_modal').addEventListener('click', closeContactModal);
document.getElementById('close_modal').addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key == "Enter") {
        closeContactModal();
        e.preventDefault();
    } else {
        console.log('wrong key!');
    }
});