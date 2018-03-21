import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderContent as Component } from './component';

@inject(({ app, routing }, props: HeaderContentProps) => {
    return {
        lang: app.lang,
        orderPath: app.orderPath,
    };
})
@observer
class HeaderContent extends React.Component<HeaderContentProps> {
    render() {
        const {
            path,
            lang,
            orderPath,         
        } = this.props;
        return (
        <Component
            path={path}
            lang={lang}
            orderPath={orderPath}            
        />
        );
    }
}

export {
    HeaderContent,
};