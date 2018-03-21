import * as React from 'react';
import { Route } from 'react-router-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../config/constants';
import { Paralax } from './OrderDecorationBlocks';
import { MainSection } from './SectionMain';
import { DemoSection } from './SectionDemo';
import { makeRoutes } from './routes';

const Order = (props: any) => { //tslint:disable-line
    const {
        match,
        location,
     } = props;
    const routes = makeRoutes(match.url);
    const detailsDeep = !(/\/order\/details\/.*\/.*/i.test(location.pathname));
    const isIndexPage = routes.index === location.pathname;
    return (
        <ReactCSSTransitionGroup
            transitionName="page-fade-in"
            transitionEnterTimeout={TRANSITION_DUARAION}
            transitionLeaveTimeout={TRANSITION_DUARAION}
        >
            <div className="content" key={isIndexPage.toString()}>
                <MainSection
                    routes={routes}
                    isIndexPage={isIndexPage}
                    detailsDeep={detailsDeep}
                />
                <DemoSection routes={routes} />
                <Route exact={true} path={routes.index} component={Paralax} />
            </div>
        </ReactCSSTransitionGroup>);
};

export {
    Order,
};