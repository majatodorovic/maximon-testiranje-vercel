This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Module documentation
SEO sitemap module, [documentation](docs/SEO/sitemap-module.md).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## E-Commerce Hooks

Our custom e-commerce hooks are implemented in the file `hooks/ecommerce.hooks.js`. Our project leverages custom hooks for seamless integration with the **B2C/B2B Admin** backend. These hooks, built with **React Query**, facilitate efficient data fetching, caching, and state management for key e-commerce functionalities.

### Available Hooks

#### `useCategoryTree`

Fetches the hierarchical structure of product categories.

```javascript
export const useCategoryTree = () => {
  return useSuspenseQuery({
    queryKey: ["categoryTree"],
    queryFn: async () => {
      return await GET(`/categories/product/tree`).then((res) => res?.payload);
    },
  });
};
```

#### `useLandingPages`

Retrieves a list of landing pages.

```javascript
export const useLandingPages = () => {
  return useSuspenseQuery({
    queryKey: ["landingPagesList"],
    queryFn: async () => {
      return await LIST(`/landing-pages/list`).then((res) => res?.payload);
    },
  });
};
```

#### `useAddToCart`

Adds an item to the cart. Parameters include:

```javascript
export const useAddToCart = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async ({ id, quantity, message, type = false }) => {
      return await POST(`/cart`, {
        id_product: +id,
        quantity: quantity,
        id_product_parent: null,
        description: null,
        status: null,
        quantity_calc_type: type ? "replace" : "calc",
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            toast.success(message ?? "Uspešno dodato u korpu", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Greška prilikom dodavanja u korpu", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};
```

#### `useCartBadge`

Fetches the total number of items in the cart.

```javascript
export const useCartBadge = () => {
  const [cart] = useCartContext();

  return useQuery({
    queryKey: ["cartBadge", cart],
    queryFn: async () => {
      return await GET("/cart/badge-count").then(
        (res) => res?.payload?.summary?.items_count ?? 0
      );
    },
  });
};
```

#### `useWishlistBadge`

Fetches the total number of items in the wishlist.

```javascript
export const useWishlistBadge = () => {
  const [, , wishList] = useCartContext();

  return useQuery({
    queryKey: ["wishlistBadge", wishList],
    queryFn: async () => {
      return await GET("/wishlist/badge-count").then(
        (res) => res?.payload?.summary?.items_count ?? 0
      );
    },
    refetchOnWindowFocus: false,
  });
};
```
