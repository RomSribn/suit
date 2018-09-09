import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { navigationRoutes as routes } from '../../config/routes';
import { Navigation as NavigationComponent } from './component';

// tslint:disable-next-line no-any
interface Props extends RouteComponentProps<void> {
    lang?: string;
    backgroundColor?: string;
    userStore?: IUserStore;
}

@inject(({app, routing, user}, nextProps: Props) => {
    return {
        lang: app.lang,
        userStore: user,
        // TODO: check in runtime
        backgroundColor:
            nextProps.location.pathname !== routes.order
                ? 'white'
                : 'black',
        ...nextProps,
    };
})
@observer
class NavigationContainer extends React.Component<Props> {
    render() {
        const {
            lang,
            backgroundColor,
        } = this.props;
        return (
            <NavigationComponent
                lang={lang as string}
                isLogin={this.props.userStore!.isAuth}
                backgroundColor={backgroundColor as string}
            />);
    }
}

const Navigation = withRouter(NavigationContainer);
export { Navigation };
