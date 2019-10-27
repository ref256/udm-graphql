import { GraphQLServer } from 'graphql-yoga';

// String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
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
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favourite ${args.position}`;
      }
      return 'Hello!';
    },
    add(_, args) {
      return args.numbers.reduce((prev, curr) => prev + curr, 0);
    },
    grades(parent, args, ctx, info) {
      return [99, 80, 93];
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
