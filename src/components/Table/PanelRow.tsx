import * as React from 'react';
import * as classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ConfirmPopup } from '../ConfirmPopup';
import { routes } from '../../config/routes';
import { loc } from './loc';

import './panelRowStyles.styl';

interface PanelRowState {
    showControls: boolean;
}

class PanelRow extends React.PureComponent<PanelRowProps, PanelRowState> {
    constructor(props: PanelRowProps) {
        super(props);
        this.state = {
            showControls: Boolean(this.props.activeOrderId)
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
            acceptCallback,
            activeOrderId
        } = this.props;
        const currentOrderId = (orderInfo && orderInfo.id) || activeOrderId;
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

    onDeleteClick = () => {
        const {
            ordersStore,
            orderInfo
        } = this.props;
        // TODO: переделать на геттер
        const orderId = orderInfo && orderInfo.id || this.props.activeOrderId;
        if (orderId) {
            ordersStore.deleteOrder(Number(orderId));
        }
    }
    render() {
        const {
            orderInfo,
            orderStatuses,
            activeOrderId,
            lang
        } = this.props;
        const {
            showControls
        } = this.state;
        const itemClassName = classNames(
            'controls__item',
            { disabled: !Boolean(orderInfo && orderInfo.id || activeOrderId) }
        );
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
                                    search: `order_id=${orderInfo && orderInfo.id || activeOrderId}`
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
                                actionText={loc[lang].fabric.updateOrder({
                                    currentStatus: currentStatus,
                                    nextStatus
                                })}
                            >
                                <button
                                    className="controls__button controls__button--eye"
                                />
                            </ConfirmPopup>
                        </li>
                        <li className={itemClassName}>
                            <Link
                                className="controls__link controls__link--edit"
                                to={{
                                    pathname: `${routes.details}/shirt`,
                                    search: `order_id=${orderInfo && orderInfo.id || activeOrderId}`
                                }}
                                title=""
                            />
                        </li>
                        <li className={itemClassName}>
                            <ConfirmPopup
                                actionText={loc[lang].fabric.delete(orderInfo && orderInfo.id || activeOrderId || '')}
                                onAcceptClick={this.onDeleteClick}
                            >
                                <button
                                    className="controls__button controls__button--trash"
                                    title="удалить"
                                />
                            </ConfirmPopup>
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
