const initialState = {
    text: "",
    hidden: true,
    timeout_id: undefined
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "NOTIFY":
            if(state.timeout_id !== undefined){
                // Avoid the previous notifications to hide the new one
                clearTimeout(state.timeout_id);
            }

            return {
                text: action.text,
                hidden: false,
                timeout_id: action.timeout_id
            }
        
        case "HIDE":
            return initialState;
        
        default: return state;
    }
}

const notify = (text, timeout) => {
    return async dispatch => {
        const timeoutId = setTimeout(() => {
            dispatch(hideNotification());
        }, timeout);

        dispatch({
            type: "NOTIFY",
            text: text,
            timeout_id: timeoutId
        });
    }
}

const hideNotification = () => ({
    type: "HIDE"
})

export default reducer;
export { notify, hideNotification };