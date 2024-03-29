import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FooterBar as Component } from './component';
import { trim } from '../../../config/routes';
import { FooterBarProps } from './typings';

@inject(
  ({ routing, app, order, garments: { Subgroups }, user }, nextProps) => ({
    lang: app.lang,
    orderStore: order,
    mutuallyExclusivePopup: order.mutuallyExclusivePopup,
    popOrderPathitem: app.popOrderPathItem,
    orderId: order.orderInfo && order.orderInfo.orderId,
    routing,
    isAuth: user.isAuth,
    subgroupsStore: new Subgroups('shirt'),
    Subgroups,
    backLink:
      '/' +
      trim(
        routing.location.pathname
          .split('/')
          .reduce(
            (acc: string, cur: string, i: number, arr: string[]) =>
              `${acc}/${i === arr.length - 1 ? '' : cur}`,
            '',
          ),
        '/',
      ),
    ...(nextProps as object),
  }),
)
@observer
class FooterBar extends React.Component<FooterBarProps> {
  render() {
    const {
      lang,
      backLink,
      popOrderPathitem,
      orderStore,
      mutuallyExclusivePopup,
      orderId,
      routing,
      subgroupsStore,
      Subgroups,
      isAuth,
    } = this.props;

    return (
      <Component
        lang={lang}
        isAuth={isAuth}
        backLink={backLink}
        mutuallyExclusivePopup={mutuallyExclusivePopup}
        popOrderPathitem={popOrderPathitem}
        orderStore={orderStore!}
        subgroupsStore={subgroupsStore!}
        Subgroups={Subgroups}
        orderId={orderId}
        routing={routing!}
      />
    );
  }
}

export { FooterBar };
