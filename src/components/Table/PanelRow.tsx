import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ConfirmPopup } from '../ConfirmPopup';
import { routes } from '../../config/routes';
import { loc } from './loc';
import { SimpleModal } from '../SimpleModal';
import { SimpleSpinner } from '../Spinner';
import { isMobile } from '../../utils';

import './panelRowStyles.styl';

interface PanelRowState {
  showControls: boolean;
  showInfo: boolean;
  info: string;
}

@inject(({ pdfStore }) => ({
  pdfStatesByOrderId: pdfStore.pdfStatesByOrderId,
  generatePdf: pdfStore.generatePdf,
}))
@observer
class PanelRow extends React.Component<PanelRowProps, PanelRowState> {
  constructor(props: PanelRowProps) {
    super(props);
    this.state = {
      showControls: Boolean(this.props.activeOrderId),
      showInfo: false,
      info: '',
    };
  }
  triggerControls = (showControlsBoolValue?: boolean) => {
    const { showControls } = this.state;
    this.setState({
      showControls: showControlsBoolValue || !showControls,
    });
  };
  onAcceptClickFabric = (status: {
    statusId: number;
    name: OrderStatus;
  }) => () => {
    const {
      ordersStore,
      orderInfo,
      acceptCallback,
      activeOrderId,
    } = this.props;
    const currentOrderId = (orderInfo && orderInfo.id) || activeOrderId;
    const currentOrder = ordersStore.orders.find(
      (item) => String(item.orderId) === currentOrderId,
    );
    if (currentOrder) {
      return ordersStore
        .updateOrder({
          ...currentOrder,
          status,
        })
        .then((data) => {
          if (acceptCallback) {
            acceptCallback.call(this, data);
          }
          this.setState({ showControls: false });
        });
    }
    return;
  };

  onDeleteClick = () => {
    const { ordersStore, orderInfo } = this.props;
    // TODO: переделать на геттер
    const orderId = (orderInfo && orderInfo.id) || this.props.activeOrderId;
    if (orderId) {
      ordersStore.deleteOrder(Number(orderId));
    }
  };

  onConfirmCustomerClick = () => {
    const { ordersStore, orderInfo, acceptCallback, lang } = this.props;
    const orderId = (orderInfo && orderInfo.id) || this.props.activeOrderId;
    const customerId = orderInfo && orderInfo.customerId;
    const phone = (orderInfo && orderInfo.phone) || '';
    if (orderId && customerId) {
      ordersStore
        .confirmCustomer(Number(orderId), customerId)
        .then(({ data }: Axios.Response) => {
          const info = data.emailSent
            ? loc[lang].confirmInfo
            : `${loc[lang].login}: ${phone} ${loc[lang].password}: ${data.password}`;
          this.setState({
            showControls: false,
            showInfo: true,
            info,
          });
          if (acceptCallback) {
            acceptCallback.call(this, data);
          }
        })
        .catch(() => {
          this.setState({
            showControls: false,
            showInfo: true,
            info: loc[lang].supportInfo,
          });
        });
    }
  };

  onCloseModal = () => this.setState({ showInfo: false, info: '' });

  generatePdf = () => {
    const {
      orderInfo,
      activeOrderId,
      role,
      userToken,
      generatePdf,
    } = this.props;
    const orderId = (orderInfo && orderInfo.id) || activeOrderId;
    if (orderId) {
      generatePdf!(orderId, userToken!, role!);
    }
  };

