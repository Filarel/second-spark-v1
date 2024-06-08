import { User, getUsers } from "../script.js";
import { getUserFromSession, addMessage } from "../script.js";

const user = getUserFromSession();
if(user){
  window.location.href = '/userPage/user.html';
}

const signButton = document.querySelector('.sign-in');
signButton.addEventListener('click', () => {
  if(!inputsEmpty()) {
    loginUser(usernameInput.value, passwordInput.value);
  }else{
    const newElement = document.createElement('h5');
    newElement.textContent = "Inputs can't be empty!";
    newElement.className = "invalid-msg";
    const msgBox = document.querySelector('.msg-box');
    msgBox.appendChild(newElement);
    setTimeout(() => {
      newElement.remove();
    }, 2000);
  }
})
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const registerSpan = document.querySelector('.register-span');
registerSpan.addEventListener('click', () => {
  window.location.href = '/registerPage/register.html';
})
const users = getUsers();


function inputsEmpty() {
  if (usernameInput.value === '' || passwordInput.value === '')
    return true;
  else
    return false;
}

function loginUser(username, password) {
  const lowercaseUsername = username.toLowerCase();
  const foundUser = users.find(
    user => user.username.toLowerCase() === lowercaseUsername && user.password === password
  );

  if (foundUser) {
    sessionStorage.setItem("loggedAs", JSON.stringify(foundUser))
    addMessage(`Welcome back, ${foundUser.username}!`, true)
  } else {
    addMessage("Invalid username or password. Try again")
  }
}

function generateRandomPhone() {
  let phone = '5'; // Rozpoczynamy numer od cyfry 5

  for (let i = 0; i < 8; i++) {
    const digit = Math.floor(Math.random() * 10); // Losujemy cyfrę od 0 do 9
    phone += digit;
  }

  return phone;
}

function generateRandomRating() {
  const rating = [];
  const numberOfRatings = Math.floor(Math.random() * 4) + 2; // Losowa liczba ocen od 2 do 5

  for (let i = 0; i < numberOfRatings; i++) {
    const randomRating = Math.floor(Math.random() * 4) + 2; // Losujemy ocenę od 2 do 5
    rating.push(randomRating);
  }

  return rating;
}

function generateRandomUsers() {
  const users = [];

  for (let i = 0; i < 5; i++) {
    const username = `User${i + 1}`; // Tworzymy nazwę użytkownika User1, User2 itd.
    const password = `Password${i + 1}`; // Tworzymy hasło Password1, Password2 itd.
    const phone = generateRandomPhone(); // Generujemy losowy numer telefonu
    const rating = generateRandomRating(); // Generujemy losowe oceny

    const newUser = new User(username, password, phone, rating);
    users.push(newUser);
  }

  return users;
}
