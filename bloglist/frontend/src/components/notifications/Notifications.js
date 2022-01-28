import React from "react";
import "./notifications.css";

const getNotificationClass = (notification) => `${notification.type}_notification`;

const renderNotification = (notification) => <div key={notification.id} className={getNotificationClass(notification)}>
    ({notification.time.toLocaleTimeString()}) {notification.text}
</div>;

const Notifications = ({ notifications }) => <div>
    {notifications.map(renderNotification)}
</div>;

export default Notifications;