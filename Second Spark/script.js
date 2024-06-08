export class Advertisement {
  constructor (username, title, price, phone, picture, category, description) {
    this.username = username;
    this.title = title;
    this.price = price;
    this.phone = phone;
    this.picture = picture;
    this.category = category;
    this.date = new Date().toJSON();
    this.ad_id = generateRandomId(6);
    this.description = description;
  }
};

export function saveAds(array) {
  localStorage.setItem("advertisements", JSON.stringify(array));
};

export function getAds() {
  if(localStorage.getItem("advertisements") === null)
    return [];
  else
    return JSON.parse(localStorage.getItem("advertisements"));
}

export class User {
  constructor (username, password, phone, rating) {
    this.username = username;
    this.password = password;
    this.phone = phone;
    this.rating = rating;
  }
};

export function saveUsers(array) {
  localStorage.setItem("users", JSON.stringify(array));
};

export function getUsers() {
  if(localStorage.getItem("users") === null)
    return [];
  else
    return JSON.parse(localStorage.getItem("users"));
}

export function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

export function getUserFromSession() {
  if (sessionStorage.getItem("loggedAs") === null)
    return false;
  else
    return JSON.parse(sessionStorage.getItem("loggedAs"));
}

export function addMessage(message, isValid) {
  const msgBox = document.querySelector('.msg-box');
  const newElement = document.createElement('h5');
  newElement.textContent = message;
  console.log(isValid)
  if(isValid === true) { 
    newElement.className = "valid-msg";
    let counter = 3; 
    const countdown = document.createElement('h4');
    countdown.textContent = `Redirecting in ${counter} seconds...`;
    msgBox.appendChild(countdown);

    const redirectInterval = setInterval(() => {
      counter--;
      countdown.textContent = `Redirecting in ${counter} seconds...`;
      if (counter === 0) {
        clearInterval(redirectInterval);
        if (window.location.href.includes('loging.html')) {
          window.location.href = '/mainPage/main.html';
        } else {
          window.location.href = '/loggingPage/loging.html'; 
        }
      }
    }, 1000);
  } else
    newElement.className = "invalid-msg";
  msgBox.appendChild(newElement);
  setTimeout(() => {newElement.remove()}, 2000);
}

export async function addDatabase() {
  try {
    const response = await fetch('../database.txt');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch database. Status: ${response.status}`);
    }

    const text = await response.text();
    const array = JSON.parse(text);

    saveAds(array);

    console.log('Database successfully loaded:', array);
  } catch (error) {
    console.error('Error loading database:', error);
  }

  let users = [{"username":"Thorus43","password":"Abcd1234","phone":"534673623","rating":[5,5,2,3,5]},{"username":"Amanta35","password":"Abcd1234","phone":"584055459","rating":[5,4,4]},{"username":"Sharky","password":"Abcd1234","phone":"589491972","rating":[5,4,4,3]},{"username":"voltron","password":"Abcd1234","phone":"546428251","rating":[4,4,2,2,4]},{"username":"diddyBlind1","password":"Abcd1234","phone":"523838929","rating":[1,4]},{"username":"Gorn12","password":"Abcd1234","phone":"535132641","rating":[3,3]}];
  saveUsers(users);
}