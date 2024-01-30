import React from 'react';
import './NotificationModal.scss';

type NotificationModalProps = {
  onClose: () => void; // Callback to close the modal
};

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  return (
    <div className="notification-modal">
      <div className="notification-modal-content">
        {/* Add your notification content here */}
        <h2>Notification</h2>
        <p>Your payment was successful!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export { NotificationModal };
