let posts = [
  {
    id: 1,
    title: "First Post",
  },
  {
    id: 2,
    title: "Second Post",
  },
  {
    id: 3,
    title: "Third Post",
  },
];

/**
 * Controller to get all the posts
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getPosts = (req, res, next) => {
  res.status(200).send(posts);
};

/**
 * Controller to get a specific post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const getPost = (req, res, next) => {
  const post = posts.filter((post) => post.id === parseInt(req.params.id))[0];

  if (post === undefined || isNaN(req.params.id)) {
    const error = new Error(`Post with id ${req.params.id} not found`);
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).send(post);
};

/**
 * Controller to create a post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const createPost = (req, res, next) => {
  if (!req.body.title) {
    const error = new Error(`Post should have a valid title`);
    error.statusCode = 500;
    return next(error);
  }

  posts.push({
    id: posts.length + 1,
    title: req.body.title,
  });
  res.status(201).send(posts);
};

/**
 * Controller to delete a post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const deletePost = (req, res, next) => {
  let idExist;
  if (req.params.id) {
    idExist = posts.find((post) => post.id === parseInt(req.params.id))
      ? true
      : false;
  }
  if (isNaN(req.params.id) || parseInt(req.params.id) <= 0 || !idExist) {
    const error = new Error(`Post with id ${req.params.id} is not correct`);
    error.statusCode = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== parseInt(req.params.id));
  res.status(200).send(posts);
};

/**
 * controller to update post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const updatePost = (req, res, next) => {
  if (!req.body.title || isNaN(req.body.id) || parseInt(req.body.id) <= 0) {
    const error = new Error(`Post should have a valid title or ID`);
    error.statusCode = 500;
    return next(error);
  }

  posts.filter((post) => {
    if (post.id === parseInt(req.body.id)) {
      post.title = req.body.title;
    }
  });

  res.status(200).send(posts);
};
