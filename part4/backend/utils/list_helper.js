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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}