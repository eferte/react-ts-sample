import React, { useEffect } from "react";
import clsx from "clsx";
import Style from "./Notification.module.css";

export type TypeNotification = "is-danger" | "is-success" | "is-warning" | "is-info" | "is-primary";

type NotificationProps = {
  typeNotification: TypeNotification;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void;
  duration: number;
};

const Notification: React.FC<NotificationProps> = ({ typeNotification, onClose, duration, children }) => {
  useEffect(() => {
    if (duration > 0) {
      let t = setTimeout(() => {
        onClose(undefined);
      }, duration);

      return () => clearTimeout(t); // return clear timeout handler
    }
  }, [duration, onClose]);

  return (
    <div className={clsx("notification", Style.Notification, typeNotification)} style={{ marginBottom: 5 }}>
      <button className="delete" onClick={onClose}></button>
      {children}
    </div>
  );
};

export default Notification;
