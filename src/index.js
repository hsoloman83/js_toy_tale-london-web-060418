document.addEventListener('DOMContentLoaded', () => {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  fetchFunction()

  let submitBtn = document.getElementById('submit-input')
  submitBtn.addEventListener('click', function(e) {
    e.preventDefault()
    createToy(e);
  })

  addBtn.addEventListener('click', function(e){
    e.preventDefault()
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
})

function renderToys(json){
  json.forEach(function(toyData){
    let toyCollectionDiv = document.getElementById("toy-collection")
      let toyObj = new Toys(toyData.id, toyData.name, toyData.image, toyData.likes)
    // let toyDiv = document.createElement("div")
    // toyDiv.className = 'card'
    // toyDiv.innerHTML =  `<h2>${toy.name}</h2>
    // <img src='${toy.image}' class= "toy-avatar" id='${toy.id}'/>
    // <p>${toy.likes} Likes</p>
    // <button id=${toy.id} class="like-btn">Like <3</button>`
     //gets the id from the json file nothing is created
    toyCollectionDiv.append(toyObj.render())
    //console.log(dog.id)
  })
}

// function addToys(toy) {
//   let collection = getToyCollection()
//   collection.innerHTML += toy.render()
// }

function createToy(e) {
    e.preventDefault()
    let formInput = document.querySelectorAll('.input-text')
    let nameInput = formInput[0].value
    let imageInput = formInput[1].value

    let data = {
        name: nameInput,
        image: imageInput,
        likes: 0
    }
    fetch('http://localhost:3000/toys', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((toyData) => {
            let toy = new Toys(toyData.id, toyData.name, toyData.image, toyData.likes)
            fetchFunction();
            // addToys(toy)
            nameInput.value = ""
            imageInput.value = ""

        })
}

function fetchFunction() {
  let toyCollectionDiv = document.getElementById("toy-collection")
  toyCollectionDiv.innerHTML = ""
  fetch("http://localhost:3000/toys", {
    method: "GET"
  }).then(res => res.json())
    .then(json => renderToys(json))
}

function patchToy(toy){
fetch(`http://localhost:3000/toys/${toy.id}`, {
   method: 'PATCH',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(toy),
 })
 .then(res => res.json())
 .then(toy => fetchFunction());
}
