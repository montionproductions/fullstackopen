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

module.exports = {
  dummy,
  totalLikes
}