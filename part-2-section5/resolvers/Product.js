exports.Product = {
  category: (parent, args, { categories, products }, info) => {
    return categories.find((cat) => cat.id === parent.categoryId);
  },
  reviews: (parent, args, { reviews }, info) => {
    return reviews.filter((review) => review.productId === parent.id);
  },
};
