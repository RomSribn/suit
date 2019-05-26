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

interface State {
  open: boolean;
  isExceptionPopupOpen: boolean;
  showErrorModal: boolean;
}
@inject(({ app, order, routing, garments: { Subgroups } }, props) => {
  return ({
    app,
    orderStore: order,
    Subgroups: Subgroups,
    setMutuallyExclusivePopup: order.setMutuallyExclusivePopup,
    activeOrderItem: order.activeElement,
    setActiveOrderItem: order.setActiveItem,
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
    this.setState({ open: false });
    saveCallback && saveCallback() // tslint:disable-line
  }
  onClick = () => {
    const {
      saveCallback
    } = this.props;
    if (this.props.isUpdate) {
      this.updateOrder();
    } else if (this.props.saveExistingOrder) {
      this.props.orderStore!.saveOrder();

      saveCallback && saveCallback(); // tslint:disable-line
    } else {
      this.setState({ open: true });
    }
  }

  handleExclsuive = (
    isRemovable: boolean,
    exceptionsForPopup: {
      garmentKey: string,
      elementKey: string,
    }[],
    orderStore: IOrderStore,
    newValue: Order,
    garment: string,
    subgroup: string,
    subgroupData: Subgroup
  ) => {
    if (isRemovable) {
      exceptionsForPopup.forEach(exceptionForPopup => {
        const { garmentKey, elementKey } = exceptionForPopup;
        orderStore.clearException(garmentKey, elementKey, 'default');
        orderStore.clearElement(garmentKey, elementKey, 'default');
      });
    } else {
      exceptionsForPopup.forEach(exceptionForPopup => {
        const { garmentKey, elementKey } = exceptionForPopup;
        orderStore.clearException(garmentKey, elementKey, 'default');
      });
    }
    this.handleSetOrder(orderStore!, newValue, garment, subgroup, subgroupData);
    this.props.setMutuallyExclusivePopup!({ show: false });
  }

  handleSetOrder = (
    orderStore: IOrderStore,
    newValue: Order,
    garment: string,
    subgroup: string,
    subgroupData: Subgroup
  ) => {
    orderStore!.setOrder(
      newValue,
      {
        [garment]: {
          [subgroup]: {
            exceptions: orderStore.activeElement!.exception,
            titleSubGroup: subgroupData.title!,
            titleElement: orderStore.activeElement!.title,
            is_item_clear: orderStore.activeElement!.is_item_clear
          }
        }
      }
    );
  }

  updateOrder = () => {
    const props = this.props;
    updateOrder({
      match: props.match!,
      Subgroups: props.Subgroups,
      orderStore: props.orderStore!,
      setOrderCallback: this.handleSetOrder,
      handleExclsuiveCallback: this.handleExclsuive,
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
      link
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
    return (
      <React.Fragment key="order save popup">
        <Button
          onClick={this.onClick}
          theme="black"
          link={link ? `${link}?${orderId && 'active_order_id=' + orderId}` : undefined}
        >{children}
        </Button>
        <PopUp onClose={this.onClose} open={open}>
          <SaveForm close={this.onClose} />
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
