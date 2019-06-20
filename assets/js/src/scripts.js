const posts = (function () {
    const url = "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs";
    // var url = "https://www.googleapis.com/blogger/v3/blogs/humandeceit/posts";

    return {
        sendSearch: function()
        {
            let searchTerm = document.querySelector("#searchTerm").value;
            fetch(url + `${searchTerm}`)
            .then(response => response.json())
            .then(json => {
                let searchResult = document.querySelector("#searchResult")
                let result = json.map(item => 
                    `<li>${item.title}</li>`
                )
            })    
            searchResult.innerHTML = result;
        },

        
        getPosts: function () {
            fetch(url)
                .then(function (response) {
                    if (response.ok) {
                        response.json()
                            .then(function (data) {

                                var blogWrapper = document.getElementById("demo")
                                var allPosts = data.map(item => {

                                    // console.log(item);
                                    var capitalLetter = item.title.charAt(0).toUpperCase();
                                    var title = `<h2 class='blog-post-title'>${capitalLetter + item.title.slice(1)}</h2>`;
                                    var body = `<p>${item.body}</p>`;
                                    var meta = `<p class='blog-post-meta'>Post <a href='#'>#${item.id}</a></p>`
                                    var blogPost = `<div class='blog-post'>${title + meta + '<hr/>' + body + body}</div>`
                                    return blogPost;
                                })
                                    .splice(0, 4)
                                    .join("")
                                blogWrapper.innerHTML = allPosts;
                                // console.log(data);

                            })
                    }
                })
        }
    }


}())


const search = (function () {
    return {



        openSearch: function () {
            document.querySelector('#searchLink')
                .addEventListener("click", () => {
                    let form = document.querySelector("#searchBox");
                    let input = document.querySelector("#searchBox > input");
                    let submitSearch = document.querySelector("#submitSearch");

                    // form.style.display = "block";

                    form.animate(
                        [
                            {
                                transform: "translateX(150px)"
                            },
                            {
                                transform: "translateX(0px)"
                            }
                        ],
                        {
                            duration: 300,
                            iterations: 1
                        }
                    )
                    input.focus();
                    submitSearch.addEventListener("click", function () {
                        posts.sendSearch()
                    })
                }
                )
        }
    }
}())

posts.getPosts();

search.openSearch();




// function reqListener() {
//   this.responseText;
//   console.log(this.responseText)
// }

// var oReq = new XMLHttpRequest();
// oReq.onload = reqListener;

// oReq.open("get", "https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs", true);
// oReq.send();
