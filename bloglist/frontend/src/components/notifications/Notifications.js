import React from "react";
import { useSelector } from "react-redux";
import "./notifications.css";

const getNotificationClass = (notification) => `${notification.type}_notification`;

const renderNotification = (notification) => (
    <div key={notification.id} className={getNotificationClass(notification)}>
        ({notification.time.toLocaleTimeString()}) {notification.text}
    </div>
);

const Notifications = () => {
    const notifications = useSelector(state => state.notifications);

    console.log("Current notifications:", notifications);
    return <div>
        {notifications.map(renderNotification)}
    </div>;
};

export default Notifications;