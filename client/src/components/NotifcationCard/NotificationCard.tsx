import React from "react";
import "./NotificationCard.scss";

interface NotificationCardProps {
  type: "success" | "error";
  message: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ type, message }) => {
  return (
    <div className={`notification-card ${type}`}>
      <div className="icon">{type === "success" ? "✅" : "❌"}</div>
      <div className="message">{message}</div>
    </div>
  );
};

export default NotificationCard;
