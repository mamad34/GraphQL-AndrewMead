import { v1 as uuidv1 } from "uuid";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.myUsers.some((user) => {
      return user.email === args.data.email;
    });
    if (emailTaken) {
      throw new Error("Email Taken.");
    }
    const user = {
      id: uuidv1(),
      ...args.data,
      // name: args.name,
      // email: args.email,
      // age: args.age,
    };
    db.myUsers.push(user);
    return user;
  },
  deleteUser(parant, args, { db }, info) {
    const userIndex = db.myUsers.findIndex((user) => {
      return user.id === args.id;
    });
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    const deletedUsers = db.myUsers.splice(userIndex, 1);

    db.myPosts = db.myPosts.filter((post) => {
      const match = post.author === args.id;
      if (match) {
        db.myComments = db.myComments.filter((comment) => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });
    db.myComments = db.myComments.filter((comment) => {
      comment.author !== args.id;
    });
    return deletedUsers[0];
  },
  updateUser(parent, args, { db }, info) {
    const user = db.myUsers.find((user) => {
      return user.id === args.id;
    });
    if (!user) {
      throw new Error("User not Found ");
    }

    if (typeof args.data.email === "string") {
      const emailTaken = db.myUsers.some(
        (user) => user.email === args.data.email
      );
      if (emailTaken) {
        throw new Error("Email Taken");
      }
      user.email = args.data.email;
    }
    if (typeof args.data.name === "string") {
      user.name = args.data.name;
    }
    if (typeof args.data.age !== "undefined") {
      user.age = args.data.age;
    }
    return user;
  },
  deletePost(parant, args, { db, pubSub }, info) {
    const postIndex = db.myPosts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw Error("Post Not Found");
    }
    db.myComments = db.myComments.filter((comment) => comment.post !== args.id);

    // const deletedPost = db.myPosts.splice(postIndex, 1);
    const [post] = db.myPosts.splice(postIndex, 1);
    if (post.published) {
      pubSub.publish("post", {
        post: {
          mutation: "DELETED",
          data: post,
        },
      });
    }
    return deletedPost[0];
  },
  createPost(parent, args, { db, pubSub }, info) {
    const userExist = db.myUsers.some((user) => {
      return user.id === args.data.author;
    });
    if (!userExist) {
      throw new Error("User not found");
    }
    const post = {
      id: uuidv1(),
      ...args.data,
      // title: args.title,
      // body: args.body,
      // published: args.published,
      // author: args.author,
    };
    db.myPosts.push(post);
    if (args.data.published === true) {
      pubSub.publish("post", {
        post: {
          mutation: "CREATED",
          data: post,
        },
      });
    }
    return post;
  },

  createComment(parent, args, { db, pubSub }, info) {
    const userExist = db.myUsers.some((user) => {
      return user.id === args.data.author;
    });
    if (!userExist) {
      throw new Error("User not found");
    }
    const postExit = db.myPosts.some((post) => {
      return post.id === args.data.post && post.published;
    });
    if (!postExit) {
      throw new Error("Post not found");
    }
    if (userExist && postExit) {
      const comment = {
        id: uuidv1(),
        ...args.data,
        // text: args.text,
        // author: args.author,
        // post: args.post,
      };
      db.myComments.push(comment);
      pubSub.publish(`comment ${args.data.post}`, {
        comment: {
          mutation: "CREATED",
          data: comment,
        },
      });
      return comment;
    }
  },
  updatePost(parant, { id, data }, { db }, info) {
    const post = db.myPosts.find((post) => {
      return post.id === id;
    });
    if (!post) {
      throw new Error("Post not Found ");
    }
    if (
      typeof data.title === "string" &&
      typeof data.body === "string" &&
      typeof data.published === "boolean"
    ) {
      post.title = data.title;
      post.body = data.body;
      post.published = data.published;
    }
    return post;
  },
  deleteComment(parent, args, { db, pubSub }, info) {
    const commentIndex = db.myComments.findIndex(
      (comment) => comment.id === args.id
    );
    if (commentIndex === -1) {
      throw new Error("Comment Not Found");
    }
    const [deletedComment] = db.myComments.splice(commentIndex, 1);
    pubSub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deletedComment,
      },
    });
    return deletedComment;
  },

  updateComment(parent, args, { db, pubSub }, info) {
    const { data, id } = args;
    const comments = db.myComments.find((comment) => {
      return comment.id === id;
    });
    if (!comments) {
      throw new Error("no comment bech");
    }
    if (typeof data.text === "string") {
      comments.text = data.text;
    }
    pubSub.publish(`comment ${comments.post}`, {
      comment: {
        mutation: "UPDATED",
        data: comments,
      },
    });
    return comments;
  },
};

export { Mutation as default };
