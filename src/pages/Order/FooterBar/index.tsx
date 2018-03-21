import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FooterBar as Component } from './component';

@inject(({ routing, app }, nextProps) => ({
    lang: app.lang,
    goBack: routing.goBack,
    ...nextProps,
}))
@observer
class FooterBar extends React.Component<FooterBarProps> {
    render() {
        const {
            goBack,
            lang,
        } = this.props;
        return (
            <Component
                lang={lang}
                goBack={goBack}
            />
        );
    }
}

export {
    FooterBar,
};