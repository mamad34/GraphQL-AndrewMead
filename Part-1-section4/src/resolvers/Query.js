const Query = {
  comments(parent, args, { db }, info) {
    return db.myComments;
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.myUsers;
    }
    return db.myUsers.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  me() {
    return {
      id: "123456789",
      name: "puss",
      email: "hellp@hello.com",
      // age: 21455,
    };
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      console.log("ad");
      console.log("sex", db);
      return db.myPosts;
    }
    return db.myPosts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
};

export { Query as default };
