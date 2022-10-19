exports.Product = {
  category: (parent, args, { db }, info) => {
    return db.categories.find((cat) => cat.id === parent.categoryId);
  },
  reviews: (parent, args, { db }, info) => {
    return db.reviews.filter((review) => review.productId === parent.id);
  },
};
