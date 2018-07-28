class Toys {
  constructor(id,name,image,likes){
    this.id = id
    this.name = name
    this.image = image
    this.likes = likes
  }

  render() {
    console.log("rendering toy")
    let div = document.createElement("div")
    div.className = "card";
    div.innerHTML = `
    <h2>${this.name}</h2>
    <img src='${this.image}' class= "toy-avatar" id='${this.id}'/>
    <p>${this.likes} Likes</p>
    <button id=${this.id} class="like-btn">Like <3</button>`

    let like = div.querySelector('.like-btn');
    like.addEventListener("click", (e) => {
      e.preventDefault();
      this.likes += 1
      patchToy(this)
    })

    return div
  }
}
