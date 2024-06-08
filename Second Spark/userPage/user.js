import {getUserFromSession, addMessage, getAds, getUsers, saveUsers} from "../script.js";

let user;
let users = getUsers();
const loggedUser = getUserFromSession();
const urlParams = new URLSearchParams(window.location.search);
const userURL = urlParams.get('user');
const rateStars = document.querySelector('.rate-seller');
const logoutBtn = document.querySelector('.logout'); 
logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem("loggedAs");
  addMessage('Have a nice day!', true)
})
const username = document.querySelector('.username');
const userPhone = document.querySelector('.user-phone')

if(!loggedUser && !userURL){
  window.location.href = '/loggingPage/loging.html';
} else if (userURL === loggedUser.username){
  user = loggedUser;
  rateStars.style.display = 'none';
  username.innerText = `Hi again, ${user.username}!`
  userPhone.innerText = user.phone;
} else if (userURL) {
  user = users.find(user => user.username === userURL);
  logoutBtn.style.display = 'none';
  username.innerText = user.username
  userPhone.innerText = user.phone;
} else {
  user = loggedUser;
  rateStars.style.display = 'none';
  username.innerText = `Hi again, ${user.username}!`
  userPhone.innerText = user.phone;
}

starGenerator();

let adArray;
adArray = getAds();
adArray = adArray.filter((ad) => {
  return user.username === ad.username;
});
if(adArray.length)
  for (let i = 0; i<adArray.length; i++) {
    if(adArray[i])
      createAdDiv(adArray[i]);
  }

const stars = document.querySelectorAll('.rate-seller .fa-star');
stars.forEach((star, index) => {
  star.addEventListener('mouseover', function() {
    for (let i = 0; i <= index; i++) {
      stars[i].classList.remove('fa-regular');
      stars[i].classList.add('fa-solid');
    }
    for (let i = index + 1; i < stars.length; i++) {
      stars[i].classList.remove('fa-solid');
      stars[i].classList.add('fa-regular');
    }
  });

  star.addEventListener('mouseout', function() {
    stars.forEach((star, i) => {
      star.classList.remove('fa-solid');
      star.classList.add('fa-regular');
    });
  });

  star.addEventListener('click', function() {
    if(sessionStorage.getItem("alreadyRated"))
      document.querySelector('.rate-seller .star-text').innerText = `You can rate only once per session!`;
    else {
      document.querySelector('.rate-seller .star-text').innerText = `Rated ${index + 1} stars!`;
      user.rating.push(index+1);
      saveUsers(users);
      sessionStorage.setItem("alreadyRated", "true");
      starGenerator();
    }
  });
});

function createAdDiv(ad) {
  const newAd = document.createElement("div");
  newAd.classList.add("ad");

  const img = document.createElement("img");
  img.src = ad.picture;
  img.alt = "Advertisement Image";
  newAd.appendChild(img);

  const adMiddle = document.createElement("div");
  adMiddle.classList.add("ad-middle");

  const title = document.createElement("h4");
  title.classList.add("ad-title");
  title.innerText = ad.title;
  adMiddle.appendChild(title);

  const category = document.createElement("h4");
  category.classList.add("ad-category");
  category.innerText = ad.category;
  adMiddle.appendChild(category);

  const username = document.createElement("h4");
  username.classList.add("ad-username");
  username.innerText = ad.username;
  adMiddle.appendChild(username);

  newAd.appendChild(adMiddle);

  const adRight = document.createElement("div");
  adRight.classList.add("ad-right");

  const price = document.createElement("h2");
  price.classList.add("ad-price");
  price.innerText = `$${ad.price}`;
  adRight.appendChild(price);

  const adDate = new Date(ad.date); 

  const adUploaded = document.createElement("div");
  adUploaded.classList.add("ad-uploaded");

  const spanDate = document.createElement("span");
  spanDate.classList.add("date");
  spanDate.innerText = `${adDate.getDate()}.${adDate.getMonth() + 1}.${adDate.getFullYear()}`;

  adUploaded.innerHTML = "Uploaded: ";
  adUploaded.appendChild(spanDate);

  adRight.appendChild(adUploaded);

  newAd.appendChild(adRight);

  const adId = document.createElement("ad-id");
  adId.innerText = ad.ad_id;
  newAd.appendChild(adId);

  newAd.addEventListener("click", () => {
    const adId = newAd.querySelector("ad-id").innerText;
    console.log(adId);
    localStorage.setItem("clicked-id", adId);
    window.location.href = '../detailedAdvert/advert.html';
  });
  
  const adContainer = document.querySelector(".ad-container");
  adContainer.appendChild(newAd);
}

function starGenerator() {

  const ratings = user.rating;
  const numberOfRatings = ratings.length;
  const sumOfRatings = ratings.reduce((acc, curr) => acc + curr, 0);
  const averageRating = sumOfRatings / numberOfRatings;

  const starContainer = document.createElement("div");
  starContainer.classList.add("ad-star-container");

  const fullStar = document.createElement("i");
  fullStar.classList.add("fa-solid", "fa-star");
  const halfStar = document.createElement("i");
  halfStar.classList.add("fa-solid", "fa-star-half-stroke");
  const emptyStar = document.createElement("i");
  emptyStar.classList.add("fa-regular", "fa-star");

  for (let i = 0; i < Math.floor(averageRating); i++) {
    const star = document.createElement("i");
    star.classList.add("fa-solid", "fa-star");
    starContainer.appendChild(star);
  }

  if (averageRating % 1 !== 0) {
    const star = document.createElement("i");
    star.classList.add("fa-solid", "fa-star-half-stroke");
    starContainer.appendChild(star);
  }

  const remainingStars = 5 - Math.ceil(averageRating);
  for (let i = 0; i < remainingStars; i++) {
    const star = document.createElement("i");
    star.classList.add("fa-regular", "fa-star");
    starContainer.appendChild(star);
  }

  const row = document.querySelector('.user-info-row')
  row.innerHTML = '';
  row.appendChild(starContainer);

  const peopleRated = document.createElement("h5");
  peopleRated.classList.add("star-text");
  peopleRated.innerText = `${numberOfRatings} reviews`;
  row.appendChild(peopleRated);
}