import {addDatabase, getAds} from "../script.js";

let adArray;
adArray = getAds();

if(!adArray[0]){
  addDatabase();
  adArray = getAds();
  const unblockMessage = document.querySelector('.unblock-message');
  unblockMessage.style.display = 'flex';
}

for (let i = 0; i<5; i++) {
  if(adArray[i])
    createAdDiv(adArray[i]);
}

function createAdDiv(ad) {
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
  
  const adCategoryContainer = document.createElement("div");
  adCategoryContainer.className = 'ad-category-container';

  const category = document.createElement("div");
  category.innerText = ad.category;
  category.className = "ad-category";
  adCategoryContainer.append(category);

  const spacer = document.createElement("div");
  spacer.className = 'spacer';
  adCategoryContainer.append(spacer);

  const addedAgo = document.createElement("div");
  addedAgo.innerText = getTimeDifference(ad.date);
  addedAgo.className = 'addedAgo';
  adCategoryContainer.append(addedAgo);

  div.append(adCategoryContainer);

  const index = document.createElement("ad-id");
  index.innerText = ad.ad_id;
  div.append(index);
  
  const moreButton = document.createElement("button");
  moreButton.className = "ad-btn"
  moreButton.innerText = "See more";
  div.append(moreButton);
  moreButton.addEventListener("click", more);

  document.querySelector('.ad-container').append(div);
}

function AlternativeCreateAdDiv(ad) {
  const div = document.createElement("div");
  div.className = 'ad';
  div.innerHTML = `
    <img src="${ad.picture}" alt="Advertisement Image">
    <h2 class="ad-price">$${ad.price}</h2>
    <h4 class="ad-title">${ad.title}</h4>
    <div class="ad-category-container">
      <div class="ad-category">${ad.category}</div>
      <div class="spacer"></div>
      <div class="addedAgo">${getTimeDifference(ad.date)}</div>
    </div>
    <ad-id>${ad.ad_id}</ad-id>
    <button class="ad-btn">See more</button>
  `;

  div.querySelector('.ad-btn').addEventListener('click', more);
  document.querySelector('.ad-container').append(div);
}

function getTimeDifference(dateAdded) {
  const now = new Date();
  const added = new Date(dateAdded);

  const diff = now - added;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}

export function more(event) {
  const id = event.target.parentElement.querySelector("ad-id").innerText;
  console.log(id);
  localStorage.setItem("clicked-id", id);
  window.location.href = '../detailedAdvert/advert.html';
}

function getData() {
  const data = {
    searchTitle: searchInput.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
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

// ###### Search & Dropdown Menu

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
    }, 200); 
  } else {
    filtersContainer.style.display = 'flex';
    setTimeout(() => {
      filtersContainer.style.opacity = '1';
    }, 1); 
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

document.addEventListener("DOMContentLoaded", () => {
  const unblockMessage = document.querySelector('.unblock-message');
  setTimeout(() => {
    unblockMessage.style.opacity = "1";
  }, 200);
});

