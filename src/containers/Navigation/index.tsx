import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { navigationRoutes as routes } from '../../config/routes';
import { Navigation as NavigationComponent } from './component';

// tslint:disable-next-line no-any
interface Props extends RouteComponentProps<void> {
    lang?: string;
    isOrderPage?: boolean;
    userStore?: IUserStore;
    role?: Role;
}

@inject(({app, routing, user}, nextProps: Props) => {
    const role = user.profile && user.profile.role || null;
    return {
        lang: app.lang,
        userStore: user,
        role,
        // TODO: check in runtime
        isOrderPage:
            nextProps.location.pathname.includes(routes.order),
        ...nextProps,
    };
})
@observer
class NavigationContainer extends React.Component<Props> {
    render() {
        const {
            lang,
            isOrderPage,
            userStore,
            role,
        } = this.props;
        return (
            <NavigationComponent
                lang={lang as string}
                isLogin={userStore!.isAuth}
                isOrderPage={isOrderPage!}
                role={role}
            />);
    }
}

const Navigation = withRouter(NavigationContainer);
export { Navigation };
