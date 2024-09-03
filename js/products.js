document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const apiUrl = `https://v2.api.noroff.dev/rainy-days/${id}`;

    const response = await fetch(apiUrl);
    const json = await response.json();

    const product = json.data;

    console.log(product);
    const image = document.querySelector("#product-image");
    image.src = product.image.url;
    image.alt = product.image.alt ?? product.title;

    const title = document.querySelector(".product-title");
    title.innerText = product.title;

    const description = document.querySelector(".product-description");
    description.innerText = product.description;

    const price = document.querySelector(".product-price");
    price.innerText = `$ ${product.price}`;
});