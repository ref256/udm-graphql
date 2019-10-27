const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(post => {
      const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
      const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  comments(parent, args, { db }, info) {
    if (!args.query) {
      return db.comments;
    }
    return db.comments.filter(comment => comment.text.toLowerCase().includes(args.query.toLowerCase()));
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
