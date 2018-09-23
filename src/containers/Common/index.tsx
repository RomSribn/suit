import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as classnames from 'classnames';
import { History } from 'history';
import { DemoSection } from '../../components/SectionDemo';
import { Header } from '../../components/Header';
import { Navigation } from '../Navigation';
import { routes } from '../../config/routes';
import { Spinner } from '../../components/Spinner';

import './styles.styl';

interface CommonProps {
    children?: React.ReactChildren;
    userStore?: IUserStore;
    routingStore?: History;
    showSpinner?: boolean;
    onDummyLoad(): void;
}

@inject(({ routing }) => ({
    routingStore: routing
}))
@observer
class Common extends React.Component<CommonProps> {
    render() {
        const isDetailsPage =
            this.props.routingStore!.location.pathname.includes(routes.details);
        console.log(this.props.onDummyLoad); // tslint:disable-line
        return (
            <div className="application" >
                {/* <Paralax /> */}
                { window.location.pathname !== '/login' && (!this.props.showSpinner) &&
                    <Navigation />
                }
                {this.props.showSpinner && <Spinner />}
                <div className="content">
                    <div
                        className={classnames(
                            'main',
                            'main--white',
                            { 'main--full': !isDetailsPage },
                            { 'main--bg-grey': !isDetailsPage }
                        )}
                    >
                        <Header />
                        {this.props.children}
                    </div>
                    <DemoSection onDummyLoad={this.props.onDummyLoad} />
                </div>
            </div>
        );
    }
}

export {
    Common,
};
