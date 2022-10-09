const User = {
  posts(parent, args, { db }, info) {
    return db.myPosts.filter((post) => {
      return post.author === parent.id;
    });
  },
  comments(parent, args, { db }, info) {
    return db.myComments.filter((comment) => {
      return comment.author === parent.id;
    });
  },
};

export { User as default };
