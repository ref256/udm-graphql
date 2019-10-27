import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
  id: '1',
  name: 'Gregory',
  email: 'gregory@example.com',
  age: 42
}, {
  id: '2',
  name: 'Sarah',
  email: 'sarah@example.com'
}, {
  id: '3',
  name: 'Mike',
  email: 'mike@example.com'
}];

// Demo post data
const posts = [{
  id: 'p1',
  title: 'Post #1',
  body: 'This is body of post #1',
  published: true
}, {
  id: 'p2',
  title: 'Post #2',
  body: 'This is body of post #2',
  published: true
}, {
  id: 'p3',
  title: 'Post #3',
  body: '',
  published: true
}];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
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
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up!');
});
