import * as React from 'react';
import { Route, Switch } from 'react-router';
import * as classnames from 'classnames';
import { getCombinedPathAndTitle } from '../routes';
import CrumbRoute from '../../../utils/CrumbRoute';
import { Filter } from '../Filter';
import { GarmentChoise } from '../GarmentChoiseForm';
import { Main as Details } from '../Details';
import { Gallery } from '../Gallery';
import { SubgroupChoice } from '../SubgroupChoice';
import { Footer } from '../Footer';
import { routes } from '../routes';

class MainSection extends React.Component<MainSectionProps> {
    render() {
        const {
            isIndexPage,
            detailsDeep,
            routes : mainSectinoRoutes
        } = this.props;

        return (
        <React.Fragment key="order main content">
                <div
                    className="main__middle"
                    style={{
                        justifyContent: !detailsDeep
                            ? 'flex-start'
                            : 'center',
                        marginBottom: !detailsDeep ? 'calc(2.4rem + 4px)' : '0'
                    }}
                >
                    <Filter />
                    <GarmentChoise
                        routes={mainSectinoRoutes}
                        catalogFormClassName={classnames({ 'zero-max-height': !detailsDeep })}
                    />
                    <div
                        className={classnames(
                            {
                                customs: !isIndexPage,
                            },
                            {
                                ['customs--short']: !detailsDeep,
                            },
                        )}
                    >
                        <Switch>
                            <CrumbRoute
                                {...getCombinedPathAndTitle('garment')}
                                component={SubgroupChoice}
                            />
                            <Route path={routes.details} component={Details} />
                        </Switch>
                    </div>
                    <Switch>
                        <CrumbRoute
                            {...getCombinedPathAndTitle('subgroupChoice')}
                            component={Gallery}
                        />
                    </Switch>
                </div>
                <Footer />
        </React.Fragment>
        );
    }
}

export {
    MainSection,
};
