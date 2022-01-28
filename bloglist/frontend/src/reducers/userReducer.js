import usersService from "../services/users";
import blogService from "../services/blogs";

const defaultState = {
    loggedUser: null,
    allUsers: []
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
    case "USER_LOGIN":
        return { ...state, loggedUser: action.user };
    case "USER_LOGOUT":
        return { ...state, loggedUser: null };
    case "USER_SIGNUP":
        return { ...state, allUsers: [...state.allUsers, action.user] };
    case "USER_INITIALIZE":
        return { ...state, allUsers: action.users };
    default:
        return state;
    }
};

export const loginUserByCredentials = (username, password) => {
    return async (dispatch) => {
        try{
            const user = await usersService.login(username, password);
            dispatch(loginUser(user));
        } catch (err) {
            console.info("Wrong credentials");
            // Notification
            // newNotification("Wrong credentials", "error");
        }
    };
};

export const loginUser = (user) => {
    return async (dispatch) => {
        blogService.setToken(user.token);
        window.localStorage.setItem("loggedBlogsappUser", JSON.stringify(user));
        console.debug(user);

        dispatch({
            type: "USER_LOGIN",
            user: user
        });
    };
};

export const logoutUser = () => {
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogsappUser");
    return {
        type: "USER_LOGOUT",
    };
};

export const signUpUser = (user) => {
    return {
        type: "USER_SIGNUP",
        user: user
    };
};

export const initializeUsers = () => {
    return async (dispatch) => {
        const allUsers = await usersService.getAll();
        dispatch({
            type: "USER_INITIALIZE",
            users: allUsers
        });
    };
};

export default userReducer;