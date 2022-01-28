const notificationReducer = (state = [], action) => {
    switch(action.type){
    case "NOTIFICATION_NEW":
        return [...state, action.notification];
    case "NOTIFICATION_HIDE":
        return state.filter(n => n.id !== action.notification_id);
    default:
        return state;
    }
};

export const showNotification = (id, message, type) => {
    const newNotification = {
        id: id,
        text: message,
        type: type,
        time: new Date()
    };
    console.debug(newNotification);

    return {
        type: "NOTIFICATION_NEW",
        notification: newNotification
    };
};

export const hideNotification = (id) => {
    return {
        type: "NOTIFICATION_HIDE",
        notification_id: id
    };
};

export default notificationReducer;