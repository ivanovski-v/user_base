/// Variables:
const serverUrl = "https://jsonplaceholder.typicode.com";
const form = document.getElementById("form_id");
const userCardsList = document.querySelector(".user-cards");

/// Events:
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (form.checkValidity()) {
    let user = {};
    new FormData(form).forEach((value, key) => (user[key] = value));
    sendUserToServer(user, buildUserCard);
    resetForm();
  } else {
    form.classList.add("was-validated");
  }
});

function sendUserToServer(user, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${serverUrl}/users`);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.addEventListener("load", () => cb(JSON.parse(xhr.responseText)));
  xhr.send(JSON.stringify(user));
}

function buildUserCard(user) {
  let fragment = document.createDocumentFragment();
  let card = document.createElement("div");
  card.classList.add("card");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let h5 = document.createElement("h5");
  h5.textContent = user.username;

  let h6 = document.createElement("h6");
  h6.textContent = user.email;

  let p = document.createElement("p");
  p.textContent = user.phone;

  card.appendChild(cardBody);
  cardBody.appendChild(h5);
  cardBody.appendChild(h6);
  cardBody.appendChild(p);

  if (user.website) {
    let btnWebsite = document.createElement("button");
    btnWebsite.classList.add("btn", "btn-primary");
    btnWebsite.setAttribute("href", user.website);
    btnWebsite.textContent = "Website";
    cardBody.appendChild(btnWebsite);
  }

  fragment.appendChild(card);
  userCardsList.appendChild(fragment);
}

function resetForm() {
  document.querySelectorAll("input").forEach((field) => (field.value = ""));
  form.classList.toggle("was-validated", "");
}
