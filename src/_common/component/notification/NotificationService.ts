import { TypeNotification } from "./Notification";
import { guid } from "_common/service/FunUtil";

export interface NotificationConfig {
  uid: string;
  message: React.ReactNode;
  typeNotification: TypeNotification;
  duration: number;
}

const DEFAULT_DURATION_MS = 2500;

class NotificationServiceImpl {
  private notificationProviderHandler: ((conf: NotificationConfig) => () => void) | undefined;

  private open = (message: React.ReactNode, typeNotification: TypeNotification, duration: number) => {
    return (
      (this.notificationProviderHandler &&
        this.notificationProviderHandler({ uid: guid(), message, typeNotification, duration })) ||
      (() => {})
    );
  };

  setNotificationProvider = (handler: (conf: NotificationConfig) => () => void) => {
    this.notificationProviderHandler = handler;
  };
  warn = (message: React.ReactNode, duration?: number) => {
    return this.open(message, "is-warning", duration || DEFAULT_DURATION_MS);
  };
  info = (message: React.ReactNode, duration?: number) => {
    return this.open(message, "is-info", duration || DEFAULT_DURATION_MS);
  };
  error = (message: React.ReactNode, duration?: number) => {
    return this.open(message, "is-danger", duration || 4000);
  };
  success = (message: React.ReactNode, duration?: number) => {
    return this.open(message, "is-success", duration || DEFAULT_DURATION_MS);
  };
}

const NotificationService = new NotificationServiceImpl();

export default NotificationService;
