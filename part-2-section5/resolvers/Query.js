const { reviews } = require("../db");

exports.Query = {
  books: () => "The bullShit Book",
  numberOfAnimals: () => 5,
  price: () => 3.32,
  hello: () => ["kir", "Kos"],
  products: (parent, { filter }, { categories, products }, info) => {
    let filteredProducts = products;
    if (filter && filter.onSale === true) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.onSale;
      });
      if ([1, 2, 3, 4, 5].includes(filter.avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;
          return avgProductRating >= filter.avgRating;
          console.log(sumRating, product.name);
        });
      }
      return filteredProducts;
    }
    return products;
  },
  product: (parent, args, { categories, products }, info) => {
    const dick = products.find((product) => product.id === args.id);
    return dick;
  },
  categories: () => categories,
  categorie: (parent, args, ctx, info) => {
    return categories.find((cat) => cat.id === args.id);
  },
};
