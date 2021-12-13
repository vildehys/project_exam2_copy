const url = "https://vhys.one/wp-json/wp/v2/posts?_embed&per_page=100";
async function fetchDetails() {
    const response = await fetch(url);
    const data = await response.json();
    generateDivs(data);
}

function generateDivs(jsonData) {
    let containterTag = document.getElementsByClassName("container");
    let counter = 0 

    jsonData.forEach(function(item, index) {
        let blogPostDiv = document.createElement("div");
        blogPostDiv.className = "blogposts";

        if (counter > 9) {
          blogPostDiv.style = "display: none;";
       }

        let imageTag = document.createElement("img");
        imageTag.src = item._embedded["wp:featuredmedia"][0].source_url 
        imageTag.className = "modal-target";
        imageTag.alt = item.title.rendered.replace(/<\/?[^>]+(>|$)/g, "");
        blogPostDiv.appendChild(imageTag);

        let pictureNameTag = document.createElement("h1");
        pictureNameTag.innerHTML = item.title.rendered
        blogPostDiv.appendChild(pictureNameTag);        

        let descriptionTag = document.createElement("p");
        descriptionTag.innerHTML = item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "");
        blogPostDiv.appendChild(descriptionTag);

        let buttonTag = document.createElement("a");
        buttonTag.className = "button";
        buttonTag.href = `post.html?id=${item.id}`;
        buttonTag.innerHTML = "View More";
        blogPostDiv.appendChild(buttonTag);

        containterTag[0].appendChild(blogPostDiv);
        counter += 1
    });

    var modal = document.getElementById("modal");
    var modalClose = document.getElementById("modal-close");

    modalClose.addEventListener("click", function() {
        modal.style.display = "none";
    });

    document.onkeydown = function({
        keyCode
    }) {
        if (keyCode === 27) {
            modal.style.display = "none";
        }
    };

    document.addEventListener("click", function(e) {
        if (e.target.className.indexOf("modal-target") !== -1) {
            var img = e.target;
            var modalImg = document.getElementById("modal-content");
            var captionText = document.getElementById("modal-caption");
            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerHTML = img.alt;
        }
        if (e.target === modal) {
            modal.style.display = "none";
        }

    });
}

function viewMorePosts() {
  var blogPostDivs = document.querySelectorAll('[style="display: none;"]')
  let counter = 0

  for (let i = 0; i < blogPostDivs.length; i++) {
      if (blogPostDivs[i].style.display === "none" && counter < 2) {
         blogPostDivs[i].style.display = "";
         counter += 1
      }
  }

  if (document.querySelectorAll('[style="display: none;"]').length === 0) {
     var moreButton = document.getElementById("myBtn")
     moreButton.style = "display: none;";
  }
}

fetchDetails();