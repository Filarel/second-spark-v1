import {getAds, getUsers} from "../script.js";

let adArray;
adArray = getAds();

const clickedId = localStorage.getItem('clicked-id');
const advertDiv = document.querySelector(".advert");
const users = getUsers();
let foundAd;

start();
 
function start () {
  foundAd = adArray.find(ad => ad.ad_id === clickedId);
  createAdDiv(foundAd);
}

function buildInfo (ad) {
  const div = document.createElement("div");
  div.className = 'ad';

  const picture = document.createElement("img");
  picture.src = ad.picture; 
  picture.alt = "Advertisement Image"; 
  div.append(picture);

  const price = document.createElement("h2");
  price.innerText = `$${ad.price}`
  price.className = "ad-price"
  div.append(price);
  
  const title = document.createElement("h4");
  title.innerText = ad.title;
  title.className = "ad-title"
  div.append(title);
  
  const category = document.createElement("h4");
  category.innerText = ad.category;
  category.className = "ad-category";
  div.append(category);

  const index = document.createElement("ad-id");
  index.innerText = adArray.indexOf(ad);
  div.append(index);

  const description = document.createElement("ad-description");
  description.innerText = ad.description;
  div.append(description);
  
  // const moreButton = document.createElement("button");
  // moreButton.className = "ad-btn"
  // moreButton.innerText = "See more";
  // div.append(moreButton);
  // moreButton.addEventListener("click", more);

  document.querySelector('.ad-container').append(div);
}

function buildInfo2 (advert) {
  
  const div = document.createElement("div");
  div.className = 'advert';

  const nazwa = document.createElement("h2");
  nazwa.innerText = advert.nazwa;

  div.append(nazwa);

  const cena = document.createElement("h3");
  cena.innerText = `Cena: ${advert.cena} zł`
  div.append(cena);

  const user = document.createElement("h3");
  user.innerText = advert.user;
  div.append(user);

  const desc = document.createElement("p");
  desc.innerText = advert.desc;
  div.append(desc);

  const id = document.createElement("ad-id");
  id.innerText = clickedId;
  div.append(id);
  
  advertDiv.append(div);
}

function createAdDiv(ad) {
  const adContainer = document.createElement("div");
  adContainer.classList.add("ad");
  const adLeft = document.createElement("div");
  adLeft.classList.add("ad-left");
  const img = document.createElement("img");
  img.src = ad.picture;
  img.alt = "Advertisement Image";
  adLeft.appendChild(img);
  const username = document.createElement("h4");
  username.classList.add("ad-username");
  username.innerText = ad.username;
  adLeft.appendChild(username);

  const user = users.find(u => u.username === ad.username);

  const ratings = user.rating;
  const numberOfRatings = ratings.length;
  const sumOfRatings = ratings.reduce((acc, curr) => acc + curr, 0);
  const averageRating = sumOfRatings / numberOfRatings;

  const rating = document.createElement("h5");
  rating.classList.add("rating");
  rating.innerText = averageRating.toFixed(2);
  adLeft.appendChild(rating);

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

  adLeft.appendChild(starContainer);

  const peopleRated = document.createElement("h5");
  peopleRated.classList.add("people-rated");
  peopleRated.innerText = `${numberOfRatings} people rated this seller`;
  adLeft.appendChild(peopleRated);

  adContainer.appendChild(adLeft);

  const adRight = document.createElement("div");
  adRight.classList.add("ad-right");

  const adTitle = document.createElement("h4");
  adTitle.classList.add("ad-title");
  adTitle.innerText = ad.title;
  adRight.appendChild(adTitle);

  const adDescription = document.createElement("p");
  adDescription.classList.add("ad-description");
  adDescription.innerText = ad.description;
  adRight.appendChild(adDescription);

  const adPrice = document.createElement("h2");
  adPrice.classList.add("ad-price");
  adPrice.innerText = `$${ad.price}`;
  adRight.appendChild(adPrice);

  const contactSeller = document.createElement("div");
  contactSeller.classList.add("contact-seller");
  const contactTitle = document.createElement("h3");
  contactTitle.innerText = "Contact this seller:";
  const userPhone = document.createElement("h3");
  userPhone.classList.add("user-phone");
  userPhone.innerText = ad.phone;
  contactSeller.appendChild(contactTitle);
  contactSeller.appendChild(userPhone);
  adRight.appendChild(contactSeller);

  const adBottomRight = document.createElement("div");
  adBottomRight.classList.add("ad-bottom-right");

  const uploaded = document.createElement("div");
  uploaded.classList.add("ad-uploaded");
  const uploadedDate = new Date(ad.date);
  const dateSpan = document.createElement("span");
  dateSpan.classList.add("date");
  dateSpan.innerText = `${uploadedDate.getDate()}.${uploadedDate.getMonth() + 1}.${uploadedDate.getFullYear()}`;
  uploaded.innerHTML = "Uploaded: ";
  uploaded.appendChild(dateSpan);
  adBottomRight.appendChild(uploaded);

  const goBack = document.createElement("div");
  goBack.classList.add("go-back");
  goBack.onclick = function() {
    history.back();
  };  
  goBack.innerHTML = "<i class='fa-solid fa-chevron-left'></i> Go back";
  adBottomRight.appendChild(goBack);
  adRight.appendChild(adBottomRight);

  adContainer.appendChild(adRight);

  document.querySelector(".ad-container").appendChild(adContainer);
}

