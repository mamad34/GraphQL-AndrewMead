exports.Categorie = {
  products: (parent, { filter }, { db }, info) => {
    const categoryProducts = db.products.filter(
      (product) => product.categoryId === parent.id
    );
    let filteredCategoryProducts = categoryProducts;
    if (filter && filter.onSale === true) {
      filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
        return product.onSale;
      });
      console.log("Dick");
    }
    return filteredCategoryProducts;
  },
};
