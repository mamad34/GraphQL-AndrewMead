const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { db }, info) => {
    const newCategory = {
      id: uuid(),
      name: input.name,
    };
    db.categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, { input }, { db }, info) => {
    const newProduct = {
      id: uuid(),
      name: input.name,
      description: input.description,
      quantity: input.quantity,
      price: input.price,
      image: input.image,
      onSale: input.onSale,
    };
    db.products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, { input }, { db }, info) => {
    const newReviews = {
      id: uuid(),
      date: input.date,
      title: input.title,
      comment: input.comment,
      rating: input.rating,
    };
    db.reviews.push(newReviews);
    return newReviews;
  },
  deleteCategory: (parent, { id }, { db }, info) => {
    db.categories = db.categories.filter((cat) => cat.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id)
        return {
          ...product,
          categoryId: null,
        };
      else return product;
    });
    return true;
  },
  deleteProduct: (parent, { id }, { db }, info) => {
    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return true;
  },
  deleteReview: (parent, { id }, { db }, info) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },
  updateCategory: (parent, { id, input }, { db }, info) => {
    const index = db.categories.findIndex((cat) => cat.id === id);
    if (index === -1) return null;
    db.categories[index] = { ...db.categories[index], ...input };
    return db.categories[index];
  },
  updateProduct: (parent, { id, input }, { db }, info) => {
    const index = db.products.findIndex((prd) => prd.id === id);
    if (index === -1) return null;
    db.products[index] = { ...db.products[index], ...input };
    return db.products[index];
  },
  updateReview: (parent, { id, input }, { db }, info) => {
    const index = db.reviews.findIndex((rev) => rev.id === id);
    if (index === -1) return null;
    db.reviews[index] = { ...db.reviews[index], ...input };
    return db.reviews[index];
  },
};
