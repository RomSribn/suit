import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Header as Component } from './component';

@inject(({ user, routing, app }, nextProps: HeaderContainerProps) => {
  return {
    userStore: user,
    path: routing.location!.pathname,
    appStore: app,
    isMenuUncovered: app.isMenuUncovered,
    ...nextProps,
  };
})
@observer
class Header extends React.Component<HeaderContainerProps> {
  openMenu = () => {
    this.props.appStore!.toggleMobileMenu();
  };

  render() {
    const { path, userStore, appStore, isMenuUncovered } = this.props;
    return (
      <Component
        lang={appStore!.lang}
        userStore={userStore!}
        appStore={appStore!}
        path={path}
        isAuth={userStore!.isAuth}
        openMenu={this.openMenu}
        isMenuUncovered={isMenuUncovered}
      />
    );
  }
}

export { Header };
