const Comment = {
  author(parent, args, { db }, info) {
    return db.myUsers.find((user) => {
      return user.id === parent.author;
    });
  },
};

export { Comment as default };
