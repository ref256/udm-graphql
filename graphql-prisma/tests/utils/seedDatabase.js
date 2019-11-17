import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('pppp1111', 10)
  },
  user: undefined,
  jwt: undefined
};

const userTwo = {
  input: {
    name: 'Kevin',
    email: 'kevin@example.com',
    password: bcrypt.hashSync('pppp2222', 10)
  },
  user: undefined,
  jwt: undefined
};

const postOne = {
  input: {
    title: 'Dummy test post',
    body: 'This is dummy post body',
    published: true,
  },
  post: undefined
};

const postTwo = {
  input: {
    title: 'Draft post',
    body: '',
    published: false,
  },
  post: undefined
};

const commentOne = {
  input: {
    text: 'First comment'
  },
  comment: undefined
};

const commentTwo = {
  input: {
    text: 'Second comment'
  },
  comment: undefined
};

const seedDatabase = async () => {
  jest.setTimeout(20000);
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);

  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });

  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userTwo.user.id
        }
      }
    }
  });
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  });
};

export { seedDatabase as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo }
