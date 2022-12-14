const Subscription = {
  count: {
    subscribe(parent, args, { pubSub }, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubSub.publish("count", {
          count,
        });
      }, 1000);
      return pubSub.asyncIterator("count");
    },
  },
  comment: {
    subscribe(parent, { postId }, { db, pubSub }, info) {
      const post = db.myPosts.find(
        (post) => post.id === postId && post.published
      );
      if (!post) {
        throw new Error("No post Found");
      }

      return pubSub.asyncIterator(`comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, args, { pubSub }, info) {
      return pubSub.asyncIterator("post");
    },
  },
};

export { Subscription as default };