  render() {
    const {
      orderInfo,
      orderStatuses,
      activeOrderId,
      lang,
      role,
      pdfStatesByOrderId,
    } = this.props;
    const { showControls } = this.state;
    const itemClassName = classNames('controls__item', {
      disabled: !Boolean((orderInfo && orderInfo.id) || activeOrderId),
    });
    const currentStatusIndex: number =
      (orderInfo &&
        (orderInfo.status.statusId ||
          // TODO:  ХАК! В овтетах до сих пор присутвтуют поля id вместо statusId
          // Удалить, как только их почистят и приведут к одной модели
          orderInfo.status['id'])) || // tslint:disable-line
      // На сервере статусы начинаются с 1
      1;
    const currentStatus =
      loc[lang].statuses[orderStatuses[currentStatusIndex - 1]];

    let nextStatusIndex =
      currentStatusIndex < orderStatuses.length
        ? currentStatusIndex + 1
        : orderStatuses.length;
    if (!Boolean(currentStatusIndex)) {
      nextStatusIndex = 1;
    }
    const nextStatus = loc[lang].statuses[orderStatuses[nextStatusIndex - 1]];
    const isStylist = role === 'STYLIST';
    const isCustomer = role === 'CUSTOMER';
    const orderId = (orderInfo && orderInfo.id) || activeOrderId || '';
    const pdfState = pdfStatesByOrderId!.get(orderId);
    const isFetchingPdf = pdfState && pdfState.isFetching;

    const spinner = (
      <div className="controls__spinner">
        <SimpleSpinner />
      </div>
    );

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
              placeholder={loc[lang].search}
              onFocus={() => this.setState({ showControls: false })}
              onBlur={() => this.setState({ showControls: true })}
            />
            <span
              className="icon-close search__clear"
              title="Clear"
              style={{ visibility: 'hidden' }}
            />
          </div>
        </form>
        <div className={classNames('controls', { hidden: !showControls })}>
          <ul className="controls__list">
            {isMobile() && (
              <li className="controls__item">
                <i
                  className="controls__link controls__link--search"
                  onClick={() => this.setState({ showControls: false })}
                  title={loc[lang].controls.call}
                />
              </li>
            )}
            <li className="controls__item disabled">
              <a
                className="controls__link controls__link--msg"
                href="#"
                title={loc[lang].controls.message}
              />
            </li>
            <li className={itemClassName}>
              <Link
                className="controls__link controls__link--refresh"
                to={{
                  pathname: `${routes.details}/shirt`,
                  search: `order_id=${
                    (orderInfo && orderInfo.id) || activeOrderId
                  }&onbase=true`,
                }}
                title={loc[lang].controls.create}
              />
            </li>
            <li
              className={classNames('controls__item', {
                disabled:
                  isCustomer &&
                  orderInfo &&
                  orderInfo.status.name !== 'NEW' &&
                  orderInfo.status.name !== 'TEMPORARY',
              })}
            >
              <Link
                className="controls__link controls__link--edit"
                to={{
                  pathname: `${routes.details}/shirt`,
                  search: `order_id=${
                    (orderInfo && orderInfo.id) || activeOrderId
                  }`,
                }}
                title={loc[lang].controls.edit}
              />
            </li>
            {isStylist && (
              <>
                <li className={itemClassName}>
                  <ConfirmPopup
                    onAcceptClick={this.onAcceptClickFabric({
                      statusId: nextStatusIndex,
                      name: orderStatuses[nextStatusIndex - 1],
                    })}
                    actionText={loc[lang].fabric.updateOrder({
                      currentStatus: currentStatus,
                      nextStatus,
                    })}
                  >
                    <button
                      className="controls__button controls__button--eye"
                      title={loc[lang].controls.update}
                    />
                  </ConfirmPopup>
                </li>
                <li className={itemClassName}>
                  <ConfirmPopup
                    actionText={loc[lang].fabric.delete(
                      (orderInfo && orderInfo.id) || activeOrderId || '',
                    )}
                    onAcceptClick={this.onDeleteClick}
                  >
                    <button
                      className="controls__button controls__button--trash"
                      title={loc[lang].controls.delete}
                    />
                  </ConfirmPopup>
                </li>
                <li
                  className={classNames('controls__item', {
                    disabled: orderInfo && orderInfo.isConfirmed,
                  })}
                >
                  <ConfirmPopup
                    actionText={loc[lang].confirmCustomer(
                      orderInfo && orderInfo.name,
                    )}
                    onAcceptClick={this.onConfirmCustomerClick}
                  >
                    <button
                      className="controls__button controls__button--new-client"
                      title={loc[lang].controls.confirmCustomer}
                    />
                  </ConfirmPopup>
                  <SimpleModal
                    data={{
                      desc: this.state.info,
                      buttons: [
                        {
                          key: 'repeat',
                          text: 'Ok',
                          theme: 'black',
                        },
                      ],
                    }}
                    show={this.state.showInfo}
                    isSmall={true}
                    isTransparent={true}
                    callback={this.onCloseModal}
                  />
                </li>
              </>
            )}
            <li className={itemClassName}>
              <span
                className="controls__link controls__link--pdf"
                onClick={this.generatePdf}
                title={loc[lang].controls.pdf}
              />
              {isFetchingPdf && spinner}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export { PanelRow };
