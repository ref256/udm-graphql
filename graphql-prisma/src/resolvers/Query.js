const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }, {
          email_contains: args.query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{
          title_contains: args.query
        }, {
          body_contains: args.query
        }]
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    const opArgs = {};

    if (opArgs) {
      opArgs.where = {
        text_contains: args.query
      };
    }
    return prisma.query.comments(opArgs, info);
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
};

export { Query as default }
