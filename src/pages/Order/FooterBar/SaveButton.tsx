import * as React from 'react';
import { Redirect } from 'react-router';
import { observer, inject } from 'mobx-react';
import { SaveForm } from '../SaveForm';
import { PopUp } from '../../../containers/Popup';
import { Button } from '../../../components/Button';
import { routes } from '../../../config/routes';
import * as _ from 'lodash';
import { SimpleModal } from '../../../components/SimpleModal';
import { loc } from './loc';

interface State {
  open: boolean;
  isExceptionPopupOpen: boolean;
  redirectToOrders: boolean;
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
      redirectToOrders: false,
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
      this.setState({
        redirectToOrders: true
      });
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
        orderStore.clearException(garmentKey, elementKey);
        orderStore.clearElement(garmentKey, elementKey, 'default');
      });
    } else {
      exceptionsForPopup.forEach(exceptionForPopup => {
        const { garmentKey, elementKey } = exceptionForPopup;
        orderStore.clearException(garmentKey, elementKey);
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
    const {
      orderStore
    } = this.props;
    try {
      if (this.props.match) {
        const { match, Subgroups } = this.props;
        const {
          garment,
          group,
          subgroup } = match.params;
        let newValue = { ...orderStore!.order };
        if (!newValue) {
          newValue = {};
        }
        newValue[garment][0][group][subgroup] = {};
        newValue[garment][0][group][subgroup].our_code = orderStore!.activeElement!.our_code;
        newValue[garment][0][group][subgroup].title = orderStore!.activeElement!.title;

        // initial values
        const exceptions = orderStore!.exceptions;
        const activeExceptions = orderStore!.activeElement!.exception || [];
        const activeElementCode = _.get(this, 'props.orderStore.activeElement.our_code', null);
        const subGroup = orderStore!.activeElement!.elementInfo!.subGroup;
        const defaultValues = _.get(this, 'props.orderStore.defaultValues', {});
        const subgroupData = new Subgroups(garment).data.design
          .find((category: Subgroup) =>
            category.subsection_our_code === this.props!.match!.params!.subgroup!);
        const defaultItemValues = {};
        if (defaultValues) {
          Object.keys(defaultValues)
            .filter((item) => !item.includes('manequin'))
            .map(filteredGarment =>
              defaultValues[filteredGarment].reduce((ac: string[], i: string[]) => [...ac, i], [])
                .map((garmentObject: Order) => Object.keys(garmentObject.design)
                  .forEach(
                    elementKey => defaultItemValues[elementKey] = garmentObject.design[elementKey].our_code
                  ))
            );
        }
        const orderItems = {};
        if (orderStore!.order) {
          Object.keys(orderStore!.order)
            .filter(item => !item.includes('manequin'))
            .map(filteredGarment =>
              orderStore!.order[filteredGarment].reduce((ac: string[], i: string[]) => [...ac, i], [])
                .map((garmentObject: Order) => Object.keys(garmentObject.design)
                  .forEach(
                    elementKey => {
                      if (garmentObject.design[elementKey]) {
                        orderItems[elementKey] = garmentObject.design[elementKey].our_code;
                      } else {
                        orderItems[elementKey] = defaultItemValues[elementKey];
                      }
                    }
                  ))
            );
        }
        const arrayItemsInOrder = orderItems ?
          Object.keys(orderItems).map(orderItemKey => orderItems[orderItemKey]) : [];
        const mutuallyExclusiveItems = activeExceptions
          .filter((activeExceptionCode: string) => arrayItemsInOrder.includes(activeExceptionCode));
        // initial values end
        let allExceptions = exceptions ?
          Object.keys(exceptions).reduce((ac: string[], garmentKey: string) => {
            Object.keys(exceptions[garmentKey]).forEach((elementKey: string) => {
              if (elementKey !== subGroup) {
                ac.push(...exceptions[garmentKey][elementKey].exceptions);
              }
            });

            return ac;
          }, [])
          : [];

        if (mutuallyExclusiveItems.length && exceptions) {
          const exceptionsForPopup: { garmentKey: string, elementKey: string }[] = [];
          mutuallyExclusiveItems.forEach(() => {
            Object.keys(exceptions).forEach((garmentKey) => {
              Object.keys(exceptions[garmentKey]).forEach((elementKey) => {
                if (exceptions[garmentKey][elementKey].exceptions.includes(activeElementCode)) {
                  allExceptions.forEach((exceptionCode) => {
                    const isExceptionItemExistInOrder = arrayItemsInOrder.find((key: string) =>
                      exceptions[garmentKey][elementKey].exceptions.includes(key));

                    if (exceptions[garmentKey][elementKey].exceptions.includes(exceptionCode)
                      && isExceptionItemExistInOrder === exceptionCode) {
                      exceptionsForPopup.push({ garmentKey, elementKey });
                    }
                  });
                }
              });
            });
          });

          if (exceptionsForPopup.length) {
            const isRemovable = true;
            this.handleExclsuive(
              isRemovable,
              exceptionsForPopup,
              orderStore!,
              newValue,
              garment,
              subgroup,
              subgroupData
            );
          }
        } else {
          this.handleSetOrder(orderStore!, newValue, garment, subgroup, subgroupData);
        }

      }
    } catch (_) {
      const { } = _;
    }
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
      lang
    } = this.props;
    const {
      showErrorModal,
      open
    } = this.state;
    if (this.state.redirectToOrders) {
      const orderId: number = _.get(this, 'props.orderStore.orderInfo.orderId', 0);
      // TODO:  господи, прости
      return <Redirect to={`${routes.orderList}?${orderId && 'active_order_id=' + orderId}`} />;
    }
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
