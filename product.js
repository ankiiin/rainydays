document.addEventListener("DOMContentLoaded", function () {
    apiUrl = "https://v2.api.noroff.dev/rainy-days";
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            const productContainer = document.getElementById("productContainer");
            response.data.forEach((product) => {
                const productCard = document.createElement("div");
                productCard.setAttribute("class", "productCard");

                productImage = document.createElement("img");
                productImage.setAttribute("src", product.image.url);
                productImage.setAttribute("alt", product.alt ?? product.title);
                productCard.appendChild(productImage);

                productTitle = document.createElement("h3");
                productTitle.innerText = product.title;
                productCard.appendChild(productTitle);

                productDescription = document.createElement("p");
                productDescription.innerText = product.description;
                productCard.appendChild(productDescription);

                productPrice = document.createElement("p");
                productPrice.innerText = `$ ${product.price}`;
                productCard.appendChild(productPrice);

                productButton = document.createElement("button");
                productButton.setAttribute("class", "button");
                productButton.innerText = "Add to cart";
                productCard.appendChild(productButton);

                productContainer.appendChild(productCard);
            });
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
});