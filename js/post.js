const blogPost = document.querySelector(".container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = `https://vhys.one/wp-json/wp/v2/posts?_embed&include=` + id;

async function fetchPost() {
  try {
    const response = await fetch(url);
    const specifics = await response.json();

    console.log(specifics);
    createHtml(specifics);
  } catch (error) {
    console.log(error);
    blogPost.innerHTML = message("error", error);
  }
}
fetchPost();
function createHtml(info) {
    console.log(info[0]._embedded["wp:featuredmedia"][0].source_url)
  blogPost.innerHTML = `
    <div class="post">
    <h1>This weeks horoscope</h1>
    <div class="comments">
    <h2> 25/11-21 </h2>
    <h2> 3 comments </h2>
    </div>
    <img src="${info[0]._embedded["wp:featuredmedia"][0].source_url}" alt="">
    <p class="text" src="${info[0].content.rendered}"</p>

      </div>  `;
}

