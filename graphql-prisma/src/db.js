// Demo user data
const users = [{
  id: 'u1',
  name: 'Gregory',
  email: 'gregory@example.com',
  age: 42
}, {
  id: 'u2',
  name: 'Sarah',
  email: 'sarah@example.com'
}, {
  id: 'u3',
  name: 'Mike',
  email: 'mike@example.com'
}];

// Demo post data
const posts = [{
  id: 'p1',
  title: 'Post #1',
  body: 'This is body of post #1',
  published: true,
  author: "u1"
}, {
  id: 'p2',
  title: 'Post #2',
  body: 'This is body of post #2',
  published: true,
  author: "u2",
}, {
  id: 'p3',
  title: 'Post #3',
  body: '',
  published: false,
  author: "u2"
}];

// Demo comment data
const comments = [{
  id: 'c1',
  text: 'This is my comment',
  author: 'u1',
  post: 'p2'
}, {
  id: 'c2',
  text: 'Dummy comment',
  author: 'u1',
  post: 'p2'
}, {
  id: 'c3',
  text: 'Test proposal',
  author: 'u1',
  post: 'p3'
}, {
  id: 'c4',
  text: 'Proposal to this post',
  author: 'u3',
  post: 'p3'
}];

const db = {
  users,
  posts,
  comments
};

export { db as default }
