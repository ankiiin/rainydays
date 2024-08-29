document.addEventListener("DOMContentLoaded", function() {
    apiUrl = 'https://v2.api.noroff.dev/rainy-days';
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            function displayPosts(posts) {
                const main = document.querySelector('main');
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                main.appendChild(postElement);
            })
        }
})});