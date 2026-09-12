# Simple One-Page Web App

This is a simple product webpage built using **HTML, CSS, and JavaScript**. The project fetches products from the **DummyJSON API** and displays them on the webpage.

## Features

* Fetch products from API
* Search products by name
* Add and remove products from favorites
* Show favorite product count
* Loading message while fetching data
* Error message if the API request fails
* Responsive product layout

## Technologies Used

* HTML
* CSS
* JavaScript
* DummyJSON API
* Vercel for deployment


## Fetch and Search

I use `fetch()` to get the product data from the DummyJSON API. After receiving the response, I extract the products and display them on the page.

For search, I listen for changes in the search bar and filter the products by their title. Only products matching the entered text are displayed.
