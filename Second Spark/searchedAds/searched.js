import {getAds, saveAds} from "../script.js";

const searchInput = document.querySelector('.search-input');
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
const footerCategories = document.querySelectorAll('.categories > .footer-row');
footerCategories.forEach((category) => {
  category.addEventListener("click", (event) => {
    const data = {
      searchTitle: '*',
      // priceChecked: false,
      minPrice: '',
      maxPrice: '',
      // categoryChecked: true,
      selectedCategory: event.target.innerText.trim()
    };
    sessionStorage.setItem("searchParams", JSON.stringify(data))
    window.location.href = '/searchedAds/searched.html'; 
  })
})
const minPrice = document.querySelector('#minPrice');
minPrice.addEventListener('input', function() {
  if (this.value < 0) {
    this.value = '';
  }
})
const maxPrice = document.querySelector('#maxPrice');
const selectedCategory = document.querySelector('.category-selector');
const sortSelect = document.querySelector(".sort-selector");
sortSelect.addEventListener("change", () => {
  sessionStorage.setItem("sortBy", JSON.stringify(sortSelect.value));
  window.location.href = '/searchedAds/searched.html'; 
});

let adArray;
prepareFilters()
prepareSort();
adArray = getAds();
adArray = filterAds(adArray);
adArray = sortAds(adArray);

if(adArray.length)
  for (let i = 0; i<adArray.length; i++) {
    if(adArray[i])
      createAdDiv(adArray[i]);
  }
else
  alert(`Didn't find any item!`)



function filterAds(array) {
  const searchParams = JSON.parse(sessionStorage.getItem("searchParams"));
  const searchTitle = searchParams.searchTitle;
  const minPrice = parseFloat(searchParams.minPrice); 
  const maxPrice = parseFloat(searchParams.maxPrice);
  const selectedCategory = searchParams.selectedCategory;

  if (minPrice && maxPrice) {
    array = array.filter((ad) => {
      const adPrice = parseFloat(ad.price);
      return adPrice >= minPrice && adPrice <= maxPrice;
    });
  } else if (minPrice) {
    array = array.filter((ad) => {
      const adPrice = parseFloat(ad.price);
      return adPrice >= minPrice;
    });
  } else if (maxPrice) {
    array = array.filter((ad) => {
      const adPrice = parseFloat(ad.price);
      return adPrice <= maxPrice;
    });
  }

  if(selectedCategory !== 'Any') {
    array = array.filter((ad) => {
      return ad.category === selectedCategory;
    })
  }

  if(searchTitle === "*" || !searchTitle) {
    return array;
  } else {
    array = array.filter((ad) => {
      return ad.title.toLowerCase().includes(searchTitle.toLowerCase());
    });
  }

  return array;
}

function sortAds(array) {
  const sortBy = JSON.parse(sessionStorage.getItem("sortBy"));
  switch (sortBy) {
    case 'Newest':
      array.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'Oldest':
      array.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'Highest price':
      array.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case 'Lowest price':
      array.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      console.log('elo')
      break;
  }
  return array;
}

function prepareSort() {
  const sortBy = JSON.parse(sessionStorage.getItem("sortBy"));
  const selectElement = document.querySelector('.sort-selector');
  const options = selectElement.querySelectorAll('option');
  options.forEach(option => {
    if (option.value === sortBy) {
      option.selected = true;
    }
  });
}

function prepareFilters() {
  const searchParams = JSON.parse(sessionStorage.getItem("searchParams"));
  const selectedCategory = searchParams.selectedCategory;
  const selectElement = document.querySelector('.category-selector');
  const options = selectElement.querySelectorAll('option');

  options.forEach(option => {
    if (option.value === selectedCategory) {
      option.selected = true;
    }
  });

  maxPrice.value = searchParams.maxPrice;
  minPrice.value = searchParams.minPrice;
  searchInput.value = searchParams.searchTitle;

}

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



// ######### footer category buttons #######











// const filterButton = document.querySelector('.filter-ad');
// const filtersContainer = document.querySelector('.filters-container');
// const priceCheckbox = document.querySelector('#price-checkbox');
// const priceContent = document.querySelector('.price-content');
// const categoryCheckbox = document.querySelector('#category-checkbox');
// const categoryContent = document.querySelector('.category-content');


// filterButton.addEventListener('click', () => {
//   if (filtersContainer.style.display === 'flex') {
//     filtersContainer.style.opacity = '0';
//     setTimeout(() => {
//       filtersContainer.style.display = 'none';
//     }, 200); // czas trwania animacji w milisekundach
//   } else {
//     filtersContainer.style.display = 'flex';
//     setTimeout(() => {
//       filtersContainer.style.opacity = '1';
//     }, 1); // opóźnienie pojawienia się elementu w milisekundach
//   }
// });

// priceCheckbox.addEventListener('change', () => {
//   if (priceCheckbox.checked === true) {
//     priceContent.style.display = 'flex';
//   } else {
//     priceContent.style.display = 'none';
//   }
// })

// categoryCheckbox.addEventListener('change', () => {
//   if (categoryCheckbox.checked === true) {
//     categoryContent.style.display = 'flex';
//   } else {
//     categoryContent.style.display = 'none';
//   }
// })
