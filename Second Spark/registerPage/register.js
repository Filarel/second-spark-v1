import { User, saveUsers, getUsers, addMessage} from "../script.js";

const registerButton = document.querySelector('.sign-up');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');
const phoneInput = document.querySelector('#phone');
const users = getUsers();
const loginSpan = document.querySelector('.login-span');
loginSpan.addEventListener('click', () => {
  window.location.href = '/loggingPage/loging.html'; 
})


registerButton.addEventListener('click', () => {
  console.log(passwordInput.value === confirmPasswordInput.value);
  if(!inputsEmpty()) {
    if (passwordInput.value !== confirmPasswordInput.value){
      addMessage("Passwords don't match!")
    } else 
      registerUser(usernameInput.value, passwordInput.value, phoneInput.value);
  }else{
    addMessage("Inputs can't be empty!")
  }
})

function inputsEmpty() {
  if (usernameInput.value === '' || passwordInput.value === '' || confirmPasswordInput.value === '' || phoneInput.value === '')
    return true;
  else
    return false;
}

function registerUser(username, password, phone) {
  users.push(new User(username, password, phone, []))
  saveUsers(users);
  addMessage("Registered succesfully! Please login.", true)
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

// const randomUsers = generateRandomUsers();
// saveUsers(randomUsers);
