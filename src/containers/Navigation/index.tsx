import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { routes } from '../../config/routes';
import { Navigation as NavigationComponent } from './component';

// tslint:disable-next-line no-any
interface Props extends RouteComponentProps<void> {
    lang?: string;
    backgroundColor?: string;
}

@inject(({app, routing}, nextProps: Props) => {
    return {
        lang: app.lang,
        // TODO: check in runtime
        backgroundColor:
            nextProps.location.pathname === routes.index
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
                backgroundColor={backgroundColor as string}
            />);
    }
}

const Navigation = withRouter(NavigationContainer);
export { Navigation };
