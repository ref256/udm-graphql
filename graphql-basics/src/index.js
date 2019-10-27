import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

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
  published: true,
  author: "u2"
}];

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

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments;
      }
      return comments.filter(comment => comment.text.toLowerCase().includes(args.query.toLowerCase()));
    },
    me() {
      return ({
        id: 'user1',
        name: 'Gregory',
        email: 'greforce76@gmail.com'
      });
    },
    post() {
      return ({
        id: 'post123',
        title: 'My new post',
        body: 'It is a test post, which I wrote',
        published: false
      });
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id);
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up!');
});
