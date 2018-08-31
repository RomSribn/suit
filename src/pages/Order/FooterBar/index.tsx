import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FooterBar as Component } from './component';
import { trim } from '../../../config/routes';

@inject(({ routing, app, order }, nextProps) => ({
    lang: app.lang,
    orderStore: order,
    popOrderPathitem: app.popOrderPathItem,
    backLink:
        '/' + trim(
            routing
            .location
            .pathname
            .split('/')
            .reduce(
                (acc: string,
                cur: string,
                i: number,
                arr: string[]) => `${acc}/${i === arr.length - 1 ? '' : cur}`, ''),
                '/'
        ),
    ...nextProps,
}))
@observer
class FooterBar extends React.Component<FooterBarProps> {
    render() {
        const {
            lang,
            backLink,
            popOrderPathitem,
            orderStore,
        } = this.props;
        return (
            <Component 
                lang={lang}
                backLink={backLink}
                popOrderPathitem={popOrderPathitem}
                orderStore={orderStore}
                hasOrder={Boolean(orderStore!.orderInfo)}
            />
        );
    }
}

export {
    FooterBar
};