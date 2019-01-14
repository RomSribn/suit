import * as _ from 'lodash';

type WindowEvents = keyof WindowEventMap;

class GlobalListeners {
    private listeners: (() => void)[];
    private event: WindowEvents;

    /**
     * Вызывает всех слушателей по событию с троттлом в 300мс
     */
    private callListeners = _.throttle(() => {
        this.listeners.forEach(listener => {
            listener.call(null);
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
    }

    /**
     * @param { number } subscriptionIndex Индекс подписки, возращенный из метода subscribe
     */
    unsubscribe = (subscriptionIndex: number) => {
        this.listeners = this.listeners.filter((listener, index) => index === subscriptionIndex);
    }

    /**
     * Останавливает всю под подписку на глобальное событие window.event
     */
    destroy = () => {
        window.removeEventListener(this.event, this.callListeners);
    }
}

/**
 * Общие сторы с подписками на глобальные события.
 * По триггеру события window.event вызывает все зарегистрированные коллбеки
 * для этого события
 */
export const listeners = {
    resize: new GlobalListeners('resize'),
    orientationchange: new GlobalListeners('orientationchange'),
};
