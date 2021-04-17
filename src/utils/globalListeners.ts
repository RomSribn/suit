import * as React from 'react';
import * as _ from 'lodash';

type WindowEvents = keyof WindowEventMap;

declare global {
  interface Window {
    // tslint:disable-next-line
      chrome:any;
  }
}

class GlobalListeners {
  private listeners: (undefined | (() => void))[];
  private event: WindowEvents;

  /**
   * Вызывает всех слушателей по событию с троттлом в 300мс
   */
  private callListeners = _.throttle(() => {
    this.listeners.forEach((listener) => {
      if (listener) {
        listener.call(null);
      }
    });
  }, 300);

  constructor(event: WindowEvents) {
    this.listeners = [];
    this.event = event;
    window.addEventListener(event, this.callListeners);
  }

  /**
   * @param { function } listener Коллбек на событие (вызывается с троттлом в 300мс)
   * @returns { number } Индекс подписки в общей очереди
   */
  subscribe = (listener: () => void) => {
    this.listeners.push(listener);
    return this.listeners.length - 1;
  };

  /**
   * @param { number } subscriptionIndex Индекс подписки, возращенный из метода subscribe
   */
  unsubscribe = (subscriptionIndex: number) => {
    this.listeners[subscriptionIndex] = undefined;
  };

  /**
   * Останавливает всю под подписку на глобальное событие window.event
   */
  destroy = () => {
    window.removeEventListener(this.event, this.callListeners);
  };
}

/**
 * Общие сторы с подписками на глобальные события.
 * По триггеру события window.event вызывает все зарегистрированные коллбеки
 * для этого события
 */
const listeners = {
  resize: new GlobalListeners('resize'),
  orientationchange: new GlobalListeners('orientationchange'),
};

interface ListenerProps {
  action: keyof typeof listeners;
  callback: () => void;
}

class Listen extends React.Component<ListenerProps> {
  listenerIndex: number;
  componentDidMount() {
    listeners[this.props.action].subscribe(this.props.callback);
  }
  componentWillUnmount() {
    listeners[this.props.action].unsubscribe(this.listenerIndex);
  }
  render() {
    return this.props.children;
  }
}

export { listeners, Listen };
