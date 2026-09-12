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

## Errors I Faced

### 1. Products were not displaying

Initially, I used:

```javascript
products = await response.json();
```

and tried to use `.forEach()` directly on the response.

The problem was that DummyJSON returns an object containing the products inside the `products` property.

### Solution

I changed it to:

```javascript
const data = await response.json();
products = data.products;
```

Now `products` is an array, so `.forEach()` works correctly.

### 2. Product images were not displaying

I initially used the wrong image property from another API structure.

DummyJSON provides the product image through:

```javascript
product.thumbnail
```

So I changed the image source to:

```javascript
<img src="${product.thumbnail}" alt="${product.title}">
```

## Deployment

The project is deployed on Vercel.
