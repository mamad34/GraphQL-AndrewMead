let myUsers = [
  {
    id: "1",
    name: "mamad",
    email: "mamad@dick.com",
    age: 24,
  },
  {
    id: "2",
    name: "johnny",
    email: "johnny@dick.com",
  },
  {
    id: "3",
    name: "Alexis",
    email: "Alexis@dick.com",
    age: 69,
  },
];

let myPosts = [
  {
    id: "1",
    title: "Do Ebi",
    body: "How we Can Fuck ebi in the ass",
    published: true,
    author: "1",
    comment: "1",
  },
  {
    id: "2",
    title: "Do sisi",
    body: "How we Can Fuck sisi in the ass",
    published: false,
    author: "1",
    comment: "2",
  },
  {
    id: "3",
    title: "Fart inside Ebis mouth",
    body: "the fart is very good thing and very soft",
    published: true,
    author: "2",
    comment: "3",
  },
];

let myComments = [
  { id: "1", text: "This is first Comment", author: "1", post: "3" },
  {
    id: "2",
    text: "This is second Comment",
    author: "1",
    post: "1",
  },
  {
    id: "3",
    text: "This is third Comment",
    author: "2",
    post: "2",
  },
  {
    id: "4",
    text: "This is fourth Comment",
    author: "3",
    post: "3",
  },
];

const db = {
  myComments,
  myPosts,
  myUsers,
};

// export default { db };

export { db as default };