const username = document.querySelector('.ad-username')
username.addEventListener('click', () => {
  window.location.href = `/userPage/user.html?user=${foundAd.username}`; 
})

const advertCategory = document.querySelector('.ad-category')
advertCategory.innerText = foundAd.category;
const advertTitleSpan = document.querySelector('.ad-title-span')
advertTitleSpan.innerText = foundAd.title;
advertCategory.addEventListener("click", (event) => {
  const data = {
    searchTitle: '*',
    priceChecked: false,
    minPrice: '',
    maxPrice: '',
    categoryChecked: true,
    selectedCategory: event.target.innerText.trim()
  };
  sessionStorage.setItem("searchParams", JSON.stringify(data))
  window.location.href = '/searchedAds/searched.html'; 
})

const storeName = document.querySelector('.store-name')
storeName.addEventListener("click", (event) => {
  window.location.href = '/mainPage/main.html'; 
})
//dropdown: 

function getData() {
  const data = {
    searchTitle: searchInput.value,
    // priceChecked: priceCheckbox.checked,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    // categoryChecked: categoryCheckbox.checked,
    selectedCategory: selectedCategory.value
  };

  return data;
}

const searchButton = document.querySelector('.search-btn');
searchButton.addEventListener('click', () => {
  const data = getData();
  if(!data.searchTitle && data.selectedCategory === 'Any' && data.minPrice === '' && data.maxPrice === ''){
    alert(`If you want to search all items without any filters, type ' * '`);
  } else {
    console.log(data);
    sessionStorage.setItem("searchParams", JSON.stringify(data))
    window.location.href = '/searchedAds/searched.html'; 
  }
})

const filterButton = document.querySelector('.filter-ad');
const filtersContainer = document.querySelector('.filters-container');
const searchInput = document.querySelector('.search-input');
const minPrice = document.querySelector('#minPrice');
const maxPrice = document.querySelector('#maxPrice');
const selectedCategory = document.querySelector('.category-selector');

filterButton.addEventListener('click', () => {
  if (filtersContainer.style.display === 'flex') {
    filtersContainer.style.opacity = '0';
    setTimeout(() => {
      filtersContainer.style.display = 'none';
    }, 200); // czas trwania animacji w milisekundach
  } else {
    filtersContainer.style.display = 'flex';
    setTimeout(() => {
      filtersContainer.style.opacity = '1';
    }, 1); // opóźnienie pojawienia się elementu w milisekundach
  }
});

// ######### footer category buttons #######

const footerCategories = document.querySelectorAll('.categories > .footer-row');
footerCategories.forEach((category) => {
  category.addEventListener("click", (event) => {
    const data = {
      searchTitle: '*',
      minPrice: '',
      maxPrice: '',
      selectedCategory: event.target.innerText.trim()
    };
    sessionStorage.setItem("searchParams", JSON.stringify(data))
    window.location.href = '/searchedAds/searched.html'; 
  })
})
