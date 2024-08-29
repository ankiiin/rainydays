document.addEventListener("DOMContentLoaded", function() {
    apiUrl = 'https://v2.api.noroff.dev/rainy-days';
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const productImage = document.getElementById('productImage');
        data.data.forEach(product => {
            const listImage = document.createElement('sailorimg');
            const productLink = document.createElement('sailorimg');
            productLink.href = `sailorjacket.html?id=${product.id}`;
            productLink.textContent = product.image;
            listItem.appendChild(product.image);
            productList.appendChild(sailorimg);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
})