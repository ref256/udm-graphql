import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

export { prisma as default }

// prisma.query, prisma.mutation, prisma.subscription, prisma.exists

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({
//     id: authorId
//   });

//   if (!userExists) {
//     throw new Error('User not found');
//   }
//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     },
//   }, '{ author { id name email posts { id title published } } }');

//   return post.author;
// };

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({
//     id: postId
//   });

//   if (!postExists) {
//     throw new Error('Post not found');
//   }

//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data
//   }, '{ author { id name email posts { id title published } } }');

//   return post.author;
// };

// createPostForUser('ck2jin8gp00660810fv1963u8', {
//   title: 'Great books to read - V3',
//   body: 'The War of Art - Final Version',
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2));
// }).catch((error) => {
//   console.log(error.message);
// });

// updatePostForUser('ck2kbpw1w06un0953uhvcmhq9', {
//   title: 'Brand new title'
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2));
// }).catch((error) => {
//   console.log(error.message);
// });
