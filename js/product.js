document.addEventListener("DOMContentLoaded", async () => {
    try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const apiUrl = `https://v2.api.noroff.dev/rainy-days/${id}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const json = await response.json();
    const product = json.data;

    console.log(product);
    const imageContainer = document.querySelector(".product-image");
    const image = document.createElement("img");
    image.src = product.image.url;
    image.alt = product.image.alt ?? product.title;
    imageContainer.appendChild(image);

    const title = document.querySelector(".product-title");
    title.innerText = product.title;

    const description = document.querySelector(".product-description");
    description.innerText = product.description;

    const price = document.querySelector(".product-price");
    price.innerText = `$ ${product.price}`;

    const spinner = document.querySelector(".spinner");
    spinner.remove();
    
} catch (error) {

    console.error("An error occurred:", error);
    displayErrorMessage("Sorry, we couldn't load the products. Please try again later.");

    const spinner = document.querySelector(".spinner");
    if (spinner) {
        spinner.remove();
    }
}

})

function displayErrorMessage(message) {
    const mainContainer = document.querySelector("main");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
    mainContainer.appendChild(errorMessage);
}

