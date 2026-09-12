const API_URL = "https://dummyjson.com/products";

const searchBar = document.getElementById("searchbar");
const favoriteButton = document.getElementById("favbutton");
const favoriteCount = document.getElementById("favorites");

const loadingMessage = document.querySelector(".loading-message");
const errorMessage = document.querySelector(".error-message");
const productContainer = document.getElementById("productContainer");

let products = [];
let favorites = [];

async function fetchProducts() {
    loadingMessage.style.display = "block";
    errorMessage.style.display = "none";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        products = await response.json();
        displayProducts(products);

    } catch (error) {
        errorMessage.style.display = "block";
        productContainer.innerHTML = "";
        console.error("Error:", error);

    } finally {
        loadingMessage.style.display = "none";
    }
}

function displayProducts(productsToDisplay) {
    productContainer.innerHTML = "";

    if (productsToDisplay.length === 0) {
        productContainer.innerHTML = `
            <p class="no-products">
                No products found.
            </p>
        `;
        return;
    }

    productsToDisplay.forEach(function (product) {
        const isFavorite = favorites.includes(product.id);

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.title}"
                class="product-image"
            >

            <h2 class="product-title">
                ${product.title}
            </h2>

            <p class="product-category">
                Category: ${product.category}
            </p>

            <p class="product-price">
                $${product.price}
            </p>

            <p class="product-rating">
                ⭐ ${product.rating.rate}
                (${product.rating.count} reviews)
            </p>

            <button 
                class="favorite-product-button"
                data-id="${product.id}"
            >
                ${isFavorite ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
            </button>
        `;

        productContainer.appendChild(productCard);
    });

    addFavoriteButtonListeners();
}

function addFavoriteButtonListeners() {
    const buttons = document.querySelectorAll(
        ".favorite-product-button"
    );

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productId = Number(button.dataset.id);

            if (favorites.includes(productId)) {
                favorites = favorites.filter(function (id) {
                    return id !== productId;
                });
            } else {
                favorites.push(productId);
            }

            updateFavoriteCount();
            displayProducts(getFilteredProducts());
        });
    });
}

function updateFavoriteCount() {
    favoriteCount.textContent = favorites.length;
}

searchBar.addEventListener("input", function () {
    const searchText = searchBar.value.toLowerCase().trim();

    const filteredProducts = products.filter(function (product) {
        return product.title
            .toLowerCase()
            .includes(searchText);
    });

    displayProducts(filteredProducts);
});

function getFilteredProducts() {
    const searchText = searchBar.value.toLowerCase().trim();

    return products.filter(function (product) {
        return product.title
            .toLowerCase()
            .includes(searchText);
    });
}

favoriteButton.addEventListener("click", function () {
    if (favorites.length === 0) {
        productContainer.innerHTML = `
            <p class="no-products">
                You don't have any favorite products.
            </p>
        `;
        return;
    }

    const favoriteProducts = products.filter(function (product) {
        return favorites.includes(product.id);
    });

    displayProducts(favoriteProducts);
});

fetchProducts();