const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    const favorite = {
        ...blogs.reduce((blog1, blog2) => blog1.likes > blog2.likes ? blog1 : blog2)
    }; // Copy the blog object instead of modifying the original

    delete favorite.__v;
    delete favorite.url;
    delete favorite._id;
    return favorite;
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    const counter = {};
    blogs.forEach(blog => {
        counter[blog.author] = (counter[blog.author] || 0) + 1;
    });

    return Object.keys(counter)
        .map(key => { return { author: key, blogs: counter[key] } })
        .reduce((author1, author2) => author1.blogs > author2.blogs ? author1 : author2);
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }
    
    const counter = {};
    blogs.forEach(blog => {
        counter[blog.author] = (counter[blog.author] || 0) + blog.likes;
    });

    return Object.keys(counter)
        .map(key => { return { author: key, likes: counter[key] } })
        .reduce((author1, author2) => author1.likes > author2.likes ? author1 : author2);
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}