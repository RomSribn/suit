import * as React from 'react';
import './index.styl';

const NotificationIcon = ({ count }: INotificationIconProps) => (
  <span className="notification">{count}</span>
);

export { NotificationIcon };
