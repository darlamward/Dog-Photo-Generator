console.log("Start!");

document.getElementById("dog-button").addEventListener("click", fetchDogBreeds)

async function fetchDogBreeds() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const dogBreeds = await response.json();
  populateDogSelect(dogBreeds.message);
}

function changeOption() {
  document.getElementById("option").innerHTML = "<option>Choose A Breed</option>"
}

function populateDogSelect(breedList) {
  document.getElementById("breed")
  let select = document.querySelector("#breeds")
  Object.keys(breedList).map(function (breed) {
    let newOption = document.createElement("option")
    newOption.value = breed
    newOption.id = breed
    newOption.innerText = breed
    console.log(breed)
    select.appendChild(newOption)
  })}

document.getElementById("get-images").addEventListener("click", getDogByBreed)

async function getDogByBreed() {
  let image_div = document.getElementById("image");
  while (image_div.firstChild) {
    image_div.removeChild(image_div.lastChild);
  }
  let breed = document.getElementById("breeds").value;
  if (breed != "Choose A Breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    input(data.message);
  } else {
    alert("Must choose a breed from list.")
    document.getElementById("input").innerHTML = "";
  }
}

function fillDogImage(images) {
  document.getElementById("input").innerHTML = `1 image shown`;
  document.getElementById("image").innerHTML = `
  <img id="dog-image" class="center" src="${images[0]}" alt="Doggy"></img>  `
}

function input(data) {
  let breed = document.getElementById("breeds").value;
  var x = document.getElementById("numberOfImages").value;
  if (x <= 0 || x >= 101) {
    alert("Number must be between 1 and 100.")
    document.getElementById("input").innerHTML = "";
  } else {
    if (x == 1 && breed != "Click button above to load breed list") {
      console.log("image");
      fillDogImage(data);
    } else if (x == 1 && breed == "Click button above to load breed list"){
      console.log("no input");
    } else {
      console.log("images");
      fillDogImages(data);
    }
  }
}

function fillDogImages(images) {
  var x = document.getElementById("numberOfImages").value;
  for (var i = 1; i <= x; i++) {
    if (images[i] != undefined) {
      var newImageElement = document.createElement("img");
      let imageDiv = document.querySelector("#image");
      newImageElement.id = "dog-image"
      newImageElement.src = images[i]
      newImageElement.alt = "Doggy"
      imageDiv.appendChild(newImageElement);
      document.getElementById("input").innerHTML = `${i} images shown`;
    } else {
      alert(`Only ${i - 1} images available`);
      break;
    }
  }
}

const dog_result = document.getElementById('image');
const random = document.getElementById('random');

random.addEventListener("click", getRandom);

function getRandom() {
  fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json()).then(data => {
          dog_result.innerHTML = `<img id="dog-image" src="${data.message}"/>`
      })
      document.getElementById("input").innerHTML = "";
}
