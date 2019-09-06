import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Crumbs } from 'react-breadcrumbs';
import { get } from 'lodash';
import { Header as Component } from './component';
import { HeaderContainerProps } from './typings';

@inject(({ user, routing, app }, nextProps: HeaderContainerProps) => {
    return {
        userStore: user,
        path: routing.location!.pathname,
        appStore: app,
        ...nextProps,
    };
})

@observer
class Header extends React.Component<HeaderContainerProps> {
    get title() {
        return get(this, 'props.appStore.orderPath[0].value', this.props.path!.split('/').slice(1).shift());
    }

    openMenu = () => {
        this.props.appStore!.toggleMobileMenu();
    }

    setCrumbs = (crumbs: Crumbs) => {
        if (crumbs && crumbs[0] &&
            (this.title !== crumbs[0].title) &&
            (this.state && this.state[this.title] !== crumbs[0].title)
        ) {
            this.setState({ [this.title]: crumbs && crumbs[0] && crumbs[0].title });
        }
        return crumbs;
    }

    render() {
        const {
            path,
            userStore,
            appStore
        } = this.props;
        return (
            <Component
                lang={appStore!.lang}
                userStore={userStore!}
                appStore={appStore!}
                path={path}
                isAuth={userStore!.isAuth}
                openMenu={this.openMenu}
                setCrumbs={this.setCrumbs}
                title={this.title}
            />
        );
    }
}

export {
    Header,
};
