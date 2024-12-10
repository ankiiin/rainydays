document.addEventListener("DOMContentLoaded", async (event) => {
    try {
        const baseUrl = "https://v2.api.noroff.dev/rainy-days";
        const token = ""; 
        const productsContainer = document.querySelector(".containers");

        productsContainer.innerHTML = "";  

        const response = await fetch(baseUrl, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        const json = await response.json();
        const products = json.data;

        products.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            const productLink = document.createElement("a");
            productLink.href = `product.html?id=${product.id}`;
            productLink.classList.add("product-link");  

            const img = document.createElement("img");
            img.src = product.image.url;
            img.alt = product.title;
            img.classList.add("product-image");
            productLink.appendChild(img);

            const productName = document.createElement("div");
            productName.classList.add("product-name");
            productName.textContent = product.title;
            productLink.appendChild(productName);

            const productPrice = document.createElement("div");
            productPrice.classList.add("product-price");
            productPrice.textContent = `$${product.price}`;
            productLink.appendChild(productPrice);

            productCard.appendChild(productLink);
            productsContainer.appendChild(productCard);
        });

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
});

function displayErrorMessage(message) {
    const mainContainer = document.querySelector("main");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
    mainContainer.appendChild(errorMessage);
}
