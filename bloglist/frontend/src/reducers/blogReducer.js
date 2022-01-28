import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
    switch(action.type){
    case "BLOG_NEW":
        return [...state, action.blog];
    case "BLOG_INIT":
        return [...action.blogs];
    case "BLOG_DELETE":
        return state.filter(b => b.id !== action.blog_id);
    case "BLOG_LIKE":
        return [
            ...state.filter(b => b.id !== action.blog.id),
            action.blog
        ];
    default:
        return state;
    }
};

export const createBlog = (title, author, url) => {
    return async (dispatch) => {
        try{
            const newBlog = await blogService.create(title, author, url);
            dispatch({
                type: "BLOG_NEW",
                blog: newBlog
            });
        } catch (err) {
            // TODO: show notification
            // How? Tap here the newNotification function? or this should
            // be dealt with in the App.js code?
            console.error(err);
        }
    };
};

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch({
            type: "BLOG_INIT",
            blogs: blogs
        });
    };
};

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.deleteBlog(id);
        dispatch({
            type: "BLOG_DELETE",
            blog_id: id
        });
    };
};

export const likeBlog = (blog) => {
    return async (dispatch) => {
        try{
            const modifiedBlog = await blogService.likeBlog(blog);
            dispatch({
                type: "BLOG_LIKE",
                blog: modifiedBlog
            });
        } catch (err) {
            console.error("Error on liking blog", blog, err);
        }
    };
};

export default blogReducer;