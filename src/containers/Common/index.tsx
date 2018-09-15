import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as classnames from 'classnames';
import { History } from 'history';
import { DemoSection } from '../../components/SectionDemo';
import { Header } from '../../components/Header';
import { Navigation } from '../Navigation';
import { routes } from '../../config/routes';

import './styles.styl';

interface CommonProps {
    children?: React.ReactChildren;
    userStore?: IUserStore;
    routingStore?: History;
}

@inject(({ routing }) => ({
    routingStore: routing
}))
@observer
class Common extends React.Component<CommonProps> {
    render() {
        const isDetailsPage =
            this.props.routingStore!.location.pathname.includes(routes.details);
        return (
            <div className="application" >
                {/* <Paralax /> */}
                { window.location.pathname !== '/login' &&
                    <Navigation />
                }
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
                    <DemoSection />
                </div>
            </div>
        );
    }
}

export {
    Common,
};
