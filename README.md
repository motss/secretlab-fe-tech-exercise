
## SecretLab Frontend Test Exercise <!-- omit in toc -->

This is a coding test, written in Next.js, Tailwind, TypeScript, and Zustand.

> Refer to this [tech specs] for more details in terms of requirements and implementation details.

## Table of contents <!-- omit in toc -->

- [Pre-requisites](#pre-requisites)
- [Requirements](#requirements)
- [Setup](#setup)
- [How to run](#how-to-run)
- [Project structure](#project-structure)
- [Available Routes](#available-routes)
- [Testings](#testings)
- [How the app works](#how-the-app-works)
  - [Products (/products)](#products-products)
  - [Product (/product/\[id\])](#product-productid)
  - [Cart (/cart)](#cart-cart)
  - [Checkout](#checkout)

## Pre-requisites

1. `node` >= 21
2. `npm` >= 10.2.0
3. `Chrome` >= 120

## Requirements

| Requirement                                                         | Status | Description                                                                                                        |
| ------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| sharable page header for all pages                                  | ✅      | Single page header component renders in the `layout.tsx` for all pages.                                            |
| mini cart on header to show live quantity of products added to cart | ✅      | Header will show the updated cart number when products gets added to / removed from the cart,                      |
| Fetch data from `dummyjson.com` thru a proxy API                    | ✅      | See the proxy in the `/api` directory                                                                              |
| all pages has to be responsive in desktop, table, and mobile        | ✅      | All pages are responsive.                                                                                          |
| Write tests for business logics                                     | ✅      | Tests are only written for files with business logics, using `vitest`                                              |
| **PLUS**: Use `zustand`                                             | ✅      | `zustand` is used to manage state for the cart.                                                                    |
| View products in cart                                               | ✅      | Cart will show live updated products that are added to/ removed from the cart.                                     |
| Able to inc/ dec quantity of added product                          | ✅      | Quantity of an added product in the cart can be updated.                                                           |
| Able to remove added product                                        | ✅      | Products in cart can be removed.                                                                                   |
| Able to update cart on quantity changes without page refresh        | ✅      | Cart updates product quantity without page refresh.                                                                |
| Live calculation of all prices including cart summary total         | ✅      | This was done with a proxy API to recalculate the cart when the cart state changes.                                |
| list of products in a grid                                          | ✅      | Products are rendered in a responsive grid.                                                                        |
| Filter products by categories, rating, price                        | ✅      | This was done with a proxy API that accepts filters to filter the products with categories, rating, and/ or price. |
| View product details                                                | ✅      | Sharable product details page for selected product.                                                                |
| Add to cart button in product details                               | ✅      | Product can be added to the cart from details page.                                                                |
| Product detail should show added count when added to cart           | ✅      | Product details will render the intial quantity fromm the cart state, if any.                                      |

## Setup

Run `npm install` to install all dependencies required to run the exercise.

## How to run

To preview the web app locally, follow the steps below:

1. Run `npm dev` to run the dev server to serve local assets and to dynamically render the pages.
1. You should see the following output:
   ```sh
   > next dev

    ▲ Next.js 14.0.4
    - Local:        http://localhost:3000

    ✓ Ready in 2.6s
   ```
2. Visit `http://localhost:3000/` using latest Chrome 120.
3. You should see the rendered web app.
4. Done.

## Project structure

The project structure basically follows what Next.js provides out-of-the-box from the scaffold.

```sh
- src  # main source code foler
  `- app
    |- __mocks__ # Mock data for testing
    |- api # Proxy APIs
    |- cart # cart page, route: /cart
    |- checkout # checkout page, route: /checkout
    |- components # sharable components
    |- constants # reusable variables/ constants
    |- helpers # sharable helper functions
    |- hooks # reusable React hooks
    |- products # products page, route: /products, /products/[id]
    |- store # zustand powered store
    |- types # sharable typing files
    |- layout.tsx # main layout
    `- page.tsx # main page, route: /
  `- setupTest.ts # Test setup
```

## Available Routes

```sh
- / # Root page, redirects to `/products`
- /products # Products page
- /products/[id] # Product details page
- /cart # Cart summary page
- /checkout # Checkout page
```

## Testings

Tests are only written for files that contain business logics, using [vitest].

## How the app works

### Products (/products)

This is the first page you will see and it makes 2 API calls in the backend to fetch:
  1. product categories, and
  2. products (with optional search queries, e.g. `?filter.category=laptop`)
These data are required to SSR the products page in a grid layout with a collection of sharable components such as `ProductCard`.

The product categories are used to render the product filters in `ProductGridFilters` component. Users are allowed to filter the product grid with a combination of `category`, `price`, and/ or `rating`. Upon selecting any filters, it will trigger the page to re-render the page dynamically by fetching the APIs from the server and then it will incrementally re-renders parts of the page that requires those new changes.

### Product (/product/[id])

When user selects a product from the product grid, it redirects the user to a product details page by updating the page URL. The page is dynamically rendered at the server by fetching the product details API with the provided product ID. The page allows the user to view the details of the selected product such as `title`, `brand`, `category`, `price`, `discount` (if any), product image. User can choose to add the product to the cart with the desired product quantity. Upon adding a product to the cart, user should see the updated count at the top right corner of the page header.

### Cart (/cart)

When user clicks the cart icon on the page header, it will redirects the user to the cart page where the page shows 2 sections in the page:

1. cart summary with price breakdown, such as `Subtotal`, `Discount total`, and `Total`
2. A list of added products showing its subtotal, quantity, and total

In the cart page, user can review the cart before checking out. User can update quantity of any product or even remove a product that is no longer needed. The cart summary will recalculate when the quantity of any product in the cart changes. This is achieved by listening to the cart state using `zustand` and the latest store state will be sent to the proxy API to calculate the cart. This process does not refresh the page as it is done by using native `window.fetch` to fetch the data and re-render the cart page directly on the browser.

### Checkout

Upon clicking the `Checkout` button in the cart page, it redirects the user to simulated checkout page that always show the user a success message. This checkout page is created for testing purpose and it does not send any data to any public payment gateway.

---

<p align=center>--- End ---</p>

<!-- References -->
[tech specs]: ./test.specs.pdf
[vitest]: https://vitest.dev/
