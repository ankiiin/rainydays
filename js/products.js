document.addEventListener("DOMContentLoaded", async (event) => {
    console.log("Hiya");
    const baseUrl = "https://v2.api.noroff.dev/rainy-days";
    const productsContainer = document.querySelector(".containers");
    productsContainer.innerHTML = "";

    const response = await fetch(baseUrl);
    const json = await response.json();
    const products = json.data;

    products.forEach((product) => {
        const li = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = `product.html?id=${product.id}`;
        anchor.classList.add("product");

        const img = document.createElement("img");
        img.src = product.image.url;
        img.alt = product.image.alt ?? product.title;
        img.height = 300;
        img.width = 300;
        anchor.appendChild(img);

        const h3 = document.createElement("h3");
        h3.innerText = product.title;
        anchor.appendChild(h3);

        const p = document.createElement("p");
        p.innerText = `$ ${product.price}`;
        anchor.appendChild(p);

        li.appendChild(anchor);
        productsContainer.appendChild(li);
    });
});