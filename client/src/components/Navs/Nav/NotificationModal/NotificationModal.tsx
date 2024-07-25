import React, { useState } from "react";
import "./NotificationModal.scss";
import { useUserAuth, useBusinessAuth } from "../../../../context/";

// Define the props interface
type NotificationModalProps = {
  isVisible: boolean; // Add this prop to control visibility
  onClose: () => void; // Callback to close the modal
};

const NotificationModal: React.FC<NotificationModalProps> = ({ isVisible, onClose }) => {
  const [notificationCount, setNotificationCount] = useState(0); // Initial count
  const [notifications, setNotifications] = useState<string[]>([]); // Example notifications

  const { user } = useUserAuth();
  const { business } = useBusinessAuth();

  if (!isVisible) return null; // Return null if modal is not visible

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
    <div className="notification-modal">
      <div className="notification-modal-content">
        <h2>Notifications</h2>
        {notificationCount > 0 ? (
          <>
            {notifications.map((notification, index) => (
              <p key={index}>{notification}</p>
            ))}
            <button aria-label="CloseNotificationButton" onClick={handleCloseNotification}>
              Close
            </button>
            <button aria-label="MarkAllAsReadButton" onClick={handleMarkAllRead}>
              Mark All As Read
            </button>
          </>
        ) : user || business ? (
          <>
            <h2>Signed In Successfully as</h2>
            <p>{user?.firstName || user?.email || business?.businessName}</p>
            <button aria-label="CloseNotificationSection" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <>
            <h2>Notification</h2>
            <p>No New Notifications</p>
            <button aria-label="CloseNotificationSection" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export { NotificationModal };
