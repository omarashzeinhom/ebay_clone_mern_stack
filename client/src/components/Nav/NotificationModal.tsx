import React from "react";
import "./NotificationModal.scss";
import { useAuth } from "../../context/AuthContext";

type NotificationModalProps = {
  onClose: () => void; // Callback to close the modal
};

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const payment = false;
  const { token, user, business } = useAuth();

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
              {/* Add your notification content here */}
              <h2>Signed In Sucessfully as</h2>
              <p>{user?.email || business?.businessName}</p>
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
