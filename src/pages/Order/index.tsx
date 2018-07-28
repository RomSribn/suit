import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../config/constants';
import { Paralax } from './OrderDecorationBlocks';
import { MainSection } from './SectionMain';
import { DemoSection } from './SectionDemo';
import { makeRoutes } from './routes';


class Order extends React.PureComponent<any>{ //tslint:disable-line
    componentWillMount() {
        for (let i = 0; i < 90; i++) {
            const dummyImage = new Image();
            dummyImage.src = `http://194.87.239.90/fabric/images/3D/mannequin/1600x1600/${i}.png`;
            dummyImage.onloadeddata = (...args: any[]) => { // tslint:disable-line
                console.log(args); // tslint:disable-line
            };
        }
    }
    render() {
        const {
            match,
            location,
            order,
         } = this.props;
        const routes = makeRoutes(match.url);
        const detailsDeep = !(/\/order\/details\/.*\/.*/i.test(location.pathname));
        const isIndexPage = routes.index === location.pathname;
        if (
            !isIndexPage &&
            location.pathname !== routes.details &&
            match.path === routes.index &&
            !Object.keys(order).length) {
            return <Redirect to={routes.index} />;
        }
        return (
            <ReactCSSTransitionGroup
                transitionName="page-fade-in"
                transitionEnterTimeout={TRANSITION_DUARAION}
                transitionLeaveTimeout={TRANSITION_DUARAION}
            >
                <Route path={routes.index} />
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
    }
}

export {
    Order,
};