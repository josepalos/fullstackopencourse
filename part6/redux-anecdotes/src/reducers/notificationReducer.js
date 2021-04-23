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

const notify = (text) => ({
    type: "NOTIFY",
    text: text
})

const hideNotification = () => ({
    type: "HIDE"
})

export default reducer;
export { notify, hideNotification };