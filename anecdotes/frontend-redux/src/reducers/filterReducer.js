const initialState = "";

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_FILTER":
            return action.filter;
        default: return state;
    }
}

const setFilter = (filter) => ({
    type: "SET_FILTER",
    filter
})

export default reducer;
export { setFilter };