const dummy = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  //console.log(blogs)
  const randomIndex = Math.floor(Math.random() * blogs.length);
  return 1;
  //return blogs[randomIndex];
}

module.exports = {
  dummy
}