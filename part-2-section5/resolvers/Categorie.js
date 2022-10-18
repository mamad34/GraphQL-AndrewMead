exports.Categorie = {
  products: (parent, { filter }, { categories, products }, info) => {
    const categoryProducts = products.filter(
      (product) => product.categoryId === parent.id
    );
    let filteredCategoryProducts = categoryProducts;
    if (filter && filter.onSale === true) {
      filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
        return product.onSale;
      });
      return filteredCategoryProducts;
    }
  },
};
