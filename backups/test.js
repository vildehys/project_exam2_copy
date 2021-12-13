
/*const baseUrl ="https://vhys.one/wp-json/wp/v2/posts?_embed&per_page=100";
const postContainer = document.querySelector(".container");

async function getPosts(baseUrl) {
  try {
    const response = await fetch(baseUrl);
    const posts = await response.json();

    posts.forEach(function(post) {

      console.log(post)
      
        postContainer.innerHTML += 
        `
        <div class="posts">
        <h3 class="text">${post.title.rendered}</h3>
        <img src="${post._embedded["wp:featuredmedia"][0].source_url}">

        </div>`;
     });
  } catch (err) {
      console.error(err);
  }
    
}

getPosts(baseUrl); */

var slideIndex = 1;

const url = "https://vhys.one/wp-json/wp/v2/posts?_embed";

async function fetchDetails() {
    const response = await fetch(url);
    const data = await response.json();
    generateDivs(data)
    showSlides(slideIndex);
}

function generateDivs(jsonData) {
   let slideShowContainer = document.getElementsByClassName("slideshow-container");
   jsonData.forEach(function (item, index) {
      index += 1
      let imageDiv = document.createElement("a");
      imageDiv.className = "mySlides"
      imageDiv.setAttribute("href", "post.html?id=" + item.id);

      let numberText = document.createElement("div");
      numberText.innerText = index.toString() + " / " + jsonData.length
      numberText.className = "numbertext";
      imageDiv.appendChild(numberText)

      let imageTag = document.createElement("img");
      imageTag.src = item._embedded["wp:featuredmedia"][0].source_url 
      imageDiv.appendChild(imageTag)

      let imageText = document.createElement("div");
      imageText.innerHTML = item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "");
      imageText.className = "text"
      imageDiv.appendChild(imageText)

      slideShowContainer[0].appendChild(imageDiv);

   });

   let pointer_left = document.createElement("a");
   pointer_left.setAttribute("onclick", "plusSlides(-1)");
   pointer_left.className = "prev"
   pointer_left.innerHTML = "&#10094;"
   slideShowContainer[0].appendChild(pointer_left)

   let pointer_right = document.createElement("a");
   pointer_right.setAttribute("onclick", "plusSlides(1)");
   pointer_right.className = "next"
   pointer_right.innerHTML = "&#10095;"
   slideShowContainer[0].appendChild(pointer_right)
}

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

fetchDetails()
