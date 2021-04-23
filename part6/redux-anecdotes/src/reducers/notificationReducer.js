const initialState = "";

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "NOTIFY":
            return action.text;
        case "HIDE":
            return "";
        default: return state;
    }
}

const notify = (text, timeout) => {
    return async dispatch => {
        dispatch({
            type: "NOTIFY",
            text: text
        });
        setTimeout(() => {
            dispatch(hideNotification());
        }, timeout);
    }
}

const hideNotification = () => ({
    type: "HIDE"
})

export default reducer;
export { notify, hideNotification };