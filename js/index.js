document.addEventListener("DOMContentLoaded", async (event) => {
    try {
        const baseUrl = "https://v2.api.noroff.dev/rainy-days";
        const token = "";  
        const productsContainer = document.querySelector(".carousel-images");

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

        const productsToShow = products.slice(0, 3);

        productsToShow.forEach(product => {
            const slide = document.createElement("div");
            slide.classList.add("carousel-item");

            const productLink = document.createElement("a");
            productLink.href = `../html/product.html?id=${product.id}`;
            productLink.classList.add("carousel-link");  

            const img = document.createElement("img");
            img.src = product.image.url;
            img.alt = product.title;
            img.classList.add("carousel-image"); 

            const productName = document.createElement("div");
            productName.classList.add("product-name");
            productName.textContent = product.title;

            productLink.appendChild(img);
            productLink.appendChild(productName);

            slide.appendChild(productLink);
            productsContainer.appendChild(slide);
        });

        let currentIndex = 0; 
        let isTransitioning = false;

        function slideToNext() {
            if (isTransitioning) return;

            isTransitioning = true;
            currentIndex++;

            const slides = document.querySelectorAll(".carousel-item");
            const offset = -currentIndex * slides[0].offsetWidth;

            productsContainer.style.transition = "transform 0.5s ease";
            productsContainer.style.transform = `translateX(${offset}px)`;

            productsContainer.addEventListener("transitionend", () => {
                if (currentIndex === slides.length) {
                    currentIndex = 0;
                    productsContainer.style.transition = "none";  
                    productsContainer.style.transform = `translateX(${-currentIndex * slides[0].offsetWidth}px)`;
                }
                isTransitioning = false;
            }, { once: true });
        }

        function slideToPrev() {
            if (isTransitioning) return;

            isTransitioning = true;
            currentIndex--;

            const slides = document.querySelectorAll(".carousel-item");
            const offset = -currentIndex * slides[0].offsetWidth;

            productsContainer.style.transition = "transform 0.5s ease";
            productsContainer.style.transform = `translateX(${offset}px)`;

            productsContainer.addEventListener("transitionend", () => {
                if (currentIndex < 0) {
                    currentIndex = slides.length - 1;
                    productsContainer.style.transition = "none"; 
                    productsContainer.style.transform = `translateX(${-currentIndex * slides[0].offsetWidth}px)`;
                }
                isTransitioning = false;
            }, { once: true });
        }

        setInterval(slideToNext, 3000);

        document.querySelector(".carousel-control.next").addEventListener("click", slideToNext);
        document.querySelector(".carousel-control.prev").addEventListener("click", slideToPrev);

    } catch (error) {
        console.error("An error occurred:", error);
    }
});

document.addEventListener("DOMContentLoaded", async (event) => {
    try {
        const baseUrl = "https://v2.api.noroff.dev/rainy-days";
        const token = "";
        const gridContainer = document.querySelector(".thumbnail-grid");

        gridContainer.innerHTML = "";

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

        const productsToShow = products.slice(0, 6);

        productsToShow.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("thumbnail-card");

            const productLink = document.createElement("a");
            productLink.href = `../html/product.html?id=${product.id}`;

            const img = document.createElement("img");
            img.src = product.image.url;
            img.alt = product.title;

            const productName = document.createElement("div");
            productName.classList.add("product-name");
            productName.textContent = product.title;

            productLink.appendChild(img);
            productLink.appendChild(productName);

            card.appendChild(productLink);
            gridContainer.appendChild(card);
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburgerMenu.addEventListener("click", function() {
        mobileMenu.classList.toggle("active");
    });
});