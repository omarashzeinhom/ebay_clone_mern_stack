import React, { useState } from "react";
import "./NotificationModal.scss";
import { useUserAuth,useBusinessAuth  } from "../../../context/";

type NotificationModalProps = {
  onClose: () => void; // Callback to close the modal
};

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const [notificationCount, setNotificationCount] = useState(0); // Initial count
  const [notifications, setNotifications] = useState<string[]>([]); // Example notifications

  const { user} = useUserAuth();
  const {  business } = useBusinessAuth();

  const handleCloseNotification = () => {
    // Decrease the notification count when a notification is closed
    setNotificationCount((prevCount) => prevCount - 1);
  };

  const handleMarkAllRead = () => {
    // Reset notification count and clear notifications when marking all as read
    setNotificationCount(0);
    setNotifications([]);
  };

  return (
    <>
      {notificationCount > 0 && (
        <div className="notification-modal">
          <div className="notification-modal-content">
            <h2>Notifications</h2>
            {notifications.map((notification, index) => (
              <p key={index}>{notification}</p>
            ))}
           <button aria-label="CloseNotificationButton" onClick={handleCloseNotification}>Close</button>
           <button aria-label="MarkAllAsReadButton" onClick={handleMarkAllRead}>Mark All As Read</button>

          </div>
        </div>
      )}

      {user || business ? (
        <div className="notification-modal">
          <div className="notification-modal-content">
            <h2>Signed In Successfully as</h2>
            <p>{user?.firstName || user?.email || business?.businessName}</p>
           <button aria-label="CloseNotificationSection" onClick={onClose}>Close</button>
          </div>
        </div>
      ) : (
        <div className="notification-modal">
          <div className="notification-modal-content">
            <h2>Notification</h2>
            <p>No New Notifications</p>
           <button aria-label="CloseNotificationSection" onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export { NotificationModal };
