import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {HeaderBar as Component } from './component';

type Props = HeaderProps & {
    appStore?: IAppStore;
};

@inject(({ app }) => ({
    appStore: app
}))
@observer
class HeaderBar extends React.PureComponent<Props> {
    render() {
        const { userName } = this.props;
        const appStore = this.props.appStore!;
        return (
            <Component
                userName={userName!}
                lang={appStore.lang}
                setLang={appStore.setLang}
            />
        );
    }
}

export {
    HeaderBar
};
