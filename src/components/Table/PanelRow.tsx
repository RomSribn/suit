import * as React from 'react';
import * as classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ConfirmPopup } from '../ConfirmPopup';
import { routes } from '../../config/routes';
import { loc } from './loc';

import './panelRowStyles.css';
import './panelRowStyles.styl';

interface PanelRowState {
    showControls: boolean;
}

class PanelRow extends React.PureComponent<PanelRowProps, PanelRowState> {
    constructor(props: PanelRowProps) {
        super(props);
        this.state = {
            showControls: false
        };
    }
    triggerControls = (showControlsBoolValue?: boolean) => {
        const {
            showControls
        } = this.state;
        this.setState({
            showControls: showControlsBoolValue || !showControls
        });
    }
    onAcceptClickFabric = (status: {statusId: number, name: OrderStatus}) => () => {
        const {
            ordersStore,
            orderInfo,
            acceptCallback
        } = this.props;
        const currentOrderId = orderInfo && orderInfo.id;
        const currentOrder = ordersStore.orders.find(item => String(item.orderId) === currentOrderId);
        if (currentOrder) {
            return ordersStore.updateOrder({
                ...currentOrder,
                status
            }).then((data) => {
                if (acceptCallback) {
                    acceptCallback.call(this, data);
                }
                this.setState({ showControls: false });
            });
        }
        return;
    }
    render() {
        const {
            orderInfo,
            orderStatuses,
            lang
        } = this.props;
        const {
            showControls
        } = this.state;
        const itemClassName = classNames('controls__item', { disabled: !Boolean(orderInfo && orderInfo.id) });
        const currentStatusIndex: number = orderInfo && (orderInfo.status.statusId ||
          // TODO:  ХАК! В овтетах до сих пор присутвтуют поля id вместо statusId
          // Удалить, как только их почистят и приведут к одной модели
          orderInfo.status['id']) || // tslint:disable-line
          // На сервере статусы начинаются с 1
          1;
        const currentStatus = loc[lang].statuses[orderStatuses[currentStatusIndex - 1]];

        let nextStatusIndex = currentStatusIndex < orderStatuses.length ?
            currentStatusIndex + 1 :
            orderStatuses.length;
        if (!Boolean(currentStatusIndex)) {
            nextStatusIndex = 1;
        }
        const nextStatus = loc[lang].statuses[orderStatuses[nextStatusIndex - 1]];
        return (
            <div className="panel-row">
                <form className="search">
                    <div className="search__control">
                        <span className="search__icon" />
                        <input
                            type="search"
                            maxLength={150}
                            autoComplete="off"
                            className="search__input"
                            placeholder="Поиск ..."
                            onFocus={() => this.setState({showControls: false })}
                            onBlur={() => this.setState({showControls: true })}
                        />
                        <span
                            className="icon-close search__clear"
                            title="Clear"
                            style={{ visibility: 'hidden'}}
                        />
                    </div>
                </form>
                <div className={classNames('controls', { hidden: !showControls})}>
                    <ul className="controls__list">
                        <li className="controls__item disabled">
                            <a
                                className="controls__link controls__link--phone"
                                href="#"
                                title="звонок"
                            />
                        </li>
                        <li className="controls__item disabled">
                            <a
                                className="controls__link controls__link--msg"
                                href="#"
                                title="сообщения"
                            />
                        </li>
                        <li className={itemClassName}>
                            <Link
                                className="controls__link controls__link--refresh"
                                to={{
                                    pathname: `${routes.details}/shirt`,
                                    search: `order_id=${orderInfo && orderInfo.id}`
                                }}
                                title=""
                            />
                        </li>
                        <li className={itemClassName}>
                            <ConfirmPopup
                                onAcceptClick={
                                    this.onAcceptClickFabric(
                                        { statusId: nextStatusIndex, name: orderStatuses[nextStatusIndex - 1]}
                                    )}
                                actionText={loc[lang].confirmActionTextFabric({
                                    currentStatus: currentStatus,
                                    nextStatus
                                })}
                            >
                                <button
                                    className="controls__link controls__link--eye"
                                />
                            </ConfirmPopup>
                        </li>
                        <li className={itemClassName}>
                            <a
                                className="controls__link controls__link--edit"
                                href="#"
                                title="редактировать"
                            />
                        </li>
                        <li className={itemClassName}>
                            <a
                                className="controls__link controls__link--trash"
                                href="#"
                                title="удалить"
                            />
                        </li>
                        <li className={itemClassName}>
                            <a
                                className="controls__link controls__link--pdf"
                                href="#"
                                title="pdf"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export {
    PanelRow
};
