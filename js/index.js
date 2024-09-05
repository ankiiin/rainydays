document.addEventListener("DOMContentLoaded", async (event) => {
    try {
        console.log("Hiya");

        const baseUrl = "https://v2.api.noroff.dev/rainy-days";
        const productsContainer = document.querySelector(".popular_products");
        productsContainer.innerHTML = "";

        const response = await fetch(baseUrl);
        
        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        const json = await response.json();
        const products = json.data;

        for (let i = 0; i < 3; i++) {
            const product = products[i];
            const li = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.href = `product.html?id=${product.id}`;
            anchor.classList.add("product");

            const img = document.createElement("img");
            img.src = product.image.url;
            img.alt = product.image.alt ?? product.title;
            img.height = 300;
            img.width = 300;
            
            img.onerror = function() {
                console.warn("Could not load the product image.");
                img.src = "images/fallback.png";
            };

            anchor.appendChild(img);

            const h3 = document.createElement("h3");
            h3.innerText = product.title;
            anchor.appendChild(h3);

            const p = document.createElement("p");
            p.innerText = `$ ${product.price}`;
            anchor.appendChild(p);

            li.appendChild(anchor);
            productsContainer.appendChild(li);
        }

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