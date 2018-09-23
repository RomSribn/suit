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
}

@inject(({app, routing, user}, nextProps: Props) => {
    return {
        lang: app.lang,
        userStore: user,
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
        } = this.props;
        return (
            <NavigationComponent
                lang={lang as string}
                isLogin={this.props.userStore!.isAuth}
                isOrderPage={isOrderPage!}
            />);
    }
}

const Navigation = withRouter(NavigationContainer);
export { Navigation };
