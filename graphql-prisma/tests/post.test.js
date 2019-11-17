import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import getClient from './utils/getClient';
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase';
import { getPosts, getMyPosts, updatePost, createPost, deletePost, subscribeToPosts } from './utils/postOperations';

const client = getClient();

beforeEach(seedDatabase);

test('Should expose published posts only', async () => {
  const response = await client.query({ query: getPosts });

  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
});

test('Should expose all posts of authenticated user', async () => {
  const client = getClient(userOne.jwt);
  const response = await client.query({ query: getMyPosts });

  expect(response.data.myPosts.length).toBe(2);
});

test('Should be able to update own post', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    id: postOne.post.id,
    data: {
      published: false
    }
  };

  const { data } = await client.mutate({ mutation: updatePost, variables });
  const exists = await prisma.exists.Post({ id: postOne.post.id, published: false });

  expect(data.updatePost.published).toBe(false);
  expect(exists).toBe(true);
});

test('Should be able to create a post', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    data: {
      title: 'Created test post',
      body: 'body of test post',
      published: true
    }
  }

  const { data } = await client.mutate({ mutation: createPost, variables });
  const exists = await prisma.exists.Post({ id: data.createPost.id });

  expect(exists).toBe(true);
  expect(data.createPost.published).toBe(true);
});

test('Should be able to delete own post', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    id: postTwo.post.id
  };

  await client.mutate({ mutation: deletePost, variables });
  const exists = await prisma.exists.Post({ id: postTwo.post.id });

  expect(exists).toBe(false);
});

test('Should subscribe to changes for published posts', async (done) => {
  client.subscribe({ query: subscribeToPosts }).subscribe({
    next(response) {
      expect(response.data.post.mutation).toBe('DELETED');
      done();
    }
  });

  await prisma.mutation.deletePost({ where: { id: postOne.post.id } });
});
