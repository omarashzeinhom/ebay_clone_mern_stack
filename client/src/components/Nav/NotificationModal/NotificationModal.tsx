import React, { useState } from "react";
import "./NotificationModal.scss";
import { useAuth } from "../../../context/AuthContext";

type NotificationModalProps = {
  onClose: () => void; // Callback to close the modal
};

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const payment = false;
  const { token, user, business,login } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0); // Initial count
  const [notifications, setNotifications] = useState([
    "Notification 1",
    "Notification 2",
  ]); // Example notifications

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
    
      {payment ? (
        <>
          <div className="notification-modal">
            <div className="notification-modal-content">
              {/* Add your notification content here */}
              <h2>Notification</h2>
              <p>Your payment was successful!</p>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="notification-modal">
            <div className="notification-modal-content">
              {/* Add your notification content here */}
              <h2>Notification</h2>
              <p>No New Notifications</p>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </>
      )}

      {token || user || business ? (
        <>
          <div className="notification-modal">
            <div className="notification-modal-content">
              <h2>Signed In Sucessfully as</h2>
              <p>{user?.firstName || user?.email || business?.businessName}</p>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export { NotificationModal };
