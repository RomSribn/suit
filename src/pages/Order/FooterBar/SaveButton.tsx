import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SaveForm } from '../SaveForm';
import { PopUp } from '../../../containers/Popup';
import { Button } from '../../../components/Button';
// import { routes } from '../../../config/routes';
import * as _ from 'lodash';
import { SimpleModal } from '../../../components/SimpleModal';
import { loc } from './loc';
import { SaveButtonProps } from './typings';
import { updateOrder } from './utils';
import { Redirect } from 'react-router';

interface State {
  open: boolean;
  isExceptionPopupOpen: boolean;
  showErrorModal: boolean;
}
@inject(({ app, order, routing, garments: { Subgroups }, user }, props) => {
  return ({
    app,
    orderStore: order,
    Subgroups: Subgroups,
    setMutuallyExclusivePopup: order.setMutuallyExclusivePopup,
    activeOrderItem: order.activeElement,
    setActiveOrderItem: order.setActiveItem,
    lang: app.lang,
    profile: user.profile,
  });
})

@observer
class SaveButton extends React.Component<SaveButtonProps, State> {
  static defaultProps = {
    saveCallback: () => undefined,
    lang: 'en'
  };
  constructor(props: SaveButtonProps) {
    super(props);
    this.state = {
      open: false,
      isExceptionPopupOpen: false,
      showErrorModal: false
    };

  }

  onCloseExcetionPopup = () => {
    this.setState({ isExceptionPopupOpen: false });
  }

  onOpenExcetionPopup = () => {
    this.setState({ isExceptionPopupOpen: true });
  }

  onClose = (e: React.MouseEvent) => {
    const {
      saveCallback
    } = this.props;
    this.hidePopup();
    saveCallback && saveCallback() // tslint:disable-line
  }

  hidePopup = () => {
    this.setState({ open: false });
  }

  onClick = () => {
    const {
      saveCallback,
      profile,
    } = this.props;
    const isCustomer = profile && profile.role === 'CUSTOMER';
    if (this.props.isUpdate) {
      this.updateOrder();
    } else if (this.props.saveExistingOrder) {
      this.props.orderStore!.saveOrder();

      saveCallback && saveCallback(); // tslint:disable-line
    } else if (isCustomer) {
      const customer = { phone: profile!.user, name: '' };
      this.props.orderStore!.saveOrder(customer)
          .then(() => {
            this.setState({
              open: true,
            }, () => setTimeout(this.hidePopup, 3000));
          });
    } else {
      this.setState({ open: true });
    }
  }

  updateOrder = () => {
    const props = this.props;
    updateOrder({
      match: props.match!,
      Subgroups: props.Subgroups,
      orderStore: props.orderStore!,
    });
  }

  onCallbackErrorModal = (result: string) => {
    const { saveCallback } = this.props;
    this.setState({ showErrorModal: false }, () => {
      switch (result) {
        case 'repeat':
          saveCallback!();
          return this.updateOrder();
        case 'back':
          return saveCallback!();
        default:
          return saveCallback!();
      }
    });
  }

  render() {
    const {
      children,
      lang,
      link,
      profile,
    } = this.props;
    const {
      showErrorModal,
      open
    } = this.state;
    const orderId: number = _.get(this, 'props.orderStore.orderInfo.orderId', 0);
    const errorModalData = {
      desc: loc[lang!].errorMessage,
      buttons: [
        {
          key: 'repeat',
          text: loc[lang!].repeat,
          theme: 'black'
        },
        {
          key: 'back',
          text: loc[lang!].back,
          theme: 'white'
        },
      ] as ButtonType[]
    };
    const isCustomer = profile && profile.role === 'CUSTOMER';
    const ThanksPopup = () => open ? (
        <div className="order-form__container">
          <div className="order-form__content">
                <div>
                  <div className="order-form__header">{loc[lang!].header}</div>
                  <span>{loc[lang!].thanksText}</span>
                  <Redirect to="#thank_you"/>
                </div>
          </div>
        </div>
    ) : null;

    return (
      <React.Fragment key="order save popup">
        <Button
          className={this.props.className}
          onClick={this.onClick}
          theme="black"
          link={link ? `${link}?${orderId && 'active_order_id=' + orderId}` : undefined}
        >{children}
        </Button>
        <PopUp onClose={this.onClose} open={open}>
          {isCustomer ? <ThanksPopup /> : <SaveForm close={this.onClose} />}
        </PopUp>
        <SimpleModal
          isSmall={true}
          isTransparent={true}
          show={showErrorModal}
          data={errorModalData}
          callback={this.onCallbackErrorModal}
        />
      </React.Fragment>
    );
  }
}

export {
  SaveButton,
};
