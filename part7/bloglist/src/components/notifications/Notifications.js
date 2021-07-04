import React from "react";
import "./notifications.css";
import { useSelector } from "react-redux";

const getNotificationClass = (notification) => `${notification.type}_notification`;

const renderNotification = (notification) => (
    <div key={notification.id} className={getNotificationClass(notification)}>
        ({notification.time.toLocaleTimeString()}) {notification.text}
    </div>
);

const Notifications = () => {
    const notifications = useSelector(state => state.notifications);

    console.log("Current notifications:", notifications);
    return (<div>
        {notifications.map(renderNotification)}
    </div>);
};

export default Notifications;