import React, { useState, useEffect } from "react";
import NotificationService, { NotificationConfig } from "./NotificationService";
import Notification from "./Notification";
import Style from "./NotificationProvider.module.css";

const NotificationProvider = () => {
  const [activeNotifications, setActiveNotifications] = useState<NotificationConfig[]>([]);

  useEffect(() => {
    NotificationService.setNotificationProvider((conf: NotificationConfig) => {
      setActiveNotifications(activeNotifications => [...activeNotifications, conf]);
      return () => handleClose(conf);
    });
  }, []);

  const handleClose = (conf: NotificationConfig) => {
    setActiveNotifications(activeNotifications => {
      let index = activeNotifications.indexOf(conf);
      activeNotifications.splice(index, 1);
      return [...activeNotifications];
    });
  };
  
  const notifications = activeNotifications.map((conf) => {
    return (
      <Notification
        key={conf.uid}
        onClose={() => handleClose(conf)}
        typeNotification={conf.typeNotification}
        duration={conf.duration}
      >
        {conf.message}
      </Notification>
    );
  });

  return <div className={Style.Provider}>{notifications}</div>;
};

export default NotificationProvider;
