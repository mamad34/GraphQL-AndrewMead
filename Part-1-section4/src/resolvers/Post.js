const Post = {
  author(parent, args, { db }, info) {
    console.log(parent);
    return db.myUsers.find((user) => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, { db }, info) {
    return db.myComments.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};

export { Post as default };
