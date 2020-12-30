import * as _ from 'lodash';
import { basisPart } from '../ToggleBar';

export const handleSetOrder = (
    orderStore: IOrderStore,
    newValue: Order,
    garment: string,
    subgroup: string,
    subgroupData: Subgroup
) => {
    orderStore.setOrder(
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
};

export const handleExclsuiveCallback = (
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
    handleSetOrder(orderStore!, newValue, garment, subgroup, subgroupData);
    orderStore.setMutuallyExclusivePopup!({ show: false });
};

interface Props {
    match: {
        params: {
            garment: string;
            group: string;
            subgroup: string;
        }
    };
    Subgroups: any; // tslint:disable-line
    orderStore: IOrderStore;
}

export const updateOrder = (props: Props) => {
    try {
        if (props.match) {
          const { match, Subgroups, orderStore } = props;
          const {
            garment,
            group,
            subgroup } = match.params;
          let newValue = { ...orderStore!.order };
          if (!newValue) {
            newValue = {};
          }
          if (subgroup !== 'initials_text') {
              if (subgroup === 'fabric') {
                  if (orderStore!.partOfShirtToggle === basisPart) {
                      // устанавливаем код активной ткани
                      newValue[garment][0][group][subgroup].our_code = orderStore!.activeElement!.our_code;
                      newValue[garment][0][group][subgroup].title = orderStore!.activeElement!.title;
                  } else {
                      // устанавливаем доп ткань для части рубашки из активного элемента
                      newValue[garment][0].design[orderStore!.partOfShirtToggle].additionalFabric =
                          orderStore!.activeElement!.our_code;
                  }
              } else {
                  if (!newValue[garment][0][group][subgroup]) { // может быть в случае с pocket
                      newValue[garment][0][group][subgroup] = {};
                  }
                  newValue[garment][0][group][subgroup].our_code = orderStore!.activeElement!.our_code;
                  newValue[garment][0][group][subgroup].title = orderStore!.activeElement!.title;
              }
          }

          // initial values
          const exceptions = orderStore!.exceptions;
          const activeExceptions = orderStore!.activeElement!.exception || [];
          const activeElementCode = _.get(orderStore, 'activeElement.our_code', null);
          const subGroup = subgroup;
          const defaultValues = _.get(orderStore, 'defaultValues', {});
          const subgroupData = new Subgroups(garment).data.design
            .find((category: Subgroup) =>
              category.subsection_our_code === match.params!.subgroup!);
          const defaultItemValues = {};
          Object.keys(defaultValues!)
              .filter((item) => !item.includes('manequin'))
              .map(filteredGarment =>
                  defaultValues![filteredGarment].reduce((ac: string[], i: string[]) => [...ac, i], [])
                      .map((garmentObject: Order) => Object.keys(garmentObject.design)
                          .forEach(
                              elementKey => defaultItemValues[elementKey] = garmentObject.design[elementKey].our_code
                          ))
              );
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
            // TODO: добавить id: exceptionsIds, чтобы избежать рыскания в вложенных циклах
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

            if (exceptionsForPopup.length && handleExclsuiveCallback) {
              const isRemovable = true;
              handleExclsuiveCallback(
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
              handleSetOrder(orderStore!, newValue, garment, subgroup, subgroupData);
          }

        }
      } catch (_) {
        const { } = _;
      }
};
