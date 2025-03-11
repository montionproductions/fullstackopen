const User = require('../models/user')

const dummy = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  //console.log(blogs)
  const randomIndex = Math.floor(Math.random() * blogs.length);
  return 1;
  //return blogs[randomIndex];
}

const totalLikes = (blogsList) => {
  return blogsList.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogsList) => {
  if (!blogsList || blogsList.length === 0) {
    return [];
  }

  const bestBlog = blogsList.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav), blogsList[0]);

  return [{
    title: bestBlog.title,
    author: bestBlog.author,
    likes: bestBlog.likes
  }];
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
      return null;
  }

  const authorCount = {};

  // Contar la cantidad de blogs por autor
  blogs.forEach(blog => {
      authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
  });

  // Encontrar el autor con más blogs
  const mostProlificAuthor = Object.entries(authorCount).reduce((max, [author, count]) => {
      return count > max.blogs ? { author, blogs: count } : max;
  }, { author: '', blogs: 0 });

  return [mostProlificAuthor];
};


const mostLikes = (blogs) => {
  if (blogs.length === 0) {
      return [];
  }

  const likesCount = {};

  blogs.forEach(blog => {
      likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes;
  });

  const topAuthor = Object.entries(likesCount).reduce((max, [author, likes]) => {
      return likes > max.likes ? { author, likes } : max;
  }, { author: '', likes: 0 });

  return [topAuthor];  // Retorna un array con el objeto
};

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb
}