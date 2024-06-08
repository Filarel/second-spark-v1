import { Advertisement, getAds, saveAds} from "../script.js";
import { getUserFromSession } from "../script.js";

const adArray = getAds();
const user = getUserFromSession();
const title = document.querySelector(".ad-title");
const category = document.querySelector(".ad-category");
const description = document.querySelector(".ad-description");
const phone = document.querySelector(".ad-phone");
const price = document.querySelector(".ad-price");
const imgContainer = document.querySelector(".img"); 

if(user){
  const loginMessage = document.querySelector('.not-logged-msg');
  loginMessage.style.display = 'none';
  phone.value = user.phone;
} else {
  const redirectElement = document.querySelector('.redirecting');
  let counter = 4;
  redirectElement.textContent = `Redirecting to login page in ${counter} seconds...`;
  const redirectInterval = setInterval(() => {
    counter--;
    redirectElement.textContent = `Redirecting to login page in ${counter} seconds...`;
    if (counter === 0) {
      clearInterval(redirectInterval);
      window.location.href = '/loggingPage/loging.html'; 
    }
  }, 1000);
}

const apiKey = '502436e7d84dd798b9e5d0e045474df1';
const fileInput = document.querySelector('input[type="file"]');
const postButton = document.querySelector(".post-the-item")
// postButton.addEventListener("click", addItem)

function addItem(imageUrl){
  adArray.unshift(new Advertisement(user.username, title.value, price.value, phone.value, imageUrl, category.value, description.value));
  saveAds(adArray);
  window.location.href = '../mainPage/main.html';
}

const uploadImage = async (imageData) => {
  try {
    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', imageData);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Uploaded:', data);
      return data;
    } else {
      throw new Error('Image upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

postButton.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!category.value || !title.value || !price.value || !phone.value || !category.value || !description.value) {
    alert("Please fill in all fields.");
    console.log(!category.value, !title.value, !price.value, !phone.value, !category.value, !description.value)
  } else if (!file) {
    alert("Please add a picture.");
  } else {
    const uploadedImage = await uploadImage(file);
    if (uploadedImage) {
      const imageUrl = uploadedImage.data.url;
      addItem(imageUrl);
    }
  }
});

fileInput.addEventListener('change', () => {
  imgContainer.innerHTML = `<i class="fa-solid fa-check"></i>`
  fileInput.disabled = true;
  imgContainer.style.cursor = 'not-allowed'; 
  imgContainer.style.filter = 'brightness(100%)'
});

document.addEventListener("DOMContentLoaded", () => {
  const notLoggedMsg = document.querySelector('.not-logged-msg');
  setTimeout(() => {
    notLoggedMsg.style.opacity = "1";
  }, 200);
});