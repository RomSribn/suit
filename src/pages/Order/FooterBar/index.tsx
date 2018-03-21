import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FooterBar as Component } from './component';
import { trim } from '../../../config/routes';

@inject(({ routing, app }, nextProps) => ({
    lang: app.lang,
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
        } = this.props;
        return (
            <Component
                lang={lang}
                backLink={backLink}
                popOrderPathitem={popOrderPathitem}
            />
        );
    }
}

export {
    FooterBar,
};